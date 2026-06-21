"use client";

import { motion, AnimatePresence } from "motion/react";

// A lightweight confetti burst. Render <Confetti fire={n} /> and bump `fire`
// (e.g. a counter) to trigger a new burst. Uses motion (already a dependency).
const COLORS = ["#a78bfa", "#f472b6", "#34d399", "#fbbf24", "#60a5fa", "#f87171"];
const PIECES = 36;

export function Confetti({ fire }: { fire: number }) {
  return (
    <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden">
      <AnimatePresence>
        {fire > 0 && (
          <div key={fire}>
            {Array.from({ length: PIECES }).map((_, i) => {
              const left = Math.random() * 100;
              const delay = Math.random() * 0.2;
              const duration = 1.4 + Math.random() * 1.2;
              const color = COLORS[i % COLORS.length];
              const size = 6 + Math.random() * 8;
              const drift = (Math.random() - 0.5) * 240;
              return (
                <motion.div
                  key={i}
                  initial={{ top: "-5%", left: `${left}%`, opacity: 1, rotate: 0 }}
                  animate={{ top: "105%", left: `calc(${left}% + ${drift}px)`, opacity: [1, 1, 0], rotate: 720 }}
                  transition={{ duration, delay, ease: "easeIn" }}
                  exit={{ opacity: 0 }}
                  style={{
                    position: "absolute",
                    width: size,
                    height: size * 0.4,
                    backgroundColor: color,
                    borderRadius: 2,
                  }}
                />
              );
            })}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
