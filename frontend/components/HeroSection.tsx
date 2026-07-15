'use client';

import React from 'react';
import { GraduationCap, Sparkles } from 'lucide-react';
import Link from 'next/link';

export const HeroSection = () => {
    return (
        <section className="relative bg-gradient-to-b from-blue-600 via-blue-700 to-blue-800 text-white overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-300 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
            </div>

            <div className="relative container mx-auto px-4 py-16 md:py-24">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 border border-white/20">
                        <Sparkles className="w-4 h-4 text-yellow-300" />
                        <span className="text-sm font-medium">Your One-Stop VTU Resource</span>
                    </div>

                    {/* Main Headline */}
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                        One Platform for All Your
                        <span className="block bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
                            Engineering Needs
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
                        One-Stop E-Learning Portal with Latest Results, SGPA Calculator, and More!
                        Join thousands of VTU students for a Seamless Academic Experience.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/check-results"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                            <GraduationCap className="w-5 h-5" />
                            Check Your Results Now
                        </Link>
                        <a
                            href="#services"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-medium rounded-xl border border-white/30 hover:bg-white/20 transition-all"
                        >
                            Explore Services
                        </a>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-white/20 max-w-lg mx-auto">
                        <div>
                            <div className="text-2xl md:text-3xl font-bold">10K+</div>
                            <div className="text-sm text-blue-200">Results Checked</div>
                        </div>
                        <div>
                            <div className="text-2xl md:text-3xl font-bold">100%</div>
                            <div className="text-sm text-blue-200">Real-Time Data</div>
                        </div>
                        <div>
                            <div className="text-2xl md:text-3xl font-bold">Fast</div>
                            <div className="text-sm text-blue-200">Instant SGPA</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Wave Divider */}
            <div className="absolute bottom-0 left-0 right-0">
                <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
                    <path d="M0 120L60 105C120 90 240 60 360 52.5C480 45 600 60 720 67.5C840 75 960 75 1080 67.5C1200 60 1320 45 1380 37.5L1440 30V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#f9fafb" />
                </svg>
            </div>
        </section>
    );
};
