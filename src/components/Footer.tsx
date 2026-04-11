import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Facebook, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black/50 backdrop-blur-xl text-slate-300 py-12 px-4 sm:px-6 lg:px-8 mt-16 border-t border-slate-800/50">
      <div className="max-w-7xl mx-auto text-center">
        <div className="grid md:grid-cols-3 gap-8 mb-8 place-items-center">
          {/* Brand */}
          <div className="flex flex-col items-center">
            <div className="flex items-center space-x-2 mb-4">
              <Image
                src="/images/logo/samaya logo.png"
                alt="Samaya Logo"
                width={32}
                height={32}
                className="rounded-lg"
              />
              <span className="font-bold">Samaya Global</span>
            </div>
            <p className="text-sm mb-4 text-slate-400">
              A US-based 501(c)(3) nonprofit organization dedicated to uplifting women and children facing emotional, social, and economic hardship through community and cultural connection.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/samaya_2024/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-slate-800 hover:bg-emerald-600 rounded-full transition-all duration-300 transform hover:scale-110"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://www.facebook.com/samaya.2024/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-slate-800 hover:bg-emerald-600 rounded-full transition-all duration-300 transform hover:scale-110"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://chat.whatsapp.com/CqVIIeyuKek3EO321ZxqwX"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-slate-800 hover:bg-emerald-600 rounded-full transition-all duration-300 transform hover:scale-110"
              >
                <MessageCircle size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center">
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link href="/" className="text-slate-400 hover:text-emerald-400 transition-all duration-300">Home</Link></li>
              <li><Link href="/events" className="text-slate-400 hover:text-emerald-400 transition-all duration-300">Programs</Link></li>
              <li><Link href="/donate" className="text-slate-400 hover:text-emerald-400 transition-all duration-300">Donate</Link></li>
              <li><Link href="/team" className="text-slate-400 hover:text-emerald-400 transition-all duration-300">Our Team</Link></li>
              <li><Link href="/contact" className="text-slate-400 hover:text-emerald-400 transition-all duration-300">Contact</Link></li>
            </ul>
          </div>

          {/* Get Involved */}
          <div className="flex flex-col items-center">
            <h4 className="font-semibold text-lg mb-4">Get Involved</h4>
            <ul className="space-y-3">
              <li><Link href="/donate" className="text-slate-400 hover:text-emerald-400 transition-all duration-300">Make a Donation</Link></li>
              <li><Link href="/volunteer" className="text-slate-400 hover:text-emerald-400 transition-all duration-300">Volunteer</Link></li>
              <li><Link href="/events" className="text-slate-400 hover:text-emerald-400 transition-all duration-300">Attend Programs</Link></li>
              <li><Link href="/partnership" className="text-slate-400 hover:text-emerald-400 transition-all duration-300">Partner With Us</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-center items-center gap-4">
          <p className="text-slate-500 text-sm">© 2026 Samaya Global. All rights reserved.</p>
          <div className="flex gap-6 text-sm">
            <Link href="/privacy" className="text-slate-500 hover:text-emerald-400 transition-all duration-300">Privacy Policy</Link>
            <Link href="/terms" className="text-slate-500 hover:text-emerald-400 transition-all duration-300">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}