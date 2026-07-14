'use client';

import React, { useState } from 'react';
import { Award, Check, Copy, ExternalLink, HelpCircle, Gift, Info } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sidebar } from '@/components/Sidebar';

export default function PwCouponCode() {
    const [copied, setCopied] = useState<string | null>(null);

    const handleCopy = (code: string) => {
        navigator.clipboard.writeText(code);
        setCopied(code);
        setTimeout(() => setCopied(null), 2000);
    };

    const offers = [
        {
            code: 'GATEPW500',
            discount: 'Flat ₹500 OFF',
            course: 'GATE Wallah Batches (Parakram, Shresthh, etc.)',
            desc: 'Save flat ₹500 on all premium GATE preparation courses for CS, ME, CE, EE, and ECE branches.',
        },
        {
            code: 'PWCODER15',
            discount: 'Up to 15% OFF',
            course: 'PW Skills Web Development & Coding Batches',
            desc: 'Get discount on Java, Python, MERN Stack, and Data Science placement-ready courses.',
        },
        {
            code: 'PWGATE20',
            discount: 'Extra 10% OFF',
            course: 'GATE Test Series & Study Material',
            desc: 'Save extra on official GATE mock test series and comprehensive study modules.',
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50/50 py-12">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="font-outfit text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
                        Physics Wallah (PW) Coupon Codes & Discounts
                    </h1>
                    <p className="text-slate-655 max-w-xl mx-auto font-semibold">
                        Save on GATE Wallah, PW Skills coding courses, and college semester preparation modules. Find verified promo codes below.
                    </p>
                </div>

                <div className="lg:grid lg:grid-cols-3 lg:gap-8">
                    {/* Main Content Column */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Main Promoted Offer */}
                        <Card className="bg-gradient-to-br from-indigo-900 via-purple-950 to-indigo-950 text-white rounded-2xl border-none shadow-xl overflow-hidden">
                            <CardContent className="p-8 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                                <div className="space-y-3">
                                    <span className="bg-yellow-400 text-gray-955 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full inline-block">
                                        Featured Discount
                                    </span>
                                    <h2 className="font-outfit text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
                                        Save Flat ₹500 on GATE Wallah
                                    </h2>
                                    <p className="text-sm text-indigo-200 max-w-lg leading-relaxed font-semibold">
                                        Get instant savings on top GATE prep modules for Computer Science, Mechanical, Civil, and Electrical Engineering. Verified and active today.
                                    </p>
                                </div>

                                <div className="bg-white/10 border border-white/20 p-6 rounded-2xl text-center space-y-4 md:min-w-[200px]">
                                    <div className="font-mono text-2xl font-black tracking-wider text-yellow-300">
                                        GATEPW500
                                    </div>
                                    <Button
                                        onClick={() => handleCopy('GATEPW500')}
                                        className="w-full bg-yellow-450 hover:bg-yellow-500 text-gray-950 font-black border-none h-11"
                                    >
                                        {copied === 'GATEPW500' ? (
                                            <>
                                                <Check className="w-4 h-4 mr-2" /> Copied!
                                            </>
                                        ) : (
                                            <>
                                                <Copy className="w-4 h-4 mr-2" /> Copy Code
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Additional Coupons */}
                        <h3 className="font-outfit text-lg font-bold text-slate-800 pt-4 flex items-center gap-2">
                            <Gift className="h-5 w-5 text-indigo-600" />
                            More Active PW Promo Codes
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {offers.slice(1).map((offer) => (
                                <Card key={offer.code} className="bg-white border-slate-200 shadow-sm flex flex-col justify-between rounded-2xl">
                                    <CardHeader className="pb-3">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-[10px] font-black text-indigo-650 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-100 uppercase tracking-wide">
                                                {offer.discount}
                                            </span>
                                            <Gift className="w-4 h-4 text-slate-400" />
                                        </div>
                                        <CardTitle className="text-base font-bold text-slate-900 leading-snug">{offer.course}</CardTitle>
                                        <CardDescription className="text-xs text-slate-500 mt-1.5 leading-relaxed font-semibold">{offer.desc}</CardDescription>
                                    </CardHeader>
                                    <CardContent className="pt-0 pb-5 flex gap-3">
                                        <div className="flex-1 bg-slate-50 border border-dashed border-slate-250 font-mono font-bold text-center py-2.5 rounded-xl text-sm text-slate-700 select-all">
                                            {offer.code}
                                        </div>
                                        <Button
                                            size="sm"
                                            onClick={() => handleCopy(offer.code)}
                                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-4.5 rounded-xl"
                                        >
                                            {copied === offer.code ? 'Copied' : 'Copy'}
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {/* Educational Content / SEO Copy */}
                        <div className="mt-12 bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm space-y-8 prose prose-slate max-w-none text-slate-655 text-sm">
                            <section className="space-y-3">
                                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                    <Info className="w-5 h-5 text-indigo-600" />
                                    How to Apply Physics Wallah (PW) Coupon Code?
                                </h2>
                                <p className="leading-relaxed font-medium">
                                    Saving money on your course purchases is quick and easy. Follow these step-by-step instructions to apply your coupon code on the official Physics Wallah website or mobile application:
                                </p>
                                <ol className="list-decimal pl-5 space-y-2 text-slate-600 font-medium">
                                    <li>Open the Physics Wallah App or visit the official website (<strong>pw.live</strong>).</li>
                                    <li>Sign in using your registered mobile number or create a new account.</li>
                                    <li>Search and select your desired batch (e.g., GATE CS Parakram 2026, PW Skills Java Development).</li>
                                    <li>Click the <strong>Buy Now</strong> button.</li>
                                    <li>On the checkout summaries page, locate the <strong>Have a Coupon Code?</strong> input field.</li>
                                    <li>Copy and paste one of the verified promo codes listed above (e.g., <strong>GATEPW500</strong>).</li>
                                    <li>Click <strong>Apply</strong>. The discounted price will be reflected instantly in the final payment summary.</li>
                                    <li>Proceed to complete your purchase using UPI, Debit/Credit Card, or Net Banking.</li>
                                </ol>
                            </section>

                            <section className="space-y-3">
                                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                    <Award className="w-5 h-5 text-indigo-600" />
                                    Popular Physics Wallah (PW) Course Offerings
                                </h2>
                                <p className="leading-relaxed font-medium">
                                    Physics Wallah has grown to become one of India's top educational tech companies, providing affordable learning resources for multiple competitive tests:
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold">
                                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                                        <span className="font-bold text-slate-800 block text-sm mb-1">GATE Wallah</span>
                                        <p className="text-slate-500 font-medium leading-relaxed">
                                            Complete comprehensive curriculum for engineering students preparing for the Graduate Aptitude Test in Engineering. Top instructors explain theory, formulas, and solve past papers.
                                        </p>
                                    </div>
                                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                                        <span className="font-bold text-slate-800 block text-sm mb-1">PW Skills</span>
                                        <p className="text-slate-500 font-medium leading-relaxed">
                                            Professional vocational courses designed to make college students industry-ready. Offerings include Full-Stack Web Development, Data Science, DSA in Java/C++, and UI/UX design.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <section className="pt-6 border-t border-slate-100 text-xs text-slate-450 italic font-semibold">
                                Disclaimer: This coupon aggregator directory lists promotional codes for student convenience. 
                                We are an independent platform and are not directly affiliated with, sponsored by, or endorsed by Physics Wallah (PW). 
                                Coupon codes are subject to validity periods and terms of use set by the parent publisher (pw.live).
                            </section>
                        </div>
                    </div>

                    {/* Sidebar Column */}
                    <div className="mt-10 lg:mt-0 lg:col-span-1">
                        <Sidebar />
                    </div>
                </div>
            </div>
        </div>
    );
}
