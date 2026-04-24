"use client";

import { RiMoonLine, RiSunLine } from "@remixicon/react";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";
import * as React from "react";
import { flushSync } from "react-dom";

export function ModeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="fixed right-4 top-4 size-10 rounded-full border border-border bg-background/50 backdrop-blur-md" />
    );
  }

  const toggleTheme = async () => {
    const isDark = resolvedTheme === "dark";
    const nextTheme = isDark ? "light" : "dark";

    if (!document.startViewTransition) {
      setTheme(nextTheme);
      return;
    }

    document.documentElement.classList.add("switching-theme");

    // Give browser a moment to prepare
    await new Promise((resolve) => requestAnimationFrame(resolve));

    const transition = document.startViewTransition(() => {
      flushSync(() => {
        setTheme(nextTheme);
      });
    });

    try {
      await transition.finished;
    } finally {
      document.documentElement.classList.remove("switching-theme");
    }
  };

  return (
    <motion.button
      onClick={toggleTheme}
      style={{ viewTransitionName: "mode-toggle" } as React.CSSProperties}
      className="fixed right-4 top-4 z-9999 flex size-10 items-center justify-center rounded-full border border-border bg-background/80 shadow-sm backdrop-blur-md transition-colors hover:bg-accent"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {resolvedTheme === "dark" ? (
          <motion.div
            key="moon"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
          >
            <RiMoonLine className="size-5 text-foreground" />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
          >
            <RiSunLine className="size-5 text-foreground" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
