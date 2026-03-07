"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const stats = [
  { valueKey: "about.experienceYears", labelKey: "about.experienceLabel" },
  { valueKey: "about.projectsCount", labelKey: "about.projectsLabel" },
  { valueKey: "about.techCount", labelKey: "about.techLabel" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

export default function AboutSection() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      ref={ref}
      className="relative mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 py-24"
    >
      {/* Section heading */}
      <motion.h2
        className="mb-16 text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        {t("about.heading")}
        <span className="text-accent">.</span>
      </motion.h2>

      {/* Two-column layout */}
      <div className="grid w-full gap-12 md:grid-cols-2 md:gap-16">
        {/* Left column -- text */}
        <div className="flex flex-col gap-6">
          {(["about.p1", "about.p2", "about.p3"] as const).map((key, i) => (
            <motion.p
              key={key}
              className="text-base leading-relaxed text-muted sm:text-lg"
              custom={i}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              {t(key)}
            </motion.p>
          ))}
        </div>

        {/* Right column -- stats cards */}
        <div className="flex flex-col justify-center gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.labelKey}
              className="group rounded-2xl border border-border bg-surface/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-accent/30 hover:bg-surface hover:shadow-lg hover:shadow-accent/5"
              custom={i + 3}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              <div className="mb-1 origin-left text-3xl font-bold text-accent transition-transform duration-300 group-hover:translate-x-2 group-hover:scale-110 sm:text-4xl">
                {t(stat.valueKey)}
              </div>
              <div className="text-sm text-muted">{t(stat.labelKey)}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
