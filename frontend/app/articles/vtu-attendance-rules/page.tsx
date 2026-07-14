import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
    title: 'VTU Attendance Rules: The 85% Mandate, Condonation & NSAR Explained',
    description: 'Complete guide to VTU\'s 85% attendance requirement — how to calculate it, what NSAR means, how condonation works, medical leave policy, and strategies to maintain safe attendance.',
};

export default function VtuAttendanceRules() {
    return (
        <div className="min-h-screen bg-slate-50/50 py-10">
            <div className="container mx-auto max-w-3xl px-4 sm:px-6">

                <Link href="/articles" className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-slate-800 mb-8 transition-colors">
                    <ArrowLeft className="h-4 w-4" /> All Articles
                </Link>

                <div className="mb-8">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 border border-teal-100 px-2 py-0.5 rounded-full">Policy</span>
                        <span className="text-xs text-slate-400">June 2024 · 9 min read</span>
                    </div>
                    <h1 className="font-outfit text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
                        VTU Attendance Rules: The 85% Mandate and Condonation Explained
                    </h1>
                    <p className="text-slate-600 text-base leading-relaxed">
                        VTU's attendance policy has real consequences — low attendance can bar you from sitting your semester exams entirely. Here's everything you need to know to stay safe.
                    </p>
                </div>

                <article className="bg-white border border-slate-200 rounded-2xl p-6 md:p-10 shadow-sm article-body">

                    <h2>The 85% Attendance Rule</h2>
                    <p>
                        Under VTU regulations, every student must maintain a minimum of <strong>85% attendance</strong> in each theory and laboratory subject independently. This is not an aggregate across all subjects — a student who has 100% in five subjects but 70% in one will still be barred from the exam for that one subject.
                    </p>
                    <p>
                        Attendance is recorded per lecture, tutorial, and lab session by the faculty of each subject. At the end of the semester (typically 4–6 weeks before exams), colleges compile attendance reports and submit them to VTU. Students who fall below 85% in any subject are classified as <strong>NSAR (Not Eligible for Semester Examination due to Attendance Shortage)</strong> for that subject.
                    </p>

                    <h2>What Happens if You Get NSAR?</h2>
                    <p>
                        An NSAR declaration means:
                    </p>
                    <ul>
                        <li>You are <strong>barred from appearing in the SEE (Semester End Examination)</strong> for that subject.</li>
                        <li>Even if you write the exam, your answer paper will not be evaluated — and you will be marked absent (AB) in results.</li>
                        <li>You must clear this subject in a subsequent supplementary exam once you have sufficient attendance in a later semester.</li>
                        <li>In some cases, NSAR students are not allowed to sit any exams that semester, depending on college policy.</li>
                    </ul>
                    <p>
                        The NSAR status appears on your official marksheet results page. This is visible to anyone viewing your result and can raise flags during campus placements. See our guide on <Link href="/articles/vtu-backlogs-guide" className="text-indigo-600 underline">VTU backlogs</Link> for details on clearing these subjects.
                    </p>

                    <h2>Condonation: The 75% Exception</h2>
                    <p>
                        VTU regulations provide a relief mechanism called <strong>condonation of attendance shortage</strong>. If a student's attendance is between 75% and 84% (i.e., shortage is less than 10%), they may apply for condonation to be allowed to appear for the exam.
                    </p>
                    <p>
                        Condonation is <strong>not automatic</strong> — it must be applied for with valid documentation and is granted at the discretion of the university. The qualifying reasons for condonation are:
                    </p>
                    <ul>
                        <li><strong>Medical grounds:</strong> Hospitalisation, serious illness, or surgery. Requires a Medical Certificate from a registered medical practitioner, countersigned by the HOD and Principal.</li>
                        <li><strong>University representation:</strong> Participation in university-level sports, cultural events (Utsav, Kalasangama), NCC/NSS national-level camps, or official academic events like seminars and conferences with prior approval.</li>
                        <li><strong>Government duty:</strong> Students called for duty by a state or central government body (e.g., election duty as polling officers).</li>
                    </ul>
                    <p>
                        Students below 75% attendance cannot apply for condonation under any circumstances and are NSAR by default.
                    </p>

                    <h2>The Condonation Application Process</h2>
                    <ol>
                        <li>Obtain the condonation application form from your college's academic/examination section.</li>
                        <li>Attach all supporting documents (medical certificates, event participation certificates, etc.).</li>
                        <li>Get the application countersigned by the subject faculty member, department HOD, and college Principal.</li>
                        <li>Submit the application to the VTU Regional Office or through your college's designated VTU liaison before the official deadline (typically 2–3 weeks before exams).</li>
                        <li>Pay the condonation fee as specified (typically ₹300–500 per application, not per subject).</li>
                        <li>The university reviews and communicates approval or rejection. Approved students receive a condonation certificate.</li>
                    </ol>

                    <h2>How to Calculate Your Attendance Percentage</h2>
                    <p>
                        Attendance percentage for each subject is calculated as:
                    </p>
                    <div className="formula-box">Attendance % = (Classes Attended / Total Classes Conducted) × 100</div>
                    <p>
                        This calculation is done independently for each subject. A student may have 90% attendance in one subject and 78% in another — both are tracked separately.
                    </p>
                    <p>
                        Our <Link href="/attendance-calculator" className="text-indigo-600 underline">Attendance Calculator</Link> handles two scenarios automatically:
                    </p>
                    <ul>
                        <li><strong>Safe zone:</strong> If you're above your target, it tells you how many classes you can miss consecutively while staying above the threshold.</li>
                        <li><strong>Shortage zone:</strong> If you're below your target, it tells you how many consecutive classes you must attend to recover.</li>
                    </ul>

                    <h2>Sample Calculation: Are You Safe?</h2>
                    <p>
                        Suppose a subject has had 80 classes conducted so far, and you have attended 65 of them:
                    </p>
                    <ul>
                        <li>Attendance = (65 / 80) × 100 = <strong>81.25%</strong></li>
                        <li>This is below 85% — you have a shortage.</li>
                        <li>To reach 85%, you need: (0.85 × 80 + X) / (80 + X) ≥ 0.85 → solving: X ≥ 5.67, so you need to attend at least <strong>6 more consecutive classes</strong>.</li>
                    </ul>
                    <p>
                        The Attendance Calculator does this math instantly for any number of classes and any target percentage.
                    </p>

                    <h2>Duty Leave and How It Works</h2>
                    <p>
                        Officially approved duty leave (also called "on duty" or OD) is counted as attendance by most VTU-affiliated colleges, provided:
                    </p>
                    <ul>
                        <li>The activity is pre-approved by the HOD (on-duty forms submitted before the event).</li>
                        <li>The student submits a participation certificate or proof of attendance after the event.</li>
                        <li>The activity is academically or institutionally relevant (competitions, tech fests, sports, etc.).</li>
                    </ul>
                    <p>
                        OD leave counts toward the denominator (total classes) only if the classes missed are specifically approved. The application process varies by college — confirm with your HOD in advance.
                    </p>

                    <h2>Practical Strategies to Maintain 85%</h2>
                    <h3>Strategy 1: Track your attendance weekly</h3>
                    <p>
                        Don't wait for the mid-semester attendance report to check your standing. Use the attendance calculator at the start of each week to know exactly where you stand in every subject.
                    </p>
                    <h3>Strategy 2: Prioritise "high-density" days</h3>
                    <p>
                        If a single day has 4 classes of a subject you're short on, missing that day is four times more harmful than missing a day with one class. Plan strategically.
                    </p>
                    <h3>Strategy 3: Never miss the first two weeks</h3>
                    <p>
                        Attendance counts from day 1 of the semester. Missing the first two weeks puts you in a hole that requires many subsequent weeks of perfect attendance to climb out of.
                    </p>
                    <h3>Strategy 4: Get medical documentation on the same day if ill</h3>
                    <p>
                        If you're unwell and must miss classes, get a medical certificate from a registered practitioner that same day (or as close as possible). Back-dated certificates may not be accepted for condonation.
                    </p>

                    <h2>Frequently Asked Questions About VTU Attendance</h2>
                    <h3>Does lab attendance count separately from theory attendance?</h3>
                    <p>
                        Yes. Lab sessions (practicals) are tracked separately from theory lectures. You need 85% in both the theory component and the lab component of any theory + lab subject.
                    </p>
                    <h3>Can internals compensate for low attendance?</h3>
                    <p>
                        No. Internal marks (CIE) and attendance are completely independent. High CIE marks cannot make up for an NSAR declaration.
                    </p>
                    <h3>Is there an attendance cutoff for applying for condonation?</h3>
                    <p>
                        Yes — your attendance must be at least 75% to even apply for condonation. Below 75% is absolute NSAR with no appeal.
                    </p>

                    <div className="callout">
                        <strong>Track your attendance now:</strong> Use the <Link href="/attendance-calculator" className="text-indigo-700 font-semibold underline">Attendance Calculator</Link> to know exactly how many classes you can skip — or how many you must attend to stay safe.
                    </div>
                </article>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                        { title: 'VTU Backlogs — How to Clear Them', href: '/articles/vtu-backlogs-guide' },
                        { title: 'Supplementary Exams Complete Guide', href: '/articles/vtu-supplementary-exams' },
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
