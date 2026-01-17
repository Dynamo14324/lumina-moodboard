import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-zinc-300 py-12 px-6 lg:px-24">
      <Link href="/" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-8 transition-colors">
        <ArrowLeft size={20} /> Back to Lumina
      </Link>
      
      <div className="max-w-3xl mx-auto space-y-8">
        <header className="space-y-4 border-b border-white/5 pb-8">
            <h1 className="text-4xl font-bold text-white tracking-tight">Privacy Policy</h1>
            <p className="text-sm text-zinc-500">Last Updated: January 18, 2026</p>
        </header>

        <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">1. Introduction</h2>
            <p>
                Lumina (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard transparency when you visit our website (https://lumina-moodboard.vercel.app/).
            </p>
        </section>

        <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">2. Data We Collect</h2>
            <p>We collect minimal data to function:</p>
            <ul className="list-disc pl-5 space-y-2">
                <li><strong>Voluntary Data:</strong> Moods you select (e.g., &quot;Ethereal&quot;) are used solely to query our movie database in real-time. This status is not stored permanently on a server against your identity.</li>
                <li><strong>Local Storage:</strong> We use your browser&apos;s local storage to save your &quot;Watchlist&quot; so you don&apos;t lose your movies when you refresh. This data never leaves your device.</li>
                <li><strong>Cookies:</strong> See our Cookie Policy below.</li>
            </ul>
        </section>

        <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">3. Third-Party Services & Ads</h2>
            <p>
                We use third-party vendors to support our free architecture:
            </p>
            <ul className="list-disc pl-5 space-y-2">
                 <li>
                    <strong>Google AdSense:</strong> We use Google AdSense to display advertisements. Google uses cookies (including the DoubleClick cookie) to serve ads based on your prior visits to our website or other websites. You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" className="text-indigo-400 hover:underline">Google Ads Settings</a>.
                 </li>
                 <li>
                    <strong>Amazon Associates:</strong> As an Amazon Associate, we earn from qualifying purchases when you click &quot;Buy Physical Media&quot; links.
                 </li>
            </ul>
        </section>

        <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">4. Cookie Policy</h2>
            <p>
                We use cookies to ensure the website functions (e.g., remembering if you accepted our cookie banner). 
                Third-party vendors, including Google, use cookies to serve ads based on a user&apos;s prior visits to your website or other websites.
            </p>
        </section>

        <footer className="pt-8 border-t border-white/5 text-sm text-zinc-500">
            <p>Contact: privacy@lumina.app</p>
        </footer>
      </div>
    </div>
  );
}
