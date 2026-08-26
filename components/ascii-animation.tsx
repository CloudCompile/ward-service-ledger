'use client';
import { useEffect,useState } from 'react';
const frames=['  .  ·  .  ·  .  ','  ·  *  ·  *  ·  ','  *  ·  +  ·  *  ','  ·  *  ·  *  ·  '];
export function AsciiAnimation(){const [frame,setFrame]=useState(0);useEffect(()=>{const id=setInterval(()=>setFrame(x=>(x+1)%frames.length),700);return()=>clearInterval(id)},[]);return <pre aria-label="Animated constellation" className="ascii-art select-none text-center text-xs leading-6 text-[var(--coral)] motion-reduce:hidden">{`+------------------+\n|${frames[frame]}|\n|  ·  ·  +  ·  ·  |\n+------------------+`}</pre>}
