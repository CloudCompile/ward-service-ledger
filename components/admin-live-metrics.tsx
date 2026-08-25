'use client';
import { useEffect, useState } from 'react';
export function AdminLiveMetrics(){const [total,setTotal]=useState(0);useEffect(()=>{fetch('/api/totals').then(r=>r.json()).then(d=>setTotal(Number(d.total_hours||0))).catch(()=>{})},[]);return <><Metric label="Total hours" value={total.toFixed(1)} note="Live from Supabase"/><Metric label="Entries" value="—" note="Admin authentication required"/><Metric label="Groups" value="—" note="Managed in Supabase"/></>}
function Metric({label,value,note}:{label:string;value:string;note:string}){return <div className="card rounded-2xl p-5"><div className="eyebrow text-[var(--ink)]/50">{label}</div><div className="mt-4 font-mono text-3xl">{value}</div><div className="mt-2 text-xs text-[var(--ink)]/45">{note}</div></div>}
