import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { projects } from '../../../content/projects';
import { ArrowLeft, ExternalLink, GitFork, Cpu, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const getStatusColor = (status: typeof project.status) => {
    switch (status) {
      case 'changed':
        return 'text-hazard-coral border-hazard-coral/30 bg-hazard-coral/5';
      case 'shipped':
        return 'text-signal-amber border-signal-amber/30 bg-signal-amber/5';
      case 'stable':
        default:
        return 'text-moss border-moss/30 bg-moss/5';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 md:py-16 font-mono text-xs">
      
      {/* Navigation and Back link */}
      <div className="mb-8">
        <Link 
          href="/" 
          className="text-slate-grid hover:text-signal-amber transition-colors flex items-center gap-1.5 w-fit"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>[BACK_TO_ARCHIVES]</span>
        </Link>
      </div>

      {/* Project Meta Header */}
      <div className="border border-slate-grid/25 rounded bg-slate-grid/5 p-6 md:p-8 mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
          <div>
            <span className="text-[9px] text-slate-grid block mb-1">PROJECT_COMMITS // {project.slug.toUpperCase()}</span>
            <h1 className="font-display font-bold text-xl md:text-2xl text-fog uppercase tracking-tight">
              {project.title}
            </h1>
            <div className="flex items-center gap-2 mt-2 text-slate-grid text-[10px]">
              <Cpu className="w-3.5 h-3.5" />
              <span>ROLE: {project.role}</span>
            </div>
          </div>
          <span className={`text-[8px] font-bold px-2 py-0.5 border rounded ${getStatusColor(project.status)}`}>
            [{project.status.toUpperCase()}]
          </span>
        </div>

        {/* Action buttons (Repo / Demo URL) */}
        <div className="border-t border-slate-grid/15 pt-6 mt-6 flex flex-wrap gap-4 items-center">
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] text-slate-grid hover:text-signal-amber border border-slate-grid/20 hover:border-signal-amber/60 rounded px-2.5 py-1 bg-basalt transition-all duration-200 flex items-center gap-1.5"
            >
              <GitFork className="w-3.5 h-3.5" />
              <span>[Repository_Source]</span>
              <ExternalLink className="w-2.5 h-2.5 text-slate-grid/50" />
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] text-slate-grid hover:text-signal-amber border border-slate-grid/20 hover:border-signal-amber/60 rounded px-2.5 py-1 bg-basalt transition-all duration-200 flex items-center gap-1.5"
            >
              <span>[Live_Deployment]</span>
              <ExternalLink className="w-2.5 h-2.5 text-slate-grid/50" />
            </a>
          )}
        </div>
      </div>

      {/* Dual State Split: Before / Problem vs After / Solution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Before Layer */}
        <div className="border border-slate-grid/20 rounded p-5 bg-slate-grid/5">
          <div className="text-[9px] text-slate-grid/50 font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-slate-grid/70" />
            <span>T0_PROBLEM_STATE (BASELINE)</span>
          </div>
          <p className="text-slate-grid leading-relaxed">
            {project.before}
          </p>
        </div>

        {/* After Layer */}
        <div className="border border-signal-amber/25 rounded p-5 bg-signal-amber/5">
          <div className="text-[9px] text-signal-amber font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-signal-amber" />
            <span>T1_SHIPPED_STATE (SOLVED)</span>
          </div>
          <p className="text-fog leading-relaxed">
            {project.after}
          </p>
        </div>
      </div>

      {/* Case Study Details */}
      <div className="space-y-8">
        {/* Overview */}
        <div className="space-y-2.5 leading-relaxed text-slate-grid">
          <h3 className="font-display text-sm font-bold text-fog uppercase">// TECHNICAL_OVERVIEW</h3>
          <p>{project.caseStudy.overview}</p>
        </div>

        {/* Methodology */}
        <div className="space-y-2.5 leading-relaxed text-slate-grid">
          <h3 className="font-display text-sm font-bold text-fog uppercase">// IMPLEMENTATION_METHODOLOGY</h3>
          <p>{project.caseStudy.methodology}</p>
        </div>

        {/* Challenges & Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h3 className="font-display text-sm font-bold text-fog uppercase">// CORE_CHALLENGES</h3>
            <ul className="list-none pl-4 space-y-2.5 text-slate-grid">
              {project.caseStudy.challenges.map((challenge, idx) => (
                <li key={idx} className="relative flex items-start gap-2">
                  <span className="text-hazard-coral text-[10px] select-none mt-0.5">!</span>
                  <span>{challenge}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="font-display text-sm font-bold text-fog uppercase">// INTEGRATION_RESULTS</h3>
            <ul className="list-none pl-4 space-y-2.5 text-slate-grid">
              {project.caseStudy.results.map((result, idx) => (
                <li key={idx} className="relative flex items-start gap-2">
                  <span className="text-moss text-[10px] select-none mt-0.5">✓</span>
                  <span>{result}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Technical metrics */}
        <div className="space-y-4">
          <h3 className="font-display text-sm font-bold text-fog uppercase">// PERFORMANCE_METRICS</h3>
          <div className="border border-slate-grid/25 rounded bg-slate-grid/5 overflow-hidden">
            <table className="w-full text-left font-mono">
              <thead>
                <tr className="border-b border-slate-grid/20 bg-basalt text-[9px] text-slate-grid uppercase">
                  <th className="p-3">Metric Name</th>
                  <th className="p-3 text-right">Diagnostic Value</th>
                  <th className="p-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-grid/10">
                {project.caseStudy.metrics.map((metric, idx) => (
                  <tr key={idx} className="hover:bg-slate-grid/5 transition-colors">
                    <td className="p-3 text-slate-grid">{metric.label}</td>
                    <td className="p-3 text-right text-fog font-bold">{metric.value}</td>
                    <td className="p-3 text-right">
                      <span className={metric.status === 'changed' ? 'text-hazard-coral font-bold' : 'text-moss'}>
                        [{metric.status?.toUpperCase() || 'STABLE'}]
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Footer Nav */}
      <div className="border-t border-slate-grid/20 pt-8 mt-12 flex justify-between items-center text-[10px]">
        <Link href="/" className="text-slate-grid hover:text-signal-amber transition-colors">
          [← BACK_TO_CONSOLE]
        </Link>
        <Link href="/#contact" className="text-signal-amber hover:text-signal-amber/80 transition-colors">
          [REPORT_SIGNAL_FEEDBACK]
        </Link>
      </div>

    </div>
  );
}
