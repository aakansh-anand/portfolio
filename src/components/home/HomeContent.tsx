"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { RiGamepadLine, RiHomeLine, RiStarFill } from "@remixicon/react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "motion/react";
import { useRouter } from "next/navigation";
import * as React from "react";

const NAME = "Aakansh";

// Warp timing constants
const WARP_RINGS = 0.3;
const WARP_STREAKS = 0.5;
const WARP_CORE = 0.9;
const WARP_FLASH = 1.5;
const WARP_NAVIGATE = 2000;

export function HomeContent() {
  const router = useRouter();
  const { scrollY } = useScroll();
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [level, setLevel] = React.useState(1);
  const [mounted, setMounted] = React.useState(false);
  const [mousePos, setMousePos] = React.useState({ x: -1000, y: -1000 });
  const [isReverting, setIsReverting] = React.useState(false);

  // Smart Navbar State
  const [navVisible, setNavVisible] = React.useState(true);
  const [lastScrollY, setLastScrollY] = React.useState(0);

  React.useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Track scroll direction to show/hide nav
  useMotionValueEvent(scrollY, "change", (latest) => {
    const direction = latest - lastScrollY;
    if (latest < 50) {
      setNavVisible(true);
    } else if (direction > 10) {
      // Scrolling Down
      setNavVisible(false);
    } else if (direction < -10) {
      // Scrolling Up
      setNavVisible(true);
    }
    setLastScrollY(latest);
  });

  React.useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      const newLevel = Math.floor(latest * 10) + 1;
      setLevel(newLevel);
    });
  }, [scrollYProgress]);

  const handleRevert = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsReverting(true);
    setTimeout(() => router.push("/"), WARP_NAVIGATE);
  };

  const RING_SIZES = [
    40, 100, 180, 280, 400, 540, 700, 900, 1140, 1400, 1700, 2100,
  ];

  if (!mounted) return <div className="min-h-screen bg-background" />;

  const navItems = [
    { label: "Work", href: "#work" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "mailto:aakansh@farnodes.com" },
  ];

  return (
    <div className="relative min-h-[200vh] bg-background px-4 sm:px-6 overflow-hidden transition-colors duration-500">
      {/* ─── Perfect Reverse Portal Overlay (Theme Aware) ─── */}
      <AnimatePresence>
        {isReverting && (
          <motion.div
            className="fixed inset-0 z-100000 flex items-center justify-center overflow-hidden"
            style={{ perspective: 800 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-background"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />

            {RING_SIZES.map((size, i) => (
              <motion.div
                key={`ring-${i}`}
                className="absolute rounded-full"
                style={{
                  width: size,
                  height: size,
                  border: `${Math.max(3 - i * 0.2, 0.5)}px solid oklch(from var(--foreground) l c h / ${0.6 - i * 0.04})`,
                  boxShadow:
                    i < 3
                      ? `0 0 ${20 - i * 5}px oklch(from var(--foreground) l c h / 0.2)`
                      : "none",
                }}
                initial={{ scale: 2.5 + i * 0.3, opacity: 0 }}
                animate={{
                  scale: [2.5 + i * 0.3, 0.3 + i * 0.1, 0.01, 0],
                  opacity: [0, 0.6, 0.8, 0],
                }}
                transition={{
                  duration: 1.3,
                  delay: WARP_RINGS + (11 - i) * 0.035,
                  ease: [0.2, 0.0, 0.8, 1.0],
                  times: [0, 0.5, 0.9, 1],
                }}
              />
            ))}

            {[...Array(48)].map((_, i) => {
              const angle = (i / 48) * 360;
              const length = 40 + Math.random() * 80;
              const opacity = 0.3 + Math.random() * 0.5;
              const delay = WARP_STREAKS + (i % 8) * 0.04;
              return (
                <motion.div
                  key={`streak-${i}`}
                  className="absolute"
                  style={{
                    width: length,
                    height: 1.5,
                    left: "50%",
                    top: "50%",
                    transformOrigin: "100% 50%",
                    rotate: angle,
                    background: `linear-gradient(90deg, transparent, oklch(from var(--foreground) l c h / ${opacity}))`,
                  }}
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: [0, 1, 0], opacity: [0, 1, 0] }}
                  transition={{ duration: 0.7, delay, ease: "easeOut" }}
                />
              );
            })}

            <motion.div
              className="absolute rounded-full"
              style={{
                background:
                  "radial-gradient(circle, oklch(from var(--foreground) l c h / 1) 0%, oklch(from var(--foreground) l c h / 0.2) 50%, transparent 100%)",
              }}
              initial={{ width: 200, height: 200, opacity: 0 }}
              animate={{
                width: [200, 80, 20, 0],
                height: [200, 80, 20, 0],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 0.9,
                delay: WARP_CORE,
                ease: [0.16, 1, 0.3, 1],
                times: [0, 0.4, 0.85, 1],
              }}
            />

            <motion.div
              className="absolute inset-0 bg-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0, 0, 0.3, 1] }}
              transition={{
                duration: WARP_FLASH + 0.3,
                ease: "easeIn",
                times: [0, 0.5, 0.75, 0.88, 1],
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main UI Wrapper */}
      <motion.div
        animate={{
          filter: isReverting ? "blur(30px) scale(1.1)" : "blur(0px) scale(1)",
          opacity: isReverting ? 0 : 1,
        }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="w-full"
      >
        {/* Interactive Cursor Glow */}
        <div
          className="pointer-events-none fixed inset-0 z-30 opacity-30"
          style={{
            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, var(--color-primary), transparent 40%)`,
          }}
        />

        <div className="pointer-events-none fixed bottom-0 left-0 right-0 h-48 z-20 bg-linear-to-t from-background/80 to-transparent backdrop-blur-[1px]" />

        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-primary z-10000 origin-left"
          style={{ scaleX }}
        />

        {/* ── Separate Mode Toggle (Top Right) ── */}
        <div className="fixed top-4 right-4 sm:top-8 sm:right-8 z-9999">
          <ModeToggle />
        </div>

        {/* ── Smart Header Navigation ── */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{
            opacity: navVisible ? 1 : 0,
            y: navVisible ? 0 : -100,
          }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-9998 w-full max-w-lg px-4"
        >
          <nav className="bg-background/60 border border-border/50 backdrop-blur-xl rounded-full px-4 sm:px-8 py-3 sm:py-5 shadow-[0_8px_32px_rgba(0,0,0,0.12)] flex items-center justify-between gap-2 sm:gap-6">
            <button
              onClick={handleRevert}
              className="flex items-center gap-2 text-[10px] sm:text-[10px] font-bold uppercase tracking-widest sm:tracking-[0.2em] text-muted-foreground/50 hover:text-foreground transition-colors group"
            >
              <RiHomeLine className="size-3.5 sm:size-3.5 group-hover:scale-110 transition-transform" />
              <span className="sm:inline">Gateway</span>
            </button>

            <div className="h-4 w-px bg-border/50" />

            <ul className="flex items-center gap-3 sm:gap-8 text-[8px] sm:text-[10px] font-bold uppercase tracking-widest sm:tracking-[0.2em] text-muted-foreground/60">
              {navItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="hover:text-foreground transition-colors relative group py-1"
                  >
                    {item.label}
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-primary transition-all group-hover:w-full" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </motion.header>

        {/* Floating HUD */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="fixed bottom-4 left-4 sm:bottom-8 sm:left-8 z-50 flex items-center gap-3 sm:gap-4 bg-background/60 border border-border/50 px-3 sm:px-4 py-2 rounded-2xl backdrop-blur-xl shadow-xl scale-90 sm:scale-100 origin-bottom-left"
        >
          <div className="size-8 sm:size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <RiStarFill className="size-4 sm:size-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-[8px] sm:text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
              Explorer Rank
            </span>
            <span className="text-xs sm:text-sm font-bold">LEVEL {level}</span>
          </div>
        </motion.div>

        <main className="relative z-10 flex flex-col items-center justify-center pt-[30vh] sm:pt-[40vh] text-center pb-32">
          <div className="flex flex-col items-center gap-4 sm:gap-6 w-full max-w-4xl px-4">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm text-[8px] sm:text-[10px] font-bold text-primary uppercase tracking-[0.2em]"
            >
              <RiGamepadLine className="size-3" />
              Interactive Portfolio Active
            </motion.div>

            {/* Solid Text — No clipping, 100% visible */}
            <div className="py-4 w-full">
              <h1 className="text-foreground text-5xl sm:text-7xl lg:text-9xl font-bold tracking-tighter leading-tight animate-pulse-subtle">
                {NAME.split("  ").map((char, i) => (
                  <motion.span
                    key={i}
                    className="inline-block w-fit bg-linear-to-t from-primary/30 to-foreground/90 bg-clip-text text-transparent"
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: 0.9,
                delay: 1.5,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-lg sm:text-xl lg:text-2xl font-medium text-muted-foreground/80 tracking-tight max-w-2xl leading-relaxed"
            >
              I craft{" "}
              <span className="text-foreground border-b-2 border-primary/30">
                unforgettable
              </span>{" "}
              digital experiences with code and a sprinkle of magic.
            </motion.p>
          </div>
        </main>

        <footer className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-50 text-[8px] sm:text-[10px] text-muted-foreground/30 font-bold tracking-[0.3em] sm:tracking-[0.4em] uppercase pointer-events-none">
          Aakansh.Archive
        </footer>
      </motion.div>
    </div>
  );
}
