'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    GraduationCap, Menu, X, ArrowRight, BookOpen, Calculator,
    Calendar, Briefcase, ChevronDown, Percent, FileWarning, Info
} from 'lucide-react';

const calculatorLinks = [
    { name: 'SGPA & CGPA Calculator', href: '/vtu-sgpa-cgpa-calculator', icon: Calculator, desc: 'Credit-weighted grade averages' },
    { name: 'Attendance Tracker', href: '/attendance-calculator', icon: Calendar, desc: '85% condonation threshold' },
    { name: 'CGPA to Percentage', href: '/cgpa-to-percentage', icon: Percent, desc: 'CGPA × 10 VTU formula' },
    { name: 'Backlog Fee Estimator', href: '/backlog-fee-estimator', icon: FileWarning, desc: 'Supplementary exam cost guide' },
];

export const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [calcOpen, setCalcOpen] = useState(false);
    const pathname = usePathname();
    const dropdownRef = useRef<HTMLDivElement>(null);

    const isActive = (path: string) => {
        if (path === '/') return pathname === '/';
        return pathname.startsWith(path);
    };

    const isCalcActive = calculatorLinks.some(l => pathname.startsWith(l.href));

    // Close dropdown on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setCalcOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    return (
        <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2.5 group shrink-0">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-200/60 group-hover:bg-indigo-700 transition-colors">
                            <GraduationCap className="h-5 w-5" />
                        </div>
                        <span className="font-outfit text-xl font-extrabold tracking-tight text-slate-900">
                            VTU<span className="text-indigo-600">Results</span>
                        </span>
                    </Link>

                    {/* Desktop nav */}
                    <nav className="hidden lg:flex items-center gap-0.5">
                        <Link
                            href="/vtu-results"
                            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${isActive('/vtu-results') ? 'text-indigo-700 bg-indigo-50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}
                        >
                            <GraduationCap className="h-4 w-4" />
                            Results
                        </Link>

                        {/* Calculators dropdown */}
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setCalcOpen(v => !v)}
                                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${isCalcActive ? 'text-indigo-700 bg-indigo-50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}
                            >
                                <Calculator className="h-4 w-4" />
                                Calculators
                                <ChevronDown className={`h-3.5 w-3.5 transition-transform ${calcOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {calcOpen && (
                                <div className="absolute top-full left-0 mt-1.5 w-72 bg-white rounded-xl border border-slate-200 shadow-lg shadow-slate-200/60 py-2 z-50">
                                    {calculatorLinks.map(link => (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            onClick={() => setCalcOpen(false)}
                                            className="flex items-start gap-3 px-4 py-2.5 hover:bg-slate-50 transition-colors group"
                                        >
                                            <div className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 shrink-0 group-hover:bg-indigo-100 transition-colors">
                                                <link.icon className="h-3.5 w-3.5" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-slate-800">{link.name}</p>
                                                <p className="text-xs text-slate-500">{link.desc}</p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>

                        <Link
                            href="/articles"
                            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${isActive('/articles') ? 'text-indigo-700 bg-indigo-50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}
                        >
                            <BookOpen className="h-4 w-4" />
                            Articles
                        </Link>

                        <Link
                            href="/jobs"
                            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${isActive('/jobs') ? 'text-indigo-700 bg-indigo-50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}
                        >
                            <Briefcase className="h-4 w-4" />
                            Jobs
                        </Link>

                        <Link
                            href="/about"
                            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${isActive('/about') ? 'text-indigo-700 bg-indigo-50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}
                        >
                            <Info className="h-4 w-4" />
                            About
                        </Link>
                    </nav>

                    {/* Desktop CTA */}
                    <div className="hidden lg:flex">
                        <Link
                            href="/vtu-results"
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200/50"
                        >
                            Check Results
                            <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <button
                        type="button"
                        className="flex lg:hidden items-center justify-center rounded-lg p-2 text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors border border-slate-200"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="lg:hidden border-t border-slate-100 bg-white">
                    <div className="px-4 py-4 space-y-1">
                        <Link href="/vtu-results" onClick={() => setIsOpen(false)}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${isActive('/vtu-results') ? 'bg-indigo-50 text-indigo-700' : 'text-slate-700 hover:bg-slate-50'}`}>
                            <GraduationCap className="h-4 w-4" /> Results
                        </Link>
                        <div className="py-1">
                            <p className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Calculators</p>
                            {calculatorLinks.map(link => (
                                <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)}
                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${isActive(link.href) ? 'bg-indigo-50 text-indigo-700' : 'text-slate-700 hover:bg-slate-50'}`}>
                                    <link.icon className="h-4 w-4" /> {link.name}
                                </Link>
                            ))}
                        </div>
                        <Link href="/articles" onClick={() => setIsOpen(false)}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${isActive('/articles') ? 'bg-indigo-50 text-indigo-700' : 'text-slate-700 hover:bg-slate-50'}`}>
                            <BookOpen className="h-4 w-4" /> Articles
                        </Link>
                        <Link href="/jobs" onClick={() => setIsOpen(false)}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${isActive('/jobs') ? 'bg-indigo-50 text-indigo-700' : 'text-slate-700 hover:bg-slate-50'}`}>
                            <Briefcase className="h-4 w-4" /> Jobs
                        </Link>
                        <Link href="/about" onClick={() => setIsOpen(false)}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${isActive('/about') ? 'bg-indigo-50 text-indigo-700' : 'text-slate-700 hover:bg-slate-50'}`}>
                            <Info className="h-4 w-4" /> About
                        </Link>
                        <div className="pt-2 border-t border-slate-100">
                            <Link href="/vtu-results" onClick={() => setIsOpen(false)}
                                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-bold hover:bg-indigo-700 transition-colors">
                                Check Results Now <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};
