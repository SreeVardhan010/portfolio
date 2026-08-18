import React, { useState, useEffect } from 'react';
import portfolioDataRaw from './data/portfolioData.json';
import type { PortfolioData, Project } from './types/portfolio';

import { SpiderCanvas, type CanvasConfig } from './components/SpiderCanvas';
import { CanvasControlPanel } from './components/CanvasControlPanel';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsMatrix } from './components/SkillsMatrix';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { ContactFooter } from './components/ContactFooter';

import { ProjectModal } from './components/ProjectModal';
import { TerminalDrawer } from './components/TerminalDrawer';
import { ResumeModal } from './components/ResumeModal';

export const App: React.FC = () => {
  const data: PortfolioData = portfolioDataRaw as PortfolioData;

  const [themeMode, setThemeMode] = useState<'hud' | 'clean'>('hud');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [terminalOpen, setTerminalOpen] = useState<boolean>(false);
  const [resumeOpen, setResumeOpen] = useState<boolean>(false);

  const [canvasConfig, setCanvasConfig] = useState<CanvasConfig>({
    density: 70,
    speed: 1,
    colorTheme: 'crimson',
    cursorMode: 'attract',
  });

  useEffect(() => {
    document.title = `${data.profile.name} // Stark-HUD Software & ML Systems Portfolio`;
  }, [data.profile.name]);

  const toggleTheme = () => {
    setThemeMode((prev) => (prev === 'hud' ? 'clean' : 'hud'));
  };

  return (
    <div className={`min-h-screen text-slate-100 font-sans selection:bg-[#ff2e55] selection:text-white ${
      themeMode === 'hud' ? 'bg-[#070a11] bg-spider-grid' : 'bg-[#090e17]'
    }`}>
      
      {/* HTML5 Interactive Spider-Web Particle Canvas Engine */}
      <SpiderCanvas themeMode={themeMode} config={canvasConfig} />

      {/* Floating Matrix Canvas Controls Widget */}
      <CanvasControlPanel
        config={canvasConfig}
        onChangeConfig={(newConfig) => setCanvasConfig(newConfig)}
      />

      {/* Top Telemetry Navbar */}
      <Navbar
        profile={data.profile}
        themeMode={themeMode}
        onToggleTheme={toggleTheme}
        onOpenTerminal={() => setTerminalOpen(true)}
        onOpenResume={() => setResumeOpen(true)}
      />

      {/* Command Center Hero Section */}
      <HeroSection
        profile={data.profile}
        onOpenTerminal={() => setTerminalOpen(true)}
        onOpenResume={() => setResumeOpen(true)}
      />

      {/* Radar Project Cards Matrix */}
      <ProjectsSection
        projects={data.projects}
        onSelectProject={(project) => setSelectedProject(project)}
      />

      {/* Skills Architecture Matrix */}
      <SkillsMatrix categories={data.skillCategories} />

      {/* Career & Mission Experience Timeline */}
      <ExperienceTimeline experience={data.experience} />

      {/* Recruiter Target Contact Footer */}
      <ContactFooter
        profile={data.profile}
        onOpenTerminal={() => setTerminalOpen(true)}
      />

      {/* Overlay Modals */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <TerminalDrawer
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
        data={data}
      />

      <ResumeModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
        data={data}
      />

    </div>
  );
};

export default App;
