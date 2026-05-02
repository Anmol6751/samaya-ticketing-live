'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Heart, ShieldCheck, ArrowLeft, ArrowRight } from 'lucide-react'

// We wrap the content in a separate component to use useSearchParams safely in Next.js
function ImpactContent() {
  const searchParams = useSearchParams()
  
  // Grab the data passed from the previous page, with safe fallbacks
  const amount = searchParams.get('amount') || 'Custom Amount'
  const description = searchParams.get('desc') || 'Your generous donation will be distributed to those in need across the globe.'
  const stripeUrl = searchParams.get('url') || 'https://buy.stripe.com/test_fZu6oJgiidKi8lsfaP7ss02'

  return (
    <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
      
      {/* Left Side: The Emotional Impact */}
      <div className="space-y-8 animate-in fade-in slide-in-from-left-8 duration-700">
        <Link href="/donate" className="inline-flex items-center text-emerald-400 hover:text-emerald-300 transition-colors text-sm font-semibold">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Donation Options
        </Link>
        
        <div>
          <h1 className="text-5xl font-bold mb-6 text-white leading-tight">
            You are about to change a life.
          </h1>
          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            Before we securely process your <span className="text-emerald-400 font-bold">{amount}</span> donation, we wanted to take a moment to say thank you. 
          </p>
          
          <div className="bg-emerald-950/30 border border-emerald-500/30 p-6 rounded-2xl backdrop-blur-sm">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-emerald-500/20 rounded-full mt-1">
                <Heart className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-emerald-300 mb-2">Your Impact:</h3>
                <p className="text-slate-300">{description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: The Secure Checkout Card */}
      <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl animate-in fade-in slide-in-from-right-8 duration-700 delay-150">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-slate-950 rounded-full flex items-center justify-center mx-auto mb-6 border border-slate-800 shadow-inner">
            <ShieldCheck className="w-10 h-10 text-emerald-500" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Secure Checkout</h2>
          <p className="text-slate-400 text-sm">Encrypted payment processed by Stripe</p>
        </div>

        <div className="bg-slate-950 p-6 rounded-2xl mb-8 border border-slate-800 flex justify-between items-center">
          <span className="text-slate-400 font-medium">Total Donation</span>
          <span className="text-3xl font-bold text-white">{amount}</span>
        </div>

        <a
          href={stripeUrl}
          className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-emerald-500/25 hover:-translate-y-1"
        >
          Proceed to Payment <ArrowRight className="w-5 h-5" />
        </a>
        
        <p className="text-center text-slate-500 text-xs mt-6">
          You will receive an official tax-deductible email receipt immediately after your transaction is complete.
        </p>
      </div>

    </div>
  )
}

export default function ImpactPage() {
  return (
    <div className="min-h-screen bg-slate-950 pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden relative">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none"></div>
      
      {/* Suspense boundary is required by Next.js when using useSearchParams */}
      <Suspense fallback={
        <div className="flex justify-center items-center h-64 text-emerald-500">Loading secure portal...</div>
      }>
        <ImpactContent />
      </Suspense>
    </div>
  )
}