import React from 'react';
import { X, Download, Printer, FileText, Mail, MapPin, Globe, Award, BookOpen } from 'lucide-react';
import type { PortfolioData } from '../types/portfolio';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: PortfolioData;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadText = () => {
    const content = `
${data.profile.name.toUpperCase()} - ${data.profile.role.toUpperCase()}
Email: ${data.profile.email} | Location: ${data.profile.location}
GitHub: ${data.profile.github} | LinkedIn: ${data.profile.linkedin}

============================================================
PROFESSIONAL SUMMARY
============================================================
${data.profile.summary}

============================================================
EDUCATION
============================================================
• B.Tech, Computer Science and Engineering — SRM University, Chennai (Jul 2022 – May 2026)
  CGPA: 9.05 / 10
• Intermediate (MPC) — Narayana Junior College, Hyderabad (Jun 2020 – Mar 2022)
  CGPA: 9.6 / 10
• SSC — Narayana Olympiad School, Hyderabad (Jun 2019 – Mar 2020)
  CGPA: 10.0 / 10

============================================================
CERTIFICATIONS & COURSES
============================================================
• NPTEL: Machine Learning, Data Science, Data Mining, Design & Analysis of Algorithms
• Infosys: JavaScript
• Oracle: Database Management Systems (DBMS)
• Simplilearn: Basic Linux | Basic Kubernetes

============================================================
FEATURED PROJECTS
============================================================
${data.projects.map(p => `
* ${p.title} (${p.category})
  - Problem: ${p.problem}
  - Solution: ${p.solution}
  - Impact: ${p.businessImpact}
  - Tech Stack: ${p.techStack.join(', ')}
`).join('\n')}

============================================================
TECHNICAL SKILLS MATRIX
============================================================
${data.skillCategories.map(c => `
${c.categoryName}:
  ${c.skills.map(s => `• ${s.name} (${s.level}%) - ${s.description}`).join('\n')}
`).join('\n')}

============================================================
LANGUAGES
============================================================
English (Advanced) | Telugu (Native) | Hindi (Intermediate)
`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${data.profile.name.replace(/\s+/g, '_')}_Resume.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[90vh] rounded-xl bg-[#0d1323] border border-[#00f0ff]/40 shadow-[0_0_50px_rgba(0,240,255,0.25)] flex flex-col overflow-hidden cyber-corner cyber-corner-red">
        
        {/* Modal Header */}
        <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between font-mono text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#ff2e55]" />
            <span className="text-white font-bold">SREEVARDHAN CAPILAI // RADAR RESUME (PRINT READY)</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-xs flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">PRINT PDF</span>
            </button>
            <button
              onClick={handleDownloadText}
              className="px-3 py-1.5 rounded bg-[#ff2e55] hover:bg-[#ff1744] text-white font-mono text-xs font-bold flex items-center gap-1.5 transition-all shadow-[0_0_12px_rgba(255,46,85,0.4)]"
            >
              <Download className="w-3.5 h-3.5" />
              <span>DOWNLOAD RESUME</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div className="p-8 space-y-8 overflow-y-auto bg-[#090d16] text-slate-200 print:bg-white print:text-black">
          
          {/* Header */}
          <div className="border-b border-slate-800 pb-6 print:border-black">
            <h1 className="text-3xl font-extrabold text-white print:text-black tracking-tight">
              {data.profile.name}
            </h1>
            <p className="font-mono text-base text-[#00f0ff] print:text-black font-semibold mt-1">
              {data.profile.role}
            </p>
            <div className="flex flex-wrap gap-4 mt-3 font-mono text-xs text-slate-400 print:text-gray-700">
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-[#ff2e55]" />
                {data.profile.email}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#00f0ff]" />
                {data.profile.location}
              </span>
              <span className="flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-[#10b981]" />
                github.com/SreeVardhan010
              </span>
            </div>
          </div>

          {/* Professional Summary */}
          <div>
            <h3 className="font-mono text-xs font-bold text-[#ff2e55] print:text-black uppercase mb-2">
              PROFESSIONAL SUMMARY
            </h3>
            <p className="text-sm text-slate-300 print:text-gray-800 leading-relaxed">
              {data.profile.summary}
            </p>
          </div>

          {/* Education */}
          <div className="space-y-4">
            <h3 className="font-mono text-xs font-bold text-[#00f0ff] print:text-black uppercase border-b border-slate-800 pb-1 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-[#00f0ff]" />
              EDUCATION
            </h3>
            <div className="space-y-3 font-mono text-xs">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-white print:text-black text-sm">
                    B.Tech, Computer Science and Engineering — SRM University, Chennai
                  </h4>
                  <p className="text-slate-400 print:text-gray-700">CGPA: <strong className="text-[#00f0ff] print:text-black">9.05 / 10</strong></p>
                </div>
                <span className="text-slate-400 print:text-gray-600">Jul 2022 – May 2026</span>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-white print:text-black text-sm">
                    Intermediate (MPC) — Narayana Junior College, Hyderabad
                  </h4>
                  <p className="text-slate-400 print:text-gray-700">CGPA: <strong className="text-[#ff2e55] print:text-black">9.6 / 10</strong></p>
                </div>
                <span className="text-slate-400 print:text-gray-600">Jun 2020 – Mar 2022</span>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-white print:text-black text-sm">
                    SSC — Narayana Olympiad School, Hyderabad
                  </h4>
                  <p className="text-slate-400 print:text-gray-700">CGPA: <strong className="text-[#10b981] print:text-black">10.0 / 10</strong></p>
                </div>
                <span className="text-slate-400 print:text-gray-600">Jun 2019 – Mar 2020</span>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div className="space-y-3">
            <h3 className="font-mono text-xs font-bold text-[#f59e0b] print:text-black uppercase border-b border-slate-800 pb-1 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-[#f59e0b]" />
              CERTIFICATIONS & COURSES
            </h3>
            <div className="grid sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded bg-slate-900/60 border border-slate-800 print:border-gray-300">
                <h4 className="font-mono font-bold text-[#f59e0b] print:text-black mb-1">NPTEL CERTIFICATIONS</h4>
                <p className="text-slate-300 print:text-gray-800">
                  Machine Learning • Data Science • Data Mining • Design & Analysis of Algorithms
                </p>
              </div>
              <div className="p-3 rounded bg-slate-900/60 border border-slate-800 print:border-gray-300">
                <h4 className="font-mono font-bold text-[#00f0ff] print:text-black mb-1">INDUSTRY CERTIFICATIONS</h4>
                <p className="text-slate-300 print:text-gray-800">
                  JavaScript (Infosys) • Database Management Systems (Oracle) • Basic Linux & Kubernetes (Simplilearn)
                </p>
              </div>
            </div>
          </div>

          {/* Featured Radar Projects */}
          <div className="space-y-4">
            <h3 className="font-mono text-xs font-bold text-[#ff2e55] print:text-black uppercase border-b border-slate-800 pb-1">
              ENGINEERING PROJECTS
            </h3>
            <div className="space-y-3 text-xs">
              {data.projects.map((proj) => (
                <div key={proj.id} className="p-3 rounded bg-slate-900/60 border border-slate-800 print:border-gray-300">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="font-bold text-white print:text-black text-sm">{proj.title}</h4>
                    <span className="font-mono text-[10px] text-[#00f0ff]">{proj.category}</span>
                  </div>
                  <p className="text-slate-300 print:text-gray-800 my-1">{proj.problem}</p>
                  <p className="text-[#ff2e55] print:text-black font-mono text-[11px]">Impact: {proj.businessImpact}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div>
            <h3 className="font-mono text-xs font-bold text-[#10b981] print:text-black uppercase border-b border-slate-800 pb-1 mb-2">
              LANGUAGES
            </h3>
            <p className="font-mono text-xs text-slate-300 print:text-gray-800">
              English (Advanced) | Telugu (Native) | Hindi (Intermediate)
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
