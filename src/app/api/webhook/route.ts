import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend'; 

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY!;
const supabase = createClient(supabaseUrl, supabaseSecretKey);

const resend = new Resend(process.env.RESEND_API_KEY); 

export async function POST(req: Request) {
  const payload = await req.text();
  const sig = req.headers.get('stripe-signature');
  let event: any;

  try {
    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object as any; 
    
    console.log(`✅ Payment received! Saving ticket to database...`);
    
    const { error: dbError } = await supabase
      .from('tickets')
      .insert([
        {
          stripe_payment_id: paymentIntent.id,
          amount_paid: paymentIntent.amount / 100,
          customer_email: paymentIntent.metadata.customer_email,
          ticket_tier: paymentIntent.metadata.ticket_tier,
        }
      ]);

    if (dbError) {
      console.error("❌ Database Error:", dbError);
    } else {
      console.log("🎟️ Ticket safely locked in the Supabase vault!");
      
      // 👇 THIS IS THE NEW ERROR CATCHING LOGIC 👇
      const { data, error: resendError } = await resend.emails.send({
        from: 'Samaya Tickets <onboarding@resend.dev>',
        to: paymentIntent.metadata.customer_email, // 🚨 REMEMBER TO CHANGE THIS!
        subject: '🎟️ Your Ticket to the Samaya Gala',
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <div style="text-align: center; margin-bottom: 20px;">
              <h1 style="color: #10b981; margin-bottom: 5px;">Payment Successful!</h1>
              <p style="color: #64748b; margin-top: 0;">Your ticket to the Samaya Gala is confirmed.</p>
            </div>
            
            <div style="text-align: center; padding: 20px; background-color: #f8fafc; border-radius: 10px; border: 1px dashed #cbd5e1; margin-bottom: 20px;">
              <p style="font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 15px;">Digital Pass</p>
              <img 
                src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${paymentIntent.id}" 
                alt="Ticket QR Code" 
                style="display: block; margin: 0 auto; border-radius: 10px;"
              />
              <p style="font-family: monospace; color: #94a3b8; font-size: 12px; margin-top: 15px;">${paymentIntent.id}</p>
            </div>
            
            <div style="background-color: #ffffff; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0;">
              <p style="margin: 5px 0; font-size: 14px;"><strong>Amount Paid:</strong> $${paymentIntent.amount / 100}</p>
              <p style="margin: 5px 0; font-size: 14px;"><strong>Date:</strong> Dec 15, 2026</p>
              <p style="margin: 5px 0; font-size: 14px;"><strong>Location:</strong> The Grand Hotel, NY</p>
            </div>
          </div>
        `
      });

      if (resendError) {
        console.error("\n❌ RESEND API BLOCKED THE EMAIL!");
        console.error("Reason:", resendError.message, "\n");
      } else {
        console.log("📧 Email receipt sent successfully! ID:", data?.id);
      }
    }
  }

  return NextResponse.json({ received: true });
}