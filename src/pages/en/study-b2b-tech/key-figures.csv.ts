/* Aggregierte Kennzahlen des KI-Blindtest B2B-Tech 2026 als CSV. Quelle: src/data/studie-b2b-tech.ts. */
import type { APIRoute } from 'astro';
import { techKennzahlenCsv } from '../../../data/studie-b2b-tech';

export const GET: APIRoute = () =>
  new Response('﻿' + techKennzahlenCsv('en'), {
    headers: { 'Content-Type': 'text/csv; charset=utf-8' },
  });
