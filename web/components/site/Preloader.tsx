'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Brain } from 'lucide-react';

export const Preloader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
          className="fixed inset-0 z-[999] bg-black flex items-center justify-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-6"
          >
            <div className="relative">
              <Brain className="w-20 h-20 text-violet-400" />
              <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0 rounded-full bg-violet-500/40 blur-2xl"
              />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              <span className="text-white">The</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-600">Neural</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Network</span>
            </h1>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ delay: 0.5, duration: 1.5, ease: 'easeInOut' }}
              className="h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent w-48"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
