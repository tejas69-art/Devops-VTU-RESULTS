import React from 'react';
import { ShieldCheck } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Privacy Policy — VTU Results',
    description: 'Privacy Policy for VTU Results. Learn how we handle your USN, result data, and analytics — and our commitment to not storing your personal information.',
};

const lastUpdated = 'July 2025';

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-slate-50/50 py-12">
            <div className="container mx-auto max-w-3xl px-4 sm:px-6">

                <div className="mb-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full text-emerald-800 text-xs font-bold uppercase tracking-wider mb-4">
                        <ShieldCheck className="w-3.5 h-3.5" /> Legal
                    </div>
                    <h1 className="font-outfit text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">Privacy Policy</h1>
                    <p className="text-slate-500 text-sm">Last updated: {lastUpdated}</p>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl shadow-sm divide-y divide-slate-100 overflow-hidden">

                    <div className="p-6 md:p-8 bg-emerald-50 border-b border-emerald-100">
                        <h2 className="font-semibold text-emerald-900 mb-2">Summary (Plain Language)</h2>
                        <ul className="space-y-1.5 text-sm text-emerald-800">
                            <li>✓ We do <strong>not</strong> store your USN or exam results.</li>
                            <li>✓ Calculator inputs <strong>never leave your browser</strong>.</li>
                            <li>✓ No account required — no personal profile created.</li>
                            <li>✓ We use page-level analytics (no personal identification).</li>
                            <li>✓ Google AdSense may place cookies for ad personalisation.</li>
                        </ul>
                    </div>

                    {[
                        {
                            n: '1',
                            title: 'Introduction',
                            body: (
                                <p>Welcome to VTU Results ("we," "our," or "us"). This Privacy Policy explains how we collect, use, and handle information when you use our website. By using VTU Results, you agree to the practices described in this policy.</p>
                            ),
                        },
                        {
                            n: '2',
                            title: 'Information We Collect',
                            body: (
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="font-semibold text-slate-800 mb-1">2.1 Information You Provide</h3>
                                        <p>When using the results checker, you provide your University Seat Number (USN). This is sent to the VTU results server on your behalf and is <strong>not stored</strong> in any database on our side.</p>
                                        <p className="mt-2">If you contact us via the contact form, your name, email, and message are sent to us via email only and are not stored in a database.</p>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-800 mb-1">2.2 Automatically Collected Data</h3>
                                        <p>We use Vercel Analytics, which collects anonymised, aggregated page view statistics. This does not include personally identifiable information. No IP addresses are logged or stored by us.</p>
                                    </div>
                                </div>
                            ),
                        },
                        {
                            n: '3',
                            title: 'How We Use Your Information',
                            body: (
                                <ul className="space-y-1.5 text-sm list-disc pl-5">
                                    <li>To fetch and display your VTU examination results (USN is sent to VTU's server only)</li>
                                    <li>To respond to contact enquiries</li>
                                    <li>To understand aggregate site usage and improve the platform</li>
                                </ul>
                            ),
                        },
                        {
                            n: '4',
                            title: 'Cookies and Tracking',
                            body: (
                                <div className="space-y-3">
                                    <p>We use the following types of cookies:</p>
                                    <ul className="space-y-1.5 text-sm list-disc pl-5">
                                        <li><strong>Essential cookies:</strong> Required for the site to function (e.g., CAPTCHA session for VTU results).</li>
                                        <li><strong>Analytics cookies:</strong> Anonymised page-view data via Vercel Analytics. These do not identify individual users.</li>
                                        <li><strong>Advertising cookies:</strong> Google AdSense may place cookies to serve personalised advertisements based on your browsing history. You can opt out at <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline">Google Ad Settings</a>.</li>
                                    </ul>
                                    <p>A cookie consent banner is displayed on your first visit. Declining non-essential cookies will prevent advertising and analytics cookies from being set.</p>
                                </div>
                            ),
                        },
                        {
                            n: '5',
                            title: 'Google AdSense',
                            body: (
                                <p>We use Google AdSense to display advertisements. Google uses cookies to serve ads based on your visit to this and other websites. Google's use of advertising cookies enables it and its partners to serve ads based on site visits. You may opt out of personalised advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline">Google Ads Settings</a> or <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline">www.aboutads.info</a>.</p>
                            ),
                        },
                        {
                            n: '6',
                            title: 'Data Retention',
                            body: (
                                <p>We do not retain USN or result data. Contact form enquiries sent by email are handled according to normal email retention practices. Anonymised analytics data may be retained for up to 12 months for trend analysis.</p>
                            ),
                        },
                        {
                            n: '7',
                            title: 'Third-Party Links',
                            body: (
                                <p>Our website links to external sites including the official VTU portal, VTU examination pages, and job/resource sites. We are not responsible for the privacy practices of those sites. Please review their respective privacy policies.</p>
                            ),
                        },
                        {
                            n: '8',
                            title: 'Children\'s Privacy',
                            body: (
                                <p>Our service is intended for college students (typically 18+). We do not knowingly collect personal information from anyone under 13. If you believe a minor has submitted personal data through this site, please contact us and we will promptly delete it.</p>
                            ),
                        },
                        {
                            n: '9',
                            title: 'Your Rights',
                            body: (
                                <div className="space-y-2">
                                    <p>Since we don't store personal data beyond contact form emails, most data rights requests are not applicable. If you have contacted us and wish to have your email deleted, please send a follow-up request. We will comply within 30 days.</p>
                                    <p>EU/EEA residents may have additional rights under GDPR. Contact us to exercise any applicable rights.</p>
                                </div>
                            ),
                        },
                        {
                            n: '10',
                            title: 'Changes to This Policy',
                            body: (
                                <p>We may update this Privacy Policy from time to time. Material changes will be reflected by updating the "Last updated" date at the top. Continued use of the site after changes constitutes acceptance of the revised policy.</p>
                            ),
                        },
                        {
                            n: '11',
                            title: 'Contact',
                            body: (
                                <p>For privacy-related questions, use our <Link href="/contact" className="text-indigo-600 underline">contact page</Link>. Also see our <Link href="/disclaimer" className="text-indigo-600 underline">Disclaimer</Link> and <Link href="/terms-of-service" className="text-indigo-600 underline">Terms of Service</Link>.</p>
                            ),
                        },
                    ].map(section => (
                        <div key={section.n} className="p-6 md:p-8 space-y-3">
                            <h2 className="font-outfit text-base font-bold text-slate-900">{section.n}. {section.title}</h2>
                            <div className="text-sm text-slate-700 leading-relaxed">{section.body}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
