import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'VTU CGPA to Percentage Converter — Official Formula',
    description: 'Convert your VTU CGPA to percentage using the official VTU formula (CGPA × 10). Accepted by companies, GATE, government jobs, and MS applications.',
    keywords: 'VTU CGPA to percentage, CGPA calculator, VTU percentage formula, CGPA conversion, VTU marks',
};

export default function CgpaToPercentageLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
