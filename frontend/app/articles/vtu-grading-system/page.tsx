import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
    title: 'The VTU Grading System (CBCS): Complete Guide to Grades, SGPA & Class',
    description: 'Everything about the VTU CBCS grading system — absolute vs relative grading, CIE and SEE marks explained, grace marks policy, class declaration thresholds, and CGPA to percentage conversion.',
};

export default function VtuGradingSystem() {
    return (
        <div className="min-h-screen bg-slate-50/50 py-10">
            <div className="container mx-auto max-w-3xl px-4 sm:px-6">

                <Link href="/articles" className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-slate-800 mb-8 transition-colors">
                    <ArrowLeft className="h-4 w-4" /> All Articles
                </Link>

                <div className="mb-8">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full">Explained</span>
                        <span className="text-xs text-slate-400">May 2024 · 10 min read</span>
                    </div>
                    <h1 className="font-outfit text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
                        The VTU Grading System (CBCS): Everything Explained
                    </h1>
                    <p className="text-slate-600 text-base leading-relaxed">
                        VTU's grading system confuses students across schemes. This guide demystifies how marks become grades, how grades become SGPA, and how SGPA ultimately determines your degree class.
                    </p>
                </div>

                <article className="bg-white border border-slate-200 rounded-2xl p-6 md:p-10 shadow-sm article-body">

                    <h2>What Is the VTU CBCS Scheme?</h2>
                    <p>
                        Visvesvaraya Technological University introduced the <strong>Choice Based Credit System (CBCS)</strong> for students admitted from the academic year 2015–16. Since then, multiple scheme revisions have been released — the 2018 CBCS Scheme, the 2021 CBCS Scheme, and the 2022 NEP Scheme — but the fundamental grading logic has remained consistent across all of them.
                    </p>
                    <p>
                        Under CBCS, each subject has a specified number of credits, and your performance is measured not in raw marks but in <strong>grade points</strong> on a 10-point scale. Your semester performance is summarised as SGPA, and your overall performance across semesters is your CGPA.
                    </p>

                    <h2>How Marks Are Calculated: CIE + SEE</h2>
                    <p>
                        Every theory subject in VTU has two components of assessment:
                    </p>
                    <table>
                        <thead>
                            <tr><th>Component</th><th>Full Form</th><th>Max Marks</th><th>Passing Threshold</th></tr>
                        </thead>
                        <tbody>
                            <tr><td>CIE</td><td>Continuous Internal Evaluation</td><td>40</td><td>No minimum (but 40% of total required)</td></tr>
                            <tr><td>SEE</td><td>Semester End Examination</td><td>60</td><td>Minimum 24/60 (40% of SEE)</td></tr>
                            <tr><td><strong>Total</strong></td><td>Combined Score</td><td><strong>100</strong></td><td><strong>Minimum 40/100 overall</strong></td></tr>
                        </tbody>
                    </table>
                    <p>
                        <strong>Important:</strong> A student must score at least 40% in the SEE component independently (minimum 24 out of 60), regardless of how high their CIE marks are. A student who scores 38/40 in internals but only 20/60 in SEE will still receive an F grade and must reappear for the supplementary exam.
                    </p>

                    <h3>How CIE is Calculated</h3>
                    <p>
                        Internal Assessment (CIE) typically comprises:
                    </p>
                    <ul>
                        <li>2–3 internal test papers (best of N considered)</li>
                        <li>Assignment or quiz marks</li>
                        <li>Attendance marks (in some schemes)</li>
                    </ul>
                    <p>
                        The exact CIE structure may vary by department and scheme. Internal marks are finalized by your college and uploaded to the VTU portal before the semester exam schedule begins.
                    </p>

                    <h2>From Marks to Grades: The VTU Grade Matrix</h2>
                    <p>
                        Once the combined total (CIE + SEE, out of 100) is computed, a letter grade is assigned based on the following scale:
                    </p>
                    <table>
                        <thead>
                            <tr><th>Combined Marks</th><th>Letter Grade</th><th>Grade Points</th><th>Performance Level</th></tr>
                        </thead>
                        <tbody>
                            <tr><td>90 – 100</td><td>S</td><td>10</td><td>Outstanding</td></tr>
                            <tr><td>80 – 89</td><td>A</td><td>9</td><td>Excellent</td></tr>
                            <tr><td>70 – 79</td><td>B</td><td>8</td><td>Very Good</td></tr>
                            <tr><td>60 – 69</td><td>C</td><td>7</td><td>Good</td></tr>
                            <tr><td>50 – 59</td><td>D</td><td>6</td><td>Average</td></tr>
                            <tr><td>40 – 49</td><td>E</td><td>5</td><td>Pass</td></tr>
                            <tr><td>Below 40</td><td>F</td><td>0</td><td>Fail</td></tr>
                        </tbody>
                    </table>
                    <p>
                        VTU uses <strong>absolute grading</strong> — grades are assigned based on fixed mark ranges, not relative to the class average or a bell curve. This is significant because it means one student's grade is not affected by how well or poorly the rest of the batch performs.
                    </p>

                    <h2>Special Grade Codes on Your Marksheet</h2>
                    <p>
                        Beyond the standard letter grades, your VTU result may show some of these codes:
                    </p>
                    <table>
                        <thead>
                            <tr><th>Code</th><th>Meaning</th></tr>
                        </thead>
                        <tbody>
                            <tr><td>AB</td><td>Absent — student was absent for the SEE paper</td></tr>
                            <tr><td>W</td><td>Withheld — result withheld (typically due to malpractice suspicion or pending fees)</td></tr>
                            <tr><td>NSAR</td><td>Not Eligible for SEE due to Attendance Shortage</td></tr>
                            <tr><td>P</td><td>Pass (used in some schemes for practical subjects)</td></tr>
                            <tr><td>NP</td><td>Not Pass (failed practical component)</td></tr>
                        </tbody>
                    </table>

                    <h2>Grace Marks Policy</h2>
                    <p>
                        VTU permits grace marks under specific conditions to help students pass. The grace marks policy, as per VTU regulations:
                    </p>
                    <ul>
                        <li>A student who falls short of passing in one or two subjects may receive up to <strong>5 grace marks</strong> per subject, subject to conditions.</li>
                        <li>Grace marks are applicable only if the student would pass or improve their class with the grace.</li>
                        <li>Grace marks are not applied automatically to all students — they are considered during the tabulation process.</li>
                        <li>Grace marks do not apply if the student has more than 2 failed subjects or is detained (NSAR).</li>
                    </ul>
                    <p>
                        The grace marks policy has been revised across schemes. Check the specific regulation document for your year of admission for the exact applicability criteria.
                    </p>

                    <h2>How SGPA Is Calculated</h2>
                    <p>
                        Once letter grades are assigned to all subjects, SGPA is computed as the credit-weighted average of grade points:
                    </p>
                    <div className="formula-box">SGPA = Σ (Credits × Grade Points) / Total Credits</div>
                    <p>
                        See our detailed guide on <Link href="/articles/how-to-calculate-sgpa" className="text-indigo-600 underline">how to calculate SGPA in VTU</Link> for a full worked example with a typical 3rd semester CSE schedule.
                    </p>

                    <h2>How CGPA Is Calculated</h2>
                    <p>
                        CGPA (Cumulative Grade Point Average) is the credit-weighted average of all SGPA values across your completed semesters:
                    </p>
                    <div className="formula-box">CGPA = Σ (SGPA_j × Credits_j) / Total Credits (all semesters)</div>
                    <p>
                        Note: CGPA is <em>not</em> a simple average of all SGPAs. Semesters with more credits have more influence. In VTU, semesters typically range from 18 to 26 credits, so a heavy semester with a low SGPA can drag your CGPA down significantly.
                    </p>

                    <h2>Degree Class Declaration</h2>
                    <p>
                        At the end of 8 semesters, VTU declares your degree class based on your final CGPA:
                    </p>
                    <table>
                        <thead>
                            <tr><th>Final CGPA</th><th>Equivalent Percentage</th><th>Class Declared</th></tr>
                        </thead>
                        <tbody>
                            <tr><td>7.50 and above</td><td>75% and above</td><td>First Class with Distinction</td></tr>
                            <tr><td>6.00 – 7.49</td><td>60% – 74.9%</td><td>First Class</td></tr>
                            <tr><td>5.00 – 5.99</td><td>50% – 59.9%</td><td>Second Class</td></tr>
                            <tr><td>4.00 – 4.99</td><td>40% – 49.9%</td><td>Pass Class</td></tr>
                            <tr><td>Below 4.00</td><td>Below 40%</td><td>Fail (degree not awarded)</td></tr>
                        </tbody>
                    </table>
                    <p>
                        To be eligible for degree award, you must have cleared all subject backlogs. A student with even one outstanding backlog (unconclared F grade) will not have their degree declared by VTU regardless of their overall CGPA.
                    </p>

                    <h2>CGPA to Percentage Conversion</h2>
                    <p>
                        VTU uses a simple multiplier: <strong>Percentage = CGPA × 10</strong>. A student with a final CGPA of 8.42 has an equivalent percentage of 84.2%. Use our <Link href="/cgpa-to-percentage" className="text-indigo-600 underline">CGPA to Percentage converter</Link> for quick calculations.
                    </p>

                    <h2>2018 vs 2021 vs 2022 NEP Scheme — Key Grading Differences</h2>
                    <p>
                        The fundamental grading scale (S to F) is the same across all three schemes. However, there are some notable differences:
                    </p>
                    <ul>
                        <li><strong>2018 CBCS:</strong> 8-semester structure. CIE typically consists of 3 internal tests + assignments. Labs are 1–2 credits each.</li>
                        <li><strong>2021 CBCS:</strong> Introduced Open Electives and minor specialisations. Some subjects have online course components. Credit structure revised for some branches.</li>
                        <li><strong>2022 NEP:</strong> Introduces 4+1 structure (4 semesters per year), choice of multiple entry/exit points, and a wider range of electives. Grade calculation formula remains the same but credit allocation varies significantly by branch.</li>
                    </ul>
                    <p>
                        Always verify your credit structure using the official VTU scheme document for your batch year and branch.
                    </p>

                    <div className="callout">
                        <strong>Calculate your own SGPA:</strong> Use the <Link href="/vtu-sgpa-cgpa-calculator" className="text-indigo-700 font-semibold underline">SGPA & CGPA Calculator</Link> to enter your subjects, credits, and grades — your SGPA is computed instantly without any manual arithmetic.
                    </div>

                </article>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                        { title: 'How to Calculate SGPA in VTU', href: '/articles/how-to-calculate-sgpa' },
                        { title: 'How to Read Your VTU Marksheet', href: '/articles/reading-vtu-marksheet' },
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
