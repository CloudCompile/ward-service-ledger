'use client';
import { useEffect, useState } from 'react';
export function LiveTotal(){const [total,setTotal]=useState('0.0'); useEffect(()=>{fetch('/api/totals').then(r=>r.json()).then(d=>setTotal(Number(d.total_hours||0).toFixed(1))).catch(()=>{});},[]); const [whole,decimal]=total.split('.'); return <>{whole}<span className="ml-2 text-3xl text-[var(--coral)]">.{decimal}</span></>}
