'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowLeft, Clock, BookOpen, Users } from 'lucide-react';
import { projects } from '@/data/projects';

const levelColors: Record<string, string> = {
  Beginner: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
  Intermediate: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
  Advanced: 'text-violet-400 border-violet-500/30 bg-violet-500/10',
  Expert: 'text-pink-400 border-pink-500/30 bg-pink-500/10',
};

export const ProjectDetail = ({ slug }: { slug: string }) => {
  const project = projects.find(p => p.slug === slug);
  const currentIndex = projects.findIndex(p => p.slug === slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  if (!project) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-4xl mb-4">Course not found</h1>
          <Link href="/courses" className="text-violet-400 hover:text-violet-300 underline">Back to Courses</Link>
        </div>
      </div>
    );
  }

  const [level, hours] = project.category.split(' · ');
  const levelClass = levelColors[level] ?? 'text-violet-400 border-violet-500/30 bg-violet-500/10';

  return (
    <div className="bg-neutral-950 min-h-screen text-white pt-32 px-6">
      <div className="container mx-auto">

        <Link href="/courses" className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-500 hover:text-violet-400 transition-colors mb-12">
          <ArrowLeft className="w-4 h-4" /> All Courses
        </Link>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-10">
            <div>
              <div className={`inline-flex items-center px-3 py-1 rounded-full border text-xs font-mono uppercase tracking-wide mb-4 ${levelClass}`}>
                {level}
              </div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[0.95]">
                {project.title}
              </h1>
            </div>
            <div className="flex items-center gap-6 text-sm font-mono text-neutral-500 mb-2">
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{hours}</span>
              <span className="flex items-center gap-1.5"><Users className="w-4 h-4" />12.4k enrolled</span>
            </div>
          </div>

          <div className="aspect-[16/9] w-full bg-neutral-900 overflow-hidden rounded-2xl">
            <motion.img
              initial={{ scale: 1.08 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* Content */}
        <div className="grid md:grid-cols-[1fr_2fr] gap-16 mb-24">
          <div className="space-y-8">
            <div className="p-6 rounded-xl border border-violet-500/10 bg-violet-500/5 space-y-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 block mb-1">Track</span>
                <p className="font-medium text-violet-300">{project.client}</p>
              </div>
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 block mb-1">Topics</span>
                <p className="font-medium text-white">{project.role}</p>
              </div>
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 block mb-1">Level</span>
                <p className="font-medium text-white">{level}</p>
              </div>
            </div>

            <Link
              href={`/signup?next=/courses/${project.slug}`}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold tracking-tight hover:from-violet-500 hover:to-purple-500 transition-all hover:scale-[1.02] shadow-lg shadow-violet-500/20 flex items-center justify-center gap-2"
            >
              <BookOpen className="w-5 h-5" />
              Enroll for Free
            </Link>
          </div>

          <div>
            <p className="text-2xl md:text-3xl font-light leading-relaxed text-neutral-300 mb-12">
              {project.description}
            </p>

            <div className="pt-12 border-t border-violet-500/10">
              <h3 className="text-lg font-bold mb-4 text-white">What You&apos;ll Build</h3>
              <p className="text-neutral-500 leading-relaxed mb-8">
                Every course includes hands-on projects where you apply concepts immediately. You&apos;ll finish with a portfolio-ready project hosted on GitHub, a certificate of completion, and practical skills you can use on day one.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-neutral-900 aspect-video rounded-xl overflow-hidden">
                  <img src={project.image} className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity duration-500" alt="Preview 1" />
                </div>
                <div className="bg-neutral-900 aspect-video rounded-xl overflow-hidden">
                  <img src={project.image} className="w-full h-full object-cover opacity-40 hover:opacity-100 transition-opacity duration-500 grayscale hover:grayscale-0" alt="Preview 2" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Next Course */}
        {nextProject && (
          <div className="border-t border-violet-500/10 py-20 text-center">
            <Link href={`/courses/${nextProject.slug}`} className="group inline-flex flex-col items-center gap-4">
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-500">Next Course</span>
              <span className="text-4xl md:text-6xl font-bold tracking-tighter group-hover:text-violet-300 transition-colors">
                {nextProject.title}
              </span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
