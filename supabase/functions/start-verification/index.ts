import { createClient } from 'npm:@supabase/supabase-js@2';

const SUPABASE_URL  = Deno.env.get('SUPABASE_URL')!;
const SERVICE_KEY   = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const SEVEN_API_KEY = Deno.env.get('SEVEN_API_KEY')!;
const SITE_URL      = Deno.env.get('SITE_URL') ?? 'https://qivox1.github.io/codaai-new';

const CORS = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

/** Send SMS via seven.io REST API */
async function sendSMS(to: string, text: string): Promise<void> {
  const res = await fetch('https://gateway.seven.io/api/sms', {
    method: 'POST',
    headers: { 'X-Api-Key': SEVEN_API_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({ to, text, from: 'CodaAI' }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`seven.io error: ${err}`);
  }
}

function isValidPhone(phone: string): boolean {
  return /^\+[1-9]\d{6,14}$/.test(phone);
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/** Generate a cryptographically random 6-digit OTP */
function generateOTP(): string {
  const arr = new Uint32Array(1);
  crypto.getRandomValues(arr);
  return String(arr[0] % 1_000_000).padStart(6, '0');
}

/** SHA-256 hash of a string, returned as hex */
async function hashString(value: string): Promise<string> {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS });

  try {
    const { email, phone, packageConfig } = await req.json();

    if (!isValidEmail(email))
      return Response.json({ error: 'Ungültige E-Mail-Adresse.' }, { status: 400, headers: CORS });

    if (!isValidPhone(phone))
      return Response.json(
        { error: 'Bitte Mobilnummer im Format +49170… angeben.' },
        { status: 400, headers: CORS }
      );

    if (!packageConfig?.monthlyTotal || packageConfig.monthlyTotal <= 0)
      return Response.json({ error: 'Ungültige Paketkonfiguration.' }, { status: 400, headers: CORS });

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

    // ── Generate 6-digit SMS OTP ──────────────────────────────
    const otp     = generateOTP();
    const otpHash = await hashString(otp);

    // ── Store pending registration (phone NOT yet verified) ───
    const { data: reg, error: dbErr } = await supabase
      .from('pending_registrations')
      .insert({
        email,
        phone,
        sms_otp_hash:   otpHash,
        sms_expires_at: new Date(Date.now() + 60 * 60 * 1000).toISOString(), // 1 hour
        package_config: packageConfig,
        phone_verified: false,
      })
      .select('id')
      .single();

    if (dbErr) throw dbErr;
    const regId = reg.id;

    // ── Generate Magic Link for email verification ────────────
    const redirectTo = `${SITE_URL}/auth/callback?regId=${regId}`;
    const { data: linkData, error: magicErr } = await supabase.auth.admin.generateLink({
      type:    'magiclink',
      email,
      options: { redirectTo },
    });
    if (magicErr) throw magicErr;

    const magicUrl = linkData?.properties?.action_link;
    if (!magicUrl) throw new Error('Magic Link konnte nicht erstellt werden.');

    // ── Send OTP code via SMS (NOT the magic link) ────────────
    const smsText = `Ihr CodaAI Code: ${otp}\n\nDieser Code bestätigt Ihre Mobilnummer. Bitte auf der Website eingeben.`;
    await sendSMS(phone, smsText);

    return Response.json(
      { registrationId: regId, magicUrl, message: 'Code per SMS gesendet.' },
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
