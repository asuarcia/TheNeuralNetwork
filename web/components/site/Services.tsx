'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Layers, Code2, FlaskConical, Rocket, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { curriculum, type Level } from '@/content/curriculum';

const icons = [Layers, Code2, FlaskConical, Rocket];

const tagColor: Record<Level, string> = {
  Beginner: 'text-emerald-400',
  Intermediate: 'text-amber-400',
  Advanced: 'text-violet-400',
  Expert: 'text-pink-400',
};

export const Services = () => {
  const containerRef = useRef(null);
  useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section ref={containerRef} id="paths" className="py-32 px-6 bg-neutral-950 relative overflow-hidden">

      {/* Rotating ring decorations */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
        className="absolute -top-[20%] -right-[10%] w-[700px] h-[700px] border border-violet-500/5 rounded-full pointer-events-none"
        style={{ borderStyle: 'dashed' }}
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 100, repeat: Infinity, ease: 'linear' }}
        className="absolute top-[30%] right-[5%] w-[500px] h-[500px] border border-violet-500/5 rounded-full pointer-events-none"
      />
      {/* Violet bottom glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-violet-600/5 blur-3xl rounded-full pointer-events-none" />

      <div className="container mx-auto relative z-10">

        {/* Header */}
        <div className="mb-24 grid md:grid-cols-2 gap-16 items-end">
          <div>
            <div className="flex items-center gap-6 mb-8">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-violet-500 text-sm">02</span>
                <span className="text-xs font-mono uppercase tracking-[0.3em] text-neutral-400">/ Learning Paths</span>
              </div>
              <div className="h-px w-32 bg-gradient-to-r from-violet-500/40 to-transparent" />
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold tracking-tighter leading-[0.95]"
            >
              Your Path<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-pink-500">
                to Mastery
              </span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="md:pl-12 border-l border-violet-500/20 relative"
          >
            <div className="absolute top-0 left-[-1px] h-12 w-[1px] bg-gradient-to-b from-violet-400 to-transparent" />
            <p className="text-xl font-light text-neutral-300 leading-relaxed">
              A path of tracks that takes you from understanding AI to building and shipping it — each one builds on the last.
            </p>
          </motion.div>
        </div>

        {/* Path-by-level cards (the journey, not every course) */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 group/list">
          {(['Beginner', 'Intermediate', 'Advanced', 'Expert'] as Level[]).map((level, index) => {
            const Icon = icons[index % icons.length];
            const tracks = curriculum.filter((c) => c.level === level);
            const lessons = tracks.reduce((n, c) => n + c.lessons.length, 0);
            return (
              <motion.div
                key={level}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.7 }}
                className={`relative ${index % 2 === 1 ? 'lg:mt-16' : ''} hover:!opacity-100 group-hover/list:opacity-30 transition-all duration-500`}
              >
                <Link href="/courses">
                  <motion.div
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.4 }}
                    className="group h-full p-7 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-violet-500/30 hover:bg-violet-500/5 transition-all duration-500 backdrop-blur-sm flex flex-col gap-6"
                  >
                    <div className="flex items-start justify-between">
                      <div className="w-11 h-11 rounded-xl bg-violet-500/10 flex items-center justify-center group-hover:bg-violet-500/20 transition-colors">
                        <Icon className="w-5 h-5 text-violet-400" />
                      </div>
                      <span className={`font-mono text-xs uppercase tracking-widest ${tagColor[level]}`}>{level}</span>
                    </div>

                    <div className="flex-1">
                      <h3 className="text-lg font-bold tracking-tight mb-2 text-white">{tracks.length} tracks</h3>
                      <p className="text-neutral-500 text-sm leading-relaxed group-hover:text-neutral-400 transition-colors">
                        {tracks.map((t) => t.title).join(' · ')}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-neutral-600">{lessons} lessons</span>
                      <span className="inline-flex items-center gap-1 text-xs font-mono text-neutral-500 opacity-0 group-hover:opacity-100 transition-opacity">
                        Explore <ArrowUpRight className="w-3 h-3" />
                      </span>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
