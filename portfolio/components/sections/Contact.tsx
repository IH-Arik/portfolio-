'use client';

import React, { useState } from 'react';
import { Mail, BookOpen, Send, CheckCircle2, AlertTriangle } from 'lucide-react';

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [apiResponse, setApiResponse] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setStatus('success');
        setApiResponse(data.message || 'TRANSMISSION_SUCCESS');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
        setApiResponse(data.error || 'STUB_ROUTING_FAILURE');
      }
    } catch (err) {
      setStatus('error');
      setApiResponse('NETWORK_IO_DISCONNECT');
    }
  };

  return (
    <section id="contact" className="w-full py-16 scroll-mt-10">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Section Header */}
        <div className="mb-12">
          <span className="font-mono text-[9px] text-slate-grid block mb-1">
            // ARCHIVE_04
          </span>
          <h2 className="font-display font-bold text-2xl md:text-3xl text-fog uppercase tracking-tight">
            Establish Connection
          </h2>
          <p className="text-slate-grid text-xs mt-1 max-w-xl font-mono">
            Wire a secure socket message directly to my console or trace social indexes below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Social nodes / coordinates */}
          <div className="lg:col-span-5 font-mono text-xs flex flex-col gap-6">
            <div className="border border-slate-grid/25 rounded bg-slate-grid/5 p-5">
              <span className="text-[9px] text-slate-grid/65 block font-bold mb-3">// NETWORK_DIRECTORIES</span>
              
              <div className="flex flex-col gap-4">
                {/* Email Direct */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded border border-slate-grid/25 flex items-center justify-center bg-basalt">
                    <Mail className="w-3.5 h-3.5 text-signal-amber" />
                  </div>
                  <div>
                    <span className="text-[8px] text-slate-grid block">EMAIL_CHANNEL</span>
                    <a href="mailto:ittesham02@gmail.com" className="text-fog hover:text-signal-amber transition-colors">
                      ittesham02@gmail.com
                    </a>
                  </div>
                </div>

                {/* GitHub Node */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded border border-slate-grid/25 flex items-center justify-center bg-basalt">
                    <GithubIcon className="w-3.5 h-3.5 text-signal-amber" />
                  </div>
                  <div>
                    <span className="text-[8px] text-slate-grid block">GIT_REPOSITORY</span>
                    <a 
                      href="https://github.com/IH-Arik" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-fog hover:text-signal-amber transition-colors"
                    >
                      github.com/IH-Arik
                    </a>
                  </div>
                </div>

                {/* ResearchGate Node */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded border border-slate-grid/25 flex items-center justify-center bg-basalt">
                    <BookOpen className="w-3.5 h-3.5 text-signal-amber" />
                  </div>
                  <div>
                    <span className="text-[8px] text-slate-grid block">RESEARCH_GATE_INDEX</span>
                    <a 
                      href="https://researchgate.net/profile/Md-Hossain-1936" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-fog hover:text-signal-amber transition-colors"
                    >
                      researchgate.net/profile/Md-Hossain-1936
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Sub-Panel: Endpoint Stubs Info */}
            <div className="border border-slate-grid/20 border-dashed rounded p-5 text-slate-grid text-[10px] leading-relaxed">
              <span className="text-[8px] font-bold text-slate-grid/65 block mb-1.5">// ROUTING_METRICS</span>
              Connection payloads are transmitted via AJAX to the Next.js API router stub at <code className="text-signal-amber">/app/api/contact/route.ts</code>. The endpoint currently operates in sandbox mock execution.
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="border border-slate-grid/25 rounded bg-slate-grid/5 p-6 font-mono text-xs flex flex-col gap-4">
              <span className="text-[9px] text-slate-grid/65 block font-bold mb-1">// SEND_PACKET_PAYLOAD</span>
              
              {/* Name & Email Group */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-slate-grid text-[10px] font-bold">NAME_IDENTIFIER</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    disabled={status === 'sending'}
                    placeholder="e.g. John Doe"
                    className="w-full bg-basalt border border-slate-grid/30 rounded px-3 py-2 text-fog focus:border-signal-amber outline-none transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-slate-grid text-[10px] font-bold">EMAIL_HOST</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    disabled={status === 'sending'}
                    placeholder="e.g. user@domain.com"
                    className="w-full bg-basalt border border-slate-grid/30 rounded px-3 py-2 text-fog focus:border-signal-amber outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="subject" className="text-slate-grid text-[10px] font-bold">PACKET_SUBJECT</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  disabled={status === 'sending'}
                  placeholder="e.g. Project Consultation / Thesis Review"
                  className="w-full bg-basalt border border-slate-grid/30 rounded px-3 py-2 text-fog focus:border-signal-amber outline-none transition-colors"
                />
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-slate-grid text-[10px] font-bold">MESSAGE_BODY</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  disabled={status === 'sending'}
                  placeholder="Write message details here..."
                  className="w-full bg-basalt border border-slate-grid/30 rounded px-3 py-2 text-fog focus:border-signal-amber outline-none transition-colors resize-none"
                />
              </div>

              {/* Submit Button & Status readouts */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2 border-t border-slate-grid/15 pt-4">
                
                {/* Submit button */}
                <button
                  type="submit"
                  disabled={status === 'sending' || status === 'success'}
                  className="w-fit bg-signal-amber hover:bg-signal-amber/95 text-basalt font-bold px-5 py-2.5 rounded transition-all duration-200 flex items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{status === 'sending' ? 'TRANSMITTING...' : 'TRANSMIT_PACKET'}</span>
                </button>

                {/* Status messages */}
                <div className="flex-grow flex items-center justify-start sm:justify-end">
                  {status === 'sending' && (
                    <span className="text-slate-grid animate-pulse font-bold">[TX_BUFFERING // CONNECTING]</span>
                  )}
                  {status === 'success' && (
                    <div className="flex items-center gap-1.5 text-moss text-[10px] font-bold border border-moss/30 bg-moss/5 px-2.5 py-1 rounded animate-fade-in">
                      <CheckCircle2 className="w-3.5 h-3.5 text-moss" />
                      <span>{apiResponse} // SANDBOX_STUB</span>
                    </div>
                  )}
                  {status === 'error' && (
                    <div className="flex items-center gap-1.5 text-hazard-coral text-[10px] font-bold border border-hazard-coral/30 bg-hazard-coral/5 px-2.5 py-1 rounded">
                      <AlertTriangle className="w-3.5 h-3.5 text-hazard-coral" />
                      <span>ERR: {apiResponse}</span>
                    </div>
                  )}
                </div>

              </div>

            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
