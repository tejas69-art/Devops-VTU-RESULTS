import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import AutoAds from "@/components/AdSense/AutoAds";
import CookieConsent from "@/components/CookieConsent";
import { Header } from "@/components/Header";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

const outfit = Outfit({
    subsets: ["latin"],
    variable: "--font-outfit",
});

export const metadata: Metadata = {
    title: "VTU Results — Check Exam Results, Calculate SGPA & CGPA",
    description: "The complete student utility platform for Visvesvaraya Technological University. Check exam results instantly, calculate SGPA/CGPA, track attendance, and read in-depth VTU academic guides.",
    keywords: "VTU results, VTU exam results, USN, SGPA calculator, CGPA calculator, VTU CBCS, VTU attendance, Visvesvaraya Technological University",
    authors: [{ name: "VTU Results" }],
    icons: {
        icon: [
            { url: "/favicon.png", sizes: "any" },
            { url: "/favicon.png", type: "image/png" },
        ],
        apple: "/favicon.png",
    },
    openGraph: {
        type: "website",
        locale: "en_IN",
        siteName: "VTU Results",
        title: "VTU Results — Check Exam Results & Academic Calculators",
        description: "Check VTU exam results, compute SGPA/CGPA, track attendance, estimate backlog fees, and read detailed VTU academic guides.",
    },
    twitter: {
        card: "summary_large_image",
        title: "VTU Results — Student Utility Platform",
        description: "Check VTU exam results, compute grades, and read VTU-specific academic guides.",
    },
    robots: {
        index: true,
        follow: true,
    },
    appleWebApp: {
        capable: true,
        statusBarStyle: "default",
        title: "VTU Results",
    },
};

export const viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    themeColor: "#4f46e5",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${inter.variable} ${outfit.variable} scroll-smooth`}>
            <head>
                <AutoAds />
                <Analytics />
                {/* <meta name="google-site-verification" content="AsaD0fwpq5RcANj2FkiBquGleiQDu5hcXa6CD1x1lTE" /> */}
                <meta name="google-site-verification" content="Nh9eDWf49XDW28Ritjf1e2PPQ3ZJOmA2g4MKOgBow2k" />
            </head>
            <body className="font-sans antialiased text-slate-700 bg-white min-h-screen flex flex-col">
                <Header />
                <main className="flex-grow">
                    {children}
                </main>

                {/* ── Footer ──────────────────────────────────── */}
                <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 mt-16">
                    <div className="container mx-auto max-w-6xl px-4 sm:px-6 py-14">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

                            {/* Brand */}
                            <div className="lg:col-span-2 space-y-4 pr-8">
                                <Link href="/" className="flex items-center gap-2.5 group w-fit">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold text-sm">V</div>
                                    <span className="font-outfit text-base font-bold text-white">VTU Results</span>
                                </Link>
                                <p className="text-sm leading-relaxed max-w-sm">
                                    An independent student-built utility platform for Visvesvaraya Technological University (VTU) students. Fast result access, academic calculators, and in-depth guides.
                                </p>
                                <p className="text-xs text-slate-600 border-l-2 border-slate-700 pl-3 leading-relaxed">
                                    Not affiliated with or endorsed by Visvesvaraya Technological University.
                                </p>
                                {/* Social placeholders */}
                                <div className="pt-1">
                                    <p className="text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-2">Follow us</p>
                                    <div className="flex gap-3">
                                        {/* TODO: Replace href with real URLs when social accounts are created */}
                                        <a href="#" aria-label="Instagram" className="text-slate-600 hover:text-pink-400 transition-colors text-xs font-semibold">Instagram</a>
                                        <span className="text-slate-700">·</span>
                                        <a href="#" aria-label="Twitter / X" className="text-slate-600 hover:text-sky-400 transition-colors text-xs font-semibold">Twitter / X</a>
                                        <span className="text-slate-700">·</span>
                                        <a href="#" aria-label="LinkedIn" className="text-slate-600 hover:text-blue-400 transition-colors text-xs font-semibold">LinkedIn</a>
                                    </div>
                                </div>
                            </div>

                            {/* Results & Tools */}
                            <div>
                                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Tools</h4>
                                <ul className="space-y-2.5 text-sm">
                                    <li><Link href="/vtu-results" className="hover:text-indigo-400 transition-colors">Results Checker</Link></li>
                                    <li><Link href="/vtu-sgpa-cgpa-calculator" className="hover:text-indigo-400 transition-colors">SGPA & CGPA Calculator</Link></li>
                                    <li><Link href="/attendance-calculator" className="hover:text-indigo-400 transition-colors">Attendance Tracker</Link></li>
                                    <li><Link href="/cgpa-to-percentage" className="hover:text-indigo-400 transition-colors">CGPA to Percentage</Link></li>
                                    <li><Link href="/backlog-fee-estimator" className="hover:text-indigo-400 transition-colors">Backlog Fee Estimator</Link></li>
                                    <li><Link href="/jobs" className="hover:text-indigo-400 transition-colors">Jobs & Internships</Link></li>
                                </ul>
                            </div>

                            {/* Resources & Legal */}
                            <div>
                                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Info & Legal</h4>
                                <ul className="space-y-2.5 text-sm">
                                    <li><Link href="/articles" className="hover:text-indigo-400 transition-colors">Academic Articles</Link></li>
                                    <li><Link href="/about" className="hover:text-indigo-400 transition-colors">About Us</Link></li>
                                    <li><Link href="/contact" className="hover:text-indigo-400 transition-colors">Contact</Link></li>
                                    <li><Link href="/privacy-policy" className="hover:text-indigo-400 transition-colors">Privacy Policy</Link></li>
                                    <li><Link href="/terms-of-service" className="hover:text-indigo-400 transition-colors">Terms of Service</Link></li>
                                    <li><Link href="/disclaimer" className="hover:text-indigo-400 transition-colors">Disclaimer</Link></li>
                                </ul>
                            </div>
                        </div>

                        {/* Bottom bar */}
                        <div className="border-t border-slate-800 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-slate-600">
                            <p>© {new Date().getFullYear()} VTU Results. All rights reserved. Made for VTU students.</p>
                            <p>Data sourced from <a href="https://results.vtu.ac.in" target="_blank" rel="noopener noreferrer" className="hover:text-slate-400 underline">results.vtu.ac.in</a></p>
                        </div>
                    </div>
                </footer>

                <CookieConsent />
            </body>
        </html>
    );
}
