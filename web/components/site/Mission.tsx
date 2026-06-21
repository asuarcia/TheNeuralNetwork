'use client';

import { motion } from 'motion/react';

export const Mission = () => {
  return (
    <section id="mission" className="relative py-32 px-6 bg-neutral-950 overflow-hidden">
      {/* soft radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-violet-600/8 blur-3xl rounded-full pointer-events-none" />

      <div className="container mx-auto max-w-4xl relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-3 mb-10"
        >
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-violet-500/60" />
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-violet-400">Our mission</span>
          <span className="h-px w-10 bg-gradient-to-l from-transparent to-violet-500/60" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl md:text-5xl font-bold tracking-tight leading-[1.1]"
        >
          AI shouldn&apos;t be a black box owned by a few. We&apos;re here to put it in{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-pink-500">everyone&apos;s hands</span> —
          so anyone, technical or not, can understand it, use it, and build with it.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mt-8 text-lg font-light text-neutral-400 max-w-2xl mx-auto leading-relaxed"
        >
          Not by watching lectures — by <span className="text-neutral-200">doing</span>. Every idea is something you run, tweak, and break, right in your browser, until it&apos;s yours.
        </motion.p>
      </div>
    </section>
  );
};
