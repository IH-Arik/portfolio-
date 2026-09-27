'use client';

import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, AlertTriangle } from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import { SITE } from '../../content/site';
import { FadeIn } from '../ui/FadeIn';

type Status = 'idle' | 'sending' | 'success' | 'error' | 'unconfigured';

const MESSAGE_MIN_LENGTH = 10;
const MESSAGE_MAX_LENGTH = 5000;

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '', company: '' });
  const [status, setStatus] = useState<Status>('idle');
  const [errorText, setErrorText] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = (): string | null => {
    if (!formData.name.trim()) return 'Please enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return 'Please enter a valid email address.';
    if (formData.message.trim().length < MESSAGE_MIN_LENGTH) return `Message must be at least ${MESSAGE_MIN_LENGTH} characters.`;
    if (formData.message.length > MESSAGE_MAX_LENGTH) return `Message must be under ${MESSAGE_MAX_LENGTH} characters.`;
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validate();
    if (validationError) {
      setStatus('error');
      setErrorText(validationError);
      return;
    }

    setStatus('sending');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.status === 503 || data.unconfigured) {
        setStatus('unconfigured');
        return;
      }

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '', company: '' });
      } else {
        setStatus('error');
        setErrorText(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setErrorText('Network error. Please try again.');
    }
  };

  return (
    <section id="contact" className="w-full py-16 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <FadeIn>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-fog">Contact</h2>
          <p className="text-slate-grid mt-2 max-w-xl">
            Have a role, project, or question in mind? Send a message below, or reach out directly.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-10">
          <FadeIn className="lg:col-span-4 flex flex-col gap-4">
            <a
              href={`mailto:${SITE.email}`}
              className="flex items-center gap-3 text-fog hover:text-signal-amber transition-colors"
            >
              <Mail className="w-4 h-4" />
              {SITE.email}
            </a>
            <a
              href={SITE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-fog hover:text-signal-amber transition-colors"
            >
              <SiGithub className="w-4 h-4" />
              GitHub
            </a>
          </FadeIn>

          <FadeIn className="lg:col-span-8" delay={0.05}>
            {status === 'unconfigured' ? (
              <div className="rounded-lg border border-slate-grid/12 bg-slate-grid/[0.02] p-6 text-sm text-slate-grid">
                The contact form isn&apos;t available right now. Email me directly at{' '}
                <a href={`mailto:${SITE.email}`} className="text-signal-amber hover:text-signal-amber/80">
                  {SITE.email}
                </a>
                .
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* Honeypot: visually hidden without affecting layout width, bots that autofill every field get caught */}
                <div
                  style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0,0,0,0)' }}
                  aria-hidden="true"
                >
                  <label htmlFor="company">Company</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="name" className="text-sm font-medium text-slate-grid">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      disabled={status === 'sending'}
                      className="w-full bg-slate-grid/[0.03] border border-slate-grid/20 rounded-md px-3 py-2.5 text-fog outline-none focus:border-signal-amber transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="text-sm font-medium text-slate-grid">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      disabled={status === 'sending'}
                      className="w-full bg-slate-grid/[0.03] border border-slate-grid/20 rounded-md px-3 py-2.5 text-fog outline-none focus:border-signal-amber transition-colors"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="text-sm font-medium text-slate-grid">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    minLength={MESSAGE_MIN_LENGTH}
                    maxLength={MESSAGE_MAX_LENGTH}
                    value={formData.message}
                    onChange={handleChange}
                    disabled={status === 'sending'}
                    className="w-full bg-slate-grid/[0.03] border border-slate-grid/20 rounded-md px-3 py-2.5 text-fog outline-none focus:border-signal-amber transition-colors resize-none"
                  />
                </div>

                <div className="flex items-center justify-between gap-4 mt-1">
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="flex items-center gap-2 bg-signal-amber text-basalt font-medium px-5 py-2.5 rounded-md hover:bg-signal-amber/90 transition-colors disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    {status === 'sending' ? 'Sending…' : 'Send message'}
                  </button>

                  {status === 'success' && (
                    <span className="flex items-center gap-1.5 text-sm text-green-500">
                      <CheckCircle2 className="w-4 h-4" />
                      Message sent — thank you.
                    </span>
                  )}
                  {status === 'error' && (
                    <span className="flex items-center gap-1.5 text-sm text-red-400">
                      <AlertTriangle className="w-4 h-4" />
                      {errorText}
                    </span>
                  )}
                </div>
              </form>
            )}
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
