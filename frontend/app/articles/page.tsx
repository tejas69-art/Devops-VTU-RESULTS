import Link from 'next/link';
import { BookOpen, ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Articles & Guides for VTU Students — Results, SGPA, Exams & Career',
    description: 'In-depth articles and guides for VTU students — covering SGPA calculation, grading system, attendance rules, exam strategies, backlogs, supplementary exams, career options, and more.',
};

const articles = [
    {
        title: 'How to Calculate Your SGPA in VTU: A Complete Guide',
        slug: 'how-to-calculate-sgpa',
        description: 'Step-by-step walkthrough of the SGPA formula under VTU CBCS. Includes a worked example with 8 subjects, the full grade point table, and the most common mistakes students make.',
        date: 'May 2024',
        tag: 'Guide',
        tagColor: 'text-blue-700 bg-blue-50 border-blue-100',
        readTime: '8 min',
    },
    {
        title: 'The VTU Grading System (CBCS): Everything Explained',
        slug: 'vtu-grading-system',
        description: 'Absolute vs relative grading under CBCS, how CIE and SEE marks combine, grace marks policy, class declaration thresholds, and CGPA to percentage conversion — all in one place.',
        date: 'May 2024',
        tag: 'Explained',
        tagColor: 'text-emerald-700 bg-emerald-50 border-emerald-100',
        readTime: '10 min',
    },
    {
        title: 'VTU Attendance Rules: The 85% Mandate and Condonation Explained',
        slug: 'vtu-attendance-rules',
        description: 'How the 85% attendance rule works, what NSAR means, condonation eligibility, medical leave procedures, what happens if you fall short, and strategies to stay above the threshold.',
        date: 'June 2024',
        tag: 'Policy',
        tagColor: 'text-teal-700 bg-teal-50 border-teal-100',
        readTime: '9 min',
    },
    {
        title: 'Top Strategies to Ace Your VTU External Exams',
        slug: 'exam-preparation-tips',
        description: 'Proven strategies: PYQP analysis, the 3-module approach, answer presentation tips, CIE maximisation, branch-specific tactics, and a 30-day study plan template.',
        date: 'June 2024',
        tag: 'Tips',
        tagColor: 'text-purple-700 bg-purple-50 border-purple-100',
        readTime: '12 min',
    },
    {
        title: 'How VTU Results Are Published: A Complete Guide',
        slug: 'how-vtu-results-work',
        description: 'The full behind-the-scenes process — valuation camps, data entry, audit stages, publication on results.vtu.ac.in, typical timelines, and what to do right after results drop.',
        date: 'July 2024',
        tag: 'Guide',
        tagColor: 'text-blue-700 bg-blue-50 border-blue-100',
        readTime: '7 min',
    },
    {
        title: 'VTU Backlogs: How to Clear Them Fast and Protect Your Career',
        slug: 'vtu-backlogs-guide',
        description: 'What a backlog is, how it hits your SGPA, how TCS/Infosys/Wipro treat active vs cleared backlogs, and concrete strategies to clear arrears in supplementary exams.',
        date: 'July 2024',
        tag: 'Guide',
        tagColor: 'text-red-700 bg-red-50 border-red-100',
        readTime: '11 min',
    },
    {
        title: 'Career After VTU Engineering: Your Complete Roadmap',
        slug: 'career-after-vtu',
        description: 'Campus placements, GATE prep, MS abroad, MBA, government jobs, PSUs, entrepreneurship — all options covered with actionable advice for VTU graduates.',
        date: 'August 2024',
        tag: 'Career',
        tagColor: 'text-indigo-700 bg-indigo-50 border-indigo-100',
        readTime: '15 min',
    },
    {
        title: 'How to Read Your VTU Marksheet: Every Field Explained',
        slug: 'reading-vtu-marksheet',
        description: 'Decode every column — USN, subject codes, CIE/SEE marks, letter grades, SGPA, CGPA, status codes (AB, W, NSAR), and what to do if you spot an error.',
        date: 'August 2024',
        tag: 'Explained',
        tagColor: 'text-teal-700 bg-teal-50 border-teal-100',
        readTime: '6 min',
    },
    {
        title: 'VTU Supplementary Exams: Complete Guide to Registration and Preparation',
        slug: 'vtu-supplementary-exams',
        description: 'Everything about VTU back exams — eligibility, registration steps, how CIE marks carry forward, preparation strategy, and what happens after you pass.',
        date: 'August 2024',
        tag: 'Guide',
        tagColor: 'text-orange-700 bg-orange-50 border-orange-100',
        readTime: '9 min',
    },
    {
        title: 'CGPA vs SGPA in VTU: Key Differences and What Actually Matters',
        slug: 'cgpa-vs-sgpa-vtu',
        description: 'Clear definitions, calculation formulas, a 4-semester worked example, and which metric matters more for placements, GATE, MS abroad, and your degree class.',
        date: 'September 2024',
        tag: 'Explained',
        tagColor: 'text-blue-700 bg-blue-50 border-blue-100',
        readTime: '8 min',
    },
];

export default function ArticlesIndex() {
    return (
        <div className="min-h-screen bg-slate-50/50 py-12">
            <div className="container mx-auto max-w-4xl px-4 sm:px-6">

                <div className="mb-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full text-indigo-700 text-xs font-bold uppercase tracking-wider mb-4">
                        <BookOpen className="w-3.5 h-3.5" /> Resources
                    </div>
                    <h1 className="font-outfit text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">Articles & Guides</h1>
                    <p className="text-slate-600 max-w-xl leading-relaxed">
                        In-depth articles written specifically for VTU students — from understanding your marksheet and calculating SGPA, to clearing backlogs and planning your career after engineering.
                    </p>
                </div>

                <div className="grid gap-4">
                    {articles.map((article) => (
                        <Link
                            href={`/articles/${article.slug}`}
                            key={article.slug}
                            className="group bg-white border border-slate-200 rounded-2xl p-5 md:p-6 hover:border-indigo-200 hover:shadow-md hover:shadow-indigo-50 transition-all flex flex-col sm:flex-row sm:items-start gap-4"
                        >
                            <div className="flex-1 space-y-2">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${article.tagColor}`}>
                                        {article.tag}
                                    </span>
                                    <span className="text-xs text-slate-400">{article.date} · {article.readTime} read</span>
                                </div>
                                <h2 className="font-outfit text-base md:text-lg font-bold text-slate-900 group-hover:text-indigo-700 transition-colors leading-snug">
                                    {article.title}
                                </h2>
                                <p className="text-slate-500 text-sm leading-relaxed">
                                    {article.description}
                                </p>
                            </div>
                            <div className="shrink-0 flex items-center sm:mt-1">
                                <span className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 group-hover:gap-2 transition-all whitespace-nowrap">
                                    Read <ArrowRight className="h-3.5 w-3.5" />
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
