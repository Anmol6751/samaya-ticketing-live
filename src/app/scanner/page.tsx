'use client';

import { useState } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';
import { CheckCircle, XCircle, Camera, Loader2 } from 'lucide-react';

export default function ScannerPage() {
  const [scanStatus, setScanStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('Point camera at a ticket QR code');
  const [manualId, setManualId] = useState(''); // 👈 NEW: State for manual typing

  const handleScan = async (scannedData: string) => {
    if (scanStatus === 'loading' || !scannedData) return;
    
    setScanStatus('loading');
    setMessage('Verifying ticket...');

    try {
      const response = await fetch('/api/check-in', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ticketId: scannedData }),
      });

      const data = await response.json();

      if (response.ok) {
        setScanStatus('success');
        setMessage(data.message);
        setManualId(''); // Clear the box on success
      } else {
        setScanStatus('error');
        setMessage(data.error || 'Invalid Ticket');
      }
    } catch (error) {
      setScanStatus('error');
      setMessage('Network error. Try again.');
    }

    setTimeout(() => {
      setScanStatus('idle');
      setMessage('Point camera at a ticket QR code');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center py-12 px-6">
      <div className="max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center justify-center gap-3">
          <Camera className="text-emerald-400" /> Door Scanner
        </h1>
        <p className="text-slate-400 mb-8">Samaya Annual Charity Gala</p>

        {/* --- CAMERA WINDOW --- */}
        <div className="bg-slate-900 p-4 rounded-3xl border border-slate-800 shadow-2xl mb-6 overflow-hidden relative">
          <div className="rounded-2xl overflow-hidden aspect-square border border-slate-800 bg-black flex items-center justify-center relative">
            <Scanner 
              onScan={(result) => handleScan(result[0].rawValue)}
              formats={['qr_code']}
              components={{ onOff: true, torch: true }}
            />
            {scanStatus === 'loading' && (
              <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-10">
                <Loader2 className="w-12 h-12 text-emerald-400 animate-spin" />
              </div>
            )}
          </div>
        </div>

        {/* 👇 NEW: MANUAL OVERRIDE BOX 👇 */}
        <form 
          onSubmit={(e) => { e.preventDefault(); handleScan(manualId); }} 
          className="mb-8 flex gap-2"
        >
          <input 
            type="text" 
            value={manualId}
            onChange={(e) => setManualId(e.target.value)}
            placeholder="Or type Ticket ID manually..."
            className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
          />
          <button 
            type="submit" 
            disabled={!manualId}
            className="bg-slate-800 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3 rounded-xl text-sm font-bold transition-colors"
          >
            Verify
          </button>
        </form>

        {/* --- STATUS MESSAGES --- */}
        <div className={`p-6 rounded-2xl border transition-all duration-300 ${
          scanStatus === 'idle' ? 'bg-slate-900 border-slate-800' :
          scanStatus === 'success' ? 'bg-emerald-950/50 border-emerald-500/50 text-emerald-400' :
          scanStatus === 'error' ? 'bg-red-950/50 border-red-500/50 text-red-400' :
          'bg-slate-900 border-slate-800 text-slate-300'
        }`}>
          <div className="flex items-center justify-center gap-3">
            {scanStatus === 'success' && <CheckCircle className="w-6 h-6" />}
            {scanStatus === 'error' && <XCircle className="w-6 h-6" />}
            <span className="font-semibold text-lg">{message}</span>
          </div>
        </div>

      </div>
    </div>
  );
}