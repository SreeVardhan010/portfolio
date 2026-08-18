import React, { useState } from 'react';
import { Sliders, Zap, Sparkles } from 'lucide-react';
import type { CanvasConfig } from './SpiderCanvas';

interface CanvasControlPanelProps {
  config: CanvasConfig;
  onChangeConfig: (newConfig: CanvasConfig) => void;
}

export const CanvasControlPanel: React.FC<CanvasControlPanelProps> = ({
  config,
  onChangeConfig,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const themes: Array<{ id: CanvasConfig['colorTheme']; label: string; colorClass: string }> = [
    { id: 'crimson', label: 'Crimson Red', colorClass: 'bg-[#ff2e55]' },
    { id: 'cyan', label: 'Electric Cyan', colorClass: 'bg-[#00f0ff]' },
    { id: 'gold', label: 'Telemetry Gold', colorClass: 'bg-[#f59e0b]' },
    { id: 'matrix', label: 'Matrix Green', colorClass: 'bg-[#10b981]' },
  ];

  const handleShockwave = () => {
    // Dispatch a click event to trigger shockwave
    const event = new MouseEvent('click', {
      clientX: window.innerWidth / 2,
      clientY: window.innerHeight / 3,
      bubbles: true,
    });
    window.dispatchEvent(event);
  };

  return (
    <div className="fixed bottom-5 left-5 z-40 font-mono text-xs">
      
      {/* Drawer Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-3 py-2 rounded-lg bg-[#0d1323]/90 border border-[#00f0ff]/40 text-[#00f0ff] hover:text-white hover:border-[#ff2e55] hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all flex items-center gap-2 backdrop-blur-md cyber-corner"
      >
        <Sliders className="w-4 h-4 text-[#ff2e55]" />
        <span className="font-bold">MATRIX CONTROLS</span>
        <span className="w-2 h-2 rounded-full bg-[#10b981] animate-ping" />
      </button>

      {/* Control Panel Drawer */}
      {isOpen && (
        <div className="mt-3 p-5 rounded-xl bg-[#090d16]/95 border border-[#00f0ff]/40 shadow-[0_0_30px_rgba(0,240,255,0.2)] backdrop-blur-xl w-72 space-y-4 animate-fadeIn cyber-corner cyber-corner-red">
          
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="font-bold text-[#00f0ff] flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-[#ff2e55]" />
              PHYSICS MATRIX ENGINE
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-500 hover:text-white text-xs"
            >
              [X]
            </button>
          </div>

          {/* Node Density Slider */}
          <div>
            <div className="flex justify-between text-[11px] text-slate-300 mb-1">
              <span>NODE DENSITY</span>
              <span className="text-[#00f0ff] font-bold">{config.density} NODES</span>
            </div>
            <input
              type="range"
              min="30"
              max="120"
              value={config.density}
              onChange={(e) =>
                onChangeConfig({ ...config, density: parseInt(e.target.value) })
              }
              className="w-full accent-[#ff2e55] cursor-pointer"
            />
          </div>

          {/* Velocity Speed Slider */}
          <div>
            <div className="flex justify-between text-[11px] text-slate-300 mb-1">
              <span>STREAM SPEED</span>
              <span className="text-[#00f0ff] font-bold">{config.speed.toFixed(1)}x</span>
            </div>
            <input
              type="range"
              min="0.2"
              max="3"
              step="0.2"
              value={config.speed}
              onChange={(e) =>
                onChangeConfig({ ...config, speed: parseFloat(e.target.value) })
              }
              className="w-full accent-[#00f0ff] cursor-pointer"
            />
          </div>

          {/* Color Palette Picker */}
          <div>
            <span className="block text-[11px] text-slate-300 mb-2">ENERGY COLOR PALETTE</span>
            <div className="grid grid-cols-2 gap-2">
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => onChangeConfig({ ...config, colorTheme: t.id })}
                  className={`p-1.5 rounded border text-[10px] flex items-center gap-2 transition-all ${
                    config.colorTheme === t.id
                      ? 'border-white text-white font-bold bg-slate-800'
                      : 'border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <span className={`w-2.5 h-2.5 rounded-full ${t.colorClass}`} />
                  <span>{t.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Cursor Physics Mode */}
          <div>
            <span className="block text-[11px] text-slate-300 mb-2">CURSOR GRAVITY</span>
            <div className="flex gap-2">
              <button
                onClick={() => onChangeConfig({ ...config, cursorMode: 'attract' })}
                className={`flex-1 py-1.5 rounded border text-[10px] text-center transition-all ${
                  config.cursorMode === 'attract'
                    ? 'bg-[#ff2e55]/20 border-[#ff2e55] text-[#ff2e55] font-bold'
                    : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}
              >
                ATTRACT NODES
              </button>
              <button
                onClick={() => onChangeConfig({ ...config, cursorMode: 'repel' })}
                className={`flex-1 py-1.5 rounded border text-[10px] text-center transition-all ${
                  config.cursorMode === 'repel'
                    ? 'bg-[#00f0ff]/20 border-[#00f0ff] text-[#00f0ff] font-bold'
                    : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}
              >
                REPEL NODES
              </button>
            </div>
          </div>

          {/* Shockwave Energy Blast Trigger */}
          <button
            onClick={handleShockwave}
            className="w-full py-2 rounded bg-[#ff2e55] hover:bg-[#ff1744] text-white font-bold flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(255,46,85,0.5)] transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>TRIGGER SHOCKWAVE BLAST</span>
          </button>

        </div>
      )}
    </div>
  );
};
