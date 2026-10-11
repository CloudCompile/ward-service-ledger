import { NextResponse } from 'next/server';
import { recordTelemetry } from '../../../../lib/telemetry';

// Daily Vercel cron heartbeat. Writes one telemetry row so the database never
// goes a day without activity. When CRON_SECRET is set, Vercel sends it as a
// bearer token and we require it.
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (secret && request.headers.get('authorization') !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const ok = await recordTelemetry({
    eventType: 'cron_ping',
    path: '/api/cron/daily',
    userAgent: request.headers.get('user-agent'),
  });
  if (!ok) return NextResponse.json({ ok: false }, { status: 500 });
  return NextResponse.json({ ok: true, at: new Date().toISOString() });
}
