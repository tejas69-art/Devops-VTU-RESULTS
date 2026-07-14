import React from 'react';
import { BookOpen, ShieldCheck, Zap, HelpCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const HomeContent = () => {
    return (
        <div className="space-y-12 mt-16 max-w-4xl mx-auto">
            {/* Introduction Section */}
            <section className="space-y-4 text-center">
                <h2 className="text-3xl font-bold text-gray-900">About VTU Results Checker</h2>
                <div className="prose prose-blue mx-auto text-gray-600 leading-relaxed max-w-2xl">
                    <p>
                        Welcome to the most reliable and fastest way to check your <strong>Visvesvaraya Technological University (VTU)</strong> exam results.
                        Our tool is designed to simplify the complex process of finding your academic performance data.
                        Instead of navigating through multiple slow-loading official pages, you can get your complete semester result summary
                        and estimated <strong>SGPA (Semester Grade Point Average)</strong> instantly by just entering your USN.
                    </p>
                </div>
            </section>

            {/* Features Grid */}
            <section className="grid md:grid-cols-3 gap-6">
                <Card className="border-none shadow-md bg-white">
                    <CardHeader>
                        <Zap className="w-10 h-10 text-yellow-500 mb-2" />
                        <CardTitle className="text-xl">Instant Fast Results</CardTitle>
                    </CardHeader>
                    <CardContent className="text-gray-600">
                        Our optimized fetching engine retrieves your results directly from VTU servers in real-time,
                        minimizing wait times even during peak traffic hours when official sites often crash.
                    </CardContent>
                </Card>

                <Card className="border-none shadow-md bg-white">
                    <CardHeader>
                        <BookOpen className="w-10 h-10 text-blue-500 mb-2" />
                        <CardTitle className="text-xl">Automatic SGPA Calc</CardTitle>
                    </CardHeader>
                    <CardContent className="text-gray-600">
                        No need for manual calculations. We automatically compute your SGPA based on the latest CBCS scheme
                        credits and grade points, giving you an immediate understanding of your standing.
                    </CardContent>
                </Card>

                <Card className="border-none shadow-md bg-white">
                    <CardHeader>
                        <ShieldCheck className="w-10 h-10 text-green-500 mb-2" />
                        <CardTitle className="text-xl">Privacy Focused</CardTitle>
                    </CardHeader>
                    <CardContent className="text-gray-600">
                        We respect your privacy. Your USN is processed securely to fetch results and is not stored permanently
                        for marketing or tracking purposes. Check your results with peace of mind.
                    </CardContent>
                </Card>
            </section>

            {/* How It Works */}
            <section className="bg-blue-50 rounded-2xl p-8 md:p-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <HelpCircle className="w-6 h-6 text-blue-600" />
                    How to Check Your VTU Results
                </h3>
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-4">
                        <ol className="list-decimal list-inside space-y-3 text-gray-700 font-medium">
                            <li className="pl-2"><span className="text-gray-900 font-bold">Select Year & Exam:</span> Choose your academic year and the specific exam event (e.g., June/July 2024).</li>
                            <li className="pl-2"><span className="text-gray-900 font-bold">Choose Scheme:</span> Select your grading scheme (CBCS/Non-CBCS) and result type (Regular/Revaluation).</li>
                            <li className="pl-2"><span className="text-gray-900 font-bold">Enter USN:</span> Type your unique University Seat Number (e.g., 1AM21CS001).</li>
                            <li className="pl-2"><span className="text-gray-900 font-bold">View Results:</span> Click 'Get Results' to see your marks, grades, and calculated SGPA instantly.</li>
                        </ol>
                    </div>
                    <div className="text-sm text-gray-500 bg-white p-6 rounded-xl border border-blue-100">
                        <p className="mb-4">
                            <strong>Note:</strong> If you are unable to find your exam in the dropdown, you can manually enter the result URL if you have it.
                            This feature ensures you can check results even before we update our predefined lists.
                        </p>
                        <p>
                            For batch results (checking multiple USNs at once), switch to "Multiple Results" mode and enter a range.
                        </p>
                    </div>
                </div>
            </section>

            {/* FAQ Section for SEO */}
            <section>
                <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h3>
                <div className="grid gap-4">
                    {[
                        {
                            q: "Is this the official VTU website?",
                            a: "No, this is a third-party tool designed to provide a better user experience for checking results. For official records, strictly rely on vtu.ac.in."
                        },
                        {
                            q: "Why is my SGPA different from the official one?",
                            a: "Our SGPA is an estimation based on standard credit allotments. Sometimes, elective subjects have different credits which might slightly alter the calculation. You can edit credits manually in the result view to get the exact value."
                        },
                        {
                            q: "Why are the results not loading?",
                            a: "This usually happens when the official VTU server is down or overloaded. Since we fetch data in real-time from their source, their server status affects us. Please try again after a few minutes."
                        }
                    ].map((faq, i) => (
                        <div key={i} className="bg-white border border-gray-200 rounded-lg p-6">
                            <h4 className="font-bold text-gray-900 mb-2">{faq.q}</h4>
                            <p className="text-gray-600">{faq.a}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Disclaimer */}
            <section className="text-center text-sm text-gray-500 border-t border-gray-200 pt-8 pb-4">
                <p>
                    <strong>Disclaimer:</strong> We are not affiliated, associated, authorized, endorsed by, or in any way officially connected with
                    Visvesvaraya Technological University (VTU), or any of its subsidiaries or its affiliates.
                    The official VTU website can be found at <a href="https://vtu.ac.in" rel="nofollow" className="underline hover:text-gray-700">vtu.ac.in</a>.
                    The results published here are for immediate information to the examinees and strictly not to be treated as original mark cards.
                </p>
            </section>
        </div>
    );
};
