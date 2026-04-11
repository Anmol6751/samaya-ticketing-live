'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Instagram, Facebook, MessageCircle, ChevronDown } from 'lucide-react';
import axios from 'axios';
import Footer from '@/components/Footer';

// UPDATED: Added Get Involved sub-items and changed "Events" to "Programs"
const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Programs', href: '/events' },
  { name: 'Donate', href: '/donate' },
  { name: 'Our Team', href: '/team' },
  { 
    name: 'Get Involved', 
    subItems: [
      { name: 'Make a Donation', href: '/donate' },
      { name: 'Volunteer', href: '/volunteer' },
      { name: 'Attend Programs', href: '/events' },
      { name: 'Partner With Us', href: '/partnership' }
    ]
  },
  { name: 'Contact', href: '/contact' },
];

export default function Partnership() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    vendorName: '',
    businessType: '',
    email: '',
    phone: '',
    moreInformation: '',
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
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/partnership`,
        formData
      );
      setMessage('Thank you! Your partnership inquiry has been received. Samaya Global will get back to you soon.');
      setFormData({ vendorName: '', businessType: '', email: '', phone: '', moreInformation: '' });
    } catch (error) {
      setMessage('There was an error submitting your inquiry. Please try again.');
      console.error('Partnership form error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dark">
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black text-slate-100 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-600/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-600/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        </div>

        {/* Header */}
        <header className="sticky top-0 z-40 bg-slate-950/50 backdrop-blur-xl border-b border-slate-800/50">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 group">
              <Image
                src="/images/logo/samaya logo.png"
                alt="Samaya Logo"
                width={40}
                height={40}
                className="rounded-lg group-hover:scale-110 transition-transform duration-300"
              />
              <span className="font-bold text-xl hidden sm:inline group-hover:text-emerald-400 transition-colors duration-300">Samaya</span>
            </Link>

            {/* Desktop Menu - UPDATED WITH DROPDOWN */}
            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                item.subItems ? (
                  <div key={item.name} className="relative group py-2">
                    <button className="flex items-center gap-1 text-sm font-medium hover:text-emerald-400 transition-colors duration-300">
                      {item.name} <ChevronDown size={16} className="group-hover:rotate-180 transition-transform duration-300" />
                    </button>
                    <div className="absolute top-full right-0 mt-0 w-48 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 overflow-hidden transform origin-top scale-95 group-hover:scale-100">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block px-4 py-3 text-sm text-slate-300 hover:text-emerald-400 hover:bg-slate-800 transition-colors"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={item.name}
                    href={item.href!}
                    className="text-sm font-medium hover:text-emerald-400 transition-all duration-300"
                  >
                    {item.name}
                  </Link>
                )
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

          {/* Mobile Menu - UPDATED WITH SUB-ITEMS */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-slate-900/95 backdrop-blur-xl border-t border-slate-800/50 animate-in slide-in-from-top duration-300">
              <div className="px-4 py-4 space-y-4">
                {navigation.map((item) => (
                  item.subItems ? (
                    <div key={item.name} className="space-y-2">
                      <div className="text-sm font-bold text-slate-400 uppercase tracking-wider px-2 pt-2">{item.name}</div>
                      <div className="flex flex-col space-y-2 pl-4 border-l-2 border-slate-700 ml-2">
                        {item.subItems.map(subItem => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block text-sm font-medium hover:text-emerald-400 transition-all duration-300"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      key={item.name}
                      href={item.href!}
                      className="block text-sm font-medium hover:text-emerald-400 transition-all duration-300"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )
                ))}
              </div>
            </div>
          )}
        </header>

        {/* Main Content */}
        <main className="pt-24 pb-16 relative z-10">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-emerald-300 via-teal-400 to-cyan-400 text-transparent bg-clip-text animate-in fade-in slide-in-from-bottom-4 duration-700">
                Partner With Us
              </h1>
              <p className="text-lg text-slate-300 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
                Join us in our mission to uplift women and children. We'd love to explore partnership opportunities with your business.
              </p>
            </div>

            {/* Form */}
            <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-xl p-8 rounded-2xl border border-teal-500/30 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Vendor Name */}
                <div>
                  <label htmlFor="vendorName" className="block text-sm font-semibold mb-2 bg-gradient-to-r from-emerald-300 to-teal-400 text-transparent bg-clip-text">
                    Vendor/Business Name *
                  </label>
                  <input
                    type="text"
                    id="vendorName"
                    name="vendorName"
                    value={formData.vendorName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-slate-900/50 border border-teal-500/30 rounded-lg focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition-all duration-300 text-slate-100 placeholder-slate-500"
                    placeholder="Enter your business name"
                  />
                </div>

                {/* Business Type */}
                <div>
                  <label htmlFor="businessType" className="block text-sm font-semibold mb-2 bg-gradient-to-r from-emerald-300 to-teal-400 text-transparent bg-clip-text">
                    Type of Business *
                  </label>
                  <input
                    type="text"
                    id="businessType"
                    name="businessType"
                    value={formData.businessType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-slate-900/50 border border-teal-500/30 rounded-lg focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition-all duration-300 text-slate-100 placeholder-slate-500"
                    placeholder="e.g., Catering, Event Sponsorship, Services, etc."
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold mb-2 bg-gradient-to-r from-emerald-300 to-teal-400 text-transparent bg-clip-text">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-slate-900/50 border border-teal-500/30 rounded-lg focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition-all duration-300 text-slate-100 placeholder-slate-500"
                    placeholder="your@email.com"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold mb-2 bg-gradient-to-r from-emerald-300 to-teal-400 text-transparent bg-clip-text">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-slate-900/50 border border-teal-500/30 rounded-lg focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition-all duration-300 text-slate-100 placeholder-slate-500"
                    placeholder="(123) 456-7890"
                  />
                </div>

                {/* More Information */}
                <div>
                  <label htmlFor="moreInformation" className="block text-sm font-semibold mb-2 bg-gradient-to-r from-emerald-300 to-teal-400 text-transparent bg-clip-text">
                    Additional Information
                  </label>
                  <textarea
                    id="moreInformation"
                    name="moreInformation"
                    value={formData.moreInformation}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-teal-500/30 rounded-lg focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition-all duration-300 text-slate-100 placeholder-slate-500 resize-none"
                    placeholder="Tell us more about your business and how you'd like to partner with Samaya Global..."
                  />
                </div>

                {/* Message */}
                {message && (
                  <div className={`p-4 rounded-lg text-sm ${message.includes('error') ? 'bg-red-500/20 text-red-200' : 'bg-emerald-500/20 text-emerald-200'}`}>
                    {message}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Submitting...' : 'Submit Partnership Inquiry'}
                </button>

                <p className="text-center text-sm text-slate-400">
                  Samaya Global will review your inquiry and get back to you within 5-7 business days.
                </p>
              </form>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}