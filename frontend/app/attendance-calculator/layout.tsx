import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'VTU Attendance Calculator — Track Classes & Condonation Eligibility',
    description: 'Calculate your VTU attendance percentage, find out how many classes you can skip or must attend, and check condonation eligibility instantly.',
    keywords: 'VTU attendance calculator, VTU 85% attendance, attendance tracker, condonation eligibility, VTU attendance rules',
};

export default function AttendanceLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
