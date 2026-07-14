import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
    title: 'How to Calculate SGPA in VTU — Step-by-Step Formula & Examples',
    description: 'Learn exactly how VTU calculates SGPA under the CBCS scheme. Includes the official formula, a worked 8-subject example with real credit values, the grade point table, and common mistakes to avoid.',
};

export default function HowToCalculateSgpa() {
    return (
        <div className="min-h-screen bg-slate-50/50 py-10">
            <div className="container mx-auto max-w-3xl px-4 sm:px-6">

                {/* Back */}
                <Link href="/articles" className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-slate-800 mb-8 transition-colors">
                    <ArrowLeft className="h-4 w-4" /> All Articles
                </Link>

                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full">Guide</span>
                        <span className="text-xs text-slate-400">May 2024 · 8 min read</span>
                    </div>
                    <h1 className="font-outfit text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
                        How to Calculate Your SGPA in VTU: A Complete Guide
                    </h1>
                    <p className="text-slate-600 text-base leading-relaxed">
                        SGPA is the most important number on your VTU marksheet — but the formula confuses a surprising number of students. This guide walks through exactly how it's calculated, with a full worked example.
                    </p>
                </div>

                {/* Article body */}
                <article className="bg-white border border-slate-200 rounded-2xl p-6 md:p-10 shadow-sm article-body">

                    <h2>What Is SGPA?</h2>
                    <p>
                        SGPA stands for <strong>Semester Grade Point Average</strong>. It is a numerical representation of a student's academic performance in a single semester, calculated on a scale of 0 to 10. A higher SGPA indicates better performance. VTU uses SGPA as the building block for your overall CGPA (Cumulative Grade Point Average), which is the average across all semesters.
                    </p>
                    <p>
                        Under VTU's Choice Based Credit System (CBCS), introduced for students admitted from 2015 onwards, all examination performance is expressed in terms of grade points rather than raw percentage marks. This is why understanding SGPA is essential — it's how VTU speaks about your academic record.
                    </p>

                    <h2>The Official VTU SGPA Formula</h2>
                    <p>The formula used by VTU to compute SGPA is:</p>
                    <div className="formula-box">SGPA = Σ (Ci × Gi) / Σ Ci</div>
                    <p>Where:</p>
                    <ul>
                        <li><strong>Ci</strong> = Credit assigned to subject i in the semester</li>
                        <li><strong>Gi</strong> = Grade Points obtained in subject i</li>
                        <li><strong>Σ</strong> = Sum over all subjects in the semester</li>
                    </ul>
                    <p>
                        In other words, you multiply each subject's credit by its grade point, sum all of these products, then divide by the total credits in the semester. This is a weighted average — subjects with more credits have a greater impact on your SGPA.
                    </p>

                    <h2>VTU CBCS Grade Point Table</h2>
                    <p>
                        Before you can apply the formula, you need to know what grade points correspond to what marks. Under VTU CBCS, the following letter grade — grade point mapping applies:
                    </p>
                    <table>
                        <thead>
                            <tr>
                                <th>Marks Range (out of 100)</th>
                                <th>Letter Grade</th>
                                <th>Grade Points (Gi)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td>90 – 100</td><td>S (Outstanding)</td><td>10</td></tr>
                            <tr><td>80 – 89</td><td>A (Excellent)</td><td>9</td></tr>
                            <tr><td>70 – 79</td><td>B (Very Good)</td><td>8</td></tr>
                            <tr><td>60 – 69</td><td>C (Good)</td><td>7</td></tr>
                            <tr><td>50 – 59</td><td>D (Average)</td><td>6</td></tr>
                            <tr><td>40 – 49</td><td>E (Pass)</td><td>5</td></tr>
                            <tr><td>Below 40</td><td>F (Fail)</td><td>0</td></tr>
                        </tbody>
                    </table>
                    <p>
                        Note: The marks range refers to the <strong>combined total</strong> of CIE (Internal Assessment, 40 marks max) and SEE (Semester End Examination, 60 marks max), expressed out of 100. A student can fail even if they score well in internals if their SEE marks are below 40% of 60 (i.e., below 24 in SEE).
                    </p>

                    <h2>Worked Example: 3rd Semester CSE (2021 CBCS Scheme)</h2>
                    <p>
                        Let's calculate SGPA for a typical 3rd semester Computer Science student under the 2021 CBCS scheme. The credit structure for CSE 3rd semester is approximately:
                    </p>
                    <table>
                        <thead>
                            <tr>
                                <th>Subject</th>
                                <th>Credits (Ci)</th>
                                <th>Marks Obtained</th>
                                <th>Grade</th>
                                <th>Grade Points (Gi)</th>
                                <th>Ci × Gi</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td>Mathematics III</td><td>3</td><td>75</td><td>B</td><td>8</td><td>24</td></tr>
                            <tr><td>Data Structures</td><td>4</td><td>82</td><td>A</td><td>9</td><td>36</td></tr>
                            <tr><td>Discrete Mathematics</td><td>3</td><td>68</td><td>C</td><td>7</td><td>21</td></tr>
                            <tr><td>Analog Electronics</td><td>3</td><td>55</td><td>D</td><td>6</td><td>18</td></tr>
                            <tr><td>Software Engineering</td><td>3</td><td>91</td><td>S</td><td>10</td><td>30</td></tr>
                            <tr><td>DSA Lab</td><td>1</td><td>88</td><td>A</td><td>9</td><td>9</td></tr>
                            <tr><td>Electronics Lab</td><td>1</td><td>80</td><td>A</td><td>9</td><td>9</td></tr>
                        </tbody>
                    </table>
                    <p>
                        Total Credits = 3 + 4 + 3 + 3 + 3 + 1 + 1 = <strong>18</strong>
                    </p>
                    <p>
                        Sum of (Ci × Gi) = 24 + 36 + 21 + 18 + 30 + 9 + 9 = <strong>147</strong>
                    </p>
                    <div className="formula-box">SGPA = 147 / 18 = 8.17</div>
                    <p>
                        This student's SGPA for 3rd semester is <strong>8.17</strong>, which corresponds to approximately 81.7% under the VTU conversion formula (SGPA × 10).
                    </p>

                    <h2>How Credits Are Assigned in VTU</h2>
                    <p>
                        Credits are determined by VTU based on the nature of the subject:
                    </p>
                    <ul>
                        <li><strong>4 credits:</strong> Core theory subjects (Mathematics, primary engineering subjects)</li>
                        <li><strong>3 credits:</strong> Standard theory subjects</li>
                        <li><strong>2 credits:</strong> Minor theory subjects</li>
                        <li><strong>1 credit:</strong> Laboratory practicals, seminars</li>
                        <li><strong>0 credits:</strong> Non-credit mandatory subjects (some schemes)</li>
                    </ul>
                    <p>
                        The exact credit structure depends on your branch and year of admission (scheme year). Check your university scheme document or ask your exam section for the official credit allocation for your batch.
                    </p>

                    <h2>Using the VTU SGPA Calculator</h2>
                    <p>
                        Manual calculation works well for practice, but our <Link href="/vtu-sgpa-cgpa-calculator" className="text-indigo-600 underline">SGPA & CGPA Calculator</Link> automates this entirely. Enter each subject's credit value and select the letter grade from the dropdown, and your SGPA is computed instantly. You can add or remove subjects as needed to match your semester structure.
                    </p>

                    <h2>Common Mistakes in SGPA Calculation</h2>

                    <h3>Mistake 1: Using percentage as grade points</h3>
                    <p>
                        The grade point system is not your percentage divided by 10. A score of 72% gives you a B grade = 8 grade points, not 7.2 grade points. Always use the grade point table above.
                    </p>

                    <h3>Mistake 2: Ignoring lab subjects</h3>
                    <p>
                        Many students calculate SGPA using only theory subjects and forget to include lab practicals. Labs have credits (typically 1 credit each) and their grades contribute to SGPA.
                    </p>

                    <h3>Mistake 3: Dividing by number of subjects instead of total credits</h3>
                    <p>
                        SGPA is credit-weighted, not a simple average. If you have 7 subjects but total 21 credits, divide by 21 — not 7.
                    </p>

                    <h3>Mistake 4: Including failed subjects' credit in numerator</h3>
                    <p>
                        If you get an F grade in a subject (0 grade points), that subject's contribution to the numerator is 0 × credits = 0. However, the credits of that subject ARE included in the denominator (total credits). This means failed subjects significantly pull down your SGPA even though they don't add any grade points.
                    </p>

                    <h2>SGPA to Percentage Conversion</h2>
                    <p>
                        VTU uses a simple formula: <strong>Percentage = SGPA × 10</strong>. So an SGPA of 8.17 = 81.7%. This linear conversion is the official VTU formula and is accepted by most companies and institutions. Use our <Link href="/cgpa-to-percentage" className="text-indigo-600 underline">CGPA to Percentage converter</Link> for quick calculations.
                    </p>

                    <h2>What SGPA Do You Need?</h2>
                    <ul>
                        <li><strong>≥ 7.50 CGPA (75%+):</strong> First Class with Distinction — required by many top-tier companies (TCS Digital, Infosys Systems Engineer roles).</li>
                        <li><strong>≥ 6.00 CGPA (60%+):</strong> First Class — minimum for most campus placement drives and GATE eligibility.</li>
                        <li><strong>≥ 5.00 CGPA (50%+):</strong> Second Class — minimum for some government job applications and management quota admissions.</li>
                        <li><strong>≥ 4.00 CGPA:</strong> Pass Class — degree is awarded, but this range limits higher education and placement opportunities.</li>
                    </ul>
                    <p>
                        If your current semester SGPA is lower than your target CGPA, the next semester's performance can partially compensate — but the impact decreases as you accumulate more semesters. Use the CGPA calculator to model different scenarios.
                    </p>

                    <div className="callout">
                        <strong>Next step:</strong> Open the <Link href="/vtu-sgpa-cgpa-calculator" className="text-indigo-700 underline font-semibold">SGPA & CGPA Calculator</Link> and input your actual marks to see your real SGPA in under 30 seconds.
                    </div>
                </article>

                {/* Related */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                        { title: 'VTU Grading System Explained', href: '/articles/vtu-grading-system' },
                        { title: 'CGPA vs SGPA — Key Differences', href: '/articles/cgpa-vs-sgpa-vtu' },
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
