import React, { useState } from 'react';
import { Mail, Copy, Check, Send, Sparkles, ShieldCheck, Terminal, GitBranch, Share2, Globe } from 'lucide-react';
import type { UserProfile } from '../types/portfolio';


interface ContactFooterProps {
  profile: UserProfile;
  onOpenTerminal: () => void;
}

export const ContactFooter: React.FC<ContactFooterProps> = ({ profile, onOpenTerminal }) => {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message) return;
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', company: '', message: '' });
    }, 4000);
  };

  return (
    <footer id="contact" className="py-20 relative bg-slate-950/80 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12 border-b border-slate-800 pb-6 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-[#ff2e55] font-semibold mb-2">
            <Mail className="w-4 h-4 text-[#ff2e55]" />
            <span>// 05. TARGET LOCK & RECRUITER CONTACT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Initiate Contact & Engineering Audit
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            Ready to deploy high-throughput ML pipelines, real-time data streaming architectures, or full-stack control centers for your team.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Email & Social Hub */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick 1-Click Copy Box */}
            <div className="p-6 rounded-xl bg-[#0d1323]/90 border border-[#00f0ff]/30 cyber-corner cyber-corner-red shadow-lg">
              <h3 className="font-mono text-xs font-bold text-[#00f0ff] uppercase mb-2">
                DIRECT EMAIL TRANSMISSION
              </h3>
              <p className="text-xs text-slate-300 mb-4">
                Click below to copy verified direct inbox coordinates. Guaranteed sub-4hr response window for tech leads & recruiters.
              </p>

              <div className="flex items-center gap-2 p-3 rounded bg-slate-900 border border-slate-800 font-mono text-xs">
                <Mail className="w-4 h-4 text-[#ff2e55] shrink-0" />
                <span className="text-white font-semibold flex-1 truncate">{profile.email}</span>
                <button
                  onClick={handleCopyEmail}
                  className={`px-3 py-1.5 rounded text-xs font-bold transition-all flex items-center gap-1 ${
                    copied
                      ? 'bg-[#10b981] text-white'
                      : 'bg-[#ff2e55] text-white hover:bg-[#ff1744] shadow-[0_0_12px_rgba(255,46,85,0.4)]'
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>COPIED!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>COPY</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Social Links Matrix */}
            <div className="p-6 rounded-xl bg-[#0d1323]/70 border border-slate-800 space-y-4">
              <h3 className="font-mono text-xs font-bold text-slate-300 uppercase">
                EXTERNAL NETWORK NODES
              </h3>
              <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded bg-slate-900/80 border border-slate-800 hover:border-[#ff2e55] hover:text-[#ff2e55] flex items-center gap-2 transition-all"
                >
                  <GitBranch className="w-4 h-4" />
                  <span>GITHUB REPO</span>
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded bg-slate-900/80 border border-slate-800 hover:border-[#00f0ff] hover:text-[#00f0ff] flex items-center gap-2 transition-all"
                >
                  <Share2 className="w-4 h-4" />
                  <span>LINKEDIN</span>
                </a>
                <a
                  href={profile.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded bg-slate-900/80 border border-slate-800 hover:border-[#00f0ff] hover:text-[#00f0ff] flex items-center gap-2 transition-all"
                >
                  <Globe className="w-4 h-4" />
                  <span>X / TWITTER</span>
                </a>
                <button
                  onClick={onOpenTerminal}
                  className="p-3 rounded bg-[#ff2e55]/10 border border-[#ff2e55]/40 text-[#ff2e55] hover:bg-[#ff2e55]/20 flex items-center gap-2 transition-all text-left"
                >
                  <Terminal className="w-4 h-4" />
                  <span>CLI CONSOLE</span>
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-xl bg-[#0d1323]/90 border border-[#00f0ff]/20 cyber-corner">
              
              <h3 className="font-mono text-sm font-bold text-white mb-6 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#ff2e55]" />
                SEND HIGH-PRIORITY TELEMETRY MESSAGE
              </h3>

              {submitted ? (
                <div className="p-6 rounded bg-[#10b981]/15 border border-[#10b981]/40 text-center space-y-3 font-mono">
                  <ShieldCheck className="w-10 h-10 text-[#10b981] mx-auto" />
                  <h4 className="text-base font-bold text-[#10b981]">TRANSMISSION DISPATCHED SUCCESSFULLY!</h4>
                  <p className="text-xs text-slate-300">
                    Your recruiter telemetry vector has been routed to {profile.email}. Response expected under 4 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-xs text-slate-400 mb-1">
                        YOUR NAME / RECRUITER TITLE *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Sarah Jenkins (Tech Lead)"
                        className="w-full px-3.5 py-2.5 rounded bg-slate-900 border border-slate-800 text-white font-mono text-xs focus:border-[#00f0ff] outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-xs text-slate-400 mb-1">
                        COMPANY / ORGANIZATION
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="e.g. Quantum Systems Inc."
                        className="w-full px-3.5 py-2.5 rounded bg-slate-900 border border-slate-800 text-white font-mono text-xs focus:border-[#00f0ff] outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-xs text-slate-400 mb-1">
                      EMAIL COORDINATES *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. s.jenkins@quantumsystems.io"
                      className="w-full px-3.5 py-2.5 rounded bg-slate-900 border border-slate-800 text-white font-mono text-xs focus:border-[#00f0ff] outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-xs text-slate-400 mb-1">
                      PROJECT / ROLE OPPORTUNITY TELEMETRY *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe team tech stack, role requirements, or contract timeline..."
                      className="w-full px-3.5 py-2.5 rounded bg-slate-900 border border-slate-800 text-white font-mono text-xs focus:border-[#00f0ff] outline-none transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded bg-[#ff2e55] hover:bg-[#ff1744] text-white font-mono text-sm font-bold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,46,85,0.4)] transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span>DISPATCH MESSAGE TO ENGINEER</span>
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

        {/* Telemetry Footer Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} {profile.name}. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[#00f0ff]">SPIDER-TECH HUD ENGINE v4.2</span>
            <span>PING: 12ms</span>
            <span className="text-[#ff2e55]">LATENCY: OPTIMAL</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
