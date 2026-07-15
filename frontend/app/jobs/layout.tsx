import type { Metadata } from 'next';
import React from 'react';
import { Sidebar } from '@/components/Sidebar';

export const metadata: Metadata = {
    title: 'VTU Campus Jobs & Internships 2025 — Fresher Opportunities',
    description: 'Browse fresher jobs and internship opportunities for VTU B.E/B.Tech graduates. Filter by company, role, and eligibility criteria.',
    keywords: 'VTU jobs, VTU placement, fresher jobs 2025, VTU internships, campus recruitment, B.E jobs',
};

export default function JobsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-slate-50 py-10">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="lg:grid lg:grid-cols-3 lg:gap-8">
                    {/* Main Content Column */}
                    <div className="lg:col-span-2 space-y-6">
                        {children}
                    </div>

                    {/* Sidebar Column */}
                    <div className="mt-8 lg:mt-0 lg:col-span-1">
                        <Sidebar />
                    </div>
                </div>
            </div>
        </div>
    );
}
