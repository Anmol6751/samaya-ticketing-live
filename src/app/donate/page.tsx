'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, Sun, Moon, Instagram, Facebook, MessageCircle, Heart, Target, Users, Zap, ChevronDown } from 'lucide-react'
import Footer from '@/components/Footer'

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
]

const donationTiers = [
  {
    amount: '$25',
    description: 'Helps provide mental health support and community resources to someone in need',
    icon: Heart,
    color: 'from-pink-500 to-red-500',
    benefits: ['Community impact', 'Email receipt'],
    stripeUrl: 'https://buy.stripe.com/test_28EeVf3vw5dM0T09Qv7ss00'
  },
  {
    amount: '$50',
    description: 'Supports educational materials and learning resources for underprivileged individuals',
    icon: Target,
    color: 'from-emerald-500 to-teal-500',
    benefits: ['Community impact', 'Email receipt'],
    stripeUrl: 'https://buy.stripe.com/test_cNidRb2rseOm7ho9Qv7ss01'
  },
  {
    amount: '$100',
    description: 'Funds wellness programs and community support for women globally',
    icon: Users,
    color: 'from-blue-500 to-cyan-500',
    benefits: ['Community impact', 'Email receipt', 'Special recognition'],
    stripeUrl: 'https://buy.stripe.com/test_fZu6oJgiidKi8lsfaP7ss02'
  },
  {
    amount: 'Custom',
    description: 'Your donation will be distributed to those in need across the globe',
    icon: Zap,
    color: 'from-yellow-500 to-orange-500',
    benefits: ['Community impact', 'Email receipt', 'Full transparency'],
    stripeUrl: 'https://buy.stripe.com/test_fZu6oJgiidKi8lsfaP7ss02'
  },
]

export default function Donate() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showZelleModal, setShowZelleModal] = useState(false)
  const [showVenmoModal, setShowVenmoModal] = useState(false)
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({})

  useEffect(() => {
    document.documentElement.classList.add('dark')
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const newVisibleSections = new Set<string>()
      const entries = Object.entries(sectionRefs.current)
      
      entries.forEach(([key, element]) => {
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top < window.innerHeight * 0.8 && rect.bottom > 0) {
            newVisibleSections.add(key)
          }
        }
      })
      
      setVisibleSections(newVisibleSections)
    }
    
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="dark">
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white transition-colors duration-500 relative overflow-hidden">
        
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/3 w-96 h-96 bg-emerald-600/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-cyan-600/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        </div>
        
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
                    className="text-sm font-medium text-slate-300 hover:text-white transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-emerald-400 after:transition-all after:duration-300"
                  >
                    {item.name}
                  </Link>
                )
              ))}
            </div>

            <div className="md:hidden flex items-center space-x-4">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 hover:bg-slate-800 rounded-lg transition-all duration-300"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </nav>

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

        <main className="pt-24 pb-16 relative z-10">
          
          <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
            <div className="text-center mb-12">
              <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-emerald-300 via-teal-400 to-cyan-400 text-transparent bg-clip-text animate-in fade-in slide-in-from-bottom-4 duration-700">
                Help Those in Need
              </h1>
              <p className="text-xl text-slate-300 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100 max-w-2xl mx-auto">
                Your generous donation will help women and children in need across the globe from the USA to India and beyond. Together, we can create meaningful change.
              </p>
            </div>

            <div 
              className="grid md:grid-cols-3 gap-6 mb-16 transition-all duration-1000"
              ref={(el) => { if (el) sectionRefs.current['impact-preview'] = el }}
              style={{
                opacity: visibleSections.has('impact-preview') ? 1 : 0.3,
                transform: visibleSections.has('impact-preview') ? 'translateY(0)' : 'translateY(30px)',
              }}
            >
              <div className="bg-gradient-to-br from-emerald-600/20 to-emerald-600/5 border border-emerald-500/30 p-8 rounded-2xl backdrop-blur-xl hover:border-emerald-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/20">
                <div className="text-4xl font-bold text-emerald-400 mb-2">1000+</div>
                <p className="text-slate-300">Lives Touched Globally</p>
              </div>
              <div className="bg-gradient-to-br from-teal-600/20 to-teal-600/5 border border-teal-500/30 p-8 rounded-2xl backdrop-blur-xl hover:border-teal-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/20">
                <div className="text-4xl font-bold text-teal-400 mb-2">14+</div>
                <p className="text-slate-300">Community Programs</p>
              </div>
              <div className="bg-gradient-to-br from-cyan-600/20 to-cyan-600/5 border border-cyan-500/30 p-8 rounded-2xl backdrop-blur-xl hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20">
                <div className="text-4xl font-bold text-cyan-400 mb-2">100%</div>
                <p className="text-slate-300">Transparent & Impactful</p>
              </div>
            </div>
          </section>

          <section 
            className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 transition-all duration-1000"
            ref={(el) => { if (el) sectionRefs.current['tiers'] = el }}
            style={{
              opacity: visibleSections.has('tiers') ? 1 : 0.3,
              transform: visibleSections.has('tiers') ? 'translateY(0)' : 'translateY(30px)',
            }}
          >
            <h2 className="text-5xl font-bold mb-12 text-center bg-gradient-to-r from-white to-emerald-400 bg-clip-text text-transparent">
              Choose Your Impact Level
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {donationTiers.map((tier, index) => {
                const IconComponent = tier.icon
                
                return (
                  <div
                    key={index}
                    className={`group bg-gradient-to-br ${tier.color}/20 to-slate-900/40 border border-slate-700/50 hover:border-emerald-500/50 p-8 rounded-2xl backdrop-blur-xl transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/20 hover:transform hover:-translate-y-2 flex flex-col h-full`}
                  >
                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${tier.color} mb-6`}>
                      <IconComponent size={28} className="text-white" />
                    </div>
                    <h3 className="text-3xl font-bold mb-2 text-white">{tier.amount}</h3>
                    <p className="text-slate-300 mb-6 text-sm flex-grow">{tier.description}</p>
                    <ul className="space-y-2 mb-8">
                      {tier.benefits.map((benefit, i) => (
                        <li key={i} className="text-xs text-slate-400 flex items-center">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-2"></span>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                    <a
                      href={tier.stripeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`block w-full py-3 rounded-lg font-bold text-center bg-gradient-to-r ${tier.color} text-white hover:shadow-lg transition-all duration-300 hover:scale-105 mt-auto`}
                    >
                      Donate {tier.amount === 'Custom' ? 'Now' : tier.amount}
                    </a>
                  </div>
                )
              })}
            </div>
          </section>

          <section 
            className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 transition-all duration-1000"
            ref={(el) => { if (el) sectionRefs.current['methods'] = el }}
            style={{
              opacity: visibleSections.has('methods') ? 1 : 0.3,
              transform: visibleSections.has('methods') ? 'translateY(0)' : 'translateY(30px)',
            }}
          >
            <h2 className="text-5xl font-bold mb-12 text-center bg-gradient-to-r from-white to-emerald-400 bg-clip-text text-transparent">
              Flexible Donation Methods
            </h2>
            
            <div className="space-y-6">
              <div className="group bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-emerald-500/30 p-8 rounded-2xl backdrop-blur-xl hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/20 transition-all duration-300">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-2xl font-bold mb-2 text-emerald-300">💳 Credit Card</h3>
                    <p className="text-slate-400 mb-4">Donate securely using any major credit or debit card. Encrypted and safe.</p>
                  </div>
                </div>
                <a
                  href="https://buy.stripe.com/test_fZu6oJgiidKi8lsfaP7ss02"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-cyan-400 text-white font-bold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/50"
                >
                  Donate with Card
                </a>
              </div>

              <div className="group bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-blue-500/30 p-8 rounded-2xl backdrop-blur-xl hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-2xl font-bold mb-2 text-blue-300">📱 Venmo</h3>
                    <p className="text-slate-400 mb-2">Send money directly via Venmo. Easy, fast, and instant.</p>
                    <p className="text-blue-300 text-sm">Scan me to venmo here</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowVenmoModal(true)}
                  className="inline-block px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white font-bold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/50"
                >
                  Venmo Here
                </button>
              </div>

              <div className="group bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-purple-500/30 p-8 rounded-2xl backdrop-blur-xl hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-2xl font-bold mb-2 text-purple-300">🏦 Zelle</h3>
                    <p className="text-slate-400 mb-2">Transfer money instantly using Zelle through your bank app.</p>
                    <p className="text-purple-300 text-sm">Scan me to zelle here</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowZelleModal(true)}
                  className="inline-block px-8 py-3 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-400 hover:to-purple-500 text-white font-bold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50"
                >
                  Zelle Here
                </button>
              </div>

              <div className="group bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-600/50 p-8 rounded-2xl backdrop-blur-xl hover:border-slate-500/50 hover:shadow-lg hover:shadow-slate-500/20 transition-all duration-300">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-2xl font-bold mb-2 text-slate-200">📧 Wire Transfer</h3>
                    <p className="text-slate-400 mb-4">Direct bank-to-bank transfer for larger donations. Contact us for details.</p>
                  </div>
                </div>
                <Link
                  href="/contact"
                  className="inline-block px-8 py-3 bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-500 hover:to-slate-600 text-white font-bold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-slate-500/50"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </section>

          <section 
            className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 transition-all duration-1000"
            ref={(el) => { if (el) sectionRefs.current['why'] = el }}
            style={{
              opacity: visibleSections.has('why') ? 1 : 0.3,
              transform: visibleSections.has('why') ? 'translateY(0)' : 'translateY(30px)',
            }}
          >
            <div className="bg-gradient-to-br from-emerald-950/40 to-teal-950/40 border border-emerald-500/40 p-12 rounded-2xl backdrop-blur-xl">
              <h3 className="text-4xl font-bold mb-8 bg-gradient-to-r from-emerald-300 to-teal-400 text-transparent bg-clip-text">Why Your Donation Matters</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-emerald-300 font-bold">✓</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Women's Mental Health</h4>
                    <p className="text-slate-400">Support programs for women experiencing loneliness, isolation, and depression</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-emerald-300 font-bold">✓</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Children's Education</h4>
                    <p className="text-slate-400">Fund education and healthcare resources for underprivileged children</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-emerald-300 font-bold">✓</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Community Building</h4>
                    <p className="text-slate-400">Create safe, compassionate spaces where people feel valued and connected</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-emerald-300 font-bold">✓</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Cultural Programs</h4>
                    <p className="text-slate-400">Host meaningful gatherings that bring diverse communities together</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section 
            className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 transition-all duration-1000"
            ref={(el) => { if (el) sectionRefs.current['cta'] = el }}
            style={{
              opacity: visibleSections.has('cta') ? 1 : 0.3,
              transform: visibleSections.has('cta') ? 'translateY(0)' : 'translateY(30px)',
            }}
          >
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-12 rounded-2xl text-center">
              <h2 className="text-4xl font-bold mb-4 text-white">Help Us Raise Funds for Women in Need</h2>
              <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                Every dollar donated goes directly to support women and children across the globe from communities in the USA to India and beyond. Your contribution creates real, measurable change in the lives of those who need it most.
              </p>
              <a
                href="https://buy.stripe.com/test_fZu6oJgiidKi8lsfaP7ss02"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-10 py-4 bg-white text-emerald-600 font-bold rounded-lg hover:bg-slate-100 transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                Donate Now →
              </a>
            </div>
          </section>

        {showZelleModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 max-w-md w-full border border-purple-500/30 shadow-2xl animate-in fade-in zoom-in duration-300">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-purple-300">Zelle QR Code</h2>
                <button
                  onClick={() => setShowZelleModal(false)}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>
              <div className="relative w-full aspect-square mb-6 rounded-lg overflow-hidden bg-white p-2">
                <Image
                  src="/images/Donate/zelle.png"
                  alt="Zelle QR Code"
                  fill
                  className="object-contain"
                />
              </div>
              <p className="text-center text-slate-300 mb-6">Scan this QR code to send your donation via Zelle</p>
              <button
                onClick={() => setShowZelleModal(false)}
                className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-400 hover:to-purple-500 text-white font-bold rounded-lg transition-all duration-300"
              >
                Close
              </button>
            </div>
          </div>
        )}

        </main>

        {showVenmoModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 max-w-md w-full border border-blue-500/30 shadow-2xl animate-in fade-in zoom-in duration-300">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-blue-300">Venmo QR Code</h2>
                <button
                  onClick={() => setShowVenmoModal(false)}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>
              <div className="relative w-full aspect-square mb-6 rounded-lg overflow-hidden bg-white p-2">
                <Image
                  src="/images/Donate/venmo.jpg"
                  alt="Venmo QR Code"
                  fill
                  className="object-contain"
                />
              </div>
              <p className="text-center text-slate-300 mb-6">Scan this QR code to send your donation via Venmo</p>
              <button
                onClick={() => setShowVenmoModal(false)}
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white font-bold rounded-lg transition-all duration-300"
              >
                Close
              </button>
            </div>
          </div>
        )}
        <Footer />
      </div>
    </div>
  )
}