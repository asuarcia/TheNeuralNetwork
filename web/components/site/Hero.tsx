'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import Link from 'next/link';
import { NeuralNetworkBackground } from './NeuralNetworkBackground';
import { Brain, Sparkles, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  const yText = useTransform(scrollY, [0, 500], [0, 200]);
  const opacityText = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section ref={containerRef} className="relative h-screen flex items-center justify-center overflow-hidden px-6">

      {/* Interactive Neural Network Background */}
      <div className="absolute inset-0 z-0">
        <NeuralNetworkBackground />
        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />
      </div>

      {/* Subtle Noise Texture */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none z-[1]" />

      {/* Main Content */}
      <motion.div
        style={{ y: yText, opacity: opacityText }}
        className="relative z-10 max-w-6xl mx-auto flex flex-col items-center text-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/30 bg-violet-500/10 backdrop-blur-md text-xs font-mono tracking-widest uppercase text-violet-300">
            <Sparkles className="w-3 h-3" />
            AI-Powered Learning Platform
          </div>
        </motion.div>

        {/* Logo/Brand */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="relative">
            <Brain className="w-12 h-12 text-violet-400" />
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0 rounded-full bg-violet-500/30 blur-xl"
            />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.9] mb-6 text-white"
        >
          The<span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-600">Neural</span>
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Network</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-xl md:text-2xl font-light text-neutral-300 max-w-3xl mx-auto mb-12 leading-relaxed"
        >
          Master artificial intelligence at any level — from beginner fundamentals to advanced neural architectures. Your journey into AI starts here.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white border-0 px-8 py-6 text-lg font-medium shadow-lg shadow-violet-500/30"
          >
            <Link href="/signup">
              <Zap className="w-5 h-5 mr-2" />
              Start Learning
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-violet-500/50 text-violet-300 hover:bg-violet-500/10 hover:text-violet-200 px-8 py-6 text-lg font-medium backdrop-blur-sm"
          >
            <Link href="/courses">Explore Courses</Link>
          </Button>
        </motion.div>

        {/* Feature Pills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap justify-center gap-3 mt-16 max-w-2xl"
        >
          {['Beginner Friendly', 'Expert Level', 'Hands-on Projects', 'AI Certification'].map((feature, i) => (
            <div
              key={i}
              className="px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm text-sm text-neutral-400"
            >
              {feature}
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Minimal Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-12 flex flex-col items-center gap-4 z-10"
      >
        <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-600">Scroll</span>
        <div className="w-[1px] h-24 bg-gradient-to-b from-transparent via-violet-500/50 to-transparent overflow-hidden">
          <motion.div
            animate={{ y: [-100, 100] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
            className="w-full h-1/2 bg-gradient-to-b from-transparent via-violet-400 to-transparent"
          />
        </div>
      </motion.div>
    </section>
  );
};
