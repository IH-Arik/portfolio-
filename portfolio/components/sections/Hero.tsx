'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import AssistantPanel from '../assistant/AssistantPanel';
import { HeroHeatmap } from '../effects/HeroHeatmap';
import { Terminal, Shield } from 'lucide-react';

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  // Animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: shouldReduceMotion ? 0 : 15 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' as const }
    },
  };

  return (
    <section id="hero-section" className="relative w-full py-10 md:py-16 border-b border-slate-grid/10 overflow-hidden">
      <HeroHeatmap />
      <div className="relative z-10 max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left Side: Headline & Bio info */}
        <motion.div 
          className="lg:col-span-6 flex flex-col justify-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Lab Node Badge */}
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center gap-2 border border-slate-grid/35 px-3 py-1 rounded-full w-fit mb-6 bg-slate-grid/5 font-mono text-[9px] text-slate-grid tracking-wider uppercase"
          >
            <Terminal className="w-3.5 h-3.5 text-signal-amber animate-pulse" />
            NODE_ADDR: <span className="text-fog">VDAL_LAB_ACTIVE</span>
          </motion.div>

          {/* Large display headline */}
          <motion.h1 
            variants={itemVariants}
            className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-fog leading-[1.1] tracking-tight uppercase"
          >
            Applied AI Research <br />
            <span className="text-signal-amber">& Shipped SaaS</span> Systems.
          </motion.h1>

          {/* Intro copy */}
          <motion.p 
            variants={itemVariants}
            className="text-slate-grid hover:text-fog/90 text-sm sm:text-base leading-relaxed mt-5 max-w-xl transition-colors duration-300"
          >
            I engineer full-stack SaaS interfaces (React Native, Next.js, FastAPI) and design neural architectures for geospatial and medical imaging. Currently conducting deep learning research at the{' '}
            <span className="text-fog border-b border-slate-grid/40 pb-0.5 font-mono text-xs">
              Visual Data Analysis Lab (VDAL)
            </span>.
          </motion.p>

          {/* Technical Info Coordinates */}
          <motion.div 
            variants={itemVariants}
            className="mt-8 grid grid-cols-2 gap-4 border-t border-slate-grid/25 pt-6 font-mono text-xs text-slate-grid"
          >
            <div className="flex flex-col gap-1 border-r border-slate-grid/10 pr-2">
              <span className="text-[10px] text-slate-grid/65 uppercase tracking-wider">// CORE_RESEARCH</span>
              <span className="text-fog font-medium">Bitemporal Change Models</span>
              <span className="text-[10px] text-moss flex items-center gap-1">
                <Shield className="w-2.5 h-2.5 text-moss" /> F1_LOCALIZATION: 91.4%
              </span>
            </div>
            <div className="flex flex-col gap-1 pl-2">
              <span className="text-[10px] text-slate-grid/65 uppercase tracking-wider">// SYSTEMS_BUILD</span>
              <span className="text-fog font-medium">FastAPI + Async Python</span>
              <span className="text-[10px] text-signal-amber">NEXTJS_RECON_CLIENT</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Side: Showcase Signature AI Assistant Component */}
        <motion.div 
          className="lg:col-span-6 w-full flex flex-col justify-center"
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: 'easeOut' }}
        >
          <AssistantPanel />
        </motion.div>

      </div>
    </section>
  );
}
