"use client";

import { Suspense, lazy, useRef } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";

const HeroScene = lazy(() => import("@/components/three/HeroScene"));

function CanvasLoader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative h-64 w-64">
        <div className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-br from-accent/10 to-accent-secondary/10 blur-3xl" />
      </div>
    </div>
  );
}

function ScrollIndicator() {
  const { t } = useLanguage();

  return (
    <motion.div
      className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2, duration: 1 }}
    >
      <span className="text-xs tracking-widest text-muted uppercase">
        {t("hero.scrollHint")}
      </span>
      <motion.div
        className="flex flex-col items-center"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-muted"
        >
          <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
        </svg>
      </motion.div>
    </motion.div>
  );
}

export default function Hero3D() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const sectionRef = useRef<HTMLElement>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const },
    },
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* 3D Background Canvas */}
      <Suspense fallback={<CanvasLoader />}>
        <HeroScene />
      </Suspense>

      {/* Content Overlay */}
      <motion.div
        className="relative z-10 flex flex-col items-center px-6 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="mb-4 text-5xl font-bold tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl"
          variants={itemVariants}
        >
          {t("hero.title")}
        </motion.h1>

        <motion.p
          className={`mb-10 max-w-xl text-lg sm:text-xl ${
            isDark
              ? "text-muted"
              : "font-medium text-foreground [text-shadow:0_1px_2px_rgba(0,0,0,0.06)]"
          }`}
          variants={itemVariants}
        >
          {t("hero.subtitle")}
        </motion.p>

        <motion.a
          href="#projects"
          className={`hero-cta group relative inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold transition-all duration-300 ${
            isDark
              ? "border border-accent/30 bg-accent/10 text-accent-glow backdrop-blur-sm hover:border-accent/60 hover:bg-accent/20 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]"
              : "bg-accent text-white shadow-lg shadow-accent/30 hover:bg-accent-glow hover:shadow-xl hover:shadow-accent/40"
          }`}
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          {t("hero.cta")}
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </motion.a>
      </motion.div>

      <ScrollIndicator />

      {/* Bottom gradient fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
