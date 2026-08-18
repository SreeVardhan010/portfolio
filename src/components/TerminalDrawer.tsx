import React, { useState, useRef, useEffect } from 'react';
import { X, Terminal as TerminalIcon, CornerDownLeft } from 'lucide-react';
import type { PortfolioData } from '../types/portfolio';


interface TerminalDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  data: PortfolioData;
}

interface LogEntry {
  type: 'input' | 'output' | 'error' | 'success';
  text: string;
}

export const TerminalDrawer: React.FC<TerminalDrawerProps> = ({ isOpen, onClose, data }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  
  const [logs, setLogs] = useState<LogEntry[]>(() => 
    data.terminalWelcomeMessage.map(msg => ({ type: 'output', text: msg }))
  );

  const bottomRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  if (!isOpen) return null;

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    const username = data.profile.name.toLowerCase().split(' ')[0];
    const newLogs: LogEntry[] = [...logs, { type: 'input', text: `${username}@spider-hud:~$ ${trimmed}` }];
    const lower = trimmed.toLowerCase();

    setHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    switch (lower) {
      case 'help':
        newLogs.push({
          type: 'output',
          text: `AVAILABLE HUD CLI COMMANDS:
  • help       : Display command menu
  • projects   : Output radar project telemetry
  • skills     : View engineering skill matrix
  • stats      : View live performance SLA metrics
  • contact    : Get recruiter contact coordinates & email
  • bio        : Display engineer summary profile
  • sudo hire  : Launch instant recruiter priority workflow
  • clear      : Clear terminal screen`,
        });
        break;

      case 'projects':
        data.projects.forEach((p) => {
          newLogs.push({
            type: 'output',
            text: `[${p.id.toUpperCase()}] ${p.title} (${p.category})
  Impact : ${p.businessImpact}
  Stack  : ${p.techStack.join(', ')}
  Score  : ${p.radarScore}/100 | Repo: ${p.githubUrl}`,
          });
        });
        break;

      case 'skills':
        data.skillCategories.forEach((cat) => {
          newLogs.push({ type: 'output', text: `--- ${cat.categoryName.toUpperCase()} ---` });
          cat.skills.forEach((s) => {
            newLogs.push({
              type: 'output',
              text: `  ${s.name.padEnd(22)} [${'='.repeat(Math.floor(s.level / 10))}${' '.repeat(10 - Math.floor(s.level / 10))}] ${s.level}% (${s.tag})`,
            });
          });
        });
        break;

      case 'stats':
        data.profile.stats.forEach((st) => {
          newLogs.push({
            type: 'output',
            text: `  • ${st.label.padEnd(20)}: ${st.value} (${st.description})`,
          });
        });
        break;

      case 'contact':
        newLogs.push({
          type: 'success',
          text: `RECRUITER DIRECT CONTACT COORDINATES:
  Email   : ${data.profile.email}
  GitHub  : ${data.profile.github}
  LinkedIn: ${data.profile.linkedin}
  Status  : ${data.profile.availability}`,
        });
        break;

      case 'bio':
        newLogs.push({
          type: 'output',
          text: `${data.profile.name} - ${data.profile.role}\n${data.profile.summary}`,
        });
        break;

      case 'sudo hire':
        newLogs.push({
          type: 'success',
          text: `
============================================================
 [SUDO PROTOCOL GRANTED] PRIORITY RECRUITER CHANNEL ACTIVE 
============================================================
 Target Email : ${data.profile.email}
 Status       : READY FOR SR / LEAD FULL-TIME CONTRACTS
 Response SLA : < 4 HOURS

 Direct email copied! Redirecting contact link...`,
        });
        navigator.clipboard?.writeText(data.profile.email);
        break;

      case 'clear':
        setLogs([]);
        setInput('');
        return;

      default:
        newLogs.push({
          type: 'error',
          text: `Command not recognized: '${trimmed}'. Type 'help' for available commands.`,
        });
        break;
    }

    setLogs(newLogs);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    } else if (e.key === 'ArrowUp') {
      if (history.length > 0) {
        const nextIndex = historyIndex + 1 < history.length ? historyIndex + 1 : historyIndex;
        setHistoryIndex(nextIndex);
        setInput(history[history.length - 1 - nextIndex] || '');
      }
    } else if (e.key === 'ArrowDown') {
      if (historyIndex > 0) {
        const nextIndex = historyIndex - 1;
        setHistoryIndex(nextIndex);
        setInput(history[history.length - 1 - nextIndex] || '');
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-lg animate-fadeIn">
      <div className="relative w-full max-w-4xl h-[80vh] rounded-xl bg-[#090d16] border border-[#00f0ff]/40 shadow-[0_0_50px_rgba(0,240,255,0.2)] flex flex-col overflow-hidden cyber-corner cyber-corner-red">
        
        {/* Terminal Header */}
        <div className="px-4 py-3 bg-[#0d1323] border-b border-slate-800 flex items-center justify-between font-mono text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <TerminalIcon className="w-4 h-4 text-[#ff2e55]" />
            <span className="text-[#00f0ff] font-bold">STARK-OS RECRUITER CLI KERNEL v4.2</span>
            <span className="hidden sm:inline text-slate-500">// BASH COMPATIBLE</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded bg-slate-800 text-slate-400 hover:text-white hover:bg-[#ff2e55] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Terminal Body */}
        <div className="flex-1 p-4 font-mono text-xs space-y-2 overflow-y-auto bg-[#070a11] text-slate-200">
          {logs.map((log, idx) => (
            <div
              key={idx}
              className={`whitespace-pre-wrap leading-relaxed ${
                log.type === 'input'
                  ? 'text-[#00f0ff] font-semibold'
                  : log.type === 'error'
                  ? 'text-[#ff2e55]'
                  : log.type === 'success'
                  ? 'text-[#10b981] font-bold'
                  : 'text-slate-300'
              }`}
            >
              {log.text}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Command Input Prompt */}
        <div className="p-3 bg-[#0d1323] border-t border-slate-800 flex items-center gap-2 font-mono text-xs">
          <span className="text-[#ff2e55] font-bold flex items-center gap-1">
            <span>{data.profile.name.toLowerCase().split(' ')[0]}@spider-hud:~$</span>
          </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type 'help' or 'sudo hire'..."
            className="flex-1 bg-transparent text-white outline-none placeholder-slate-600 focus:ring-0 border-none"
          />
          <button
            onClick={() => handleCommand(input)}
            className="p-1.5 rounded bg-[#ff2e55]/20 text-[#ff2e55] hover:bg-[#ff2e55] hover:text-white transition-colors"
          >
            <CornerDownLeft className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
