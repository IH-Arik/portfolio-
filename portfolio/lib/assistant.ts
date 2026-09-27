import { SITE, projects, papers, skillGroups } from '../content/site';

interface QAEntry {
  keywords: string[];
  answer: string;
}

const FALLBACK_ANSWER =
  "I don't have that information. Try asking about a specific project, paper, or skill.";

const STOPWORDS = new Set([
  'a', 'an', 'the', 'is', 'are', 'was', 'were', 'be', 'been', 'am',
  'of', 'in', 'on', 'at', 'to', 'for', 'and', 'or', 'but', 'with',
  'what', 'how', 'when', 'where', 'why', 'who', 'which', 'do', 'does',
  'did', 'can', 'could', 'will', 'would', 'should', 'his', 'her', 'he',
  'she', 'it', 'this', 'that', 'you', 'your', 'i', 'me', 'my',
]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[.,/#!$%^&*;:{}=\-_`~()?]/g, ' ')
    .split(/\s+/)
    .filter((word) => word.length > 0 && !STOPWORDS.has(word));
}

function buildEntries(): QAEntry[] {
  const entries: QAEntry[] = [];

  entries.push({
    keywords: ['bio', 'about', 'who', 'background', 'summary', 'introduction'],
    answer: `${SITE.name} — ${SITE.title}. ${SITE.summary}`,
  });

  for (const project of projects) {
    entries.push({
      keywords: [
        ...tokenize(project.title),
        ...tokenize(project.role),
        ...project.tags.flatMap(tokenize),
        'project',
      ],
      answer: `${project.title} (${project.role}): ${project.after}`,
    });
  }

  for (const paper of papers) {
    entries.push({
      keywords: [...tokenize(paper.title), ...tokenize(paper.venue), 'research', 'paper', 'publication'],
      answer: `${paper.title} — ${paper.venue}, ${paper.date}. ${paper.keyFindings[0] ?? paper.abstract}`,
    });
  }

  for (const group of skillGroups) {
    entries.push({
      keywords: [...tokenize(group.title), ...group.items.flatMap((item) => tokenize(item.name)), 'skill', 'skills'],
      answer: `${group.title}: ${group.items.map((item) => item.name).join(', ')}.`,
    });
  }

  entries.push({
    keywords: ['contact', 'email', 'reach', 'hire', 'github', 'researchgate'],
    answer: `You can reach ${SITE.name} at ${SITE.email} or on GitHub at ${SITE.github}.`,
  });

  return entries;
}

const entries = buildEntries();

/**
 * Pure client-side search over site.ts — no network call, so the assistant
 * can never say something the page itself doesn't already say.
 */
export function queryAssistant(query: string): string {
  const cleanQuery = query.trim();
  if (!cleanQuery) return 'Please type a question.';

  const queryWords = tokenize(cleanQuery);
  if (queryWords.length === 0) return FALLBACK_ANSWER;

  let bestScore = 0;
  let bestAnswer = '';

  for (const entry of entries) {
    let score = 0;
    for (const keyword of entry.keywords) {
      if (queryWords.includes(keyword)) {
        score += 2;
      } else if (
        queryWords.some((word) => word.length >= 4 && keyword.length >= 4 && (word.includes(keyword) || keyword.includes(word)))
      ) {
        score += 1;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestAnswer = entry.answer;
    }
  }

  // Require at least one confident (exact-keyword) signal, not just a
  // single weak fuzzy overlap — otherwise unrelated questions can still
  // match by coincidence (e.g. "the" fuzzy-matching inside "thesis").
  return bestScore >= 2 ? bestAnswer : FALLBACK_ANSWER;
}
