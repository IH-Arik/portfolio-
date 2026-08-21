'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Sparkles } from 'lucide-react';
import { projects } from '../../content/projects';

interface ConsoleLine {
  text: string;
  type: 'system' | 'input' | 'output' | 'error' | 'success';
}

export default function ConsoleWidget() {
  const [history, setHistory] = useState<ConsoleLine[]>([
    { text: 'VDAL_NODE_105 BOOT SEQUENCE COMPLETED.', type: 'system' },
    { text: 'ESTABLISHED ACTIVE LATENCY SECURE SOCKET LINK.', type: 'system' },
    { text: 'INITIALIZED BI-TEMPORAL CHANGE DETECTOR.', type: 'system' },
    { text: 'TYPE "help" TO QUERY SYSTEM DIRECTORIES.', type: 'success' },
  ]);
  const [inputVal, setInputVal] = useState('');
  const outputEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim();
    if (!cmd) return;

    const newHistory = [...history, { text: `$ ${cmd}`, type: 'input' as const }];
    const lowerCmd = cmd.toLowerCase();
    const parts = lowerCmd.split(' ');
    const baseCmd = parts[0];

    // Command Router
    switch (baseCmd) {
      case 'help':
        newHistory.push({
          text: 'AVAILABLE CONSOLE COMMANDS:\n' +
               '  help               - Display this help index.\n' +
               '  list               - List all active project slugs.\n' +
               '  scan [slug]        - Trigger a bitemporal scan on a project.\n' +
               '  metrics            - Output model evaluation tables.\n' +
               '  coords             - Display local lab node coordinates.\n' +
               '  clear              - Flush the console output buffer.',
          type: 'output',
        });
        break;

      case 'list':
        const slugs = projects.map(p => `  • ${p.slug}`).join('\n');
        newHistory.push({
          text: `ACTIVE ARCHIVE PATHS:\n${slugs}\n\nType "scan [slug]" to run neural diagnostics.`,
          type: 'output',
        });
        break;

      case 'scan':
        const targetSlug = parts[1];
        if (!targetSlug) {
          newHistory.push({ text: 'ERROR: SCAN REQUIRES A TARGET SLUG. TYPE "list" FOR OPTIONS.', type: 'error' });
        } else {
          const matched = projects.find(p => p.slug === targetSlug);
          if (matched) {
            const metricsText = matched.caseStudy.metrics.map(m => `    - ${m.label}: ${m.value}`).join('\n');
            newHistory.push({
              text: `RUNNING BI-TEMPORAL NEURAL SCAN FOR: ${matched.title.toUpperCase()}...\n` +
                   `[STATUS: ${matched.status.toUpperCase()}]\n` +
                   `[ROLE: ${matched.role.toUpperCase()}]\n` +
                   `EVALUATION DATA METRICS:\n${metricsText}\n` +
                   `SCAN_COMPLETE: 0x82A1 SUCCESS`,
              type: 'success',
            });
          } else {
            newHistory.push({ text: `ERROR: SLUG "${targetSlug}" NOT REGISTERED. TYPE "list" FOR VALID NODES.`, type: 'error' });
          }
        }
        break;

      case 'metrics':
        newHistory.push({
          text: '┌──────────────────────────────────────────────────────────┐\n' +
               '│             MODEL EVALUATION INDEX (VDAL LAB)            │\n' +
               '├──────────────────────────────────────────┬───────────────┤\n' +
               '│ Siamese Net (xBD Localization)           │ 91.4% F1      │\n' +
               '│ DenseNet-121 (MRI Tumor Classifier)      │ 96.5% Acc     │\n' +
               '│ YOLOv8 custom (PPE Detection)            │ 88.7% mAP     │\n' +
               '│ Kidney Stone dual-wavelet Seg            │ 97.8% IoU     │\n' +
               '└──────────────────────────────────────────┴───────────────┘',
          type: 'success',
        });
        break;

      case 'coords':
        newHistory.push({
          text: 'ACTIVE TRACKING POINT:\n' +
               '  NODE_LOC: Dhaka, Bangladesh\n' +
               '  LATITUDE: 23.8103 N\n' +
               '  LONGITUDE: 90.4125 E\n' +
               '  SYSTEM: Green University of Bangladesh (CSE_VDAL)',
          type: 'output',
        });
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      default:
        newHistory.push({
          text: `COMMAND NOT RECOGNIZED: "${baseCmd}". TYPE "help" FOR OPERATIONAL ARGUMENTS.`,
          type: 'error',
        });
        break;
    }

    setHistory(newHistory);
    setInputVal('');
  };

  useEffect(() => {
    outputEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  return (
    <section className="w-full py-16 border-b border-slate-grid/10">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Section Header */}
        <div className="mb-8">
          <span className="font-mono text-[9px] text-slate-grid block mb-1">
            // TERMINAL_INTERFACE
          </span>
          <h2 className="font-display font-bold text-2xl md:text-3xl text-fog uppercase tracking-tight flex items-center gap-2">
            Interactive Diagnostics Shell
          </h2>
          <p className="text-slate-grid text-xs mt-1 max-w-xl font-mono">
            Execute direct script protocols inside my system core to fetch live metrics and project arrays.
          </p>
        </div>

        {/* Terminal Shell Window */}
        <div 
          className="border border-slate-grid/25 rounded-md bg-basalt overflow-hidden shadow-2xl flex flex-col h-[400px] font-mono text-xs cursor-text"
          onClick={() => inputRef.current?.focus()}
        >
          {/* Shell Top Window Bar */}
          <div className="bg-slate-grid/10 px-4 py-2 border-b border-slate-grid/20 flex justify-between items-center select-none">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-hazard-coral/70 block" />
              <span className="w-2.5 h-2.5 rounded-full bg-signal-amber/70 block" />
              <span className="w-2.5 h-2.5 rounded-full bg-moss/70 block" />
            </div>
            <div className="text-[10px] text-slate-grid font-bold flex items-center gap-1.5">
              <TerminalIcon className="w-3.5 h-3.5 text-signal-amber" />
              <span>IH_ARIK // SYSTEM_SHELL_v1.0.5</span>
            </div>
            <div className="w-10" /> {/* Spacer */}
          </div>

          {/* Shell Body Scrollable History */}
          <div className="flex-grow p-4 overflow-y-auto flex flex-col gap-2 select-text">
            {history.map((line, idx) => (
              <div 
                key={idx} 
                className={`whitespace-pre-wrap leading-relaxed
                  ${line.type === 'system' ? 'text-slate-grid/80' : ''}
                  ${line.type === 'input' ? 'text-signal-amber font-bold' : ''}
                  ${line.type === 'output' ? 'text-fog' : ''}
                  ${line.type === 'error' ? 'text-hazard-coral font-semibold' : ''}
                  ${line.type === 'success' ? 'text-moss font-semibold' : ''}
                `}
              >
                {line.text}
              </div>
            ))}
            <div ref={outputEndRef} />
          </div>

          {/* Shell Form Input bar */}
          <form 
            onSubmit={handleCommandSubmit}
            className="border-t border-slate-grid/15 bg-slate-grid/5 px-4 py-3 flex items-center gap-2"
          >
            <span className="text-signal-amber font-bold select-none">$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Type 'help' and press Enter..."
              className="flex-grow bg-transparent text-fog border-none outline-none focus:ring-0 placeholder:text-slate-grid/40"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
            />
            <div className="text-[9px] text-slate-grid/50 flex items-center gap-1 select-none">
              <Sparkles className="w-3 h-3 text-signal-amber" />
              <span>SHELL_ONLINE</span>
            </div>
          </form>
        </div>

      </div>
    </section>
  );
}
