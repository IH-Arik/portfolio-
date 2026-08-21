'use client';

import React from 'react';
import { Cpu, Eye, Layout, Terminal } from 'lucide-react';

interface SkillItem {
  name: string;
  level: string;
  status: 'stable' | 'changed';
}

interface SkillGroup {
  title: string;
  icon: React.ReactNode;
  skills: SkillItem[];
}

export default function Skills() {
  const groups: SkillGroup[] = [
    {
      title: 'Deep Learning & Research',
      icon: <Cpu className="w-4 h-4 text-signal-amber" />,
      skills: [
        { name: 'PyTorch (DL Framework)', level: 'COMPUTATION_FAST', status: 'changed' },
        { name: 'Siamese Neural Networks', level: 'BITEMPORAL_DIFFS', status: 'changed' },
        { name: 'Retrieval-Augmented Gen (RAG)', level: 'CHROMA_VECTOR_DB', status: 'changed' },
        { name: 'Explainable AI (SHAP/Grad-CAM)', level: 'ACTIVATION_MAPPED', status: 'stable' },
        { name: 'Convolutional Networks (CNNs)', level: 'BACKBONE_RESNET', status: 'stable' },
      ],
    },
    {
      title: 'Computer Vision',
      icon: <Eye className="w-4 h-4 text-signal-amber" />,
      skills: [
        { name: 'YOLOv8 Detection Model', level: 'CUSTOM_FINE_TUNED', status: 'changed' },
        { name: 'OpenCV (Image Pipeline)', level: 'MATRIX_GEOMETRIES', status: 'stable' },
        { name: 'Dual-Temporal Segmentation', level: 'WAVELET_ISOLATION', status: 'changed' },
        { name: 'Geospatial Maps (GDAL)', level: 'SHAPEFILES_COORDS', status: 'stable' },
      ],
    },
    {
      title: 'Full-Stack SaaS Engineering',
      icon: <Layout className="w-4 h-4 text-signal-amber" />,
      skills: [
        { name: 'FastAPI / Asynchronous Python', level: 'CELERY_ASYNC_WORKERS', status: 'changed' },
        { name: 'React / Next.js (App Router)', level: 'SERVER_COMPONENTS', status: 'changed' },
        { name: 'React Native (Mobile Development)', level: 'EXPO_CROSS_PLATFORM', status: 'stable' },
        { name: 'Svelte / Frontend UI', level: 'DOM_EFFICIENT_NODES', status: 'stable' },
        { name: 'PostgreSQL / SQL Databases', level: 'QUERY_OPTIMIZED', status: 'stable' },
      ],
    },
    {
      title: 'Environments & Tools',
      icon: <Terminal className="w-4 h-4 text-signal-amber" />,
      skills: [
        { name: 'Docker / Containers', level: 'CONTAINER_ISOLATED', status: 'stable' },
        { name: 'Linux Command Line', level: 'SHELL_AUTOMATION', status: 'stable' },
        { name: 'Git Version Control', level: 'VCS_COLLABORATIVE', status: 'stable' },
        { name: 'TypeScript / Javascript', level: 'TYPES_STRICT_CHECK', status: 'changed' },
      ],
    },
  ];

  return (
    <section id="skills" className="w-full py-16 border-b border-slate-grid/10">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Section Header */}
        <div className="mb-12">
          <span className="font-mono text-[9px] text-slate-grid block mb-1">
            // ARCHIVE_03
          </span>
          <h2 className="font-display font-bold text-2xl md:text-3xl text-fog uppercase tracking-tight">
            Technical Matrix & Skillsets
          </h2>
          <p className="text-slate-grid text-xs mt-1 max-w-xl font-mono">
            A breakdown of languages, frame structures, neural architectures, and pipelines implemented across research and product builds.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {groups.map((group) => (
            <div 
              key={group.title}
              className="border border-slate-grid/25 rounded bg-slate-grid/5 p-5 font-mono"
            >
              {/* Group Title Header */}
              <div className="flex items-center gap-2.5 border-b border-slate-grid/20 pb-3 mb-4">
                {group.icon}
                <h3 className="text-sm font-bold text-fog uppercase tracking-wider">
                  {group.title}
                </h3>
              </div>

              {/* Skills Listing */}
              <div className="flex flex-col gap-3">
                {group.skills.map((skill) => (
                  <div 
                    key={skill.name}
                    className="flex justify-between items-center text-xs group hover:bg-slate-grid/5 p-1 rounded transition-colors duration-150"
                  >
                    <span className="text-slate-grid group-hover:text-fog transition-colors duration-150">
                      {skill.name}
                    </span>
                    <span 
                      className={`text-[9px] font-bold border rounded-sm px-1.5 py-0.5
                        ${skill.status === 'changed'
                          ? 'border-signal-amber/30 text-signal-amber bg-signal-amber/5'
                          : 'border-slate-grid/30 text-slate-grid bg-slate-grid/5'
                        }
                      `}
                    >
                      {skill.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
