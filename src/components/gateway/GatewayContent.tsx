"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { RiArrowRightLine, RiCommandFill, RiLockUnlockLine } from "@remixicon/react";
import * as React from "react";

export function GatewayContent() {
  const [particles, setParticles] = React.useState<{ x: string; y: string; duration: number }[]>([]);

  React.useEffect(() => {
    const p = [...Array(20)].map(() => ({
      x: Math.random() * 100 + "%",
      y: Math.random() * 100 + "%",
      duration: 2 + Math.random() * 3,
    }));
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setParticles(p);
  }, []);

  return (
    <div className="relative h-screen w-full bg-black flex flex-col items-center justify-center overflow-hidden font-sans">
      <div className="absolute inset-0 ambient-glow pointer-events-none" />
      
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute size-1 bg-white/20 rounded-full"
            initial={{ 
              x: p.x, 
              y: p.y,
              opacity: 0 
            }}
            animate={{ 
              y: [null, "-20px", "20px"],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{ 
              duration: p.duration, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <main className="relative z-10 flex flex-col items-center gap-12">
        <div className="flex flex-col items-center gap-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="size-16 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center mb-4"
          >
            <RiCommandFill className="size-8 text-white/50" />
          </motion.div>
          
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl sm:text-6xl font-bold tracking-[0.2em] text-white uppercase text-center"
          >
            Aakansh <span className="text-white/30">Anand</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="text-white/40 text-sm tracking-widest uppercase font-medium"
          >
            Digital Experience Engineer
          </motion.p>
        </div>

        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="group relative"
        >
          <div className="absolute -inset-1 rounded-full bg-linear-to-r from-white/20 to-white/5 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
          <Link 
            href="/home"
            className="relative flex items-center gap-4 bg-white px-10 py-5 rounded-full text-black font-bold tracking-widest transition-all hover:scale-105 active:scale-95 group overflow-hidden"
          >
            <span className="relative z-10">INITIALIZE JOURNEY</span>
            <RiArrowRightLine className="size-5 transition-transform group-hover:translate-x-1" />
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-black/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="flex flex-col items-center gap-4 mt-8"
        >
          <div className="flex items-center gap-2 text-[10px] text-white/20 tracking-[0.3em] font-bold uppercase">
            <RiLockUnlockLine className="size-3" />
            Session: Anonymous
          </div>
          <div className="flex gap-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="size-1 rounded-full bg-white/10" />
            ))}
          </div>
        </motion.div>
      </main>

      <div className="absolute bottom-8 left-8 text-[10px] text-white/20 font-mono hidden sm:block text-left">
        LATITUDE: 28.6139° N<br />
        LONGITUDE: 77.2090° E
      </div>
      <div className="absolute bottom-8 right-8 text-[10px] text-white/20 font-mono hidden sm:block text-right">
        PROTOCOL: V1.0.0-PRO<br />
        STATUS: READY_FOR_BOOT
      </div>

      <div className="absolute inset-0 pointer-events-none scanline z-50 opacity-20" />
    </div>
  );
}
