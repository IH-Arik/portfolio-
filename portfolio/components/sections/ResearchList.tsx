'use client';

import React from 'react';
import { researchPapers } from '../../content/research';
import { BookOpen, FileText, ArrowRight, ExternalLink } from 'lucide-react';

export default function ResearchList() {
  return (
    <section id="research" className="w-full py-16 border-b border-slate-grid/10">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Section Header */}
        <div className="mb-12">
          <span className="font-mono text-[9px] text-slate-grid block mb-1">
            // ARCHIVE_02
          </span>
          <h2 className="font-display font-bold text-2xl md:text-3xl text-fog uppercase tracking-tight">
            Research Publications & Preprints
          </h2>
          <p className="text-slate-grid text-xs mt-1 max-w-xl font-mono">
            Applied deep learning research projects targeted at clinical medical systems and dual-temporal remote sensing environments.
          </p>
        </div>

        {/* Papers Listing */}
        <div className="flex flex-col gap-10">
          {researchPapers.map((paper, idx) => (
            <div 
              key={paper.slug}
              className="relative border border-slate-grid/25 rounded bg-slate-grid/5 p-6 md:p-8 font-mono grid grid-cols-1 lg:grid-cols-12 gap-6"
            >
              {/* Left Column: Index, Date & Venue details */}
              <div className="lg:col-span-3 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-grid/20 pb-4 lg:pb-0 lg:pr-6">
                <div>
                  <div className="text-[10px] text-slate-grid/50 uppercase tracking-widest font-bold">
                    INDEX_ID // 0{idx + 1}
                  </div>
                  <div className="text-signal-amber font-bold text-sm mt-1">
                    {paper.date}
                  </div>
                </div>
                <div className="mt-4 lg:mt-0 text-[10px] text-slate-grid leading-normal">
                  <span className="text-[9px] text-slate-grid/60 block">// VENUE</span>
                  <span className="text-fog font-medium">{paper.venue}</span>
                </div>
              </div>

              {/* Right Column: Title, Authors, Abstract & Findings */}
              <div className="lg:col-span-9 flex flex-col justify-between">
                <div>
                  {/* Title */}
                  <h3 className="font-display font-bold text-base md:text-lg text-fog leading-snug uppercase">
                    {paper.title}
                  </h3>

                  {/* Authors */}
                  <div className="text-[10px] text-slate-grid mt-2 flex flex-wrap gap-x-2 gap-y-1 items-center">
                    <span className="text-slate-grid/50">// AUTHORS:</span>
                    {paper.authors.map((author, index) => (
                      <span key={author} className="flex items-center">
                        <span className={author.includes('Hossain') ? 'text-signal-amber font-bold' : 'text-slate-grid'}>
                          {author}
                        </span>
                        {index < paper.authors.length - 1 && <span className="text-slate-grid/40 ml-1">,</span>}
                      </span>
                    ))}
                  </div>

                  {/* Abstract */}
                  <div className="mt-5 text-xs text-slate-grid hover:text-fog/90 transition-colors duration-200 leading-relaxed">
                    <span className="text-[9px] text-slate-grid/50 block font-bold mb-1">// ABSTRACT_INDEX</span>
                    {paper.abstract}
                  </div>

                  {/* Key Findings */}
                  <div className="mt-5">
                    <span className="text-[9px] text-slate-grid/50 block font-bold mb-2">// KEY_RESEARCH_METRICS</span>
                    <ul className="text-xs text-slate-grid leading-relaxed flex flex-col gap-2.5 pl-4 list-none">
                      {paper.keyFindings.map((finding, index) => (
                        <li key={index} className="relative flex items-start gap-2">
                          <span className="text-signal-amber text-[10px] select-none mt-0.5 font-bold">»</span>
                          <span>{finding}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer Action Links */}
                <div className="border-t border-slate-grid/20 pt-5 mt-6 flex flex-wrap gap-4 items-center">
                  {paper.researchGateUrl && (
                    <a
                      href={paper.researchGateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] text-slate-grid hover:text-signal-amber border border-slate-grid/20 hover:border-signal-amber/60 rounded px-2.5 py-1 bg-basalt transition-all duration-200 flex items-center gap-1.5"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>[ResearchGate_Profile]</span>
                      <ExternalLink className="w-2.5 h-2.5 text-slate-grid/50" />
                    </a>
                  )}
                  {paper.paperUrl && (
                    <a
                      href={paper.paperUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] text-slate-grid hover:text-signal-amber border border-slate-grid/20 hover:border-signal-amber/60 rounded px-2.5 py-1 bg-basalt transition-all duration-200 flex items-center gap-1.5"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>[View_Full_Text]</span>
                      <ExternalLink className="w-2.5 h-2.5 text-slate-grid/50" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
