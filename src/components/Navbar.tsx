import React, { useState, useEffect } from 'react';
import { Terminal as TerminalIcon, Menu, X, Cpu, Activity } from 'lucide-react';
import type { UserProfile } from '../types/portfolio';

interface NavbarProps {
  profile: UserProfile;
  themeMode: 'hud' | 'clean';
  onToggleTheme: () => void;
  onOpenTerminal: () => void;
  onOpenResume: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  profile,
  themeMode,
  onToggleTheme,
  onOpenTerminal,
  onOpenResume,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: '01. OVERVIEW', href: '#hero' },
    { label: '02. RADAR PROJECTS', href: '#projects' },
    { label: '03. SKILLS MATRIX', href: '#skills' },
    { label: '04. EXPERIENCE', href: '#experience' },
    { label: '05. TARGET CONTACT', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#070a11]/90 backdrop-blur-md border-b border-[#00f0ff]/20 shadow-lg shadow-[#00f0ff]/5 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Emblem */}
        <a
          href="#hero"
          className="flex items-center gap-3 group"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-[#0d1323] border border-[#ff2e55]/50 group-hover:border-[#ff2e55] group-hover:shadow-[0_0_15px_rgba(255,46,85,0.5)] transition-all overflow-hidden">
            <img src="/profile.png" alt={profile.name} className="w-full h-full object-cover object-center" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#00f0ff] rounded-full animate-ping opacity-75" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#00f0ff] rounded-full" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-bold tracking-wider text-slate-100 group-hover:text-[#00f0ff] transition-colors">
                {profile.name.toUpperCase()}
              </span>
              <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono rounded bg-[#ff2e55]/20 text-[#ff2e55] border border-[#ff2e55]/40">
                HUD v4.2
              </span>
            </div>
            <p className="text-[10px] font-mono text-slate-400 hidden sm:block">
              STARK-OS // ONLINE
            </p>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-mono text-xs text-slate-300 hover:text-[#00f0ff] hover:drop-shadow-[0_0_8px_rgba(0,240,255,0.8)] transition-all relative py-1 group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#00f0ff] group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Terminal CLI Button */}
          <button
            onClick={onOpenTerminal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#0d1323] border border-[#00f0ff]/40 text-[#00f0ff] font-mono text-xs hover:bg-[#00f0ff]/10 hover:border-[#00f0ff] hover:shadow-[0_0_12px_rgba(0,240,255,0.4)] transition-all"
            title="Open Developer Terminal CLI"
          >
            <TerminalIcon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline font-semibold">CLI TERMINAL</span>
          </button>

          {/* Resume Quick Drawer */}
          <button
            onClick={onOpenResume}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#ff2e55]/10 border border-[#ff2e55]/50 text-[#ff2e55] font-mono text-xs hover:bg-[#ff2e55]/20 hover:border-[#ff2e55] hover:shadow-[0_0_12px_rgba(255,46,85,0.4)] transition-all"
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>RESUME</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            className="p-2 rounded bg-[#0d1323] border border-slate-700 font-mono text-xs text-slate-300 hover:border-[#ff2e55] hover:text-[#ff2e55] transition-colors"
            title={`Switch to ${themeMode === 'hud' ? 'Clean Dev' : 'Spider HUD'} Theme`}
          >
            <Activity className={`w-4 h-4 ${themeMode === 'hud' ? 'text-[#ff2e55]' : 'text-slate-400'}`} />
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded bg-[#0d1323] border border-slate-700 text-slate-300 hover:text-[#00f0ff]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#070a11]/95 border-b border-[#00f0ff]/30 backdrop-blur-xl px-4 pt-4 pb-6 mt-2 space-y-3">
          <div className="font-mono text-[10px] text-[#00f0ff] pb-2 border-b border-slate-800 flex justify-between items-center">
            <span>HUD SYSTEM NAVIGATION</span>
            <span className="text-[#ff2e55]">ONLINE</span>
          </div>
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block font-mono text-sm text-slate-200 hover:text-[#00f0ff] py-2 border-b border-slate-800/50"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 flex gap-3">
            <button
              onClick={() => {
                onOpenTerminal();
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2 rounded bg-[#0d1323] border border-[#00f0ff]/50 text-[#00f0ff] font-mono text-xs text-center"
            >
              CLI TERMINAL
            </button>
            <button
              onClick={() => {
                onOpenResume();
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2 rounded bg-[#ff2e55]/20 border border-[#ff2e55] text-[#ff2e55] font-mono text-xs text-center"
            >
              RESUME HUD
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
