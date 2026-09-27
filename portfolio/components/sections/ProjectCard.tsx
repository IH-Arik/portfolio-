import Link from 'next/link';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import { Project } from '../../content/site';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const firstMetric = project.caseStudy.metrics?.[0];

  return (
    <div className="group flex flex-col h-full rounded-lg border border-slate-grid/12 bg-slate-grid/[0.02] p-5 transition-colors hover:border-signal-amber/40">
      <h3 className="font-display font-semibold text-lg text-fog">{project.title}</h3>
      <p className="text-sm text-slate-grid mt-1">{project.role}</p>

      <p className="text-sm text-fog/90 leading-relaxed mt-4 line-clamp-3">{project.after}</p>

      {firstMetric && (
        <div className="mt-4">
          <span className="inline-flex items-center gap-1.5 text-xs rounded border border-slate-grid/15 bg-slate-grid/[0.03] px-2.5 py-1">
            <span className="font-semibold text-fog">{firstMetric.value}</span>
            <span className="text-slate-grid/40">·</span>
            <span className="text-slate-grid">{firstMetric.label}</span>
          </span>
        </div>
      )}

      <div className="flex flex-wrap gap-1.5 mt-3">
        {project.tags.slice(0, 4).map((tag) => (
          <span key={tag} className="text-xs text-slate-grid border border-slate-grid/15 rounded px-2 py-0.5">
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-auto pt-5 flex items-center justify-between text-sm">
        <Link
          href={`/projects/${project.slug}`}
          className="flex items-center gap-1 text-signal-amber hover:text-signal-amber/80 transition-colors font-medium"
        >
          Case study
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>

        <div className="flex items-center gap-3">
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} repository`}
              className="text-slate-grid hover:text-fog transition-colors"
            >
              <SiGithub className="w-4 h-4" />
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} demo`}
              className="text-slate-grid hover:text-fog transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
