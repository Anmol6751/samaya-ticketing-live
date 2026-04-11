'use client';

import Link from 'next/link';
import Image from 'next/image';
import Footer from '@/components/Footer';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Events', href: '/events' },
  { name: 'Donate', href: '/donate' },
  { name: 'Our Team', href: '/team' },
  { name: 'Contact', href: '/contact' },
];

export default function PrivacyPolicy() {
  return (
    <div className="dark">
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white transition-colors duration-500 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-600/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-600/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
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
              <span className="font-bold text-white">Samaya Global</span>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-slate-300 hover:text-emerald-400 transition-all duration-300 font-medium"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </nav>
        </header>

        <main className="pt-28 pb-16 px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto bg-slate-900/60 border border-emerald-500/20 rounded-3xl p-8 sm:p-10 shadow-2xl shadow-emerald-500/10 backdrop-blur-xl">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">Privacy Policy</h1>
            <p className="text-slate-400 text-sm mb-8">Last updated: February 10, 2026</p>

            <section className="space-y-4 text-slate-200">
              <h2 className="text-xl font-semibold">Overview</h2>
              <p>
                This Privacy Policy explains how Samaya Global collects, uses, shares, and protects information when you visit
                our website or interact with our services.
              </p>
            </section>

            <section className="mt-8 space-y-4 text-slate-200">
              <h2 className="text-xl font-semibold">Information We Collect</h2>
              <ul className="list-disc pl-6 space-y-2 text-slate-200">
                <li>Information you provide through forms, donations, or event registration (name, email, phone, message).</li>
                <li>Usage data such as pages visited, time on site, and device or browser details.</li>
                <li>Cookies or similar technologies used to improve performance and user experience.</li>
              </ul>
            </section>

            <section className="mt-8 space-y-4 text-slate-200">
              <h2 className="text-xl font-semibold">How We Use Information</h2>
              <ul className="list-disc pl-6 space-y-2 text-slate-200">
                <li>Respond to inquiries and provide requested information.</li>
                <li>Process donations, event registrations, or volunteer interest.</li>
                <li>Improve website performance and user experience.</li>
                <li>Send updates about events, programs, or impact when you opt in.</li>
              </ul>
            </section>

            <section className="mt-8 space-y-4 text-slate-200">
              <h2 className="text-xl font-semibold">Sharing and Disclosure</h2>
              <p>
                We do not sell personal information. We may share information with trusted service providers who help us operate
                the website or process transactions. We may disclose information when required by law.
              </p>
            </section>

            <section className="mt-8 space-y-4 text-slate-200">
              <h2 className="text-xl font-semibold">Data Retention</h2>
              <p>
                We retain information only as long as needed for the purposes described in this policy, unless a longer retention
                period is required by law.
              </p>
            </section>

            <section className="mt-8 space-y-4 text-slate-200">
              <h2 className="text-xl font-semibold">Your Choices</h2>
              <ul className="list-disc pl-6 space-y-2 text-slate-200">
                <li>You can request access, updates, or deletion of your information by contacting us.</li>
                <li>You can opt out of non-essential emails by using the unsubscribe link.</li>
                <li>You can disable cookies in your browser settings.</li>
              </ul>
            </section>

            <section className="mt-8 space-y-4 text-slate-200">
              <h2 className="text-xl font-semibold">Security</h2>
              <p>
                We use reasonable safeguards to protect information. No method of transmission or storage is 100% secure.
              </p>
            </section>

            <section className="mt-8 space-y-4 text-slate-200">
              <h2 className="text-xl font-semibold">Children&apos;s Privacy</h2>
              <p>
                Our website is not intended for children under 13. We do not knowingly collect personal information from children.
              </p>
            </section>

            <section className="mt-8 space-y-4 text-slate-200">
              <h2 className="text-xl font-semibold">Changes to This Policy</h2>
              <p>
                We may update this policy periodically. The updated date will be listed at the top of this page.
              </p>
            </section>

            <section className="mt-8 space-y-4 text-slate-200">
              <h2 className="text-xl font-semibold">Contact Us</h2>
              <p>
                Questions about privacy? Email us at samayacommunityevents@gmail.com.
              </p>
            </section>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
