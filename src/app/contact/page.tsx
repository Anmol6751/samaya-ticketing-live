'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Sun, Moon, Instagram, Facebook, MessageCircle } from 'lucide-react';
import axios from 'axios';
import Footer from '@/components/Footer';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Events', href: '/events' },
  { name: 'Donate', href: '/donate' },
  { name: 'Our Team', href: '/team' },
  { name: 'Contact', href: '/contact' },
];

export default function Contact() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/contact`,
        formData
      );
      setMessage('Thank you! Your message has been sent successfully.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setMessage('There was an error sending your message. Please try again.');
      console.error('Contact form error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dark">
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white transition-colors duration-500 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/3 w-96 h-96 bg-emerald-600/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-teal-600/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        </div>
        {/* Header */}
        <header className="fixed w-full top-0 z-50 bg-slate-900/90 backdrop-blur-xl border-b border-slate-800/50 shadow-lg shadow-black/20 transition-all duration-300">
          <nav className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative w-10 h-10 overflow-hidden rounded-lg">
                <Image
                  src="/images/logo/samaya logo.png"
                  alt="Samaya"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium text-slate-300 hover:text-white transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-emerald-400 after:transition-all after:duration-300"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-4">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 hover:bg-slate-800 rounded-lg transition-all duration-300"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </nav>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-slate-900 border-t border-slate-800 animate-in slide-in-from-top duration-300">
              <div className="px-6 py-4 space-y-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block text-sm font-medium text-slate-300 hover:text-white transition-all duration-300"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </header>

        {/* Main Content */}
        <main className="pt-24 pb-16 relative z-10">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-6xl font-bold mb-6 pt-8 bg-gradient-to-r from-emerald-300 via-teal-400 to-cyan-400 text-transparent bg-clip-text animate-in fade-in slide-in-from-bottom-4 duration-700">Connect With Us</h1>
              <p className="text-lg text-slate-300 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
                Have questions about our mission to uplift women and children? We'd love to hear from you and discuss how we can work together to create lasting change.
              </p>
            </div>

            <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-xl p-8 rounded-2xl border border-emerald-500/30 shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2 text-slate-300">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-slate-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent bg-slate-800/40 text-white placeholder-slate-500 transition-all duration-300 hover:border-emerald-500/50 focus:bg-slate-800/60"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2 text-slate-300">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-slate-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent bg-slate-800/40 text-white placeholder-slate-500 transition-all duration-300 hover:border-emerald-500/50 focus:bg-slate-800/60"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2 text-slate-300">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-slate-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent bg-slate-800/40 text-white placeholder-slate-500 transition-all duration-300 hover:border-emerald-500/50 focus:bg-slate-800/60"
                    placeholder="Subject of your message"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2 text-slate-300">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-slate-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent bg-slate-800/40 text-white placeholder-slate-500 transition-all duration-300 resize-none hover:border-emerald-500/50 focus:bg-slate-800/60"
                    placeholder="Your message..."
                  />
                </div>

                {message && (
                  <div
                    className={`p-4 rounded-lg animate-in fade-in slide-in-from-top-2 duration-300 ${
                      message.includes('success')
                        ? 'bg-emerald-900/30 border border-emerald-500/50 text-emerald-300'
                        : 'bg-red-900/30 border border-red-500/50 text-red-300'
                    }`}
                  >
                    {message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-6 py-3 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:via-teal-400 hover:to-cyan-400 text-white font-bold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] shadow-xl hover:shadow-emerald-500/60"
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>

            <div className="mt-12 grid md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
              <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-xl p-6 rounded-2xl border border-emerald-500/30 text-center hover:border-emerald-400/60 transition-all duration-500 transform hover:scale-[1.05] group hover:shadow-lg hover:shadow-emerald-500/20">
                <h3 className="text-xl font-bold mb-2 group-hover:text-emerald-300 transition-colors duration-300">📧 Email</h3>
                <p className="text-slate-400 group-hover:text-slate-300 transition-colors duration-300">For inquiries about donations and events</p>
              </div>
              <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-xl p-6 rounded-2xl border border-teal-500/30 text-center hover:border-teal-400/60 transition-all duration-500 transform hover:scale-[1.05] group hover:shadow-lg hover:shadow-teal-500/20">
                <h3 className="text-xl font-bold mb-2 group-hover:text-teal-300 transition-colors duration-300">📱 Phone</h3>
                <p className="text-slate-400 group-hover:text-slate-300 transition-colors duration-300">Call for group discounts and partnerships</p>
              </div>
              <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-xl p-6 rounded-2xl border border-cyan-500/30 text-center hover:border-cyan-400/60 transition-all duration-500 transform hover:scale-[1.05] group hover:shadow-lg hover:shadow-cyan-500/20">
                <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-300 transition-colors duration-300">🌐 Social Media</h3>
                <div className="flex justify-center gap-4">
                  <a href="https://instagram.com" className="text-emerald-400 hover:text-emerald-300 transition-colors duration-300">Instagram</a>
                  <a href="https://facebook.com" className="text-emerald-400 hover:text-emerald-300 transition-colors duration-300">Facebook</a>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
