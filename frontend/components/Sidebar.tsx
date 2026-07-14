'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Calculator, Calendar, Gift, Sparkles, BookOpen, ExternalLink, ChevronRight, Info, GraduationCap, Briefcase } from 'lucide-react';
import AdUnit from '@/components/AdSense/AdUnit';

export const Sidebar = () => {
    const pathname = usePathname();

    const quickTools = [
        { name: 'Results Hub', href: '/vtu-results', icon: GraduationCap, color: 'text-indigo-600 bg-indigo-50 border-indigo-100' },
        { name: 'Jobs Board', href: '/jobs', icon: Briefcase, color: 'text-rose-600 bg-rose-50 border-rose-100' },
        { name: 'CGPA to Percentage', href: '/cgpa-to-percentage', icon: BookOpen, color: 'text-sky-600 bg-sky-50 border-sky-100' },
        { name: 'SGPA/CGPA Calc', href: '/vtu-sgpa-cgpa-calculator', icon: Calculator, color: 'text-violet-600 bg-violet-50 border-violet-100' },
        { name: 'Attendance Tracker', href: '/attendance-calculator', icon: Calendar, color: 'text-emerald-600 bg-emerald-50 border-emerald-100' },
        { name: 'Salary Predictor', href: '/placement-salary-calculator', icon: Sparkles, color: 'text-amber-600 bg-amber-50 border-amber-100' },
    ];

    const trendingArticles = [
        { title: 'How to Calculate Your SGPA in VTU', slug: 'how-to-calculate-sgpa', tag: 'Guide' },
        { title: 'VTU Grading System (CBCS) Explained', slug: 'vtu-grading-system', tag: 'Explained' },
        { title: '85% Attendance Rules & Condonation', slug: 'vtu-attendance-rules', tag: 'Policy' },
        { title: 'Strategies to Ace External Exams', slug: 'exam-preparation-tips', tag: 'Tips' },
    ];

    const isCurrentPage = (href: string) => pathname === href;

    return (
        <aside className="space-y-6">
            {/* Quick Tools Navigation Card */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm">
                <h3 className="font-outfit text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <span className="h-4.5 w-1 bg-indigo-600 rounded-full"></span>
                    Quick Portals & Tools
                </h3>
                <div className="space-y-2">
                    {quickTools.map((tool) => (
                        <Link
                            key={tool.name}
                            href={tool.href}
                            className={`flex items-center justify-between p-3 rounded-xl border text-sm font-semibold transition-all duration-200 ${
                                isCurrentPage(tool.href)
                                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                                    : 'bg-white text-slate-700 border-slate-200/60 hover:border-indigo-300 hover:bg-slate-50'
                            }`}
                        >
                            <div className="flex items-center gap-2.5">
                                <div className={`flex h-8 w-8 items-center justify-center rounded-lg border ${
                                    isCurrentPage(tool.href) ? 'bg-white/20 text-white border-transparent' : tool.color
                                }`}>
                                    <tool.icon className="h-4.5 w-4.5" />
                                </div>
                                {tool.name}
                            </div>
                            <ChevronRight className={`h-4 w-4 opacity-75 ${isCurrentPage(tool.href) ? 'text-white' : 'text-slate-400'}`} />
                        </Link>
                    ))}
                </div>
            </div>

            {/* AdSense Sidebar Ad Slot */}
            <div className="bg-slate-50 rounded-2xl border border-dashed border-slate-300 p-4 flex flex-col items-center justify-center min-h-[280px] shadow-inner text-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Advertisement</span>
                {/* Horizontal / Responsive display ad unit */}
                <AdUnit adSlot="4536728901" adFormat="auto" className="w-full h-full" />
                {/* Fallback mock UI to show ads space */}
                <div className="flex flex-col items-center justify-center py-6 text-slate-350 select-none">
                    <Sparkles className="h-8 w-8 text-slate-300 mb-2 animate-pulse" />
                    <span className="text-xs font-semibold text-slate-400">Google AdSense Partner Zone</span>
                    <span className="text-[10px] text-slate-450 mt-1">Smart ads automatically placed here</span>
                </div>
            </div>

            {/* Trending Articles Card */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm">
                <h3 className="font-outfit text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <span className="h-4.5 w-1 bg-indigo-600 rounded-full"></span>
                    Trending Guides
                </h3>
                <div className="divide-y divide-slate-100">
                    {trendingArticles.map((article) => (
                        <Link
                            key={article.slug}
                            href={`/articles/${article.slug}`}
                            className="block py-3 hover:text-indigo-600 transition-colors group first:pt-0 last:pb-0"
                        >
                            <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded mb-1.5">
                                {article.tag}
                            </span>
                            <h4 className="text-sm font-bold text-slate-800 leading-snug group-hover:text-indigo-600 transition-colors">
                                {article.title}
                            </h4>
                        </Link>
                    ))}
                </div>
                <Link
                    href="/articles"
                    className="mt-4 flex items-center justify-center gap-1 py-2 rounded-xl text-xs font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-colors w-full"
                >
                    <BookOpen className="h-3.5 w-3.5" />
                    Browse All Articles
                </Link>
            </div>

            {/* Official resources links */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm">
                <h3 className="font-outfit text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <span className="h-4.5 w-1 bg-indigo-600 rounded-full"></span>
                    Official VTU Portals
                </h3>
                <ul className="space-y-2 text-xs font-semibold text-slate-600">
                    <li>
                        <a
                            href="https://vtu.ac.in"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 hover:text-slate-900 border border-transparent hover:border-slate-100 transition-all"
                        >
                            <span>VTU Official Website</span>
                            <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://results.vtu.ac.in"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 hover:text-slate-900 border border-transparent hover:border-slate-100 transition-all"
                        >
                            <span>Official Results Server</span>
                            <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://eval.vtu.ac.in"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 hover:text-slate-900 border border-transparent hover:border-slate-100 transition-all"
                        >
                            <span>Revaluation Portal</span>
                            <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
                        </a>
                    </li>
                </ul>
            </div>

            {/* Disclaimer card */}
            <div className="bg-slate-50/50 rounded-2xl border border-slate-200 p-5 shadow-sm text-xs space-y-2.5">
                <div className="flex items-center gap-1.5 text-slate-800 font-bold">
                    <Info className="h-4.5 w-4.5 text-slate-450" />
                    <span>Unofficial Portal Note</span>
                </div>
                <p className="text-slate-500 leading-relaxed font-medium">
                    This platform serves calculated estimations and cached listings for student convenience. We are not officially affiliated with Visvesvaraya Technological University. Always confirm your academic status and marks with the official registrars.
                </p>
            </div>
        </aside>
    );
};
