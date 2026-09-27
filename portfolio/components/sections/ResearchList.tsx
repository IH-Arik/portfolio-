import { Fragment } from 'react';
import { papers, PaperStatus, SITE } from '../../content/site';
import { ExternalLink } from 'lucide-react';
import { SiGithub, SiResearchgate } from 'react-icons/si';
import { FadeIn } from '../ui/FadeIn';

const STATUS_LABEL: Record<PaperStatus, string> = {
  preprint: 'Preprint',
  submitted: 'Submitted',
  'under-review': 'Under review',
  accepted: 'Accepted',
  published: 'Published',
};

interface ResearchListProps {
  compact?: boolean;
  showHeader?: boolean;
}

export default function ResearchList({ compact = false, showHeader = true }: ResearchListProps) {
  return (
    <section id="research" className="w-full py-16 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {showHeader && (
          <FadeIn>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-fog">Research</h2>
          </FadeIn>
        )}

        <div className={`flex flex-col gap-5 ${showHeader ? 'mt-8' : 'mt-0'}`}>
          {papers.map((paper, idx) => (
            <FadeIn key={paper.slug} delay={idx * 0.05}>
              <div
                className={`rounded-lg border p-6 ${
                  idx === 0 ? 'border-signal-amber/30 bg-signal-amber/[0.03]' : 'border-slate-grid/12 bg-slate-grid/[0.02]'
                }`}
              >
                <div className="flex flex-wrap items-center gap-3 text-sm text-slate-grid">
                  {[paper.date, paper.venue].filter(Boolean).map((part, i) => (
                    <Fragment key={i}>
                      {i > 0 && <span className="text-slate-grid/40">•</span>}
                      <span>{part}</span>
                    </Fragment>
                  ))}
                  {paper.status && (
                    <span className="text-xs font-medium text-signal-amber border border-signal-amber/30 rounded-full px-2 py-0.5">
                      {STATUS_LABEL[paper.status]}
                    </span>
                  )}
                </div>

                <h3 className={`font-display font-semibold text-fog mt-2 ${idx === 0 ? 'text-xl' : 'text-lg'}`}>
                  {paper.title}
                </h3>

                <p className="text-sm text-slate-grid mt-1">
                  {paper.authors.map((author, i) => (
                    <Fragment key={author}>
                      {i > 0 && ', '}
                      <span className={author === SITE.citationName ? 'text-fog font-medium' : undefined}>{author}</span>
                    </Fragment>
                  ))}
                </p>

                {paper.metrics && paper.metrics.length > 0 && (
                  <div className="flex flex-wrap gap-3 mt-3">
                    {paper.metrics.map((metric) => (
                      <div key={metric.label} className="border border-slate-grid/12 rounded-md px-3 py-1.5">
                        <div className="text-xs text-slate-grid">{metric.label}</div>
                        <div className="text-sm sm:text-base font-semibold text-fog">{metric.value}</div>
                      </div>
                    ))}
                  </div>
                )}

                <p className={`text-sm text-fog/90 leading-relaxed mt-4 ${compact ? 'line-clamp-2' : ''}`}>
                  {paper.abstract}
                </p>

                {!compact && paper.keyFindings.length > 0 && (
                  <ul className="mt-4 flex flex-col gap-1.5 text-sm text-slate-grid">
                    {paper.keyFindings.map((finding, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-signal-amber mt-1.5 block w-1 h-1 rounded-full bg-signal-amber flex-shrink-0" />
                        <span>{finding}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-5 flex flex-wrap gap-4">
                  {paper.researchGateUrl && (
                    <a
                      href={paper.researchGateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-sm text-signal-amber hover:text-signal-amber/80 transition-colors"
                    >
                      <SiResearchgate className="w-4 h-4" />
                      ResearchGate profile
                    </a>
                  )}
                  {paper.paperUrl && (
                    <a
                      href={paper.paperUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-sm text-signal-amber hover:text-signal-amber/80 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Paper (DOI)
                    </a>
                  )}
                  {paper.codeUrl && (
                    <a
                      href={paper.codeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-sm text-signal-amber hover:text-signal-amber/80 transition-colors"
                    >
                      <SiGithub className="w-4 h-4" />
                      Code
                    </a>
                  )}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
