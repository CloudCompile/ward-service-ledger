'use client';
import { useEffect } from 'react';

// Sends one anonymous page-view event per load so website performance shows up
// in Supabase. No cookies or identifiers are collected.
export function TelemetryTracker() {
  useEffect(() => {
    fetch('/api/telemetry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path: window.location.pathname, referrer: document.referrer || null }),
      keepalive: true,
    }).catch(() => {});
  }, []);
  return null;
}
