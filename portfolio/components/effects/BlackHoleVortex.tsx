'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  angle: number;
  radius: number;
  speed: number; // angular speed
  drift: number; // inward radius drift per frame
  size: number;
  hueMix: number; // 0 = amber, 1 = coral
  alpha: number;
}

const PARTICLE_COUNT = 180;
const AMBER = [217, 138, 61];
const CORAL = [198, 84, 58];

/**
 * Canvas-based accretion-disk vortex: particles spiral inward toward a
 * glowing core and respawn at the outer edge, giving a "black hole" look
 * without any external video/image asset.
 */
export function BlackHoleVortex() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let maxRadius = 0;
    let cx = 0;
    let cy = 0;
    let rafId = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cx = width / 2;
      cy = height / 2;
      maxRadius = Math.min(width, height) / 2;
    };
    resize();
    window.addEventListener('resize', resize);

    const spawn = (fresh = false): Particle => ({
      angle: Math.random() * Math.PI * 2,
      radius: fresh ? Math.random() * maxRadius : maxRadius * (0.4 + Math.random() * 0.6),
      speed: 0.004 + Math.random() * 0.01,
      drift: 0.15 + Math.random() * 0.35,
      size: 0.6 + Math.random() * 1.6,
      hueMix: Math.random(),
      alpha: 0.25 + Math.random() * 0.55,
    });

    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () => spawn(true));

    const drawFrame = () => {
      ctx.clearRect(0, 0, width, height);

      // Glowing core
      const coreGradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxRadius * 0.32);
      coreGradient.addColorStop(0, `rgba(${AMBER[0]},${AMBER[1]},${AMBER[2]},0.35)`);
      coreGradient.addColorStop(0.5, `rgba(${AMBER[0]},${AMBER[1]},${AMBER[2]},0.12)`);
      coreGradient.addColorStop(1, 'rgba(217,138,61,0)');
      ctx.fillStyle = coreGradient;
      ctx.beginPath();
      ctx.arc(cx, cy, maxRadius * 0.32, 0, Math.PI * 2);
      ctx.fill();

      for (const p of particles) {
        const x = cx + Math.cos(p.angle) * p.radius;
        const y = cy + Math.sin(p.angle) * p.radius * 0.55; // flatten into a disk
        const r = AMBER[0] + (CORAL[0] - AMBER[0]) * p.hueMix;
        const g = AMBER[1] + (CORAL[1] - AMBER[1]) * p.hueMix;
        const b = AMBER[2] + (CORAL[2] - AMBER[2]) * p.hueMix;
        const fadeNearCore = Math.min(1, p.radius / (maxRadius * 0.18));
        ctx.beginPath();
        ctx.fillStyle = `rgba(${r.toFixed(0)},${g.toFixed(0)},${b.toFixed(0)},${(p.alpha * fadeNearCore).toFixed(3)})`;
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const tick = () => {
      for (const p of particles) {
        p.angle += p.speed;
        p.radius -= p.drift;
        if (p.radius < maxRadius * 0.05) {
          Object.assign(p, spawn(false), { radius: maxRadius });
        }
      }
      drawFrame();
      rafId = requestAnimationFrame(tick);
    };

    if (prefersReducedMotion) {
      drawFrame();
    } else {
      rafId = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 w-full h-full"
    />
  );
}
