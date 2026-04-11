'use client';

import { useState } from 'react';
import { ArrowLeft, Ticket, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const MOCK_EVENT = {
  id: '1',
  title: "Samaya Annual Charity Gala",
  date: "Dec 15, 2026",
  tiers: [
    { id: 'vip', name: 'VIP Experience', price: 250, description: 'Premium seating, dinner, and gift bag' },
    { id: 'general', name: 'General Admission', price: 100, description: 'Full access to gala and performances' },
  ]
};

const CheckoutForm = ({ total }: { total: number }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/success`,
      },
    });

    if (error) {
      setErrorMessage(error.message || 'An unknown error occurred');
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
      <PaymentElement />
      {errorMessage && <div className="text-red-400 text-sm text-center">{errorMessage}</div>}
      <button 
        disabled={!stripe || isProcessing}
        className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-600 disabled:text-slate-400 text-slate-950 font-bold rounded-xl transition-all shadow-lg active:scale-95"
      >
        {isProcessing ? 'Processing Securely...' : `Pay $${total}`}
      </button>
    </form>
  );
};

export default function CheckoutPage() {
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({ vip: 0, general: 0 });
  const [email, setEmail] = useState(""); // 👈 NEW: Email state
  const [clientSecret, setClientSecret] = useState(""); 
  const [isInitializing, setIsInitializing] = useState(false);
  
  const updateQty = (id: string, delta: number) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(0, prev[id] + delta)
    }));
  };

  const total = MOCK_EVENT.tiers.reduce((acc, tier) => acc + (tier.price * quantities[tier.id]), 0);

  const startCheckout = async () => {
    setIsInitializing(true);
    
    // 👈 NEW: Figure out which tiers they selected to send to the database
    const selectedTiers = Object.entries(quantities)
      .filter(([id, qty]) => qty > 0)
      .map(([id]) => MOCK_EVENT.tiers.find(t => t.id === id)?.name)
      .join(' & ');

    try {
      const res = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // 👈 NEW: We are now sending the email and tier to the backend!
        body: JSON.stringify({ amount: total, email: email, tier: selectedTiers }),
      });
      
      const data = await res.json();
      setClientSecret(data.clientSecret); 
    } catch (error) {
      console.error("Failed to initialize checkout", error);
    }
    setIsInitializing(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <Link href="/events" className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors mb-8">
          <ArrowLeft size={20} /> Back to Events
        </Link>

        <div className="grid md:grid-cols-3 gap-12">
          {/* Ticket Selection */}
          <div className="md:col-span-2 space-y-6">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-300 to-cyan-400 bg-clip-text text-transparent">
              Select Tickets
            </h1>
            
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 mb-6">
              <h2 className="text-xl font-semibold mb-2">{MOCK_EVENT.title}</h2>
              <p className="text-slate-400 text-sm">📅 {MOCK_EVENT.date}</p>
            </div>

            {MOCK_EVENT.tiers.map((tier) => (
              <div key={tier.id} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex items-center justify-between hover:border-emerald-500/50 transition-colors">
                <div>
                  <h3 className="font-bold text-lg">{tier.name}</h3>
                  <p className="text-slate-400 text-sm mb-2">{tier.description}</p>
                  <span className="text-emerald-400 font-mono text-xl">${tier.price}</span>
                </div>
                
                <div className={`flex items-center gap-4 bg-slate-800 rounded-lg p-2 ${clientSecret ? 'opacity-50 pointer-events-none' : ''}`}>
                  <button onClick={() => updateQty(tier.id, -1)} className="w-8 h-8 rounded bg-slate-700 hover:bg-slate-600 flex items-center justify-center">-</button>
                  <span className="w-4 text-center font-bold">{quantities[tier.id]}</span>
                  <button onClick={() => updateQty(tier.id, 1)} className="w-8 h-8 rounded bg-emerald-600 hover:bg-emerald-500 flex items-center justify-center">+</button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-slate-900 border border-emerald-500/20 p-8 rounded-3xl h-fit sticky top-8 shadow-2xl shadow-emerald-500/5">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Ticket className="text-emerald-400" /> Order Summary
            </h3>
            
            <div className="space-y-4 mb-6">
              {Object.entries(quantities).map(([id, qty]) => {
                if (qty === 0) return null;
                const tier = MOCK_EVENT.tiers.find(t => t.id === id);
                return (
                  <div key={id} className="flex justify-between text-sm">
                    <span className="text-slate-400">{qty}x {tier?.name}</span>
                    <span>${(tier?.price || 0) * qty}</span>
                  </div>
                );
              })}
              <div className="border-t border-slate-800 pt-4 flex justify-between font-bold text-xl">
                <span>Total</span>
                <span className="text-emerald-400">${total}</span>
              </div>
            </div>

            {/* 👈 NEW: The Email Input Box */}
            <div className="mb-6">
              <label className="block text-sm text-slate-400 mb-2">Guest Email Address <span className="text-emerald-400">*</span></label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!!clientSecret}
                placeholder="Where should we send the tickets?" 
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors disabled:opacity-50"
              />
            </div>

            {!clientSecret ? (
              <button 
                onClick={startCheckout}
                // 👈 NEW: Don't let them proceed if they haven't typed an email
                disabled={total === 0 || isInitializing || !email.includes('@')}
                className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-800 disabled:text-slate-500 text-slate-950 font-bold rounded-xl transition-all shadow-lg active:scale-95"
              >
                {isInitializing ? "Loading Secure Checkout..." : "Proceed to Payment"}
              </button>
            ) : (
              <div className="mt-6 border-t border-slate-800 pt-6">
                <p className="text-sm text-slate-400 mb-4 text-center">Enter your payment details</p>
                <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: 'night' } }}>
                  <CheckoutForm total={total} />
                </Elements>
              </div>
            )}

            <p className="mt-6 text-[10px] text-slate-500 text-center flex items-center justify-center gap-1">
              <ShieldCheck size={12} /> Secure Checkout powered by Stripe
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}