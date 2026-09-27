'use client';

import React, { useEffect, useRef, useState } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';
import { queryAssistant } from '../../lib/assistant';

interface ChatMessage {
  role: 'user' | 'assistant';
  text: string;
}

const INTRO_MESSAGE: ChatMessage = {
  role: 'assistant',
  text: 'Ask me about my projects, research, or skills — I only answer from what\'s on this site.',
};

const SUGGESTIONS = ['Strongest project?', 'Research publications?', 'Backend skills?'];

export function AskAboutMyWork() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([INTRO_MESSAGE]);
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const ask = (question: string) => {
    const trimmed = question.trim();
    if (!trimmed) return;
    const answer = queryAssistant(trimmed);
    setMessages((prev) => [...prev, { role: 'user', text: trimmed }, { role: 'assistant', text: answer }]);
    setInput('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    ask(input);
  };

  return (
    <>
      {isOpen && (
        <div
          role="dialog"
          aria-label="Ask about my work"
          className="fixed bottom-20 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-80 max-h-[70vh] rounded-lg border border-slate-grid/15 bg-basalt shadow-2xl flex flex-col overflow-hidden"
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-grid/12">
            <span className="text-sm font-semibold text-fog">Ask about my work</span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close"
              className="text-slate-grid hover:text-fog transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-grow overflow-y-auto p-4 flex flex-col gap-3 text-sm">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`max-w-[85%] rounded-lg px-3 py-2 leading-relaxed ${
                  msg.role === 'user'
                    ? 'self-end bg-signal-amber/15 text-fog'
                    : 'self-start bg-slate-grid/[0.06] text-slate-grid'
                }`}
              >
                {msg.text}
              </div>
            ))}
            <div ref={endRef} />
          </div>

          <div className="px-4 pb-2 flex flex-wrap gap-1.5">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => ask(s)}
                className="text-xs border border-slate-grid/15 text-slate-grid hover:border-signal-amber hover:text-signal-amber rounded-full px-2.5 py-1 transition-colors"
              >
                {s}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-slate-grid/12 p-3">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question…"
              className="flex-grow bg-slate-grid/[0.04] border border-slate-grid/20 rounded-md px-3 py-2 text-sm text-fog placeholder:text-slate-grid/70 outline-none focus:ring-2 focus:ring-signal-amber/50"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              aria-label="Send"
              className="bg-signal-amber text-basalt rounded-md p-2 hover:bg-signal-amber/90 transition-colors disabled:opacity-40"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Ask about my work"
        aria-expanded={isOpen}
        className="group fixed bottom-4 right-4 sm:right-6 z-50 flex items-center h-12 rounded-full bg-signal-amber text-basalt font-medium text-sm shadow-xl hover:bg-signal-amber/90 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-amber focus-visible:ring-offset-2 focus-visible:ring-offset-basalt"
      >
        <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
          <MessageCircle className="w-5 h-5" />
        </div>
        <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 group-hover:max-w-xs group-hover:opacity-100 group-hover:pr-4 group-focus-visible:max-w-xs group-focus-visible:opacity-100 group-focus-visible:pr-4 transition-all duration-200 ease-out">
          Ask about my work
        </span>
      </button>
    </>
  );
}
