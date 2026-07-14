import React from 'react';
import Link from 'next/link';
import { VTU_RESULTS_DATA } from '@/lib/vtu-data';
import { Calendar, Search, Award, BookOpen, Clock, FileText, ExternalLink, Link2 } from 'lucide-react';

export const metadata = {
    title: "VTU Results Directory - Check All Semesters & Schemes",
    description: "Access the complete directory of Visvesvaraya Technological University (VTU) exam results. Direct links to regular and revaluation results for all academic years and CBCS schemes.",
    keywords: "vtu results, vtu cbcs results, vtu revaluation, vtu seat number, results vtu",
};

export default function VtuResultsIndex() {
    // Group exams by year
    const examsByYear: { [key: string]: typeof VTU_RESULTS_DATA } = {};
    VTU_RESULTS_DATA.forEach(exam => {
        if (!examsByYear[exam.year]) {
            examsByYear[exam.year] = [];
        }
        examsByYear[exam.year].push(exam);
    });

    const sortedYears = Object.keys(examsByYear).sort((a, b) => b.localeCompare(a));

    return (
        <div className="space-y-6">
            {/* Header Copy */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 md:p-8 shadow-sm">
                <h1 className="font-outfit text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
                    VTU Exam Results Directory
                </h1>
                <p className="text-slate-650 text-sm md:text-base leading-relaxed font-semibold">
                    Access results portals for all semesters, schemes, and branches under Visvesvaraya Technological University. Select your event below to check your scores.
                </p>
            </div>

            {/* Info Card / SEO Paragraph */}
            <div className="bg-indigo-50/50 border border-indigo-100 rounded-2xl p-6 shadow-sm">
                <h2 className="text-base font-bold text-indigo-900 mb-2 flex items-center gap-2">
                    <Award className="w-5 h-5 text-indigo-650" />
                    About VTU Examinations & Results
                </h2>
                <p className="text-slate-650 text-xs md:text-sm leading-relaxed font-semibold">
                    Visvesvaraya Technological University (VTU) oversees engineering and technological education across Karnataka. 
                    Examinations are conducted twice a year: Odd Semester exams around December/January, and Even Semester exams around June/July. 
                    Results are published in phases, beginning with the final semesters. 
                    Our directory provides fast access to both CBCS and Non-CBCS scheme results, including regular, revaluation, and backlog marks.
                </p>
            </div>

            {/* Custom URL Card */}
            <div className="bg-gradient-to-r from-indigo-50/60 to-purple-50/60 border border-indigo-100 rounded-2xl p-6 md:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="space-y-2">
                    <h3 className="font-outfit text-xl font-extrabold text-indigo-950 flex items-center gap-2">
                        <Link2 className="w-5 h-5 text-indigo-650" />
                        Check Results with Custom URL
                    </h3>
                    <p className="text-slate-650 text-xs md:text-sm leading-relaxed font-semibold max-w-2xl">
                        Have a working official VTU result page link that is not listed below? Paste it directly to retrieve your marks and estimate your SGPA.
                    </p>
                </div>
                <div className="w-full md:w-auto flex-shrink-0">
                    <Link
                        href="/vtu-results/custom"
                        className="inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs md:text-sm px-5 py-3 rounded-xl transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 w-full md:w-auto text-center"
                    >
                        Paste Custom Link
                    </Link>
                </div>
            </div>

            {/* Years Grid / Accordions */}
            <div className="space-y-6">
                {sortedYears.map((year) => (
                    <div key={year} className="bg-white rounded-2xl border border-slate-200/85 shadow-sm overflow-hidden">
                        <div className="bg-slate-50/80 border-b border-slate-200/60 px-6 py-4 flex items-center justify-between">
                            <h3 className="font-outfit text-lg font-bold text-slate-800 flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-slate-550" />
                                Academic Year {year}
                            </h3>
                            <span className="bg-indigo-50 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full border border-indigo-100">
                                {examsByYear[year].length} Exam Events
                            </span>
                        </div>
                        
                        <div className="divide-y divide-slate-100">
                            {examsByYear[year].map((exam) => (
                                <div key={exam.id} className="p-5 hover:bg-slate-50/50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div className="space-y-1">
                                        <h4 className="text-sm md:text-base font-bold text-slate-900 flex items-center gap-2">
                                            {exam.title}
                                        </h4>
                                        <div className="flex flex-wrap gap-2 text-[10px] md:text-xs text-slate-500 font-semibold">
                                            <span className="bg-slate-100 px-2 py-0.5 rounded-md">Session: {exam.session}</span>
                                            <span className="bg-slate-100 px-2 py-0.5 rounded-md">Program: {exam.program}</span>
                                            <span className="bg-slate-100 px-2 py-0.5 rounded-md">
                                                Schemes: {Array.from(new Set(exam.links.map(l => l.scheme))).join(', ')}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <Link 
                                            href={`/vtu-results/${exam.id}`}
                                            className="inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs md:text-sm px-4.5 py-2 rounded-xl transition-all shadow-sm hover:shadow transform hover:-translate-y-0.5"
                                        >
                                            Go to Result Checker
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Guidelines Section */}
            <div className="bg-white rounded-2xl border border-slate-200/85 p-6 md:p-8 shadow-sm prose prose-slate max-w-none text-slate-650 text-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2 border-b border-slate-100 pb-3">
                    <BookOpen className="w-5 h-5 text-indigo-650" />
                    How to Check VTU Results Online
                </h3>
                <ol className="space-y-3 pl-5 list-decimal font-semibold text-slate-600">
                    <li>Find your academic year and click the <strong>Go to Result Checker</strong> button.</li>
                    <li>On the checker page, enter your 10-character <strong>University Seat Number (USN)</strong> (e.g., 1AM21CS202).</li>
                    <li>Solve the security captcha image displayed in the check form (note: captchas are case-sensitive).</li>
                    <li>Click <strong>Verify Captcha</strong> to pull results directly from the official VTU servers.</li>
                    <li>The system will display a clean, parsed table of your marks, internal scores, external scores, total marks, and pass/fail status.</li>
                    <li>Our system automatically estimates your Semester Grade Point Average (SGPA) based on standard VTU guidelines.</li>
                </ol>

                <h3 className="text-lg font-bold text-slate-900 mt-8 mb-4 flex items-center gap-2 border-b border-slate-100 pb-3">
                    <Clock className="w-5 h-5 text-indigo-650" />
                    VTU Revaluation & Challenge Valuation
                </h3>
                <p className="leading-relaxed font-semibold text-slate-600">
                    If you are unsatisfied with your semester external marks, VTU offers a revaluation process. Students can apply for photocopy retrieval and subsequent revaluation through their college portals. 
                    Usually, revaluation notification is released 10-15 days after the regular results are declared. If you are confident of scoring higher, you can check the revaluation links in this directory to see if updated revaluation marks have been posted.
                </p>
            </div>
        </div>
    );
}
