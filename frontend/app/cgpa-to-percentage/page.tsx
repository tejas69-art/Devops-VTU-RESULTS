'use client';
import React, { useState } from 'react';
import { Percent, Info, ArrowRight, RotateCcw } from 'lucide-react';
import Link from 'next/link';

export default function CgpaToPercentagePage() {
    const [cgpa, setCgpa] = useState<string>('');
    const error = cgpa !== '' && (parseFloat(cgpa) < 0 || parseFloat(cgpa) > 10);
    const percentage = cgpa !== '' && !error ? (parseFloat(cgpa) * 10).toFixed(2) : null;
    const numVal = percentage ? parseFloat(percentage) : null;

    const getClass = (pct: number) => {
        if (pct >= 75) return 'First Class with Distinction';
        if (pct >= 60) return 'First Class';
        if (pct >= 50) return 'Second Class';
        if (pct >= 40) return 'Pass Class';
        return 'Fail';
    };

    return (
        <div className="min-h-screen bg-slate-50/50 py-12">
            <div className="container mx-auto max-w-4xl px-4 sm:px-6">

                {/* Page header */}
                <div className="mb-10">
                    <h1 className="font-outfit text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
                        VTU CGPA to Percentage Converter
                    </h1>
                    <p className="text-slate-600 max-w-2xl font-medium">
                        Convert your VTU Cumulative Grade Point Average (CGPA) to an equivalent percentage using the official VTU formula. This conversion is accepted by most companies, GATE applications, and government recruitment forms.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Calculator */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                        <h2 className="font-semibold text-slate-900 mb-5 flex items-center gap-2">
                            <Percent className="w-5 h-5 text-sky-600" /> Enter Your CGPA
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <label htmlFor="cgpa-input" className="block text-sm font-semibold text-slate-700 mb-1.5">
                                    CGPA (0 – 10)
                                </label>
                                <input
                                    id="cgpa-input"
                                    type="number"
                                    min="0"
                                    max="10"
                                    step="0.01"
                                    value={cgpa}
                                    onChange={e => setCgpa(e.target.value)}
                                    placeholder="e.g. 8.54"
                                    className={`w-full h-12 px-4 border rounded-xl font-mono font-bold text-xl text-slate-900 focus:outline-none focus:ring-2 transition-colors ${error ? 'border-red-300 focus:ring-red-200 bg-red-50' : 'border-slate-200 focus:ring-indigo-200 bg-white'}`}
                                />
                                {error && <p className="text-xs text-red-600 mt-1 font-medium">CGPA must be between 0 and 10.</p>}
                            </div>

                            <button
                                onClick={() => setCgpa('')}
                                className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
                            >
                                <RotateCcw className="w-3.5 h-3.5" /> Clear
                            </button>
                        </div>

                        {/* Result */}
                        {percentage && numVal !== null && (
                            <div className="mt-6 p-5 bg-sky-50 border border-sky-100 rounded-xl">
                                <p className="text-[11px] font-bold text-sky-500 uppercase tracking-widest mb-1">Equivalent Percentage</p>
                                <div className="text-5xl font-black text-sky-700 font-mono mb-2">{percentage}%</div>
                                <p className="text-sm font-semibold text-sky-800">{getClass(numVal)}</p>
                            </div>
                        )}

                        {/* Formula */}
                        <div className="mt-6 p-4 bg-slate-50 border border-slate-200 rounded-xl font-mono text-center text-sm font-bold text-slate-700">
                            Percentage = CGPA × 10
                        </div>
                    </div>

                    {/* Quick reference */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                        <h2 className="font-semibold text-slate-900 mb-4">Quick Reference Table</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-slate-50 border-b border-slate-200">
                                    <tr>
                                        <th className="px-3 py-2 text-left font-semibold text-slate-600">CGPA</th>
                                        <th className="px-3 py-2 text-left font-semibold text-slate-600">Percentage</th>
                                        <th className="px-3 py-2 text-left font-semibold text-slate-600">Class</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {[
                                        [10.0, '100.0%', 'Distinction'],
                                        [9.0, '90.0%', 'Distinction'],
                                        [8.5, '85.0%', 'Distinction'],
                                        [8.0, '80.0%', 'Distinction'],
                                        [7.5, '75.0%', 'Distinction'],
                                        [7.0, '70.0%', 'First Class'],
                                        [6.5, '65.0%', 'First Class'],
                                        [6.0, '60.0%', 'First Class'],
                                        [5.5, '55.0%', 'Second Class'],
                                        [5.0, '50.0%', 'Second Class'],
                                    ].map(([c, p, cls]) => (
                                        <tr key={String(c)} className={cgpa !== '' && Math.abs(parseFloat(cgpa) - Number(c)) < 0.05 ? 'bg-sky-50' : 'hover:bg-slate-50'}>
                                            <td className="px-3 py-2 font-mono font-bold text-slate-800">{c}</td>
                                            <td className="px-3 py-2 font-mono text-sky-700 font-semibold">{p}</td>
                                            <td className="px-3 py-2 text-slate-500 text-xs">{cls}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Detailed explanation */}
                <div className="mt-8 bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm space-y-6 article-body">
                    <h2>Why Does VTU Use CGPA × 10?</h2>
                    <p>
                        Visvesvaraya Technological University adopted the Choice Based Credit System (CBCS) in 2015, which replaced percentage-based grading with a 10-point grade point scale. To bridge the gap between CGPA and the percentage marks expected by employers and government forms, VTU defined a simple linear conversion:
                    </p>
                    <div className="formula-box">Equivalent Percentage = CGPA × 10</div>
                    <p>
                        This formula is <strong>officially mandated by VTU</strong> and appears in the student regulations document. Unlike some other universities that use multipliers of 9.5 or 9.67, VTU keeps the math straightforward: a CGPA of 8.0 means 80.0%.
                    </p>

                    <h2>Where Is This Conversion Accepted?</h2>
                    <p>
                        Most recruitment and academic portals accept the VTU CGPA × 10 formula, including:
                    </p>
                    <ul>
                        <li><strong>Campus placements (TCS, Infosys, Wipro, Cognizant):</strong> These companies typically ask for percentage equivalent and accept CGPA × 10. Many now directly accept CGPA as-is.</li>
                        <li><strong>GATE applications:</strong> The GATE information brochure accepts CGPA converted to percentage using the university-defined formula. Mention "VTU formula: CGPA × 10" in the form.</li>
                        <li><strong>Government jobs (SSC, UPSC, Banking):</strong> Provide your CGPA and the conversion formula on a VTU letterhead certificate. Your college exam section can issue this.</li>
                        <li><strong>MS abroad applications (GRE route):</strong> US/UK/Canadian universities understand the 10-point system. Most accept the percentage as-is or request a WES evaluation.</li>
                        <li><strong>MBA admissions (CAT, XAT):</strong> IIMs accept CGPA on a 10-point scale directly. Some other colleges ask for % equivalent — use CGPA × 10.</li>
                    </ul>

                    <h2>Common Misconceptions About CGPA Conversion</h2>
                    <h3>Misconception 1: "VTU uses 9.5 as a multiplier"</h3>
                    <p>
                        Some students confuse VTU's formula with Anna University's formula (which uses 9.5). VTU officially uses 10, not 9.5. If you have any doubt, this is documented in VTU Academic Regulations, Clause 14 (CBCS Scheme).
                    </p>
                    <h3>Misconception 2: "My CGPA is already my percentage"</h3>
                    <p>
                        No — CGPA and percentage are different. A CGPA of 8.5 represents 85%, not 8.5%. The grade point scale goes from 0 to 10, while percentages go from 0 to 100.
                    </p>
                    <h3>Misconception 3: "Backlog subjects reduce the CGPA to percentage conversion"</h3>
                    <p>
                        Backlogs themselves don't change the formula. However, if you failed a subject (grade F = 0 grade points) in a semester, that semester's SGPA is lower, which drags down your CGPA, and consequently your percentage equivalent.
                    </p>

                    <h2>CGPA to Degree Class Mapping</h2>
                    <p>According to VTU regulations, degree classifications are awarded as follows based on your final CGPA:</p>
                    <table>
                        <thead><tr><th>CGPA Range</th><th>Percentage Equivalent</th><th>Class Awarded</th></tr></thead>
                        <tbody>
                            <tr><td>≥ 7.50</td><td>≥ 75%</td><td>First Class with Distinction</td></tr>
                            <tr><td>6.00 – 7.49</td><td>60% – 74.9%</td><td>First Class</td></tr>
                            <tr><td>5.00 – 5.99</td><td>50% – 59.9%</td><td>Second Class</td></tr>
                            <tr><td>4.00 – 4.99</td><td>40% – 49.9%</td><td>Pass Class</td></tr>
                            <tr><td>&lt; 4.00</td><td>&lt; 40%</td><td>Fail</td></tr>
                        </tbody>
                    </table>

                    <div className="callout">
                        <strong>Official source:</strong> This information is based on the VTU Academic Regulations for the CBCS scheme. For the most authoritative reference, download the latest regulation booklet from <a href="https://vtu.ac.in" target="_blank" rel="noopener noreferrer" className="text-indigo-700 underline">vtu.ac.in</a>.
                    </div>
                </div>

                {/* Related tools */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Link href="/vtu-sgpa-cgpa-calculator" className="group flex items-center gap-3 bg-white border border-slate-200 rounded-xl p-4 hover:border-indigo-200 hover:shadow-sm transition-all">
                        <div className="w-9 h-9 bg-violet-100 text-violet-700 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-violet-200 transition-colors">
                            <Percent className="w-4 h-4" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-slate-800">SGPA & CGPA Calculator</p>
                            <p className="text-xs text-slate-500">Compute CGPA from semester SGPAs</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 ml-auto group-hover:text-indigo-600 transition-colors" />
                    </Link>
                    <Link href="/articles/cgpa-vs-sgpa-vtu" className="group flex items-center gap-3 bg-white border border-slate-200 rounded-xl p-4 hover:border-indigo-200 hover:shadow-sm transition-all">
                        <div className="w-9 h-9 bg-indigo-100 text-indigo-700 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-indigo-200 transition-colors">
                            <Info className="w-4 h-4" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-slate-800">CGPA vs SGPA Explained</p>
                            <p className="text-xs text-slate-500">Key differences and what matters</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 ml-auto group-hover:text-indigo-600 transition-colors" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
