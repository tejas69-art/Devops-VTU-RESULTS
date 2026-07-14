'use client';

import React, { useState, useEffect } from 'react';
import { Calculator, AlertTriangle, CheckCircle, HelpCircle, FileText, ArrowRight, RotateCcw } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Sidebar } from '@/components/Sidebar';

export default function AttendanceCalculator() {
    const [conducted, setConducted] = useState<number>(50);
    const [attended, setAttended] = useState<number>(40);
    const [target, setTarget] = useState<number>(85);

    // Results State
    const [percentage, setPercentage] = useState<number>(0);
    const [status, setStatus] = useState<'safe' | 'shortage' | 'critical'>('safe');
    const [message, setMessage] = useState<string>('');
    const [actionNumber, setActionNumber] = useState<number>(0);

    useEffect(() => {
        if (conducted <= 0) {
            setPercentage(0);
            return;
        }

        const currentPct = (attended / conducted) * 100;
        setPercentage(Math.round(currentPct * 100) / 100);

        const targetDecimal = target / 100;

        if (currentPct >= target) {
            // Safe: calculate how many classes can be skipped
            // A / (C + Y) >= T  => Y <= A/T - C
            const maxSkip = Math.floor(attended / targetDecimal - conducted);
            setStatus('safe');
            setActionNumber(maxSkip >= 0 ? maxSkip : 0);
            if (maxSkip > 0) {
                setMessage(`You are in the safe zone! You can skip the next ${maxSkip} classes consecutively without falling below your target.`);
            } else if (maxSkip === 0) {
                setMessage(`You are exactly on the line. You cannot afford to miss any upcoming classes.`);
            } else {
                setMessage(`You are in the safe zone!`);
            }
        } else {
            // Shortage: calculate how many classes to attend consecutively
            // (A + X) / (C + X) >= T => X >= (T*C - A) / (1 - T)
            const classesNeeded = Math.ceil((targetDecimal * conducted - attended) / (1 - targetDecimal));
            setStatus(currentPct < 75 ? 'critical' : 'shortage');
            setActionNumber(classesNeeded);
            setMessage(`Shortage of attendance! You must attend the next ${classesNeeded} classes consecutively to reach your ${target}% target.`);
        }
    }, [conducted, attended, target]);

    const handleReset = () => {
        setConducted(50);
        setAttended(40);
        setTarget(85);
    };

    return (
        <div className="min-h-screen bg-slate-50/50 py-12">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Title */}
                <div className="text-center mb-12">
                    <h1 className="font-outfit text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
                        College Attendance Calculator
                    </h1>
                    <p className="text-slate-650 max-w-xl mx-auto font-semibold">
                        Track your semester class attendance percentage. Calculate how many classes you can skip or need to attend to satisfy the VTU 85% guidelines.
                    </p>
                </div>

                <div className="lg:grid lg:grid-cols-3 lg:gap-8">
                    {/* Main Content Column */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Results panel */}
                            <div className="space-y-6 md:col-span-1">
                                <Card className={`bg-white border-slate-200 shadow-sm border-t-4 overflow-hidden ${
                                    status === 'safe' ? 'border-t-green-500' : status === 'shortage' ? 'border-t-amber-500' : 'border-t-red-650'
                                }`}>
                                    <CardHeader className="text-center pb-2 bg-slate-50/50">
                                        <CardTitle className="text-xs text-slate-400 font-bold uppercase tracking-wider">Current Attendance</CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-center p-6 space-y-4">
                                        <div className={`text-5xl font-black ${
                                            status === 'safe' ? 'text-green-600' : status === 'shortage' ? 'text-amber-500' : 'text-red-600'
                                        }`}>
                                            {percentage.toFixed(1)}%
                                        </div>
                                        <div className="flex items-center justify-center">
                                            {status === 'safe' ? (
                                                <span className="inline-flex items-center gap-1.5 text-[10px] font-black text-green-700 bg-green-50 px-3 py-1 rounded-full border border-green-200 uppercase tracking-wider">
                                                    <CheckCircle className="w-3.5 h-3.5" /> Attendance Safe
                                                </span>
                                            ) : (
                                                <span className={`inline-flex items-center gap-1.5 text-[10px] font-black ${
                                                    status === 'critical' ? 'text-red-700 bg-red-50 border-red-200' : 'text-amber-700 bg-amber-50 border-amber-200'
                                                } px-3 py-1 rounded-full border uppercase tracking-wider`}>
                                                    <AlertTriangle className="w-3.5 h-3.5" /> Detained Risk
                                                </span>
                                            )}
                                        </div>

                                        <div className="border-t border-slate-100 pt-4 text-xs text-slate-600 leading-relaxed font-semibold">
                                            {message}
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Summary Action card */}
                                <Card className={`text-white shadow-md border-none rounded-2xl bg-gradient-to-br ${
                                    status === 'safe' ? 'from-green-600 to-emerald-700' : 'from-indigo-650 to-violet-750'
                                }`}>
                                    <CardContent className="p-6 text-center space-y-2">
                                        <span className="text-[9px] text-white/80 font-bold uppercase block tracking-widest">
                                            {status === 'safe' ? 'Safe Skips Allowed' : 'Lectures Required'}
                                        </span>
                                        <div className="text-5xl font-black tracking-tight">{actionNumber}</div>
                                        <p className="text-[10px] text-white/70 pt-1 leading-relaxed font-semibold">
                                            {status === 'safe' 
                                                ? 'Number of classes you can miss while keeping your percentage at or above target.' 
                                                : 'Number of upcoming lectures you must attend consecutively to reach your target.'
                                            }
                                        </p>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Calculator Form */}
                            <div className="md:col-span-2">
                                <Card className="bg-white border-slate-200 shadow-sm rounded-2xl h-full">
                                    <CardHeader className="border-b border-slate-100 pb-4">
                                        <CardTitle className="text-base font-bold flex items-center gap-2">
                                            <Calculator className="w-5 h-5 text-indigo-600" /> Attendance Entry
                                        </CardTitle>
                                        <CardDescription className="text-xs">Input your current academic attendance details</CardDescription>
                                    </CardHeader>
                                    <CardContent className="p-6 space-y-6">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="conducted" className="text-sm font-semibold text-slate-700">Total Classes Conducted</Label>
                                                <Input
                                                    id="conducted"
                                                    type="number"
                                                    min="1"
                                                    value={conducted || ''}
                                                    onChange={e => setConducted(Math.max(0, parseInt(e.target.value) || 0))}
                                                    placeholder="e.g., 60"
                                                    className="h-11 border-slate-250 font-mono font-bold text-base rounded-xl"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="attended" className="text-sm font-semibold text-slate-700">Classes Attended</Label>
                                                <Input
                                                    id="attended"
                                                    type="number"
                                                    min="0"
                                                    max={conducted}
                                                    value={attended || ''}
                                                    onChange={e => setAttended(Math.min(conducted, Math.max(0, parseInt(e.target.value) || 0)))}
                                                    placeholder="e.g., 45"
                                                    className="h-11 border-slate-250 font-mono font-bold text-base rounded-xl"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="target" className="text-sm font-semibold text-slate-700">Target Attendance Percentage (%)</Label>
                                            <div className="flex gap-2 sm:gap-3">
                                                {[75, 80, 85, 90].map(pct => (
                                                    <button
                                                        key={pct}
                                                        type="button"
                                                        onClick={() => setTarget(pct)}
                                                        className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-black border transition-all ${
                                                            target === pct
                                                                ? 'bg-indigo-600 border-indigo-650 text-white shadow-sm shadow-indigo-100'
                                                                : 'bg-white border-slate-200 text-slate-650 hover:bg-slate-50'
                                                        }`}
                                                    >
                                                        {pct}%
                                                    </button>
                                                ))}
                                            </div>
                                            <Input
                                                id="target"
                                                type="number"
                                                min="1"
                                                max="100"
                                                value={target || ''}
                                                onChange={e => setTarget(Math.min(100, Math.max(1, parseInt(e.target.value) || 0)))}
                                                placeholder="Custom Target"
                                                className="h-10 mt-2 border-slate-200 font-mono rounded-lg"
                                            />
                                        </div>

                                        <div className="flex pt-2">
                                            <Button variant="outline" onClick={handleReset} className="w-full text-slate-500 border-slate-200 rounded-xl h-11">
                                                <RotateCcw className="w-4 h-4 mr-2" /> Reset Entry
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>

                        {/* Educational Content for SEO and AdSense */}
                        <div className="mt-12 bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm space-y-8 prose prose-slate max-w-none text-slate-650 text-sm">
                            <section className="space-y-3">
                                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                    <FileText className="w-5 h-5 text-indigo-600" />
                                    VTU 85% Attendance Regulations & Guidelines
                                </h2>
                                <p className="leading-relaxed font-medium">
                                    Under Visvesvaraya Technological University (VTU) regulations, every student must maintain a minimum of <strong>85% attendance</strong> in each theory and practical subject. 
                                    This regulation is strictly enforced by college administrations to ensure students regularly participate in continuous assessment tests and practical laboratory exercises.
                                </p>
                                <p className="leading-relaxed font-medium">
                                    If a student's attendance falls below 85% in any subject, they are declared to have a <strong>shortage of attendance</strong>. 
                                    In such cases, the student's name is submitted as <strong>NSAR (Not Eligible for Semester Exams due to Attendance Shortage)</strong>, meaning they will not be allowed to sit for the final theory and practical examinations for that subject.
                                </p>
                            </section>

                            <section className="space-y-3">
                                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                    <HelpCircle className="w-5 h-5 text-indigo-600" />
                                    Condonation of Attendance Shortage (75% Rule)
                                </h2>
                                <p className="leading-relaxed font-medium">
                                    In certain exceptional circumstances, the shortage of attendance can be condoned by the university. 
                                    If a student has a valid reason, they may apply for a condonation, which permits them to sit for exams with a minimum of <strong>75% attendance</strong>:
                                </p>
                                <ul className="list-disc pl-5 space-y-2 text-slate-600 font-medium">
                                    <li><strong>Medical Grounds:</strong> Extreme sickness, hospitalization, or recovering from surgery. The student must submit an official Medical Certificate issued by a registered medical practitioner.</li>
                                    <li><strong>Representing University/State:</strong> Participation in university-level sports tournaments, cultural fests, national-level NCC/NSS camps, or official university seminars.</li>
                                </ul>
                                <p className="leading-relaxed font-medium">
                                    The condonation application must be recommended by the Department Head (HOD), approved by the College Principal, and subsequently submitted to the VTU Registrar (Evaluation) along with the requisite fee.
                                </p>
                            </section>

                            <section className="space-y-3">
                                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                    <ArrowRight className="w-5 h-5 text-indigo-600" />
                                    How Attendance Calculations Work
                                </h2>
                                <p className="leading-relaxed font-medium">
                                    Our calculator handles the math using two primary scenarios to help you plan your schedule:
                                </p>
                                <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl space-y-4 font-mono text-xs text-slate-600">
                                    <div>
                                        <p className="font-bold text-slate-800 uppercase mb-1">Scenario A: attendance is below the target</p>
                                        <p>Formula: Classes to Attend (X) = ⌈ (Target % × Conducted - Attended) / (1 - Target %) ⌉</p>
                                        <p className="text-[10px] text-slate-400 italic mt-0.5">This tells you the exact number of future lectures you must attend without absence to pull your average up.</p>
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-800 uppercase mb-1">Scenario B: attendance is above the target</p>
                                        <p>Formula: Classes to Skip (Y) = ⌊ Attended / Target % - Conducted ⌋</p>
                                        <p className="text-[10px] text-slate-400 italic mt-0.5">This calculates the buffer classes you can miss while keeping your percentage at or above the threshold.</p>
                                    </div>
                                </div>
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
