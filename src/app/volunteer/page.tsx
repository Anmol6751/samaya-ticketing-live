'use client';

import { useState } from 'react';
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

export default function Volunteer() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    timeCommitment: '',
    educationLevel: '',
    details: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/volunteer`,
        formData
      );
      setMessage('Thank you for your interest! Samaya will contact you soon.');
      setFormData({ name: '', email: '', age: '', timeCommitment: '', educationLevel: '', details: '' });
    } catch (error) {
      setMessage('There was an error submitting your application. Please try again.');
      console.error('Volunteer form error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dark">
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-black to-slate-950 text-white transition-colors duration-500">
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

            {/* Desktop Menu - UPDATED WITH DROPDOWN */}
            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                item.subItems ? (
                  <div key={item.name} className="relative group py-2">
                    <button className="flex items-center gap-1 text-sm font-medium text-slate-300 hover:text-white transition-colors">
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
                    className="text-sm font-medium text-slate-300 hover:text-white transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-emerald-400 after:transition-all"
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
            <div className="md:hidden bg-slate-900 border-t border-slate-800 animate-in slide-in-from-top duration-300">
              <div className="px-6 py-4 space-y-4">
                {navigation.map((item) => (
                  item.subItems ? (
                    <div key={item.name} className="space-y-2">
                      <div className="text-sm font-bold text-slate-400 uppercase tracking-wider px-2 pt-2">{item.name}</div>
                      <div className="flex flex-col space-y-2 pl-4 border-l-2 border-slate-700 ml-2">
                        {item.subItems.map(subItem => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block text-sm font-medium text-slate-300 hover:text-white transition-all duration-300"
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
                      className="block text-sm font-medium text-slate-300 hover:text-white transition-all duration-300"
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
        <main className="pt-24 pb-16">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-5xl font-bold mb-8 pt-8 bg-gradient-to-r from-emerald-400 to-teal-400 text-transparent bg-clip-text animate-in fade-in slide-in-from-bottom-4 duration-700">Volunteer With Us</h1>
            <p className="text-xl text-slate-300 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
              Join our community and make a real difference in the lives of women and children. Samaya will review your application and contact you soon!
            </p>

            <div className="bg-slate-900/50 backdrop-blur-xl p-8 rounded-xl shadow-2xl border border-slate-800/50 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2 text-slate-300">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-slate-800/50 text-white placeholder-slate-500 transition-all duration-300"
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
                    className="w-full px-4 py-2 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-slate-800/50 text-white placeholder-slate-500 transition-all duration-300"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="age" className="block text-sm font-medium mb-2 text-slate-300">
                    Age
                  </label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    required
                    min="18"
                    className="w-full px-4 py-2 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-slate-800/50 text-white placeholder-slate-500 transition-all duration-300"
                    placeholder="Your age"
                  />
                </div>

                <div>
                  <label htmlFor="educationLevel" className="block text-sm font-medium mb-2 text-slate-300">
                    Education Level
                  </label>
                  <select
                    id="educationLevel"
                    name="educationLevel"
                    value={formData.educationLevel}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-slate-800/50 text-white transition-all duration-300"
                  >
                    <option value="">Select your education level</option>
                    <option value="high-school">High School</option>
                    <option value="high-school-senior">High School Senior</option>
                    <option value="college-freshman">College Freshman</option>
                    <option value="college-sophomore">College Sophomore</option>
                    <option value="college-junior">College Junior</option>
                    <option value="college-senior">College Senior</option>
                    <option value="college-graduate">College Graduate</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="timeCommitment" className="block text-sm font-medium mb-2 text-slate-300">
                    Time Commitment (Per Week)
                  </label>
                  <select
                    id="timeCommitment"
                    name="timeCommitment"
                    value={formData.timeCommitment}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-slate-800/50 text-white transition-all duration-300"
                  >
                    <option value="">Select your availability</option>
                    <option value="1-3-hours">1-3 hours</option>
                    <option value="3-5-hours">3-5 hours</option>
                    <option value="5-10-hours">5-10 hours</option>
                    <option value="10-plus-hours">10+ hours</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="details" className="block text-sm font-medium mb-2 text-slate-300">
                    Tell Us About Your Interests and Goals
                  </label>
                  <textarea
                    id="details"
                    name="details"
                    value={formData.details}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-2 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-slate-800/50 text-white placeholder-slate-500 transition-all duration-300 resize-none"
                    placeholder="What interests you about volunteering with Samaya? What are your goals?..."
                  />
                </div>

                {message && (
                  <div
                    className={`p-4 rounded-lg animate-in fade-in slide-in-from-top-2 duration-300 ${
                      message.includes('Thank you')
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
                  className="w-full px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-emerald-500/50"
                >
                  {loading ? 'Submitting...' : 'Submit Application'}
                </button>

                <p className="text-sm text-slate-400 text-center">
                  Samaya will review your application and contact you within 3-5 business days. Thank you for your interest!
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