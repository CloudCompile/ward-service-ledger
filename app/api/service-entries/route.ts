import { NextResponse } from 'next/server';
import { supabaseServer } from '../../../lib/supabase';

export async function POST(request: Request){
  const form=await request.formData();
  const entity_name=String(form.get('entity_name')||'').trim();
  const hours=Number(form.get('hours'));
  const description=String(form.get('description')||'').trim();
  const service_date=String(form.get('service_date')||'');
  if(!entity_name||!description||!service_date||!Number.isFinite(hours)||hours<=0) return NextResponse.json({error:'Invalid entry'},{status:400});
  const {error}=await supabaseServer().from('service_entries').insert({entity_name,hours,description,service_date});
  if(error) return NextResponse.json({error:error.message},{status:500});
  return NextResponse.json({ok:true});
}
