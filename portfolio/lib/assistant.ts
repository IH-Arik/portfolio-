import { assistantQA } from '../content/assistant-qa';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// Local static fuzzy matching logic as fallback
function localQueryAssistant(query: string): string {
  const cleanQuery = query
    .toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, ' ')
    .trim();

  if (!cleanQuery) {
    return 'WARNING: EMPTY_QUERY_PACKET. Please input search arguments.';
  }

  const queryWords = cleanQuery.split(/\s+/);
  let bestMatchIndex = -1;
  let highestScore = 0;

  assistantQA.forEach((entry, idx) => {
    let score = 0;
    entry.keywords.forEach((keyword) => {
      if (queryWords.includes(keyword)) {
        score += 2;
      } else if (queryWords.some(word => word.includes(keyword) || keyword.includes(word))) {
        score += 1;
      }
    });

    if (score > highestScore) {
      highestScore = score;
      bestMatchIndex = idx;
    }
  });

  if (highestScore > 0 && bestMatchIndex !== -1) {
    return assistantQA[bestMatchIndex].answer;
  }

  return (
    'CORE_INDEX_NOTICE: QUERY PARAMETERS RETURNED ZERO DIRECT CORRELATIONS.\n\n' +
    'I could not retrieve matching context. Try asking one of the following:\n' +
    '  • "What is his strongest project?"\n' +
    '  • "Does he know FastAPI and backend Python?"\n' +
    '  • "What are his research publications at VDAL?"\n' +
    '  • "Does he have experience with PyTorch and deep learning?"\n' +
    '  • "Tell me about Arik\'s bio background."'
  );
}

/**
 * Queries the live RAG backend for an answer to the given question.
 * Falls back to local static indexing if backend is unconfigured or unreachable.
 */
export async function queryAssistant(query: string): Promise<string> {
  const cleanQuery = query.trim();

  if (!cleanQuery) {
    return 'WARNING: EMPTY_QUERY_PACKET. Please input search arguments.';
  }

  // Attempt live query if BACKEND_URL is set
  if (BACKEND_URL) {
    try {
      const response = await fetch(`${BACKEND_URL}/api/v1/assistant/query`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: cleanQuery }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.answer) {
          return data.answer;
        }
      }
    } catch (error) {
      console.warn("Backend RAG service unreachable. Falling back to local index.", error);
    }
  }

  // Fallback to local static fuzzy matching
  await new Promise((resolve) => setTimeout(resolve, 150));
  return localQueryAssistant(cleanQuery);
}
