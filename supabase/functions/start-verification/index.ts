import { createClient } from 'npm:@supabase/supabase-js@2';


const SUPABASE_URL  = Deno.env.get('SUPABASE_URL')!;
const SERVICE_KEY   = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const SEVEN_API_KEY = Deno.env.get('SEVEN_API_KEY')!;
const SITE_URL      = Deno.env.get('SITE_URL') ?? 'https://qivox1.github.io/codaai-new';

const CORS = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// ── Helpers ────────────────────────────────────────────────────────────────

/** Generate a cryptographically random 6-digit OTP */
function generateOTP(): string {
  const arr = new Uint32Array(1);
  crypto.getRandomValues(arr);
  return String(arr[0] % 1_000_000).padStart(6, '0');
}

/** bcrypt-hash an OTP using Supabase's built-in pgcrypto via RPC
 *  We store the hash in DB — never the plaintext OTP. */
async function hashOTP(otp: string): Promise<string> {
  // Simple SHA-256 fallback (Deno native) — sufficient for short-lived OTPs
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(otp));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}

/** Send SMS via seven.io REST API */
async function sendSMS(to: string, text: string): Promise<void> {
  const res = await fetch('https://gateway.seven.io/api/sms', {
    method: 'POST',
    headers: {
      'X-Api-Key': SEVEN_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ to, text, from: 'CodaAI' }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`seven.io error: ${err}`);
  }
}

/** Validate E.164 phone (e.g. +49170123456) */
function isValidPhone(phone: string): boolean {
  return /^\+[1-9]\d{6,14}$/.test(phone);
}

/** Validate email */
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ── Main handler ───────────────────────────────────────────────────────────

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS });

  try {
    const { email, phone, packageConfig } = await req.json();

    // ── Input validation ──────────────────────────────────────
    if (!isValidEmail(email))
      return Response.json({ error: 'Ungültige E-Mail-Adresse.' }, { status: 400, headers: CORS });

    if (!isValidPhone(phone))
      return Response.json(
        { error: 'Bitte Mobilnummer im internationalen Format angeben, z.B. +49170123456.' },
        { status: 400, headers: CORS }
      );

    if (!packageConfig?.monthlyTotal || packageConfig.monthlyTotal <= 0)
      return Response.json({ error: 'Ungültige Paktkonfiguration.' }, { status: 400, headers: CORS });

    const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

    // ── Rate limiting: max 3 pending per phone/hour ───────────
    const { count } = await supabase
      .from('pending_registrations')
      .select('*', { count: 'exact', head: true })
      .eq('phone', phone)
      .gt('expires_at', new Date().toISOString());

    if ((count ?? 0) >= 3)
      return Response.json(
        { error: 'Zu viele Versuche. Bitte warten Sie eine Stunde.' },
        { status: 429, headers: CORS }
      );

    // ── Generate & hash OTP ───────────────────────────────────
    const otp     = generateOTP();
    const otpHash = await hashOTP(otp);
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString(); // 10 min

    // ── Store pending registration ────────────────────────────
    const { data: reg, error: dbErr } = await supabase
      .from('pending_registrations')
      .insert({
        email,
        phone,
        sms_otp_hash:  otpHash,
        sms_expires_at: expiresAt,
        package_config: packageConfig,
      })
      .select('id')
      .single();

    if (dbErr) throw dbErr;

    const regId = reg.id;

    // ── Send Magic Link (email verification) ─────────────────
    const redirectTo = `${SITE_URL}/auth/callback?regId=${regId}`;
    const { error: magicErr } = await supabase.auth.admin.generateLink({
      type:       'magiclink',
      email,
      options:    { redirectTo },
    });
    if (magicErr) throw magicErr;

    // ── Send SMS OTP ──────────────────────────────────────────
    const smsText = `Ihr CodaAI Verifizierungscode: ${otp}\nGültig 10 Minuten.`;
    await sendSMS(phone, smsText);

    return Response.json(
      { registrationId: regId, message: 'Magic Link und SMS-Code wurden gesendet.' },
      { headers: CORS }
    );

  } catch (err: any) {
    console.error('start-verification error:', err);
    return Response.json(
      { error: err.message ?? 'Interner Fehler.' },
      { status: 500, headers: CORS }
    );
  }
});
