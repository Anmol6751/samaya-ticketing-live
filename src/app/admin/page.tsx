'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Users, DollarSign, CheckCircle, Ticket, RefreshCw, Lock, ArrowRight } from 'lucide-react';

// Connect to Supabase using your public keys
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AdminDashboard() {
  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState(false);

  // Dashboard State
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 🚨 THE MASTER PASSWORD (Change this to whatever you want!)
  const ADMIN_PASSCODE = 'samaya2026';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === ADMIN_PASSCODE) {
      setIsAuthenticated(true);
      fetchTickets(); // Only fetch data AFTER unlocking
    } else {
      setAuthError(true);
      setPasscode('');
    }
  };

  const fetchTickets = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('tickets')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) setTickets(data);
    setLoading(false);
  };

  // ==========================================
  // VIEW 1: THE LOGIN SCREEN
  // ==========================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="max-w-sm w-full bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl relative z-10">
          <div className="w-16 h-16 bg-slate-950 border border-slate-800 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
            <Lock className="text-emerald-400 w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-white text-center mb-2">Admin Access</h1>
          <p className="text-slate-400 text-center text-sm mb-8">Enter the master passcode to access the Command Center.</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  setAuthError(false);
                }}
                placeholder="Enter passcode..."
                className={`w-full bg-slate-950 border ${authError ? 'border-red-500' : 'border-slate-800'} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors`}
              />
              {authError && <p className="text-red-400 text-xs mt-2 text-center animate-pulse">Incorrect passcode. Try again.</p>}
            </div>
            
            <button 
              type="submit"
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl py-3 flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              Unlock Dashboard <ArrowRight size={18} />
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Calculate live statistics for the dashboard
  const totalRevenue = tickets.reduce((sum, t) => sum + t.amount_paid, 0);
  const checkedInCount = tickets.filter(t => t.status === 'checked_in').length;

  // ==========================================
  // VIEW 2: THE DASHBOARD (Hidden behind login)
  // ==========================================
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-6xl mx-auto">
        
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Samaya Gala Command Center</h1>
            <p className="text-slate-400 mt-1">Live event metrics and ticket database</p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={fetchTickets}
              className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg transition-colors border border-slate-700"
            >
              <RefreshCw size={16} className={loading ? "animate-spin text-emerald-400" : "text-emerald-400"} />
              Refresh Data
            </button>
            <button 
              onClick={() => setIsAuthenticated(false)}
              className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 px-4 py-2 rounded-lg transition-colors border border-red-500/20"
            >
              <Lock size={16} /> Lock
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-lg">
            <div className="flex items-center gap-4 mb-2">
              <div className="p-3 bg-emerald-500/10 rounded-lg"><Ticket className="text-emerald-400" /></div>
              <h3 className="text-slate-400 font-medium">Total Tickets Sold</h3>
            </div>
            <p className="text-4xl font-bold text-white">{tickets.length}</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-lg">
            <div className="flex items-center gap-4 mb-2">
              <div className="p-3 bg-emerald-500/10 rounded-lg"><DollarSign className="text-emerald-400" /></div>
              <h3 className="text-slate-400 font-medium">Gross Revenue</h3>
            </div>
            <p className="text-4xl font-bold text-white">${totalRevenue}</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-lg">
            <div className="flex items-center gap-4 mb-2">
              <div className="p-3 bg-emerald-500/10 rounded-lg"><Users className="text-emerald-400" /></div>
              <h3 className="text-slate-400 font-medium">Guests Checked In</h3>
            </div>
            <p className="text-4xl font-bold text-white">{checkedInCount} <span className="text-lg text-slate-500 font-normal">/ {tickets.length}</span></p>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-slate-800 flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">Live Guest Ledger</h2>
            <span className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-xs font-semibold border border-emerald-500/30">
              Database Connected 🟢
            </span>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-950/50 border-b border-slate-800">
                  <th className="p-4 text-slate-400 font-medium text-sm">Ticket ID</th>
                  <th className="p-4 text-slate-400 font-medium text-sm">Guest Email</th>
                  <th className="p-4 text-slate-400 font-medium text-sm">Tier</th>
                  <th className="p-4 text-slate-400 font-medium text-sm">Amount</th>
                  <th className="p-4 text-slate-400 font-medium text-sm">Status</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket) => (
                  <tr key={ticket.id} className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors">
                    <td className="p-4 font-mono text-xs text-slate-500">{ticket.stripe_payment_id.slice(0, 14)}...</td>
                    <td className="p-4 text-slate-200">{ticket.customer_email}</td>
                    <td className="p-4 text-slate-400 text-sm">{ticket.ticket_tier}</td>
                    <td className="p-4 text-slate-200">${ticket.amount_paid}</td>
                    <td className="p-4">
                      {ticket.status === 'checked_in' ? (
                        <span className="flex items-center gap-1 text-emerald-400 text-xs font-bold bg-emerald-400/10 px-2 py-1 rounded w-fit">
                          <CheckCircle size={12} /> IN VENUE
                        </span>
                      ) : (
                        <span className="text-slate-500 text-xs font-bold bg-slate-800 px-2 py-1 rounded w-fit uppercase">
                          {ticket.status || 'VALID'}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
                {tickets.length === 0 && !loading && (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-slate-500">No tickets sold yet. Go make some sales!</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}