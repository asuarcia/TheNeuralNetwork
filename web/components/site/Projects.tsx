'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowUpRight, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { curriculum, type Course } from '@/content/curriculum';

const levelColors: Record<string, string> = {
  Beginner: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
  Intermediate: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
  Advanced: 'text-violet-400 border-violet-500/30 bg-violet-500/10',
  Expert: 'text-pink-400 border-pink-500/30 bg-pink-500/10',
};

// One standout track per level — the landing teases, the catalog shows all.
const FEATURED = ['ai-foundations', 'applied-ai', 'deep-learning', 'ai-engineering'];

export const Projects = () => {
  const featured = FEATURED
    .map((slug) => curriculum.find((c) => c.slug === slug))
    .filter(Boolean) as Course[];

  return (
    <section id="courses" className="py-32 px-6 bg-neutral-950">
      <div className="container mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24 flex flex-col md:flex-row justify-between items-end gap-8"
        >
          <div>
            <div className="flex items-center gap-6 mb-8">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-violet-500 text-sm">01</span>
                <span className="text-xs font-mono uppercase tracking-[0.3em] text-neutral-400">The Tracks</span>
              </div>
              <div className="h-px w-32 bg-gradient-to-r from-violet-500/40 to-transparent" />
            </div>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[0.95]">
              Learn by<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-400 to-pink-500">
                Building
              </span>
            </h2>
          </div>
          <Link
            href="/courses"
            className="hidden md:inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-400 border-b border-white/20 pb-2 hover:text-violet-400 hover:border-violet-500/50 transition-colors"
          >
            Full Curriculum
            <ArrowUpRight className="w-3 h-3" />
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-y-24">
          {featured.map((course, index) => (
            <CourseCard key={course.slug} course={course} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 flex justify-center"
        >
          <Link
            href="/courses"
            className="group inline-flex items-center gap-3 rounded-full border border-violet-500/30 bg-violet-500/5 px-7 py-4 text-sm font-medium text-violet-200 hover:border-violet-500/60 hover:bg-violet-500/10 transition-colors"
          >
            Explore all {curriculum.length} tracks — beginner to expert
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

const CourseCard = ({ course, index }: { course: Course; index: number }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const isEven = index % 2 === 0;
  const levelClass = levelColors[course.level] ?? levelColors.Advanced;

  return (
    <motion.div
      ref={ref}
      style={{ y: isEven ? 0 : y }}
      className={`group cursor-pointer ${!isEven ? 'md:mt-24' : ''}`}
    >
      <Link href={`/courses/${course.slug}`}>
        {/* Image */}
        <div className="relative overflow-hidden rounded-xl aspect-[16/10] mb-6 bg-neutral-900">
          <motion.img
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
            src={course.image}
            alt={course.title}
            className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
          />
          {/* Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Level badge */}
          <div className={`absolute top-4 left-4 px-3 py-1 rounded-full border text-xs font-mono uppercase tracking-wide ${levelClass}`}>
            {course.level}
          </div>

          {/* Hover arrow */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="bg-violet-500/20 backdrop-blur-md p-5 rounded-full border border-violet-400/30 scale-50 group-hover:scale-100 transition-transform duration-500">
              <ArrowUpRight className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="flex justify-between items-start border-t border-violet-500/10 pt-5">
          <div className="flex-1">
            <h3 className="text-2xl font-bold tracking-tight mb-2 group-hover:text-violet-300 transition-colors">
              {course.title}
            </h3>
            <p className="font-mono text-xs uppercase tracking-widest text-neutral-500">
              {course.topics.join(' · ')}
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-neutral-600 font-mono text-xs mt-1 ml-4 shrink-0">
            <BookOpen className="w-3 h-3" />
            {course.lessons.length} lessons
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
