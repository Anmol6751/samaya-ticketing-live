'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle } from 'lucide-react'

function DonateSuccessContent() {
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<string | null>(null)

  useEffect(() => {
    setStatus(searchParams.get('redirect_status'))
  }, [searchParams])

  return (
    <div className="max-w-2xl w-full mx-auto bg-slate-900 border border-emerald-500/30 p-8 md:p-12 rounded-3xl shadow-2xl shadow-emerald-500/10 text-center relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>

      {status === 'succeeded' || !status ? (
        <div className="relative z-10 animate-in fade-in zoom-in duration-700">
          <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="text-emerald-400 w-12 h-12" />
          </div>
          
          <h1 className="text-4xl font-bold text-white mb-4 leading-tight">
            Thank You for Your Generosity!
          </h1>
          
          <p className="text-lg text-slate-300 mb-8">
            Your donation has been successfully processed. An email receipt will be sent to you shortly via Stripe. Your contribution will directly impact lives and bring hope to those who need it most.
          </p>

          <div className="relative h-64 w-full rounded-2xl overflow-hidden shadow-2xl border border-emerald-500/20 mb-8">
            <Image 
              src="/images/Donate/charity-impact.png" 
              alt="Joyful community" 
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4 text-emerald-300 font-medium text-lg text-center tracking-wide">
              You've made a difference today.
            </div>
          </div>

          <Link 
            href="/"
            className="inline-flex items-center justify-center px-8 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl transition-all shadow-lg active:scale-95"
          >
            Return to Home
          </Link>
        </div>
      ) : (
        <div className="py-12 relative z-10">
          <div className="w-12 h-12 border-4 border-slate-700 border-t-emerald-400 rounded-full animate-spin mx-auto mb-4"></div>
          <h1 className="text-lg font-bold text-white">Verifying Payment...</h1>
        </div>
      )}
    </div>
  )
}

export default function DonateSuccessPage() {
  return (
    <div className="min-h-screen bg-slate-950 pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden relative flex items-center justify-center">
      <Suspense fallback={
        <div className="flex justify-center items-center h-64 text-emerald-500">Loading your confirmation...</div>
      }>
        <DonateSuccessContent />
      </Suspense>
    </div>
  )
}
