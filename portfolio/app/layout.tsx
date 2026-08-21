import type { Metadata } from "next";
import { Inter, Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import Link from "next/link";
import { CursorTrail } from "@/components/effects/CursorTrail";
import { SocialRail } from "@/components/layout/SocialRail";
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

export const metadata: Metadata = {
  title: "Md. Hossain (Arik) | AI/ML Developer & Researcher",
  description: "Portfolio of Md. Hossain (Arik), specializing in Applied Deep Learning, Computer Vision, and Full-Stack SaaS Engineering. Member of the Visual Data Analysis Lab (VDAL).",
  keywords: ["AI Research", "Deep Learning", "Satellite Imagery Analysis", "Geospatial Deep Learning", "Brain Tumor RAG", "FastAPI", "React Native"],
};

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
        <CursorTrail />
        <SocialRail />
        {/* Navigation Header */}
        <header className="sticky top-0 z-50 w-full border-b border-slate-grid/30 bg-basalt/80 backdrop-blur-md">
          <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
            {/* Logo and Status */}
            <Link href="/" className="flex items-center space-x-3 group">
              <span className="font-mono text-sm font-bold tracking-tight text-fog group-hover:text-signal-amber transition-colors">
                IH_ARIK // APPLIED_AI
              </span>
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-moss opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-moss"></span>
              </span>
            </Link>

            {/* Navigation Links */}
            <nav className="flex items-center space-x-6 sm:space-x-8 font-mono text-xs">
              <Link
                href="/#projects"
                className="text-slate-grid hover:text-signal-amber transition-colors"
              >
                [01_PROJECTS]
              </Link>
              <Link
                href="/research"
                className="text-slate-grid hover:text-signal-amber transition-colors"
              >
                [02_RESEARCH]
              </Link>
              <Link
                href="/about"
                className="text-slate-grid hover:text-signal-amber transition-colors"
              >
                [03_ABOUT]
              </Link>
              <Link
                href="/#contact"
                className="text-slate-grid hover:text-signal-amber transition-colors"
              >
                [04_CONTACT]
              </Link>
            </nav>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-grow">{children}</main>

        {/* Technical Footer */}
        <footer className="w-full border-t border-slate-grid/20 bg-basalt py-8 text-slate-grid font-mono text-[10px]">
          <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
              <span>LOC: 23.8103° N, 90.4125° E</span>
              <span className="text-slate-grid/40">|</span>
              <span>NET: VDAL_LAB_NODE</span>
              <span className="text-slate-grid/40">|</span>
              <span className="flex items-center gap-1.5">
                STATUS: <span className="text-moss">SYSTEM_ONLINE_STABLE</span>
              </span>
            </div>
            <div className="text-center md:text-right">
              <span>© {new Date().getFullYear()} Md. Hossain (Arik). ALL RIGHTS RESERVED.</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
