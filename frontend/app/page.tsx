import React from 'react';
import Link from 'next/link';
import {
    GraduationCap, Calculator, Calendar, BookOpen,
    Briefcase, ArrowRight, Percent, FileWarning, ChevronRight
} from 'lucide-react';
import type { Metadata } from 'next';
import AdUnit from '@/components/AdSense/AdUnit';

export const metadata: Metadata = {
    title: 'VTU Results — Check Exam Results, Calculate SGPA & CGPA',
    description: 'The complete student utility platform for Visvesvaraya Technological University. Check exam results instantly, calculate SGPA/CGPA, track attendance, and read in-depth academic guides.',
    keywords: 'VTU results, VTU exam results, USN results, SGPA calculator, CGPA calculator, attendance calculator, VTU CBCS',
    openGraph: {
        title: 'VTU Results — Student Utility Platform',
        description: 'Check VTU exam results, compute SGPA/CGPA, track attendance, and read VTU-specific academic guides.',
        type: 'website',
    },
};

const tools = [
    {
        name: 'Results Checker',
        desc: 'Fetch your official VTU marksheet, view subject-wise marks, and get an instant SGPA estimate.',
        href: '/vtu-results',
        icon: GraduationCap,
        accent: 'bg-indigo-600',
        tag: 'Most Used',
    },
    {
        name: 'SGPA & CGPA Calculator',
        desc: 'Enter subject credits and letter grades to compute your semester GPA and cumulative average.',
        href: '/vtu-sgpa-cgpa-calculator',
        icon: Calculator,
        accent: 'bg-violet-600',
        tag: null,
    },
    {
        name: 'Attendance Calculator',
        desc: 'Find out how many classes you can skip — or must attend — to meet the VTU 85% rule.',
        href: '/attendance-calculator',
        icon: Calendar,
        accent: 'bg-emerald-600',
        tag: null,
    },
    {
        name: 'CGPA to Percentage',
        desc: 'Convert your VTU CGPA to an equivalent percentage using the official CGPA × 10 formula.',
        href: '/cgpa-to-percentage',
        icon: Percent,
        accent: 'bg-sky-600',
        tag: null,
    },
    {
        name: 'Backlog Fee Estimator',
        desc: 'Estimate your supplementary exam or revaluation fees based on number of subjects.',
        href: '/backlog-fee-estimator',
        icon: FileWarning,
        accent: 'bg-amber-600',
        tag: null,
    },
    {
        name: 'Jobs & Internships',
        desc: 'Curated off-campus drives, internship openings, and entry-level listings for VTU graduates.',
        href: '/jobs',
        icon: Briefcase,
        accent: 'bg-rose-600',
        tag: 'Updated',
    },
];

const articles = [
    { title: 'How to Calculate SGPA in VTU — Step-by-Step Guide', slug: 'how-to-calculate-sgpa', tag: 'Guide' },
    { title: 'VTU Grading System (CBCS) — Everything Explained', slug: 'vtu-grading-system', tag: 'Explained' },
    { title: 'VTU Attendance Rules: The 85% Mandate and Condonation', slug: 'vtu-attendance-rules', tag: 'Policy' },
    { title: 'VTU Backlogs Guide: How to Clear Them and Protect Your Career', slug: 'vtu-backlogs-guide', tag: 'Guide' },
    { title: 'How VTU Results Are Published — Complete Behind-the-Scenes', slug: 'how-vtu-results-work', tag: 'Guide' },
    { title: 'CGPA vs SGPA in VTU — Key Differences and What Matters', slug: 'cgpa-vs-sgpa-vtu', tag: 'Explained' },
];

export default function HomePage() {
    return (
        <div className="min-h-screen bg-white">

            {/* ── Hero ──────────────────────────────────────────── */}
            <section className="border-b border-slate-100 bg-slate-50 py-14 md:py-20">
                <div className="container mx-auto max-w-4xl px-4 sm:px-6 text-center">
                    <span className="inline-block mb-4 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider">
                        Independent student resource · Not affiliated with VTU
                    </span>
                    <h1 className="font-outfit text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
                        Your complete toolkit for<br className="hidden sm:block" />{' '}
                        <span className="text-indigo-600">VTU academic life</span>
                    </h1>
                    <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-8">
                        Check exam results, calculate SGPA and CGPA, track attendance, estimate backlog fees, and read detailed guides — all in one place, built specifically for VTU engineering students.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link
                            href="/vtu-results"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 text-white font-bold text-sm hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200"
                        >
                            Check Your Results <ArrowRight className="h-4 w-4" />
                        </Link>
                        <Link
                            href="/vtu-sgpa-cgpa-calculator"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white text-slate-700 font-bold text-sm border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-colors"
                        >
                            Calculate SGPA
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── Ad unit ───────────────────────────────────────── */}
            <div className="container mx-auto max-w-5xl px-4 py-6">
                <AdUnit adSlot="9081234567" className="w-full bg-slate-50 rounded-xl border border-slate-200 p-2 flex justify-center items-center min-h-[90px]" />
            </div>

            {/* ── Tools grid ────────────────────────────────────── */}
            <section className="py-12">
                <div className="container mx-auto max-w-5xl px-4 sm:px-6">
                    <div className="mb-8">
                        <h2 className="font-outfit text-2xl font-extrabold text-slate-900">Academic Tools</h2>
                        <p className="text-slate-500 text-sm mt-1">Six utilities built for VTU students — no login, no data stored.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {tools.map((tool) => (
                            <Link
                                key={tool.name}
                                href={tool.href}
                                className="group relative flex flex-col bg-white border border-slate-200 rounded-2xl p-5 hover:border-indigo-200 hover:shadow-md hover:shadow-indigo-50 transition-all duration-200"
                            >
                                {tool.tag && (
                                    <span className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100">
                                        {tool.tag}
                                    </span>
                                )}
                                <div className={`${tool.accent} w-10 h-10 rounded-xl flex items-center justify-center text-white mb-4 shadow-sm`}>
                                    <tool.icon className="h-5 w-5" />
                                </div>
                                <h3 className="font-semibold text-slate-900 mb-1.5 group-hover:text-indigo-700 transition-colors">
                                    {tool.name}
                                </h3>
                                <p className="text-slate-500 text-sm leading-relaxed flex-1">{tool.desc}</p>
                                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1 text-xs font-bold text-indigo-600 group-hover:gap-2 transition-all">
                                    Open tool <ChevronRight className="h-3.5 w-3.5" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── About the site ────────────────────────────────── */}
            <section className="py-10 bg-slate-50 border-y border-slate-100">
                <div className="container mx-auto max-w-5xl px-4 sm:px-6">
                    <div className="max-w-3xl">
                        <h2 className="font-outfit text-xl font-extrabold text-slate-900 mb-3">What is VTU Results?</h2>
                        <p className="text-slate-600 text-[15px] leading-relaxed mb-3">
                            This site is an independent student-built platform for Visvesvaraya Technological University (VTU) students based in Karnataka, India. It provides fast, unofficial access to publicly available result data from the official VTU results portal, along with a suite of academic calculators.
                        </p>
                        <p className="text-slate-600 text-[15px] leading-relaxed mb-3">
                            VTU publishes results on <a href="https://results.vtu.ac.in" target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline underline-offset-2">results.vtu.ac.in</a> for B.E./B.Tech students across all schemes — 2022 NEP, 2021 CBCS, and 2018 CBCS. This site fetches and displays that data in a cleaner, mobile-friendly format, and automatically estimates SGPA from the returned marks.
                        </p>
                        <p className="text-slate-600 text-[15px] leading-relaxed">
                            We do not store your University Seat Number (USN), result data, or any personal information. All data is fetched in real time and exists only in your browser session.
                        </p>
                        <div className="mt-4">
                            <Link href="/about" className="text-sm font-semibold text-indigo-600 hover:underline inline-flex items-center gap-1">
                                Read the full About page <ChevronRight className="h-3.5 w-3.5" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Articles ──────────────────────────────────────── */}
            <section className="py-12">
                <div className="container mx-auto max-w-5xl px-4 sm:px-6">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="font-outfit text-2xl font-extrabold text-slate-900">Academic Guides</h2>
                            <p className="text-slate-500 text-sm mt-1">In-depth articles written specifically for VTU students.</p>
                        </div>
                        <Link href="/articles" className="text-sm font-bold text-indigo-600 hover:underline flex items-center gap-1 shrink-0">
                            All articles <ChevronRight className="h-4 w-4" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {articles.map((article) => (
                            <Link
                                key={article.slug}
                                href={`/articles/${article.slug}`}
                                className="group flex items-start gap-3 bg-white border border-slate-200 rounded-xl p-4 hover:border-indigo-200 hover:shadow-sm transition-all"
                            >
                                <span className="mt-0.5 shrink-0 text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-full">
                                    {article.tag}
                                </span>
                                <span className="text-sm font-semibold text-slate-800 group-hover:text-indigo-700 leading-snug transition-colors">
                                    {article.title}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── How it works ──────────────────────────────────── */}
            <section className="py-12 bg-slate-50 border-t border-slate-100">
                <div className="container mx-auto max-w-5xl px-4 sm:px-6">
                    <h2 className="font-outfit text-2xl font-extrabold text-slate-900 mb-8">How to check your VTU results</h2>
                    <ol className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {[
                            { n: '1', title: 'Select your exam', body: 'Go to the Results section and pick your academic year, exam session (Dec/Jan or June/July), result type (Regular or Revaluation), and scheme (CBCS / Non-CBCS).' },
                            { n: '2', title: 'Enter your USN', body: 'Type your 10-character University Seat Number (e.g., 1AM21CS202). If the VTU portal has a CAPTCHA, you\'ll be prompted to solve it — the image is fetched live.' },
                            { n: '3', title: 'View marks and SGPA', body: 'Your marksheet is displayed in a clean table showing subject codes, internal marks (CIE), external marks (SEE), totals, grades, and an estimated SGPA.' },
                        ].map((step) => (
                            <li key={step.n} className="flex flex-col gap-3">
                                <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white font-extrabold text-base flex items-center justify-center shadow-sm shadow-indigo-200">
                                    {step.n}
                                </div>
                                <h3 className="font-semibold text-slate-900">{step.title}</h3>
                                <p className="text-slate-500 text-sm leading-relaxed">{step.body}</p>
                            </li>
                        ))}
                    </ol>

                    <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800">
                        <strong>Important:</strong> This tool fetches data from the official VTU results server in real time. Result availability depends on VTU publishing them. Always verify marks on the <a href="https://results.vtu.ac.in" target="_blank" rel="noopener noreferrer" className="underline font-semibold">official VTU site</a> for academic records and official declarations.
                    </div>
                </div>
            </section>

            {/* ── VTU grading quick ref ─────────────────────────── */}
            <section className="py-12 border-t border-slate-100">
                <div className="container mx-auto max-w-5xl px-4 sm:px-6">
                    <h2 className="font-outfit text-2xl font-extrabold text-slate-900 mb-2">VTU CBCS Grading Quick Reference</h2>
                    <p className="text-slate-500 text-sm mb-6">Letter grades and grade points under the Choice Based Credit System (2018, 2021, 2022 schemes).</p>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm border border-slate-200 rounded-xl overflow-hidden">
                            <thead className="bg-slate-50 border-b border-slate-200">
                                <tr>
                                    <th className="px-5 py-3 text-left font-semibold text-slate-700">Marks (out of 100)</th>
                                    <th className="px-5 py-3 text-left font-semibold text-slate-700">Letter Grade</th>
                                    <th className="px-5 py-3 text-left font-semibold text-slate-700">Grade Points</th>
                                    <th className="px-5 py-3 text-left font-semibold text-slate-700">Class</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {[
                                    ['90 – 100', 'S (Outstanding)', '10', 'Distinction'],
                                    ['80 – 89', 'A (Excellent)', '9', 'Distinction'],
                                    ['70 – 79', 'B (Very Good)', '8', 'First Class'],
                                    ['60 – 69', 'C (Good)', '7', 'First Class'],
                                    ['50 – 59', 'D (Average)', '6', 'Second Class'],
                                    ['40 – 49', 'E (Pass)', '5', 'Pass Class'],
                                    ['< 40', 'F (Fail)', '0', 'Fail'],
                                ].map(([marks, grade, gp, cls]) => (
                                    <tr key={marks} className="hover:bg-slate-50">
                                        <td className="px-5 py-3 font-mono text-slate-700">{marks}</td>
                                        <td className="px-5 py-3 font-semibold text-slate-800">{grade}</td>
                                        <td className="px-5 py-3 font-mono font-bold text-indigo-700">{gp}</td>
                                        <td className="px-5 py-3 text-slate-500">{cls}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <p className="text-slate-400 text-xs mt-3">
                        SGPA formula: <span className="font-mono">Σ(Credits × Grade Points) / Σ Credits</span> · CGPA: credit-weighted average of all semester SGPAs.{' '}
                        <Link href="/articles/how-to-calculate-sgpa" className="text-indigo-600 hover:underline">Detailed guide →</Link>
                    </p>
                </div>
            </section>

        </div>
    );
}
