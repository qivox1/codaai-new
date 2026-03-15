import { createClient } from 'npm:@supabase/supabase-js@2';


const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SERVICE_KEY  = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const CORS = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

async function hashOTP(otp: string): Promise<string> {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(otp));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS });

  try {
    const { registrationId, otpCode } = await req.json();

    if (!registrationId || !otpCode)
      return Response.json({ error: 'Fehlende Parameter.' }, { status: 400, headers: CORS });

    const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

    // ── Load registration ─────────────────────────────────────
    const { data: reg, error: fetchErr } = await supabase
      .from('pending_registrations')
      .select('*')
      .eq('id', registrationId)
      .single();

    if (fetchErr || !reg)
      return Response.json({ error: 'Registrierung nicht gefunden.' }, { status: 404, headers: CORS });

    // ── Check expiry ──────────────────────────────────────────
    if (new Date(reg.sms_expires_at) < new Date())
      return Response.json(
        { error: 'Code abgelaufen. Bitte starten Sie den Vorgang neu.' },
        { status: 410, headers: CORS }
      );

    // ── Check attempt limit ───────────────────────────────────
    if (reg.sms_attempts >= 5) {
      return Response.json(
        { error: 'Zu viele Fehlversuche. Bitte starten Sie den Vorgang neu.' },
        { status: 429, headers: CORS }
      );
    }

    // ── Increment attempt counter ─────────────────────────────
    await supabase
      .from('pending_registrations')
      .update({ sms_attempts: reg.sms_attempts + 1 })
      .eq('id', registrationId);

    // ── Verify OTP ────────────────────────────────────────────
    const inputHash = await hashOTP(otpCode.trim());

    if (inputHash !== reg.sms_otp_hash)
      return Response.json(
        { error: 'Ungültiger Code. Bitte erneut versuchen.' },
        { status: 401, headers: CORS }
      );

    // ── Mark phone verified ───────────────────────────────────
    await supabase
      .from('pending_registrations')
      .update({ phone_verified: true })
      .eq('id', registrationId);

    return Response.json(
      { success: true, message: 'Mobilnummer erfolgreich verifiziert.' },
      { headers: CORS }
    );

  } catch (err: any) {
    console.error('verify-sms error:', err);
    return Response.json({ error: err.message ?? 'Interner Fehler.' }, { status: 500, headers: CORS });
  }
});
