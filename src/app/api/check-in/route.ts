import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SECRET_KEY!
);

export async function POST(req: Request) {
  const { ticketId } = await req.json();

  if (!ticketId) {
    return NextResponse.json({ error: 'No ticket ID provided' }, { status: 400 });
  }

  // 1. Look up the ticket in the database
  const { data: ticket, error: fetchError } = await supabase
    .from('tickets')
    .select('*')
    .eq('stripe_payment_id', ticketId)
    .single();

  if (fetchError || !ticket) {
    return NextResponse.json({ error: 'Ticket not found! Fake ticket alert 🚨' }, { status: 404 });
  }

  // 2. Check if it's already been used
  if (ticket.status === 'checked_in') {
    return NextResponse.json({ error: 'Ticket already used! 🛑' }, { status: 400 });
  }

  // 3. Mark it as checked in
  const { error: updateError } = await supabase
    .from('tickets')
    .update({ status: 'checked_in' })
    .eq('stripe_payment_id', ticketId);

  if (updateError) {
    return NextResponse.json({ error: 'Failed to update ticket status' }, { status: 500 });
  }

  return NextResponse.json({ success: true, message: 'VIP Access Granted! 🟢' });
}