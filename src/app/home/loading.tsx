"use client";

import { motion } from "framer-motion";

export default function HomeLoading() {
  return (
    <div className="fixed inset-0 z-10000 flex items-center justify-center bg-black overflow-hidden">
      <div className="flex flex-col items-center gap-4">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="size-20 rounded-2xl border border-white/20 bg-white/5 backdrop-blur-sm"
        />
        <p className="text-[10px] text-white/30 uppercase tracking-[0.5em] font-bold animate-pulse">
          Loading Archive
        </p>
      </div>

      {/* Scanline overlay for consistency */}
      <div className="absolute inset-0 pointer-events-none scanline opacity-20" />
    </div>
  );
}
