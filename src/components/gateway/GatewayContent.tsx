"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { RiArrowRightLine, RiCommandFill, RiLockUnlockLine } from "@remixicon/react";
import * as React from "react";
import { ModeToggle } from "@/components/mode-toggle";

// Warp timing constants (ms → s)
const WARP_RINGS    = 0.3;   // rings start expanding
const WARP_STREAKS  = 0.5;   // star streaks begin
const WARP_CORE     = 0.9;   // central vortex blooms
const WARP_FLASH    = 1.5;   // white/black flash fills screen
const WARP_NAVIGATE = 2000;  // ms before router.push

export function GatewayContent() {
  const router = useRouter();
  const [particles, setParticles] = React.useState<{ x: string; y: string; duration: number }[]>([]);
  const [mousePos, setMousePos]   = React.useState({ x: -1000, y: -1000 });
  const [isWarping, setIsWarping] = React.useState(false);

  React.useEffect(() => {
    const p = [...Array(25)].map(() => ({
      x: Math.random() * 100 + "%",
      y: Math.random() * 100 + "%",
      duration: 2 + Math.random() * 3,
    }));
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setParticles(p);

    const move = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const handleWarp = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsWarping(true);
    setTimeout(() => router.push("/home"), WARP_NAVIGATE);
  };

  const RING_SIZES = [40, 100, 180, 280, 400, 540, 700, 900, 1140, 1400, 1700, 2100];

  return (
    <div className="relative h-screen w-full bg-background flex flex-col items-center justify-center overflow-hidden font-sans transition-colors duration-500">

      {/* Mode Toggle */}
      <div className="fixed top-4 right-4 sm:top-8 sm:right-8 z-[9999]">
        <ModeToggle />
      </div>

      <div
        className="pointer-events-none fixed inset-0 z-30 opacity-25"
        style={{ background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, var(--color-primary), transparent 40%)` }}
      />

      <div className="absolute inset-0 ambient-glow pointer-events-none opacity-50 dark:opacity-100" />

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute size-0.5 bg-foreground/20 rounded-full"
            initial={{ x: p.x, y: p.y, opacity: 0 }}
            animate={{ y: [null, "-30px", "30px"], opacity: [0.1, 0.4, 0.1] }}
            transition={{ duration: p.duration, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* ═══════════════ THEME-AWARE WORMHOLE ═══════════════ */}
      <AnimatePresence>
        {isWarping && (
          <motion.div
            className="fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden"
            style={{ perspective: 800 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.15 }}
          >
            {/* Background transitions to opposite of current background for contrast or stays same */}
            <motion.div
              className="absolute inset-0 bg-background"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />

            {/* Phase 1: Tunnel rings (Theme Aware) */}
            {RING_SIZES.map((size, i) => (
              <motion.div
                key={`ring-${i}`}
                className="absolute rounded-full"
                style={{
                  width: size,
                  height: size,
                  // Uses foreground color for rings
                  border: `${Math.max(3 - i * 0.2, 0.5)}px solid oklch(from var(--foreground) l c h / ${0.6 - i * 0.04})`,
                  boxShadow: i < 3 ? `0 0 ${20 - i * 5}px oklch(from var(--foreground) l c h / 0.2)` : "none",
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 0.01, 0.3 + i * 0.1, 2.5 + i * 0.3],
                  opacity: [0, 0.8, 0.6, 0],
                }}
                transition={{
                  duration: 1.3,
                  delay: WARP_RINGS + i * 0.035,
                  ease: [0.2, 0.0, 0.8, 1.0], 
                  times: [0, 0.1, 0.5, 1],
                }}
              />
            ))}

            {/* Phase 2: Radial star streaks (Theme Aware) */}
            {[...Array(48)].map((_, i) => {
              const angle   = (i / 48) * 360;
              const length  = 40 + Math.random() * 80;
              const delay   = WARP_STREAKS + (i % 8) * 0.04;
              return (
                <motion.div
                  key={`streak-${i}`}
                  className="absolute"
                  style={{
                    width: length,
                    height: 1.5,
                    left: "50%",
                    top: "50%",
                    transformOrigin: "0 50%",
                    rotate: angle,
                    // Uses foreground for streaks
                    background: `linear-gradient(90deg, oklch(from var(--foreground) l c h / 0.6), transparent)`,
                  }}
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: [0, 1, 0], opacity: [0, 1, 0] }}
                  transition={{ duration: 0.7, delay, ease: "easeOut" }}
                />
              );
            })}

            {/* Phase 3: Inner glow core blooming */}
            <motion.div
              className="absolute rounded-full"
              style={{ background: "radial-gradient(circle, oklch(from var(--foreground) l c h / 1) 0%, oklch(from var(--foreground) l c h / 0.2) 50%, transparent 100%)" }}
              initial={{ width: 0, height: 0, opacity: 0 }}
              animate={{
                width:   [0, 20, 80, 200],
                height:  [0, 20, 80, 200],
                opacity: [0, 1,  1,  0],
              }}
              transition={{ duration: 0.9, delay: WARP_CORE, ease: [0.16, 1, 0.3, 1], times: [0, 0.15, 0.6, 1] }}
            />

            {/* Phase 4: Final overexposure (Inverted for Light Mode) */}
            <motion.div
              className="absolute inset-0 bg-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0, 0, 0.3, 1] }}
              transition={{ duration: WARP_FLASH + 0.3, ease: "easeIn", times: [0, 0.5, 0.75, 0.88, 1] }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.main 
        animate={{ 
          filter: isWarping ? "blur(20px) scale(0.9)" : "blur(0px) scale(1)",
          opacity: isWarping ? 0 : 1 
        }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="relative z-10 flex flex-col items-center gap-12 px-4"
      >
        <div className="flex flex-col items-center gap-4">
          <motion.div
            initial={{ scale: 0.7, opacity: 0, filter: "blur(8px)" }}
            animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="size-16 rounded-2xl border border-border bg-card flex items-center justify-center mb-4 shadow-sm"
          >
            <RiCommandFill className="size-8 text-muted-foreground" />
          </motion.div>

          <motion.h1
            initial={{ y: 24, opacity: 0, filter: "blur(6px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            transition={{ delay: 0.4, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl font-bold tracking-[0.2em] text-foreground uppercase text-center"
          >
            Aakansh <span className="text-muted-foreground/30">Anand</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, filter: "blur(4px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ delay: 0.9, duration: 1.0 }}
            className="text-muted-foreground text-sm tracking-widest uppercase font-medium"
          >
            Digital Experience Engineer
          </motion.p>
        </div>

        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.4, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="group relative"
        >
          <div className="absolute -inset-1 rounded-full bg-linear-to-r from-primary/20 to-primary/5 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
          <button
            onClick={handleWarp}
            className="relative flex items-center gap-4 bg-foreground px-10 py-5 rounded-full text-background font-bold tracking-widest transition-all hover:scale-105 active:scale-95 overflow-hidden"
          >
            <span className="relative z-10">INITIALIZE JOURNEY</span>
            <RiArrowRightLine className="size-5 transition-transform group-hover:translate-x-1" />
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-background/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.0, duration: 1.0 }}
          className="flex flex-col items-center gap-4 mt-8"
        >
          <div className="flex items-center gap-2 text-[10px] text-muted-foreground/40 tracking-[0.3em] font-bold uppercase">
            <RiLockUnlockLine className="size-3" />
            Session: Anonymous
          </div>
          <div className="flex gap-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="size-1 rounded-full bg-muted-foreground/20" />
            ))}
          </div>
        </motion.div>
      </motion.main>

      <div className="absolute bottom-8 right-8 text-[10px] text-muted-foreground/30 font-mono hidden sm:block text-right">
        PROTOCOL: V1.0.0-PRO<br />
        STATUS: READY_FOR_BOOT
      </div>

      <div className="absolute inset-0 pointer-events-none scanline z-50 opacity-[0.03] dark:opacity-20" />
    </div>
  );
}
