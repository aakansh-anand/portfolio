"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { ModeToggle } from "@/components/mode-toggle";
import { RiGamepadLine, RiSparklingLine, RiStarFill } from "@remixicon/react";
import * as React from "react";

export function HomeContent() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [mousePos, setMousePos] = React.useState({ x: -1000, y: -1000 });
  const [level, setLevel] = React.useState(1);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  React.useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      const newLevel = Math.floor(latest * 10) + 1;
      setLevel(newLevel);
    });
  }, [scrollYProgress]);

  if (!mounted) return <div className="min-h-screen bg-background" />;

  return (
    <div className="relative min-h-[200vh] bg-background px-6 overflow-hidden selection:bg-primary selection:text-primary-foreground">
      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-9999 origin-left"
        style={{ scaleX }}
      />

      {/* Floating HUD */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed bottom-8 left-8 z-50 flex items-center gap-4 bg-background/80 border border-border px-4 py-2 rounded-2xl backdrop-blur-md shadow-xl"
      >
        <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
          <RiStarFill className="size-5" />
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Explorer Rank</span>
          <span className="text-sm font-bold">LEVEL {level}</span>
        </div>
      </motion.div>

      {/* Interactive Cursor Glow */}
      <div
        className="pointer-events-none fixed inset-0 z-30 opacity-30"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, var(--color-primary), transparent 40%)`,
        }}
      />

      <ModeToggle />

      <main className="relative z-10 flex flex-col items-center justify-center pt-[30vh] text-center pb-32">
        <div className="flex flex-col items-center gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-[10px] font-bold text-primary uppercase tracking-[0.2em]"
          >
            <RiGamepadLine className="size-3" />
            Interactive Portfolio Active
          </motion.div>

          <h1 className="gradient-text text-7xl font-bold tracking-tighter sm:text-9xl py-4">
            Aakansh Anand
          </h1>
          
          <p className="text-xl sm:text-2xl font-medium text-muted-foreground/80 tracking-tight max-w-2xl leading-relaxed">
            I craft <span className="text-foreground border-b-2 border-primary/30">unforgettable</span> digital experiences with code and a sprinkle of magic.
          </p>
        </div>

        {/* Playful Navigation */}
        <nav className="mt-24">
          <ul className="flex flex-wrap justify-center items-center gap-10">
            {[
              { label: "Work", href: "#work", icon: RiSparklingLine },
              { label: "About", href: "#about", icon: RiStarFill },
              { label: "Contact", href: "mailto:hello@aakansh.dev", icon: RiStarFill },
            ].map((item, i) => (
              <motion.li 
                key={i}
                whileHover={{ y: -5 }}
                className="group flex flex-col items-center gap-2"
              >
                <a 
                  href={item.href} 
                  className="text-lg font-bold text-muted-foreground hover:text-foreground transition-all duration-300 tracking-tighter sm:text-xl"
                >
                  {item.label}
                </a>
                <div className="size-1.5 rounded-full bg-primary scale-0 group-hover:scale-100 transition-transform duration-300 shadow-[0_0_10px_rgba(var(--color-primary),0.5)]" />
              </motion.li>
            ))}
          </ul>
        </nav>

        {/* Fake "Quest" Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-48 w-full max-w-md p-8 rounded-3xl border border-border bg-card/50 backdrop-blur-sm relative group overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
            <RiGamepadLine className="size-12" />
          </div>
          <div className="text-left space-y-4">
            <h3 className="text-sm font-bold text-primary uppercase tracking-widest">Active Quest</h3>
            <p className="text-2xl font-bold font-heading">Explore the Archive</p>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Unlock my case studies by scrolling deeper. Every interaction gains you experience.
            </p>
            <div className="pt-4 flex items-center justify-between text-xs font-bold text-muted-foreground uppercase tracking-widest">
              <span>Progress</span>
              <span>{Math.min(level * 10, 100)}%</span>
            </div>
            <div className="h-2 w-full bg-border rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(level * 10, 100)}%` }}
              />
            </div>
          </div>
        </motion.div>
      </main>

      <footer className="fixed bottom-8 right-8 z-50 text-[10px] text-muted-foreground/30 font-bold tracking-[0.4em] uppercase pointer-events-none">
        Aakansh.Archive
      </footer>
    </div>
  );
}
