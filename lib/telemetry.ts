import { supabaseServer } from './supabase';

export type TelemetryEvent = 'page_view' | 'cron_ping';

// Records a website performance/analytics event in Supabase. Writes go through
// the record_telemetry RPC so the table itself stays private.
export async function recordTelemetry(input: {
  eventType: TelemetryEvent;
  path?: string | null;
  referrer?: string | null;
  userAgent?: string | null;
}): Promise<boolean> {
  const { error } = await supabaseServer().rpc('record_telemetry', {
    p_event_type: input.eventType,
    p_path: input.path ?? null,
    p_referrer: input.referrer ?? null,
    p_user_agent: input.userAgent ?? null,
  });
  if (error) console.error('record_telemetry failed:', error.message);
  return !error;
}
