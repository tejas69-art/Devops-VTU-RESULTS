import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { GraduationCap, Shield, Calculator, Percent, FileWarning, Calendar, BookOpen, ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
    title: 'About VTU Results — What This Platform Is and How It Works',
    description: 'VTU Results is an independent, student-built utility platform for Visvesvaraya Technological University students. Learn what tools are available, how result data is fetched, and our privacy commitment.',
};

const tools = [
    { name: 'Results Checker', href: '/vtu-results', icon: GraduationCap, desc: 'Fetch your VTU marksheet and estimate SGPA in seconds.' },
    { name: 'SGPA & CGPA Calculator', href: '/vtu-sgpa-cgpa-calculator', icon: Calculator, desc: 'Credit-weighted grade calculation for any number of subjects or semesters.' },
    { name: 'Attendance Calculator', href: '/attendance-calculator', icon: Calendar, desc: 'Know exactly how many classes you can skip or must attend.' },
    { name: 'CGPA to Percentage', href: '/cgpa-to-percentage', icon: Percent, desc: 'Official VTU formula: CGPA × 10, with degree class mapping.' },
    { name: 'Backlog Fee Estimator', href: '/backlog-fee-estimator', icon: FileWarning, desc: 'Approximate VTU supplementary, revaluation, and photocopy fees.' },
    { name: 'Academic Articles', href: '/articles', icon: BookOpen, desc: '10 in-depth guides on SGPA, grading, backlogs, career, and more.' },
];

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-slate-50/50 py-12">
            <div className="container mx-auto max-w-3xl px-4 sm:px-6">

                <div className="mb-10">
                    <h1 className="font-outfit text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
                        About VTU Results
                    </h1>
                    <p className="text-slate-600 text-base leading-relaxed">
                        A student-built utility platform for Visvesvaraya Technological University engineering students across Karnataka.
                    </p>
                </div>

                {/* What this is */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm mb-6">
                    <h2 className="font-outfit text-xl font-bold text-slate-900 mb-4">What is VTU Results?</h2>
                    <div className="space-y-4 text-slate-700 text-[15px] leading-relaxed">
                        <p>
                            VTU Results is an independent platform built to make everyday academic tasks faster and less frustrating for VTU engineering students. The official VTU results portal works, but it's not optimised for mobile, doesn't parse mark data cleanly, and certainly doesn't calculate your SGPA for you. This site does all of that.
                        </p>
                        <p>
                            The results checker fetches your marksheet in real time from <a href="https://results.vtu.ac.in" target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline">results.vtu.ac.in</a> — the same server your college's exam section uses. The data is displayed in a clean, readable table, and your SGPA is estimated automatically based on the grade points returned.
                        </p>
                        <p>
                            The calculators (SGPA/CGPA, attendance, CGPA to %) are fully client-side — no data leaves your device. The articles and guides are written specifically for VTU students, covering things the university's own documentation doesn't explain well: how results are published, what backlogs mean for your career, how revaluation actually works.
                        </p>
                        <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800">
                            <strong>Important:</strong> This site is not affiliated with or endorsed by Visvesvaraya Technological University. For official records, degree certificates, and academic disputes, always use the{' '}
                            <a href="https://vtu.ac.in" target="_blank" rel="noopener noreferrer" className="underline font-semibold">official VTU website <ExternalLink className="inline w-3.5 h-3.5" /></a>.
                        </div>
                    </div>
                </div>

                {/* Tools */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm mb-6">
                    <h2 className="font-outfit text-xl font-bold text-slate-900 mb-5">Tools Available</h2>
                    <div className="divide-y divide-slate-100">
                        {tools.map(tool => (
                            <Link key={tool.href} href={tool.href} className="group flex items-start gap-4 py-4 first:pt-0 last:pb-0 hover:bg-slate-50 -mx-2 px-2 rounded-lg transition-colors">
                                <div className="w-9 h-9 bg-indigo-50 text-indigo-700 rounded-xl flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-indigo-100 transition-colors">
                                    <tool.icon className="w-4 h-4" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-semibold text-slate-900 group-hover:text-indigo-700 transition-colors text-sm">{tool.name}</p>
                                    <p className="text-slate-500 text-sm mt-0.5">{tool.desc}</p>
                                </div>
            </Link>
                        ))}
                    </div>
                </div>

                {/* Privacy */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm mb-6">
                    <h2 className="font-outfit text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <Shield className="w-5 h-5 text-emerald-600" /> Privacy Commitment
                    </h2>
                    <div className="space-y-3 text-slate-700 text-[15px] leading-relaxed">
                        <p>We do not store your University Seat Number, result data, or any personal information on our servers.</p>
                        <ul className="space-y-2 text-sm text-slate-600">
                            {[
                                'USN and result data: fetched in real time, displayed in your browser, never stored.',
                                'Calculator inputs: processed entirely in your browser. Nothing is sent to any server.',
                                'Contact form messages: sent via email only, not stored in a database.',
                                'Analytics: page-level traffic analytics (no personal identification).',
                                'Ads: Google AdSense displays contextual ads. Ad cookies are governed by Google\'s privacy policy.',
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-2">
                                    <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <p>
                            <Link href="/privacy-policy" className="text-indigo-600 hover:underline">Read the full Privacy Policy →</Link>
                        </p>
                    </div>
                </div>

                {/* Contact & links */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Link href="/contact" className="group flex flex-col gap-2 bg-indigo-600 text-white rounded-2xl p-6 hover:bg-indigo-700 transition-colors shadow-sm">
                        <h3 className="font-bold">Get in Touch</h3>
                        <p className="text-indigo-200 text-sm leading-relaxed">Questions, feedback, or something not working? Send us a message.</p>
                    </Link>
                    <Link href="/disclaimer" className="group flex flex-col gap-2 bg-white border border-slate-200 rounded-2xl p-6 hover:border-slate-300 hover:shadow-sm transition-all">
                        <h3 className="font-bold text-slate-900">Disclaimer</h3>
                        <p className="text-slate-500 text-sm leading-relaxed">Legal notice about data accuracy and non-affiliation with VTU.</p>
                    </Link>
                </div>
            </div>
        </div>
    );
}
