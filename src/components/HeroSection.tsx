import React, { useState, useEffect } from 'react';
import { ShieldCheck, Cpu, Activity, Zap, ArrowRight, Download, Terminal, ChevronDown, Sparkles } from 'lucide-react';
import type { UserProfile } from '../types/portfolio';


interface HeroSectionProps {
  profile: UserProfile;
  onOpenTerminal: () => void;
  onOpenResume: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  profile,
  onOpenTerminal,
  onOpenResume,
}) => {
  const roles = [
    'Software & ML Engineer',
    'Data Pipeline Developer',
    'Apache Kafka & Spark Specialist',
    'Full-Stack Developer',
  ];

  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    const targetText = roles[currentRoleIndex];
    const typingSpeed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(targetText.substring(0, displayText.length + 1));
        if (displayText.length === targetText.length) {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setDisplayText(targetText.substring(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentRoleIndex]);

  const getStatIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu': return <Cpu className="w-5 h-5 text-[#ff2e55]" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-[#00f0ff]" />;
      case 'Activity': return <Activity className="w-5 h-5 text-[#f59e0b]" />;
      case 'Zap': return <Zap className="w-5 h-5 text-[#10b981]" />;
      default: return <Cpu className="w-5 h-5 text-[#00f0ff]" />;
    }
  };

  return (
    <section id="hero" className="relative min-h-screen pt-28 pb-16 flex flex-col justify-center items-center overflow-hidden">
      
      {/* Reticle Glow & Radar Mesh */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none opacity-20 bg-radial-glow" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        
        {/* System HUD Status Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 p-3 rounded-lg bg-[#0d1323]/80 border border-[#00f0ff]/20 backdrop-blur-md">
          <div className="flex items-center gap-3 font-mono text-xs text-slate-300">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff2e55] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#ff2e55]"></span>
            </span>
            <span className="text-[#00f0ff] font-semibold">{profile.statusText}</span>
          </div>
          <div className="flex items-center gap-4 font-mono text-[11px] text-slate-400">
            <span className="hidden sm:inline">LOC: {profile.location}</span>
            <span className="px-2 py-0.5 rounded bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/40">
              {profile.availability}
            </span>
          </div>
        </div>

        {/* Hero Main Grid */}
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Information & CTAs */}
          <div className="lg:col-span-8 space-y-6 text-left">
            
            {/* Tag badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ff2e55]/10 border border-[#ff2e55]/30 text-[#ff2e55] font-mono text-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>SPIDER-TECH // HIGH-PERFORMANCE ENGINEERING</span>
            </div>

            {/* Title & Name */}
            <div>
              <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-none mb-3">
                {profile.name}
              </h1>
              <div className="font-mono text-xl sm:text-3xl text-[#00f0ff] font-semibold min-h-[40px] flex items-center gap-2">
                <span>&gt; {displayText}</span>
                <span className="w-2.5 h-6 bg-[#ff2e55] animate-pulse inline-block" />
              </div>
            </div>

            {/* Tagline & Summary */}
            <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
              {profile.summary}
            </p>

            <blockquote className="p-3 border-l-2 border-[#ff2e55] bg-[#0d1323]/60 rounded-r font-mono text-xs text-slate-400 italic">
              "{profile.tagline}"
            </blockquote>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#projects"
                className="px-6 py-3.5 rounded bg-[#ff2e55] text-white font-mono text-sm font-bold flex items-center gap-2 hover:bg-[#ff1744] hover:shadow-[0_0_25px_rgba(255,46,85,0.6)] transition-all transform hover:-translate-y-0.5"
              >
                <span>ANALYZE PROJECTS</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenResume}
                className="px-6 py-3.5 rounded bg-[#0d1323] border border-[#00f0ff]/50 text-[#00f0ff] font-mono text-sm font-semibold flex items-center gap-2 hover:bg-[#00f0ff]/10 hover:border-[#00f0ff] hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all transform hover:-translate-y-0.5"
              >
                <Download className="w-4 h-4" />
                <span>RADAR RESUME</span>
              </button>

              <button
                onClick={onOpenTerminal}
                className="px-4 py-3.5 rounded bg-[#0d1323] border border-slate-700 text-slate-300 font-mono text-sm flex items-center gap-2 hover:border-[#ff2e55] hover:text-[#ff2e55] transition-all"
                title="Launch Recruiter Terminal"
              >
                <Terminal className="w-4 h-4 text-[#ff2e55]" />
                <span className="hidden sm:inline">CLI ENGINE</span>
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Target Reticle Avatar Graphic */}
          <div className="lg:col-span-4 flex justify-center">
            <div
              onClick={() => {
                setIsScanning(true);
                setTimeout(() => setIsScanning(false), 3500);
              }}
              className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center cursor-pointer group"
              title="Click to Trigger Target Diagnostic Scan"
            >
              
              {/* Outer Spinning Reticle Ring */}
              <div className={`absolute inset-0 rounded-full border border-dashed border-[#00f0ff]/40 animate-reticle-spin ${isScanning ? 'border-[#ff2e55] shadow-[0_0_30px_rgba(255,46,85,0.6)]' : ''}`} />
              <div className="absolute inset-3 rounded-full border border-dotted border-[#ff2e55]/30 animate-reticle-spin" style={{ animationDirection: 'reverse', animationDuration: '15s' }} />

              {/* Radar Sweep Effect during scanning */}
              {isScanning && (
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-[#ff2e55]/20 to-transparent animate-radar pointer-events-none" />
              )}

              {/* Inner HUD Box Frame */}
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-xl bg-[#0d1323] border border-[#00f0ff]/40 p-4 flex flex-col items-center justify-center text-center cyber-corner cyber-corner-red shadow-2xl group-hover:border-[#ff2e55] transition-colors">
                
                {/* HUD Corners crosshairs */}
                <div className="absolute -top-3 -left-3 font-mono text-[10px] text-[#ff2e55] font-bold">
                  +[01]
                </div>
                <div className="absolute -top-3 -right-3 font-mono text-[10px] text-[#00f0ff] font-bold">
                  SYS.OK
                </div>
                <div className="absolute -bottom-3 -left-3 font-mono text-[10px] text-[#00f0ff] font-bold">
                  T-RNG
                </div>
                <div className="absolute -bottom-3 -right-3 font-mono text-[10px] text-[#ff2e55] font-bold">
                  +[04]
                </div>

                <div className="w-16 h-16 rounded-full bg-[#ff2e55]/20 border-2 border-[#ff2e55] flex items-center justify-center mb-3 shadow-[0_0_20px_rgba(255,46,85,0.5)] group-hover:scale-105 transition-transform">
                  <span className="font-mono text-2xl font-black text-[#ff2e55]">
                    {profile.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>

                <h3 className="font-mono text-sm font-bold text-white tracking-wider truncate max-w-full px-2">
                  {profile.name.toUpperCase()}
                </h3>
                <p className="font-mono text-[10px] text-[#00f0ff] uppercase line-clamp-1 px-1">
                  {profile.role}
                </p>
                <div className="mt-2 text-[10px] font-mono border-t border-slate-800 pt-1.5 w-full flex items-center justify-center gap-1">
                  {isScanning ? (
                    <span className="text-[#ff2e55] font-bold animate-pulse">
                      ⚡ SCANNING TELEMETRY...
                    </span>
                  ) : (
                    <span className="text-slate-400 group-hover:text-[#00f0ff]">
                      [ CLICK TO SCAN TARGET ]
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Statistics Counter Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-14">
          {profile.stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-4 rounded-lg bg-[#0d1323]/70 border border-[#00f0ff]/20 hover:border-[#ff2e55]/50 hover:shadow-[0_0_15px_rgba(255,46,85,0.2)] transition-all group cyber-corner"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="p-2 rounded bg-slate-900/80 border border-slate-800">
                  {getStatIcon(stat.iconName)}
                </span>
                {stat.changeIndicator && (
                  <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/30">
                    {stat.changeIndicator}
                  </span>
                )}
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white group-hover:text-[#ff2e55] transition-colors">
                {stat.value}
              </div>
              <div className="font-mono text-xs font-bold text-slate-300 mt-1">
                {stat.label}
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                {stat.description}
              </p>
            </div>
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center mt-12">
          <a
            href="#projects"
            className="flex flex-col items-center gap-1 text-slate-500 hover:text-[#00f0ff] font-mono text-[11px] transition-colors"
          >
            <span>SCROLL TO RADAR PROJECTS</span>
            <ChevronDown className="w-4 h-4 animate-bounce text-[#00f0ff]" />
          </a>
        </div>
      </div>
    </section>
  );
};
