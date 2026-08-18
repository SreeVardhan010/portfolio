import React, { useState } from 'react';
import { ExternalLink, GitBranch, Layers, BarChart3, CheckCircle2 } from 'lucide-react';
import type { Project } from '../types/portfolio';


interface ProjectsSectionProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects,
  onSelectProject,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = ['ALL', 'AI / ML', 'Data Systems', 'Full-Stack'];

  const filteredProjects = selectedCategory === 'ALL'
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#ff2e55] font-semibold mb-2">
              <span className="w-2 h-2 rounded-full bg-[#ff2e55] animate-ping" />
              <span>// 02. TARGET ARCHITECTURE MATRIX</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Featured Radar Projects
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-xl">
              High-throughput production microservices, neural streaming engines, and analytical databases engineered for peak performance.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 mt-6 md:mt-0 font-mono text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#ff2e55] text-white font-bold shadow-[0_0_15px_rgba(255,46,85,0.5)]'
                    : 'bg-[#0d1323] text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                [{cat.toUpperCase()}]
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group relative rounded-xl bg-[#0d1323]/80 border border-[#00f0ff]/20 hover:border-[#ff2e55] hover:shadow-[0_0_25px_rgba(255,46,85,0.3)] transition-all duration-300 flex flex-col justify-between overflow-hidden cyber-corner"
            >
              
              {/* Card Header Info */}
              <div className="p-6">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-1 rounded bg-[#00f0ff]/10 text-[#00f0ff] font-mono text-xs font-semibold border border-[#00f0ff]/30">
                    {project.category}
                  </span>
                  <div className="flex items-center gap-1 font-mono text-xs text-[#ff2e55]">
                    <BarChart3 className="w-3.5 h-3.5" />
                    <span>RADAR SCORE: {project.radarScore}/100</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-[#00f0ff] transition-colors mb-1">
                  {project.title}
                </h3>
                <p className="font-mono text-xs text-slate-400 mb-4">
                  {project.subtitle}
                </p>

                {/* Problem & Solution summary */}
                <div className="space-y-3 text-xs text-slate-300 mb-4 bg-slate-900/60 p-3 rounded border border-slate-800">
                  <div>
                    <span className="font-mono text-[#ff2e55] font-semibold">PROBLEM: </span>
                    {project.problem}
                  </div>
                  <div>
                    <span className="font-mono text-[#00f0ff] font-semibold">SOLUTION: </span>
                    {project.solution}
                  </div>
                </div>

                {/* Business Impact Banner */}
                <div className="mb-4 p-2.5 rounded bg-[#ff2e55]/10 border border-[#ff2e55]/30 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#ff2e55] shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-200 font-medium">
                    <strong className="font-mono text-[#ff2e55]">IMPACT:</strong> {project.businessImpact}
                  </p>
                </div>

                {/* Key Metrics */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.metrics.map((metric, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded bg-slate-800 text-slate-200 font-mono text-[11px] border border-slate-700"
                    >
                      ⚡ {metric}
                    </span>
                  ))}
                </div>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800/80">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#0d1323] text-slate-400 border border-slate-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="px-6 py-3.5 bg-slate-900/80 border-t border-slate-800 flex items-center justify-between font-mono text-xs">
                <button
                  onClick={() => onSelectProject(project)}
                  className="text-[#00f0ff] hover:text-white flex items-center gap-1 font-semibold hover:underline"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>INSPECT ARCHITECTURE</span>
                </button>

                <div className="flex items-center gap-3">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-[#ff2e55] transition-colors flex items-center gap-1"
                    title="View GitHub Repository"
                  >
                    <GitBranch className="w-4 h-4" />
                    <span className="hidden sm:inline">REPO</span>
                  </a>
                  <a
                    href={project.liveDemoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-[#00f0ff] transition-colors flex items-center gap-1"
                    title="Live Demo Endpoint"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span className="hidden sm:inline">DEMO</span>
                  </a>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
