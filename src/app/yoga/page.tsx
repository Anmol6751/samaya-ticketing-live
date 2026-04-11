'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Calendar, Users, Heart, ChevronDown, PlayCircle } from 'lucide-react';
import Footer from '@/components/Footer';

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

// Made the 'title' optional (added a '?') so videos don't need one!
type MediaItem = {
  type: 'image' | 'video';
  src: string;
  title?: string; 
};

// Removed Video 11 and deleted the "Guided Practice" titles
const mediaGallery: MediaItem[] = [
  { type: 'image', src: '/images/yoga/yoga-group.jpeg', title: 'Oak Ridge Park Yogis' },
  { type: 'video', src: '/images/yoga/yoga-vedio-1.mp4' },
  { type: 'video', src: '/images/yoga/yoga-vedio-2.mp4' },
  { type: 'video', src: '/images/yoga/yoga-vedio-3.mp4' },
  { type: 'video', src: '/images/yoga/yoga-vedio-4.mp4' },
  { type: 'video', src: '/images/yoga/yoga-vedio-5.mp4' },
  { type: 'video', src: '/images/yoga/yoga-vedio-6.mp4' },
  { type: 'video', src: '/images/yoga/yoga-vedio-7.mp4' },
  { type: 'video', src: '/images/yoga/yoga-vedio-8.mp4' },
  { type: 'video', src: '/images/yoga/yoga-vedio-9.mp4' },
  { type: 'video', src: '/images/yoga/yoga-vedio-10.mp4' },
];

export default function SamayaYoga() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <div className="dark">
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black text-slate-100 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-600/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-teal-600/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
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
        <main className="pt-24 pb-16 relative z-10">
          
          {/* Hero Section */}
          <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-20 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <Calendar size={18} />
              <span className="font-semibold tracking-wide uppercase text-sm">Past Program</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-emerald-300 via-teal-400 to-cyan-400 text-transparent bg-clip-text animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
              Samaya Yoga
            </h1>
            
            <p className="text-2xl md:text-3xl text-white font-medium mb-8 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
              Summer Yoga • June 21 & 22
            </p>
            
            <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-700 delay-300">
              The Samaya community came together for a rejuvenating two-day yoga experience. We reconnected with our mind, body, and spirit in a welcoming, compassionate environment.
            </p>
          </section>

          {/* Flyer & Details Section */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Event Flyer Placeholder */}
              <div className="relative aspect-[4/5] md:aspect-auto md:h-[600px] w-full rounded-2xl overflow-hidden shadow-2xl border border-slate-700/50 group animate-in fade-in slide-in-from-left duration-700">
                <Image
                  src="/images/yoga/yoga-group.jpeg" 
                  alt="Samaya Yoga Flyer"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-800/80 -z-10">
                  <Calendar size={48} className="text-emerald-500 mb-4 opacity-50" />
                  <p className="text-slate-400 font-medium">Yoga Flyer Space</p>
                </div>
              </div>

              {/* Event Details */}
              <div className="space-y-8 animate-in fade-in slide-in-from-right duration-700">
                <div>
                  <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-emerald-300 to-teal-400 text-transparent bg-clip-text">Breathe. Move. Connect.</h2>
                  <p className="text-slate-300 text-lg leading-relaxed">
                    Yoga is more than just physical movement; it is a pathway to mental wellness and inner peace. Participants immersed themselves in sessions designed to release stress, build strength, and foster a deeper connection with themselves and our incredible community.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="bg-slate-800/40 border border-slate-700/50 p-6 rounded-xl backdrop-blur-sm">
                    <Calendar className="text-emerald-400 mb-3" size={28} />
                    <h3 className="font-bold text-white text-xl mb-1">When</h3>
                    <p className="text-slate-400">June 21 & 22</p>
                  </div>
                  <div className="bg-slate-800/40 border border-slate-700/50 p-6 rounded-xl backdrop-blur-sm">
                    <Heart className="text-emerald-400 mb-3" size={28} />
                    <h3 className="font-bold text-white text-xl mb-1">Who</h3>
                    <p className="text-slate-400">Open to all skill levels</p>
                  </div>
                </div>

                <Link
                  href="/events"
                  className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/25 hover:-translate-y-1"
                >
                  Explore Upcoming Programs
                </Link>
              </div>
            </div>
          </section>

          {/* Media Grid (Instagram Content) */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-white">Experience Samaya Yoga</h2>
              <p className="text-slate-400 text-lg">Glimpses from our past community sessions</p>
            </div>

            {/* The 3-Column Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mediaGallery.map((media, index) => (
                <div key={index} className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-slate-900 border border-slate-700/50 shadow-xl group">
                  
                  {media.type === 'video' ? (
                    <video 
                      src={media.src} 
                      autoPlay 
                      loop 
                      muted 
                      playsInline
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                    >
                      <track kind="captions" />
                    </video>
                  ) : (
                    <Image
                      src={media.src}
                      alt={media.title || 'Yoga Event'}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        {media.type === 'video' ? (
                          <PlayCircle className="text-emerald-400" size={20} />
                        ) : (
                          <Users className="text-teal-400" size={20} />
                        )}
                        <span className={`font-semibold text-sm uppercase tracking-wider ${media.type === 'video' ? 'text-emerald-400' : 'text-teal-400'}`}>
                          {media.type === 'video' ? 'Watch' : 'Community'}
                        </span>
                      </div>
                      
                      {/* Only show the title text if it exists! */}
                      {media.title && (
                        <h3 className="text-white font-bold text-xl">{media.title}</h3>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </main>
        <Footer />
      </div>
    </div>
  );
}