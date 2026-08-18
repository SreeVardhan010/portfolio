import React, { useState } from 'react';
import { Code2, BrainCircuit, Database, Cpu, Share2 } from 'lucide-react';
import type { SkillCategory, SkillNode } from '../types/portfolio';


interface SkillsMatrixProps {
  categories: SkillCategory[];
}

export const SkillsMatrix: React.FC<SkillsMatrixProps> = ({ categories }) => {
  const [activeSkill, setActiveSkill] = useState<SkillNode | null>(null);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code2': return <Code2 className="w-5 h-5 text-[#ff2e55]" />;
      case 'BrainCircuit': return <BrainCircuit className="w-5 h-5 text-[#00f0ff]" />;
      case 'Database': return <Database className="w-5 h-5 text-[#f59e0b]" />;
      default: return <Cpu className="w-5 h-5 text-[#00f0ff]" />;
    }
  };

  return (
    <section id="skills" className="py-20 relative bg-slate-950/40 border-y border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="mb-12 border-b border-slate-800 pb-6">
          <div className="flex items-center gap-2 font-mono text-xs text-[#00f0ff] font-semibold mb-2">
            <Share2 className="w-4 h-4 text-[#00f0ff]" />
            <span>// 03. WEB MATRIX SKILLS NODE ENGINE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Technical Proficiency & Architecture Nodes
          </h2>
          <p className="text-slate-400 text-sm mt-1 max-w-xl">
            Core stack languages, machine learning frameworks, data engineering engines, and cloud native infrastructure.
          </p>
        </div>

        {/* Skill Category Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="rounded-xl bg-[#0d1323]/80 border border-[#00f0ff]/20 p-6 flex flex-col justify-between cyber-corner"
            >
              <div>
                <div className="flex items-center gap-3 mb-3 pb-3 border-b border-slate-800">
                  <span className="p-2 rounded bg-slate-900 border border-slate-800">
                    {getCategoryIcon(cat.icon)}
                  </span>
                  <div>
                    <h3 className="font-bold text-white text-base">
                      {cat.categoryName}
                    </h3>
                    <p className="text-[11px] font-mono text-slate-400">
                      {cat.description}
                    </p>
                  </div>
                </div>

                {/* Skill Nodes List */}
                <div className="space-y-4 my-4">
                  {cat.skills.map((skill) => {
                    const isSelected = activeSkill?.name === skill.name;
                    return (
                      <div
                        key={skill.name}
                        onClick={() => setActiveSkill(isSelected ? null : skill)}
                        className={`p-3 rounded-lg border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#ff2e55]/15 border-[#ff2e55] shadow-[0_0_15px_rgba(255,46,85,0.3)]'
                            : 'bg-slate-900/60 border-slate-800 hover:border-[#00f0ff]/50'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-sm font-bold text-white">
                              {skill.name}
                            </span>
                            <span className="px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 font-mono text-[10px] border border-slate-700">
                              {skill.tag}
                            </span>
                          </div>
                          <span className="font-mono text-xs font-bold text-[#00f0ff]">
                            {skill.level}%
                          </span>
                        </div>

                        {/* Animated Level Bar */}
                        <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden mb-2">
                          <div
                            className={`h-full rounded-full transition-all duration-1000 ${
                              skill.nodeType === 'core'
                                ? 'bg-gradient-to-r from-[#ff2e55] to-[#f59e0b]'
                                : 'bg-gradient-to-r from-[#00f0ff] to-[#10b981]'
                            }`}
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>

                        <p className="text-[11px] text-slate-400 line-clamp-2">
                          {skill.description}
                        </p>

                        {/* Linked Node Badges */}
                        {skill.linkedSkills && skill.linkedSkills.length > 0 && (
                          <div className="flex items-center gap-1.5 mt-2 pt-1.5 border-t border-slate-800/60">
                            <span className="font-mono text-[10px] text-slate-500">NODES:</span>
                            {skill.linkedSkills.map((linked) => (
                              <span
                                key={linked}
                                className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-slate-800/80 text-[#00f0ff]"
                              >
                                {linked}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
