'use client';

import React, { useState, useEffect } from 'react';
import { Calculator, Award, Calendar, BookOpen, AlertCircle, Plus, Trash, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sidebar } from '@/components/Sidebar';

const GRADE_POINTS = {
    'S': 10,
    'A': 9,
    'B': 8,
    'C': 7,
    'D': 6,
    'E': 5,
    'F': 0,
};

interface SgpaSubject {
    id: number;
    name: string;
    credits: number;
    grade: keyof typeof GRADE_POINTS;
}

interface CgpaSemester {
    id: number;
    name: string;
    sgpa: number;
    credits: number;
}

export default function SgpaCgpaCalculator() {
    const [activeTab, setActiveTab] = useState<'sgpa' | 'cgpa'>('sgpa');

    // SGPA Calculator States
    const [sgpaSubjects, setSgpaSubjects] = useState<SgpaSubject[]>([
        { id: 1, name: 'Subject 1', credits: 4, grade: 'S' },
        { id: 2, name: 'Subject 2', credits: 4, grade: 'A' },
        { id: 3, name: 'Subject 3', credits: 3, grade: 'B' },
        { id: 4, name: 'Subject 4', credits: 3, grade: 'C' },
        { id: 5, name: 'Subject 5', credits: 3, grade: 'B' },
        { id: 6, name: 'Subject 6', credits: 2, grade: 'A' },
        { id: 7, name: 'Subject 7', credits: 1, grade: 'S' },
        { id: 8, name: 'Subject 8', credits: 1, grade: 'S' },
    ]);
    const [calculatedSgpa, setCalculatedSgpa] = useState<number>(0);
    const [totalSgpaCredits, setTotalSgpaCredits] = useState<number>(0);

    // CGPA Calculator States
    const [cgpaSemesters, setCgpaSemesters] = useState<CgpaSemester[]>([
        { id: 1, name: 'Semester 1', sgpa: 8.5, credits: 20 },
        { id: 2, name: 'Semester 2', sgpa: 8.2, credits: 20 },
        { id: 3, name: 'Semester 3', sgpa: 7.9, credits: 24 },
        { id: 4, name: 'Semester 4', sgpa: 8.1, credits: 24 },
    ]);
    const [calculatedCgpa, setCalculatedCgpa] = useState<number>(0);
    const [totalCgpaCreditsState, setCgpaSemestersTotalCredits] = useState<number>(0);

    // Calculate SGPA
    useEffect(() => {
        let totalPoints = 0;
        let creditsSum = 0;

        sgpaSubjects.forEach(subject => {
            const gp = GRADE_POINTS[subject.grade];
            totalPoints += gp * subject.credits;
            creditsSum += subject.credits;
        });

        const result = creditsSum > 0 ? totalPoints / creditsSum : 0;
        setCalculatedSgpa(Math.round(result * 100) / 100);
        setTotalSgpaCredits(creditsSum);
    }, [sgpaSubjects]);

    // Calculate CGPA
    useEffect(() => {
        let weightedPointsSum = 0;
        let creditsSum = 0;

        cgpaSemesters.forEach(sem => {
            if (sem.sgpa > 0 && sem.credits > 0) {
                weightedPointsSum += sem.sgpa * sem.credits;
                creditsSum += sem.credits;
            }
        });

        const result = creditsSum > 0 ? weightedPointsSum / creditsSum : 0;
        setCalculatedCgpa(Math.round(result * 100) / 100);
        setCgpaSemestersTotalCredits(creditsSum);
    }, [cgpaSemesters]);

    // SGPA Actions
    const addSgpaSubject = () => {
        const nextId = sgpaSubjects.length > 0 ? Math.max(...sgpaSubjects.map(s => s.id)) + 1 : 1;
        setSgpaSubjects([...sgpaSubjects, {
            id: nextId,
            name: `Subject ${nextId}`,
            credits: 3,
            grade: 'B'
        }]);
    };

    const removeSgpaSubject = (id: number) => {
        setSgpaSubjects(sgpaSubjects.filter(s => s.id !== id));
    };

    const updateSgpaSubject = (id: number, key: keyof SgpaSubject, value: any) => {
        setSgpaSubjects(sgpaSubjects.map(s => s.id === id ? { ...s, [key]: value } : s));
    };

    const resetSgpa = () => {
        setSgpaSubjects([
            { id: 1, name: 'Subject 1', credits: 4, grade: 'S' },
            { id: 2, name: 'Subject 2', credits: 4, grade: 'A' },
            { id: 3, name: 'Subject 3', credits: 3, grade: 'B' },
        ]);
    };

    // CGPA Actions
    const addCgpaSemester = () => {
        const nextId = cgpaSemesters.length > 0 ? Math.max(...cgpaSemesters.map(s => s.id)) + 1 : 1;
        setCgpaSemesters([...cgpaSemesters, {
            id: nextId,
            name: `Semester ${nextId}`,
            sgpa: 8.0,
            credits: 20
        }]);
    };

    const removeCgpaSemester = (id: number) => {
        setCgpaSemesters(cgpaSemesters.filter(s => s.id !== id));
    };

    const updateCgpaSemester = (id: number, key: keyof CgpaSemester, value: any) => {
        setCgpaSemesters(cgpaSemesters.map(s => s.id === id ? { ...s, [key]: value } : s));
    };

    const resetCgpa = () => {
        setCgpaSemesters([
            { id: 1, name: 'Semester 1', sgpa: 8.0, credits: 20 },
            { id: 2, name: 'Semester 2', sgpa: 8.0, credits: 20 },
        ]);
    };

    return (
        <div className="min-h-screen bg-slate-50/50 py-12">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Title */}
                <div className="text-center mb-12">
                    <h1 className="font-outfit text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
                        VTU SGPA & CGPA Calculator
                    </h1>
                    <p className="text-slate-600 max-w-xl mx-auto font-semibold">
                        Calculate your Semester Grade Point Average (SGPA) and Cumulative Grade Point Average (CGPA) online. Works with VTU credit regulations.
                    </p>
                </div>

                <div className="lg:grid lg:grid-cols-3 lg:gap-8">
                    {/* Main Content Area */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Tabs */}
                        <div className="flex border border-slate-200 mb-8 max-w-md mx-auto bg-white p-1.5 rounded-2xl shadow-sm">
                            <button
                                onClick={() => setActiveTab('sgpa')}
                                className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all ${
                                    activeTab === 'sgpa'
                                        ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-150'
                                        : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                                }`}
                            >
                                SGPA Calculator
                            </button>
                            <button
                                onClick={() => setActiveTab('cgpa')}
                                className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all ${
                                    activeTab === 'cgpa'
                                        ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-150'
                                        : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                                }`}
                            >
                                CGPA Calculator
                            </button>
                        </div>

                        {activeTab === 'sgpa' ? (
                            /* SGPA CALCULATOR TAB */
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {/* SGPA Result Summary */}
                                    <div className="md:col-span-1">
                                        <Card className="bg-gradient-to-br from-indigo-600 to-violet-700 text-white shadow-lg border-none overflow-hidden sticky top-24">
                                            <CardHeader className="text-center pb-2 bg-black/10">
                                                <span className="text-[10px] font-bold text-indigo-100 uppercase tracking-widest">Semester SGPA</span>
                                            </CardHeader>
                                            <CardContent className="text-center p-6 pb-8">
                                                <div className="text-6xl font-black mb-2 tracking-tight">
                                                    {calculatedSgpa.toFixed(2)}
                                                </div>
                                                <span className="bg-white/10 text-xs font-semibold px-3 py-1 rounded-full border border-white/10 inline-block mb-6">
                                                    Total Credits: {totalSgpaCredits}
                                                </span>

                                                <div className="border-t border-white/15 pt-6 grid grid-cols-2 gap-4 text-left">
                                                    <div>
                                                        <span className="text-[10px] text-indigo-200 font-bold uppercase block">Percentage</span>
                                                        <span className="text-base font-extrabold font-mono">{(calculatedSgpa * 10).toFixed(1)}%</span>
                                                    </div>
                                                    <div>
                                                        <span className="text-[10px] text-indigo-200 font-bold uppercase block">Class</span>
                                                        <span className="text-xs font-bold leading-tight block mt-0.5">
                                                            {calculatedSgpa >= 7.75 ? 'Distinction' : calculatedSgpa >= 6.75 ? 'First Class' : 'Pass'}
                                                        </span>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>

                                    {/* Subjects Input List */}
                                    <div className="md:col-span-2">
                                        <Card className="bg-white border-slate-200/80 shadow-sm rounded-2xl">
                                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b border-slate-100">
                                                <div>
                                                    <CardTitle className="text-base font-bold">Semester Subjects</CardTitle>
                                                    <CardDescription className="text-xs">Enter subject credits and grades</CardDescription>
                                                </div>
                                                <div className="flex gap-2">
                                                    <Button size="sm" variant="outline" onClick={resetSgpa} className="text-slate-500 hover:text-slate-800 border-slate-200">
                                                        <RotateCcw className="w-3.5 h-3.5 mr-1" /> Reset
                                                    </Button>
                                                    <Button size="sm" onClick={addSgpaSubject} className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold">
                                                        <Plus className="w-3.5 h-3.5 mr-1" /> Add
                                                    </Button>
                                                </div>
                                            </CardHeader>
                                            <CardContent className="p-4 space-y-3">
                                                {sgpaSubjects.map((sub) => (
                                                    <div key={sub.id} className="flex items-center gap-3 p-3 bg-slate-50/50 rounded-xl border border-slate-200/50 hover:border-slate-350 transition-colors">
                                                        <div className="flex-1 min-w-0">
                                                            <Input
                                                                type="text"
                                                                value={sub.name}
                                                                onChange={e => updateSgpaSubject(sub.id, 'name', e.target.value)}
                                                                placeholder="Subject Name / Code"
                                                                className="bg-white border-slate-200 text-sm font-semibold h-10 rounded-lg"
                                                            />
                                                        </div>

                                                        <div className="w-22">
                                                            <Select
                                                                value={sub.credits.toString()}
                                                                onValueChange={val => updateSgpaSubject(sub.id, 'credits', Number.parseInt(val, 10))}
                                                            >
                                                                <SelectTrigger className="bg-white border-slate-200 h-10 rounded-lg text-sm font-medium">
                                                                    <SelectValue />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    {[1, 2, 3, 4, 5, 6].map(c => (
                                                                        <SelectItem key={c} value={c.toString()}>{c} Cr</SelectItem>
                                                                    ))}
                                                                </SelectContent>
                                                            </Select>
                                                        </div>

                                                        <div className="w-20">
                                                            <Select
                                                                value={sub.grade}
                                                                onValueChange={val => updateSgpaSubject(sub.id, 'grade', val)}
                                                            >
                                                                <SelectTrigger className="bg-white border-slate-200 h-10 rounded-lg font-bold text-indigo-600">
                                                                    <SelectValue />
                                                                </SelectTrigger>
                                                                <SelectContent className="font-bold">
                                                                    {Object.keys(GRADE_POINTS).map(g => (
                                                                        <SelectItem key={g} value={g}>{g}</SelectItem>
                                                                    ))}
                                                                </SelectContent>
                                                            </Select>
                                                        </div>

                                                        {sgpaSubjects.length > 1 && (
                                                            <button
                                                                onClick={() => removeSgpaSubject(sub.id)}
                                                                className="text-slate-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
                                                            >
                                                                <Trash className="w-4 h-4" />
                                                            </button>
                                                        )}
                                                    </div>
                                                ))}
                                            </CardContent>
                                        </Card>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            /* CGPA CALCULATOR TAB */
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {/* CGPA Result Summary */}
                                    <div className="md:col-span-1">
                                        <Card className="bg-gradient-to-br from-violet-600 to-fuchsia-700 text-white shadow-lg border-none overflow-hidden sticky top-24">
                                            <CardHeader className="text-center pb-2 bg-black/10">
                                                <span className="text-[10px] font-bold text-violet-100 uppercase tracking-widest">Cumulative CGPA</span>
                                            </CardHeader>
                                            <CardContent className="text-center p-6 pb-8">
                                                <div className="text-6xl font-black mb-2 tracking-tight">
                                                    {calculatedCgpa.toFixed(2)}
                                                </div>
                                                <span className="bg-white/10 text-xs font-semibold px-3 py-1 rounded-full border border-white/10 inline-block mb-6">
                                                    Total Credits: {totalCgpaCreditsState}
                                                </span>

                                                <div className="border-t border-white/15 pt-6 grid grid-cols-2 gap-4 text-left">
                                                    <div>
                                                        <span className="text-[10px] text-violet-200 font-bold uppercase block">Percentage</span>
                                                        <span className="text-base font-extrabold font-mono">{(calculatedCgpa * 10).toFixed(1)}%</span>
                                                    </div>
                                                    <div>
                                                        <span className="text-[10px] text-violet-200 font-bold uppercase block">Equivalent Class</span>
                                                        <span className="text-xs font-bold leading-tight block mt-0.5">
                                                            {calculatedCgpa >= 7.75 ? 'First Class (Dist.)' : calculatedCgpa >= 6.75 ? 'First Class' : 'Pass'}
                                                        </span>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>

                                    {/* Semesters Input List */}
                                    <div className="md:col-span-2">
                                        <Card className="bg-white border-slate-200/80 shadow-sm rounded-2xl">
                                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b border-slate-100">
                                                <div>
                                                    <CardTitle className="text-base font-bold">Cumulative Semesters</CardTitle>
                                                    <CardDescription className="text-xs">Enter SGPA and credits for completed semesters</CardDescription>
                                                </div>
                                                <div className="flex gap-2">
                                                    <Button size="sm" variant="outline" onClick={resetCgpa} className="text-slate-500 hover:text-slate-800 border-slate-200">
                                                        <RotateCcw className="w-3.5 h-3.5 mr-1" /> Reset
                                                    </Button>
                                                    <Button size="sm" onClick={addCgpaSemester} className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold">
                                                        <Plus className="w-3.5 h-3.5 mr-1" /> Add
                                                    </Button>
                                                </div>
                                            </CardHeader>
                                            <CardContent className="p-4 space-y-3">
                                                {cgpaSemesters.map((sem) => (
                                                    <div key={sem.id} className="flex items-center gap-4 p-3 bg-slate-50/50 rounded-xl border border-slate-200/50 hover:border-slate-350 transition-colors">
                                                        <div className="flex-1 min-w-0">
                                                            <Input
                                                                type="text"
                                                                value={sem.name}
                                                                onChange={e => updateCgpaSemester(sem.id, 'name', e.target.value)}
                                                                placeholder="Semester Name"
                                                                className="bg-white border-slate-200 text-sm font-semibold h-10 rounded-lg"
                                                            />
                                                        </div>

                                                        <div className="w-24">
                                                            <Label className="block text-[9px] font-bold text-slate-400 uppercase mb-1">SGPA</Label>
                                                            <Input
                                                                type="number"
                                                                min="0"
                                                                max="10"
                                                                step="0.01"
                                                                value={sem.sgpa || ''}
                                                                onChange={e => updateCgpaSemester(sem.id, 'sgpa', parseFloat(e.target.value) || 0)}
                                                                className="bg-white border-slate-200 h-9 font-mono font-bold text-indigo-600 rounded-lg"
                                                            />
                                                        </div>

                                                        <div className="w-24">
                                                            <Label className="block text-[9px] font-bold text-slate-400 uppercase mb-1">Credits</Label>
                                                            <Input
                                                                type="number"
                                                                min="1"
                                                                max="40"
                                                                value={sem.credits || ''}
                                                                onChange={e => updateCgpaSemester(sem.id, 'credits', parseInt(e.target.value) || 0)}
                                                                className="bg-white border-slate-200 h-9 font-mono rounded-lg"
                                                            />
                                                        </div>

                                                        {cgpaSemesters.length > 1 && (
                                                            <button
                                                                onClick={() => removeCgpaSemester(sem.id)}
                                                                className="text-slate-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-slate-100 transition-colors mt-4"
                                                            >
                                                                <Trash className="w-4 h-4" />
                                                            </button>
                                                        )}
                                                    </div>
                                                ))}
                                            </CardContent>
                                        </Card>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Educational Content for SEO and AdSense */}
                        <div className="mt-12 bg-white border border-slate-200/80 rounded-2xl p-6 md:p-8 shadow-sm space-y-8 prose prose-slate max-w-none text-slate-650 text-sm">
                            <section className="space-y-3">
                                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                    <BookOpen className="w-5 h-5 text-indigo-600" />
                                    How is VTU SGPA Calculated?
                                </h2>
                                <p className="leading-relaxed font-medium">
                                    The <strong>Semester Grade Point Average (SGPA)</strong> is a score showing a student's academic performance in a single semester. 
                                    It is calculated as the weighted average of the grade points secured in all courses of the semester. The weight corresponds to the number of credits assigned to each subject.
                                </p>
                                <div className="p-4 bg-indigo-50/50 rounded-xl border border-indigo-100 font-mono text-center font-bold text-indigo-700">
                                    SGPA Formula: SGPA = Σ (Ci × Gi) / Σ Ci
                                </div>
                                <p className="leading-relaxed text-xs text-slate-500">
                                    Where <strong>Ci</strong> is the credits assigned to a course <em>i</em>, and <strong>Gi</strong> is the grade points obtained in that course.
                                </p>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                    <Award className="w-5 h-5 text-indigo-600" />
                                    VTU Choice Based Credit System (CBCS) Grade Matrix
                                </h2>
                                <p className="leading-relaxed font-medium">
                                    Under the CBCS regulation introduced by Visvesvaraya Technological University, students are awarded letter grades based on their marks in internal tests and external semester exams combined out of 100:
                                </p>

                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
                                        <thead className="bg-slate-50 border-b border-slate-200 font-bold text-slate-700">
                                            <tr>
                                                <th className="px-4 py-2.5 border-r border-slate-200">Marks Range</th>
                                                <th className="px-4 py-2.5 border-r border-slate-200">Letter Grade</th>
                                                <th className="px-4 py-2.5">Grade Points</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100 text-slate-600 font-medium">
                                            <tr>
                                                <td className="px-4 py-2.5 border-r border-slate-200">90% and above</td>
                                                <td className="px-4 py-2.5 border-r border-slate-200 font-bold text-emerald-600">S (Outstanding)</td>
                                                <td className="px-4 py-2.5 font-bold">10</td>
                                            </tr>
                                            <tr>
                                                <td className="px-4 py-2.5 border-r border-slate-200">80% to 89%</td>
                                                <td className="px-4 py-2.5 border-r border-slate-200 font-bold text-indigo-600">A (Excellent)</td>
                                                <td className="px-4 py-2.5 font-bold">9</td>
                                            </tr>
                                            <tr>
                                                <td className="px-4 py-2.5 border-r border-slate-200">70% to 79%</td>
                                                <td className="px-4 py-2.5 border-r border-slate-200 font-bold text-violet-600">B (Very Good)</td>
                                                <td className="px-4 py-2.5 font-bold">8</td>
                                            </tr>
                                            <tr>
                                                <td className="px-4 py-2.5 border-r border-slate-200">60% to 69%</td>
                                                <td className="px-4 py-2.5 border-r border-slate-200 font-bold text-amber-600">C (Good)</td>
                                                <td className="px-4 py-2.5 font-bold">7</td>
                                            </tr>
                                            <tr>
                                                <td className="px-4 py-2.5 border-r border-slate-200">50% to 59%</td>
                                                <td className="px-4 py-2.5 border-r border-slate-200 font-bold text-orange-500">D (Average)</td>
                                                <td className="px-4 py-2.5 font-bold">6</td>
                                            </tr>
                                            <tr>
                                                <td className="px-4 py-2.5 border-r border-slate-200">40% to 49%</td>
                                                <td className="px-4 py-2.5 border-r border-slate-200 font-bold text-rose-500">E (Pass)</td>
                                                <td className="px-4 py-2.5 font-bold">5</td>
                                            </tr>
                                            <tr>
                                                <td className="px-4 py-2.5 border-r border-slate-200">Below 40%</td>
                                                <td className="px-4 py-2.5 border-r border-slate-200 font-bold text-red-650">F (Fail)</td>
                                                <td className="px-4 py-2.5 font-bold">0</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </section>

                            <section className="space-y-3">
                                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                    <Calendar className="w-5 h-5 text-indigo-600" />
                                    How is Cumulative CGPA Calculated?
                                </h2>
                                <p className="leading-relaxed font-medium">
                                    The <strong>Cumulative Grade Point Average (CGPA)</strong> represents the student's overall performance across multiple semesters. It is calculated by taking the weighted average of all semesters' SGPAs, weighted by the respective semesters' total credits.
                                </p>
                                <div className="p-4 bg-violet-50/50 rounded-xl border border-violet-100 font-mono text-center font-bold text-violet-700">
                                    CGPA Formula: CGPA = Σ (SGPAj × Cj) / Σ Cj
                                </div>
                                <p className="leading-relaxed text-xs text-slate-500">
                                    Where <strong>SGPAj</strong> is the SGPA of semester <em>j</em>, and <strong>Cj</strong> is the total credits registered in semester <em>j</em>.
                                </p>
                            </section>

                            <section className="space-y-3">
                                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                    <AlertCircle className="w-5 h-5 text-indigo-600" />
                                    Equivalent Percentage Conversion
                                </h2>
                                <p className="leading-relaxed font-medium">
                                    To convert your CGPA or SGPA into a percentage score (which is often required for recruitment applications or competitive exam eligibility), VTU utilizes a direct linear formula:
                                </p>
                                <div className="p-4 bg-amber-55/30 rounded-xl border border-amber-200/50 font-bold text-amber-800 text-center text-lg">
                                    Percentage (%) = CGPA × 10
                                </div>
                                <p className="leading-relaxed font-medium">
                                    For instance, if your cumulative CGPA across 8 semesters is <strong>8.32</strong>, your equivalent VTU marks percentage would be <strong>83.2%</strong>.
                                </p>
                            </section>
                        </div>
                    </div>

                    {/* Sidebar Column */}
                    <div className="mt-10 lg:mt-0 lg:col-span-1">
                        <Sidebar />
                    </div>
                </div>
            </div>
        </div>
    );
}
