'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { SiGithub, SiResearchgate } from 'react-icons/si';
import { TbBrandLinkedin } from 'react-icons/tb';
import { SITE, projects, papers } from '../../content/site';

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  // 1. Papers metric: first-author published papers
  const firstAuthorPublishedPapers = papers.filter(
    (paper) => paper.status === 'published' && paper.authors[0] === SITE.citationName
  );
  const allIeee =
    firstAuthorPublishedPapers.length > 0 &&
    firstAuthorPublishedPapers.every((p) => p.venue.includes('IEEE'));
  const paperLabel = `${allIeee ? 'IEEE ' : ''}paper${firstAuthorPublishedPapers.length === 1 ? '' : 's'} · first author`;

  // 2. Projects metric
  const projectCount = projects.length;

  // 3. Affiliation lab from SITE.affiliation
  const labMatch = SITE.affiliation.match(/\(([^)]+)\)/);
  const labName = labMatch ? labMatch[1] : SITE.affiliation.split(',')[0];
  const affiliationLabel = `Researcher at ${labName}`;

  const socialLinks = [
    { name: 'GitHub', href: SITE.github, Icon: SiGithub },
    { name: 'LinkedIn', href: SITE.linkedin, Icon: TbBrandLinkedin },
    { name: 'ResearchGate', href: SITE.researchgate, Icon: SiResearchgate },
    { name: 'Email', href: `mailto:${SITE.email}`, Icon: Mail },
  ].filter((link) => Boolean(link.href));

  return (
    <section id="hero-section" className="w-full py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          className="max-w-3xl flex flex-col items-start text-left"
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <h1 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-fog leading-tight">
            {SITE.citationName}
            <span className="block sm:inline sm:ml-3 text-lg sm:text-2xl font-normal text-slate-grid font-sans">
              ({SITE.nickname})
            </span>
          </h1>
          <p className="mt-2 text-lg sm:text-xl text-signal-amber font-medium">{SITE.title}</p>
          <p className="mt-5 text-base sm:text-lg text-slate-grid leading-relaxed max-w-xl">
            {SITE.summary}
          </p>

          {/* Highlights strip computed from site.ts */}
          <div className="mt-6 flex flex-wrap items-center gap-2 sm:gap-2.5">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-grid/15 bg-slate-grid/[0.03] px-3 py-1 text-xs sm:text-sm text-slate-grid">
              <span className="font-semibold text-fog">{firstAuthorPublishedPapers.length}</span>
              <span>{paperLabel}</span>
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-grid/15 bg-slate-grid/[0.03] px-3 py-1 text-xs sm:text-sm text-slate-grid">
              <span className="font-semibold text-fog">{projectCount}</span>
              <span>projects</span>
            </div>
            <div className="inline-flex items-center rounded-full border border-slate-grid/15 bg-slate-grid/[0.03] px-3 py-1 text-xs sm:text-sm text-slate-grid">
              <span>{affiliationLabel}</span>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/#projects"
              className="bg-signal-amber text-basalt font-medium px-5 py-2.5 rounded-md hover:bg-signal-amber/90 transition-colors"
            >
              View projects
            </Link>
            <a
              href="/cv.pdf"
              download
              className="border border-slate-grid/20 text-fog font-medium px-5 py-2.5 rounded-md hover:border-signal-amber/60 hover:text-signal-amber transition-colors"
            >
              Download CV
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
            {socialLinks.map(({ name, href, Icon }) => (
              <a
                key={name}
                href={href}
                target={href.startsWith('mailto:') ? undefined : '_blank'}
                rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                aria-label={name}
                className="inline-flex items-center gap-2 text-sm text-slate-grid hover:text-signal-amber transition-colors"
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span>{name}</span>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
