import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import confetti from 'canvas-confetti';
import { soundEngine } from './AudioPlayer';

export interface HeartFireworksHandle {
  launch: (numBursts?: number) => void;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  decay: number;
  color: string;
  size: number;
  gravity: number;
  flicker: boolean;
}

interface Rocket {
  x: number;
  y: number;
  targetY: number;
  speed: number;
  color: string;
  isDead: boolean;
}

export const HeartFireworksCanvas = forwardRef<HeartFireworksHandle, { active?: boolean }>(
  ({ active = false }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const rocketsRef = useRef<Rocket[]>([]);
    const particlesRef = useRef<Particle[]>([]);
    const animationFrameRef = useRef<number | null>(null);

    const colors = [
      '#f43f5e', // rose
      '#fb7185', // soft rose
      '#e11d48', // crimson
      '#ec4899', // pink
      '#f472b6', // light pink
      '#fbbf24', // gold sparkle
      '#ffffff', // bright white
    ];

    const explodeHeart = (x: number, y: number, color: string) => {
      soundEngine.playFireworkBurstSound();

      // Fire heart math particles
      const count = 90;
      const scale = Math.random() * 2.5 + 4.5;

      for (let i = 0; i < count; i++) {
        const t = (i / count) * Math.PI * 2;
        // Parametric Heart Formula
        const hx = 16 * Math.pow(Math.sin(t), 3);
        const hy = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));

        const speedMod = Math.random() * 0.25 + 0.85;
        const vx = (hx / 16) * scale * speedMod;
        const vy = (hy / 16) * scale * speedMod;

        particlesRef.current.push({
          x,
          y,
          vx,
          vy,
          alpha: 1,
          decay: Math.random() * 0.015 + 0.008,
          color: Math.random() > 0.3 ? color : colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 2.5 + 1.5,
          gravity: 0.045,
          flicker: Math.random() > 0.5,
        });
      }

      // Also trigger canvas-confetti with heart shapes
      try {
        confetti({
          particleCount: 25,
          spread: 60,
          origin: {
            x: x / window.innerWidth,
            y: y / window.innerHeight,
          },
          colors: ['#f43f5e', '#ec4899', '#fb7185', '#fbbf24'],
          shapes: ['circle'],
          ticks: 200,
          gravity: 0.8,
          scalar: 0.9,
          disableForReducedMotion: true,
        });
      } catch {
        // Fallback
      }
    };

    const launchRocket = (customX?: number) => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const x = customX ?? Math.random() * (width * 0.7) + width * 0.15;
      const targetY = Math.random() * (height * 0.4) + height * 0.18;

      rocketsRef.current.push({
        x,
        y: height,
        targetY,
        speed: Math.random() * 4 + 11,
        color: colors[Math.floor(Math.random() * colors.length)],
        isDead: false,
      });
    };

    const triggerBursts = (numBursts = 5) => {
      for (let i = 0; i < numBursts; i++) {
        setTimeout(() => {
          launchRocket();
        }, i * 320);
      }
    };

    useImperativeHandle(ref, () => ({
      launch: (numBursts = 6) => {
        triggerBursts(numBursts);
      },
    }));

    useEffect(() => {
      if (active) {
        triggerBursts(5);
      }
    }, [active]);

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      let width = (canvas.width = window.innerWidth);
      let height = (canvas.height = window.innerHeight);

      const handleResize = () => {
        if (!canvas) return;
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      };
      window.addEventListener('resize', handleResize);

      const render = () => {
        // Clear with transparent wash to leave trails
        ctx.clearRect(0, 0, width, height);

        // Update Rockets
        for (let i = rocketsRef.current.length - 1; i >= 0; i--) {
          const r = rocketsRef.current[i];
          r.y -= r.speed;

          // Draw rocket spark head
          ctx.fillStyle = '#fff7ed';
          ctx.beginPath();
          ctx.arc(r.x, r.y, 2.5, 0, Math.PI * 2);
          ctx.fill();

          // Tail trail
          ctx.strokeStyle = r.color;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(r.x, r.y);
          ctx.lineTo(r.x, r.y + 16);
          ctx.stroke();

          if (r.y <= r.targetY) {
            explodeHeart(r.x, r.targetY, r.color);
            rocketsRef.current.splice(i, 1);
          }
        }

        // Update Particles
        for (let i = particlesRef.current.length - 1; i >= 0; i--) {
          const p = particlesRef.current[i];
          p.x += p.vx;
          p.y += p.vy;
          p.vy += p.gravity;
          p.vx *= 0.985;
          p.vy *= 0.985;
          p.alpha -= p.decay;

          if (p.alpha <= 0) {
            particlesRef.current.splice(i, 1);
            continue;
          }

          const currentAlpha = p.flicker && Math.random() < 0.2 ? p.alpha * 0.4 : p.alpha;

          ctx.save();
          ctx.globalAlpha = Math.max(0, currentAlpha);
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 6;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }

        animationFrameRef.current = requestAnimationFrame(render);
      };

      render();

      return () => {
        window.removeEventListener('resize', handleResize);
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      };
    }, []);

    return (
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-50 w-full h-full"
      />
    );
  }
);

HeartFireworksCanvas.displayName = 'HeartFireworksCanvas';
