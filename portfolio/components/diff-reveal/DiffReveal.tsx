'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Eye, ShieldAlert, ScanLine } from 'lucide-react';

interface GridCell {
  id: number;
  row: number;
  col: number;
  lat: number;
  lon: number;
  isStructure: boolean;
  isDamaged: boolean;
}

export default function DiffReveal() {
  const [sliderPos, setSliderPos] = useState(50); // percentage (0 - 100)
  const [isDragging, setIsDragging] = useState(false);
  const [hoveredCell, setHoveredCell] = useState<GridCell | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const cellsRef = useRef<GridCell[]>([]);

  // Generate a static technical grid representing a 10x12 coordinate map
  if (cellsRef.current.length === 0) {
    const cells: GridCell[] = [];
    const baseLat = 23.8100;
    const baseLon = 90.4120;
    
    // Pick specific cells to be structures, and a subset of those to be damaged
    const structureIndices = [14, 15, 23, 27, 28, 35, 41, 42, 54, 55, 62, 63, 67, 72, 73, 85, 86, 91, 95];
    const damagedIndices = [14, 27, 28, 41, 42, 55, 67, 73, 85, 95];

    let id = 0;
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 12; c++) {
        const index = r * 12 + c;
        const isStr = structureIndices.includes(index);
        const isDmg = isStr && damagedIndices.includes(index);
        
        cells.push({
          id: id++,
          row: r,
          col: c,
          lat: Number((baseLat + r * 0.00015).toFixed(6)),
          lon: Number((baseLon + c * 0.00018).toFixed(6)),
          isStructure: isStr,
          isDamaged: isDmg,
        });
      }
    }
    cellsRef.current = cells;
  }

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  };

  const handleMouseDown = () => setIsDragging(true);

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        handleMove(e.clientX);
      }
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches[0]) {
        handleMove(e.touches[0].clientX);
      }
    };

    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchend', handleMouseUp);
    window.addEventListener('touchmove', handleTouchMove);

    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchend', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isDragging]);

  return (
    <div className="w-full flex flex-col gap-3 font-mono">
      {/* Top Banner Status */}
      <div className="flex justify-between items-center text-[10px] text-slate-grid border-b border-slate-grid/20 pb-2">
        <div className="flex items-center gap-2">
          <Eye className="w-3.5 h-3.5 text-moss animate-pulse" />
          <span className="text-moss font-bold">[T0_BASELINE: SURVEY_INTACT]</span>
        </div>
        <div className="text-[9px] text-slate-grid/60">
          SCANLINE_POS: {sliderPos.toFixed(1)}%
        </div>
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-3.5 h-3.5 text-hazard-coral animate-pulse" />
          <span className="text-hazard-coral font-bold">[T1_POST_EVENT: HAZARD_POLYGONS]</span>
        </div>
      </div>

      {/* Main Interactive Grid Container */}
      <div
        ref={containerRef}
        className="relative aspect-[16/9] w-full rounded border border-slate-grid/30 bg-basalt overflow-hidden select-none cursor-crosshair group/grid"
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      >
        {/* Layer 1: "After" State (Damaged / Red) - BASE LAYER */}
        <div className="absolute inset-0 p-4 grid grid-cols-12 grid-rows-8 gap-1.5 opacity-90">
          {cellsRef.current.map((cell) => (
            <div
              key={`after-${cell.id}`}
              onMouseEnter={() => setHoveredCell(cell)}
              className={`relative rounded-sm border transition-all duration-300 flex items-center justify-center text-[7px]
                ${cell.isStructure
                  ? cell.isDamaged
                    ? 'bg-hazard-coral/20 border-hazard-coral text-hazard-coral font-bold shadow-[inset_0_0_8px_rgba(198,84,58,0.3)] animate-pulse'
                    : 'bg-moss/10 border-moss/40 text-moss/80'
                  : 'bg-slate-grid/5 border-slate-grid/10 text-slate-grid/30'
                }
              `}
            >
              {cell.isStructure && cell.isDamaged ? '!' : ''}
            </div>
          ))}
        </div>

        {/* Layer 2: "Before" State (Intact / Green) - CLIPPED OVERLAY */}
        <div
          className="absolute inset-0 p-4 grid grid-cols-12 grid-rows-8 gap-1.5 bg-basalt transition-shadow duration-300 pointer-events-none select-none"
          style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
        >
          {cellsRef.current.map((cell) => (
            <div
              key={`before-${cell.id}`}
              className={`relative rounded-sm border flex items-center justify-center text-[7px]
                ${cell.isStructure
                  ? 'bg-moss/20 border-moss text-moss font-bold shadow-[inset_0_0_6px_rgba(92,122,94,0.3)]'
                  : 'bg-slate-grid/5 border-slate-grid/15 text-slate-grid/45'
                }
              `}
            >
              {cell.isStructure ? '■' : ''}
            </div>
          ))}
        </div>

        {/* Graticule Grid Lines & Technical Layout overlay */}
        <div className="absolute inset-0 border border-slate-grid/10 pointer-events-none pointer-events-none flex flex-col justify-between p-1 font-mono text-[7px] text-slate-grid/40">
          <div className="flex justify-between">
            <span>[23.8112° N, 90.4120° E]</span>
            <span>[23.8112° N, 90.41416° E]</span>
          </div>
          <div className="flex justify-between">
            <span>[23.8100° N, 90.4120° E]</span>
            <span>[23.8100° N, 90.41416° E]</span>
          </div>
        </div>

        {/* The Scanning Slider Line */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-signal-amber cursor-col-resize pointer-events-none"
          style={{ left: `${sliderPos}%` }}
        >
          {/* Draggable handle icon */}
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-10 rounded border border-signal-amber bg-basalt flex flex-col items-center justify-center gap-1 shadow-lg shadow-black/80 pointer-events-auto"
            onMouseDown={handleMouseDown}
            onTouchStart={handleMouseDown}
          >
            <ScanLine className="w-4.5 h-4.5 text-signal-amber" />
            <div className="flex gap-0.5">
              <span className="text-[6px] text-signal-amber">◀</span>
              <span className="text-[6px] text-signal-amber">▶</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Readout / HUD at bottom */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 bg-slate-grid/5 border border-slate-grid/20 rounded p-2.5 text-[10px]">
        <div>
          <span className="text-slate-grid">COORDINATES:</span>{' '}
          <span className="text-signal-amber">
            {hoveredCell
              ? `[LAT: ${hoveredCell.lat.toFixed(5)}, LON: ${hoveredCell.lon.toFixed(5)}]`
              : '[-.------, -.------]'}
          </span>
        </div>
        <div className="text-left md:text-center">
          <span className="text-slate-grid">CELL_STATUS:</span>{' '}
          {hoveredCell ? (
            hoveredCell.isStructure ? (
              hoveredCell.isDamaged ? (
                <span className="text-hazard-coral font-bold">STRUCTURAL_DAMAGE_DETECTED (T1)</span>
              ) : (
                <span className="text-moss font-bold">STABLE_BASELINE_STRUCTURE (T0)</span>
              )
            ) : (
              <span className="text-slate-grid/80">EMPTY_GROUND_TERRAIN</span>
            )
          ) : (
            <span className="text-slate-grid/60">HOVER_CELL_TO_PROBE</span>
          )}
        </div>
        <div className="text-left md:text-right">
          <span className="text-slate-grid">SIAMESE_DECISION:</span>{' '}
          <span className="text-fog">
            {hoveredCell && hoveredCell.isStructure && hoveredCell.isDamaged
              ? 'L1_DIFF_THRESHOLD_EXCEEDED'
              : 'L0_STABLE_CORRELATION'}
          </span>
        </div>
      </div>
    </div>
  );
}
