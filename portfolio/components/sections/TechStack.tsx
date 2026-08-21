'use client';

import React from 'react';
import type { IconType } from 'react-icons';
import { BlackHoleVortex } from '../effects/BlackHoleVortex';
import { TbBrandNextjs } from 'react-icons/tb';
import {
  SiPython,
  SiPytorch,
  SiFastapi,
  SiTypescript,
  SiJavascript,
  SiReact,
  SiTailwindcss,
  SiSvelte,
  SiExpo,
  SiPostgresql,
  SiSqlalchemy,
  SiCelery,
  SiDocker,
  SiOpencv,
  SiNumpy,
  SiPandas,
  SiHtml5,
  SiCss,
  SiGit,
  SiGithub,
  SiLinux,
  SiJupyter,
  SiResearchgate,
} from 'react-icons/si';

interface TechItem {
  name: string;
  Icon: IconType;
}

// Rows sized to form a centered pyramid, widest at top — grounded in the
// stack referenced across bio.md, Skills.tsx, and project tags.
const ROWS: TechItem[][] = [
  [
    { name: 'Python', Icon: SiPython },
    { name: 'PyTorch', Icon: SiPytorch },
    { name: 'FastAPI', Icon: SiFastapi },
    { name: 'TypeScript', Icon: SiTypescript },
    { name: 'JavaScript', Icon: SiJavascript },
    { name: 'React', Icon: SiReact },
    { name: 'Next.js', Icon: TbBrandNextjs },
    { name: 'Tailwind', Icon: SiTailwindcss },
  ],
  [
    { name: 'Svelte', Icon: SiSvelte },
    { name: 'Expo', Icon: SiExpo },
    { name: 'PostgreSQL', Icon: SiPostgresql },
    { name: 'SQLAlchemy', Icon: SiSqlalchemy },
    { name: 'Celery', Icon: SiCelery },
    { name: 'Docker', Icon: SiDocker },
  ],
  [
    { name: 'OpenCV', Icon: SiOpencv },
    { name: 'NumPy', Icon: SiNumpy },
    { name: 'Pandas', Icon: SiPandas },
    { name: 'HTML5', Icon: SiHtml5 },
    { name: 'CSS3', Icon: SiCss },
    { name: 'Git', Icon: SiGit },
  ],
  [
    { name: 'GitHub', Icon: SiGithub },
    { name: 'Linux', Icon: SiLinux },
    { name: 'Jupyter', Icon: SiJupyter },
    { name: 'ResearchGate', Icon: SiResearchgate },
  ],
];

export default function TechStack() {
  return (
    <section className="relative w-full py-20 border-b border-slate-grid/10 overflow-hidden">
      {/* Black-hole style vortex backdrop: canvas particle disk spiraling
          into a glowing core, edges faded into the page background. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <BlackHoleVortex />
        <div
          className="absolute inset-x-0 top-0 h-32"
          style={{ background: 'linear-gradient(to bottom, var(--basalt) 0%, transparent 100%)' }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-32"
          style={{ background: 'linear-gradient(to top, var(--basalt) 0%, transparent 100%)' }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <span className="font-mono text-[9px] text-slate-grid block mb-2 tracking-wider">
            // ARCHIVE_04
          </span>
          <h2
            className="font-display font-bold text-2xl md:text-4xl uppercase tracking-tight bg-clip-text text-transparent"
            style={{ backgroundImage: 'linear-gradient(180deg, var(--fog), var(--signal-amber))' }}
          >
            Tech Stack
          </h2>
          <p className="text-slate-grid text-xs mt-2 max-w-xl mx-auto font-mono">
            Languages, frameworks, and tooling used across research pipelines and shipped products.
          </p>
        </div>

        {/* Pyramid Grid */}
        <div className="flex flex-col items-center gap-3 sm:gap-4">
          {ROWS.map((row, rowIdx) => (
            <div key={rowIdx} className="flex flex-wrap justify-center gap-3 sm:gap-4">
              {row.map(({ name, Icon }) => (
                <div
                  key={name}
                  className="group flex flex-col items-center gap-2 w-[72px] sm:w-[84px]"
                >
                  <div className="w-full aspect-square rounded-lg border border-fog/10 bg-fog/[0.03] backdrop-blur-sm flex items-center justify-center transition-all duration-300 ease-out group-hover:-translate-y-1.5 group-hover:scale-105 group-hover:border-signal-amber/50 group-hover:bg-signal-amber/10 group-hover:shadow-[0_8px_30px_rgba(217,138,61,0.25)]">
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-slate-grid/80 transition-colors duration-200 group-hover:text-signal-amber" />
                  </div>
                  <span className="font-mono text-[9px] text-slate-grid/70 text-center leading-tight group-hover:text-fog transition-colors duration-200">
                    {name}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
