'use client';

import React, { useState, useEffect } from 'react';
import { Calculator, GraduationCap, Award, Target, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { VTU_RESULTS_DATA, ExamEvent, ExamLink } from '@/lib/vtu-data';
import { RevaluationEstimate } from '@/components/RevaluationEstimate';

const API_URL = "http://localhost:8000/single-post";

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

        // Extract student name
        const nameRegex = /Student Name[\s\S]*?<td[^>]*>[\s\S]*?:\s*[\s\S]*?<\/b>\s*([^<]+)<\/td>/i;
        const nameMatch = nameRegex.exec(html);
        const studentName = nameMatch ? nameMatch[1].trim() : 'Unknown';

        // Extract USN
        const usnRegex = /University Seat Number[\s\S]*?<td[^>]*>[\s\S]*?:\s*[\s\S]*?<\/b>\s*([^<]+)<\/td>/i;
        const usnMatch = usnRegex.exec(html);
        let usn = usnMatch ? usnMatch[1].trim() : fallbackUsn;

        // Use fallback if extracted USN is empty or too short
        if (!usn || usn.length < 5) usn = fallbackUsn;


        // Extract semester
        const semesterRegex = /Semester\s*:\s*(\d+)/i;
        const semesterMatch = semesterRegex.exec(html);
        const semester = semesterMatch ? Number.parseInt(semesterMatch[1], 10) : 0;

        // Extract subjects from divTable
        const subjects: Subject[] = [];
        const tableBodies = doc.querySelectorAll('.divTableBody');

        // Find the main result table (usually the first one with subject data)
        tableBodies.forEach((tableBody) => {
            const rows = tableBody.querySelectorAll('.divTableRow');

            rows.forEach((row) => {
                // Skip header row (check if it contains "Subject Code")
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

                    // Only process if we have a valid code and name
                    if (code && name && code.length > 0 && name.length > 0) {
                        // Calculate percentage (assuming max is 100, but some subjects have 200 max)
                        const maxMarks = total > 100 ? 200 : 100;
                        const percentage = maxMarks > 0 ? (total / maxMarks) * 100 : 0;
                        const gradeData = getGradeFromMarks(percentage);

                        // Estimate credits (default to 4, can be adjusted)
                        const credits = 0;

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

        return {
            usn,
            studentName,
            semester,
            subjects
        };
    } catch (error) {
        console.error('Error parsing HTML:', error);
        return null;
    }
};

const VTUResults = () => {
    // Core State
    const [usn, setUsn] = useState('');
    const [url, setUrl] = useState('');
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

    // Stats State
    const [sgpa, setSgpa] = useState<number>(0);
    const [totalCredits, setTotalCredits] = useState<number>(0);

    // Search Mode Option removed

    // Hierarchical Dropdown State
    const [selectedYear, setSelectedYear] = useState<string>('');
    const [selectedExamId, setSelectedExamId] = useState<string>('');
    const [selectedType, setSelectedType] = useState<string>('');
    const [selectedScheme, setSelectedScheme] = useState<string>('');
    const [showManualUrl, setShowManualUrl] = useState(false);

    // Filtered Options
    const uniqueYears = Array.from(new Set(VTU_RESULTS_DATA.map(d => d.year))).sort().reverse();

    // Derived state for available exams based on year
    const availableExams = VTU_RESULTS_DATA.filter(e => e.year === selectedYear);

    // Update URL when selections change
    useEffect(() => {
        if (selectedExamId && selectedType && selectedScheme) {
            const exam = VTU_RESULTS_DATA.find(e => e.id === selectedExamId);
            if (exam) {
                const link = exam.links.find(l => l.type === selectedType && l.scheme === selectedScheme);
                if (link) {
                    setUrl(link.url);
                }
            }
        }
    }, [selectedExamId, selectedType, selectedScheme]);

    // Reset downstream selections when upstream changes
    const handleYearChange = (year: string) => {
        setSelectedYear(year);
        setSelectedExamId('');
        setSelectedType('');
        setSelectedScheme('');
        setUrl('');
    };

    const handleExamChange = (examId: string) => {
        setSelectedExamId(examId);
        setSelectedType('');
        setSelectedScheme('');

        // Auto-select type if only one exists
        const exam = VTU_RESULTS_DATA.find(e => e.id === examId);
        if (exam) {
            const types = Array.from(new Set(exam.links.map(l => l.type)));
            if (types.length === 1) setSelectedType(types[0]);
        }
    };

    const getAvailableTypes = () => {
        const exam = VTU_RESULTS_DATA.find(e => e.id === selectedExamId);
        if (!exam) return [];
        return Array.from(new Set(exam.links.map(l => l.type)));
    };

    const getAvailableSchemes = () => {
        const exam = VTU_RESULTS_DATA.find(e => e.id === selectedExamId);
        if (!exam) return [];
        return Array.from(new Set(exam.links.filter(l => l.type === selectedType).map(l => l.scheme)));
    };

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setParsedResult(null);
        setAllResults([]);
        setSecondResult(null);
        setIsComparing(false);
        setFetchingContext('main');

        if (!url.trim()) {
            setError('Please enter the Result URL');
            setLoading(false);
            return;
        }

        if (!usn.trim()) {
            setError('Please enter USN');
            setLoading(false);
            return;
        }

        try {
            const endpoint = '/api/single-post';

            const payload = { usn: usn.trim().toUpperCase(), index_url: url.trim() };

            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                let errorMessage = `HTTP error! status: ${response.status}`;
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

            // The API now returns { "USN": "HTML" } or just { ... }
            const results: ParsedResult[] = [];

            Object.keys(data).forEach(key => {
                const html = data[key];
                if (typeof html === 'string' && html.length > 100) {
                    // Determine best USN to use as fallback/primary
                    let currentUsn = key;
                    // This handles cases where the API might return generic keys like "html"
                    if (usn) {
                        currentUsn = usn;
                    }

                    const parsed = parseHTMLResult(html, currentUsn);
                    if (parsed && parsed.subjects.length > 0) {
                        results.push(parsed);
                    }
                }
            });

            if (results.length === 0) {
                throw new Error('No valid results found. Please check the USNs and URL.');
            }

            results.sort((a, b) => a.usn.localeCompare(b.usn));
            setAllResults(results);

            if (results.length === 1) {
                setParsedResult(results[0]);
            }

        } catch (err: any) {
            setError(err.message || 'Failed to fetch results.');
            console.error('Error fetching results:', err);
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
                let errorMessage = `HTTP error! status: ${response.status}`;
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
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    usn: captchaData.usn,
                    index_url: captchaData.url,
                    token: captchaData.token,
                    cookies: captchaData.cookies,
                    captcha_code: captchaText.trim()
                }),
            });

            if (!response.ok) {
                let errorMessage = `HTTP error! status: ${response.status}`;
                try {
                    const errorData = await response.json();
                    if (errorData.detail) errorMessage = errorData.detail;
                } catch { /* ignore */ }
                throw new Error(errorMessage);
            }

            const data = await response.json();

            if (data.stage === 'captcha') {
                // Captcha was rejected or asked again
                setCaptchaData({
                    ...captchaData,
                    image: data.captcha_image_data_url,
                    token: data.token,
                    cookies: data.cookies,
                });
                setCaptchaText('');
                throw new Error('Invalid Captcha. Please try again.');
            }

            // Clear captcha on success
            setCaptchaData(null);
            setCaptchaText('');

            const results: ParsedResult[] = [];
            Object.keys(data).forEach(key => {
                const html = data[key];
                if (typeof html === 'string' && html.length > 100) {
                    let currentUsn = key;
                    if (usn) {
                        currentUsn = usn;
                    }
                    const parsed = parseHTMLResult(html, currentUsn);
                    if (parsed && parsed.subjects.length > 0) {
                        results.push(parsed);
                    }
                }
            });

            if (results.length === 0) {
                throw new Error('No valid results found. Please check the USNs and URL.');
            }

            if (fetchingContext === 'main') {
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
            setError(err.message || 'Failed to fetch results.');
        } finally {
            setLoading(false);
        }
    };

    const getGradeDescription = (sgpa: number) => {
        if (sgpa >= 9) return 'Outstanding Performance';
        if (sgpa >= 8) return 'Excellent Performance';
        if (sgpa >= 7) return 'Very Good Performance';
        if (sgpa >= 6) return 'Good Performance';
        if (sgpa >= 5) return 'Average Performance';
        return 'Below Average Performance';
    };

    const getSGPAColor = (sgpa: number) => {
        if (sgpa >= 9) return 'from-emerald-500 to-green-600';
        if (sgpa >= 8) return 'from-blue-500 to-indigo-600';
        if (sgpa >= 7) return 'from-purple-500 to-pink-600';
        if (sgpa >= 6) return 'from-yellow-500 to-orange-600';
        if (sgpa >= 5) return 'from-orange-500 to-red-600';
        return 'from-red-500 to-red-700';
    };

    // Helper to calculate SGPA for the table view without setting state
    const calculateSGPAValue = (subjects: Subject[]) => {
        let totalGradePoints = 0;
        let totalCreds = 0;
        subjects.forEach(subject => {
            if (subject.total > 0 && subject.credits > 0) { // Note: Credits might be 0 initially if scraping doesn't get them
                // For estimation, if credits are 0, we can't calc accurately. 
                // But let's use what we have.
                totalGradePoints += subject.gradePoints * subject.credits;
                totalCreds += subject.credits;
            }
        });
        return totalCreds > 0 ? (totalGradePoints / totalCreds) : 0;
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Loading Modal */}
            {loading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl p-8 mx-4 max-w-md w-full border-2 border-blue-100 animate-in fade-in zoom-in duration-300">
                        <div className="flex flex-col items-center text-center space-y-6">
                            {/* Animated Spinner */}
                            <div className="relative">
                                <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                                <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-blue-400 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
                            </div>

                            {/* Loading Text */}
                            <div className="space-y-3">
                                <h3 className="text-xl font-bold text-gray-900">
                                    Fetching Your Results...
                                </h3>
                                <div className="space-y-2">
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        This may take some time depending on the number of records.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Results Form Section */}
            <div id="results-form" className="py-12 bg-white">
                <div className="container mx-auto px-4 max-w-6xl">
                    {/* VTU Results Form */}
                    {!captchaData && !parsedResult && allResults.length === 0 && (
                        <div className="bg-gray-50 rounded-2xl p-8 shadow-lg border border-gray-200">
                            <div className="text-center mb-6">
                                <h2 className="text-3xl font-bold text-gray-900">Check Your VTU Results</h2>
                                <p className="text-gray-600 mt-2">Enter your USN to get instant results and SGPA calculation</p>
                            </div>
                            <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-2xl mx-auto">
                                <div className="space-y-4 bg-gray-50 p-4 rounded-lg border border-gray-100">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <Label className="block text-sm font-medium text-gray-700 mb-2">Academic Year</Label>
                                            <Select value={selectedYear} onValueChange={handleYearChange}>
                                                <SelectTrigger className="bg-white border-gray-300">
                                                    <SelectValue placeholder="Select Year" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {uniqueYears.map((year) => (
                                                        <SelectItem key={year} value={year}>{year}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div>
                                            <Label className="block text-sm font-medium text-gray-700 mb-2">Exam Event</Label>
                                            <Select value={selectedExamId} onValueChange={handleExamChange} disabled={!selectedYear}>
                                                <SelectTrigger className="bg-white border-gray-300">
                                                    <SelectValue placeholder="Select Exam" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {availableExams.map((exam) => (
                                                        <SelectItem key={exam.id} value={exam.id}>
                                                            {exam.title}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    {selectedExamId && (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in slide-in-from-top-2 duration-300">
                                            <div>
                                                <Label className="block text-sm font-medium text-gray-700 mb-2">Result Type</Label>
                                                <Select value={selectedType} onValueChange={(val) => {
                                                    setSelectedType(val);
                                                    setSelectedScheme('');
                                                }}>
                                                    <SelectTrigger className="bg-white border-gray-300">
                                                        <SelectValue placeholder="Regular / Reval" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {getAvailableTypes().map((type) => (
                                                            <SelectItem key={type} value={type}>{type}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div>
                                                <Label className="block text-sm font-medium text-gray-700 mb-2">Scheme</Label>
                                                <Select value={selectedScheme} onValueChange={setSelectedScheme} disabled={!selectedType}>
                                                    <SelectTrigger className="bg-white border-gray-300">
                                                        <SelectValue placeholder="CBCS / Non-CBCS" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {getAvailableSchemes().map((scheme) => (
                                                            <SelectItem key={scheme} value={scheme}>{scheme}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                    )}

                                    <div>
                                        <div className="flex justify-between items-center mb-2">
                                            <Label htmlFor="url" className="block text-sm font-medium text-gray-700">
                                                Result URL
                                            </Label>
                                            <button
                                                type="button"
                                                onClick={() => setShowManualUrl(!showManualUrl)}
                                                className="text-xs text-blue-600 hover:text-blue-800 underline"
                                            >
                                                {showManualUrl ? "Hide Manual URL" : "Edit / View URL"}
                                            </button>
                                        </div>
                                        <div className={showManualUrl ? "block" : "hidden"}>
                                            <Input
                                                id="url"
                                                type="url"
                                                value={url}
                                                onChange={e => setUrl(e.target.value)}
                                                placeholder="https://results.vtu.ac.in/..."
                                                required={selectedScheme === '' && showManualUrl}
                                                className="bg-white text-gray-600 border-gray-300"
                                            />
                                        </div>
                                        {!showManualUrl && url && (
                                            <div className="text-xs text-gray-500 font-mono bg-gray-100 p-2 rounded truncate">
                                                {url}
                                            </div>
                                        )}
                                        {!showManualUrl && !url && (
                                            <div className="text-xs text-gray-400 italic">
                                                Select options above to generate link
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <Label htmlFor="usn" className="block text-sm font-medium text-gray-700 mb-2">
                                            USN (University Seat Number)
                                        </Label>
                                        <Input
                                            id="usn"
                                            type="text"
                                            value={usn}
                                            onChange={e => setUsn(e.target.value.toUpperCase())}
                                            placeholder="Enter your USN (e.g., 1AM21CS202)"
                                            required
                                            pattern="^[1-4][A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{3}$"
                                            title="Enter a valid VTU USN (e.g., 1AM21CS202)"
                                            className="uppercase"
                                        />
                                    </div>
                                </div>
                                <Button
                                    type="submit"
                                    className="bg-blue-600 hover:bg-blue-700 text-white"
                                    disabled={loading}
                                >
                                    {loading ? 'Fetching Results...' : 'Get Results'}
                                </Button>
                                {error && (
                                    <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
                                        {error}
                                    </div>
                                )}
                            </form>
                        </div>
                    )}

                    {/* Captcha Form */}
                    {captchaData && (
                        <div className="bg-gray-50 rounded-2xl p-8 shadow-lg border border-gray-200 max-w-md mx-auto">
                            <div className="text-center mb-6">
                                <h2 className="text-2xl font-bold text-gray-900">Security Check</h2>
                                <p className="text-gray-600 mt-2">Please enter the captcha to view your results.</p>
                            </div>
                            <form onSubmit={handleCaptchaSubmit} className="flex flex-col gap-4">
                                <div className="flex justify-center mb-4 bg-white p-2 rounded border border-gray-200">
                                    <img src={captchaData.image} alt="Captcha" className="max-w-full h-auto" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="captcha" className="block text-sm font-medium text-gray-700">
                                        Captcha Text
                                    </Label>
                                    <Input
                                        id="captcha"
                                        type="text"
                                        value={captchaText}
                                        onChange={e => setCaptchaText(e.target.value)}
                                        placeholder="Enter the text above"
                                        required
                                        autoComplete="off"
                                    />
                                </div>
                                <div className="flex gap-4 mt-4">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="flex-1"
                                        onClick={() => {
                                            setCaptchaData(null);
                                            setCaptchaText('');
                                            setError(null);
                                        }}
                                        disabled={loading}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        className="bg-blue-600 hover:bg-blue-700 text-white flex-1"
                                        disabled={loading || !captchaText.trim()}
                                    >
                                        Verify Captcha
                                    </Button>
                                </div>
                                {error && (
                                    <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm flex-1 break-words whitespace-pre-wrap">
                                        {error}
                                    </div>
                                )}
                            </form>
                        </div>
                    )}

                    {/* Batch Results Table View */}
                    {!parsedResult && allResults.length > 0 && (
                        <div className="space-y-6">
                            <div className="flex justify-between items-center">
                                <h2 className="text-2xl font-bold text-gray-900">Result Summary</h2>
                                <Button
                                    variant="outline"
                                    onClick={() => setAllResults([])}
                                >
                                    Check New Results
                                </Button>
                            </div>

                            <Card className="bg-white shadow-lg border border-gray-200 overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm text-left">
                                        <thead className="bg-gray-100 text-gray-700 font-semibold border-b">
                                            <tr>
                                                <th className="px-6 py-4">USN</th>
                                                <th className="px-4 py-4">Student Name</th>
                                                <th className="px-4 py-4 text-center">Semester</th>
                                                <th className="px-4 py-4 text-center">SGPA (Est)</th>
                                                <th className="px-4 py-4 text-center">Result</th>
                                                <th className="px-4 py-4 text-center">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {allResults.map((result) => (
                                                <tr key={result.usn} className="hover:bg-gray-50 transition-colors">
                                                    <td className="px-6 py-4 font-mono font-medium text-gray-900">{result.usn}</td>
                                                    <td className="px-4 py-4 text-gray-700">{result.studentName}</td>
                                                    <td className="px-4 py-4 text-center text-gray-600">{result.semester}</td>
                                                    <td className="px-4 py-4 text-center font-bold text-blue-600">
                                                        {calculateSGPAValue(result.subjects).toFixed(2)}
                                                    </td>
                                                    <td className="px-4 py-4 text-center">
                                                        {result.subjects.some(s => s.result === 'F')
                                                            ? <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">Fail</span>
                                                            : <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Pass</span>
                                                        }
                                                    </td>
                                                    <td className="px-4 py-4 text-center">
                                                        <Button
                                                            size="sm"
                                                            variant="ghost"
                                                            className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                                                            onClick={() => setParsedResult(result)}
                                                        >
                                                            View Full
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </Card>
                        </div>
                    )}

                    {/* Results Display */}
                    {!captchaData && parsedResult && !secondResult && !isComparing && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            {allResults.length > 1 && (
                                <div className="mb-4">
                                    <Button
                                        variant="outline"
                                        onClick={() => setParsedResult(null)}
                                        className="flex items-center gap-2"
                                    >
                                        ← Back to Results List
                                    </Button>
                                </div>
                            )}

                            {/* Header */}
                            <div className="text-center">
                                <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-100 mb-6 border border-blue-200">
                                    <Calculator className="w-5 h-5 text-blue-600" />
                                    <span className="text-sm font-medium text-blue-700">VTU Results</span>
                                </div>
                                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
                                    {parsedResult.studentName}
                                </h1>
                                <p className="text-lg text-gray-600">
                                    USN: {parsedResult.usn} | Semester: {parsedResult.semester}
                                </p>
                            </div>

                            {/* Main Results Grid */}
                            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                                {/* Subjects List */}
                                <div className="xl:col-span-2">
                                    <Card className="bg-white shadow-lg border border-gray-200">
                                        <CardHeader>
                                            <CardTitle className="text-gray-900 flex items-center gap-2">
                                                <GraduationCap className="w-5 h-5 text-blue-600" />
                                                Subject Results
                                            </CardTitle>
                                            <CardDescription className="text-gray-600">
                                                Your semester results with marks and grades
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <div className="overflow-x-auto">
                                                <table className="w-full text-sm text-left">
                                                    <thead className="bg-gray-100 text-gray-700 font-semibold border-b">
                                                        <tr>
                                                            <th className="px-4 py-3 min-w-[100px]">Code</th>
                                                            <th className="px-4 py-3 min-w-[200px]">Subject Name</th>
                                                            <th className="px-4 py-3 text-center">Int</th>
                                                            <th className="px-4 py-3 text-center">Ext</th>
                                                            <th className="px-4 py-3 text-center">Total</th>
                                                            <th className="px-4 py-3 text-center">Grd</th>
                                                            <th className="px-4 py-3 text-center">Pts</th>
                                                            <th className="px-4 py-3 text-center">Creds</th>
                                                            <th className="px-4 py-3 text-center">Res</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-200">
                                                        {parsedResult.subjects.map((subject) => (
                                                            <tr key={subject.id} className="hover:bg-gray-50">
                                                                <td className="px-4 py-3 font-medium text-gray-900">{subject.code}</td>
                                                                <td className="px-4 py-3 text-gray-700">{subject.name}</td>
                                                                <td className="px-4 py-3 text-center text-gray-600">{subject.internal}</td>
                                                                <td className="px-4 py-3 text-center text-gray-600">{subject.external}</td>
                                                                <td className="px-4 py-3 text-center font-bold text-gray-900">{subject.total}</td>
                                                                <td className="px-4 py-3 text-center font-medium">{subject.grade}</td>
                                                                <td className="px-4 py-3 text-center">{subject.gradePoints}</td>
                                                                <td className="px-4 py-3 text-center">
                                                                    <Select
                                                                        value={subject.credits.toString()}
                                                                        onValueChange={(value) => updateSubjectCredits(subject.id, Number.parseInt(value, 10))}
                                                                    >
                                                                        <SelectTrigger className="h-8 w-16 mx-auto bg-white border-gray-300 text-xs">
                                                                            <SelectValue />
                                                                        </SelectTrigger>
                                                                        <SelectContent>
                                                                            {Array.from({ length: 16 }).map((_, i) => (
                                                                                <SelectItem key={i} value={i.toString()}>
                                                                                    {i}
                                                                                </SelectItem>
                                                                            ))}
                                                                            {/* Common specific credits */}
                                                                            <SelectItem value="20">20</SelectItem>
                                                                        </SelectContent>
                                                                    </Select>
                                                                </td>
                                                                <td className="px-4 py-3 text-center">
                                                                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${subject.result === 'P' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                                                        }`}>
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

                                {/* SGPA Panel */}
                                <div className="space-y-6">
                                    {/* SGPA Card */}
                                    <Card className={`bg-gradient-to-br ${getSGPAColor(sgpa)}/10 border border-gray-200 shadow-lg`}>
                                        <CardHeader>
                                            <CardTitle className="text-gray-900 flex items-center gap-2">
                                                <Award className="w-6 h-6 text-blue-600" />
                                                Your SGPA
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="text-center">
                                            <div className={`text-4xl sm:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${getSGPAColor(sgpa)} mb-4`}>
                                                {sgpa.toFixed(2)}
                                            </div>
                                            <div className="flex items-center justify-center gap-2 mb-4">
                                                <Star className={`w-5 h-5 ${sgpa >= 9 ? 'text-yellow-500' : 'text-gray-400'}`} />
                                                <p className="text-gray-700 font-medium text-sm sm:text-base">{getGradeDescription(sgpa)}</p>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4 mt-6">
                                                <div className="bg-white rounded-lg p-3 border border-gray-200">
                                                    <div className="text-gray-600 text-xs sm:text-sm">Total Credits</div>
                                                    <div className="text-gray-900 text-lg sm:text-xl font-bold">{totalCredits}</div>
                                                </div>
                                                <div className="bg-white rounded-lg p-3 border border-gray-200">
                                                    <div className="text-gray-600 text-xs sm:text-sm">Percentage</div>
                                                    <div className="text-gray-900 text-lg sm:text-xl font-bold">{(sgpa * 10).toFixed(1)}%</div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>

                            <RevaluationEstimate subjects={parsedResult.subjects} sgpa={sgpa} totalCredits={totalCredits} />

                            {/* Performance Metrics */}
                            <Card className="bg-white shadow-lg border border-gray-200">
                                <CardHeader>
                                    <CardTitle className="text-gray-900 flex items-center gap-2">
                                        <Target className="w-5 h-5 text-blue-600" />
                                        Performance Metrics
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600">Class</span>
                                            <span className="text-gray-900 font-medium text-sm">
                                                {(() => {
                                                    if (sgpa >= 7.5) return 'First Class with Distinction';
                                                    if (sgpa >= 6) return 'First Class';
                                                    if (sgpa >= 5) return 'Second Class';
                                                    return 'Pass Class';
                                                })()}
                                            </span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className={`h-2 rounded-full bg-gradient-to-r ${getSGPAColor(sgpa)}`}
                                                style={{ width: `${(sgpa / 10) * 100}%` }}
                                            ></div>
                                        </div>
                                        <div className="text-xs text-gray-500 text-center">
                                            SGPA Progress: {sgpa.toFixed(2)}/10.0
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 mt-8">
                                <Button
                                    onClick={() => setIsComparing(true)}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                                >
                                    Compare with another USN
                                </Button>
                                <Button
                                    onClick={() => {
                                        setParsedResult(null);
                                        setAllResults([]);
                                        setSecondResult(null);
                                        setIsComparing(false);
                                        setUsn('');
                                        setUrl('');
                                    }}
                                    variant="outline"
                                    className="w-full"
                                >
                                    Check Another Result
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* Compare Form */}
                    {!captchaData && isComparing && parsedResult && (
                        <div className="bg-gray-50 rounded-2xl p-8 shadow-lg border border-gray-200 max-w-md mx-auto">
                            <div className="text-center mb-6">
                                <h2 className="text-2xl font-bold text-gray-900">Compare Result</h2>
                                <p className="text-gray-600 mt-2">Enter another USN to compare with {parsedResult.studentName}</p>
                            </div>
                            <form onSubmit={handleCompareSubmit} className="flex flex-col gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="compare_usn" className="block text-sm font-medium text-gray-700">
                                        Comparison USN
                                    </Label>
                                    <Input
                                        id="compare_usn"
                                        type="text"
                                        value={comparisonUsn}
                                        onChange={e => setComparisonUsn(e.target.value.toUpperCase())}
                                        placeholder="e.g., 1AM21CS002"
                                        required
                                        className="uppercase"
                                    />
                                </div>
                                <div className="flex gap-4 mt-2">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="flex-1"
                                        onClick={() => setIsComparing(false)}
                                        disabled={loading}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        className="bg-blue-600 hover:bg-blue-700 text-white flex-1"
                                        disabled={loading || !comparisonUsn.trim()}
                                    >
                                        Compare
                                    </Button>
                                </div>
                                {error && (
                                    <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm break-words">
                                        {error}
                                    </div>
                                )}
                            </form>
                        </div>
                    )}

                    {/* Comparison View */}
                    {!captchaData && secondResult && parsedResult && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="mb-4">
                                <Button
                                    variant="outline"
                                    onClick={() => setSecondResult(null)}
                                    className="flex items-center gap-2"
                                >
                                    ← Back to Single Result
                                </Button>
                            </div>
                            
                            <div className="text-center mb-8">
                                <h2 className="text-3xl font-bold text-gray-900">Result Comparison</h2>
                                <p className="text-gray-600 mt-2">Comparing {parsedResult.usn} and {secondResult.usn}</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                <Card className={`bg-gradient-to-br border border-gray-200 shadow-lg`}>
                                    <CardHeader>
                                        <CardTitle className="text-center text-gray-900">{parsedResult.usn}</CardTitle>
                                        <div className="text-center text-sm text-gray-600">{parsedResult.studentName}</div>
                                    </CardHeader>
                                    <CardContent className="text-center">
                                        <div className={`text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${getSGPAColor(calculateSGPAValue(parsedResult.subjects))}`}>
                                            {calculateSGPAValue(parsedResult.subjects).toFixed(2)}
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card className={`bg-gradient-to-br border border-gray-200 shadow-lg`}>
                                    <CardHeader>
                                        <CardTitle className="text-center text-gray-900">{secondResult.usn}</CardTitle>
                                        <div className="text-center text-sm text-gray-600">{secondResult.studentName}</div>
                                    </CardHeader>
                                    <CardContent className="text-center">
                                        <div className={`text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${getSGPAColor(calculateSGPAValue(secondResult.subjects))}`}>
                                            {calculateSGPAValue(secondResult.subjects).toFixed(2)}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            <Card className="bg-white shadow-lg border border-gray-200">
                                <CardHeader>
                                    <CardTitle>Subject-wise Comparison</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-sm text-left">
                                            <thead className="bg-gray-100 text-gray-700 font-semibold border-b">
                                                <tr>
                                                    <th className="px-4 py-3">Code</th>
                                                    <th className="px-4 py-3 border-r border-gray-300">Subject Name</th>
                                                    <th className="px-4 py-3 text-center bg-blue-50/50">{parsedResult.usn}</th>
                                                    <th className="px-4 py-3 text-center border-r border-gray-300 bg-blue-50/50">Grade</th>
                                                    <th className="px-4 py-3 text-center bg-green-50/50">{secondResult.usn}</th>
                                                    <th className="px-4 py-3 text-center border-r border-gray-300 bg-green-50/50">Grade</th>
                                                    <th className="px-4 py-3 text-center font-bold">Diff (Total)</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200">
                                                {Array.from(new Set([...parsedResult.subjects.map(s => s.code), ...secondResult.subjects.map(s => s.code)])).map(code => {
                                                    const s1 = parsedResult.subjects.find(s => s.code === code);
                                                    const s2 = secondResult.subjects.find(s => s.code === code);
                                                    const name = s1?.name || s2?.name || code;
                                                    const diff = (s1?.total || 0) - (s2?.total || 0);
                                                    return (
                                                        <tr key={code} className="hover:bg-gray-50">
                                                            <td className="px-4 py-3 font-medium text-gray-900">{code}</td>
                                                            <td className="px-4 py-3 border-r border-gray-200">{name}</td>
                                                            <td className="px-4 py-3 text-center bg-blue-50/10 border-l border-gray-100">{s1?.total || '-'}</td>
                                                            <td className="px-4 py-3 text-center border-r border-gray-200 font-medium bg-blue-50/10">{s1?.grade || '-'}</td>
                                                            <td className="px-4 py-3 text-center bg-green-50/10">{s2?.total || '-'}</td>
                                                            <td className="px-4 py-3 text-center border-r border-gray-200 font-medium bg-green-50/10">{s2?.grade || '-'}</td>
                                                            <td className={`px-4 py-3 text-center font-bold ${diff > 0 ? 'text-blue-600' : diff < 0 ? 'text-red-500' : 'text-gray-400'}`}>
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


                    {/* Content Section for AdSense / SEO */}
                    <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 text-gray-700">
                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-gray-900">How to Check VTU Results Online</h2>
                            <p className="leading-relaxed">
                                Checking your Visvesvaraya Technological University (VTU) exam results is a straightforward process with our tool.
                                We connect directly to the official VTU servers to fetch your latest semester results securely and quickly.
                            </p>
                            <ol className="list-decimal pl-5 space-y-2">
                                <li><strong>Select Your Academic Year:</strong> Choose the year your exams were conducted.</li>
                                <li><strong>Choose the Exam:</strong> Select the specific examination event (e.g., June/July 2024).</li>
                                <li><strong>Enter Your USN:</strong> Type your 10-character University Seat Number (e.g., 1AM21CS001).</li>
                                <li><strong>View Results:</strong> Click "Get Results" to see your marks, grades, and SGPA instantly.</li>
                            </ol>
                            <p className="text-sm text-gray-600 italic">
                                Note: Ensure you have a stable internet connection for the fastest experience.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-gray-900">Understanding Your SGPA & Grades</h2>
                            <p className="leading-relaxed">
                                The Semester Grade Point Average (SGPA) is a key metric used by VTU to evaluate academic performance for a specific semester.
                                It is a weighted average of the grade points secured in all subjects.
                            </p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li><strong>S Grade (90-100 marks):</strong> Outstanding performance, 10 grade points.</li>
                                <li><strong>A Grade (80-89 marks):</strong> Excellent performance, 9 grade points.</li>
                                <li><strong>B Grade (70-79 marks):</strong> Very Good performance, 8 grade points.</li>
                                <li><strong>F Grade (below 40 marks):</strong> Fail, 0 grade points.</li>
                            </ul>
                            <p>
                                Our built-in <strong>VTU SGPA Calculator</strong> automatically computes this for you using the credits assigned to each subject.
                                You can also manually adjust credits if needed.
                            </p>
                        </section>

                        <section className="space-y-4 md:col-span-2">
                            <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions (FAQ)</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                                    <h3 className="font-semibold text-lg mb-2">Why are my results not showing?</h3>
                                    <p className="text-sm text-gray-600">
                                        This can happen if the VTU server is down or overloaded, or if you entered an incorrect USN.
                                        Please double-check your USN and try again in a few minutes.
                                    </p>
                                </div>
                                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                                    <h3 className="font-semibold text-lg mb-2">Is this data official?</h3>
                                    <p className="text-sm text-gray-600">
                                        We fetch data directly from the public result pages provided by VTU. However, for official transcripts and legal purposes,
                                        always refer to the physical marks cards issued by the university.
                                    </p>
                                </div>
                                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                                    <h3 className="font-semibold text-lg mb-2">How is SGPA calculated?</h3>
                                    <p className="text-sm text-gray-600">
                                        SGPA = Σ(Course Credits × Grade Points) / Σ(Total Course Credits). Our tool handles this math for you instantly.
                                    </p>
                                </div>
                                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                                    <h3 className="font-semibold text-lg mb-2">Can I check Revaluation results?</h3>
                                    <p className="text-sm text-gray-600">
                                        Yes! Use the "Result Type" dropdown to switch between "Regular" and "Revaluation" results when available.
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-gray-900">Official VTU Website & Resources</h2>
                            <p className="leading-relaxed">
                                For the most authoritative and up-to-date notifications, circulars, and official result announcements, always refer to the
                                Visvesvaraya Technological University's official portal.
                            </p>
                            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                                <ul className="space-y-2 text-sm text-blue-800">
                                    <li className="flex items-center gap-2">
                                        <span className="font-semibold">Main Website:</span>
                                        <a href="https://vtu.ac.in" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-600">vtu.ac.in</a>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="font-semibold">Results Portal:</span>
                                        <a href="https://results.vtu.ac.in" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-600">results.vtu.ac.in</a>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="font-semibold">Exam Time Table:</span>
                                        <a href="https://vtu.ac.in/en/category/examination/time-table/" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-600">View Time Tables</a>
                                    </li>
                                </ul>
                            </div>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-gray-900">How to Improve Your Scores</h2>
                            <p className="leading-relaxed">
                                Improving your SGPA requires a strategic approach to your studies. Here are some proven tips to help you boost your academic performance:
                            </p>
                            <ul className="list-disc pl-5 space-y-2 text-gray-700">
                                <li><strong>Understand the Scheme:</strong> Familiarize yourself with the VTU marking scheme and credit system (CBCS/Non-CBCS). Focus more on high-credit subjects.</li>
                                <li><strong>Consistent Study Schedule:</strong> Regular study habits prevent last-minute cramming. Dedicate fixed hours daily for review.</li>
                                <li><strong>Solve Previous Papers:</strong> VTU often repeats question patterns. Solving previous years' question papers is one of the most effective ways to prepare.</li>
                                <li><strong>Internal Assessment (IA):</strong> maximize your IA scores. They form a significant chunk of your total marks and are easier to score in than external exams.</li>
                            </ul>
                        </section>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default VTUResults;
