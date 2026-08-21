export interface Project {
  slug: string;
  title: string;
  description: string;
  before: string; // Problem statement (before state)
  after: string;  // Solution / What shipped (after state)
  status: 'stable' | 'changed' | 'shipped';
  role: string;
  tags: string[];
  demoUrl?: string;
  repoUrl?: string;
  caseStudy: {
    overview: string;
    methodology: string;
    challenges: string[];
    results: string[];
    metrics: { label: string; value: string; status?: 'stable' | 'changed' }[];
  };
}

export interface ResearchPaper {
  slug: string;
  title: string;
  authors: string[];
  venue: string; // Journal / Conference name
  date: string;  // Format e.g., "Dec 2025" or "2024"
  doi?: string;
  paperUrl?: string;
  researchGateUrl?: string;
  abstract: string;
  keyFindings: string[];
}

export interface QAEntry {
  keywords: string[];
  answer: string;
  category: 'projects' | 'skills' | 'bio' | 'research';
}
