'use client';

import { useEffect, useRef } from 'react';

/**
 * Ported from blackbox.ai's hero background effect ("attachHeatmap"):
 * a 12x10 grid of real DOM cells whose background alpha is driven by
 * distance to the cursor, with a fast attack / slow decay smoothing so
 * the glow snaps on but fades out gradually. Mounted as the first child
 * of a `relative` container — it listens on that container's mousemove.
 */
const COLS = 12;
const ROWS = 10;
const CELL_COUNT = COLS * ROWS;
const RADIUS_FACTOR = 1.6;
const ATTACK = 0.4;
const DECAY = 0.06;
const SNAP_EPSILON = 0.002;
const MAX_ALPHA = 0.85;
const GLOW_RGB = '198,84,58'; // hazard-coral

interface CellState {
  el: HTMLDivElement;
  col: number;
  row: number;
  v: number;
  a: number;
}

export function HeroHeatmap() {
  const anchorRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const anchor = anchorRef.current;
    const grid = gridRef.current;
    const parent = anchor?.parentElement ?? null;
    if (!anchor || !grid || !parent) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const cells: CellState[] = Array.from(grid.children).map((el, i) => ({
      el: el as HTMLDivElement,
      col: i % COLS,
      row: Math.floor(i / COLS),
      v: 0,
      a: -1,
    }));

    const pointer = { gx: -9999, gy: -9999, cw: 0, rad: 0, active: false };
    let rafId = 0;

    const recalc = () => {
      pointer.cw = grid.getBoundingClientRect().width / COLS;
      pointer.rad = RADIUS_FACTOR * pointer.cw;
    };
    recalc();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = grid.getBoundingClientRect();
      pointer.gx = e.clientX - rect.left;
      pointer.gy = e.clientY - rect.top;
      pointer.cw = rect.width / COLS;
      pointer.rad = RADIUS_FACTOR * pointer.cw;
      pointer.active = true;
    };
    const handleMouseLeave = () => {
      pointer.active = false;
    };
    const handleMouseEnter = () => {
      pointer.active = true;
    };

    parent.addEventListener('mousemove', handleMouseMove);
    parent.addEventListener('mouseleave', handleMouseLeave);
    parent.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('resize', recalc);

    const tick = () => {
      const cw = pointer.cw;
      const rad = pointer.rad || 1.5 * cw;
      for (const cell of cells) {
        let target = 0;
        if (pointer.active) {
          const cx = (cell.col + 0.5) * cw;
          const cy = (cell.row + 0.5) * cw;
          target = Math.max(0, 1 - Math.hypot(pointer.gx - cx, pointer.gy - cy) / rad);
          target *= target;
        }
        cell.v += (target - cell.v) * (target > cell.v ? ATTACK : DECAY);
        if (cell.v < SNAP_EPSILON) cell.v = 0;

        const alpha = cell.v * MAX_ALPHA;
        if (alpha !== cell.a) {
          cell.a = alpha;
          cell.el.style.background = alpha <= 0 ? 'transparent' : `rgba(${GLOW_RGB},${alpha.toFixed(3)})`;
        }
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      parent.removeEventListener('mousemove', handleMouseMove);
      parent.removeEventListener('mouseleave', handleMouseLeave);
      parent.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('resize', recalc);
    };
  }, []);

  return (
    <div
      ref={anchorRef}
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
    >
      <div
        ref={gridRef}
        className="absolute inset-0"
        style={{ display: 'grid', gridTemplateColumns: `repeat(${COLS}, 1fr)`, gridAutoRows: 'min-content', alignContent: 'start' }}
      >
        {Array.from({ length: CELL_COUNT }, (_, i) => (
          <div key={i} style={{ aspectRatio: '1 / 1', background: 'transparent' }} />
        ))}
      </div>
    </div>
  );
}
