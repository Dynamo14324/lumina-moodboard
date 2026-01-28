import React from "react";
import Link from "next/link";
import { MoveLeft } from "lucide-react";

export const metadata = {
  title: "Terms of Service | Lumina",
  description: "Terms and conditions for using Lumina.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-zinc-300 p-6 md:p-12 font-light">
      <div className="max-w-3xl mx-auto space-y-8">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition-colors mb-8"
        >
          <MoveLeft size={16} />
          Back to Lumina
        </Link>

        <header className="space-y-4 border-b border-white/10 pb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Terms of Service</h1>
          <p className="text-sm text-zinc-500">Last Updated: January 29, 2026</p>
        </header>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">1. Acceptance of Terms</h2>
          <p>
            By accessing and using Lumina (the &quot;Service&quot;), you accept and agree to be bound by the terms and provision of this agreement.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">2. Use License</h2>
          <p>
            Permission is granted to temporarily view the materials (information or software) on Lumina&apos;s website for personal, non-commercial transitory viewing only.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">3. Monetization & Ads</h2>
          <p>
            Lumina uses Google AdSense and other advertising networks to serve ads. By using this site, you acknowledge that third-party vendors, including Google, use cookies to serve ads based on your prior visits to this website or other websites.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">4. Disclaimer</h2>
          <p>
            The materials on Lumina&apos;s website are provided &quot;as is&quot;. Lumina makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties, including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">5. Governing Law</h2>
          <p>
            Any claim relating to Lumina&apos;s website shall be governed by the laws of the User&apos;s home jurisdiction without regard to its conflict of law provisions.
          </p>
        </section>
      </div>
    </main>
  );
}
