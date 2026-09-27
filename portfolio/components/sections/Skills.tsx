import { skillGroups } from '../../content/site';
import { FadeIn } from '../ui/FadeIn';

export default function Skills() {
  return (
    <section id="skills" className="w-full py-16 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <FadeIn>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-fog">Skills</h2>
        </FadeIn>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 mt-8">
          {skillGroups.map((group, idx) => (
            <FadeIn key={group.title} delay={idx * 0.05} className="break-inside-avoid mb-5">
              <div className="rounded-lg border border-slate-grid/12 bg-slate-grid/[0.02] p-5">
                <h3 className="text-sm font-semibold text-slate-grid uppercase tracking-wide">{group.title}</h3>
                <div className="flex flex-wrap gap-2 mt-4">
                  {group.items.map(({ name, Icon }) => (
                    <span
                      key={name}
                      className="flex items-center gap-1.5 text-sm text-fog/90 border border-slate-grid/15 rounded-full px-3 py-1"
                    >
                      {Icon && <Icon className="w-3.5 h-3.5 text-slate-grid" />}
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
