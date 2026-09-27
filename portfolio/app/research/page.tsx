import type { Metadata } from 'next';
import ResearchList from '../../components/sections/ResearchList';
import { SITE } from '../../content/site';
import { FadeIn } from '../../components/ui/FadeIn';

export const metadata: Metadata = {
  title: 'Research',
  description: `Published and in-progress research by ${SITE.name} at the ${SITE.affiliation}.`,
};

export default function ResearchPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-14 md:pt-20">
      <FadeIn>
        <h1 className="font-display font-bold text-3xl text-fog">Research</h1>
        <p className="text-slate-grid mt-2 max-w-xl">
          Applied deep learning research in remote sensing change detection and clinical diagnostic systems, based at
          the {SITE.affiliation}.
        </p>
      </FadeIn>

      <div className="-mx-4 sm:-mx-6">
        <ResearchList compact={false} showHeader={false} />
      </div>
    </div>
  );
}
