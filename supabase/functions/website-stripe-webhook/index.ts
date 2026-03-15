import { createClient } from 'npm:@supabase/supabase-js@2';
import Stripe from 'npm:stripe@14';

const SUPABASE_URL          = Deno.env.get('SUPABASE_URL')!;
const SERVICE_KEY           = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const STRIPE_SECRET_KEY     = Deno.env.get('STRIPE_SECRET_KEY')!;
const STRIPE_WEBHOOK_SECRET = Deno.env.get('WEBSITE_STRIPE_WEBHOOK_SECRET')!;
const SEVEN_API_KEY         = Deno.env.get('SEVEN_API_KEY')!;
const RESEND_API_KEY        = Deno.env.get('RESEND_API_KEY') ?? '';

const stripe   = new Stripe(STRIPE_SECRET_KEY, { apiVersion: '2024-06-20' });
const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

async function sendSMS(to: string, text: string) {
  await fetch('https://gateway.seven.io/api/sms', {
    method: 'POST',
    headers: { 'X-Api-Key': SEVEN_API_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({ to, text, from: 'CodaAI' }),
  });
}

function formatPackage(cfg: Record<string, any>): { lines: string[]; summary: string } {
  const pieces = cfg.contentPieces ?? '?';
  const cycle  = cfg.billingCycle === 'annual' ? 'Jahreslizenz' : 'Quartalsweise';
  const lines: string[] = [`${pieces} Premium-Blogartikel/Monat`, `${cycle} \u00B7 monatliche Abrechnung`];
  if (cfg.includeSocialVideos) lines.push(`+ ${pieces * 2} Social-Media-Videos/Monat`);
  if (cfg.includeTranslations) {
    const langs = cfg.translationLanguages ?? 1;
    lines.push(`+ \u00DCbersetzungen in ${langs} ${langs === 1 ? 'Sprache' : 'Sprachen'}`);
  }
  return { lines, summary: lines.join(' \u00B7 ') };
}

async function sendConfirmationEmail(to: string, packageCfg: Record<string, any>, subId: string) {
  if (!RESEND_API_KEY) { console.warn('RESEND_API_KEY not set — skipping email'); return; }

  const { lines } = formatPackage(packageCfg);
  const total = packageCfg.monthlyTotal
    ? new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(packageCfg.monthlyTotal)
    : '';
  const cancelNote = packageCfg.billingCycle === 'annual'
    ? 'Jahreslizenz \u00B7 monatliche Abrechnung \u00B7 K\u00FCndigung zum Jahresende.'
    : 'Quartalsweise \u00B7 monatliche Abrechnung \u00B7 Mindestlaufzeit 3 Monate.';

  const itemRows = lines.map(l =>
    `<tr><td style="padding:5px 0;color:#4b5563;font-size:14px;">\u2713 ${l}</td></tr>`
  ).join('');

  const html = `<!DOCTYPE html><html lang="de"><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;padding:40px 20px;">
<tr><td align="center">
<table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#fff;border-radius:12px;border:1px solid #e5e7eb;">
<tr><td style="background:#7c3aed;padding:28px 40px;text-align:center;border-radius:12px 12px 0 0;">
  <h1 style="margin:0;color:#fff;font-size:22px;font-weight:700;">CodaAI</h1>
  <p style="margin:6px 0 0;color:#ede9fe;font-size:13px;">Ihr Abonnement ist aktiv</p>
</td></tr>
<tr><td style="padding:32px 40px;">
  <h2 style="margin:0 0 8px;color:#111827;font-size:20px;">Willkommen bei CodaAI! \uD83C\uDF89</h2>
  <p style="margin:0 0 24px;color:#6b7280;font-size:15px;line-height:1.6;">Vielen Dank f\u00FCr Ihr Vertrauen. Unser Team meldet sich innerhalb eines Werktages bei Ihnen.</p>
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f3ff;border-radius:8px;border:1px solid #ddd6fe;margin-bottom:24px;">
  <tr><td style="padding:20px 24px;">
    <p style="margin:0 0 10px;color:#7c3aed;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;">Ihr gebuchtes Paket</p>
    <table width="100%" cellpadding="0" cellspacing="0">${itemRows}</table>
    ${total ? `<p style="margin:14px 0 0;padding-top:14px;border-top:1px solid #ddd6fe;color:#111827;font-size:20px;font-weight:700;">${total}<span style="color:#6b7280;font-size:13px;font-weight:400;"> / Monat</span></p>` : ''}
  </td></tr></table>
  <p style="margin:0 0 4px;color:#9ca3af;font-size:12px;">${cancelNote}</p>
  <p style="margin:0 0 20px;color:#9ca3af;font-size:12px;">Abonnement-ID: ${subId}</p>
  <p style="margin:0;color:#6b7280;font-size:14px;">Fragen? <a href="mailto:hi@codaai.ai" style="color:#7c3aed;">hi@codaai.ai</a></p>
</td></tr>
<tr><td style="background:#f9fafb;padding:16px 40px;text-align:center;border-top:1px solid #e5e7eb;border-radius:0 0 12px 12px;">
  <p style="margin:0;color:#9ca3af;font-size:11px;">CodaAI &middot; <a href="https://codaai.ai" style="color:#9ca3af;">codaai.ai</a></p>
</td></tr>
</table></td></tr></table>
</body></html>`;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: 'CodaAI <hi@codaai.ai>', to: [to], subject: 'Ihr CodaAI Abonnement ist aktiv \uD83C\uDF89', html }),
  });
  if (!res.ok) console.error('Resend error:', await res.text());
  else console.log('Confirmation email sent to', to);
}

Deno.serve(async (req) => {
  const body      = await req.text();
  const signature = req.headers.get('stripe-signature') ?? '';

  let event: Stripe.Event;
  try {
    event = await stripe.webhooks.constructEventAsync(body, signature, STRIPE_WEBHOOK_SECRET);
  } catch (err: any) {
    console.error('Webhook signature error:', err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  try {
    switch (event.type) {

      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const sub      = event.data.object as Stripe.Subscription;
        const customer = await stripe.customers.retrieve(sub.customer as string) as Stripe.Customer;
        const regId    = sub.metadata?.registrationId;

        let phone      = customer.phone ?? '';
        let packageCfg: Record<string, any> = {};
        if (regId) {
          const { data: reg } = await supabase
            .from('pending_registrations')
            .select('phone, package_config')
            .eq('id', regId)
            .single();
          if (reg) { phone = reg.phone; packageCfg = reg.package_config ?? {}; }
        }

        await supabase.from('subscribers').upsert({
          email:                  customer.email!,
          phone,
          stripe_customer_id:     customer.id,
          stripe_subscription_id: sub.id,
          subscription_status:    sub.status,
          package_config:         packageCfg,
          updated_at:             new Date().toISOString(),
        }, { onConflict: 'email' });

        if (event.type === 'customer.subscription.created' && sub.status === 'active') {
          const { summary } = formatPackage(packageCfg);
          if (phone) await sendSMS(phone, `Willkommen bei CodaAI! Ihr Abonnement ist aktiv. ${summary}. Wir melden uns in K\u00FCrze. Fragen? hi@codaai.ai`);
          if (customer.email) await sendConfirmationEmail(customer.email, packageCfg, sub.id);
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const sub = event.data.object as Stripe.Subscription;
        await supabase.from('subscribers')
          .update({ subscription_status: 'cancelled', updated_at: new Date().toISOString() })
          .eq('stripe_subscription_id', sub.id);
        break;
      }

      case 'invoice.payment_failed': {
        const invoice  = event.data.object as Stripe.Invoice;
        const customer = await stripe.customers.retrieve(invoice.customer as string) as Stripe.Customer;
        const { data: subscriber } = await supabase.from('subscribers').select('phone').eq('stripe_customer_id', customer.id).single();
        if (subscriber?.phone) await sendSMS(subscriber.phone, `CodaAI: Zahlung fehlgeschlagen. Bitte Zahlungsmittel aktualisieren: https://billing.stripe.com`);
        await supabase.from('subscribers').update({ subscription_status: 'past_due', updated_at: new Date().toISOString() }).eq('stripe_customer_id', customer.id);
        break;
      }
    }
  } catch (err: any) {
    console.error('Webhook handler error:', err);
    return new Response('Internal error', { status: 500 });
  }

  return new Response(JSON.stringify({ received: true }), { headers: { 'Content-Type': 'application/json' } });
});
