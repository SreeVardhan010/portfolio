import React, { useEffect, useRef } from 'react';

export interface CanvasConfig {
  density: number; // 30 - 120
  speed: number;   // 0.2 - 3
  colorTheme: 'crimson' | 'cyan' | 'gold' | 'matrix';
  cursorMode: 'attract' | 'repel';
}

interface SpiderCanvasProps {
  themeMode?: 'hud' | 'clean';
  config?: CanvasConfig;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  pulseSpeed: number;
  pulseAngle: number;
  isCrimson: boolean;
}

interface Shockwave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  color: string;
}

export const SpiderCanvas: React.FC<SpiderCanvasProps> = ({
  themeMode = 'hud',
  config = { density: 70, speed: 1, colorTheme: 'crimson', cursorMode: 'attract' },
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const shockwavesRef = useRef<Shockwave[]>([]);

  const getColorPalette = (theme: CanvasConfig['colorTheme']) => {
    switch (theme) {
      case 'cyan': return { p1: '#00f0ff', p2: '#06b6d4', shock: 'rgba(0, 240, 255, ' };
      case 'gold': return { p1: '#f59e0b', p2: '#fbbf24', shock: 'rgba(245, 158, 11, ' };
      case 'matrix': return { p1: '#10b981', p2: '#34d399', shock: 'rgba(16, 185, 129, ' };
      case 'crimson':
      default: return { p1: '#ff2e55', p2: '#00f0ff', shock: 'rgba(255, 46, 85, ' };
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse tracker
    const mouse = {
      x: -1000,
      y: -1000,
      radius: 220,
      active: false,
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      const palette = getColorPalette(config.colorTheme);
      shockwavesRef.current.push({
        x: clickX,
        y: clickY,
        radius: 5,
        maxRadius: 280,
        alpha: 0.8,
        color: palette.shock,
      });
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('click', handleClick);
    window.addEventListener('resize', handleResize);

    // Generate Particles based on config
    const palette = getColorPalette(config.colorTheme);
    const particleCount = config.density;
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const isPrimary = Math.random() > 0.65;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.7 * config.speed,
        vy: (Math.random() - 0.5) * 0.7 * config.speed,
        radius: Math.random() * 2 + 1.5,
        color: isPrimary ? palette.p1 : palette.p2,
        pulseSpeed: Math.random() * 0.04 + 0.01,
        pulseAngle: Math.random() * Math.PI * 2,
        isCrimson: isPrimary,
      });
    }

    // Main render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render shockwaves
      for (let s = shockwavesRef.current.length - 1; s >= 0; s--) {
        const sw = shockwavesRef.current[s];
        sw.radius += 9;
        sw.alpha *= 0.94;

        if (sw.radius >= sw.maxRadius || sw.alpha <= 0.01) {
          shockwavesRef.current.splice(s, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `${sw.color}${sw.alpha})`;
        ctx.lineWidth = 2.5;
        ctx.shadowBlur = 15;
        ctx.shadowColor = `${sw.color}${sw.alpha})`;
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        // Bounce on boundaries
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        p.pulseAngle += p.pulseSpeed;
        const currentRadius = p.radius + Math.sin(p.pulseAngle) * 0.6;

        // Draw particle dot with glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.5, currentRadius), 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = p.isCrimson ? 10 : 8;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Connect nearby particles (Spider-Web matrix)
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const maxDist = 140;
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.28;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = p.isCrimson
              ? `${palette.shock}${alpha})`
              : `rgba(0, 240, 255, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // Mouse interaction: cursor attraction or repulsion
        if (mouse.active) {
          const mdx = p.x - mouse.x;
          const mdy = p.y - mouse.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

          if (mdist < mouse.radius) {
            const alpha = (1 - mdist / mouse.radius) * 0.65;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `${palette.shock}${alpha})`;
            ctx.lineWidth = 1.3;
            ctx.stroke();

            // Gravitational pull or push
            const factor = config.cursorMode === 'repel' ? -0.8 : 0.5;
            p.x -= (mdx / mdist) * factor;
            p.y -= (mdy / mdist) * factor;
          }
        }
      }

      // Draw cursor target reticle when active
      if (mouse.active && themeMode === 'hud') {
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 18, 0, Math.PI * 2);
        ctx.strokeStyle = `${palette.shock}0.5)`;
        ctx.lineWidth = 1.2;
        ctx.setLineDash([4, 4]);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = palette.p1;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [themeMode, config]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-80"
    />
  );
};
