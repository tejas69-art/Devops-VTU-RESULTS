'use client';

import React from 'react';
import { ArrowRightLeft, Briefcase, Network, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const services = [
    {
        icon: ArrowRightLeft,
        title: 'Compare Results',
        description: 'Compare your academic performance across different semesters or against your peers with our intuitive comparison tools.',
        color: 'from-purple-500 to-indigo-600',
        bgColor: 'bg-purple-50',
        iconBg: 'bg-purple-100',
        iconColor: 'text-purple-600',
        link: '/services/compare-results'
    },
    {
        icon: Briefcase,
        title: 'Placements Guidance & Preparation',
        description: 'Comprehensive resources, mock interviews, and strategic guidance to help you land your dream job in top companies.',
        color: 'from-blue-500 to-cyan-600',
        bgColor: 'bg-blue-50',
        iconBg: 'bg-blue-100',
        iconColor: 'text-blue-600',
        link: '/services/placements-guidance'
    },
    {
        icon: Network,
        title: 'Networking Tips',
        description: 'Master the art of professional networking. Learn how to build meaningful connections that accelerate your career growth.',
        color: 'from-emerald-500 to-teal-600',
        bgColor: 'bg-emerald-50',
        iconBg: 'bg-emerald-100',
        iconColor: 'text-emerald-600',
        link: '/services/networking-tips'
    },
];

export const ServiceCards = () => {
    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Our Services
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        VTU Results provides comprehensive tools and resources for VTU students to track academic performance, prepare for careers, and build professional networks.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {services.map((service, index) => {
                        const IconComponent = service.icon;
                        return (
                            <div
                                key={index}
                                className={`group relative ${service.bgColor} rounded-2xl p-8 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
                            >
                                {/* Icon */}
                                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${service.iconBg} mb-6`}>
                                    <IconComponent className={`w-7 h-7 ${service.iconColor}`} />
                                </div>

                                {/* Content */}
                                <h3 className="text-xl font-bold text-gray-900 mb-3">
                                    {service.title}
                                </h3>
                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    {service.description}
                                </p>

                                {/* Link */}
                                <Link
                                    href={service.link}
                                    className={`inline-flex items-center gap-2 text-sm font-semibold bg-gradient-to-r ${service.color} bg-clip-text text-transparent group-hover:gap-3 transition-all`}
                                >
                                    Get Started
                                    <ArrowRight className={`w-4 h-4 ${service.iconColor}`} />
                                </Link>

                                {/* Decorative gradient */}
                                <div className={`absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r ${service.color} rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
