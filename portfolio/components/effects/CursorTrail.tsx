'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface TrailSquare {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

const COLORS = [
  'rgba(217,138,61,0.55)', // signal-amber
  'rgba(198,84,58,0.5)', // hazard-coral
  'rgba(150,90,45,0.4)', // dark ember
];

const SPAWN_MIN_DISTANCE = 26; // px pointer must travel before a new square spawns
const MAX_SQUARES = 32;
const LIFETIME_S = 0.9;

let idCounter = 0;

/**
 * A trail of translucent squares that spawn along the cursor's path and
 * fade out. Only active below the hero section (#hero-section), which has
 * its own dedicated heatmap effect — this trail picks up where that ends.
 */
export function CursorTrail() {
  const [squares, setSquares] = useState<TrailSquare[]>([]);
  const lastPos = useRef<{ x: number; y: number } | null>(null);
  const heroBottomRef = useRef(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (prefersReducedMotion || !hasFinePointer) return;

    const measureHero = () => {
      const hero = document.getElementById('hero-section');
      heroBottomRef.current = hero ? hero.getBoundingClientRect().bottom + window.scrollY : 0;
    };
    measureHero();
    window.addEventListener('resize', measureHero);

    const handlePointerMove = (e: PointerEvent) => {
      const pageY = e.clientY + window.scrollY;
      if (pageY < heroBottomRef.current) return; // still over the hero's own effect

      const last = lastPos.current;
      if (last) {
        const dx = e.clientX - last.x;
        const dy = e.clientY - last.y;
        if (Math.sqrt(dx * dx + dy * dy) < SPAWN_MIN_DISTANCE) return;
      }
      lastPos.current = { x: e.clientX, y: e.clientY };

      const id = idCounter++;
      const size = 16 + Math.random() * 38;
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];

      setSquares((prev) => {
        const next = [...prev, { id, x: e.clientX, y: e.clientY, size, color }];
        return next.length > MAX_SQUARES ? next.slice(next.length - MAX_SQUARES) : next;
      });

      window.setTimeout(() => {
        setSquares((prev) => prev.filter((sq) => sq.id !== id));
      }, LIFETIME_S * 1000);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', measureHero);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <AnimatePresence>
        {squares.map((sq) => (
          <motion.div
            key={sq.id}
            initial={{ opacity: 0.6, scale: 0.6 }}
            animate={{ opacity: 0, scale: 1.3 }}
            exit={{ opacity: 0 }}
            transition={{ duration: LIFETIME_S, ease: 'easeOut' }}
            className="absolute rounded-sm"
            style={{
              left: sq.x - sq.size / 2,
              top: sq.y - sq.size / 2,
              width: sq.size,
              height: sq.size,
              backgroundColor: sq.color,
              mixBlendMode: 'screen',
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
