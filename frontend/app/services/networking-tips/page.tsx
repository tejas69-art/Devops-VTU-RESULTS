import React from 'react';
import { Network, Linkedin, MessageSquare, UsersRound } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Networking Tips & Strategies - VTU Career Support',
  description: 'Learn effective networking strategies, LinkedIn profile optimization, and how to build professional connections for career growth.',
};

export default function NetworkingTipsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <Link href="/#services" className="text-emerald-600 hover:text-emerald-800 text-sm font-medium">
            &larr; Back to Services
          </Link>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-12">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 px-8 py-12 text-white">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <Network className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold">Networking Tips</h1>
            </div>
            <p className="text-emerald-50 text-lg max-w-2xl">
              "Your network is your net worth." Learn how to build meaningful professional relationships that can open doors to incredible career opportunities.
            </p>
          </div>
          
          <div className="p-8 md:p-12 prose prose-lg prose-emerald max-w-none">
            <h2>Why Networking Matters for Students</h2>
            <p>
              Many job openings are never publicly advertised; they are filled through referrals and professional networks. Building a strong network early in your academic career gives you a significant advantage when it's time to find an internship or full-time role.
            </p>
            
            <div className="my-10 space-y-6 not-prose">
              <div className="flex gap-6 items-start bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-blue-100 p-4 rounded-full text-blue-600 flex-shrink-0">
                  <Linkedin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Optimize Your LinkedIn Profile</h3>
                  <p className="text-gray-600 mb-3">Your LinkedIn profile is your digital resume. Ensure you have a professional headshot, a compelling summary, and detailed descriptions of your projects and skills.</p>
                  <ul className="text-sm text-gray-500 space-y-1">
                    <li>• Use a clear headline that states what you do (e.g., "CS Student @ VTU | Aspiring Software Engineer")</li>
                    <li>• Request recommendations from professors or internship managers</li>
                    <li>• Share relevant academic achievements and projects</li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-6 items-start bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-emerald-100 p-4 rounded-full text-emerald-600 flex-shrink-0">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Master the Cold Outreach</h3>
                  <p className="text-gray-600 mb-3">Reaching out to alumni or professionals in your dream companies can be intimidating, but it's highly effective if done right.</p>
                  <ul className="text-sm text-gray-500 space-y-1">
                    <li>• Always send a personalized note with your connection request</li>
                    <li>• Be concise and clear about why you're reaching out</li>
                    <li>• Ask for informational interviews rather than immediately asking for a job</li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-6 items-start bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-purple-100 p-4 rounded-full text-purple-600 flex-shrink-0">
                  <UsersRound className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Attend Tech Events & Hackathons</h3>
                  <p className="text-gray-600 mb-3">In-person and virtual events are excellent places to meet like-minded peers and industry professionals.</p>
                  <ul className="text-sm text-gray-500 space-y-1">
                    <li>• Participate actively and ask insightful questions</li>
                    <li>• Follow up with speakers or attendees you connected with on LinkedIn</li>
                    <li>• Collaborate with students from other colleges in hackathons</li>
                  </ul>
                </div>
              </div>
            </div>

            <h2>Networking Etiquette</h2>
            <p>
              Remember that networking is a two-way street. Focus on building genuine relationships rather than purely transactional ones. Express gratitude when someone takes the time to speak with you, and try to offer value whenever possible—even as a student, your unique perspective can be valuable!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
