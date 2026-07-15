'use client';
import React, { useState } from 'react';
import { JOBS_DATA, JobListing } from '@/lib/jobs-data';
import { Briefcase, MapPin, Calendar, Search, ArrowUpRight, SlidersHorizontal, Building, Clock, Info } from 'lucide-react';
import AdUnit from '@/components/AdSense/AdUnit';

export default function JobsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedType, setSelectedType] = useState<string>('All');
    const [selectedCategory, setSelectedCategory] = useState<string>('All');

    // Filter logic
    const filteredJobs = JOBS_DATA.filter((job) => {
        const matchesSearch = 
            job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.description.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesType = selectedType === 'All' || job.type === selectedType;
        const matchesCategory = selectedCategory === 'All' || job.category === selectedCategory;

        return matchesSearch && matchesType && matchesCategory;
    });

    const jobTypes = ['All', 'Internship', 'Full-time', 'Remote'];
    const categories = ['All', 'Software Development'];

    const formatRelativeDate = (dateStr: string) => {
        try {
            const date = new Date(dateStr);
            const now = new Date();
            const diffTime = Math.abs(now.getTime() - date.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            if (diffDays <= 1) return 'Today';
            if (diffDays === 2) return 'Yesterday';
            if (diffDays < 30) return `${diffDays} days ago`;
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        } catch {
            return 'Recently';
        }
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'Internship':
                return 'text-emerald-700 bg-emerald-50 border-emerald-100';
            case 'Full-time':
                return 'text-indigo-700 bg-indigo-50 border-indigo-100';
            case 'Remote':
                return 'text-sky-700 bg-sky-50 border-sky-100';
            default:
                return 'text-slate-700 bg-slate-50 border-slate-100';
        }
    };

    return (
        <div className="space-y-8">
            {/* Header Description */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-200">
                        <Briefcase className="h-5.5 w-5.5" />
                    </div>
                    <div>
                        <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 rounded-md uppercase tracking-wider">Student Career Hub</span>
                        <h1 className="font-outfit text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                            Jobs & Internships Board
                        </h1>
                    </div>
                </div>
                <p className="text-slate-600 text-xs sm:text-sm font-semibold leading-relaxed max-w-3xl">
                    Discover active software engineering internships, entry-level off-campus drives, and career opportunities. Listings are compiled and automatically updated from leading job preparation portals like OnlineStudy4U to support VTU and engineering students in their placement goals.
                </p>
            </div>

            {/* Ad Unit Zone */}
            <AdUnit adSlot="1098234765" className="w-full bg-white rounded-xl shadow-sm border border-slate-200/50 p-2 flex justify-center items-center text-slate-450 text-xs font-bold" />

            {/* Search and Filters Hub */}
            <div className="bg-white rounded-2.5xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                    {/* Search Field */}
                    <div className="flex-grow relative">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search by title, company, skills..."
                            className="w-full h-11 pl-11 pr-4 bg-slate-50 border border-slate-250 rounded-xl text-sm font-semibold focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/25 transition-all text-slate-800"
                        />
                    </div>

                    {/* Filter Indicator/Button */}
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-500 border border-slate-200/60 rounded-xl px-4 py-2.5 self-start sm:self-auto bg-slate-50/50 shrink-0">
                        <SlidersHorizontal className="h-4 w-4 text-slate-450" />
                        <span>Filter Results</span>
                    </div>
                </div>

                {/* Tag Filters */}
                <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
                    <div className="flex flex-wrap gap-1.5 items-center">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mr-2">Job Type:</span>
                        {jobTypes.map((type) => (
                            <button
                                key={type}
                                onClick={() => setSelectedType(type)}
                                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all border ${
                                    selectedType === type
                                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                                        : 'bg-white text-slate-655 border-slate-200 hover:border-slate-350 hover:bg-slate-50/50'
                                }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Job Listings List */}
            <div className="space-y-4">
                {filteredJobs.length > 0 ? (
                    filteredJobs.map((job) => (
                        <div 
                            key={job.id} 
                            className="group bg-white rounded-2.5xl border border-slate-200/80 p-5 sm:p-6 shadow-sm hover:border-slate-350 hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5"
                        >
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                <div className="flex items-start gap-4">
                                    {/* Company Logo */}
                                    <div className="h-12 w-12 rounded-xl bg-slate-100 border border-slate-150 flex items-center justify-center overflow-hidden shrink-0">
                                        {job.logoUrl ? (
                                            <img 
                                                src={job.logoUrl} 
                                                alt={`${job.company} logo`}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    // Fallback to building icon if image load fails
                                                    (e.target as HTMLElement).style.display = 'none';
                                                }}
                                            />
                                        ) : (
                                            <Building className="h-6 w-6 text-slate-400" />
                                        )}
                                    </div>

                                    {/* Job Info */}
                                    <div className="space-y-1">
                                        <div className="flex items-center flex-wrap gap-2">
                                            <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded border ${getTypeColor(job.type)}`}>
                                                {job.type}
                                            </span>
                                            <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                                                <Clock className="h-3 w-3" />
                                                {formatRelativeDate(job.postedDate)}
                                            </span>
                                        </div>
                                        <h3 className="font-outfit text-base sm:text-lg font-bold text-slate-900 group-hover:text-indigo-650 transition-colors">
                                            {job.title}
                                        </h3>
                                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-semibold text-slate-500">
                                            <span className="text-slate-700 flex items-center gap-1">
                                                <Building className="h-3.5 w-3.5 text-slate-400" />
                                                {job.company}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <MapPin className="h-3.5 w-3.5 text-slate-400" />
                                                {job.location}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Apply Action */}
                                <a
                                    href={job.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-all duration-200 shadow-sm group-hover:shadow-md transform group-hover:-translate-y-0.5 shrink-0"
                                >
                                    Apply Now
                                    <ArrowUpRight className="h-3.5 w-3.5" />
                                </a>
                            </div>

                            {/* Job Description Plain Snippet */}
                            <div className="mt-4 pt-4 border-t border-slate-100">
                                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-semibold">
                                    {job.description}
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="bg-white rounded-2.5xl border border-slate-200 p-12 text-center shadow-sm">
                        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-slate-50 text-slate-400 mb-3 border border-slate-100">
                            <SlidersHorizontal className="h-6 w-6" />
                        </div>
                        <h3 className="text-base font-bold text-slate-900">No postings found</h3>
                        <p className="text-slate-500 text-xs mt-1.5 font-semibold max-w-sm mx-auto">
                            We couldn't find any job or internship listings matching "{searchQuery}" with the selected filters. Try broadening your keywords.
                        </p>
                    </div>
                )}
            </div>

            {/* Disclaimer Alert */}
            <div className="p-4 bg-amber-50/50 border border-amber-200/60 rounded-2xl flex items-start gap-3">
                <Info className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                    <h4 className="text-xs font-bold text-amber-900">Affiliation & Integrity Disclaimer</h4>
                    <p className="text-[11px] text-amber-955/80 leading-relaxed font-semibold">
                        This career directory lists aggregates crawled for educational purposes. We are not officially affiliated with the posting employers or third-party applicant portals. Always verify application status directly on employer domains before sharing personal information.
                    </p>
                </div>
            </div>
        </div>
    );
}
