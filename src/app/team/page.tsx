'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Instagram, Facebook, MessageCircle } from 'lucide-react';
import Footer from '@/components/Footer';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Events', href: '/events' },
  { name: 'Donate', href: '/donate' },
  { name: 'Our Team', href: '/team' },
  { name: 'Contact', href: '/contact' },
];

const teamMembers = [
  {
    name: 'Samiksha Sharma',
    role: 'Founder',
    description: 'Visionary leader dedicated to supporting women experiencing loneliness and isolation by creating empowering, compassionate communities.',
    image: '/images/team/SamikshaFounder.jpg',
  },
  {
    name: 'Siddhi Dubey',
    role: 'Co-Founder',
    description: 'Co-founder passionate about providing mental health resources and building safe spaces where women can heal and reach their full potential.',
    image: '/images/team/SiddhiCoFounder.jpg',
  },
  {
    name: 'Mohit Unecha',
    role: 'Technology Strategist',
    description: 'Leading technology initiatives to amplify our mission of supporting women and children through education, care, and community empowerment.',
    image: '/images/team/MohitUnechaTechnology Strategist.jpg',
  },
];

export default function Team() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="dark">
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black text-slate-100 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-600/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-600/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        </div>
        {/* Header */}
        <header className="fixed w-full top-0 z-50 bg-slate-900/90 backdrop-blur-xl border-b border-slate-800/50 shadow-lg shadow-black/20 transition-all duration-300">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative w-10 h-10">
                <Image
                  src="/images/logo/samaya logo.png"
                  alt="Samaya Logo"
                  fill
                  className="rounded-lg object-cover"
                />
              </div>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="relative text-sm font-medium hover:text-emerald-400 transition-all duration-300 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-emerald-400 after:transition-all after:duration-300"
                >
                  {item.name}
                </Link>
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
            <div className="md:hidden bg-slate-900/95 backdrop-blur-xl border-t border-slate-800/50 animate-in slide-in-from-top duration-300">
              <div className="px-4 py-4 space-y-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block text-sm font-medium hover:text-emerald-400 transition-all duration-300"
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
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h1 className="text-6xl font-bold mb-6 pt-8 bg-gradient-to-r from-emerald-300 via-teal-400 to-cyan-400 text-transparent bg-clip-text animate-in fade-in slide-in-from-bottom-4 duration-700\">Our Leadership</h1>
              <p className="text-lg text-slate-300 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">Passionate advocates dedicated to uplifting women and children facing emotional, social, and economic hardship</p>
            </div>
            
            <div className="flex flex-col items-center gap-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
              {/* Founders Row */}
              <div className="grid md:grid-cols-2 gap-12 w-full max-w-4xl">
                {teamMembers.slice(0, 2).map((member, idx) => (
                  <div key={idx} className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-xl p-10 rounded-3xl border border-teal-500/30 hover:border-emerald-400/60 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-500/20 hover:scale-[1.02] group">
                    {member.image ? (
                      <div 
                        onClick={() => setSelectedImage(member.image)}
                        className="w-32 h-32 relative rounded-full overflow-hidden mb-8 border-3 border-emerald-500/50 group-hover:border-emerald-400 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-emerald-500/50 group-hover:scale-110 cursor-pointer mx-auto"
                      >
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-cover object-top"
                          style={{ objectPosition: 'center top' }}
                        />
                      </div>
                    ) : (
                      <div className="w-32 h-32 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mb-8 group-hover:shadow-lg group-hover:shadow-emerald-500/50 transition-all duration-300 group-hover:scale-110 mx-auto">
                        <span className="text-5xl font-bold text-white">{member.name.charAt(0)}</span>
                      </div>
                    )}
                    <h3 className="text-3xl font-bold mb-3 group-hover:text-emerald-300 transition-colors duration-300 text-center">{member.name}</h3>
                    <p className="bg-gradient-to-r from-emerald-300 to-teal-400 text-transparent bg-clip-text font-semibold mb-4 group-hover:from-cyan-300 group-hover:to-emerald-300 transition-all duration-300 text-center text-lg">{member.role}</p>
                    <p className="text-slate-300 text-center">{member.description}</p>
                  </div>
                ))}
              </div>

              {/* Technology Strategist - Centered Below */}
              <div className="w-full max-w-2xl">
                {teamMembers.slice(2).map((member, idx) => (
                  <div key={idx} className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-xl p-10 rounded-3xl border border-teal-500/30 hover:border-emerald-400/60 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-500/20 hover:scale-[1.02] group">
                    {member.image ? (
                      <div 
                        onClick={() => setSelectedImage(member.image)}
                        className="w-32 h-32 relative rounded-full overflow-hidden mb-8 border-3 border-emerald-500/50 group-hover:border-emerald-400 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-emerald-500/50 group-hover:scale-110 cursor-pointer mx-auto"
                      >
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-cover object-top"
                          style={{ objectPosition: 'center top' }}
                        />
                      </div>
                    ) : (
                      <div className="w-32 h-32 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mb-8 group-hover:shadow-lg group-hover:shadow-emerald-500/50 transition-all duration-300 group-hover:scale-110 mx-auto">
                        <span className="text-5xl font-bold text-white">{member.name.charAt(0)}</span>
                      </div>
                    )}
                    <h3 className="text-3xl font-bold mb-3 group-hover:text-emerald-300 transition-colors duration-300 text-center">{member.name}</h3>
                    <p className="bg-gradient-to-r from-emerald-300 to-teal-400 text-transparent bg-clip-text font-semibold mb-4 group-hover:from-cyan-300 group-hover:to-emerald-300 transition-all duration-300 text-center text-lg">{member.role}</p>
                    <p className="text-slate-300 text-center">{member.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-16 bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-xl p-8 rounded-2xl border border-emerald-500/30 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-300">
              <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-emerald-300 via-teal-400 to-cyan-400 text-transparent bg-clip-text">Our Core Values</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-emerald-400 to-teal-400 text-transparent bg-clip-text">Safe Communities</h3>
                  <p className="text-slate-300">We create compassionate spaces where women experiencing loneliness, isolation, or depression can heal, find connection, and receive mental health support.</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-emerald-400 to-teal-400 text-transparent bg-clip-text">Empowerment</h3>
                  <p className="text-slate-300">We nurture mental well-being, build confidence, and provide education and resources that help women and children reach their full potential.</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-emerald-400 to-teal-400 text-transparent bg-clip-text">Holistic Support</h3>
                  <p className="text-slate-300">We address emotional, social, and economic hardship through programs that provide care, education, and meaningful connections for underprivileged communities.</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-emerald-400 to-teal-400 text-transparent bg-clip-text">Global Impact</h3>
                  <p className="text-slate-300">We measure success through lasting change in the lives of women and children across the globe—from the USA to India and beyond.</p>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />

        {/* Image Expansion Modal */}
        {selectedImage && (
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div 
              className="relative max-w-2xl max-h-[80vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage}
                alt="Team member"
                width={500}
                height={600}
                className="rounded-2xl object-cover"
                style={{ objectPosition: 'center top' }}
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 rounded-full p-2 transition-all duration-300"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
