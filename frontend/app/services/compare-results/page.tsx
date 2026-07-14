'use client';

import React, { useState } from 'react';
import { ArrowRightLeft, CheckCircle, BarChart3, Users, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

// Interfaces
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

interface ParsedResult {
    usn: string;
    studentName: string;
    semester: number;
    subjects: Subject[];
}

// Helpers
const getGradeFromMarks = (marks: number) => {
    if (marks >= 90) return { grade: 'S', points: 10 };
    if (marks >= 80) return { grade: 'A', points: 9 };
    if (marks >= 70) return { grade: 'B', points: 8 };
    if (marks >= 60) return { grade: 'C', points: 7 };
    if (marks >= 50) return { grade: 'D', points: 6 };
    if (marks >= 40) return { grade: 'E', points: 5 };
    return { grade: 'F', points: 0 };
};

const parseHTMLResult = (html: string, fallbackUsn: string): ParsedResult | null => {
    try {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        const nameRegex = /Student Name[\s\S]*?<td[^>]*>[\s\S]*?:\s*[\s\S]*?<\/b>\s*([^<]+)<\/td>/i;
        const nameMatch = nameRegex.exec(html);
        const studentName = nameMatch ? nameMatch[1].trim() : 'Unknown';

        const usnRegex = /University Seat Number[\s\S]*?<td[^>]*>[\s\S]*?:\s*[\s\S]*?<\/b>\s*([^<]+)<\/td>/i;
        const usnMatch = usnRegex.exec(html);
        let usn = usnMatch ? usnMatch[1].trim() : fallbackUsn;
        if (!usn || usn.length < 5) usn = fallbackUsn;

        const semesterRegex = /Semester\s*:\s*(\d+)/i;
        const semesterMatch = semesterRegex.exec(html);
        const semester = semesterMatch ? Number.parseInt(semesterMatch[1], 10) : 0;

        const subjects: Subject[] = [];
        const tableBodies = doc.querySelectorAll('.divTableBody');

        tableBodies.forEach((tableBody) => {
            const rows = tableBody.querySelectorAll('.divTableRow');
            rows.forEach((row) => {
                const firstCell = row.querySelector('.divTableCell');
                if (firstCell?.textContent?.includes('Subject Code')) return;

                const cells = row.querySelectorAll('.divTableCell');
                if (cells.length >= 7) {
                    const code = cells[0].textContent?.trim() || '';
                    const name = cells[1].textContent?.trim() || '';
                    const internal = Number.parseInt(cells[2].textContent?.trim() || '0', 10);
                    const external = Number.parseInt(cells[3].textContent?.trim() || '0', 10);
                    const total = Number.parseInt(cells[4].textContent?.trim() || '0', 10);
                    const result = cells[5].textContent?.trim() || '';
                    const announcedDate = cells[6].textContent?.trim() || '';

                    if (code && name && code.length > 0 && name.length > 0) {
                        const maxMarks = total > 100 ? 200 : 100;
                        const percentage = maxMarks > 0 ? (total / maxMarks) * 100 : 0;
                        const gradeData = getGradeFromMarks(percentage);

                        subjects.push({
                            id: `${code}-${subjects.length}`,
                            code, name, credits: 0, internal, external, total,
                            marks: percentage, grade: gradeData.grade, gradePoints: gradeData.points,
                            result, announcedDate
                        });
                    }
                }
            });
        });

        return { usn, studentName, semester, subjects };
    } catch (error) {
        console.error('Error parsing HTML:', error);
        return null;
    }
};

const calculateBasicStats = (subjects: Subject[]) => {
    let totalMarks = 0;
    let maxPossibleMarks = 0;
    subjects.forEach(s => {
        totalMarks += s.total;
        maxPossibleMarks += (s.total > 100 ? 200 : 100);
    });
    const percentage = maxPossibleMarks > 0 ? (totalMarks / maxPossibleMarks) * 100 : 0;
    return { totalMarks, maxPossibleMarks, percentage };
};

export default function CompareResultsPage() {
    const [activeTab, setActiveTab] = useState<'semester' | 'peer'>('semester');
    
    // Semester Compare State
    const [usn, setUsn] = useState('');
    const [url1, setUrl1] = useState('');
    const [url2, setUrl2] = useState('');
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [activeFetch, setActiveFetch] = useState<1 | 2>(1);
    
    const [result1, setResult1] = useState<ParsedResult | null>(null);
    const [result2, setResult2] = useState<ParsedResult | null>(null);

    const [captchaData, setCaptchaData] = useState<{
        image: string; token: string; cookies: any; usn: string; url: string; step: 1 | 2;
    } | null>(null);
    const [captchaText, setCaptchaText] = useState('');

    const fetchResult = async (targetUsn: string, targetUrl: string, step: 1 | 2, overrideCaptcha?: any) => {
        const payload = overrideCaptcha ? {
            usn: targetUsn, index_url: targetUrl, token: overrideCaptcha.token, cookies: overrideCaptcha.cookies, captcha_code: overrideCaptcha.captcha_code
        } : { usn: targetUsn, index_url: targetUrl };

        const response = await fetch('/api/single-post', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            let msg = `HTTP error! status: ${response.status}`;
            try { const errData = await response.json(); if (errData.detail) msg = errData.detail; } catch { }
            throw new Error(msg);
        }

        const data = await response.json();
        if (data.stage === 'captcha') {
            setCaptchaData({ image: data.captcha_image_data_url, token: data.token, cookies: data.cookies, usn: targetUsn, url: targetUrl, step });
            return null;
        }

        let parsed: ParsedResult | null = null;
        Object.keys(data).forEach(key => {
            if (typeof data[key] === 'string' && data[key].length > 100) {
                const parsedData = parseHTMLResult(data[key], targetUsn);
                if (parsedData && parsedData.subjects.length > 0) parsed = parsedData;
            }
        });

        if (!parsed) throw new Error(`No valid results found for URL ${step}. Check USN and URL.`);
        return parsed;
    };

    const handleSemesterCompare = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!usn || !url1 || !url2) return;
        setLoading(true); setError(null); setResult1(null); setResult2(null);
        
        try {
            setActiveFetch(1);
            const r1 = await fetchResult(usn.toUpperCase(), url1, 1);
            if (!r1) { setLoading(false); return; } // waiting for captcha
            
            setResult1(r1);
            setActiveFetch(2);
            const r2 = await fetchResult(usn.toUpperCase(), url2, 2);
            if (!r2) { setLoading(false); return; } // waiting for captcha
            
            setResult2(r2);
        } catch (err: any) {
            setError(err.message);
        } finally {
            // Only set loading false if we aren't waiting for a captcha
            // The wait is indicated by captchaData being non-null, but since state updates might be queued,
            // we handle loading inside the catch or after the if blocks.
            setLoading(false);
        }
    };

    const handleCaptchaSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!captchaData || !captchaText.trim()) return;
        setLoading(true); setError(null);

        try {
            const parsed = await fetchResult(captchaData.usn, captchaData.url, captchaData.step, {
                token: captchaData.token, cookies: captchaData.cookies, captcha_code: captchaText.trim()
            });

            if (parsed) {
                setCaptchaData(null);
                setCaptchaText('');
                
                if (captchaData.step === 1) {
                    setResult1(parsed);
                    // Automatically trigger step 2
                    setActiveFetch(2);
                    const r2 = await fetchResult(usn.toUpperCase(), url2, 2);
                    if (!r2) { setLoading(false); return; }
                    setResult2(r2);
                    setLoading(false);
                } else {
                    setResult2(parsed);
                    setLoading(false);
                }
            } else {
                setCaptchaText('');
                throw new Error("Invalid Captcha. Please try again.");
            }
        } catch (err: any) {
            setError(err.message);
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4 max-w-5xl">
                <div className="mb-8">
                    <Link href="/#services" className="text-purple-600 hover:text-purple-800 text-sm font-medium">
                        &larr; Back to Services
                    </Link>
                </div>
                
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-12">
                    <div className="bg-gradient-to-r from-purple-600 to-indigo-700 px-8 py-12 text-white">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                                <ArrowRightLeft className="w-8 h-8 text-white" />
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold">Compare Results</h1>
                        </div>
                        <p className="text-purple-100 text-lg max-w-2xl">
                            Track your academic trajectory. Compare your performance across semesters or benchmark against your peers to stay motivated and improve your grades.
                        </p>
                    </div>

                    {/* Tabs */}
                    <div className="flex border-b border-gray-200">
                        <button 
                            className={`flex-1 py-4 text-center font-semibold text-lg transition-colors ${activeTab === 'semester' ? 'border-b-4 border-purple-600 text-purple-700' : 'text-gray-500 hover:text-gray-700'}`}
                            onClick={() => setActiveTab('semester')}
                        >
                            Semester vs. Semester
                        </button>
                        <button 
                            className={`flex-1 py-4 text-center font-semibold text-lg transition-colors ${activeTab === 'peer' ? 'border-b-4 border-indigo-600 text-indigo-700' : 'text-gray-500 hover:text-gray-700'}`}
                            onClick={() => setActiveTab('peer')}
                        >
                            Peer Comparison
                        </button>
                    </div>
                    
                    <div className="p-8">
                        {activeTab === 'peer' && (
                            <div className="text-center py-12">
                                <Users className="w-16 h-16 text-indigo-200 mx-auto mb-4" />
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">Peer Comparison</h3>
                                <p className="text-gray-600 mb-6">Want to compare your results with a friend?</p>
                                <Link href="/check-results" className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
                                    Go to Check Results &rarr;
                                </Link>
                            </div>
                        )}

                        {activeTab === 'semester' && (
                            <div className="max-w-4xl mx-auto">
                                {!result1 || !result2 ? (
                                    <form onSubmit={handleSemesterCompare} className="space-y-6">
                                        <div className="bg-purple-50 p-6 rounded-xl border border-purple-100">
                                            <Label className="block text-sm font-medium text-gray-700 mb-2">Student USN</Label>
                                            <Input 
                                                value={usn} onChange={e => setUsn(e.target.value.toUpperCase())}
                                                placeholder="e.g. 1AM21CS202" required className="bg-white uppercase"
                                            />
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label className="block text-sm font-medium text-gray-700">Semester A VTU URL</Label>
                                                <Input 
                                                    value={url1} onChange={e => setUrl1(e.target.value)}
                                                    placeholder="https://results.vtu.ac.in/..." required
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="block text-sm font-medium text-gray-700">Semester B VTU URL</Label>
                                                <Input 
                                                    value={url2} onChange={e => setUrl2(e.target.value)}
                                                    placeholder="https://results.vtu.ac.in/..." required
                                                />
                                            </div>
                                        </div>

                                        {error && <div className="p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">{error}</div>}

                                        {captchaData ? (
                                            <div className="bg-white border-2 border-purple-200 p-8 rounded-xl text-center space-y-4 max-w-md mx-auto shadow-sm">
                                                <p className="font-bold text-gray-900 text-lg">Security Check (Step {captchaData.step} of 2)</p>
                                                <p className="text-gray-500 text-sm">Please solve the VTU Captcha to continue fetching Semester {captchaData.step}.</p>
                                                <div className="flex justify-center p-2 bg-gray-50 rounded border"><img src={captchaData.image} alt="captcha" /></div>
                                                <Input value={captchaText} onChange={e => setCaptchaText(e.target.value)} placeholder="Enter Captcha Text" required className="max-w-xs mx-auto text-center" />
                                                <div className="flex justify-center gap-4 mt-4">
                                                    <Button type="button" variant="outline" onClick={() => { setCaptchaData(null); setLoading(false); }}>Cancel</Button>
                                                    <Button type="submit" disabled={loading} className="bg-purple-600 hover:bg-purple-700">Verify & Continue</Button>
                                                </div>
                                            </div>
                                        ) : (
                                            <Button type="submit" disabled={loading} className="w-full bg-purple-600 hover:bg-purple-700 h-12 text-lg">
                                                {loading ? <span className="flex items-center gap-2"><Loader2 className="w-5 h-5 animate-spin" /> Fetching Sem {activeFetch}...</span> : 'Compare Semesters'}
                                            </Button>
                                        )}
                                    </form>
                                ) : (
                                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                        <div className="flex justify-between items-center pb-4 border-b">
                                            <h2 className="text-2xl font-bold text-gray-900">Comparison Result</h2>
                                            <Button variant="outline" onClick={() => { setResult1(null); setResult2(null); }}>Compare Again</Button>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-6">
                                            {[result1, result2].map((res, i) => {
                                                const stats = calculateBasicStats(res.subjects);
                                                return (
                                                    <div key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                                                        <div className={`p-4 text-white font-bold text-center ${i === 0 ? 'bg-purple-600' : 'bg-indigo-600'}`}>
                                                            Semester {res.semester || '?'}
                                                        </div>
                                                        <div className="p-6 space-y-4">
                                                            <div className="flex justify-between items-center pb-4 border-b">
                                                                <span className="text-gray-600">Total Marks</span>
                                                                <span className="font-bold text-xl">{stats.totalMarks} / {stats.maxPossibleMarks}</span>
                                                            </div>
                                                            <div className="flex justify-between items-center pb-4 border-b">
                                                                <span className="text-gray-600">Percentage</span>
                                                                <span className="font-bold text-xl text-green-600">{stats.percentage.toFixed(2)}%</span>
                                                            </div>
                                                            <div className="flex justify-between items-center">
                                                                <span className="text-gray-600">Total Subjects</span>
                                                                <span className="font-bold text-xl">{res.subjects.length}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>

                                        {/* Trend Analysis */}
                                        {(() => {
                                            const s1 = calculateBasicStats(result1.subjects);
                                            const s2 = calculateBasicStats(result2.subjects);
                                            const diff = s2.percentage - s1.percentage;
                                            return (
                                                <div className={`p-6 rounded-xl border flex items-center justify-center gap-4 ${diff >= 0 ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
                                                    <BarChart3 className={`w-8 h-8 ${diff >= 0 ? 'text-emerald-500' : 'text-red-500'}`} />
                                                    <div className="text-lg">
                                                        Performance has <strong>{diff >= 0 ? 'increased' : 'decreased'}</strong> by <strong>{Math.abs(diff).toFixed(2)}%</strong> between the two semesters.
                                                    </div>
                                                </div>
                                            );
                                        })()}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
