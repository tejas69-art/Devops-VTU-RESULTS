import React from 'react';
import { FileText } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Terms of Service — VTU Results',
    description: 'Terms of Service for VTU Results. Read the terms and conditions that govern use of our results checker, calculators, and academic guides.',
};

const lastUpdated = 'July 2025';

export default function TermsOfServicePage() {
    return (
        <div className="min-h-screen bg-slate-50/50 py-12">
            <div className="container mx-auto max-w-3xl px-4 sm:px-6">

                <div className="mb-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 border border-slate-200 rounded-full text-slate-700 text-xs font-bold uppercase tracking-wider mb-4">
                        <FileText className="w-3.5 h-3.5" /> Legal
                    </div>
                    <h1 className="font-outfit text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">Terms of Service</h1>
                    <p className="text-slate-500 text-sm">Last updated: {lastUpdated}</p>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl shadow-sm divide-y divide-slate-100 overflow-hidden">

                    {[
                        {
                            n: '1',
                            title: 'Acceptance of Terms',
                            body: 'By accessing or using VTU Results (the "Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.',
                        },
                        {
                            n: '2',
                            title: 'Description of Service',
                            body: 'VTU Results provides students with: (a) fast access to VTU examination results fetched in real time from the official VTU results server; (b) academic calculators for SGPA, CGPA, attendance, and fee estimation; (c) informational articles and guides about VTU academic policies. The Service is provided free of charge and is supported by advertising.',
                        },
                        {
                            n: '3',
                            title: 'Independent Service',
                            body: 'VTU Results is an independent platform and is not affiliated with, endorsed by, or officially connected to Visvesvaraya Technological University (VTU), its constituent colleges, or any government body. VTU examination data remains the property of VTU. We provide a convenient interface to access publicly available data.',
                        },
                        {
                            n: '4',
                            title: 'User Responsibilities',
                            body: null,
                            list: [
                                'Provide accurate information (valid USN) when using the results checker.',
                                'Use the Service only for lawful, personal, non-commercial purposes.',
                                'Not attempt to scrape, copy, or systematically extract data from this platform.',
                                'Not interfere with or disrupt the Service or its underlying infrastructure.',
                                'Not use automated systems to access the Service in ways that impose unreasonable load.',
                            ],
                        },
                        {
                            n: '5',
                            title: 'Disclaimer of Warranties',
                            body: 'The Service is provided "AS IS" and "AS AVAILABLE" without warranties of any kind, express or implied. We do not guarantee: (a) the accuracy, completeness, or timeliness of result data fetched from VTU servers; (b) uninterrupted availability of the Service; (c) that SGPA/CGPA calculations are 100% precise (accuracy depends on credits entered by the user); (d) that fee estimates are current or exact. Always verify results and fees with official VTU sources.',
                        },
                        {
                            n: '6',
                            title: 'Limitation of Liability',
                            body: 'To the fullest extent permitted by applicable law, VTU Results and its operators shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising from: use of or inability to use the Service; reliance on any information displayed; decisions made based on result data or calculator outputs; or unauthorised access to your data. Users are solely responsible for verifying information with official sources before making academic, employment, or financial decisions.',
                        },
                        {
                            n: '7',
                            title: 'Advertising',
                            body: 'The Service is supported by Google AdSense advertisements. By using the Service, you acknowledge that advertisements may appear on pages and that Google may use cookies for ad personalisation. You may opt out of personalised ads through Google Ad Settings.',
                        },
                        {
                            n: '8',
                            title: 'Intellectual Property',
                            body: 'The design, layout, article content, and code of this platform are owned by VTU Results. VTU examination result data and related academic information are the property of Visvesvaraya Technological University. You may not reproduce, distribute, or commercially exploit any part of this platform without explicit written permission.',
                        },
                        {
                            n: '9',
                            title: 'Privacy',
                            body: null,
                            link: { text: 'Privacy Policy', href: '/privacy-policy' },
                        },
                        {
                            n: '10',
                            title: 'Modifications',
                            body: 'We reserve the right to modify or discontinue the Service at any time without notice. These Terms of Service may be updated periodically. Continued use of the Service after changes constitutes acceptance of the revised terms.',
                        },
                        {
                            n: '11',
                            title: 'Governing Law',
                            body: 'These Terms shall be governed by and construed in accordance with the laws of India, without regard to conflict of law principles.',
                        },
                        {
                            n: '12',
                            title: 'Contact',
                            body: null,
                            link: { text: 'contact page', href: '/contact' },
                            contactText: 'For questions about these Terms, use our',
                        },
                    ].map(section => (
                        <div key={section.n} className="p-6 md:p-8 space-y-3">
                            <h2 className="font-outfit text-base font-bold text-slate-900">{section.n}. {section.title}</h2>
                            <div className="text-sm text-slate-700 leading-relaxed space-y-2">
                                {section.body && <p>{section.body}</p>}
                                {section.list && (
                                    <ul className="list-disc pl-5 space-y-1">
                                        {section.list.map((item, i) => <li key={i}>{item}</li>)}
                                    </ul>
                                )}
                                {section.link && section.n === '9' && (
                                    <p>Your use of the Service is also governed by our{' '}
                                        <Link href={section.link.href} className="text-indigo-600 underline">{section.link.text}</Link>.
                                        Please review it to understand our data handling practices.
                                    </p>
                                )}
                                {section.contactText && section.link && (
                                    <p>{section.contactText}{' '}
                                        <Link href={section.link.href} className="text-indigo-600 underline">{section.link.text}</Link>.
                                        Also see our{' '}
                                        <Link href="/disclaimer" className="text-indigo-600 underline">Disclaimer</Link> and{' '}
                                        <Link href="/privacy-policy" className="text-indigo-600 underline">Privacy Policy</Link>.
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}

                    <div className="p-6 md:p-8 bg-amber-50 border-t border-amber-100">
                        <h3 className="font-semibold text-amber-900 mb-2 text-sm">Final Reminder</h3>
                        <p className="text-sm text-amber-800 leading-relaxed">
                            This Service is provided for informational purposes only. Always verify your results and academic records with the{' '}
                            <a href="https://results.vtu.ac.in" target="_blank" rel="noopener noreferrer" className="underline font-semibold">official VTU portal</a>.
                            We are not responsible for any errors, discrepancies, or decisions made based on information displayed here.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
