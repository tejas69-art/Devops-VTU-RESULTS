import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
    title: 'How VTU Results Are Published — Behind-the-Scenes Process Explained',
    description: 'The complete behind-the-scenes process of VTU result publication — from valuation camps to the results portal. Includes typical timelines, what to do right after results, and why results appear in stages.',
};

export default function HowVtuResultsWork() {
    return (
        <div className="min-h-screen bg-slate-50/50 py-10">
            <div className="container mx-auto max-w-3xl px-4 sm:px-6">
                <Link href="/articles" className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-slate-800 mb-8 transition-colors">
                    <ArrowLeft className="h-4 w-4" /> All Articles
                </Link>

                <div className="mb-8">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full">Guide</span>
                        <span className="text-xs text-slate-400">July 2024 · 7 min read</span>
                    </div>
                    <h1 className="font-outfit text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
                        How VTU Results Are Published: A Complete Guide
                    </h1>
                    <p className="text-slate-600 text-base leading-relaxed">
                        VTU results don't appear instantly after exams — there's a multi-stage process that takes 30–45 days. Understanding it helps you know what to expect, when, and why results sometimes trickle out in stages.
                    </p>
                </div>

                <article className="bg-white border border-slate-200 rounded-2xl p-6 md:p-10 shadow-sm article-body">

                    <h2>The VTU Results Publication Pipeline</h2>
                    <p>
                        After your semester exams conclude, your answer scripts go through a structured evaluation and verification process before marks are published. Here's the complete sequence:
                    </p>

                    <h3>Stage 1: Answer Script Collection and Dispatch</h3>
                    <p>
                        Immediately after each exam paper, sealed answer booklets are collected from examination centres across Karnataka and dispatched to VTU-designated <strong>valuation camps</strong>. VTU operates a centralised valuation system — papers are evaluated by faculty members from different colleges than the one you attend, ensuring anonymity.
                    </p>

                    <h3>Stage 2: Valuation Camps</h3>
                    <p>
                        Valuation camps are typically held at engineering colleges designated by VTU. Faculty evaluators are assigned to subjects within their expertise. A Chief Examiner oversees each subject's evaluation to ensure consistency. Each evaluator is expected to evaluate a minimum number of papers per day.
                    </p>
                    <p>
                        For major subjects (Maths, core engineering subjects), two independent evaluators may assess each paper. If the two scores differ by more than a threshold (typically 15%), a third evaluation is triggered automatically.
                    </p>

                    <h3>Stage 3: Data Entry and Tabulation</h3>
                    <p>
                        After evaluation, marks are entered into VTU's examination management system. Each mark entry is verified by a data entry operator. The data is then checked for anomalies — suspiciously high or low scores trigger a review.
                    </p>

                    <h3>Stage 4: CIE + SEE Combination</h3>
                    <p>
                        VTU combines the SEE (external exam) marks with the CIE (internal marks) that were submitted by your college at the start of the semester. The final combined score is computed and letter grades are assigned based on the grade matrix.
                    </p>

                    <h3>Stage 5: Audit and Approval</h3>
                    <p>
                        The tabulated results go through an internal audit by VTU's examination department. This includes checks for:
                    </p>
                    <ul>
                        <li>Students who appear in SEE but were marked NSAR</li>
                        <li>Mismatched CIE vs SEE records</li>
                        <li>Suspected malpractice cases (these may be withheld — shown as "W")</li>
                        <li>Statistical anomalies (entire class failing one subject triggers a review)</li>
                    </ul>

                    <h3>Stage 6: Publication on results.vtu.ac.in</h3>
                    <p>
                        Once approved, results are published on the official VTU results portal in batches — typically by exam type and semester. This is why results appear "in stages": 6th and 8th semester results often come first (final year students have priority due to placement season and degree declaration deadlines), followed by 4th, 2nd, and then lateral entry semesters.
                    </p>

                    <h2>Typical VTU Results Timeline</h2>
                    <table>
                        <thead>
                            <tr><th>Exam Session</th><th>Exams Held</th><th>Results Expected</th></tr>
                        </thead>
                        <tbody>
                            <tr><td>Even Semester (June/July)</td><td>June – July</td><td>September – October</td></tr>
                            <tr><td>Odd Semester (Dec/Jan)</td><td>December – February</td><td>March – May</td></tr>
                            <tr><td>Supplementary Exams</td><td>With regular sessions</td><td>30–45 days after supplementary exam date</td></tr>
                            <tr><td>Revaluation Results</td><td>N/A (desk review)</td><td>45–60 days after application</td></tr>
                        </tbody>
                    </table>
                    <p>
                        These are approximate ranges based on historical patterns. Actual dates vary by year and can be affected by factors like faculty availability for valuation camps, unforeseen events, or administrative delays.
                    </p>

                    <h2>Why Are Some Results Delayed or Published in Stages?</h2>
                    <p>
                        VTU evaluates hundreds of thousands of answer scripts per examination session across dozens of subjects. Several factors can cause delays:
                    </p>
                    <ul>
                        <li><strong>Faculty availability:</strong> Evaluators are college faculty who have their own teaching schedules. Valuation camps are typically held during semester breaks.</li>
                        <li><strong>Volume of answer scripts:</strong> VTU has ~200,000+ students across all affiliated colleges. Large subjects like Mathematics have a correspondingly large volume to evaluate.</li>
                        <li><strong>Third evaluations:</strong> Papers requiring a third evaluation add 1–2 weeks.</li>
                        <li><strong>Malpractice reviews:</strong> Cases flagged for suspected malpractice undergo a separate committee review.</li>
                        <li><strong>Technical issues:</strong> The VTU results server (results.vtu.ac.in) often experiences high load when results are first published, causing slowdowns or timeouts.</li>
                    </ul>

                    <h2>What to Do Right After Results Are Published</h2>
                    <ol>
                        <li><strong>Check results immediately</strong> using the <Link href="/vtu-results" className="text-indigo-600 underline">VTU Results Checker</Link> — VTU's server is often slow on day 1 of publication due to heavy traffic. Our service caches and displays results more reliably.</li>
                        <li><strong>Verify marks carefully</strong> — Compare CIE marks with what you received in class. Errors in CIE data entry do occasionally occur.</li>
                        <li><strong>Calculate your SGPA</strong> — Use the <Link href="/vtu-sgpa-cgpa-calculator" className="text-indigo-600 underline">SGPA & CGPA Calculator</Link> to instantly estimate your semester performance.</li>
                        <li><strong>Decide on revaluation</strong> — If any subject mark seems too low given your SEE performance, consider applying for a photocopy of your answer script first (₹300) before committing to a full revaluation (₹750).</li>
                        <li><strong>Plan for backlogs</strong> — If you've failed a subject, identify the next supplementary exam session and start preparation early.</li>
                    </ol>

                    <h2>Result Discrepancy: What to Do</h2>
                    <p>
                        If you believe there's an error in your marks (e.g., CIE marks don't match what your college uploaded, or your result shows "NSAR" but you had sufficient attendance):
                    </p>
                    <ul>
                        <li>Contact your college's examination section immediately — they have access to the VTU portal and can raise queries on your behalf.</li>
                        <li>Apply for a photocopy of your answer script to verify SEE marks.</li>
                        <li>For CIE mark errors, your department HOD must raise a correction request with VTU's exam department with supporting documentation.</li>
                    </ul>

                    <h2>Checking Results on This Site vs the Official Portal</h2>
                    <p>
                        The official VTU portal (results.vtu.ac.in) is the authoritative source for your marks. This site fetches the same data from the same server in real time — the data shown here is identical to what the official site would show. However, this site:
                    </p>
                    <ul>
                        <li>Displays marks in a cleaner, mobile-optimised layout</li>
                        <li>Handles server congestion better during peak traffic periods</li>
                        <li>Automatically estimates your SGPA based on the returned marks</li>
                        <li>Does not store your USN or result data</li>
                    </ul>
                    <p>
                        For official documents, hall tickets, degree certificates, and any formal academic verification, always use the official VTU portal or your college's examination section.
                    </p>

                    <div className="callout">
                        <strong>Results out?</strong> <Link href="/vtu-results" className="text-indigo-700 font-semibold underline">Check your VTU results now</Link> — enter your USN, solve the CAPTCHA, and get your marks with instant SGPA estimation.
                    </div>
                </article>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                        { title: 'How to Read Your VTU Marksheet', href: '/articles/reading-vtu-marksheet' },
                        { title: 'VTU Supplementary Exams Guide', href: '/articles/vtu-supplementary-exams' },
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
