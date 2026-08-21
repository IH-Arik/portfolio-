'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Terminal, Sparkles, Cpu } from 'lucide-react';
import { queryAssistant } from '../../lib/assistant';

interface ChatMessage {
  sender: 'user' | 'agent';
  text: string;
  timestamp: string;
}

export default function AssistantPanel() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'agent',
      text: 'SYSTEM CORE: VDAL_PORTFOLIO_AGENT v1.0.9 ONLINE.\n\nI am Md. Hossain (Arik)\'s indexing agent. Ask me about his project architectures, FastAPI SaaS engineering, or VDAL academic research.',
      // Filled client-side after mount — a timestamp computed during SSR
      // render would differ from the client's re-render and fail hydration.
      timestamp: '',
    },
  ]);
  const [input, setInput] = useState('');
  const [isPending, setIsPending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const promptChips = [
    'strongest project?',
    'FastAPI experience?',
    'VDAL publications?',
    'about Arik',
  ];

  function getTimestamp() {
    const now = new Date();
    return now.toTimeString().split(' ')[0];
  }

  const handleQuery = async (rawQuery: string) => {
    const trimmed = rawQuery.trim();
    if (!trimmed || isPending) return;

    // Append user query
    const userMsg: ChatMessage = {
      sender: 'user',
      text: trimmed,
      timestamp: getTimestamp(),
    };
    
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsPending(true);

    try {
      // Execute the query resolution function
      const response = await queryAssistant(trimmed);
      const agentMsg: ChatMessage = {
        sender: 'agent',
        text: response,
        timestamp: getTimestamp(),
      };
      setMessages((prev) => [...prev, agentMsg]);
    } catch (err) {
      const errorMsg: ChatMessage = {
        sender: 'agent',
        text: 'SOCKET_TRANSMISSION_ERROR: Failed to resolve index vector.',
        timestamp: getTimestamp(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsPending(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleQuery(input);
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isPending]);

  useEffect(() => {
    setMessages((prev) =>
      prev[0]?.timestamp === '' ? [{ ...prev[0], timestamp: getTimestamp() }, ...prev.slice(1)] : prev
    );
  }, []);

  return (
    <div className="w-full flex flex-col border border-slate-grid/25 rounded bg-basalt shadow-2xl h-[420px] font-mono text-xs overflow-hidden">
      
      {/* Header bar */}
      <div className="bg-slate-grid/10 px-4 py-2 border-b border-slate-grid/20 flex justify-between items-center select-none">
        <div className="flex gap-1.5">
          <span className="w-2 h-2 rounded-full bg-hazard-coral/80 block" />
          <span className="w-2 h-2 rounded-full bg-signal-amber/80 block" />
          <span className="w-2 h-2 rounded-full bg-moss/80 block" />
        </div>
        <div className="text-[10px] text-slate-grid font-bold flex items-center gap-1.5">
          <Cpu className="w-3.5 h-3.5 text-signal-amber animate-pulse" />
          <span>PORTFOLIO_RAG_AGENT // ONLINE</span>
        </div>
        <div className="w-6" /> {/* Balance spacer */}
      </div>

      {/* Message Stream */}
      <div 
        className="flex-grow p-4 overflow-y-auto flex flex-col gap-3 select-text cursor-text"
        onClick={() => inputRef.current?.focus()}
      >
        {messages.map((msg, idx) => (
          <div 
            key={idx}
            className={`flex flex-col gap-1 ${
              msg.sender === 'user' ? 'items-end' : 'items-start'
            }`}
          >
            {/* Timestamp & Tag info */}
            <div className="text-[8px] text-slate-grid/50 flex gap-2">
              <span>{msg.timestamp}</span>
              <span>{msg.sender === 'user' ? '// CLIENT_QUERY' : '// AGENT_RESPONSE'}</span>
            </div>

            {/* Message Bubble Block */}
            <div 
              className={`p-2.5 rounded max-w-[85%] whitespace-pre-wrap leading-relaxed border
                ${msg.sender === 'user'
                  ? 'bg-signal-amber/5 border-signal-amber/20 text-signal-amber'
                  : 'bg-slate-grid/5 border-slate-grid/15 text-fog'
                }
              `}
            >
              {msg.sender === 'user' ? `$ ${msg.text}` : msg.text}
            </div>
          </div>
        ))}

        {/* Thinking status */}
        {isPending && (
          <div className="flex flex-col gap-1 items-start">
            <div className="text-[8px] text-slate-grid/50">
              <span>{getTimestamp()}</span>
              <span>// AGENT_THINKING</span>
            </div>
            <div className="bg-slate-grid/5 border border-dashed border-slate-grid/20 p-2 rounded text-slate-grid animate-pulse">
              PROBING_KNOWLEDGE_BASE_EMBEDDINGS...
            </div>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      {/* Suggested Prompt Chips */}
      <div className="px-4 py-2 border-t border-slate-grid/15 bg-slate-grid/5 flex flex-wrap gap-1.5 items-center">
        <span className="text-[8px] text-slate-grid mr-1 font-bold select-none">PROMPTS:</span>
        {promptChips.map((chip) => (
          <button
            key={chip}
            type="button"
            disabled={isPending}
            onClick={() => handleQuery(chip)}
            className="text-[9px] border border-slate-grid/20 hover:border-signal-amber hover:text-signal-amber rounded px-2 py-0.5 text-slate-grid cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Terminal Input Line */}
      <form 
        onSubmit={handleSubmit}
        className="border-t border-slate-grid/20 bg-basalt px-4 py-3 flex items-center gap-2"
      >
        <span className="text-signal-amber font-bold select-none">$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isPending}
          placeholder="Ask a question about projects or skills..."
          className="flex-grow bg-transparent text-fog border-none outline-none focus:ring-0 placeholder:text-slate-grid/40 disabled:opacity-50"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
        />
        <button
          type="submit"
          disabled={!input.trim() || isPending}
          className="bg-signal-amber text-basalt font-bold rounded p-1.5 hover:bg-signal-amber/90 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>

    </div>
  );
}
