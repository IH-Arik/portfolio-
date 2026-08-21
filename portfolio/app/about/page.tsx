import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Calendar, BookOpen, GraduationCap } from 'lucide-react';

export default function AboutPage() {
  const timeline = [
    {
      year: '2026 (Present)',
      title: 'Graduate Researcher & SaaS Engineer',
      institution: 'Visual Data Analysis Lab (VDAL) & Freelance Operations',
      description: 'Developing Siamese bi-temporal networks for high-resolution satellite change detection. Engineering Next.js/FastAPI pipelines for client operations.',
    },
    {
      year: 'Dec 2025',
      title: 'Research Co-Author (Thyroid Ensemble Classifier)',
      institution: 'VDAL Lab Publications',
      description: 'Co-designed a hybrid gradient-boosted tree and deep learning ensemble model optimized via genetic algorithms for clinical diagnostic tagging.',
    },
    {
      year: '2024 - 2025',
      title: 'Full-Stack SaaS Systems Lead',
      institution: 'Freelance & Small-Team Operations',
      description: 'Shipped operational business dashboards (Mabdel AI), sports telemetry trackers (Mon5majeur), and document screening portals (MyFutureAbroad).',
    },
    {
      year: '2023 - 2024',
      title: 'Applied Computer Vision Architect',
      institution: 'Academic Projects & Independent Studies',
      description: 'Trained custom YOLO object detectors for industrial safety compliance and developed DenseNet class models for brain tumor MRI diagnostic profiling.',
    },
    {
      year: '2022 - Present',
      title: 'B.Sc. in Computer Science & Engineering (Final-Year)',
      institution: 'Green University of Bangladesh',
      description: 'Focusing coursework on core neural networks, computer vision, database optimization, and software architecture.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 md:py-16 font-mono text-xs">
      
      {/* Page Header */}
      <div className="mb-10 border-b border-slate-grid/20 pb-6">
        <span className="text-[9px] text-slate-grid block mb-1">// SYSTEM_NODE_INDEX</span>
        <h1 className="font-display font-bold text-2xl md:text-3xl text-fog uppercase tracking-tight">
          Md. Hossain (Arik)
        </h1>
        <p className="text-slate-grid text-xs mt-1">
          Final-year CSE Student, Applied AI Researcher, and Full-Stack Systems Engineer.
        </p>
      </div>

      {/* Main Narrative */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
        {/* Left Side: Summary statement */}
        <div className="md:col-span-8 space-y-4 text-slate-grid leading-relaxed">
          <p>
            I operate at the intersection of applied deep learning research and modern full-stack engineering. My development methodology focuses on building highly robust, type-safe application nodes (Next.js/TypeScript) backed by modular, high-throughput asynchronous services (FastAPI/Python).
          </p>
          <p>
            As a resident researcher at the <span className="text-fog">Visual Data Analysis Lab (VDAL)</span>, my academic focus targets geospatial bitemporal imagery analysis. My flagship thesis project investigates how Siamese convolutional backbones can compare dual-temporal satellite captures to automate disaster damage classification, replacing slow and manual mapping procedures.
          </p>
          <p>
            Simultaneously, I collaborate with small teams and startups to architect operational SaaS tools. Whether integrating custom time-series forecasting scripts or deploying automated PDF visa rule checkers, my objective is to write clean, maintainable systems that ship real-world value.
          </p>
        </div>

        {/* Right Side: Quick Specs block */}
        <div className="md:col-span-4 border border-slate-grid/25 rounded bg-slate-grid/5 p-4 flex flex-col gap-4">
          <div>
            <span className="text-[8px] text-slate-grid/65 block font-bold mb-1">// CORE_AFFILIATIONS</span>
            <div className="flex items-center gap-2 text-[10px] text-fog font-medium">
              <GraduationCap className="w-3.5 h-3.5 text-signal-amber" />
              <span>Green University of Bangladesh</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-fog font-medium mt-2">
              <BookOpen className="w-3.5 h-3.5 text-signal-amber" />
              <span>Visual Data Analysis Lab</span>
            </div>
          </div>

          <div className="border-t border-slate-grid/15 pt-3">
            <span className="text-[8px] text-slate-grid/65 block font-bold mb-1">// SYSTEM_STATUS</span>
            <div className="flex items-center gap-2 text-[10px]">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-moss opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-moss"></span>
              </span>
              <span className="text-moss font-bold">RESEARCH_NODE_ACTIVE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div>
        <h2 className="font-display font-bold text-sm text-fog uppercase tracking-wider mb-6 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-signal-amber" />
          <span>Chronological Timeline / Milestones</span>
        </h2>

        <div className="relative border-l border-slate-grid/20 ml-2 pl-6 flex flex-col gap-8">
          {timeline.map((item, idx) => (
            <div key={idx} className="relative group">
              {/* Connector Dot */}
              <div className="absolute -left-[31px] top-1 w-2.5 h-2.5 rounded-full border border-slate-grid/40 bg-basalt group-hover:border-signal-amber transition-colors duration-200 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-grid/50 group-hover:bg-signal-amber transition-colors duration-200" />
              </div>

              {/* Year */}
              <div className="text-[10px] text-signal-amber font-bold flex items-center gap-1.5">
                <Calendar className="w-3 h-3 text-signal-amber/60" />
                {item.year}
              </div>

              {/* Title */}
              <h3 className="text-sm font-bold text-fog mt-1">
                {item.title}
              </h3>

              {/* Institution */}
              <div className="text-[10px] text-slate-grid mt-0.5">
                {item.institution}
              </div>

              {/* Description */}
              <p className="text-slate-grid/80 group-hover:text-fog/90 transition-colors duration-150 leading-relaxed mt-2 text-xs">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Call to action */}
      <div className="mt-12 pt-6 border-t border-slate-grid/20 flex justify-between items-center">
        <Link 
          href="/" 
          className="text-slate-grid hover:text-signal-amber transition-colors flex items-center gap-1"
        >
          <span>[← BACK_TO_CONSOLE]</span>
        </Link>
        <Link 
          href="/#contact" 
          className="text-signal-amber hover:text-signal-amber/80 transition-colors flex items-center gap-1"
        >
          <span>[ESTABLISH_SOCKET_COMMUNICATION →]</span>
        </Link>
      </div>

    </div>
  );
}
