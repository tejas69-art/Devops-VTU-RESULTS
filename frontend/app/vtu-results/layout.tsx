'use client';

import React from 'react';
import { Sidebar } from '@/components/Sidebar';

export default function VtuResultsLayout({
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
