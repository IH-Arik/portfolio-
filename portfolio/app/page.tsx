import React from 'react';
import Hero from '../components/sections/Hero';
import ProjectGrid from '../components/sections/ProjectGrid';
import ResearchList from '../components/sections/ResearchList';
import Skills from '../components/sections/Skills';
import TechStack from '../components/sections/TechStack';
import ConsoleWidget from '../components/sections/ConsoleWidget';
import Contact from '../components/sections/Contact';

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section containing Headline and Diff Scanner centerpiece */}
      <Hero />

      {/* Project Card Grid showing before/after sweeps */}
      <ProjectGrid />

      {/* Structured Publications list */}
      <ResearchList />

      {/* Skillsets matrix */}
      <Skills />

      {/* Tech stack icon pyramid */}
      <TechStack />

      {/* Interactive Diagnostics Terminal shell */}
      <ConsoleWidget />

      {/* Secure contact submission block */}
      <Contact />
    </div>
  );
}
