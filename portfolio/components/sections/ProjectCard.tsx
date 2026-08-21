'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Project } from '../../lib/types';
import { ArrowUpRight, Cpu } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Status-based formatting
  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'changed':
        return 'text-hazard-coral border-hazard-coral/40 bg-hazard-coral/5';
      case 'shipped':
        return 'text-signal-amber border-signal-amber/40 bg-signal-amber/5';
      case 'stable':
        default:
        return 'text-moss border-moss/40 bg-moss/5';
    }
  };

  return (
    <Link
      href={`/projects/${project.slug}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="block w-full"
    >
      <div className="relative w-full rounded border border-slate-grid/30 bg-basalt hover:border-signal-amber/50 transition-colors duration-300 overflow-hidden min-h-[300px] flex flex-col justify-between p-5 font-mono">
        
        {/* Card Header */}
        <div className="flex justify-between items-start gap-4">
          <div>
            <h3 className="font-display font-bold text-base text-fog group-hover:text-signal-amber transition-colors">
              {project.title}
            </h3>
            <p className="text-[10px] text-slate-grid mt-1 flex items-center gap-1.5">
              <Cpu className="w-3 h-3 text-slate-grid/70" /> {project.role}
            </p>
          </div>
          <span className={`text-[8px] font-bold px-2 py-0.5 border rounded ${getStatusColor(project.status)}`}>
            [{project.status.toUpperCase()}]
          </span>
        </div>

        {/* Dynamic Dual-State Diff Body */}
        <div className="relative flex-grow my-6 min-h-[110px] flex items-center">
          {/* Default state: Before (Problem statement) */}
          <div className="w-full text-xs text-slate-grid leading-relaxed select-none">
            <div className="text-[9px] text-slate-grid/40 mb-1.5 uppercase font-bold tracking-wider">
              // T0_PROBLEM_FRAMING
            </div>
            {project.before}
          </div>

          {/* Hover state: After (Solution state) - Animates clip path and swipe */}
          <motion.div
            className="absolute inset-y-0 left-0 right-0 bg-basalt text-xs text-fog leading-relaxed pointer-events-none select-none flex flex-col justify-center"
            initial={{ clipPath: 'inset(0 100% 0 0)' }}
            animate={{ clipPath: isHovered ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)' }}
            transition={{ duration: 0.45, ease: 'easeInOut' }}
          >
            <div className="text-[9px] text-hazard-coral mb-1.5 uppercase font-bold tracking-wider">
              // T1_SOLUTION_SHIPPED
            </div>
            <span className="text-fog">
              {project.after}
            </span>
          </motion.div>

          {/* Moving Scanline border divider */}
          <motion.div
            className="absolute top-0 bottom-0 w-[1.5px] bg-signal-amber pointer-events-none"
            initial={{ left: '0%' }}
            animate={{ left: isHovered ? '100%' : '0%' }}
            style={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.45, ease: 'easeInOut' }}
          />
        </div>

        {/* Card Footer */}
        <div className="border-t border-slate-grid/10 pt-4 flex flex-wrap justify-between items-center gap-3">
          <div className="flex flex-wrap gap-1.5">
            {project.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-[8px] border border-slate-grid/20 px-1.5 py-0.5 rounded text-slate-grid bg-slate-grid/5">
                {tag}
              </span>
            ))}
          </div>
          <div className="text-[10px] text-slate-grid hover:text-signal-amber flex items-center gap-1 transition-colors">
            <span>[VIEW_CASE]</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </div>

      </div>
    </Link>
  );
}
