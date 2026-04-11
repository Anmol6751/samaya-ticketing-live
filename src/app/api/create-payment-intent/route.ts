import { NextResponse } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(req: Request) {
  try {
    // 👈 NEW: We receive the email and tier from the frontend
    const { amount, email, tier } = await req.json();

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "usd",
      // 👈 NEW: We attach it to the Stripe payload so the webhook can read it later
      metadata: {
        customer_email: email,
        ticket_tier: tier,
      }
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}