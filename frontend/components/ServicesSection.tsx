'use client';

import React from 'react';
import { ArrowRightLeft, Briefcase, Network, CheckCircle } from 'lucide-react';

const serviceDetails = [
    {
        number: '1',
        icon: ArrowRightLeft,
        title: 'Compare Results',
        description: 'Track your academic trajectory with precision. Compare your performance across semesters or benchmark against your peers to stay motivated and improve your grades.',
        features: [
            'Semester vs. Semester tracking',
            'Peer comparison insights',
            'Visual progress charts',
            'Detailed subject-wise breakdown'
        ],
        color: 'purple',
    },
    {
        number: '2',
        icon: Briefcase,
        title: 'Placements Guidance & Preparation',
        description: 'Your gateway to starting a successful career. Get access to essential resources, preparation strategies, and expert advice to ace your campus placements and land your dream job.',
        features: [
            'Aptitude and coding preparation',
            'Interview strategies and tips',
            'Resume building workshops',
            'Core subjects review'
        ],
        color: 'blue',
    },
    {
        number: '3',
        icon: Network,
        title: 'Networking Tips',
        description: '"Your network is your net worth." Learn how to build meaningful professional relationships that can open doors to incredible career opportunities and industry insights.',
        features: [
            'LinkedIn profile optimization',
            'Cold outreach strategies',
            'Networking event etiquette',
            'Alumni connection building'
        ],
        color: 'emerald',
    },
];

const colorClasses = {
    blue: {
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        iconBg: 'bg-blue-100',
        iconColor: 'text-blue-600',
        numberBg: 'bg-blue-600',
    },
    purple: {
        bg: 'bg-purple-50',
        border: 'border-purple-200',
        iconBg: 'bg-purple-100',
        iconColor: 'text-purple-600',
        numberBg: 'bg-purple-600',
    },
    emerald: {
        bg: 'bg-emerald-50',
        border: 'border-emerald-200',
        iconBg: 'bg-emerald-100',
        iconColor: 'text-emerald-600',
        numberBg: 'bg-emerald-600',
    },
};

export const ServicesSection = () => {
    return (
        <section id="services" className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Our Services in Detail
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            At VTU Results, we offer a range of services designed to empower VTU students
                            throughout their academic and professional careers. Here's what we provide:
                        </p>
                    </div>

                    {/* Service Details */}
                    <div className="space-y-8">
                        {serviceDetails.map((service, index) => {
                            const IconComponent = service.icon;
                            const colors = colorClasses[service.color as keyof typeof colorClasses];

                            return (
                                <div
                                    key={index}
                                    className={`${colors.bg} rounded-2xl p-6 md:p-8 border ${colors.border}`}
                                >
                                    <div className="flex flex-col md:flex-row gap-6">
                                        {/* Number Badge */}
                                        <div className="flex-shrink-0">
                                            <div className={`w-12 h-12 ${colors.numberBg} rounded-xl flex items-center justify-center text-white font-bold text-xl`}>
                                                {service.number}
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className={`w-10 h-10 ${colors.iconBg} rounded-lg flex items-center justify-center`}>
                                                    <IconComponent className={`w-5 h-5 ${colors.iconColor}`} />
                                                </div>
                                                <h3 className="text-xl font-bold text-gray-900">
                                                    {service.title}
                                                </h3>
                                            </div>

                                            <p className="text-gray-700 mb-4 leading-relaxed">
                                                {service.description}
                                            </p>

                                            {/* Features */}
                                            <ul className="grid md:grid-cols-2 gap-2">
                                                {service.features.map((feature, featureIndex) => (
                                                    <li key={featureIndex} className="flex items-start gap-2">
                                                        <CheckCircle className={`w-4 h-4 ${colors.iconColor} flex-shrink-0 mt-0.5`} />
                                                        <span className="text-sm text-gray-600">{feature}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};
