-- ============================================================
-- CodaAI Checkout Schema
-- pending_registrations: ephemeral, deleted after 1 hour
-- subscribers:           permanent, created after Stripe success
-- ============================================================

-- Enable pgcrypto for gen_random_bytes
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ── pending_registrations ────────────────────────────────────
CREATE TABLE IF NOT EXISTS pending_registrations (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email            TEXT NOT NULL,
  phone            TEXT NOT NULL,                  -- E.164 format, e.g. +49170123456
  email_verified   BOOLEAN NOT NULL DEFAULT FALSE,
  phone_verified   BOOLEAN NOT NULL DEFAULT FALSE,
  sms_otp_hash     TEXT NOT NULL,                  -- bcrypt hash of 6-digit OTP
  sms_expires_at   TIMESTAMPTZ NOT NULL,
  sms_attempts     INTEGER NOT NULL DEFAULT 0,     -- max 5
  package_config   JSONB NOT NULL,                 -- full calculator state
  stripe_session_id TEXT,                          -- set after create-checkout
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  expires_at       TIMESTAMPTZ NOT NULL DEFAULT NOW() + INTERVAL '1 hour'
);

-- Auto-delete expired registrations (runs via pg_cron if enabled, or manual cleanup)
CREATE INDEX IF NOT EXISTS idx_pending_reg_expires ON pending_registrations(expires_at);
CREATE INDEX IF NOT EXISTS idx_pending_reg_email   ON pending_registrations(email);

-- ── subscribers ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS subscribers (
  id                      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email                   TEXT NOT NULL UNIQUE,
  phone                   TEXT NOT NULL,
  stripe_customer_id      TEXT UNIQUE,
  stripe_subscription_id  TEXT UNIQUE,
  subscription_status     TEXT NOT NULL DEFAULT 'pending',
  -- status values: pending | active | past_due | cancelled | trialing
  package_config          JSONB,
  created_at              TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at              TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_subscribers_stripe_customer
  ON subscribers(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_subscribers_stripe_sub
  ON subscribers(stripe_subscription_id);

-- ── Row-Level Security ────────────────────────────────────────
ALTER TABLE pending_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscribers           ENABLE ROW LEVEL SECURITY;

-- Only service_role (Edge Functions) can read/write — no public access
-- (anon role gets nothing by default when RLS is enabled and no policy matches)

-- ── Cleanup function (call periodically via pg_cron) ─────────
CREATE OR REPLACE FUNCTION cleanup_expired_registrations()
RETURNS void LANGUAGE sql AS $$
  DELETE FROM pending_registrations WHERE expires_at < NOW();
$$;
