import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { AlertTriangle, ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Disclaimer — VTU Results',
    description: 'VTU Results is an independent student platform. This disclaimer explains our relationship with Visvesvaraya Technological University, data accuracy, and limitations of the service.',
};

export default function DisclaimerPage() {
    return (
        <div className="min-h-screen bg-slate-50/50 py-12">
            <div className="container mx-auto max-w-3xl px-4 sm:px-6">

                <div className="mb-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 border border-amber-200 rounded-full text-amber-800 text-xs font-bold uppercase tracking-wider mb-4">
                        <AlertTriangle className="w-3.5 h-3.5" /> Legal · Disclaimer
                    </div>
                    <h1 className="font-outfit text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
                        Disclaimer
                    </h1>
                    <p className="text-slate-500 text-sm">Last updated: July 2025</p>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-10 shadow-sm space-y-8 text-slate-700 leading-relaxed text-[15px]">

                    <section>
                        <h2 className="font-outfit text-lg font-bold text-slate-900 mb-3">No Affiliation with VTU</h2>
                        <p>
                            VTU Results (<strong>results-scrapper.vercel.app</strong>) is an independent, student-built web platform. It is <strong>not affiliated with, sponsored by, endorsed by, or in any way officially connected to Visvesvaraya Technological University (VTU)</strong>, its constituent colleges, or any government body.
                        </p>
                        <p className="mt-3">
                            "VTU", "Visvesvaraya Technological University", and related terms are the property of Visvesvaraya Technological University, Belagavi, Karnataka, India. We use these terms solely to describe the subject matter of this platform and to assist students in navigating university-related information.
                        </p>
                    </section>

                    <div className="border-t border-slate-100" />

                    <section>
                        <h2 className="font-outfit text-lg font-bold text-slate-900 mb-3">Data Accuracy and Reliability</h2>
                        <p>
                            The result data displayed on this platform is fetched in real time from the official VTU results server (<a href="https://results.vtu.ac.in" target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline">results.vtu.ac.in</a>). We present this data as-is and do not modify, alter, or store it. However, we <strong>cannot guarantee the accuracy, completeness, or timeliness</strong> of the data shown, including:
                        </p>
                        <ul className="list-disc pl-5 space-y-1 mt-3 text-sm">
                            <li>Mark totals and individual subject scores</li>
                            <li>Pass/fail status determinations</li>
                            <li>SGPA estimates (which depend on credits manually entered by the user)</li>
                            <li>Revaluation and backlog results</li>
                        </ul>
                        <p className="mt-3">
                            <strong>Always verify your results on the official VTU website</strong> before making any academic decisions, applications, or submissions. The official portal is the only authoritative source for your examination records.
                        </p>
                    </section>

                    <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3 text-sm text-amber-900">
                        <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5 text-amber-600" />
                        <div>
                            <strong>Critical:</strong> Do not use results from this platform as official documents for admission, employment verification, scholarship applications, or any formal academic record. Only results printed from the official VTU portal carry legal validity.
                        </div>
                    </div>

                    <div className="border-t border-slate-100" />

                    <section>
                        <h2 className="font-outfit text-lg font-bold text-slate-900 mb-3">Calculator Estimates</h2>
                        <p>
                            The SGPA/CGPA calculators, attendance calculator, CGPA to percentage converter, and backlog fee estimator are educational tools designed to assist students in planning. Their outputs are estimates and are subject to the following limitations:
                        </p>
                        <ul className="list-disc pl-5 space-y-1 mt-3 text-sm">
                            <li><strong>SGPA/CGPA Calculator:</strong> Accuracy depends on correct credit values entered by the user. VTU credit structures may vary by branch, scheme, and year of admission.</li>
                            <li><strong>Attendance Calculator:</strong> Based on the formula provided by VTU regulations. Actual attendance records maintained by colleges may differ.</li>
                            <li><strong>CGPA to Percentage:</strong> Uses the VTU-mandated formula (CGPA × 10). Different companies or institutions may use different conversion standards.</li>
                            <li><strong>Backlog Fee Estimator:</strong> Fee values are approximate and based on publicly available VTU circulars. Actual fees may have been revised by VTU. Always confirm with your college exam cell.</li>
                        </ul>
                    </section>

                    <div className="border-t border-slate-100" />

                    <section>
                        <h2 className="font-outfit text-lg font-bold text-slate-900 mb-3">Article and Guide Content</h2>
                        <p>
                            Articles and guides published on this platform are written based on publicly available VTU regulations, student handbooks, and general academic knowledge. They are provided for informational and educational purposes only. VTU may update its regulations, fee structures, and examination policies at any time. Always refer to the official VTU website and your college's examination department for the most current information.
                        </p>
                    </section>

                    <div className="border-t border-slate-100" />

                    <section>
                        <h2 className="font-outfit text-lg font-bold text-slate-900 mb-3">No Liability</h2>
                        <p>
                            The operators of VTU Results accept no liability for any direct, indirect, incidental, or consequential damages arising from the use of this platform, reliance on any information displayed, or inability to access the service. Use of this platform is entirely at your own risk.
                        </p>
                    </section>

                    <div className="border-t border-slate-100" />

                    <section>
                        <h2 className="font-outfit text-lg font-bold text-slate-900 mb-3">Official Resources</h2>
                        <p>For authoritative information, always use the official VTU resources:</p>
                        <ul className="mt-3 space-y-2 text-sm">
                            {[
                                { label: 'Official VTU Website', href: 'https://vtu.ac.in' },
                                { label: 'VTU Results Portal', href: 'https://results.vtu.ac.in' },
                                { label: 'VTU Student Portal', href: 'https://vtuevaluate.vtu.ac.in' },
                                { label: 'VTU Examination Department', href: 'https://vtu.ac.in/en/examination/' },
                            ].map(link => (
                                <li key={link.href}>
                                    <a href={link.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-indigo-600 hover:underline">
                                        {link.label} <ExternalLink className="w-3.5 h-3.5" />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <div className="border-t border-slate-100" />

                    <section>
                        <h2 className="font-outfit text-lg font-bold text-slate-900 mb-3">Contact</h2>
                        <p>
                            If you have questions about this disclaimer or wish to report inaccurate information, please use our{' '}
                            <Link href="/contact" className="text-indigo-600 hover:underline">contact page</Link>.
                            Also see our <Link href="/privacy-policy" className="text-indigo-600 hover:underline">Privacy Policy</Link> and{' '}
                            <Link href="/terms-of-service" className="text-indigo-600 hover:underline">Terms of Service</Link>.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
