import { createClient } from 'npm:@supabase/supabase-js@2';
import Stripe from 'npm:stripe@14';


const SUPABASE_URL          = Deno.env.get('SUPABASE_URL')!;
const SERVICE_KEY           = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const STRIPE_SECRET_KEY     = Deno.env.get('STRIPE_SECRET_KEY')!;
const STRIPE_WEBHOOK_SECRET = Deno.env.get('WEBSITE_STRIPE_WEBHOOK_SECRET')!;
const SEVEN_API_KEY         = Deno.env.get('SEVEN_API_KEY')!;

const stripe  = new Stripe(STRIPE_SECRET_KEY, { apiVersion: '2024-06-20' });
const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

async function sendSMS(to: string, text: string) {
  await fetch('https://gateway.seven.io/api/sms', {
    method: 'POST',
    headers: { 'X-Api-Key': SEVEN_API_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({ to, text, from: 'CodaAI' }),
  });
}

Deno.serve(async (req) => {
  const body      = await req.text();
  const signature = req.headers.get('stripe-signature') ?? '';

  // ── Verify Stripe signature ───────────────────────────────
  let event: Stripe.Event;
  try {
    event = await stripe.webhooks.constructEventAsync(body, signature, STRIPE_WEBHOOK_SECRET);
  } catch (err: any) {
    console.error('Webhook signature error:', err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // ── Handle events ─────────────────────────────────────────
  try {
    switch (event.type) {

      // ── Subscription activated ─────────────────────────────
      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const sub      = event.data.object as Stripe.Subscription;
        const customer = await stripe.customers.retrieve(sub.customer as string) as Stripe.Customer;
        const regId    = sub.metadata?.registrationId;

        // Look up phone from pending_registration
        let phone = customer.phone ?? '';
        if (regId) {
          const { data: reg } = await supabase
            .from('pending_registrations')
            .select('phone, package_config')
            .eq('id', regId)
            .single();
          if (reg) phone = reg.phone;
        }

        // Upsert subscriber record
        await supabase.from('subscribers').upsert({
          email:                  customer.email!,
          phone,
          stripe_customer_id:     customer.id,
          stripe_subscription_id: sub.id,
          subscription_status:    sub.status,
          package_config:         sub.metadata ?? null,
          updated_at:             new Date().toISOString(),
        }, { onConflict: 'email' });

        // Welcome SMS on new active subscription
        if (event.type === 'customer.subscription.created' && sub.status === 'active' && phone) {
          await sendSMS(
            phone,
            `Willkommen bei CodaAI! 🎉 Ihr Abonnement ist aktiv. Unser Team meldet sich in Kürze. Fragen? office@codaai.ai`
          );
        }
        break;
      }

      // ── Subscription cancelled ─────────────────────────────
      case 'customer.subscription.deleted': {
        const sub = event.data.object as Stripe.Subscription;
        await supabase
          .from('subscribers')
          .update({ subscription_status: 'cancelled', updated_at: new Date().toISOString() })
          .eq('stripe_subscription_id', sub.id);
        break;
      }

      // ── Payment failed ─────────────────────────────────────
      case 'invoice.payment_failed': {
        const invoice  = event.data.object as Stripe.Invoice;
        const customer = await stripe.customers.retrieve(invoice.customer as string) as Stripe.Customer;

        const { data: subscriber } = await supabase
          .from('subscribers')
          .select('phone')
          .eq('stripe_customer_id', customer.id)
          .single();

        if (subscriber?.phone) {
          await sendSMS(
            subscriber.phone,
            `CodaAI: Zahlung fehlgeschlagen. Bitte Zahlungsmittel aktualisieren: https://billing.stripe.com`
          );
        }

        await supabase
          .from('subscribers')
          .update({ subscription_status: 'past_due', updated_at: new Date().toISOString() })
          .eq('stripe_customer_id', customer.id);
        break;
      }
    }
  } catch (err: any) {
    console.error('Webhook handler error:', err);
    return new Response('Internal error', { status: 500 });
  }

  return new Response(JSON.stringify({ received: true }), {
    headers: { 'Content-Type': 'application/json' },
  });
});
