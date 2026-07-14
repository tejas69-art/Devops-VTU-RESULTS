'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calculator, GraduationCap, Award, Target, Star, BookOpen, Clock, HelpCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ExamEvent, ExamLink } from '@/lib/vtu-data';
import { RevaluationEstimate } from '@/components/RevaluationEstimate';

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

        // Use DOM to extract name and USN from divTableCell pairs
        // VTU pages use <div class="divTableCell"> not <td>
        let studentName = 'Unknown';
        let usn = fallbackUsn;

        const allCells = Array.from(doc.querySelectorAll('.divTableCell'));
        for (let i = 0; i < allCells.length; i++) {
            const text = allCells[i].textContent?.trim() || '';
            const nextText = allCells[i + 1]?.textContent?.trim() || '';
            if (text === 'Student Name' && nextText) {
                studentName = nextText.replace(/^:\s*/, '').trim();
            }
            if (text === 'University Seat Number' && nextText) {
                const extracted = nextText.replace(/^:\s*/, '').trim();
                if (extracted.length >= 5) usn = extracted;
            }
        }

        // Fallback: try regex on raw HTML (older page formats with <td>)
        if (studentName === 'Unknown') {
            const nameMatch = /Student Name[\s\S]{0,200}?:\s*<\/b>\s*([^<\n]+)/i.exec(html);
            if (nameMatch) studentName = nameMatch[1].trim();
        }
        if (usn === fallbackUsn) {
            const usnMatch = /University Seat Number[\s\S]{0,200}?:\s*<\/b>\s*([^<\n]+)/i.exec(html);
            if (usnMatch) {
                const extracted = usnMatch[1].trim();
                if (extracted.length >= 5) usn = extracted;
            }
        }

        // Extract semester
        const semesterRegex = /Semester\s*:\s*(\d+)/i;
        const semesterMatch = semesterRegex.exec(html);
        const semester = semesterMatch ? Number.parseInt(semesterMatch[1], 10) : 0;

        // Extract subjects
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
                        const credits = 0; // editable by student

                        subjects.push({
                            id: `${code}-${subjects.length}`,
                            code,
                            name,
                            credits,
                            internal,
                            external,
                            total,
                            marks: percentage,
                            grade: gradeData.grade,
                            gradePoints: gradeData.points,
                            result,
                            announcedDate
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

export default function VtuResultsClient({ exam }: { exam: ExamEvent }) {
    const [usn, setUsn] = useState('');
    const [selectedType, setSelectedType] = useState<string>(exam.links[0]?.type || '');
    const [selectedScheme, setSelectedScheme] = useState<string>(exam.links[0]?.scheme || '');
    const [url, setUrl] = useState<string>(exam.links[0]?.url || '');
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [parsedResult, setParsedResult] = useState<ParsedResult | null>(null);
    const [allResults, setAllResults] = useState<ParsedResult[]>([]);
    
    // Comparison State
    const [secondResult, setSecondResult] = useState<ParsedResult | null>(null);
    const [comparisonUsn, setComparisonUsn] = useState('');
    const [fetchingContext, setFetchingContext] = useState<'main' | 'comparison'>('main');
    const [isComparing, setIsComparing] = useState(false);

    // Captcha State
    const [captchaData, setCaptchaData] = useState<{
        image: string;
        token: string;
        cookies: any;
        usn: string;
        url: string;
    } | null>(null);
    const [captchaText, setCaptchaText] = useState('');

    // Raw HTML from API (for original download)
    const [rawHtml, setRawHtml] = useState<string | null>(null);

    // SGPA Stats
    const [sgpa, setSgpa] = useState<number>(0);
    const [totalCredits, setTotalCredits] = useState<number>(0);

    // Update target URL when Type or Scheme selection changes
    useEffect(() => {
        if (exam.id === 'custom') return;
        const matchingLink = exam.links.find(l => l.type === selectedType && l.scheme === selectedScheme);
        if (matchingLink) {
            setUrl(matchingLink.url);
        }
    }, [selectedType, selectedScheme, exam.links, exam.id]);

    // Available Schemes and Types for this exam
    const availableTypes = Array.from(new Set(exam.links.map(l => l.type)));
    const availableSchemes = Array.from(new Set(exam.links.filter(l => l.type === selectedType).map(l => l.scheme)));

    const calculateSGPA = (subjects: Subject[]) => {
        let totalGradePoints = 0;
        let totalCreds = 0;

        subjects.forEach(subject => {
            if (subject.total > 0 && subject.credits > 0) {
                totalGradePoints += subject.gradePoints * subject.credits;
                totalCreds += subject.credits;
            }
        });

        const calculatedSGPA = totalCreds > 0 ? totalGradePoints / totalCreds : 0;
        setSgpa(Math.round(calculatedSGPA * 100) / 100);
        setTotalCredits(totalCreds);
    };

    const updateSubjectCredits = (subjectId: string, newCredits: number) => {
        if (!parsedResult) return;

        const updatedSubjects = parsedResult.subjects.map(subject =>
            subject.id === subjectId ? { ...subject, credits: newCredits } : subject
        );

        setParsedResult({
            ...parsedResult,
            subjects: updatedSubjects
        });
    };

    useEffect(() => {
        if (parsedResult?.subjects) {
            calculateSGPA(parsedResult.subjects);
        }
    }, [parsedResult]);

    const downloadOriginalHtml = () => {
        if (!rawHtml) return;

        // Inject <base> so all relative CSS/images resolve from the VTU server,
        // then open in a new tab and trigger print dialog → user saves as PDF.
        const patchedHtml = rawHtml.replace(
            /<head([^>]*)>/i,
            `<head$1>\n  <base href="https://results.vtu.ac.in/">\n  <script>window.onload=function(){window.print();}<\/script>`
        );

        const blob = new Blob([patchedHtml], { type: 'text/html;charset=utf-8' });
        const blobUrl = URL.createObjectURL(blob);
        const newTab = window.open(blobUrl, '_blank');
        // Revoke after a delay to allow the tab to load
        if (newTab) setTimeout(() => URL.revokeObjectURL(blobUrl), 30000);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setParsedResult(null);
        setAllResults([]);
        setSecondResult(null);
        setRawHtml(null);
        setIsComparing(false);
        setFetchingContext('main');

        if (!url.trim() || !url.trim().startsWith('http')) {
            setError('Please enter a valid working official VTU result URL (starting with http/https).');
            setLoading(false);
            return;
        }

        if (!usn.trim()) {
            setError('Please enter a valid USN.');
            setLoading(false);
            return;
        }

        try {
            const payload = { usn: usn.trim().toUpperCase(), index_url: url.trim() };
            const response = await fetch('/api/single-post', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                let errorMessage = `API Error: ${response.statusText}`;
                try {
                    const errorData = await response.json();
                    if (errorData.detail) errorMessage = errorData.detail;
                } catch { /* ignore */ }
                throw new Error(errorMessage);
            }

            const data = await response.json();

            if (data.stage === 'captcha') {
                setCaptchaData({
                    image: data.captcha_image_data_url,
                    token: data.token,
                    cookies: data.cookies,
                    usn: usn.trim().toUpperCase(),
                    url: url.trim(),
                });
                setLoading(false);
                return;
            }

            const results: ParsedResult[] = [];
            let firstRawHtml: string | null = null;
            Object.keys(data).forEach(key => {
                const html = data[key];
                if (typeof html === 'string' && html.length > 100) {
                    if (!firstRawHtml) firstRawHtml = html;
                    const parsed = parseHTMLResult(html, usn);
                    if (parsed && parsed.subjects.length > 0) {
                        results.push(parsed);
                    }
                }
            });

            if (results.length === 0) {
                throw new Error('No valid marks found. Please verify your USN or try again later.');
            }

            if (firstRawHtml) setRawHtml(firstRawHtml);
            results.sort((a, b) => a.usn.localeCompare(b.usn));
            setAllResults(results);

            if (results.length === 1) {
                setParsedResult(results[0]);
            }
        } catch (err: any) {
            setError(err.message || 'Failed to connect to VTU results checker.');
        } finally {
            setLoading(false);
        }
    };

    const handleCompareSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!comparisonUsn.trim() || !url) return;

        setLoading(true);
        setError(null);
        setFetchingContext('comparison');

        try {
            const payload = { usn: comparisonUsn.trim().toUpperCase(), index_url: url.trim() };
            const response = await fetch('/api/single-post', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                let errorMessage = `API Error: ${response.statusText}`;
                try {
                    const errorData = await response.json();
                    if (errorData.detail) errorMessage = errorData.detail;
                } catch { /* ignore */ }
                throw new Error(errorMessage);
            }

            const data = await response.json();

            if (data.stage === 'captcha') {
                setCaptchaData({
                    image: data.captcha_image_data_url,
                    token: data.token,
                    cookies: data.cookies,
                    usn: comparisonUsn.trim().toUpperCase(),
                    url: url.trim(),
                });
                setLoading(false);
                return;
            }

            const results: ParsedResult[] = [];
            Object.keys(data).forEach(key => {
                const html = data[key];
                if (typeof html === 'string' && html.length > 100) {
                    const parsed = parseHTMLResult(html, key);
                    if (parsed && parsed.subjects.length > 0) results.push(parsed);
                }
            });

            if (results.length === 0) throw new Error('No valid results found for comparison.');
            setSecondResult(results[0]);
            setIsComparing(false);
        } catch (err: any) {
            setError(err.message || 'Failed to fetch comparison results.');
        } finally {
            setLoading(false);
        }
    };

    const handleCaptchaSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!captchaData || !captchaText.trim()) return;

        setLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/single-post', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    usn: captchaData.usn,
                    index_url: captchaData.url,
                    token: captchaData.token,
                    cookies: captchaData.cookies,
                    captcha_code: captchaText.trim()
                }),
            });

            if (!response.ok) {
                let errorMessage = `API Error: ${response.statusText}`;
                try {
                    const errorData = await response.json();
                    if (errorData.detail) errorMessage = errorData.detail;
                } catch { /* ignore */ }
                throw new Error(errorMessage);
            }

            const data = await response.json();

            if (data.stage === 'captcha') {
                setCaptchaData({
                    ...captchaData,
                    image: data.captcha_image_data_url,
                    token: data.token,
                    cookies: data.cookies,
                });
                setCaptchaText('');
                throw new Error('Invalid Captcha. Please try again.');
            }

            setCaptchaData(null);
            setCaptchaText('');

            const results: ParsedResult[] = [];
            let firstRawHtml: string | null = null;
            Object.keys(data).forEach(key => {
                const html = data[key];
                if (typeof html === 'string' && html.length > 100) {
                    if (!firstRawHtml) firstRawHtml = html;
                    const parsed = parseHTMLResult(html, captchaData.usn);
                    if (parsed && parsed.subjects.length > 0) {
                        results.push(parsed);
                    }
                }
            });

            if (results.length === 0) {
                throw new Error('No valid marks found.');
            }

            if (fetchingContext === 'main') {
                if (firstRawHtml) setRawHtml(firstRawHtml);
                results.sort((a, b) => a.usn.localeCompare(b.usn));
                setAllResults(results);
                if (results.length === 1) {
                    setParsedResult(results[0]);
                }
            } else {
                setSecondResult(results[0]);
                setIsComparing(false);
            }
        } catch (err: any) {
            setError(err.message || 'Failed to verify captcha.');
        } finally {
            setLoading(false);
        }
    };

    const getGradeDescription = (s: number) => {
        if (s >= 9) return 'Outstanding Performance';
        if (s >= 8) return 'Excellent Performance';
        if (s >= 7) return 'Very Good';
        if (s >= 6) return 'Good';
        if (s >= 5) return 'Average';
        return 'Below Average';
    };

    const getSGPAColor = (s: number) => {
        if (s >= 9) return 'from-emerald-500 to-green-600';
        if (s >= 8) return 'from-blue-500 to-indigo-600';
        if (s >= 7) return 'from-purple-500 to-pink-600';
        if (s >= 6) return 'from-yellow-500 to-orange-600';
        if (s >= 5) return 'from-orange-500 to-red-600';
        return 'from-red-500 to-red-700';
    };

    const calculateSGPAValue = (subjects: Subject[]) => {
        let totalGradePoints = 0;
        let totalCreds = 0;
        subjects.forEach(subject => {
            if (subject.total > 0 && subject.credits > 0) {
                totalGradePoints += subject.gradePoints * subject.credits;
                totalCreds += subject.credits;
            }
        });
        return totalCreds > 0 ? (totalGradePoints / totalCreds) : 0;
    };

    return (
        <div className="space-y-6">
            {/* Loading Overlay */}
            {loading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center space-y-4 shadow-2xl border border-slate-100">
                        <div className="w-12 h-12 border-4 border-slate-200 border-t-indigo-600 rounded-full animate-spin mx-auto"></div>
                        <h3 className="text-xl font-bold text-slate-900">Querying VTU Results...</h3>
                        <p className="text-sm text-slate-600">Please wait while we query and parse the marks data.</p>
                    </div>
                </div>
            )}

            {/* Back Link */}
            <div className="mb-2">
                <Link href="/vtu-results" className="inline-flex items-center text-sm font-bold text-indigo-600 hover:text-indigo-800 gap-1.5 transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back to Results Directory
                </Link>
            </div>

            {/* Exam Title Header */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <h1 className="font-outfit text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2 leading-tight">
                    {exam.title} Results Portal
                </h1>
                <p className="text-slate-650 text-sm font-semibold leading-relaxed">
                    Quick, unofficial tool to retrieve, parse, and calculate SGPA for the {exam.program} {exam.session} {exam.year} semester assessments.
                </p>
            </div>

            {/* Main Action Form / Results Container */}
            <div className="space-y-6">
                {!captchaData && !parsedResult && allResults.length === 0 && (
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Configuration details / Custom URL Input */}
                            {exam.id === 'custom' ? (
                                <div className="space-y-2">
                                    <Label htmlFor="vtu-url" className="block text-sm font-bold text-slate-700">
                                        VTU Results Page URL
                                    </Label>
                                    <Input
                                        id="vtu-url"
                                        type="url"
                                        value={url}
                                        onChange={e => setUrl(e.target.value)}
                                        placeholder="e.g., https://results.vtu.ac.in/MJ26cbcs/index.php"
                                        required
                                        className="h-12 text-sm rounded-xl border-slate-300 bg-white"
                                    />
                                    <p className="text-slate-500 text-[11px] font-medium leading-normal">
                                        Paste the exact, working URL of the active VTU results page. Example: <code>https://results.vtu.ac.in/MJ26cbcs/index.php</code>
                                    </p>
                                </div>
                            ) : (
                                <div className="p-4 bg-slate-50 rounded-xl border border-slate-150 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <Label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Result Type</Label>
                                        {availableTypes.length > 1 ? (
                                            <Select value={selectedType} onValueChange={(val) => {
                                                setSelectedType(val);
                                                setSelectedScheme('');
                                            }}>
                                                <SelectTrigger className="bg-white border-slate-300">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {availableTypes.map(t => (
                                                        <SelectItem key={t} value={t}>{t}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        ) : (
                                            <div className="text-sm font-bold text-slate-800 bg-white border border-slate-205 px-3 py-2 rounded-md">
                                                {selectedType}
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <Label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Scheme</Label>
                                        {availableSchemes.length > 1 ? (
                                            <Select value={selectedScheme} onValueChange={setSelectedScheme}>
                                                <SelectTrigger className="bg-white border-slate-300">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {availableSchemes.map(s => (
                                                        <SelectItem key={s} value={s}>{s}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        ) : (
                                            <div className="text-sm font-bold text-slate-800 bg-white border border-slate-205 px-3 py-2 rounded-md">
                                                {selectedScheme}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* USN Entry */}
                            <div>
                                <Label htmlFor="usn" className="block text-sm font-bold text-slate-700 mb-2">
                                    University Seat Number (USN)
                                </Label>
                                <Input
                                    id="usn"
                                    type="text"
                                    value={usn}
                                    onChange={e => setUsn(e.target.value.toUpperCase())}
                                    placeholder="e.g., 1AM21CS202"
                                    required
                                    pattern="^[1-4][A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{3}$"
                                    title="Enter a valid 10-digit VTU USN (e.g. 1AM21CS202)"
                                    className="h-12 uppercase text-lg rounded-xl border-slate-300"
                                />
                            </div>

                            <Button type="submit" className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-base rounded-xl transition-all shadow-sm">
                                Fetch Exam Results
                            </Button>

                            {error && (
                                <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm font-semibold">
                                    {error}
                                </div>
                            )}
                        </form>
                    </div>
                )}

                {/* Captcha Security Panel */}
                {captchaData && (
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 max-w-md mx-auto">
                        <div className="text-center mb-6">
                            <h2 className="text-2xl font-bold text-slate-900">Enter Security Code</h2>
                            <p className="text-slate-500 text-xs mt-1.5 font-medium">Please enter the letters and digits shown in the captcha below.</p>
                        </div>
                        <form onSubmit={handleCaptchaSubmit} className="space-y-4">
                            <div className="flex justify-center bg-slate-50 p-4 rounded-xl border border-slate-200">
                                <img src={captchaData.image} alt="Captcha Code" className="max-w-full h-auto rounded" />
                            </div>
                            <div>
                                <Label htmlFor="captcha" className="block text-sm font-semibold text-slate-700 mb-2">
                                    Captcha Code
                                </Label>
                                <Input
                                    id="captcha"
                                    type="text"
                                    value={captchaText}
                                    onChange={e => setCaptchaText(e.target.value)}
                                    placeholder="Type the captcha characters"
                                    required
                                    autoComplete="off"
                                    className="h-11 text-center font-mono text-lg tracking-widest rounded-xl border-slate-300"
                                />
                            </div>

                            <div className="flex gap-4 pt-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="flex-1 rounded-xl"
                                    onClick={() => {
                                        setCaptchaData(null);
                                        setCaptchaText('');
                                        setError(null);
                                    }}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white flex-1 rounded-xl font-bold"
                                    disabled={!captchaText.trim()}
                                >
                                    Verify Captcha
                                </Button>
                            </div>

                            {error && (
                                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-750 text-xs font-semibold">
                                    {error}
                                </div>
                            )}
                        </form>
                    </div>
                )}

                {/* Results Display */}
                {!captchaData && parsedResult && !secondResult && !isComparing && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 print-container">
                        {/* Student Header */}
                        <div className="bg-white rounded-2xl p-6 border border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
                            <div className="space-y-1 text-center md:text-left">
                                <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded-md uppercase tracking-wider no-print">Parsed Scorecard</span>
                                <h2 className="text-2xl font-bold text-slate-900">{parsedResult.studentName}</h2>
                                <p className="text-slate-500 text-xs md:text-sm font-semibold">USN: <span className="font-mono">{parsedResult.usn}</span> | Semester: {parsedResult.semester}</p>
                            </div>
                            <div className="flex gap-3 no-print">
                                <Button variant="outline" size="sm" className="rounded-xl border-slate-250 font-bold flex items-center gap-1.5" onClick={downloadOriginalHtml} disabled={!rawHtml}>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                                    </svg>
                                    Download Original
                                </Button>
                                <Button variant="outline" size="sm" className="rounded-xl border-slate-250 font-bold" onClick={() => setIsComparing(true)}>
                                    Compare Scores
                                </Button>
                                <Button variant="default" size="sm" className="bg-indigo-600 hover:bg-indigo-700 rounded-xl text-white font-bold" onClick={() => {
                                    setParsedResult(null);
                                    setAllResults([]);
                                    setUsn('');
                                }}>
                                    New Search
                                </Button>
                            </div>
                        </div>

                        {/* Subjects and SGPA grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 space-y-6">
                                <Card className="bg-white border-slate-200/80 shadow-sm overflow-hidden rounded-2xl">
                                    <CardHeader className="border-b border-slate-100">
                                        <CardTitle className="text-base font-bold flex items-center gap-2">
                                            <GraduationCap className="w-5 h-5 text-indigo-650" /> Subject Grades
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-0">
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-xs md:text-sm text-left">
                                                <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-700 font-bold">
                                                    <tr>
                                                        <th className="px-4 py-3">Code</th>
                                                        <th className="px-4 py-3">Subject Name</th>
                                                        <th className="px-4 py-3 text-center">Int</th>
                                                        <th className="px-4 py-3 text-center">Ext</th>
                                                        <th className="px-4 py-3 text-center">Total</th>
                                                        <th className="px-4 py-3 text-center">Grade</th>
                                                        <th className="px-4 py-3 text-center font-mono">GP</th>
                                                        <th className="px-4 py-3 text-center min-w-[90px]">Credits</th>
                                                        <th className="px-4 py-3 text-center">Res</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-slate-100 text-slate-650 font-medium">
                                                    {parsedResult.subjects.map(subject => (
                                                        <tr key={subject.id} className="hover:bg-slate-50/50">
                                                            <td className="px-4 py-3 font-mono font-bold text-slate-800">{subject.code}</td>
                                                            <td className="px-4 py-3 text-slate-600 text-xs">{subject.name}</td>
                                                            <td className="px-4 py-3 text-center">{subject.internal}</td>
                                                            <td className="px-4 py-3 text-center">{subject.external}</td>
                                                            <td className="px-4 py-3 text-center font-extrabold text-slate-900">{subject.total}</td>
                                                            <td className="px-4 py-3 text-center font-bold text-indigo-600">{subject.grade}</td>
                                                            <td className="px-4 py-3 text-center font-mono">{subject.gradePoints}</td>
                                                            <td className="px-4 py-3 text-center">
                                                                <Select
                                                                    value={subject.credits.toString()}
                                                                    onValueChange={(value) => updateSubjectCredits(subject.id, Number.parseInt(value, 10))}
                                                                >
                                                                    <SelectTrigger className="h-8 w-16 mx-auto bg-white border-slate-250 text-[11px] rounded-md font-bold">
                                                                        <SelectValue />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        {Array.from({ length: 11 }).map((_, i) => (
                                                                            <SelectItem key={i} value={i.toString()}>{i}</SelectItem>
                                                                        ))}
                                                                    </SelectContent>
                                                                </Select>
                                                            </td>
                                                            <td className="px-4 py-3 text-center">
                                                                <span className={`px-2 py-0.5 rounded text-[10px] font-black ${subject.result === 'P' ? 'bg-green-150 text-green-800' : 'bg-red-150 text-red-800'}`}>
                                                                    {subject.result}
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            <div className="space-y-6">
                                <Card className={`bg-gradient-to-br ${getSGPAColor(sgpa)}/10 border-2 border-dashed border-slate-200/80`}>
                                    <CardHeader className="text-center pb-1">
                                        <CardTitle className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Estimated SGPA</CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-center pb-6">
                                        <div className={`text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r ${getSGPAColor(sgpa)} mb-1`}>
                                            {sgpa.toFixed(2)}
                                        </div>
                                        <p className="text-[10px] font-bold text-slate-500 mb-4">{getGradeDescription(sgpa)}</p>
                                        <div className="border-t border-slate-200/60 pt-4 grid grid-cols-2 gap-2 text-left font-semibold">
                                            <div>
                                                <span className="text-[9px] text-slate-450 font-bold uppercase block">Credits</span>
                                                <span className="text-sm font-bold text-slate-800">{totalCredits}</span>
                                            </div>
                                            <div>
                                                <span className="text-[9px] text-slate-455 font-bold uppercase block">Percentage</span>
                                                <span className="text-sm font-bold text-slate-800 font-mono">{(sgpa * 10).toFixed(1)}%</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="bg-white border-slate-200/85 shadow-sm">
                                    <CardHeader className="pb-3">
                                        <CardTitle className="text-xs flex items-center gap-1.5"><Target className="w-4 h-4 text-indigo-600" /> Class Awarded</CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-xs font-bold text-slate-700">
                                        {sgpa >= 7.75 ? 'First Class with Distinction' : sgpa >= 6.75 ? 'First Class' : sgpa >= 5.0 ? 'Second Class' : 'Pass'}
                                    </CardContent>
                                </Card>
                            </div>
                        </div>

                        <div className="no-print">
                            <RevaluationEstimate subjects={parsedResult.subjects} sgpa={sgpa} totalCredits={totalCredits} />
                        </div>
                    </div>
                )}

                {/* Peer Comparison Form */}
                {!captchaData && isComparing && parsedResult && (
                    <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm max-w-md mx-auto">
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Compare Results</h3>
                        <p className="text-slate-500 text-xs mb-4 font-semibold">Input another USN to pull results and display them side-by-side with {parsedResult.studentName}.</p>
                        <form onSubmit={handleCompareSubmit} className="space-y-4">
                            <div>
                                <Label htmlFor="compUsn" className="block text-sm font-bold text-slate-700 mb-2">Second USN</Label>
                                <Input
                                    id="compUsn"
                                    type="text"
                                    value={comparisonUsn}
                                    onChange={e => setComparisonUsn(e.target.value.toUpperCase())}
                                    placeholder="e.g., 1AM21CS040"
                                    required
                                    className="h-11 uppercase rounded-xl border-slate-300"
                                />
                            </div>
                            <div className="flex gap-4 pt-2">
                                <Button type="button" variant="outline" className="flex-1 rounded-xl" onClick={() => setIsComparing(false)}>Cancel</Button>
                                <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white flex-1 rounded-xl font-bold">Compare</Button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Comparison Display */}
                {!captchaData && secondResult && parsedResult && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex justify-between items-center">
                            <h3 className="text-xl font-bold text-slate-900">Side-by-Side Comparison</h3>
                            <Button variant="outline" className="rounded-xl border-slate-200 font-bold" onClick={() => setSecondResult(null)}>Close Comparison</Button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <Card className="bg-white p-6 border border-slate-200 rounded-2xl">
                                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{parsedResult.usn}</h4>
                                <p className="text-base font-bold text-slate-800">{parsedResult.studentName}</p>
                                <div className="text-2xl font-black text-indigo-600 mt-2">{calculateSGPAValue(parsedResult.subjects).toFixed(2)} SGPA</div>
                            </Card>
                            <Card className="bg-white p-6 border border-slate-200 rounded-2xl">
                                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{secondResult.usn}</h4>
                                <p className="text-base font-bold text-slate-800">{secondResult.studentName}</p>
                                <div className="text-2xl font-black text-emerald-600 mt-2">{calculateSGPAValue(secondResult.subjects).toFixed(2)} SGPA</div>
                            </Card>
                        </div>

                        <Card className="bg-white border border-slate-200 shadow-sm overflow-hidden rounded-2xl">
                            <CardHeader className="border-b border-slate-100">
                                <CardTitle className="text-base font-bold">Marks Comparison Matrix</CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-xs md:text-sm text-left">
                                        <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
                                            <tr>
                                                <th className="px-4 py-3">Code</th>
                                                <th className="px-4 py-3">Subject Name</th>
                                                <th className="px-4 py-3 text-center bg-indigo-50/20">{parsedResult.usn}</th>
                                                <th className="px-4 py-3 text-center bg-emerald-50/20">{secondResult.usn}</th>
                                                <th className="px-4 py-3 text-center">Difference</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100 text-slate-650 font-medium">
                                            {Array.from(new Set([...parsedResult.subjects.map(s => s.code), ...secondResult.subjects.map(s => s.code)])).map(code => {
                                                const s1 = parsedResult.subjects.find(s => s.code === code);
                                                const s2 = secondResult.subjects.find(s => s.code === code);
                                                const name = s1?.name || s2?.name || code;
                                                const diff = (s1?.total || 0) - (s2?.total || 0);

                                                return (
                                                    <tr key={code} className="hover:bg-slate-50/50">
                                                        <td className="px-4 py-3 font-mono font-bold text-slate-800">{code}</td>
                                                        <td className="px-4 py-3 text-slate-600 text-xs">{name}</td>
                                                        <td className="px-4 py-3 text-center bg-indigo-50/10 font-bold">{s1?.total || '-'}</td>
                                                        <td className="px-4 py-3 text-center bg-emerald-50/10 font-bold">{s2?.total || '-'}</td>
                                                        <td className={`px-4 py-3 text-center font-extrabold ${diff > 0 ? 'text-indigo-600' : diff < 0 ? 'text-red-500' : 'text-slate-400'}`}>
                                                            {diff > 0 ? `+${diff}` : diff < 0 ? diff : '0'}
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>

            {/* Rich Informational Copy / FAQs to prevent 'Low Value Content' rejection */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm space-y-8 prose prose-slate max-w-none text-slate-650">
                <section className="space-y-3">
                    <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-indigo-650" />
                        Checking {exam.title} Marks Online
                    </h2>
                    <p className="text-sm leading-relaxed font-semibold">
                        This dedicated search page allows you to retrieve marks for the <strong>{exam.title}</strong> directly from the official servers of Visvesvaraya Technological University (VTU), Belagavi. 
                        VTU students who registered for the odd/even semester examinations in the {exam.year} academic cycle can check their internal assessments, external marks, final grades, and pass status.
                    </p>
                    <p className="text-sm leading-relaxed font-semibold">
                        Once you enter your 10-character USN and successfully submit the captcha verify form, our systems will process the backend payload. 
                        Instead of downloading a heavy, hard-to-read official HTML report, our interface parses the raw tables into a clean layout. 
                        This enables quick grade estimation, mobile viewing, and immediate calculation of your SGPA.
                    </p>
                </section>

                <section className="space-y-3">
                    <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                        <HelpCircle className="w-5 h-5 text-indigo-650" />
                        Frequently Asked Questions (FAQ) for {exam.title}
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm font-semibold">
                        <div className="space-y-2">
                            <h4 className="font-bold text-slate-800">What does it mean if my subject result shows "F"?</h4>
                            <p className="text-slate-500 leading-relaxed">
                                The "F" result indicates that you scored below the minimum pass threshold for that subject. 
                                In VTU external examinations, you must secure a minimum of 35% in the theory examination and a total of 40% combined (internal + external) to clear the subject.
                            </p>
                        </div>
                        
                        <div className="space-y-2">
                            <h4 className="font-bold text-slate-800">How do I submit for revaluation for {exam.title}?</h4>
                            <p className="text-slate-500 leading-relaxed">
                                If you believe there was a counting error or you performed better than the grade reflects, you can apply for VTU Revaluation. 
                                Our <strong>Revaluation Estimate</strong> panel ranks your subjects based on how close you are to the next letter grade to help you decide.
                            </p>
                        </div>

                        <div className="space-y-2">
                            <h4 className="font-bold text-slate-800">Why does it ask for a captcha?</h4>
                            <p className="text-slate-500 leading-relaxed">
                                The official VTU result page requires captcha verification to prevent DDoS attacks and spam scrapers. 
                                We pass your captcha code input directly to the official gateway to authenticate and scrape your result.
                            </p>
                        </div>

                        <div className="space-y-2">
                            <h4 className="font-bold text-slate-800">Where can I see my CGPA?</h4>
                            <p className="text-slate-500 leading-relaxed">
                                To calculate your cumulative average across multiple semesters, check out our standalone <Link href="/vtu-sgpa-cgpa-calculator" className="text-indigo-600 underline font-semibold">VTU SGPA/CGPA Calculator</Link> tool.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="pt-6 border-t border-slate-100 text-xs text-slate-450 italic font-semibold">
                    Disclaimer: This results tool connects to VTU's official servers to retrieve information. 
                    We do not edit, modify, or cache student grade details. In case of any discrepancies or grade corrections, 
                    always rely on physical grade-sheets issued by the university registrar's office.
                </section>
            </div>
        </div>
    );
}
