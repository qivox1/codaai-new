import { createClient } from 'npm:@supabase/supabase-js@2';
import Stripe from 'npm:stripe@14';


const SUPABASE_URL      = Deno.env.get('SUPABASE_URL')!;
const SERVICE_KEY       = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const STRIPE_SECRET_KEY = Deno.env.get('STRIPE_SECRET_KEY')!;
const SITE_URL          = Deno.env.get('SITE_URL') ?? 'https://qivox1.github.io/codaai-new';

const CORS = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: '2024-06-20' });

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS });

  try {
    const { registrationId, accessToken } = await req.json();

    if (!registrationId)
      return Response.json({ error: 'Fehlende registrationId.' }, { status: 400, headers: CORS });

    const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

    // ── Load registration ─────────────────────────────────────
    const { data: reg, error: fetchErr } = await supabase
      .from('pending_registrations')
      .select('*')
      .eq('id', registrationId)
      .single();

    if (fetchErr || !reg)
      return Response.json({ error: 'Registrierung nicht gefunden.' }, { status: 404, headers: CORS });

    // ── If accessToken provided, verify it and mark email as verified ─
    if (accessToken && !reg.email_verified) {
      const { data: { user }, error: authErr } = await supabase.auth.getUser(accessToken);
      if (authErr || !user)
        return Response.json({ error: 'Ungültiger Authentifizierungs-Token.' }, { status: 401, headers: CORS });

      if (user.email?.toLowerCase() !== reg.email.toLowerCase())
        return Response.json({ error: 'E-Mail stimmt nicht überein.' }, { status: 403, headers: CORS });

      await supabase
        .from('pending_registrations')
        .update({ email_verified: true })
        .eq('id', registrationId);

      reg.email_verified = true;
    }

    // ── Both verifications must be complete ───────────────────
    if (!reg.email_verified)
      return Response.json(
        { error: 'E-Mail noch nicht bestätigt. Bitte Magic Link anklicken.' },
        { status: 403, headers: CORS }
      );

    if (!reg.phone_verified)
      return Response.json(
        { error: 'Mobilnummer noch nicht bestätigt. Bitte SMS-Code eingeben.' },
        { status: 403, headers: CORS }
      );

    const pkg = reg.package_config;
    const monthlyTotal = Math.round(pkg.monthlyTotal); // in EUR (no decimals)

    // ── Build human-readable description ─────────────────────
    const cycleLabel = pkg.billingCycle === 'annual' ? 'Jahreslizenz' : 'Quartalslizenz';
    const addons: string[] = [];
    if (pkg.includeSocialVideos)   addons.push('+ Social Videos');
    if (pkg.includeTranslations)   addons.push(`+ ${pkg.translationLanguages} Übersetzung(en)`);
    const description =
      `${pkg.contentPieces} Premium-Blogartikel/Monat · ${cycleLabel}` +
      (addons.length ? ' · ' + addons.join(' · ') : '');

    // ── Create or retrieve Stripe customer ────────────────────
    const existingCustomers = await stripe.customers.list({ email: reg.email, limit: 1 });
    let customer = existingCustomers.data[0];

    if (!customer) {
      customer = await stripe.customers.create({
        email: reg.email,
        phone: reg.phone,
        metadata: { source: 'codaai-web', registrationId },
      });
    }

    // ── Create Stripe Checkout Session ────────────────────────
    const session = await stripe.checkout.sessions.create({
      customer:     customer.id,
      mode:         'subscription',
      locale:       'de',
      line_items: [{
        price_data: {
          currency:    'eur',
          unit_amount: monthlyTotal * 100, // Stripe uses cents
          recurring:   { interval: 'month' },
          product_data: {
            name:        'CodaAI Content-Paket',
            description,
          },
        },
        quantity: 1,
      }],
      subscription_data: {
        metadata: {
          registrationId,
          contentPieces:      String(pkg.contentPieces),
          billingCycle:       pkg.billingCycle,
          includeSocialVideos: String(pkg.includeSocialVideos),
          includeTranslations: String(pkg.includeTranslations),
        },
      },
      success_url: `${SITE_URL}/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:  `${SITE_URL}/preise?cancelled=1`,
      payment_method_types: ['card', 'sepa_debit'],
      customer_update: { address: 'auto' },
      tax_id_collection: { enabled: true }, // allow VAT ID entry
      automatic_tax:     { enabled: false },
    });

    // ── Store session ID in DB ────────────────────────────────
    await supabase
      .from('pending_registrations')
      .update({ stripe_session_id: session.id })
      .eq('id', registrationId);

    return Response.json(
      { checkoutUrl: session.url },
      { headers: CORS }
    );

  } catch (err: any) {
    console.error('create-checkout error:', err);
    return Response.json({ error: err.message ?? 'Interner Fehler.' }, { status: 500, headers: CORS });
  }
});
