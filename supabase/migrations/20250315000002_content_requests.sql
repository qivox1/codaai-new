-- ============================================================
-- CodaAI Free Trial – Content Requests
-- content_requests: one record per submitted free trial request
-- partner_codes:    validated codes that unlock 4000-word slider
-- ============================================================

-- ── content_requests ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS content_requests (
  id               UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name             TEXT        NOT NULL,
  email            TEXT        NOT NULL,
  website_url      TEXT        NOT NULL,
  website_domain   TEXT        NOT NULL,            -- extracted hostname for duplicate check
  topic            TEXT        NOT NULL,
  article_language TEXT        NOT NULL DEFAULT 'de',
  article_goal     TEXT,
  word_count       INTEGER     NOT NULL DEFAULT 1000,
  additional_info  TEXT,
  partner_code     TEXT,
  has_pdf          BOOLEAN     NOT NULL DEFAULT FALSE,
  pdf_filename     TEXT,
  status           TEXT        NOT NULL DEFAULT 'pending',
  -- status values: pending | in_progress | delivered | cancelled
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- One free trial per email and per domain
CREATE UNIQUE INDEX IF NOT EXISTS idx_content_requests_email
  ON content_requests(LOWER(email));

CREATE UNIQUE INDEX IF NOT EXISTS idx_content_requests_domain
  ON content_requests(LOWER(website_domain));

CREATE INDEX IF NOT EXISTS idx_content_requests_status
  ON content_requests(status);

CREATE INDEX IF NOT EXISTS idx_content_requests_created
  ON content_requests(created_at DESC);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_content_requests_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_content_requests_updated_at ON content_requests;
CREATE TRIGGER trg_content_requests_updated_at
  BEFORE UPDATE ON content_requests
  FOR EACH ROW EXECUTE FUNCTION update_content_requests_updated_at();

-- ── partner_codes ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS partner_codes (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  code        TEXT        NOT NULL UNIQUE,   -- stored UPPERCASE
  active      BOOLEAN     NOT NULL DEFAULT TRUE,
  description TEXT,                          -- internal note, e.g. "Agency XYZ"
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_partner_codes_code
  ON partner_codes(UPPER(code));

-- ── Row-Level Security ────────────────────────────────────────
ALTER TABLE content_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE partner_codes     ENABLE ROW LEVEL SECURITY;

-- Only service_role (Edge Functions) can read/write — no public access

-- ── Seed a test partner code (remove in production) ───────────
-- INSERT INTO partner_codes (code, description) VALUES ('CODAAI2025', 'Internal test code')
-- ON CONFLICT (code) DO NOTHING;
