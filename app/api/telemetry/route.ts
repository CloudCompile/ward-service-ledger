import { NextResponse } from 'next/server';
import { recordTelemetry } from '../../../lib/telemetry';

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const path = typeof body?.path === 'string' ? body.path : '/';
  const referrer = typeof body?.referrer === 'string' ? body.referrer : null;
  await recordTelemetry({
    eventType: 'page_view',
    path,
    referrer,
    userAgent: request.headers.get('user-agent'),
  });
  return NextResponse.json({ ok: true });
}
