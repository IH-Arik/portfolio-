'use client';

import { useEffect, useRef } from 'react';
import { SiGithub, SiX, SiInstagram } from 'react-icons/si';
import { TbBrandLinkedin } from 'react-icons/tb';
import type { IconType } from 'react-icons';

interface SocialLink {
  name: string;
  href: string;
  Icon: IconType;
}

const LINKS: SocialLink[] = [
  { name: 'GitHub', href: 'https://github.com/IH-Arik', Icon: SiGithub },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/md-ittesaf-hossain-b4671b247/', Icon: TbBrandLinkedin },
  { name: 'X', href: 'https://x.com/IHArik1', Icon: SiX },
  { name: 'Instagram', href: 'https://www.instagram.com/arik.arjan/', Icon: SiInstagram },
];

const ICON_PULL_RADIUS = 70; // px within which an icon gets magnetically pulled
const ICON_MAX_PULL = 10; // max px an icon can shift toward the cursor
const GLOW_RADIUS = 160; // px within which the pill glow ramps up
const LERP = 0.2;

/**
 * Fixed vertical social icon rail, bottom-left. Cursor proximity (not a
 * binary :hover) drives everything: the pill glow ramps in with distance,
 * and each icon is magnetically pulled a few px toward the pointer.
 */
export function SocialRail() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    const container = containerRef.current;
    const pill = pillRef.current;
    if (!container || !pill) return;

    let pointerX = -9999;
    let pointerY = -9999;
    let glow = 0; // current eased glow intensity 0..1
    const pull = LINKS.map(() => ({ x: 0, y: 0 })); // current eased pull per icon
    let rafId = 0;

    const handlePointerMove = (e: PointerEvent) => {
      pointerX = e.clientX;
      pointerY = e.clientY;
    };
    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    const tick = () => {
      let nearestProximity = 0;

      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = pointerX - cx;
        const dy = pointerY - cy;
        const dist = Math.hypot(dx, dy);

        const pullProximity = Math.max(0, 1 - dist / ICON_PULL_RADIUS);
        const targetX = pullProximity > 0 ? (dx / dist) * pullProximity * ICON_MAX_PULL : 0;
        const targetY = pullProximity > 0 ? (dy / dist) * pullProximity * ICON_MAX_PULL : 0;
        pull[i].x += (targetX - pull[i].x) * LERP;
        pull[i].y += (targetY - pull[i].y) * LERP;
        el.style.transform = `translate(${pull[i].x.toFixed(2)}px, ${pull[i].y.toFixed(2)}px)`;

        const glowProximity = Math.max(0, 1 - dist / GLOW_RADIUS);
        if (glowProximity > nearestProximity) nearestProximity = glowProximity;
      });

      glow += (nearestProximity - glow) * LERP;
      pill.style.opacity = glow.toFixed(3);
      pill.style.transform = `scaleY(${Math.max(0.2, glow).toFixed(3)})`;

      itemRefs.current.forEach((el) => {
        if (!el) return;
        el.style.color = glow > 0.5 ? 'var(--basalt)' : '';
      });

      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="hidden lg:flex fixed left-6 bottom-6 z-40 flex-col items-center gap-5 px-2.5 py-4"
      aria-label="Social links"
    >
      {/* Always-on glass backdrop: keeps the rail legible over page content
          it happens to sit above at any scroll position or viewport height. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-full bg-basalt/70 backdrop-blur-md border border-fog/5"
      />
      <div
        ref={pillRef}
        aria-hidden="true"
        className="absolute inset-0 rounded-full origin-center bg-signal-amber shadow-[0_0_28px_rgba(217,138,61,0.55)]"
        style={{ opacity: 0, transform: 'scaleY(0.2)' }}
      />
      {LINKS.map(({ name, href, Icon }, i) => (
        <a
          key={name}
          ref={(el) => {
            itemRefs.current[i] = el;
          }}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={name}
          className="relative z-10 text-slate-grid transition-colors duration-200"
        >
          <Icon className="w-4 h-4" />
        </a>
      ))}
    </div>
  );
}
