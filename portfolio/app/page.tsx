import Hero from '../components/sections/Hero';
import ProjectGrid from '../components/sections/ProjectGrid';
import ResearchList from '../components/sections/ResearchList';
import Skills from '../components/sections/Skills';
import Contact from '../components/sections/Contact';

export default function Home() {
  return (
    <div className="flex flex-col w-full divide-y divide-slate-grid/10">
      <Hero />
      <ProjectGrid />
      <ResearchList compact />
      <Skills />
      <Contact />
    </div>
  );
}
