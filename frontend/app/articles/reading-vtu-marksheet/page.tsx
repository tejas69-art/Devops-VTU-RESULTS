import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
    title: 'How to Read Your VTU Marksheet: Every Column and Code Explained',
    description: 'A complete guide to reading your VTU result marksheet — USN format, subject codes, CIE/SEE marks, grade columns, SGPA, status codes (AB, NSAR, W, P, NP), and what to do if you find an error.',
};

export default function ReadingVtuMarksheet() {
    return (
        <div className="min-h-screen bg-slate-50/50 py-10">
            <div className="container mx-auto max-w-3xl px-4 sm:px-6">
                <Link href="/articles" className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-slate-800 mb-8 transition-colors">
                    <ArrowLeft className="h-4 w-4" /> All Articles
                </Link>

                <div className="mb-8">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 border border-teal-100 px-2 py-0.5 rounded-full">Explained</span>
                        <span className="text-xs text-slate-400">August 2024 · 6 min read</span>
                    </div>
                    <h1 className="font-outfit text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
                        How to Read Your VTU Marksheet: Every Field Explained
                    </h1>
                    <p className="text-slate-600 text-base leading-relaxed">
                        VTU marksheets are dense with codes, abbreviations, and columns. This guide decodes every field so you know exactly what your result is telling you.
                    </p>
                </div>

                <article className="bg-white border border-slate-200 rounded-2xl p-6 md:p-10 shadow-sm article-body">

                    <h2>The Structure of a VTU Marksheet</h2>
                    <p>
                        A VTU result, as displayed on the official portal (and on this site), typically contains:
                    </p>
                    <ol>
                        <li>Student identification information (USN, name, college)</li>
                        <li>Exam metadata (exam year/month, scheme, result type)</li>
                        <li>Subject-wise marks table (one row per subject)</li>
                        <li>Summary (total marks, SGPA, result status)</li>
                    </ol>

                    <h2>Decoding Your USN</h2>
                    <p>
                        Your University Seat Number (USN) is a 10-character code that contains encoded information about your admission:
                    </p>
                    <table>
                        <thead>
                            <tr><th>Characters</th><th>What it represents</th><th>Example</th></tr>
                        </thead>
                        <tbody>
                            <tr><td>1st character</td><td>Always "1" — indicates university affiliation</td><td>1</td></tr>
                            <tr><td>Characters 2–3</td><td>College code (two letters identifying your college)</td><td>AM = AMIT, BM = BMSCE, MS = MSRIT</td></tr>
                            <tr><td>Characters 4–5</td><td>Year of admission (last two digits)</td><td>21 = 2021, 22 = 2022</td></tr>
                            <tr><td>Characters 6–7</td><td>Branch code (two letters)</td><td>CS = CSE, EC = ECE, ME = Mech, CV = Civil</td></tr>
                            <tr><td>Characters 8–10</td><td>Roll number within branch and college</td><td>001 to 999</td></tr>
                        </tbody>
                    </table>
                    <p>
                        Example: USN <strong>1AM21CS202</strong> = 1 (VTU) + AM (AMIT College) + 21 (admitted 2021) + CS (CSE branch) + 202 (roll number 202).
                    </p>
                    <p>
                        Lateral entry students (admitted to 3rd semester) have slightly different codes — the year corresponds to their lateral entry admission year, and roll numbers typically start from a different range.
                    </p>

                    <h2>Understanding Subject Codes</h2>
                    <p>
                        VTU subject codes follow a pattern that encodes information about the subject:
                    </p>
                    <ul>
                        <li><strong>First 2 characters:</strong> Branch code (e.g., CS for Computer Science, EC for Electronics)</li>
                        <li><strong>Characters 3–4:</strong> Scheme year or semester context (e.g., 21 for 2021 scheme)</li>
                        <li><strong>Remaining characters:</strong> Subject identifier</li>
                    </ul>
                    <p>
                        Common subject codes for CSE under 2021 CBCS: CS21EC (Engineering Chemistry), CS21MA (Mathematics), CS21DS (Data Structures). The exact coding varies by scheme — your college's examination section or VTU's scheme document is the definitive reference.
                    </p>

                    <h2>The Subject-Wise Marks Table</h2>
                    <p>
                        Each row in the marks table represents one subject. The columns are:
                    </p>
                    <table>
                        <thead>
                            <tr><th>Column Name</th><th>What It Means</th><th>Max Value</th></tr>
                        </thead>
                        <tbody>
                            <tr><td>Subject Code</td><td>VTU's code for the subject</td><td>—</td></tr>
                            <tr><td>Subject Name</td><td>Full name of the paper</td><td>—</td></tr>
                            <tr><td>CIE</td><td>Continuous Internal Evaluation (internals)</td><td>40</td></tr>
                            <tr><td>SEE</td><td>Semester End Examination (external exam)</td><td>60</td></tr>
                            <tr><td>Total</td><td>CIE + SEE combined</td><td>100</td></tr>
                            <tr><td>Grade</td><td>Letter grade (S/A/B/C/D/E/F)</td><td>—</td></tr>
                            <tr><td>Result</td><td>Pass (P), Fail (F), or status code</td><td>—</td></tr>
                        </tbody>
                    </table>

                    <h2>Status Codes Explained</h2>
                    <p>
                        Instead of numeric marks, some subjects may show one of these codes in the marks columns:
                    </p>
                    <table>
                        <thead>
                            <tr><th>Code</th><th>Meaning</th><th>What Happens Next</th></tr>
                        </thead>
                        <tbody>
                            <tr><td>AB</td><td>Absent from SEE paper</td><td>Treated as a fail (F grade). Must appear in supplementary exam.</td></tr>
                            <tr><td>NSAR</td><td>Not Eligible for SEE due to Attendance Shortage</td><td>Cannot appear in this exam. Must clear attendance in a later semester and then write supplementary paper.</td></tr>
                            <tr><td>W</td><td>Withheld</td><td>Result is on hold — may be due to pending fees, malpractice investigation, or CIE data dispute. Contact college exam section.</td></tr>
                            <tr><td>P</td><td>Pass (for lab/practical subjects)</td><td>Satisfactory performance in practicals.</td></tr>
                            <tr><td>NP</td><td>Not Pass (for lab/practical subjects)</td><td>Failed practical component. Must reappear in supplementary practical exam.</td></tr>
                            <tr><td>EX</td><td>Exempted (rare)</td><td>Subject exempted under specific scheme provisions.</td></tr>
                        </tbody>
                    </table>

                    <h2>Understanding the SGPA on Your Marksheet</h2>
                    <p>
                        The SGPA displayed on the official VTU marksheet may differ from what our Results Checker estimates. Reasons:
                    </p>
                    <ul>
                        <li>VTU's official SGPA on the marksheet is computed using the actual credits of each subject as registered in your academic record.</li>
                        <li>Our SGPA estimate uses default credit values, which may not perfectly match your specific scheme's credit allocation.</li>
                        <li>For the most accurate SGPA, enter your actual subject credits in the <Link href="/vtu-sgpa-cgpa-calculator" className="text-indigo-600 underline">SGPA & CGPA Calculator</Link>.</li>
                    </ul>

                    <h2>What to Do If You Find an Error on Your Marksheet</h2>
                    <p>
                        Errors on VTU marksheets do occur — most commonly in CIE marks (data entry errors by colleges), or occasionally in SEE marks. Here's what to do:
                    </p>
                    <h3>CIE mark error</h3>
                    <ol>
                        <li>Contact your department's class teacher or HOD immediately — they submitted the CIE data and can verify what was sent to VTU.</li>
                        <li>Your college must raise a CIE correction request with VTU's examination department, supported by your internal test papers and marks register.</li>
                        <li>Act quickly — VTU typically has a window for CIE corrections after results are published.</li>
                    </ol>
                    <h3>SEE mark discrepancy</h3>
                    <ol>
                        <li>Apply for a photocopy of your evaluated answer script (₹300). This lets you verify that the marks entered match what the evaluator awarded on your paper.</li>
                        <li>If there's a discrepancy, apply for revaluation (₹750) within the stipulated window.</li>
                        <li>Use the <Link href="/backlog-fee-estimator" className="text-indigo-600 underline">Backlog Fee Estimator</Link> to estimate photocopy and revaluation costs.</li>
                    </ol>

                    <h2>Official vs Unofficial Result</h2>
                    <p>
                        The result displayed on this website and on results.vtu.ac.in is your official result for academic planning purposes. However, for formal purposes — degree declaration, job offer letters, background verification, bank loans, scholarships, and university admissions — you need:
                    </p>
                    <ul>
                        <li><strong>Official VTU provisional certificate:</strong> Issued after 8th semester results are declared.</li>
                        <li><strong>Consolidated marks card:</strong> Issued by VTU after all semesters are complete.</li>
                        <li><strong>Degree certificate:</strong> Issued at convocation (or via post-convocation application).</li>
                    </ul>
                    <p>
                        All of the above are obtained through your college's examination section, not through this website.
                    </p>

                    <div className="callout">
                        <strong>Need to interpret your result?</strong> <Link href="/vtu-results" className="text-indigo-700 font-semibold underline">Check your VTU result here</Link> for a clean, mobile-friendly view with automatic SGPA estimation. Or use the <Link href="/vtu-sgpa-cgpa-calculator" className="text-indigo-700 font-semibold underline">SGPA Calculator</Link> to compute your grade average manually.
                    </div>
                </article>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                        { title: 'VTU Grading System — Grades & Classes', href: '/articles/vtu-grading-system' },
                        { title: 'How VTU Results Are Published', href: '/articles/how-vtu-results-work' },
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
