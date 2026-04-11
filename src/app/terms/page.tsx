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

export default function TermsOfService() {
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
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">Terms of Service</h1>
            <p className="text-slate-400 text-sm mb-8">Last updated: February 10, 2026</p>

            <section className="space-y-4 text-slate-200">
              <h2 className="text-xl font-semibold">Acceptance of Terms</h2>
              <p>
                By accessing or using the Samaya Global website, you agree to these Terms of Service. If you do not agree,
                please do not use the website.
              </p>
            </section>

            <section className="mt-8 space-y-4 text-slate-200">
              <h2 className="text-xl font-semibold">Use of the Website</h2>
              <ul className="list-disc pl-6 space-y-2 text-slate-200">
                <li>Use the website for lawful purposes only.</li>
                <li>Do not attempt to disrupt the website, services, or security.</li>
                <li>Do not submit false or misleading information.</li>
              </ul>
            </section>

            <section className="mt-8 space-y-4 text-slate-200">
              <h2 className="text-xl font-semibold">Donations and Payments</h2>
              <p>
                Donations are voluntary and non-refundable unless required by law. We use third-party payment providers to
                process transactions, and their terms apply.
              </p>
            </section>

            <section className="mt-8 space-y-4 text-slate-200">
              <h2 className="text-xl font-semibold">Event Tickets</h2>
              <p>
                Event tickets are subject to availability and event policies. Fees and schedules may change without notice.
              </p>
            </section>

            <section className="mt-8 space-y-4 text-slate-200">
              <h2 className="text-xl font-semibold">Volunteer Submissions</h2>
              <p>
                By submitting volunteer information, you confirm that the information is accurate and that you are willing to be
                contacted by Samaya Global about volunteer opportunities.
              </p>
            </section>

            <section className="mt-8 space-y-4 text-slate-200">
              <h2 className="text-xl font-semibold">AI Tool</h2>
              <p>
                The AI assistant is an informational tool and may be inaccurate. You should verify information before relying on it.
              </p>
            </section>

            <section className="mt-8 space-y-4 text-slate-200">
              <h2 className="text-xl font-semibold">Intellectual Property</h2>
              <p>
                Content on this website, including text, images, logos, and graphics, is owned by Samaya Global or used with
                permission. You may not use or reproduce content without written permission.
              </p>
            </section>

            <section className="mt-8 space-y-4 text-slate-200">
              <h2 className="text-xl font-semibold">Third-Party Links</h2>
              <p>
                The website may contain links to third-party websites. We are not responsible for their content or privacy practices.
              </p>
            </section>

            <section className="mt-8 space-y-4 text-slate-200">
              <h2 className="text-xl font-semibold">Disclaimer</h2>
              <p>
                The website and services are provided on an "as is" and "as available" basis without warranties of any kind.
              </p>
            </section>

            <section className="mt-8 space-y-4 text-slate-200">
              <h2 className="text-xl font-semibold">Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, Samaya Global will not be liable for any indirect, incidental, or consequential
                damages arising from your use of the website.
              </p>
            </section>

            <section className="mt-8 space-y-4 text-slate-200">
              <h2 className="text-xl font-semibold">Changes to These Terms</h2>
              <p>
                We may update these terms from time to time. The updated date will be listed at the top of this page.
              </p>
            </section>

            <section className="mt-8 space-y-4 text-slate-200">
              <h2 className="text-xl font-semibold">Contact Us</h2>
              <p>
                Questions about these terms? Email us at samayacommunityevents@gmail.com.
              </p>
            </section>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
