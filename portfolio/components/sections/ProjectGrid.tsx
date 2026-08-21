'use client';

import React, { useState } from 'react';
import { projects } from '../../content/projects';
import ProjectCard from './ProjectCard';
import { Database, Network, ArrowDownCircle } from 'lucide-react';

type FilterCategory = 'ALL' | 'APPLIED_DL' | 'FULL_STACK_SAAS';

export default function ProjectGrid() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('ALL');

  // Categorize projects based on tags
  const filteredProjects = projects.filter((project) => {
    if (activeFilter === 'ALL') return true;
    
    const dlTags = ['PyTorch', 'Siamese Networks', 'YOLOv8', 'DenseNet', 'Computer Vision', 'Explainable AI', 'Recommendation Engine'];
    const saasTags = ['React', 'FastAPI', 'Next.js', 'React Native', 'PostgreSQL', 'Docker', 'Svelte', 'SQLAlchemy'];

    if (activeFilter === 'APPLIED_DL') {
      return project.tags.some(tag => dlTags.includes(tag));
    }
    if (activeFilter === 'FULL_STACK_SAAS') {
      return project.tags.some(tag => saasTags.includes(tag));
    }
    return true;
  });

  return (
    <section id="projects" className="w-full py-16 border-b border-slate-grid/10 scroll-mt-10">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="font-mono text-[9px] text-slate-grid block mb-1">
              // ARCHIVE_01
            </span>
            <h2 className="font-display font-bold text-2xl md:text-3xl text-fog uppercase tracking-tight">
              Selected Systems & Research
            </h2>
          </div>

          {/* Filtering Toggles */}
          <div className="flex flex-wrap gap-2 font-mono text-[10px]">
            <button
              onClick={() => setActiveFilter('ALL')}
              className={`px-3 py-1 border rounded transition-colors duration-200 flex items-center gap-1.5
                ${activeFilter === 'ALL'
                  ? 'border-signal-amber text-signal-amber bg-signal-amber/5'
                  : 'border-slate-grid/20 text-slate-grid hover:border-slate-grid/50 hover:text-fog'
                }
              `}
            >
              [ALL_ARCHIVES]
            </button>
            <button
              onClick={() => setActiveFilter('APPLIED_DL')}
              className={`px-3 py-1 border rounded transition-colors duration-200 flex items-center gap-1.5
                ${activeFilter === 'APPLIED_DL'
                  ? 'border-signal-amber text-signal-amber bg-signal-amber/5'
                  : 'border-slate-grid/20 text-slate-grid hover:border-slate-grid/50 hover:text-fog'
                }
              `}
            >
              <Network className="w-3 h-3" />
              [APPLIED_DL]
            </button>
            <button
              onClick={() => setActiveFilter('FULL_STACK_SAAS')}
              className={`px-3 py-1 border rounded transition-colors duration-200 flex items-center gap-1.5
                ${activeFilter === 'FULL_STACK_SAAS'
                  ? 'border-signal-amber text-signal-amber bg-signal-amber/5'
                  : 'border-slate-grid/20 text-slate-grid hover:border-slate-grid/50 hover:text-fog'
                }
              `}
            >
              <Database className="w-3 h-3" />
              [FULL_STACK_SAAS]
            </button>
          </div>
        </div>

        {/* Project Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>

        {/* Empty state if nothing matches */}
        {filteredProjects.length === 0 && (
          <div className="w-full border border-dashed border-slate-grid/30 rounded p-12 text-center font-mono text-xs text-slate-grid">
            NO_COMMITS_FOUND_FOR_FILTER_STATE
          </div>
        )}

      </div>
    </section>
  );
}
