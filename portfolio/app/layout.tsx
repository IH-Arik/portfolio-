import type { Metadata } from "next";
import { Inter, Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import Link from "next/link";
import { SITE } from "@/content/site";
import { AskAboutMyWork } from "@/components/assistant/AskAboutMyWork";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://arikhossain.dev"; // TODO(verify): confirm the production domain for canonical/OG URLs

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${SITE.name} — ${SITE.title}`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.summary,
  keywords: [
    "AI/ML Engineer",
    "Machine Learning Researcher",
    "Deep Learning",
    "Computer Vision",
    "FastAPI",
    "Next.js",
    "PyTorch",
  ],
  authors: [{ name: SITE.name }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: `${SITE.name} — ${SITE.title}`,
    description: SITE.summary,
    siteName: SITE.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.title}`,
    description: SITE.summary,
  },
};

const navLinks = [
  { href: "/#projects", label: "Projects" },
  { href: "/research", label: "Research" },
  { href: "/about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${ibmPlexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-basalt text-fog font-sans selection:bg-signal-amber/30 selection:text-signal-amber">
        {/* Navigation header */}
        <header className="sticky top-0 z-40 w-full border-b border-slate-grid/12 bg-basalt/90 backdrop-blur-md">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
            <Link href="/" className="font-display font-bold text-base text-fog hover:text-signal-amber transition-colors">
              {SITE.name}
            </Link>

            <nav className="hidden sm:flex items-center gap-6 text-sm text-slate-grid" aria-label="Primary">
              {navLinks.map((link) => (
                <Link key={link.label} href={link.href} className="hover:text-fog transition-colors">
                  {link.label}
                </Link>
              ))}
            </nav>

            <a
              href="/cv.pdf"
              download
              className="text-sm font-medium bg-signal-amber text-basalt px-4 py-2 rounded-md hover:bg-signal-amber/90 transition-colors"
            >
              Download CV
            </a>
          </div>

          {/* Mobile nav */}
          <nav
            className="sm:hidden flex items-center gap-5 px-4 pb-3 text-sm text-slate-grid overflow-x-auto"
            aria-label="Primary"
          >
            {navLinks.map((link) => (
              <Link key={link.label} href={link.href} className="hover:text-fog transition-colors whitespace-nowrap">
                {link.label}
              </Link>
            ))}
          </nav>
        </header>

        <main className="flex-grow">{children}</main>

        <AskAboutMyWork />

        <footer className="w-full border-t border-slate-grid/12 py-8 text-slate-grid text-sm">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <span>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</span>
            <a href={`mailto:${SITE.email}`} className="hover:text-fog transition-colors">
              {SITE.email}
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
