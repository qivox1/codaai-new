/* Aggregierte Kennzahlen der Studie als CSV (seit 22.09.2026, Maßnahme 5). Quelle: src/data/studie.ts. */
import type { APIRoute } from 'astro';
import { kennzahlenCsv } from '../../data/studie';

export const GET: APIRoute = () =>
  new Response('﻿' + kennzahlenCsv('de'), {
    headers: { 'Content-Type': 'text/csv; charset=utf-8' },
  });
