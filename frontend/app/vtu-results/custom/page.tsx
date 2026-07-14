import React from 'react';
import VtuResultsClient from '../[id]/VtuResultsClient';
import { ExamEvent } from '@/lib/vtu-data';

export const metadata = {
    title: "Custom VTU Results Checker - Fetch with Direct URL",
    description: "Enter any working official VTU results URL to fetch marks, solve captchas, and calculate SGPA instantly.",
};

export default function CustomVtuResultPage() {
    const customExam: ExamEvent = {
        id: 'custom',
        title: 'Custom Results Portal',
        year: new Date().getFullYear().toString(),
        session: 'Custom Link',
        program: 'VTU Exam',
        links: []
    };

    return <VtuResultsClient exam={customExam} />;
}
