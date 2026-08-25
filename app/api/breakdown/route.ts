import { NextResponse } from 'next/server';
import { supabaseServer } from '../../../lib/supabase';
export async function GET(){const {data,error}=await supabaseServer().from('service_entries').select('entity_name,hours').order('created_at',{ascending:false}); if(error)return NextResponse.json({items:[]}); const grouped=new Map<string,number>(); for(const row of data||[])grouped.set(row.entity_name,(grouped.get(row.entity_name)||0)+Number(row.hours)); return NextResponse.json({items:[...grouped].map(([entity_name,hours])=>({entity_name,hours}))});}
