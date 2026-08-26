'use client';
import { useEffect,useState } from 'react';
const frames=['·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·','·  ·  ·  ✦  ·  ·  ·  ✦  ·  ·  ·  ✦  ·  ·  ·','✦  ·  ·  ·  ·  ✦  ·  ·  ·  ·  ✦  ·  ·  ·  ·'];
export function FullWidthAscii(){const [i,setI]=useState(0);useEffect(()=>{const id=setInterval(()=>setI(x=>(x+1)%frames.length),900);return()=>clearInterval(id)},[]);return <div className="relative left-1/2 mt-10 w-screen -translate-x-1/2 overflow-hidden bg-[var(--ink)] px-6 py-5 text-center text-xs tracking-[.25em] text-[var(--gold)] motion-reduce:hidden"><pre aria-label="Animated service constellation">{`╭────────────────────────────────────────────────────────────╮\n│  ${frames[i]}  │\n╰────────────────────────────────────────────────────────────╯`}</pre></div>}
