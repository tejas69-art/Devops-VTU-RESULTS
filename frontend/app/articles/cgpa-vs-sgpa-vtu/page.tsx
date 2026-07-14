import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
    title: 'CGPA vs SGPA in VTU: Key Differences and What Actually Matters',
    description: 'Clear definitions of CGPA and SGPA in VTU, the difference in calculation, a 4-semester worked example, and which metric matters more for placements, GATE, MS abroad applications, and your final degree class.',
};

export default function CgpaVsSgpaVtu() {
    return (
        <div className="min-h-screen bg-slate-50/50 py-10">
            <div className="container mx-auto max-w-3xl px-4 sm:px-6">
                <Link href="/articles" className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-slate-800 mb-8 transition-colors">
                    <ArrowLeft className="h-4 w-4" /> All Articles
                </Link>

                <div className="mb-8">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full">Explained</span>
                        <span className="text-xs text-slate-400">September 2024 · 8 min read</span>
                    </div>
                    <h1 className="font-outfit text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
                        CGPA vs SGPA in VTU: Key Differences and What Actually Matters
                    </h1>
                    <p className="text-slate-600 text-base leading-relaxed">
                        Students often confuse SGPA and CGPA, or don't understand how one affects the other. This guide clears it up with definitions, a worked 4-semester example, and an honest answer to which number matters more for your career.
                    </p>
                </div>

                <article className="bg-white border border-slate-200 rounded-2xl p-6 md:p-10 shadow-sm article-body">

                    <h2>Definitions: SGPA and CGPA</h2>
                    <p>
                        <strong>SGPA (Semester Grade Point Average)</strong> is a numerical measure of your academic performance in a <em>single semester</em>. It is calculated using the credits and grade points of all subjects in that semester only.
                    </p>
                    <p>
                        <strong>CGPA (Cumulative Grade Point Average)</strong> is a numerical measure of your overall academic performance <em>across all completed semesters</em>. It is a credit-weighted average of all your semester-level grade points.
                    </p>
                    <p>
                        Both are expressed on a 0–10 scale. CGPA is the number that appears on your consolidated marksheet and degree certificate. SGPA is a semester-level metric.
                    </p>

                    <h2>The Formulas</h2>
                    <div className="formula-box">SGPA = Σ(Credits_i × GradePoints_i) / TotalCredits (single semester)</div>
                    <div className="formula-box">CGPA = Σ(SGPA_j × TotalCredits_j) / TotalCredits (all semesters)</div>
                    <p>
                        Where j represents each completed semester. Note: CGPA is NOT a simple average of all SGPAs — semesters with more credits have a greater weight.
                    </p>

                    <h2>Worked Example: 4 Semesters</h2>
                    <p>Consider a student with the following semester performance:</p>
                    <table>
                        <thead>
                            <tr>
                                <th>Semester</th>
                                <th>SGPA</th>
                                <th>Credits</th>
                                <th>SGPA × Credits</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td>1st Semester</td><td>7.20</td><td>20</td><td>144.0</td></tr>
                            <tr><td>2nd Semester</td><td>8.10</td><td>22</td><td>178.2</td></tr>
                            <tr><td>3rd Semester</td><td>6.50</td><td>24</td><td>156.0</td></tr>
                            <tr><td>4th Semester</td><td>8.80</td><td>22</td><td>193.6</td></tr>
                        </tbody>
                    </table>
                    <p>
                        Total Credits = 20 + 22 + 24 + 22 = <strong>88</strong>
                    </p>
                    <p>
                        Total SGPA × Credits = 144.0 + 178.2 + 156.0 + 193.6 = <strong>671.8</strong>
                    </p>
                    <div className="formula-box">CGPA = 671.8 / 88 = 7.63</div>
                    <p>
                        Notice: a simple average of the four SGPAs would be (7.20 + 8.10 + 6.50 + 8.80) / 4 = 7.65. The credit-weighted result is slightly different — 7.63 — because the 3rd semester (low SGPA of 6.50) has the highest credits (24).
                    </p>

                    <h2>Why They're Different: A Key Insight</h2>
                    <p>
                        The 3rd semester in the example above had 24 credits — the most of any semester. This means a low SGPA of 6.50 in that semester has an outsized negative effect on CGPA. The 1st semester has only 20 credits, so even a relatively low 7.20 SGPA there does less damage.
                    </p>
                    <p>
                        The practical implication: <strong>identify which of your semesters have the most credits, and prioritise those for strong performance.</strong> In VTU, 3rd and 5th semesters tend to be heavy credit semesters for most branches.
                    </p>

                    <h2>Can a Single Low SGPA Ruin Your CGPA?</h2>
                    <p>
                        Yes — a very bad semester can permanently limit your CGPA. Let's model the impact:
                    </p>
                    <p>
                        Suppose a student has an 8.0 CGPA through 7 semesters (total ~150 credits). In 8th semester (20 credits), they get a low SGPA of 5.0 (due to a backlog):
                    </p>
                    <ul>
                        <li>CGPA after 7 semesters: (8.0 × 150) / 150 = 8.0</li>
                        <li>After 8th semester: (8.0 × 150 + 5.0 × 20) / 170 = (1200 + 100) / 170 = <strong>7.65</strong></li>
                    </ul>
                    <p>
                        A single disastrous 8th semester dropped CGPA from 8.0 to 7.65 — from strong distinction to just above the threshold. Conversely, a great final semester can only marginally improve a long-established CGPA.
                    </p>

                    <h2>What Matters More: SGPA or CGPA?</h2>
                    <p>
                        The short answer: <strong>CGPA matters for formal requirements; SGPA matters for monitoring and course correction.</strong> Here's the detailed breakdown:
                    </p>

                    <h3>Campus Placements</h3>
                    <p>
                        Companies ask for CGPA, not SGPA. Eligibility cutoffs are CGPA-based (typically 6.0, 6.5, or 7.0). However, some companies ask for semester-wise marksheets during background verification — a very low SGPA in a specific semester may require explanation, but it's usually not disqualifying if CGPA is above the threshold.
                    </p>

                    <h3>GATE Applications</h3>
                    <p>
                        GATE eligibility requires a minimum degree aggregate (or equivalent CGPA). For IIT M.Tech admissions, your GATE score is primary — but CGPA is also considered in shortlisting. Your SGPA in core technical semesters (3rd, 4th, 5th) may be referenced in interviews to assess subject knowledge depth.
                    </p>

                    <h3>MS Abroad Applications</h3>
                    <p>
                        US and European universities typically look at your overall CGPA converted to a GPA on a 4.0 scale or as a percentage. Some universities ask for semester-wise transcripts — they can see individual SGPAs. A strong recovery trajectory (improving SGPAs over semesters) is often viewed positively in SOP narratives.
                    </p>

                    <h3>Government Jobs</h3>
                    <p>
                        Government recruitment (UPSC IES, PSU GATE recruitment, SSC JE) uses aggregate percentage or equivalent CGPA × 10 as the academic eligibility criteria. CGPA is what matters.
                    </p>

                    <h3>MBA Admissions</h3>
                    <p>
                        IIMs and top B-schools use CGPA as one of the academic components in their selection score (WAT/PI). SGPA patterns may be discussed in interviews, especially if there's a significant drop in a particular year.
                    </p>

                    <h2>How to Maximise Both SGPA and CGPA</h2>
                    <ul>
                        <li><strong>Never let a backlog linger:</strong> An F grade in a high-credit subject (4 credits) devastates SGPA and, cumulatively, CGPA. Clear backlogs in the very next supplementary session.</li>
                        <li><strong>Prioritise CIE marks:</strong> Strong internals (30+/40) reduce the pressure on SEE and provide a safety net in every subject.</li>
                        <li><strong>Model your target CGPA:</strong> Use the <Link href="/vtu-sgpa-cgpa-calculator" className="text-indigo-600 underline">CGPA Calculator</Link> to see what SGPA you need this semester to reach your final target.</li>
                        <li><strong>Don't sacrifice high-credit subjects:</strong> Identify which subjects carry the most credits in an upcoming semester and allocate study time proportionally.</li>
                        <li><strong>Early semesters matter less — but still matter:</strong> A poor 1st semester SGPA can be recovered from over 7 semesters. But recovering from a poor 7th semester with only one semester remaining is nearly impossible.</li>
                    </ul>

                    <div className="callout">
                        <strong>Calculate your CGPA right now:</strong> Open the <Link href="/vtu-sgpa-cgpa-calculator" className="text-indigo-700 font-semibold underline">SGPA & CGPA Calculator</Link>, enter your semester SGPAs and total credits, and see your current cumulative average instantly.
                    </div>
                </article>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                        { title: 'How to Calculate SGPA in VTU', href: '/articles/how-to-calculate-sgpa' },
                        { title: 'CGPA to Percentage Converter', href: '/cgpa-to-percentage' },
                    ].map(link => (
                        <Link key={link.href} href={link.href} className="group flex items-center justify-between gap-3 bg-white border border-slate-200 rounded-xl px-4 py-3.5 hover:border-indigo-200 hover:shadow-sm transition-all">
                            <span className="text-sm font-semibold text-slate-800 group-hover:text-indigo-700 transition-colors">{link.title}</span>
                            <ArrowLeft className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors rotate-180 shrink-0" />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
