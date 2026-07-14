import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'VTU Backlog Fee Estimator — Supplementary & Revaluation Fees 2025',
    description: 'Estimate your VTU supplementary (back) exam, revaluation, and photocopy fees. Updated fee structure based on latest VTU circulars.',
    keywords: 'VTU backlog fee, VTU supplementary exam fee, VTU revaluation fee, back exam cost, VTU photocopy fee',
};

export default function BacklogLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
