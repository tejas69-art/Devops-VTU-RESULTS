import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'VTU SGPA & CGPA Calculator — Calculate Grades Instantly',
    description: 'Free online VTU SGPA and CGPA calculator. Enter your subject grades and credits to compute your semester GPA and cumulative GPA per VTU CBCS regulations.',
    keywords: 'VTU SGPA calculator, VTU CGPA calculator, VTU grade calculator, CBCS calculator, semester GPA, VTU marks percentage',
};

export default function SgpaCgpaCalculatorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
