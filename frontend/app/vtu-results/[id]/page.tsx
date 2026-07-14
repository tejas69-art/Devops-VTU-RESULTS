import React from 'react';
import VtuResultsClient from './VtuResultsClient';
import { VTU_RESULTS_DATA } from '@/lib/vtu-data';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: { id: string } }) {
    const resolvedParams = await params;
    const exam = VTU_RESULTS_DATA.find(e => e.id === resolvedParams.id);
    if (!exam) {
        return {
            title: 'Exam Results Not Found | VTU Results',
            description: 'The requested VTU examination results page could not be found.',
        };
    }
    return {
        title: `${exam.title} - Check VTU Results & SGPA`,
        description: `Check Visvesvaraya Technological University (VTU) ${exam.title} results online. Enter your USN to retrieve marks, verify grades, and compute estimated SGPA instantly.`,
        keywords: `vtu results, ${exam.title.toLowerCase()}, vtu ${exam.year}, vtu usn search, vtu marks check`,
    };
}

export default async function VtuResultPage({ params }: { params: { id: string } }) {
    const resolvedParams = await params;
    const exam = VTU_RESULTS_DATA.find(e => e.id === resolvedParams.id);
    if (!exam) {
        notFound();
    }

    return <VtuResultsClient exam={exam} />;
}
