import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
    title: 'VTU Backlogs Explained: How to Clear Them Fast and Protect Your Career',
    description: 'What a VTU backlog is, how it affects your SGPA and career prospects, how top companies treat active backlogs, and concrete strategies to clear arrears in supplementary exams.',
};

export default function VtuBacklogsGuide() {
    return (
        <div className="min-h-screen bg-slate-50/50 py-10">
            <div className="container mx-auto max-w-3xl px-4 sm:px-6">
                <Link href="/articles" className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-slate-800 mb-8 transition-colors">
                    <ArrowLeft className="h-4 w-4" /> All Articles
                </Link>

                <div className="mb-8">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-red-700 bg-red-50 border border-red-100 px-2 py-0.5 rounded-full">Guide</span>
                        <span className="text-xs text-slate-400">July 2024 · 11 min read</span>
                    </div>
                    <h1 className="font-outfit text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
                        VTU Backlogs: How to Clear Them Fast and Protect Your Career
                    </h1>
                    <p className="text-slate-600 text-base leading-relaxed">
                        A backlog doesn't have to define your engineering journey. Here's everything you need to know — from understanding the impact on your SGPA to clearing them systematically and navigating the job market with active or cleared arrears.
                    </p>
                </div>

                <article className="bg-white border border-slate-200 rounded-2xl p-6 md:p-10 shadow-sm article-body">

                    <h2>What Is a VTU Backlog?</h2>
                    <p>
                        A backlog (also called an "arrear" or "back subject") is a subject in which a student has received an <strong>F grade</strong> — meaning they scored below 40% in the combined CIE + SEE total, or failed to score at least 40% in the SEE component independently (minimum 24 out of 60).
                    </p>
                    <p>
                        Backlogs are also created by:
                    </p>
                    <ul>
                        <li><strong>NSAR status:</strong> Not being eligible to appear for the exam due to attendance shortage.</li>
                        <li><strong>Absence (AB):</strong> Being absent for the SEE paper.</li>
                        <li><strong>Malpractice:</strong> Being caught cheating results in cancellation of the paper — treated as a backlog.</li>
                    </ul>
                    <p>
                        A backlog remains on your academic record until you clear it by passing the subject in a subsequent supplementary exam session. The word "cleared backlog" or "no active backlogs" refers to a student who has passed all subjects at some point — even if it took multiple attempts.
                    </p>

                    <h2>How a Backlog Affects Your SGPA and CGPA</h2>
                    <p>
                        When you fail a subject (F grade = 0 grade points), its effect on SGPA is severe:
                    </p>
                    <ul>
                        <li>The subject's credits are still counted in the denominator of the SGPA formula.</li>
                        <li>But its contribution to the numerator is 0 (0 grade points × credits = 0).</li>
                        <li>This pulls your SGPA down proportionally to the credits of the failed subject.</li>
                    </ul>
                    <p>
                        <strong>Example:</strong> A student has 5 subjects totalling 18 credits, and fails one 4-credit subject. Without the failed subject, their SGPA would be 8.5. With the F grade:
                    </p>
                    <ul>
                        <li>Numerator reduces by (8 × 4) = 32 (what the B grade would have contributed)</li>
                        <li>Denominator remains 18 credits</li>
                        <li>SGPA drops from approximately 8.5 to (8.5 × 18 - 32) / 18 ≈ <strong>6.72</strong></li>
                    </ul>
                    <p>
                        A single 4-credit backlog can drop SGPA from 8.5 to under 7.0. This cascades into CGPA, potentially affecting your degree class.
                    </p>

                    <h2>Active vs Cleared Backlogs: What's the Difference?</h2>
                    <table>
                        <thead>
                            <tr><th>Status</th><th>Meaning</th><th>Appears on Final Marksheet?</th></tr>
                        </thead>
                        <tbody>
                            <tr><td>Active backlog</td><td>Subject failed, not yet cleared</td><td>Yes — F grade visible</td></tr>
                            <tr><td>Cleared backlog</td><td>Subject passed in supplementary exam</td><td>Yes — pass grade visible, attempt number noted</td></tr>
                            <tr><td>No backlogs</td><td>All subjects passed in first attempt</td><td>All grades from semester exams</td></tr>
                        </tbody>
                    </table>
                    <p>
                        Importantly, VTU marksheets show every attempt — if you cleared a subject in the 3rd supplementary attempt, that's reflected. The improved grade is used for CGPA calculation after clearing, but the history is visible.
                    </p>

                    <h2>How Companies Treat VTU Backlogs in Placement</h2>
                    <p>
                        Backlog policy varies significantly by company. Understanding the landscape helps you plan your job search realistically:
                    </p>
                    <h3>Zero Tolerance Companies (No Active Backlogs)</h3>
                    <p>
                        Many top-tier companies will not accept candidates with any active (uncleaned) backlogs at the time of application:
                    </p>
                    <ul>
                        <li><strong>TCS (Digital and Prime streams):</strong> Zero active backlogs required. Cleared backlogs may be tolerated for standard roles.</li>
                        <li><strong>Infosys (Systems Engineer):</strong> No active backlogs at time of joining.</li>
                        <li><strong>Cognizant:</strong> No active backlogs typically required.</li>
                        <li><strong>Product companies (Google, Microsoft, Flipkart):</strong> Generally focus on competitive programming performance, but no active backlogs is a requirement.</li>
                    </ul>
                    <h3>Companies That Accept Cleared Backlogs</h3>
                    <p>
                        Many service sector companies and some mid-tier product companies will accept candidates with cleared backlogs (all subjects passed, even if it took multiple attempts):
                    </p>
                    <ul>
                        <li>Wipro, HCL, Capgemini, Mphasis, and similar companies typically focus on CGPA thresholds (6.0 or 6.5) rather than backlog history, as long as all are cleared by joining.</li>
                        <li>Startup companies often evaluate primarily on technical skills and projects rather than academic history.</li>
                    </ul>
                    <h3>Government Jobs</h3>
                    <p>
                        Government recruitment (PSUs, GATE-based, UPSC Engineering Services) typically requires "regular graduation" — this usually means no backlogs at the time of applying, though specific requirements vary by the exam notification.
                    </p>

                    <h2>How to Clear VTU Backlogs: A Step-by-Step Strategy</h2>
                    <h3>Step 1: Register for supplementary exams early</h3>
                    <p>
                        Supplementary exams run alongside regular semester exams. Monitor VTU's official notifications for supplementary exam schedules, typically announced 30–45 days in advance. Register through your college within the deadline. See our <Link href="/articles/vtu-supplementary-exams" className="text-indigo-600 underline">complete supplementary exam guide</Link>.
                    </p>
                    <h3>Step 2: Use your CIE marks advantage</h3>
                    <p>
                        In supplementary exams, your CIE (internal marks) from the original semester carry forward. You only need to re-write the SEE paper. If you scored 30/40 in CIE, you only need 10/60 in SEE to pass (combined total of 40). This significantly lowers the effort required.
                    </p>
                    <h3>Step 3: Target specific weak areas</h3>
                    <p>
                        Get a photocopy of your original answer script (₹300) to see exactly which questions you answered poorly and where marks were lost. This is the most efficient way to identify what to study.
                    </p>
                    <h3>Step 4: Focus on PYQP for the specific subject</h3>
                    <p>
                        VTU supplementary papers often draw from the same bank as regular papers. Previous year supplementary question papers (separate from regular exams) are worth collecting and practicing.
                    </p>
                    <h3>Step 5: Clear backlog before internship season</h3>
                    <p>
                        Most campus internship drives happen in 4th or 5th semester. Clearing all backlogs before this period dramatically expands your options. Track exam windows and prioritise accordingly.
                    </p>

                    <h2>Mental Health and Backlogs</h2>
                    <p>
                        It's important to address this directly: having a backlog does not define you or your future. Many successful engineers and entrepreneurs have cleared backlogs during their VTU journey. What matters is how you respond:
                    </p>
                    <ul>
                        <li>Treat the backlog as a specific, fixable problem — not a reflection of your ability.</li>
                        <li>Make a concrete plan: identify the exam window, register, and start structured preparation early.</li>
                        <li>Seek support from batchmates, seniors, or faculty if you're struggling with the subject matter.</li>
                        <li>Keep perspective: clearing a backlog in the very next attempt demonstrates resilience — which is a legitimate career narrative.</li>
                    </ul>

                    <div className="callout">
                        <strong>Estimate your supplementary exam fees:</strong> Use the <Link href="/backlog-fee-estimator" className="text-indigo-700 font-semibold underline">Backlog Fee Estimator</Link> to get an approximate cost for supplementary exams, revaluation, or photocopy applications.
                    </div>
                </article>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                        { title: 'VTU Supplementary Exams — Full Guide', href: '/articles/vtu-supplementary-exams' },
                        { title: 'Career After VTU Engineering', href: '/articles/career-after-vtu' },
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
