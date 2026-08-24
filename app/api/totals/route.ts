import { NextResponse } from 'next/server';
import { supabaseServer } from '../../../lib/supabase';
export async function GET(){const {data,error}=await supabaseServer().rpc('get_public_service_totals'); if(error) return NextResponse.json({total_hours:0},{status:200}); return NextResponse.json(data||{total_hours:0});}
