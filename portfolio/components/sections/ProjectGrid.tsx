import Link from 'next/link';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import { projects } from '../../content/site';
import ProjectCard from './ProjectCard';
import { FadeIn } from '../ui/FadeIn';

export default function ProjectGrid() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="w-full py-16 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <FadeIn>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-fog">Selected projects</h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
          {featured.map((project, idx) => (
            <FadeIn key={project.slug} delay={idx * 0.05}>
              <ProjectCard project={project} />
            </FadeIn>
          ))}
        </div>

        {rest.length > 0 && (
          <div className="mt-16">
            <FadeIn>
              <h3 className="text-sm font-semibold text-slate-grid uppercase tracking-wide">More projects</h3>
            </FadeIn>
            <div className="mt-6 divide-y divide-slate-grid/12 border-y border-slate-grid/12">
              {rest.map((project, idx) => (
                <FadeIn key={project.slug} delay={idx * 0.03}>
                  <div className="py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-6">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <Link
                          href={`/projects/${project.slug}`}
                          className="font-display font-semibold text-fog hover:text-signal-amber transition-colors text-base"
                        >
                          {project.title}
                        </Link>
                        <span className="text-slate-grid/40 hidden sm:inline" aria-hidden="true">•</span>
                        <span className="text-xs text-slate-grid">{project.role}</span>
                      </div>
                      <p className="text-sm text-slate-grid truncate mt-1">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 sm:gap-4 flex-shrink-0">
                      <div className="flex flex-wrap gap-1.5 items-center">
                        {project.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="text-xs text-slate-grid border border-slate-grid/15 rounded px-2 py-0.5 whitespace-nowrap"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-3">
                        <Link
                          href={`/projects/${project.slug}`}
                          className="inline-flex items-center gap-1 text-sm text-signal-amber hover:text-signal-amber/80 font-medium transition-colors whitespace-nowrap"
                        >
                          Case study
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>

                        {project.repoUrl && (
                          <a
                            href={project.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${project.title} repository`}
                            className="text-slate-grid hover:text-fog transition-colors p-1"
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
                            className="text-slate-grid hover:text-fog transition-colors p-1"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
