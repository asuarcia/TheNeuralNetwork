'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'motion/react';
import { Brain, Network, Cpu, GraduationCap } from 'lucide-react';
import { totalCourses, totalLessons } from '@/content/curriculum';

const stats = [
  { value: String(totalCourses), label: 'Learning Tracks' },
  { value: String(totalLessons), label: 'Interactive Lessons' },
  { value: 'Free', label: 'No Card Needed' },
];

const pillars = [
  { icon: Brain, title: 'Real Foundations', desc: 'Understand what AI actually is and how today’s models work — no hand-waving.' },
  { icon: Network, title: 'Built From Scratch', desc: 'Implement neurons, gradients, and models yourself, a few lines of Python at a time.' },
  { icon: Cpu, title: 'Runs In Your Browser', desc: 'Coding lessons execute real Python via WebAssembly. No install, no setup.' },
  { icon: GraduationCap, title: 'Learn At Your Pace', desc: 'From total beginner to expert, at your own pace. Pick up exactly where you left off.' },
];

export const About = () => {
  const containerRef = useRef(null);
  useInView(containerRef, { once: true, margin: '-100px' });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section ref={containerRef} id="about" className="py-32 relative bg-neutral-950 overflow-hidden">
      {/* Dot grid texture */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(139,92,246,0.06)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_50%,#000_60%,transparent_100%)] pointer-events-none" />
      {/* Violet radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-violet-600/5 blur-3xl rounded-full pointer-events-none" />

      <div className="container mx-auto px-6">

        {/* Section label */}
        <div className="flex items-center gap-6 mb-24">
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-violet-500 text-sm">03</span>
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-neutral-400">About the Platform</span>
          </div>
          <div className="h-px w-32 bg-gradient-to-r from-violet-500/40 to-transparent" />
        </div>

        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-20 items-start">

          {/* Text */}
          <div className="relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-7xl font-bold tracking-tighter mb-12 leading-[0.95]"
            >
              We teach machines<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-500">
                to think.
              </span>
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-10 text-lg font-light text-neutral-400 leading-relaxed">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                TheNeuralNetwork is a free way to learn AI from the ground up. Whether you&apos;re sending your very first prompt or implementing backpropagation, the lessons meet you exactly where you are.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                You don&apos;t just read — you practice with quizzes, real-world prompts, and (when you&apos;re ready) runnable Python with auto-checked exercises. The tracks take you from your first prompt to shipping production AI.
              </motion.p>
            </div>

            {/* Stats */}
            <div className="mt-16 pt-16 border-t border-violet-500/10">
              <div className="grid grid-cols-3 gap-8">
                {stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * i, duration: 0.6 }}
                    className={`space-y-2 ${i < stats.length - 1 ? 'border-r border-white/5' : ''}`}
                  >
                    <h4 className="text-4xl font-light text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-purple-400">
                      {stat.value}
                    </h4>
                    <p className="text-xs uppercase tracking-widest text-neutral-500">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Pillar cards */}
          <motion.div style={{ opacity }} className="relative lg:mt-8 grid grid-cols-1 gap-4">
            {pillars.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i, duration: 0.7 }}
                className="group flex items-start gap-4 p-5 rounded-xl border border-white/5 bg-white/[0.02] hover:border-violet-500/30 hover:bg-violet-500/5 transition-all duration-500"
              >
                <div className="shrink-0 w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center group-hover:bg-violet-500/20 transition-colors">
                  <pillar.icon className="w-5 h-5 text-violet-400" />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">{pillar.title}</h4>
                  <p className="text-neutral-500 text-sm leading-relaxed">{pillar.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
};
