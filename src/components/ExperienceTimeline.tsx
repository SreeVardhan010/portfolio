import React, { useState } from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle, ChevronRight, Award } from 'lucide-react';
import type { ExperienceItem } from '../types/portfolio';


interface ExperienceTimelineProps {
  experience: ExperienceItem[];
}

export const ExperienceTimeline: React.FC<ExperienceTimelineProps> = ({ experience }) => {
  const [expandedId, setExpandedId] = useState<string>(experience[0]?.id || '');

  return (
    <section id="experience" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="mb-12 border-b border-slate-800 pb-6">
          <div className="flex items-center gap-2 font-mono text-xs text-[#ff2e55] font-semibold mb-2">
            <Briefcase className="w-4 h-4 text-[#ff2e55]" />
            <span>// 04. MISSION ROADMAP & EXPERIENCE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Career Timeline & Engineering Impact
          </h2>
          <p className="text-slate-400 text-sm mt-1 max-w-xl">
            Track record of designing, scaling, and maintaining high-concurrency systems across fast-paced teams.
          </p>
        </div>

        {/* Vertical Timeline Container */}
        <div className="relative border-l-2 border-slate-800 ml-4 sm:ml-8 space-y-10">
          {experience.map((item) => {
            const isExpanded = expandedId === item.id;
            return (
              <div key={item.id} className="relative pl-6 sm:pl-10 group">
                
                {/* Node Milestone Circle */}
                <div
                  onClick={() => setExpandedId(isExpanded ? '' : item.id)}
                  className={`absolute -left-[17px] top-1.5 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-all ${
                    isExpanded
                      ? 'bg-[#ff2e55] text-white shadow-[0_0_15px_rgba(255,46,85,0.8)] border-2 border-white'
                      : 'bg-[#0d1323] text-slate-400 border-2 border-[#00f0ff]/50 hover:border-[#ff2e55]'
                  }`}
                >
                  <Briefcase className="w-3.5 h-3.5" />
                </div>

                {/* Main Card */}
                <div className="rounded-xl bg-[#0d1323]/80 border border-[#00f0ff]/20 p-6 hover:border-[#ff2e55]/60 transition-all cyber-corner">
                  
                  {/* Card Header */}
                  <div
                    onClick={() => setExpandedId(isExpanded ? '' : item.id)}
                    className="cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-slate-800"
                  >
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="text-xl font-bold text-white group-hover:text-[#00f0ff] transition-colors">
                          {item.role}
                        </h3>
                        <span className="px-2 py-0.5 rounded bg-[#ff2e55]/10 text-[#ff2e55] font-mono text-xs font-semibold border border-[#ff2e55]/30">
                          {item.company}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-[#00f0ff]" />
                          {item.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-500" />
                          {item.location}
                        </span>
                        <span className="px-1.5 py-0.2 rounded bg-slate-800 text-slate-300">
                          {item.type}
                        </span>
                      </div>
                    </div>

                    <button className="text-slate-400 hover:text-[#00f0ff] font-mono text-xs flex items-center gap-1 self-start md:self-auto">
                      <span>{isExpanded ? '[ COLLAPSE ]' : '[ INSPECT TELEMETRY ]'}</span>
                      <ChevronRight className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90 text-[#ff2e55]' : ''}`} />
                    </button>
                  </div>

                  {/* Card Description */}
                  <p className="text-slate-300 text-sm my-4 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Measured Telemetry Impact Bullets */}
                  <div className="space-y-2.5 mb-4">
                    <h4 className="font-mono text-xs font-bold text-[#00f0ff] uppercase">
                      MEASURED IMPACT & TELEMETRY
                    </h4>
                    {item.metrics.map((metric, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <CheckCircle className="w-4 h-4 text-[#ff2e55] shrink-0 mt-0.5" />
                        <span>{metric}</span>
                      </div>
                    ))}
                  </div>

                  {/* Achievements */}
                  {isExpanded && item.achievements && (
                    <div className="mt-4 pt-4 border-t border-slate-800 space-y-2">
                      <h4 className="font-mono text-xs font-bold text-[#f59e0b] uppercase flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5" />
                        KEY MILESTONES DELIVERED
                      </h4>
                      <div className="grid sm:grid-cols-2 gap-2">
                        {item.achievements.map((ach, i) => (
                          <div key={i} className="p-2 rounded bg-slate-900/80 border border-slate-800 text-xs text-slate-300">
                            ✓ {ach}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tech Stack Used */}
                  <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-slate-800/80">
                    {item.techUsed.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-900 text-slate-400 border border-slate-700"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
