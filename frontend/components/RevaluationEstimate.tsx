'use client';

import React, { useMemo } from 'react';

const THRESHOLDS = [40, 50, 55, 60, 70, 80, 90];

interface Subject {
    id: string;
    code: string;
    name: string;
    credits: number;
    internal: number;
    external: number;
    total: number;
    marks: number;
    grade: string;
    gradePoints: number;
    result: string;
    announcedDate: string;
}

interface RevaluationEstimateProps {
    subjects: Subject[];
    sgpa: number;
    totalCredits: number;
}

export const RevaluationEstimate: React.FC<RevaluationEstimateProps> = ({ subjects, sgpa, totalCredits }) => {
    const estimates = useMemo(() => {
        return subjects.map(sub => {
            const currentMarks = sub.total;
            let nextThreshold: number | null = null;
            let nextGP = 0;
            
            for (let i = 0; i < THRESHOLDS.length; i++) {
                if (THRESHOLDS[i] > currentMarks) {
                    nextThreshold = THRESHOLDS[i];
                    if (nextThreshold === 40) nextGP = 4;
                    else if (nextThreshold === 50) nextGP = 5;
                    else if (nextThreshold === 55) nextGP = 6;
                    else if (nextThreshold === 60) nextGP = 7;
                    else if (nextThreshold === 70) nextGP = 8;
                    else if (nextThreshold === 80) nextGP = 9;
                    else if (nextThreshold === 90) nextGP = 10;
                    break;
                }
            }
            
            if (!nextThreshold || currentMarks >= 90) {
                return {
                    ...sub,
                    nextGP: sub.gradePoints,
                    nextThreshold: '-',
                    marksNeeded: '-',
                    potentialDeltaSGPA: 0,
                    potentialSGPA: sgpa,
                    recommendation: 'Not worth'
                };
            }
            
            const marksNeeded = nextThreshold - currentMarks;
            let recommendation = 'Not worth';
            const isLab = sub.code.toUpperCase().includes('L') || sub.name.toUpperCase().includes('LAB');
            
            if (isLab) {
                recommendation = 'Not worth';
            } else if (marksNeeded <= 3) {
                recommendation = 'Apply';
            } else if (marksNeeded === 4) { 
                recommendation = 'Consider';
            } else {
                recommendation = 'Not worth';
            }
            
            const deltaGP = nextGP - sub.gradePoints;
            const potentialDeltaSGPA = (totalCredits > 0 && sub.credits > 0) 
                ? (deltaGP * sub.credits) / totalCredits 
                : 0;
            const potentialSGPA = sgpa + potentialDeltaSGPA;
            
            return {
                ...sub,
                nextGP,
                nextThreshold,
                marksNeeded,
                potentialDeltaSGPA,
                potentialSGPA,
                recommendation
            };
        }).sort((a, b) => {
            const recVal = (r: string) => r === 'Apply' ? 1 : r === 'Consider' ? 2 : 3;
            if (recVal(a.recommendation) !== recVal(b.recommendation)) {
                return recVal(a.recommendation) - recVal(b.recommendation);
            }
            if (a.marksNeeded !== b.marksNeeded && typeof a.marksNeeded === 'number' && typeof b.marksNeeded === 'number') {
                return a.marksNeeded - b.marksNeeded;
            }
            return b.potentialDeltaSGPA - a.potentialDeltaSGPA;
        });
    }, [subjects, sgpa, totalCredits]);

    const applySubjects = estimates.filter(e => e.recommendation === 'Apply');
    const considerSubjects = estimates.filter(e => e.recommendation === 'Consider');
    
    const applyDelta = applySubjects.reduce((sum, e) => sum + e.potentialDeltaSGPA, 0);
    const applyConsiderDelta = applyDelta + considerSubjects.reduce((sum, e) => sum + e.potentialDeltaSGPA, 0);

    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Revaluation Estimate</h3>
                <p className="text-sm text-gray-500">
                    Ranked by marks needed to reach the next grade point and SGPA impact.
                </p>
                <p className="text-sm text-orange-500 mt-1">
                    Disclaimer: This is a probability-based estimate. Revaluation outcomes vary, and in many cases mark changes are around 2 to 3 marks.
                </p>
            </div>
            
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50/50 text-gray-600 font-semibold border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4">Code</th>
                            <th className="px-6 py-4 min-w-[200px]">Subject</th>
                            <th className="px-6 py-4 text-center">Marks</th>
                            <th className="px-6 py-4 text-center">Current GP</th>
                            <th className="px-6 py-4 text-center">Next GP @</th>
                            <th className="px-6 py-4 text-center">Marks Needed</th>
                            <th className="px-6 py-4 text-center whitespace-nowrap">Potential ΔSGPA</th>
                            <th className="px-6 py-4 text-center whitespace-nowrap">Potential SGPA</th>
                            <th className="px-6 py-4 text-center">Recommendation</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {estimates.map((est) => (
                            <tr key={est.id} className="hover:bg-gray-50/50 transition-colors">
                                <td className="px-6 py-4 font-bold text-gray-900">{est.code}</td>
                                <td className="px-6 py-4 text-gray-600">{est.name}</td>
                                <td className="px-6 py-4 text-center font-medium text-gray-900">{est.total}</td>
                                <td className="px-6 py-4 text-center text-gray-600">{est.gradePoints}</td>
                                <td className="px-6 py-4 text-center text-gray-600">
                                    {est.nextThreshold !== '-' ? `${est.nextGP} @ ${est.nextThreshold}` : '-'}
                                </td>
                                <td className="px-6 py-4 text-center font-bold text-gray-900">{est.marksNeeded}</td>
                                <td className="px-6 py-4 text-center font-bold text-purple-600">
                                    {est.potentialDeltaSGPA > 0 ? `+${est.potentialDeltaSGPA.toFixed(2)}` : '-'}
                                </td>
                                <td className="px-6 py-4 text-center font-bold text-green-600">
                                    {est.potentialSGPA > sgpa ? est.potentialSGPA.toFixed(2) : '-'}
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <span className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-bold ${
                                        est.recommendation === 'Apply' ? 'bg-green-100/50 text-green-700' :
                                        est.recommendation === 'Consider' ? 'bg-orange-100/50 text-orange-700' :
                                        'bg-gray-100 text-gray-500'
                                    }`}>
                                        {est.recommendation}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="p-6 bg-gray-50 border-t border-gray-100">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {applySubjects.length > 0 && (
                        <div className="bg-green-50/50 border border-green-200/50 rounded-xl p-4 text-sm">
                            <span className="font-semibold text-green-800">If all Apply subjects improve:</span>{' '}
                            <span className="text-green-700">
                                SGPA can move from {sgpa.toFixed(2)} to {(sgpa + applyDelta).toFixed(2)} (+{applyDelta.toFixed(2)}, {applySubjects.length} subjects).
                            </span>
                        </div>
                    )}
                    {(applySubjects.length > 0 || considerSubjects.length > 0) && (
                        <div className="bg-indigo-50/50 border border-indigo-200/50 rounded-xl p-4 text-sm">
                            <span className="font-semibold text-indigo-800">If Apply + Consider subjects improve:</span>{' '}
                            <span className="text-indigo-700">
                                SGPA can move from {sgpa.toFixed(2)} to {(sgpa + applyConsiderDelta).toFixed(2)} (+{applyConsiderDelta.toFixed(2)}, {applySubjects.length + considerSubjects.length} subjects).
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
