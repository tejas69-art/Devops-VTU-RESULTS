'use client';

import React, { useState, useEffect } from 'react';
import { Calculator, DollarSign, Percent, ShieldCheck, Info, FileText, ArrowRight, RotateCcw } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Sidebar } from '@/components/Sidebar';

export default function PlacementSalaryCalculator() {
    const [ctc, setCtc] = useState<number>(10); // in LPA
    const [variablePercent, setVariablePercent] = useState<number>(10); // variable percentage
    const [monthlyInHand, setMonthlyInHand] = useState<number>(0);
    const [annualInHand, setAnnualInHand] = useState<number>(0);

    // Breakdown States
    const [fixedSalary, setFixedSalary] = useState<number>(0);
    const [variableSalary, setVariableSalary] = useState<number>(0);
    const [epfDeduction, setEpfDeduction] = useState<number>(0);
    const [profTax, setProfTax] = useState<number>(2400); // fixed per year
    const [incomeTax, setIncomeTax] = useState<number>(0);

    useEffect(() => {
        const annualCTC = ctc * 100000;
        const variablePart = (variablePercent / 100) * annualCTC;
        const fixedPart = annualCTC - variablePart;

        // Basic is usually 40% of fixed
        const basicSalary = fixedPart * 0.40;

        // EPF is 12% of basic (Standard employee contribution)
        const annualEPF = basicSalary * 0.12;

        // Calculate Income Tax (Simplified New Tax Regime for FY 2025-26)
        const taxableIncome = Math.max(0, fixedPart - annualEPF - 75000);
        let tax = 0;

        if (taxableIncome > 1500000) {
            tax += (taxableIncome - 1500000) * 0.30 + 130000;
        } else if (taxableIncome > 1200000) {
            tax += (taxableIncome - 1200000) * 0.20 + 70000;
        } else if (taxableIncome > 900000) {
            tax += (taxableIncome - 900000) * 0.15 + 25000;
        } else if (taxableIncome > 700000) {
            tax += (taxableIncome - 700000) * 0.10 + 5000;
        } else if (taxableIncome > 300000) {
            tax += (taxableIncome - 300000) * 0.05;
        }

        // Rebate under 7L taxable income (tax becomes zero)
        if (taxableIncome <= 700000) {
            tax = 0;
        }

        // Cess (4% of tax)
        const cess = tax * 0.04;
        const totalTax = tax + cess;

        const annualDeductions = annualEPF + profTax + totalTax;
        const takeHomeAnnual = Math.max(0, fixedPart - annualDeductions);
        
        setFixedSalary(fixedPart);
        setVariableSalary(variablePart);
        setEpfDeduction(annualEPF);
        setIncomeTax(totalTax);
        setAnnualInHand(takeHomeAnnual);
        setMonthlyInHand(Math.round((takeHomeAnnual / 12) * 100) / 100);
    }, [ctc, variablePercent]);

    const handleReset = () => {
        setCtc(10);
        setVariablePercent(10);
    };

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(val);
    };

    return (
        <div className="min-h-screen bg-slate-50/50 py-12">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="font-outfit text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
                        Placement Salary Calculator (CTC to In-Hand)
                    </h1>
                    <p className="text-slate-650 max-w-xl mx-auto font-semibold">
                        Estimate your net monthly take-home salary from your corporate placement package. Breaks down PF, tax, and variable components.
                    </p>
                </div>

                <div className="lg:grid lg:grid-cols-3 lg:gap-8">
                    {/* Main Content Area */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Result Summary */}
                            <div className="space-y-6 md:col-span-1">
                                <Card className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-lg border-none overflow-hidden rounded-2xl">
                                    <CardHeader className="text-center pb-2 bg-black/10">
                                        <span className="text-[10px] font-bold text-emerald-100 uppercase tracking-widest">Monthly In-Hand</span>
                                    </CardHeader>
                                    <CardContent className="text-center p-5 pb-8 space-y-4">
                                        <div className="text-3xl sm:text-4xl font-black font-mono">
                                            {formatCurrency(monthlyInHand)}
                                        </div>
                                        <span className="bg-white/10 text-xs font-semibold px-3 py-1 rounded-full border border-white/10 inline-block font-mono">
                                            Annual Net: {formatCurrency(annualInHand)}
                                        </span>
                                    </CardContent>
                                </Card>

                                {/* Cost Breakdown Details */}
                                <Card className="bg-white border-slate-200 shadow-sm rounded-2xl">
                                    <CardHeader className="pb-3 border-b border-slate-100">
                                        <CardTitle className="text-xs font-bold text-slate-405 uppercase tracking-wider">Annual Breakdown</CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-4 space-y-3 text-xs font-semibold text-slate-700">
                                        <div className="flex justify-between">
                                            <span className="text-slate-500 flex items-center gap-1"><Info className="w-3.5 h-3.5" /> Fixed Base</span>
                                            <span className="text-slate-900 font-bold">{formatCurrency(fixedSalary)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-slate-500">Variable Bonus</span>
                                            <span className="text-amber-600 font-bold">{formatCurrency(variableSalary)}</span>
                                        </div>
                                        <div className="border-t border-slate-100 my-2"></div>
                                        <div className="flex justify-between text-red-500">
                                            <span>Employee PF (EPF)</span>
                                            <span>-{formatCurrency(epfDeduction)}</span>
                                        </div>
                                        <div className="flex justify-between text-red-500">
                                            <span>Professional Tax</span>
                                            <span>-{formatCurrency(profTax)}</span>
                                        </div>
                                        <div className="flex justify-between text-red-500">
                                            <span>Income Tax (TDS)</span>
                                            <span>-{formatCurrency(incomeTax)}</span>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Entry Card */}
                            <div className="md:col-span-2">
                                <Card className="bg-white border-slate-200 shadow-sm rounded-2xl h-full">
                                    <CardHeader className="border-b border-slate-100 pb-4">
                                        <CardTitle className="text-base font-bold flex items-center gap-2">
                                            <Calculator className="w-5 h-5 text-indigo-600" /> Package Details
                                        </CardTitle>
                                        <CardDescription className="text-xs">Enter details from your offer letter / placement criteria</CardDescription>
                                    </CardHeader>
                                    <CardContent className="p-6 space-y-6">
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="ctc" className="text-sm font-semibold text-slate-700">Cost to Company (CTC) in LPA (Lakhs Per Annum)</Label>
                                                <div className="relative">
                                                    <Input
                                                        id="ctc"
                                                        type="number"
                                                        min="1"
                                                        step="0.1"
                                                        value={ctc || ''}
                                                        onChange={e => setCtc(Math.max(0, parseFloat(e.target.value) || 0))}
                                                        placeholder="e.g., 12.0"
                                                        className="h-11 border-slate-250 pl-10 font-mono font-bold text-lg rounded-xl"
                                                    />
                                                    <span className="absolute left-3 top-3 text-slate-400 font-bold">₹</span>
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="variable" className="text-sm font-semibold text-slate-700">Variable / Performance Bonus (%)</Label>
                                                <div className="relative">
                                                    <Input
                                                        id="variable"
                                                        type="number"
                                                        min="0"
                                                        max="100"
                                                        value={variablePercent || ''}
                                                        onChange={e => setVariablePercent(Math.min(100, Math.max(0, parseInt(e.target.value) || 0)))}
                                                        placeholder="e.g., 10"
                                                        className="h-11 border-slate-250 pl-10 font-mono font-bold rounded-xl"
                                                    />
                                                    <Percent className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                                                </div>
                                                <p className="text-[10px] text-slate-400 font-semibold italic">Variable pay is typically paid at the end of the year based on performance benchmarks.</p>
                                            </div>
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
                                    CTC vs In-Hand Salary: What is the Difference?
                                </h2>
                                <p className="leading-relaxed font-medium">
                                    For many engineering graduates securing placements during campus drives, the <strong>Cost to Company (CTC)</strong> listed on offer letters can be misleading. 
                                    CTC is the total expenditure an employer incurs on hiring and maintaining an employee. 
                                    It is <strong>not</strong> the cash salary you receive in your bank account every month.
                                </p>
                                <p className="leading-relaxed font-medium">
                                    Your monthly <strong>take-home (in-hand) salary</strong> is calculated by subtracting variable payouts, employer/employee retirals (Provident Fund, Gratuity), insurance premiums, professional tax, and income tax (TDS) from the CTC.
                                </p>
                            </section>

                            <section className="space-y-3">
                                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                    <ShieldCheck className="w-5 h-5 text-indigo-600" />
                                    Standard Salary Components Explained
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm font-medium">
                                    <div className="space-y-1">
                                        <h4 className="font-bold text-slate-800">1. Basic Salary</h4>
                                        <p className="text-slate-500">
                                            This is the core fixed component of your salary package, usually comprising 40% to 50% of the total fixed salary. 
                                            Basic salary is fully taxable and serves as the baseline for calculating other values like EPF and Gratuity.
                                        </p>
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="font-bold text-slate-800">2. House Rent Allowance (HRA)</h4>
                                        <p className="text-slate-500">
                                            Allowance provided to cover house rental expenses. Under the Old Tax Regime, HRA is partially exempt from tax based on rent paid, city of residence, and basic pay.
                                        </p>
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="font-bold text-slate-800">3. Employee Provident Fund (EPF)</h4>
                                        <p className="text-slate-500">
                                            A statutory retiral saving. Typically, both the employee and employer contribute 12% of the basic salary towards the Employees' Provident Fund Organisation (EPFO).
                                        </p>
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="font-bold text-slate-800">4. Performance / Variable Bonus</h4>
                                        <p className="text-slate-500">
                                            A performance-linked component. This part of the CTC is only paid once or twice a year, depending on the individual's performance appraisal score and the organization's yearly profit margins.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <section className="space-y-3">
                                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                    <ArrowRight className="w-5 h-5 text-indigo-600" />
                                    New Income Tax Regime Slabs (Simplified)
                                </h2>
                                <p className="leading-relaxed font-medium">
                                    Our calculator utilizes the simplified New Tax Regime slabs to estimate TDS deductions. Under the new regime:
                                </p>
                                <ul className="list-disc pl-5 space-y-1 text-slate-650 font-medium">
                                    <li><strong>Up to ₹3,000,000 (3 Lakhs):</strong> 0% Tax</li>
                                    <li><strong>₹300,001 to ₹700,000:</strong> 5% Tax</li>
                                    <li><strong>₹700,001 to ₹1,000,000:</strong> 10% Tax</li>
                                    <li><strong>₹1,000,001 to ₹1,200,000:</strong> 15% Tax</li>
                                    <li><strong>₹1,200,001 to ₹1,500,000:</strong> 20% Tax</li>
                                    <li><strong>Above ₹1,500,000:</strong> 30% Tax</li>
                                </ul>
                                <p className="leading-relaxed font-medium">
                                    A standard deduction of <strong>₹75,000</strong> is automatically deducted from your fixed gross base, and tax rebates protect individuals whose total taxable income does not cross ₹700,000.
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
