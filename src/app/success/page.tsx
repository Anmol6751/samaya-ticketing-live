'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, Calendar, MapPin, Ticket } from 'lucide-react';
// Import the new QR Code library
import { QRCodeSVG } from 'qrcode.react';

function SuccessContent() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<string | null>(null);
  const [ticketId, setTicketId] = useState<string | null>(null);

  useEffect(() => {
    // We pull both the status AND the unique payment ID from the Stripe URL
    setStatus(searchParams.get('redirect_status'));
    setTicketId(searchParams.get('payment_intent'));
  }, [searchParams]);

  return (
    <div className="max-w-md w-full bg-slate-900 border border-emerald-500/30 p-8 rounded-3xl shadow-2xl shadow-emerald-500/10 text-center relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>

      {status === 'succeeded' ? (
        <div className="relative z-10 animate-in fade-in zoom-in duration-500">
          <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="text-emerald-400 w-10 h-10" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Payment Successful!</h1>
          <p className="text-slate-400 mb-6 text-sm">Your tickets to the Samaya Gala are confirmed.</p>

          {/* --- THE DIGITAL TICKET (QR CODE) --- */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 mb-6 flex flex-col items-center relative overflow-hidden">
            {/* Little ticket cutout effects */}
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-slate-900 rounded-full border-r border-slate-800"></div>
            <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-slate-900 rounded-full border-l border-slate-800"></div>
            
            <p className="text-emerald-400 font-bold mb-4 tracking-widest text-sm uppercase">Digital Pass</p>
            
            <div className="bg-white p-3 rounded-xl mb-3 shadow-lg">
              {ticketId && (
                <QRCodeSVG
                  value={ticketId}
                  size={150}
                  level="H"
                  fgColor="#020617" // Dark slate color
                />
              )}
            </div>
            
            <p className="text-[10px] text-slate-500 font-mono break-all px-4">{ticketId}</p>
          </div>

          <div className="bg-slate-950 rounded-xl p-4 mb-6 text-left border border-slate-800">
            <h3 className="font-semibold text-emerald-400 flex items-center gap-2 mb-3 text-sm">
              <Ticket size={14} /> Event Details
            </h3>
            <div className="space-y-2 text-xs text-slate-300">
              <p className="flex items-center gap-3"><Calendar size={14} className="text-slate-500"/> Dec 15, 2026</p>
              <p className="flex items-center gap-3"><MapPin size={14} className="text-slate-500"/> The Grand Hotel, NY</p>
            </div>
          </div>

          <Link 
            href="/events"
            className="block w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl transition-all shadow-lg active:scale-95 text-sm"
          >
            Return to Events
          </Link>
        </div>
      ) : (
        <div className="py-12">
          <div className="w-12 h-12 border-4 border-slate-700 border-t-emerald-400 rounded-full animate-spin mx-auto mb-4"></div>
          <h1 className="text-lg font-bold text-white">Verifying Payment...</h1>
        </div>
      )}
    </div>
  );
}

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6 relative">
      <Suspense fallback={<div className="w-12 h-12 border-4 border-slate-700 border-t-emerald-400 rounded-full animate-spin"></div>}>
        <SuccessContent />
      </Suspense>
    </div>
  );
}