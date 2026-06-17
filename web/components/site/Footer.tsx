'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Brain, Send, X, Code2, AtSign, Play, MessageCircle } from 'lucide-react';

export const Footer = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <>
      <footer id="community" className="relative bg-neutral-950 py-32 px-6 overflow-hidden border-t border-violet-500/10">
        {/* Violet glow top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-violet-600/8 blur-3xl rounded-full pointer-events-none" />

        <div className="container mx-auto relative z-10">
          <div className="grid md:grid-cols-[1.5fr_1fr] gap-20 mb-24">

            <div>
              {/* Brand */}
              <div className="flex items-center gap-2 mb-10">
                <Brain className="w-8 h-8 text-violet-400" />
                <span className="text-2xl font-bold tracking-tight">
                  <span className="text-white">The</span>
                  <span className="text-violet-400">Neural</span>
                  <span className="text-purple-500">Network</span>
                </span>
              </div>

              <motion.h2
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-5xl md:text-7xl font-bold tracking-tighter leading-[0.95] mb-12"
              >
                Ready to<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-pink-500">
                  Level Up?
                </span>
              </motion.h2>

              <div className="flex flex-col gap-8">
                <button
                  onClick={() => setIsFormOpen(true)}
                  className="group flex items-center gap-6 text-left"
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-600 to-purple-600 text-white flex items-center justify-center group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-violet-500/30 transition-all duration-500">
                    <ArrowUpRight className="w-6 h-6 group-hover:rotate-45 transition-transform duration-500" />
                  </div>
                  <div>
                    <span className="block text-2xl font-bold tracking-tighter text-white group-hover:text-violet-300 transition-colors">
                      Enroll Now — It&apos;s Free
                    </span>
                    <span className="block text-sm font-mono uppercase tracking-widest text-neutral-500 mt-1">
                      No credit card required
                    </span>
                  </div>
                </button>

                <a
                  href="mailto:learn@theneuralnetwork.ai"
                  className="flex items-center gap-3 text-sm font-mono text-neutral-500 hover:text-violet-400 transition-colors pl-2"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  learn@theneuralnetwork.ai
                </a>
              </div>
            </div>

            <div className="flex flex-col justify-end gap-12">
              <div className="grid grid-cols-2 gap-12">
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-6">Community</h4>
                  <ul className="space-y-4">
                    {[
                      { name: 'GitHub', icon: Code2 },
                      { name: 'Twitter', icon: AtSign },
                      { name: 'YouTube', icon: Play },
                      { name: 'Discord', icon: MessageCircle },
                    ].map(({ name, icon: Icon }) => (
                      <li key={name}>
                        <a href="#" className="flex items-center gap-2 text-base font-light text-neutral-400 hover:text-violet-400 transition-colors group">
                          <Icon className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                          {name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-6">Platform</h4>
                  <ul className="space-y-4">
                    {['Courses', 'Paths', 'Projects', 'Certifications', 'Blog'].map((link) => (
                      <li key={link}>
                        <a href={`#${link.toLowerCase()}`} className="text-base font-light text-neutral-400 hover:text-violet-400 transition-colors">
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-violet-500/10 gap-6">
            <p className="font-mono text-xs uppercase tracking-widest text-neutral-600">
              © 2026 TheNeuralNetwork. All rights reserved.
            </p>
            <p className="font-mono text-xs uppercase tracking-widest text-neutral-600">
              Learn AI by building
            </p>
          </div>
        </div>
      </footer>

      <EnrollModal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </>
  );
};

const EnrollModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    setTimeout(() => {
      setFormState('success');
      setTimeout(() => {
        onClose();
        setFormState('idle');
      }, 2500);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-[100]"
          />

          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 right-0 z-[101] w-full md:w-[560px] bg-neutral-900 border-l border-violet-500/20 shadow-2xl shadow-violet-900/20 p-8 md:p-12 overflow-y-auto"
          >
            <button onClick={onClose} className="absolute top-8 right-8 p-2 text-neutral-500 hover:text-white transition-colors" aria-label="Close">
              <X className="w-5 h-5" />
            </button>

            {formState === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-20 h-20 bg-gradient-to-br from-violet-600 to-purple-600 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-violet-500/30"
                >
                  <Brain className="w-10 h-10 text-white" />
                </motion.div>
                <h3 className="text-3xl font-bold mb-2">You&apos;re In!</h3>
                <p className="text-neutral-400 font-light">Check your email for your access link.</p>
              </div>
            ) : (
              <div className="mt-12">
                <span className="text-xs font-mono uppercase tracking-widest text-violet-500 mb-4 block">
                  Free Enrollment
                </span>
                <h3 className="text-4xl font-bold tracking-tighter mb-2">
                  Start Learning<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-pink-500">
                    Today
                  </span>
                </h3>
                <p className="text-neutral-400 font-light mb-10">
                  Join 120,000+ students mastering AI on TheNeuralNetwork.
                </p>

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="space-y-6">
                    <input
                      required
                      type="text"
                      placeholder="Your Name"
                      className="w-full bg-transparent border-b border-white/10 py-3 text-lg font-light focus:outline-none focus:border-violet-500 transition-colors placeholder:text-neutral-700"
                    />
                    <input
                      required
                      type="email"
                      placeholder="Email Address"
                      className="w-full bg-transparent border-b border-white/10 py-3 text-lg font-light focus:outline-none focus:border-violet-500 transition-colors placeholder:text-neutral-700"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono uppercase tracking-widest text-neutral-500 block mb-3">
                      Where are you starting?
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {['Complete Beginner', 'Know Some Python', 'Built ML Models', 'AI Professional'].map((level) => (
                        <button
                          type="button"
                          key={level}
                          className="px-4 py-2 rounded-full border border-white/10 text-sm font-light hover:border-violet-500/50 hover:bg-violet-500/10 hover:text-violet-300 transition-all"
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={formState === 'submitting'}
                    className="w-full bg-gradient-to-r from-violet-600 to-purple-600 text-white text-lg font-medium py-4 rounded-full hover:from-violet-500 hover:to-purple-500 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg shadow-violet-500/30"
                  >
                    <Send className="w-4 h-4" />
                    {formState === 'submitting' ? 'Creating Account...' : 'Create Free Account'}
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
