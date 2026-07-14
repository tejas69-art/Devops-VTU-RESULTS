import React from 'react';
import { Briefcase, Target, BookOpen, UserCheck } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Placements Guidance & Preparation - VTU Career Support',
  description: 'Expert placement guidance, interview preparation tips, and resume building strategies for VTU engineering students.',
};

export default function PlacementsGuidancePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <Link href="/#services" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            &larr; Back to Services
          </Link>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-12">
          <div className="bg-gradient-to-r from-blue-600 to-cyan-700 px-8 py-12 text-white">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <Briefcase className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold">Placements Guidance</h1>
            </div>
            <p className="text-blue-100 text-lg max-w-2xl">
              Your gateway to starting a successful career. Get access to resources, preparation strategies, and expert advice to ace your campus placements.
            </p>
          </div>
          
          <div className="p-8 md:p-12">
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                <Target className="w-8 h-8 text-blue-600 mb-3" />
                <h3 className="font-bold text-gray-900 mb-2">Aptitude Prep</h3>
                <p className="text-sm text-gray-600">Master quantitative, logical, and verbal reasoning skills essential for initial screening rounds.</p>
              </div>
              <div className="bg-cyan-50 p-6 rounded-xl border border-cyan-100">
                <BookOpen className="w-8 h-8 text-cyan-600 mb-3" />
                <h3 className="font-bold text-gray-900 mb-2">Technical Skills</h3>
                <p className="text-sm text-gray-600">Core CS fundamentals, Data Structures, Algorithms, and domain-specific knowledge.</p>
              </div>
              <div className="bg-sky-50 p-6 rounded-xl border border-sky-100">
                <UserCheck className="w-8 h-8 text-sky-600 mb-3" />
                <h3 className="font-bold text-gray-900 mb-2">Interview Skills</h3>
                <p className="text-sm text-gray-600">HR interview preparation, behavioral questions, and resume building workshops.</p>
              </div>
            </div>

            <div className="prose prose-lg prose-blue max-w-none">
              <h2>The Placement Roadmap & Resources</h2>
              <p>
                Preparing for placements is a marathon, not a sprint. We recommend starting your preparation at least 6-8 months before the actual placement season begins in your 7th semester. Here is a detailed roadmap with highly recommended external resources to kickstart your preparation.
              </p>
              
              <h3>1. Resume Building (Semester 5-6)</h3>
              <p>
                Your resume is your first impression. Ensure it highlights your projects, internships, and technical skills clearly. Keep it to a single page and use a professional ATS-friendly template. Focus on quantifiable achievements rather than just listing responsibilities.
              </p>
              <div className="not-prose mt-4 mb-8">
                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Recommended Resources:</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <li><a href="https://rxresu.me/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-600 hover:text-blue-800 bg-blue-50 px-4 py-2 rounded-lg transition-colors"><Target className="w-4 h-4" /> Reactive Resume (Free & Open Source)</a></li>
                  <li><a href="https://resumeworded.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-600 hover:text-blue-800 bg-blue-50 px-4 py-2 rounded-lg transition-colors"><Target className="w-4 h-4" /> Resume Worded (ATS Scoring)</a></li>
                  <li><a href="https://novoresume.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-600 hover:text-blue-800 bg-blue-50 px-4 py-2 rounded-lg transition-colors"><Target className="w-4 h-4" /> Novoresume (Templates)</a></li>
                </ul>
              </div>

              <h3>2. Mastering Data Structures & Algorithms (Continuous)</h3>
              <p>
                Almost every product-based company conducts a coding round. Consistent practice is crucial. Focus on understanding the optimal solutions and time complexities, not just memorizing code. Start with arrays and strings, then move to trees, graphs, and dynamic programming.
              </p>
              <div className="not-prose mt-4 mb-8">
                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Recommended Resources:</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <li><a href="https://neetcode.io/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-600 hover:text-blue-800 bg-blue-50 px-4 py-2 rounded-lg transition-colors"><BookOpen className="w-4 h-4" /> NeetCode (Structured DSA Roadmap)</a></li>
                  <li><a href="https://leetcode.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-600 hover:text-blue-800 bg-blue-50 px-4 py-2 rounded-lg transition-colors"><BookOpen className="w-4 h-4" /> LeetCode (Practice Problems)</a></li>
                  <li><a href="https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-600 hover:text-blue-800 bg-blue-50 px-4 py-2 rounded-lg transition-colors"><BookOpen className="w-4 h-4" /> Striver's A2Z DSA Sheet</a></li>
                  <li><a href="https://www.geeksforgeeks.org/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-600 hover:text-blue-800 bg-blue-50 px-4 py-2 rounded-lg transition-colors"><BookOpen className="w-4 h-4" /> GeeksforGeeks (Concepts)</a></li>
                </ul>
              </div>

              <h3>3. Core Subjects Review (Semester 6)</h3>
              <p>
                Don't ignore your core subjects! Operating Systems (OS), Database Management Systems (DBMS), Computer Networks (CN), and Object-Oriented Programming (OOP) are frequently tested in technical interviews. Be ready to write basic SQL queries and explain ACID properties.
              </p>
              <div className="not-prose mt-4 mb-8">
                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Recommended Resources:</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <li><a href="https://www.youtube.com/@GateSmashers" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-600 hover:text-blue-800 bg-blue-50 px-4 py-2 rounded-lg transition-colors"><Target className="w-4 h-4" /> Gate Smashers (YouTube - Core CS)</a></li>
                  <li><a href="https://www.javatpoint.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-600 hover:text-blue-800 bg-blue-50 px-4 py-2 rounded-lg transition-colors"><Target className="w-4 h-4" /> Javatpoint (OOP & Theory)</a></li>
                  <li><a href="https://sqlzoo.net/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-600 hover:text-blue-800 bg-blue-50 px-4 py-2 rounded-lg transition-colors"><Target className="w-4 h-4" /> SQLZoo (Interactive SQL Practice)</a></li>
                </ul>
              </div>

              <h3>4. Mock Interviews (Semester 7)</h3>
              <p>
                Practice speaking out loud. Participate in mock interviews with peers or seniors to get comfortable explaining your thought process while solving technical problems. The way you communicate your approach is often as important as the solution itself.
              </p>
              <div className="not-prose mt-4 mb-8">
                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Recommended Resources:</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <li><a href="https://pramp.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-600 hover:text-blue-800 bg-blue-50 px-4 py-2 rounded-lg transition-colors"><UserCheck className="w-4 h-4" /> Pramp (Free Peer Mock Interviews)</a></li>
                  <li><a href="https://interviewing.io/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-600 hover:text-blue-800 bg-blue-50 px-4 py-2 rounded-lg transition-colors"><UserCheck className="w-4 h-4" /> Interviewing.io (Anonymous Mocks)</a></li>
                </ul>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-8 rounded-r-lg">
                <h4 className="text-blue-900 font-bold m-0 mb-2">Pro Tip:</h4>
                <p className="m-0 text-blue-800">
                  Always research the company before an interview. Understanding their products, tech stack, and recent news shows genuine interest and sets you apart from other candidates who only prepared generic answers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
