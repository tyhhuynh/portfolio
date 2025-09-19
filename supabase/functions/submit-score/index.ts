// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { createClient } from 'jsr:@supabase/supabase-js@2';

// env vars testing**
const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
const SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
if (!SUPABASE_URL || !SERVICE_ROLE_KEY) throw new Error('missing env');

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

const JSON_HDR = { 'Content-Type': 'application/json' };
const CORS_HDR = {
  'Access-Control-Allow-Origin': '*', // change to tyhh.dev for deployment
  'Access-Control-Allow-Headers': 'authorization, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const bad = (msg: string, status = 400) =>
  new Response(JSON.stringify({ error: msg }), {
    status,
    headers: { ...JSON_HDR, ...CORS_HDR },
  });

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS')
    return new Response(null, { headers: CORS_HDR });
  if (req.method !== 'POST') return bad('Method Not Allowed', 405);

  try {
    const body = await req.json().catch(() => ({}));
    const name = (body?.player_name ?? '').toString().trim();
    const scoreNum =
      typeof body?.score === 'number'
        ? Math.floor(body.score)
        : Number(body?.score);

    // Validate
    if (!name) return bad('player_name is required');
    if (name.length > 32) return bad('player_name must be ≤ 32 chars');
    if (!Number.isFinite(scoreNum)) return bad('score must be a number');
    if (scoreNum < 0) return bad('score must be ≥ 0');
    const MAX_REASONABLE = 10_000_000;
    if (scoreNum > MAX_REASONABLE) return bad('score too large');

    // Insert
    const { data: inserted, error: insertErr } = await supabase
      .from('scores')
      .insert({ player_name: name, score: scoreNum })
      .select('id, created_at')
      .single();
    if (insertErr || !inserted) return bad(`Insert failed`, 500);

    const createdAt = inserted.created_at as string;

    // Rank: count rows ahead (score DESC, created_at ASC)
    const { count: aheadCount, error: countErr } = await supabase
      .from('scores')
      .select('id', { count: 'exact', head: true })
      .or(
        `score.gt.${scoreNum},and(score.eq.${scoreNum},created_at.lt.${createdAt})`
      );
    if (countErr) return bad('Rank query failed', 500);

    const rank = (aheadCount ?? 0) + 1;

    // Total rows
    const { count: total, error: totErr } = await supabase
      .from('scores')
      .select('id', { count: 'exact', head: true });
    if (totErr) return bad('Total query failed', 500);

    // Neighbors window: show the 10-row bucket containing the rank (e.g., 11–20 for rank 13)
    const start = Math.floor((rank - 1) / 10) * 10 + 1; // 1,11,21,...
    const offset = Math.max(0, start - 1);
    const limit = 10;

    const { data: windowRows, error: winErr } = await supabase
      .from('scores')
      .select('player_name, score, created_at')
      .order('score', { ascending: false })
      .order('created_at', { ascending: true })
      .range(offset, offset + limit - 1);
    if (winErr) return bad('Window query failed', 500);

    // Attach rank numbers to window (rank = offset + index + 1)
    const neighbors = (windowRows ?? []).map((r, i) => ({
      rank: offset + i + 1,
      player_name: r.player_name,
      score: r.score,
      created_at: r.created_at,
    }));

    return new Response(
      JSON.stringify({
        id: inserted.id,
        player_name: name,
        score: scoreNum,
        rank,
        total,
        neighbors, // 10-row bucket (e.g., 11–20)
      }),
      { headers: { ...JSON_HDR, ...CORS_HDR } }
    );
  } catch {
    return bad('Unexpected error', 500);
  }
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/submit-score' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
