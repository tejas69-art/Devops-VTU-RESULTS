'use client';

import React from 'react';
import { Heart, Target, Users, Lightbulb } from 'lucide-react';

export const AboutSection = () => {
    return (
        <section id="about" className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            About Us
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto rounded-full"></div>
                    </div>

                    {/* Main Content */}
                    <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
                        <p className="text-lg leading-relaxed">
                            <strong className="text-gray-900">VTU Results</strong> is more than just a platform; it's a community
                            dedicated to the success of <strong className="text-blue-600">Visvesvaraya Technological University (VTU)</strong> students.
                            Established with the goal of simplifying and enhancing the academic journey, we strive to provide a
                            comprehensive resource center that caters to the unique challenges faced by VTU students across Karnataka.
                        </p>

                        <p className="text-lg leading-relaxed">
                            Our passion for academic excellence and commitment to quality drive us to deliver accurate and reliable
                            resources. Whether you are a fresher navigating the complexities of VTU for the first time or a
                            final-year student aiming for graduation with flying colors, VTU Results is here to support your journey
                            every step of the way.
                        </p>

                        <p className="text-lg leading-relaxed">
                            We understand the stress of waiting for exam results and the confusion around calculating grades.
                            That's why we've built tools that provide <strong className="text-gray-900">instant access</strong> to your results
                            and <strong className="text-gray-900">automatic SGPA calculations</strong>, saving you time and reducing anxiety
                            during result season.
                        </p>
                    </div>

                    {/* Values Grid */}
                    <div className="grid md:grid-cols-2 gap-6 mt-12">
                        <div className="flex gap-4 p-6 bg-blue-50 rounded-xl">
                            <div className="flex-shrink-0">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <Target className="w-6 h-6 text-blue-600" />
                                </div>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 mb-2">Our Mission</h4>
                                <p className="text-gray-600 text-sm">
                                    To simplify the academic journey for every VTU student by providing fast, accurate,
                                    and reliable tools for checking results and calculating grades.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4 p-6 bg-purple-50 rounded-xl">
                            <div className="flex-shrink-0">
                                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                    <Heart className="w-6 h-6 text-purple-600" />
                                </div>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 mb-2">Student-First Approach</h4>
                                <p className="text-gray-600 text-sm">
                                    Everything we build is designed with students in mind. Our tools are free,
                                    easy to use, and focused on solving real problems students face.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4 p-6 bg-emerald-50 rounded-xl">
                            <div className="flex-shrink-0">
                                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                                    <Users className="w-6 h-6 text-emerald-600" />
                                </div>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 mb-2">Thriving Community</h4>
                                <p className="text-gray-600 text-sm">
                                    Join thousands of VTU students and alumni. Share knowledge, experiences,
                                    and support each other through the academic journey.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4 p-6 bg-orange-50 rounded-xl">
                            <div className="flex-shrink-0">
                                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                                    <Lightbulb className="w-6 h-6 text-orange-600" />
                                </div>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 mb-2">Continuous Innovation</h4>
                                <p className="text-gray-600 text-sm">
                                    We're constantly improving our tools and adding new features based on
                                    student feedback to make your experience better.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
