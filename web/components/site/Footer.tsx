'use client';

import { motion } from 'motion/react';
import { ArrowUpRight, Brain, Code2, AtSign, Play, MessageCircle } from 'lucide-react';
import Link from 'next/link';

const social = [
  { name: 'GitHub', icon: Code2, href: '#' },
  { name: 'Twitter', icon: AtSign, href: '#' },
  { name: 'YouTube', icon: Play, href: '#' },
  { name: 'Discord', icon: MessageCircle, href: '#' },
];

const platform = [
  { name: 'Courses', href: '/courses' },
  { name: 'Projects', href: '/projects' },
  { name: 'Learning Map', href: '/map' },
  { name: 'Daily Review', href: '/review' },
  { name: 'Sign in', href: '/login' },
];

export const Footer = () => {
  return (
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
              <Link href="/signup" className="group flex items-center gap-6 text-left w-fit">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-600 to-purple-600 text-white flex items-center justify-center group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-violet-500/30 transition-all duration-500">
                  <ArrowUpRight className="w-6 h-6 group-hover:rotate-45 transition-transform duration-500" />
                </div>
                <div>
                  <span className="block text-2xl font-bold tracking-tighter text-white group-hover:text-violet-300 transition-colors">
                    Create your free account
                  </span>
                  <span className="block text-sm font-mono uppercase tracking-widest text-neutral-500 mt-1">
                    No credit card · start in minutes
                  </span>
                </div>
              </Link>

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
                  {social.map(({ name, icon: Icon, href }) => (
                    <li key={name}>
                      <a href={href} className="flex items-center gap-2 text-base font-light text-neutral-400 hover:text-violet-400 transition-colors group">
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
                  {platform.map(({ name, href }) => (
                    <li key={name}>
                      <Link href={href} className="text-base font-light text-neutral-400 hover:text-violet-400 transition-colors">
                        {name}
                      </Link>
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
  );
};
