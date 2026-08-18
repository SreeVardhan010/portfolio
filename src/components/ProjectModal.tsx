import React, { useState, useEffect } from 'react';
import { X, ExternalLink, GitBranch, Cpu, ShieldCheck, Activity, Layers, CheckCircle2, Play, RefreshCw, BarChart2 } from 'lucide-react';
import type { Project } from '../types/portfolio';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [simulating, setSimulating] = useState(false);
  const [simStep, setSimStep] = useState(0);
  const [latencyHistory, setLatencyHistory] = useState<number[]>([14, 12, 15, 11, 13, 10, 14]);

  useEffect(() => {
    let interval: any;
    if (simulating) {
      interval = setInterval(() => {
        setSimStep((prev) => {
          if (prev >= 100) {
            setSimulating(false);
            return 100;
          }
          return prev + 10;
        });

        setLatencyHistory((prev) => [
          ...prev.slice(1),
          Math.floor(Math.random() * 8) + 8, // 8ms - 16ms jitter
        ]);
      }, 200);
    }
    return () => clearInterval(interval);
  }, [simulating]);

  if (!project) return null;

  const handleStartSimulation = () => {
    setSimStep(0);
    setSimulating(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl rounded-xl bg-[#0d1323] border border-[#00f0ff]/50 shadow-[0_0_40px_rgba(0,240,255,0.2)] overflow-hidden cyber-corner cyber-corner-red flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#00f0ff] mb-1">
              <Layers className="w-4 h-4 text-[#ff2e55]" />
              <span>PROJECT ARCHITECTURE TELEMETRY // {project.id.toUpperCase()}</span>
            </div>
            <h3 className="text-2xl font-extrabold text-white">
              {project.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded bg-slate-800 text-slate-400 hover:text-white hover:bg-[#ff2e55] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 overflow-y-auto">
          
          {/* Subtitle & Category */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-3 rounded bg-slate-900/60 border border-slate-800">
            <span className="font-mono text-xs text-slate-300">
              CATEGORY: <strong className="text-[#00f0ff]">{project.category}</strong>
            </span>
            <span className="font-mono text-xs text-slate-300">
              RADAR BENCHMARK: <strong className="text-[#ff2e55]">{project.radarScore}/100</strong>
            </span>
          </div>

          {/* Interactive Live Benchmark Simulation Suite */}
          <div className="p-4 rounded-lg bg-[#070a11] border border-[#00f0ff]/30 space-y-3">
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="font-bold text-[#00f0ff] flex items-center gap-1.5">
                <BarChart2 className="w-4 h-4 text-[#ff2e55]" />
                LIVE THROUGHPUT & LATENCY BENCHMARK SIMULATOR
              </span>
              <button
                onClick={handleStartSimulation}
                disabled={simulating}
                className="px-3 py-1.5 rounded bg-[#ff2e55] hover:bg-[#ff1744] text-white font-bold flex items-center gap-1.5 transition-all shadow-[0_0_12px_rgba(255,46,85,0.4)] disabled:opacity-50"
              >
                {simulating ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>SIMULATING ({simStep}%)...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5" />
                    <span>RUN BENCHMARK TEST</span>
                  </>
                )}
              </button>
            </div>

            {/* Real-time Latency Chart Visualizer */}
            <div className="p-3 rounded bg-slate-900/80 border border-slate-800">
              <div className="flex items-center justify-between font-mono text-[10px] text-slate-400 mb-2">
                <span>INGESTION LATENCY TELEMETRY STREAM (P99)</span>
                <span className="text-[#10b981] font-bold">AVG: {latencyHistory[latencyHistory.length - 1]}ms</span>
              </div>
              <div className="h-16 flex items-end justify-between gap-1 pt-2 border-b border-slate-800">
                {latencyHistory.map((val, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className="w-full rounded-t bg-gradient-to-t from-[#00f0ff]/40 to-[#ff2e55] transition-all duration-300"
                      style={{ height: `${val * 3.5}px` }}
                    />
                    <span className="font-mono text-[9px] text-slate-500">{val}m</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Business Impact Banner */}
          <div className="p-4 rounded-lg bg-[#ff2e55]/10 border border-[#ff2e55]/40 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#ff2e55] shrink-0 mt-0.5" />
            <div>
              <h4 className="font-mono text-xs font-bold text-[#ff2e55] mb-1">BUSINESS IMPACT & RESULTS</h4>
              <p className="text-sm text-slate-200">{project.businessImpact}</p>
            </div>
          </div>

          {/* Problem & Solution Grid */}
          <div className="grid md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded bg-slate-900/80 border border-slate-800">
              <h5 className="font-mono font-bold text-[#ff2e55] mb-2 flex items-center gap-1.5">
                <Activity className="w-4 h-4" />
                SYSTEM PROBLEM STATEMENT
              </h5>
              <p className="text-slate-300 leading-relaxed">{project.problem}</p>
            </div>
            <div className="p-4 rounded bg-slate-900/80 border border-slate-800">
              <h5 className="font-mono font-bold text-[#00f0ff] mb-2 flex items-center gap-1.5">
                <Cpu className="w-4 h-4" />
                ENGINEERING SOLUTION
              </h5>
              <p className="text-slate-300 leading-relaxed">{project.solution}</p>
            </div>
          </div>

          {/* Architecture Notes */}
          <div className="p-4 rounded bg-slate-900/60 border border-slate-800">
            <h5 className="font-mono text-xs font-bold text-slate-200 mb-2 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#00f0ff]" />
              DEEP ARCHITECTURE & OPTIMIZATION NOTES
            </h5>
            <p className="font-mono text-xs text-slate-400 leading-relaxed">
              {project.architectureNotes}
            </p>
          </div>

          {/* Performance Metrics */}
          <div>
            <h5 className="font-mono text-xs font-bold text-slate-300 mb-2">KEY TELEMETRY METRICS</h5>
            <div className="flex flex-wrap gap-2">
              {project.metrics.map((m, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded bg-[#0d1323] border border-[#00f0ff]/40 text-[#00f0ff] font-mono text-xs"
                >
                  ⚡ {m}
                </span>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <h5 className="font-mono text-xs font-bold text-slate-300 mb-2">TECHNOLOGY STACK</h5>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 font-mono text-xs border border-slate-700"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between font-mono text-xs">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-slate-800 text-slate-300 hover:text-white transition-colors"
          >
            CLOSE TELEMETRY
          </button>
          <div className="flex items-center gap-3">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded bg-slate-800 border border-slate-700 text-slate-200 hover:text-[#ff2e55] hover:border-[#ff2e55] flex items-center gap-1.5 transition-all"
            >
              <GitBranch className="w-4 h-4" />
              <span>SOURCE REPO</span>
            </a>
            <a
              href={project.liveDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded bg-[#ff2e55] text-white hover:bg-[#ff1744] font-bold flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(255,46,85,0.4)]"
            >
              <ExternalLink className="w-4 h-4" />
              <span>LIVE DEMO</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
