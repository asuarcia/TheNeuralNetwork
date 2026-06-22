'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { Rocket, GraduationCap, Check, ArrowUpRight } from 'lucide-react';
import { useCases, certifications } from '@/content/outcomes';

const payoffs = [
  {
    icon: Rocket,
    title: 'A portfolio you built',
    desc: 'You don’t just watch — you ship. Finish a track and you’ve built real projects (a RAG bot, an image classifier, even a GPT) you can put on a résumé or GitHub.',
    href: '/projects',
    cta: 'See the 22 projects',
  },
  {
    icon: GraduationCap,
    title: 'A verifiable certificate',
    desc: 'Complete every lesson in a track and claim a shareable Certificate of Completion with its own credential ID — proof you did the work, not just bought a course.',
    href: '/courses',
    cta: 'Browse tracks',
  },
  {
    icon: Check,
    title: 'Exam-ready for the real thing',
    desc: 'Each track maps to recognized industry certifications. Learn here, then walk into the AWS, NVIDIA, or TensorFlow exam already prepared.',
    href: '#certifications',
    cta: 'See which certs',
  },
];

export const Outcomes = () => {
  return (
    <section id="outcomes" className="py-32 px-6 bg-neutral-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(139,92,246,0.05)_1px,transparent_1px)] bg-[size:46px_46px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,#000_50%,transparent_100%)] pointer-events-none" />

      <div className="container mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 max-w-3xl"
        >
          <div className="flex items-center gap-6 mb-8">
            <span className="font-mono text-violet-500 text-sm">02</span>
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-neutral-400">Why finish</span>
            <div className="h-px w-32 bg-gradient-to-r from-violet-500/40 to-transparent" />
          </div>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[0.95]">
            Walk away with<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-400 to-pink-500">
              something real
            </span>
          </h2>
          <p className="mt-6 text-lg font-light text-neutral-400">
            Most courses end with a video and a shrug. Here, finishing means you&apos;ve <span className="text-neutral-200">built things, earned proof, and gotten exam-ready</span>.
          </p>
        </motion.div>

        {/* Payoff pillars */}
        <div className="grid md:grid-cols-3 gap-6 mb-28">
          {payoffs.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.7 }}
              className="group rounded-2xl border border-white/8 bg-white/[0.02] p-7 hover:border-violet-500/30 hover:bg-violet-500/[0.03] transition-all duration-500 flex flex-col"
            >
              <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center mb-6 group-hover:bg-violet-500/20 transition-colors">
                <p.icon className="w-6 h-6 text-violet-400" />
              </div>
              <h3 className="text-xl font-bold tracking-tight mb-3">{p.title}</h3>
              <p className="text-neutral-500 text-sm leading-relaxed mb-6 flex-1 group-hover:text-neutral-400 transition-colors">{p.desc}</p>
              <Link href={p.href} className="inline-flex items-center gap-1.5 text-sm font-medium text-violet-400 hover:text-violet-300">
                {p.cta} <ArrowUpRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Use cases */}
        <div className="mb-28">
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">Things you&apos;ll actually be able to do</h3>
          <p className="text-neutral-500 mb-10 max-w-2xl">Not someday — these are the concrete builds inside the tracks. Each one is a thing you run and keep.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {useCases.map((u, i) => (
              <motion.div
                key={u.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 3) * 0.08, duration: 0.6 }}
              >
                <Link
                  href={u.projectSlug ? `/projects/${u.projectSlug}` : `/courses/${u.courseSlug}`}
                  className="group block h-full rounded-xl border border-white/5 bg-white/[0.02] p-5 hover:border-violet-500/30 hover:bg-violet-500/[0.03] transition-all"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h4 className="font-bold tracking-tight group-hover:text-violet-300 transition-colors">{u.title}</h4>
                    <ArrowUpRight className="w-4 h-4 text-neutral-600 group-hover:text-violet-400 transition-colors shrink-0 mt-0.5" />
                  </div>
                  <p className="text-sm text-neutral-500 leading-relaxed">{u.blurb}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div id="certifications" className="scroll-mt-28">
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">Prepares you for</h3>
          <p className="text-neutral-500 mb-10 max-w-2xl">Our tracks line up with the credentials employers recognize. Build the skills here, then sit the exam.</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {certifications.map((c, i) => (
              <motion.a
                key={c.name}
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 2) * 0.08, duration: 0.6 }}
                className="group flex items-start gap-4 rounded-xl border border-white/8 bg-white/[0.02] p-6 hover:border-violet-500/30 transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center shrink-0">
                  <GraduationCap className="w-5 h-5 text-violet-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-bold tracking-tight group-hover:text-violet-300 transition-colors">{c.name}</h4>
                    <ArrowUpRight className="w-4 h-4 text-neutral-600 group-hover:text-violet-400 transition-colors shrink-0" />
                  </div>
                  <p className="text-xs font-mono uppercase tracking-widest text-neutral-600 mt-0.5 mb-2">{c.provider}</p>
                  <p className="text-sm text-neutral-500 leading-relaxed">{c.blurb}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
