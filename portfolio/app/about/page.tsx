import Link from 'next/link';
import type { Metadata } from 'next';
import { SITE } from '../../content/site';
import { FadeIn } from '../../components/ui/FadeIn';

export const metadata: Metadata = {
  title: 'About',
  description: SITE.summary,
};

const timeline = [
  {
    year: '2026 (Present)',
    title: 'Graduate Researcher & SaaS Engineer',
    institution: 'Visual Data Analysis Lab (VDAL) & Freelance Operations',
    description:
      'Developing transformer-based bi-temporal change detection models for satellite damage assessment. Engineering Next.js/FastAPI applications for client operations.',
  },
  {
    year: 'Dec 2025 – Apr 2026',
    title: 'Lead author — two IEEE conference papers',
    institution: 'IEEE i-COSTE 2025 and IEEE QPAIN 2026 (Green University of Bangladesh, with BUBT)',
    description:
      'Explainable stacking ensembles (Random Forest, CatBoost, LightGBM, XGBoost) with SHAP and LIME for thyroid disorder detection and diabetes risk prediction. Co-author on an explainable kidney stone detection paper using a dynamically weighted CNN ensemble with Grad-CAM++.',
  },
  {
    year: '2024 - 2025',
    title: 'Full-Stack SaaS Systems Lead',
    institution: 'Freelance & Small-Team Operations',
    description:
      'Built an AI business communication platform (GoCustify AI / Mabdel), a fantasy basketball app (Mon5majeur), and a study-abroad information platform (MyFutureAbroad).',
  },
  {
    year: '2023 - 2024',
    title: 'Applied Computer Vision Architect',
    institution: 'Academic Projects & Independent Studies',
    description:
      'Built YOLO-based PPE detection apps for construction-site safety and a ResNet18 brain tumor MRI classifier with a RAG knowledge base.',
  },
  {
    year: '2022 - Present',
    title: 'B.Sc. in Computer Science & Engineering (Final-Year)',
    institution: 'Green University of Bangladesh',
    description:
      'Focusing coursework on core neural networks, computer vision, database optimization, and software architecture.',
  },
];

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14 md:py-20">
      <FadeIn>
        <h1 className="font-display font-bold text-3xl text-fog">{SITE.name}</h1>
        <p className="text-slate-grid mt-2">
          Final-year CSE student, applied AI researcher, and full-stack systems engineer.
        </p>
      </FadeIn>

      <FadeIn delay={0.05}>
        <div className="mt-8 space-y-4 text-fog/90 leading-relaxed">
          <p>
            I operate at the intersection of applied deep learning research and modern full-stack engineering. My
            approach focuses on building robust, type-safe applications (Next.js/TypeScript) backed by modular,
            high-throughput asynchronous services (FastAPI/Python).
          </p>
          <p>
            As a researcher at the {SITE.affiliation}, my academic focus targets geospatial bitemporal imagery
            analysis. My thesis project investigates how bi-temporal change-detection models can compare pre- and
            post-disaster satellite captures to automate damage assessment, replacing slow and manual mapping
            procedures.
          </p>
          <p>
            I also collaborate with small teams and startups to build SaaS products — from an AI business
            communication platform to a study-abroad information portal — with the goal of writing clean,
            maintainable systems that ship real-world value.
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="mt-14">
          <h2 className="text-sm font-semibold text-slate-grid uppercase tracking-wide mb-6">Timeline</h2>
          <div className="relative border-l border-slate-grid/15 ml-2 pl-6 flex flex-col gap-8">
            {timeline.map((item, idx) => (
              <div key={idx} className="relative">
                <div className="absolute -left-[27px] top-1 w-2.5 h-2.5 rounded-full border border-slate-grid/25 bg-basalt" />
                <div className="text-sm text-signal-amber font-medium">{item.year}</div>
                <h3 className="text-base font-semibold text-fog mt-1">{item.title}</h3>
                <div className="text-sm text-slate-grid mt-0.5">{item.institution}</div>
                <p className="text-sm text-slate-grid/90 leading-relaxed mt-2">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>

      <div className="mt-14 pt-6 border-t border-slate-grid/12 flex justify-between items-center text-sm">
        <Link href="/" className="text-slate-grid hover:text-fog transition-colors">
          ← Back to home
        </Link>
        <Link href="/#contact" className="text-signal-amber hover:text-signal-amber/80 transition-colors">
          Get in touch →
        </Link>
      </div>
    </div>
  );
}
