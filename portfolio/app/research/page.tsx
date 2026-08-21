import React from 'react';
import Link from 'next/link';
import ResearchList from '../../components/sections/ResearchList';
import { BookOpen, Network, ShieldCheck, Microscope } from 'lucide-react';

export default function ResearchPage() {
  return (
    <div className="flex flex-col w-full">
      {/* Visual Header */}
      <div className="max-w-6xl mx-auto px-4 pt-12 md:pt-16 pb-4 w-full">
        <div className="border border-slate-grid/25 rounded bg-slate-grid/5 p-6 md:p-8 font-mono text-xs">
          <div className="flex justify-between items-start gap-4">
            <div>
              <span className="text-[9px] text-slate-grid block mb-1">// LABORATORY_SUITE_INDEX</span>
              <h1 className="font-display font-bold text-2xl md:text-3xl text-fog uppercase tracking-tight">
                Academic Publications & Applied DL Research
              </h1>
              <p className="text-slate-grid text-xs mt-1.5 leading-relaxed max-w-2xl">
                Investigating neural architectures for remote sensing change detection, medical diagnostic systems, and classification ensembles. Based in the Visual Data Analysis Lab (VDAL).
              </p>
            </div>
            <div className="hidden sm:block border border-signal-amber/30 text-signal-amber bg-signal-amber/5 px-2.5 py-1 rounded text-[8px] font-bold">
              [VDAL_RESEARCH_NODE]
            </div>
          </div>

          {/* Quick Labs Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-grid/15 text-[10px]">
            <div>
              <span className="text-slate-grid block text-[8px] font-bold mb-0.5">LABORATORY_UNIT</span>
              <span className="text-fog font-bold">VDAL_LAB</span>
            </div>
            <div>
              <span className="text-slate-grid block text-[8px] font-bold mb-0.5">CORE_FOCUS</span>
              <span className="text-fog font-bold">Remote Sensing / Bio-Med</span>
            </div>
            <div>
              <span className="text-slate-grid block text-[8px] font-bold mb-0.5">PUBLISHED_VENUE</span>
              <span className="text-fog font-bold">IEEE / Bio-Preprints</span>
            </div>
            <div>
              <span className="text-slate-grid block text-[8px] font-bold mb-0.5">CLASSIFICATION_INDEX</span>
              <span className="text-fog font-bold">Explainable AI Frameworks</span>
            </div>
          </div>
        </div>
      </div>

      {/* Embedded Publications list */}
      <ResearchList />

      {/* Detailed Research Methodologies Section */}
      <div className="max-w-6xl mx-auto px-4 pb-16 w-full font-mono text-xs text-slate-grid leading-relaxed">
        <div className="border border-slate-grid/20 border-dashed rounded p-6 md:p-8">
          <h2 className="font-display font-bold text-sm text-fog uppercase tracking-wider mb-4 flex items-center gap-2">
            <Microscope className="w-4 h-4 text-signal-amber" />
            <span>Methodological Core & Research Pillars</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
            <div className="space-y-4">
              <div>
                <span className="text-[9px] font-bold text-signal-amber block mb-1">01 // BITEMPORAL COMPARATIVE SCANNING</span>
                <p>
                  Comparing co-registered satellite images across temporal points (T0 and T1) to isolate damaged structures. Our Siamese models maps structural feature shifts directly in low-dimensional embedding spaces, bypassing pixel-level labeling.
                </p>
              </div>
              <div>
                <span className="text-[9px] font-bold text-signal-amber block mb-1">02 // EXPLAINABILITY IN CLINICAL AI</span>
                <p>
                  Integrating neural network predictions (MRI classification, thyroid markers) with diagnostic verification tools like SHAP attribution maps. This gives clinical operators visual activation highlights, explaining why an AI classified a patient scan.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-[9px] font-bold text-signal-amber block mb-1">03 // DUAL-WAVELET DECOMPOSITION</span>
                <p>
                  Reducing speckle noise in clinical ultrasound images. By splitting images into high- and low-frequency wavelet sub-bands, our filters isolate and suppress ambient artifacts while preserving sharp tissue boundaries.
                </p>
              </div>
              <div>
                <span className="text-[9px] font-bold text-signal-amber block mb-1">04 // GENETIC ALGORITHM SELECTION</span>
                <p>
                  Improving tabular medical diagnostics. Using genetic algorithms, we prune clinical input features to find optimal predictor columns. This reduces network parameters while maintaining 99%+ classification metrics.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-grid/15 flex justify-between items-center text-[10px]">
            <span>CONNECTOR_STATUS: ACTIVE</span>
            <Link href="/" className="text-signal-amber hover:text-signal-amber/80 transition-colors">
              [← BACK_TO_CONSOLE]
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
