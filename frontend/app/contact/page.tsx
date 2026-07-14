'use client';

import React, { useState } from 'react';
import type { Metadata } from 'next';
import { Mail, Send, CheckCircle, HelpCircle } from 'lucide-react';
import Link from 'next/link';

const faqs = [
    {
        q: 'Where does the result data come from?',
        a: 'Results are fetched in real time from the official VTU results server (results.vtu.ac.in). We do not modify or store the data — it\'s displayed exactly as returned by VTU\'s servers.',
    },
    {
        q: 'Why is the SGPA showing 0 or wrong?',
        a: 'SGPA estimation depends on the credit values assigned to each subject. The credits shown in your result are defaults — adjust them in the SGPA calculator to match your actual scheme. Also check that all subjects have a valid grade (not "AB" or "NSAR").',
    },
    {
        q: 'Why does the CAPTCHA image not load?',
        a: 'The CAPTCHA is fetched live from VTU\'s server. If it doesn\'t appear, VTU\'s results server may be under load or temporarily down. Try again after a few minutes.',
    },
    {
        q: 'Is this site affiliated with VTU?',
        a: 'No. This is an independent, student-built platform. It is not affiliated with, endorsed by, or officially connected to Visvesvaraya Technological University. See our Disclaimer for more details.',
    },
    {
        q: 'Are my USN and results stored anywhere?',
        a: 'No. Your USN is sent to our API proxy, which forwards the request to VTU\'s server, and the result is returned to your browser. Nothing is stored in any database.',
    },
    {
        q: 'What does "NSAR" mean in my result?',
        a: '"Not Eligible for Semester Examination due to Attendance Shortage" — this means the student was barred from appearing in the exam for that subject due to insufficient attendance. Read our attendance guide for details on condonation.',
    },
];

export default function ContactPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    const mailtoLink = `mailto:vtu.results.help@gmail.com?subject=${encodeURIComponent(subject || 'VTU Results — Enquiry')}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;

    const isReady = name.trim() && email.trim() && message.trim();

    return (
        <div className="min-h-screen bg-slate-50/50 py-12">
            <div className="container mx-auto max-w-4xl px-4 sm:px-6">

                <div className="mb-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full text-indigo-700 text-xs font-bold uppercase tracking-wider mb-4">
                        <Mail className="w-3.5 h-3.5" /> Contact
                    </div>
                    <h1 className="font-outfit text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">Get in Touch</h1>
                    <p className="text-slate-600 max-w-xl leading-relaxed">
                        Have a question, found a bug, or want to give feedback? Fill out the form and your email client will open with the message ready to send.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">

                    {/* Contact form */}
                    <div className="md:col-span-3 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                        <h2 className="font-semibold text-slate-900 mb-5">Send a Message</h2>
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="contact-name" className="block text-sm font-semibold text-slate-700 mb-1.5">Your Name</label>
                                    <input
                                        id="contact-name"
                                        type="text"
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        placeholder="Rahul Sharma"
                                        className="w-full h-10 px-3 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-colors"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="contact-email" className="block text-sm font-semibold text-slate-700 mb-1.5">Email Address</label>
                                    <input
                                        id="contact-email"
                                        type="email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        placeholder="rahul@example.com"
                                        className="w-full h-10 px-3 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-colors"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="contact-subject" className="block text-sm font-semibold text-slate-700 mb-1.5">Subject</label>
                                <input
                                    id="contact-subject"
                                    type="text"
                                    value={subject}
                                    onChange={e => setSubject(e.target.value)}
                                    placeholder="e.g. Result not loading / SGPA calculation question"
                                    className="w-full h-10 px-3 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-colors"
                                />
                            </div>
                            <div>
                                <label htmlFor="contact-message" className="block text-sm font-semibold text-slate-700 mb-1.5">Message</label>
                                <textarea
                                    id="contact-message"
                                    value={message}
                                    onChange={e => setMessage(e.target.value)}
                                    placeholder="Describe your question or issue in detail…"
                                    rows={5}
                                    className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-colors"
                                />
                            </div>
                            <a
                                href={isReady ? mailtoLink : undefined}
                                aria-disabled={!isReady}
                                className={`inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-bold transition-colors ${isReady ? 'bg-indigo-600 text-white hover:bg-indigo-700 cursor-pointer' : 'bg-slate-100 text-slate-400 cursor-not-allowed pointer-events-none'}`}
                            >
                                <Send className="w-4 h-4" /> Open in Email Client
                            </a>
                            <p className="text-xs text-slate-400 text-center leading-relaxed">
                                Clicking the button opens your default email app with the message pre-filled. We typically respond within 2 business days.
                            </p>
                        </div>
                    </div>

                    {/* Sidebar info */}
                    <div className="md:col-span-2 space-y-4">

                        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
                            <h3 className="font-semibold text-slate-900 text-sm">Response Times</h3>
                            <div className="space-y-2 text-sm text-slate-600">
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                                    Bug reports: 1–2 business days
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                                    General questions: 2–3 business days
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                                    Result season: slightly longer
                                </div>
                            </div>
                        </div>

                        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
                            <h3 className="font-semibold text-slate-900 text-sm">Social Media</h3>
                            <div className="space-y-2 text-sm text-slate-500">
                                {/* TODO: Replace # with real social media URLs when accounts are created */}
                                <p><a href="#" className="hover:text-pink-500 transition-colors font-medium">Instagram</a> — coming soon</p>
                                <p><a href="#" className="hover:text-sky-500 transition-colors font-medium">Twitter / X</a> — coming soon</p>
                                <p><a href="#" className="hover:text-blue-500 transition-colors font-medium">LinkedIn</a> — coming soon</p>
                            </div>
                        </div>

                        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm text-sm text-slate-600 space-y-2">
                            <h3 className="font-semibold text-slate-900">Before Contacting</h3>
                            <ul className="space-y-1.5">
                                <li><Link href="/about" className="text-indigo-600 hover:underline">About page</Link> — what this site is</li>
                                <li><Link href="/disclaimer" className="text-indigo-600 hover:underline">Disclaimer</Link> — VTU affiliation notice</li>
                                <li><Link href="/privacy-policy" className="text-indigo-600 hover:underline">Privacy Policy</Link> — data handling</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* FAQ */}
                <div className="mt-8 bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm">
                    <h2 className="font-outfit text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <HelpCircle className="w-5 h-5 text-indigo-600" /> Frequently Asked Questions
                    </h2>
                    <div className="divide-y divide-slate-100">
                        {faqs.map((faq, i) => (
                            <div key={i} className="py-5 first:pt-0 last:pb-0">
                                <h3 className="font-semibold text-slate-900 mb-1.5 text-sm">{faq.q}</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
