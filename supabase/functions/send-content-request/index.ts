import { createClient } from 'npm:@supabase/supabase-js@2';

const SUPABASE_URL  = Deno.env.get('SUPABASE_URL')!;
const SERVICE_KEY   = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const RESEND_KEY    = Deno.env.get('RESEND_API_KEY') ?? '';
const NOTIFY_EMAIL  = Deno.env.get('NOTIFICATION_EMAIL') ?? 'office@brunsdigital.de';
const FROM_EMAIL    = Deno.env.get('FROM_EMAIL') ?? 'CodaAI <noreply@codaai.de>';

const CORS = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// ─── Main handler ─────────────────────────────────────────────────────────────
Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS });

  try {
    const body = await req.json();
    const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

    // ── 1. Check email duplicate ─────────────────────────────────────────────
    if (body.checkEmailOnly) {
      const email = (body.email ?? '').toLowerCase().trim();
      if (!email) return Response.json({ exists: false }, { headers: CORS });

      const { data } = await supabase
        .from('content_requests')
        .select('id')
        .eq('email', email)
        .limit(1)
        .maybeSingle();

      return Response.json({ exists: !!data }, { headers: CORS });
    }

    // ── 2. URL reachability check ────────────────────────────────────────────
    if (body.checkUrlReachable) {
      const url = (body.websiteUrl ?? '').trim();
      if (!url) return Response.json({ isReachable: false }, { headers: CORS });

      // Basic URL format check first
      try { new URL(url); } catch {
        return Response.json({ isReachable: false }, { headers: CORS });
      }

      try {
        // HEAD request — fast, no body download; follow redirects
        const res = await fetch(url, {
          method: 'HEAD',
          headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; CodaAI-Bot/1.0; +https://codaai.de)',
          },
          signal: AbortSignal.timeout(8000),
          redirect: 'follow',
        });

        // Any HTTP response (even 403/404) means the server is up
        return Response.json({ isReachable: res.status < 600 }, { headers: CORS });

      } catch (err: any) {
        // Timeout, DNS failure, connection refused → genuinely unreachable
        console.warn('Reachability check failed for', url, err?.message);
        return Response.json({ isReachable: false }, { headers: CORS });
      }
    }

    // ── 3. Check domain duplicate ────────────────────────────────────────────
    if (body.checkDomainOnly) {
      const url = (body.websiteUrl ?? '').trim();
      if (!url) return Response.json({ domainExists: false }, { headers: CORS });

      let domain: string;
      try {
        domain = new URL(url).hostname.replace(/^www\./, '');
      } catch {
        return Response.json({ domainExists: false }, { headers: CORS });
      }

      const { data } = await supabase
        .from('content_requests')
        .select('id')
        .ilike('website_domain', domain)
        .limit(1)
        .maybeSingle();

      return Response.json({ domainExists: !!data }, { headers: CORS });
    }

    // ── 4. Validate partner code ─────────────────────────────────────────────
    if (body.checkPartnerCode) {
      const code = (body.partnerCode ?? '').trim().toUpperCase();
      if (!code) return Response.json({ isValid: false }, { headers: CORS });

      const { data } = await supabase
        .from('partner_codes')
        .select('id')
        .eq('code', code)
        .eq('active', true)
        .limit(1)
        .maybeSingle();

      return Response.json({ isValid: !!data }, { headers: CORS });
    }

    // ── 5. Validate topic ────────────────────────────────────────────────────
    if (body.validateTopic) {
      const topic = (body.topic ?? '').trim();
      if (!topic) {
        return Response.json(
          { isValid: false, reason: 'Kein Thema angegeben.' },
          { headers: CORS }
        );
      }

      const words = topic.split(/\s+/).filter((w: string) => w.length > 0);
      if (words.length < 5) {
        return Response.json(
          { isValid: false, reason: 'Bitte beschreiben Sie Ihr Thema in mindestens 5 Wörtern.' },
          { headers: CORS }
        );
      }

      // Reject if the topic is only numbers / symbols and no real words
      const realWords = words.filter((w: string) => /[a-zA-ZäöüÄÖÜß]{2,}/.test(w));
      if (realWords.length < 3) {
        return Response.json(
          { isValid: false, reason: 'Bitte geben Sie ein sinnvolles Blog-Thema ein.' },
          { headers: CORS }
        );
      }

      return Response.json({ isValid: true }, { headers: CORS });
    }

    // ── 6. Submit content request ────────────────────────────────────────────
    const {
      name, email, websiteUrl, topic,
      articleLanguage, articleGoal, wordCount,
      additionalInfo, pdfBase64, pdfFileName,
      pdfAttachments, // array of { base64, filename }
      partnerCode,
    } = body;

    // Resolve filenames: prefer full pdfAttachments array, fall back to single-file fields
    const allPdfFilenames: string[] = pdfAttachments?.length
      ? pdfAttachments.map((p: { filename: string }) => p.filename)
      : pdfFileName ? [pdfFileName] : [];

    if (!name || !email || !websiteUrl || !topic) {
      return Response.json(
        { error: 'Fehlende Pflichtfelder.' },
        { status: 400, headers: CORS }
      );
    }

    // Extract domain for duplicate-check index
    let domain: string;
    try {
      domain = new URL(websiteUrl).hostname.replace(/^www\./, '');
    } catch {
      domain = websiteUrl;
    }

    const { data: inserted, error: insertErr } = await supabase
      .from('content_requests')
      .insert({
        name:             name.trim(),
        email:            email.toLowerCase().trim(),
        website_url:      websiteUrl.trim(),
        website_domain:   domain,
        topic:            topic.trim(),
        article_language: articleLanguage ?? 'de',
        article_goal:     articleGoal   ?? null,
        word_count:       wordCount     ?? 1000,
        additional_info:  additionalInfo ?? null,
        partner_code:     partnerCode   ?? null,
        has_pdf:          allPdfFilenames.length > 0,
        pdf_filename:     allPdfFilenames.join(', ') || null,
      })
      .select('id')
      .single();

    if (insertErr) {
      console.error('DB insert error:', insertErr);
      return Response.json(
        { error: 'Datenbankfehler beim Speichern.' },
        { status: 500, headers: CORS }
      );
    }

    // Send notification email (non-blocking — don't fail the request if email fails)
    if (RESEND_KEY) {
      sendNotificationEmail({
        name, email, websiteUrl, topic,
        articleLanguage: articleLanguage ?? 'de',
        articleGoal, wordCount, additionalInfo,
        pdfFilenames: allPdfFilenames,
        partnerCode,
        requestId: inserted.id,
      }).catch((err) => console.error('Email send failed:', err));
    }

    return Response.json({ success: true, requestId: inserted.id }, { headers: CORS });

  } catch (err: any) {
    console.error('send-content-request error:', err);
    return Response.json(
      { error: err.message ?? 'Interner Fehler.' },
      { status: 500, headers: CORS }
    );
  }
});

// ─── Notification email ───────────────────────────────────────────────────────
async function sendNotificationEmail(d: {
  name: string; email: string; websiteUrl: string; topic: string;
  articleLanguage: string; articleGoal?: string; wordCount?: number;
  additionalInfo?: string; pdfFilenames?: string[]; partnerCode?: string;
  requestId: string;
}) {
  const goalMap: Record<string, string> = {
    // Standard options
    'awareness':      'Awareness – Aufmerksamkeit erzeugen',
    'consideration':  'Consideration – Interesse wecken',
    'decision':       'Decision – Kaufentscheidung fördern',
    // Partner-code options (Schuster model)
    'inform':         '01 – Informieren',
    'enable':         '02 – Befähigen',
    'evaluate':       '03 – Evaluieren',
    'assess':         '04 – Bewerten',
    'buy':            '05 – Kaufen',
    'use':            '06 – Nutzen',
    'thought-leader': 'Thought Leadership',
  };

  const row = (label: string, value: string | undefined) =>
    value ? `<tr><td style="padding:4px 12px 4px 0;color:#666;white-space:nowrap"><strong>${label}</strong></td><td style="padding:4px 0">${value}</td></tr>` : '';

  const html = `
    <div style="font-family:sans-serif;max-width:600px">
      <h2 style="color:#df41fb">🎉 Neue Content-Anfrage</h2>
      <table style="border-collapse:collapse;width:100%">
        ${row('Name',        d.name)}
        ${row('E-Mail',      `<a href="mailto:${d.email}">${d.email}</a>`)}
        ${row('Website',     `<a href="${d.websiteUrl}">${d.websiteUrl}</a>`)}
        ${row('Thema',       d.topic)}
        ${row('Sprache',     d.articleLanguage === 'en' ? 'English' : 'Deutsch')}
        ${row('Ziel',        goalMap[d.articleGoal ?? ''] ?? d.articleGoal)}
        ${row('Wörter',      d.wordCount ? String(d.wordCount) : undefined)}
        ${row('Partnercode', d.partnerCode)}
        ${d.pdfFilenames?.length ? row('PDFs', d.pdfFilenames.map((n, i) => `${i + 1}. ${n}`).join('<br>')) : ''}
        ${row('Kontext',     d.additionalInfo)}
        ${row('Request-ID',  d.requestId)}
      </table>
    </div>`;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization':  `Bearer ${RESEND_KEY}`,
      'Content-Type':   'application/json',
    },
    body: JSON.stringify({
      from:    FROM_EMAIL,
      to:      [NOTIFY_EMAIL],
      subject: `Neue Artikel-Anfrage von ${d.name} · ${d.websiteUrl}`,
      html,
    }),
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Resend error ${res.status}: ${txt}`);
  }
}
