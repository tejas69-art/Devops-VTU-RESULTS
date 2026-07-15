'use client';
import React, { useState } from 'react';
import { FileWarning, Info, ArrowRight, RotateCcw } from 'lucide-react';
import Link from 'next/link';

type ExamType = 'supplementary' | 'revaluation' | 'photocopy';

const FEE_STRUCTURE: Record<ExamType, { perSubject: number; label: string; desc: string }> = {
    supplementary: {
        perSubject: 1200,
        label: 'Supplementary (Back) Exam',
        desc: 'Re-sit the full theory paper to clear a backlog.',
    },
    revaluation: {
        perSubject: 750,
        label: 'Revaluation',
        desc: 'Request a re-evaluation of your answer script by a second examiner.',
    },
    photocopy: {
        perSubject: 300,
        label: 'Photocopy of Answer Script',
        desc: 'Obtain a scanned copy of your evaluated answer booklet.',
    },
};

const BASE_FEE: Record<ExamType, number> = {
    supplementary: 500,
    revaluation: 0,
    photocopy: 0,
};

export default function BacklogFeeEstimatorPage() {
    const [examType, setExamType] = useState<ExamType>('supplementary');
    const [subjects, setSubjects] = useState<number>(1);

    const fee = BASE_FEE[examType] + FEE_STRUCTURE[examType].perSubject * subjects;

    return (
        <div className="min-h-screen bg-slate-50/50 py-12">
            <div className="container mx-auto max-w-4xl px-4 sm:px-6">

                {/* Header */}
                <div className="mb-10">
                    <h1 className="font-outfit text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
                        VTU Backlog Fee Estimator
                    </h1>
                    <p className="text-slate-600 max-w-2xl font-medium">
                        Estimate your supplementary (back) exam, revaluation, or photocopy fees for VTU subjects. Fee structure is based on approximate VTU circulars — always confirm the exact amount with your college exam section.
                    </p>
                    <div className="mt-3 inline-flex items-start gap-2 px-3 py-2 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-800 font-medium">
                        <Info className="w-4 h-4 shrink-0 mt-0.5" />
                        <span>Fees shown are approximate and based on recent VTU circulars. Final amounts may vary by college and exam cycle. Always verify with your college examination cell.</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Calculator */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                        <h2 className="font-semibold text-slate-900 mb-5 flex items-center gap-2">
                            <FileWarning className="w-5 h-5 text-amber-600" /> Fee Calculator
                        </h2>

                        <div className="space-y-5">
                            {/* Exam type */}
                            <div>
                                <p className="text-sm font-semibold text-slate-700 mb-2">Type of Application</p>
                                <div className="space-y-2">
                                    {(Object.keys(FEE_STRUCTURE) as ExamType[]).map((type) => (
                                        <button
                                            key={type}
                                            type="button"
                                            onClick={() => setExamType(type)}
                                            className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all ${examType === type ? 'border-amber-400 bg-amber-50 text-amber-900' : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'}`}
                                        >
                                            <span className="font-semibold block">{FEE_STRUCTURE[type].label}</span>
                                            <span className="text-xs text-slate-500">{FEE_STRUCTURE[type].desc}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Number of subjects */}
                            <div>
                                <label htmlFor="subjects-input" className="block text-sm font-semibold text-slate-700 mb-1.5">
                                    Number of Subjects
                                </label>
                                <div className="flex items-center gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setSubjects(Math.max(1, subjects - 1))}
                                        className="w-10 h-10 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-colors text-lg"
                                    >
                                        −
                                    </button>
                                    <input
                                        id="subjects-input"
                                        type="number"
                                        min="1"
                                        max="20"
                                        value={subjects}
                                        onChange={e => setSubjects(Math.max(1, Math.min(20, parseInt(e.target.value) || 1)))}
                                        className="flex-1 h-10 text-center border border-slate-200 rounded-xl font-mono font-bold text-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-200"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setSubjects(Math.min(20, subjects + 1))}
                                        className="w-10 h-10 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-colors text-lg"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            {/* Result */}
                            <div className="p-5 bg-amber-50 border border-amber-100 rounded-xl">
                                <p className="text-[11px] font-bold text-amber-500 uppercase tracking-widest mb-1">Estimated Total Fee</p>
                                <div className="text-4xl font-black text-amber-700 font-mono mb-1">₹{fee.toLocaleString('en-IN')}</div>
                                <p className="text-xs text-amber-700 font-medium">
                                    {BASE_FEE[examType] > 0 && `Base fee ₹${BASE_FEE[examType]} + `}
                                    ₹{FEE_STRUCTURE[examType].perSubject}/subject × {subjects} subject{subjects !== 1 ? 's' : ''}
                                </p>
                            </div>

                            <button
                                onClick={() => { setSubjects(1); setExamType('supplementary'); }}
                                className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
                            >
                                <RotateCcw className="w-3.5 h-3.5" /> Reset
                            </button>
                        </div>
                    </div>

                    {/* Breakdown table */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                        <h2 className="font-semibold text-slate-900 mb-4">Approximate Fee Breakdown</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-slate-50 border-b border-slate-200">
                                    <tr>
                                        <th className="px-3 py-2 text-left font-semibold text-slate-600">Type</th>
                                        <th className="px-3 py-2 text-right font-semibold text-slate-600">Per Subject</th>
                                        <th className="px-3 py-2 text-right font-semibold text-slate-600">Base</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {(Object.entries(FEE_STRUCTURE) as [ExamType, typeof FEE_STRUCTURE[ExamType]][]).map(([type, data]) => (
                                        <tr key={type} className={examType === type ? 'bg-amber-50' : 'hover:bg-slate-50'}>
                                            <td className="px-3 py-2.5 text-slate-700 font-medium">{data.label}</td>
                                            <td className="px-3 py-2.5 text-right font-mono text-slate-700">₹{data.perSubject}</td>
                                            <td className="px-3 py-2.5 text-right font-mono text-slate-500">₹{BASE_FEE[type]}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                            Fees based on approximate VTU 2023–24 circulars. Exact fees may differ. Demand Draft / online payment modes accepted via college portals.
                        </p>
                    </div>
                </div>

                {/* Detailed guide */}
                <div className="mt-8 bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm space-y-6 article-body">
                    <h2>What Are VTU Backlog Fees For?</h2>
                    <p>
                        When a VTU student fails a subject (grades F — below 40% combined CIE + SEE marks) or is detained due to attendance shortage, they must clear the backlog to be eligible for their degree. VTU offers three main post-result mechanisms:
                    </p>

                    <h3>1. Supplementary (Back) Exams</h3>
                    <p>
                        Supplementary exams, also called "re-exams" or "backlog exams," allow students to re-sit the full theory paper for subjects they have failed. These are conducted along with the regular semester exams — typically in June-July (for even semester papers) and December-January (for odd semester papers). CIE (internal) marks from the original semester carry forward; only the SEE (external) paper needs to be re-written.
                    </p>
                    <p>
                        The approximate fee is <strong>₹500 as a base registration fee plus ₹1,200 per subject</strong>. Payment is typically made via Demand Draft drawn in favour of "Finance Officer, VTU" or through the college's online portal.
                    </p>

                    <h3>2. Revaluation</h3>
                    <p>
                        If a student is unsatisfied with their external (SEE) marks, they can apply for revaluation within a specified window — typically 10–15 days after result declaration. The answer script is re-evaluated by a different examiner. The approximate fee is <strong>₹750 per subject</strong>.
                    </p>
                    <p>
                        Important: Revaluation results can go up or down. VTU policy allows marks to decrease during revaluation. If the difference between original and revalued marks is more than a threshold (typically 15 marks), a third evaluation may be ordered automatically.
                    </p>

                    <h3>3. Photocopy of Answer Script</h3>
                    <p>
                        Before applying for revaluation, students can request a photocopy of their evaluated answer script to assess whether a revaluation is worth pursuing. The fee is approximately <strong>₹300 per subject</strong>. This is a smart first step — review the photocopy, then decide if you want a full revaluation.
                    </p>

                    <h2>Process: How to Apply for a Supplementary Exam</h2>
                    <ol>
                        <li>Wait for the official VTU notification on the supplementary exam schedule (usually published 30–45 days before exams).</li>
                        <li>Visit your college's examination section and collect the application form, or access the VTU student portal if your college uses online registration.</li>
                        <li>List all subjects you wish to appear for. CIE marks carry forward — you only need to re-appear for the SEE component.</li>
                        <li>Pay the fee via Demand Draft or online payment as instructed by your college.</li>
                        <li>Submit the application with required documents (ID proof, fee receipt) to the exam section before the deadline.</li>
                        <li>Hall tickets are issued 7–10 days before the exam date.</li>
                    </ol>

                    <div className="callout">
                        <strong>Tip:</strong> Students in their final year must clear all backlogs before their 8th semester results are processed for degree award. VTU allows students to appear for supplementary exams of any lower semester during any subsequent examination session.
                    </div>
                </div>

                {/* Related */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Link href="/articles/vtu-backlogs-guide" className="group flex items-center gap-3 bg-white border border-slate-200 rounded-xl p-4 hover:border-indigo-200 hover:shadow-sm transition-all">
                        <div className="w-9 h-9 bg-red-100 text-red-700 rounded-lg flex items-center justify-center shrink-0">
                            <FileWarning className="w-4 h-4" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-slate-800">VTU Backlogs Guide</p>
                            <p className="text-xs text-slate-500">How to clear them and protect your career</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 ml-auto group-hover:text-indigo-600 transition-colors" />
                    </Link>
                    <Link href="/articles/vtu-supplementary-exams" className="group flex items-center gap-3 bg-white border border-slate-200 rounded-xl p-4 hover:border-indigo-200 hover:shadow-sm transition-all">
                        <div className="w-9 h-9 bg-orange-100 text-orange-700 rounded-lg flex items-center justify-center shrink-0">
                            <Info className="w-4 h-4" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-slate-800">Supplementary Exams Guide</p>
                            <p className="text-xs text-slate-500">Registration, preparation, and what happens after</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 ml-auto group-hover:text-indigo-600 transition-colors" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
