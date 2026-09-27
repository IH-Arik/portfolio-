import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { projects } from '../../../content/site';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { SiGithub } from 'react-icons/si';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.description,
  };
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <h2 className="text-sm font-semibold text-slate-grid uppercase tracking-wide">{title}</h2>
      {children}
    </div>
  );
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14 md:py-20">
      <Link href="/#projects" className="flex items-center gap-1.5 text-sm text-slate-grid hover:text-fog transition-colors w-fit">
        <ArrowLeft className="w-3.5 h-3.5" />
        Back to projects
      </Link>

      <div className="mt-6">
        <h1 className="font-display font-bold text-2xl sm:text-3xl text-fog">{project.title}</h1>
        <p className="text-slate-grid mt-2">{project.description}</p>
      </div>

      <div className="flex flex-wrap gap-4 mt-6">
        {project.repoUrl && (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-signal-amber hover:text-signal-amber/80 transition-colors"
          >
            <SiGithub className="w-4 h-4" />
            Repository
          </a>
        )}
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-signal-amber hover:text-signal-amber/80 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Live demo
          </a>
        )}
      </div>

      <div className="mt-10 space-y-8">
        {project.caseStudy.overview && (
          <Section title="Overview">
            <p className="text-fog/90 leading-relaxed">{project.caseStudy.overview}</p>
          </Section>
        )}

        {project.role && (
          <Section title="My role">
            <p className="text-fog/90 leading-relaxed">{project.role}</p>
          </Section>
        )}

        {project.before && (
          <Section title="Problem">
            <p className="text-fog/90 leading-relaxed">{project.before}</p>
          </Section>
        )}

        {project.caseStudy.approach && (
          <Section title="Approach">
            <p className="text-fog/90 leading-relaxed">{project.caseStudy.approach}</p>
          </Section>
        )}

        {project.caseStudy.results.length > 0 && (
          <Section title="Results">
            <ul className="space-y-2">
              {project.caseStudy.results.map((result, idx) => (
                <li key={idx} className="flex items-start gap-2 text-fog/90 leading-relaxed">
                  <span className="mt-2 w-1 h-1 rounded-full bg-signal-amber flex-shrink-0" />
                  <span>{result}</span>
                </li>
              ))}
            </ul>
            {project.caseStudy.metrics.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-4">
                {project.caseStudy.metrics.map((metric) => (
                  <div key={metric.label} className="border border-slate-grid/12 rounded-md px-3 py-2">
                    <div className="text-xs text-slate-grid">{metric.label}</div>
                    <div className="text-base font-semibold text-fog">{metric.value}</div>
                  </div>
                ))}
              </div>
            )}
          </Section>
        )}

        {project.tags.length > 0 && (
          <Section title="Tech stack">
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="text-sm text-slate-grid border border-slate-grid/15 rounded-full px-3 py-1">
                  {tag}
                </span>
              ))}
            </div>
          </Section>
        )}

        {(project.repoUrl || project.demoUrl || (project.relatedLinks?.length ?? 0) > 0) && (
          <Section title="Links">
            <div className="flex flex-col gap-1.5">
              {project.repoUrl && (
                <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="text-signal-amber hover:text-signal-amber/80 transition-colors w-fit break-all">
                  Repository — {project.repoUrl}
                </a>
              )}
              {project.demoUrl && (
                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="text-signal-amber hover:text-signal-amber/80 transition-colors w-fit break-all">
                  Live demo — {project.demoUrl}
                </a>
              )}
              {project.relatedLinks?.map((link) => (
                <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" className="text-signal-amber hover:text-signal-amber/80 transition-colors w-fit break-all">
                  {link.label} — {link.url}
                </a>
              ))}
            </div>
          </Section>
        )}
      </div>

      <div className="border-t border-slate-grid/12 pt-6 mt-14 flex justify-between items-center text-sm">
        <Link href="/#projects" className="text-slate-grid hover:text-fog transition-colors">
          ← Back to projects
        </Link>
        <Link href="/#contact" className="text-signal-amber hover:text-signal-amber/80 transition-colors">
          Get in touch →
        </Link>
      </div>
    </div>
  );
}
