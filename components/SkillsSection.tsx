"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiFramer,
  SiNodedotjs,
  SiPostgresql,
  SiSupabase,
  SiGit,
  SiGithub,
  SiVercel,
  SiIntellijidea,
  SiPostman,
} from "@icons-pack/react-simple-icons";

const SKILLS_DATA: Record<string, string[]> = {
  frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  backend: ["Node.js", "PostgreSQL", "Supabase", "REST APIs", "WebSockets"],
  tools: ["Git", "GitHub", "Vercel", "VS Code", "IntelliJ", "Postman"],
  design: ["UI/UX", "Responsive Design", "Accessibility", "Design Systems"],
};

const s = "h-4 w-4 shrink-0";

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; color?: string; className?: string }>> = {
  React: SiReact,
  "Next.js": SiNextdotjs,
  TypeScript: SiTypescript,
  "Tailwind CSS": SiTailwindcss,
  "Framer Motion": SiFramer,
  "Node.js": SiNodedotjs,
  PostgreSQL: SiPostgresql,
  Supabase: SiSupabase,
  Git: SiGit,
  GitHub: SiGithub,
  Vercel: SiVercel,
  IntelliJ: SiIntellijidea,
  Postman: SiPostman,
};

function SkillIcon({ name }: { name: string }) {
  const IconComponent = ICON_MAP[name];
  if (IconComponent) {
    return <IconComponent size={16} color="default" className={s} />;
  }

  // Fallback: ícones customizados para skills sem Simple Icon
  switch (name) {
    case "REST APIs":
      return (
        <svg className={s} viewBox="0 0 24 24" fill="none" stroke="#FF6B35" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 12h16" />
          <polyline points="15 5 22 12 15 19" />
          <polyline points="9 19 2 12 9 5" />
        </svg>
      );
    case "WebSockets":
      return (
        <svg className={s} viewBox="0 0 24 24" fill="none" stroke="#E535AB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 10l3-3 4 4 4-4 3 3" />
          <path d="M5 14l3 3 4-4 4 4 3-3" />
        </svg>
      );
    case "VS Code":
      return (
        <svg className={s} viewBox="0 0 256 256">
          <path d="M180.8 252.8l68.8-33.6a9.3 9.3 0 0 0 5.8-8.6V44.7a9.3 9.3 0 0 0-5.8-8.6l-68.8-33.6a9.3 9.3 0 0 0-10.6 2L76.4 91.6 31.7 57.5a6.2 6.2 0 0 0-7.9.5l-16.5 15a6.2 6.2 0 0 0 0 9.3l38.7 35.3-38.7 35.3a6.2 6.2 0 0 0 0 9.3l16.5 15c2.2 2 5.4 2.2 7.9.5l44.7-34.1 93.8 87.2a9.3 9.3 0 0 0 10.6 2zM192 69.4l-77 58.9 77 58.9V69.4z" fill="#007ACC" />
        </svg>
      );
    case "UI/UX":
      return (
        <svg className={s} viewBox="0 0 24 24" fill="none" stroke="#FF6B9D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <line x1="3" y1="9" x2="21" y2="9" />
          <line x1="9" y1="21" x2="9" y2="9" />
        </svg>
      );
    case "Responsive Design":
      return (
        <svg className={s} viewBox="0 0 24 24" fill="none" stroke="#4FC08D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="14" height="12" rx="1.5" />
          <rect x="18" y="7" width="4" height="10" rx="1" />
          <line x1="2" y1="20" x2="22" y2="20" />
        </svg>
      );
    case "Accessibility":
      return (
        <svg className={s} viewBox="0 0 24 24" fill="none" stroke="#005A9C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="8" r="1.5" fill="#005A9C" stroke="none" />
          <path d="M8 11l4 1 4-1" />
          <path d="M12 12v3" />
          <path d="M10 19l2-4 2 4" />
        </svg>
      );
    case "Design Systems":
      return (
        <svg className={s} viewBox="0 0 24 24" fill="none" stroke="#FF7262" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" />
        </svg>
      );
    default:
      return null;
  }
}

function CategoryIcon({ category }: { category: string }) {
  const shared = "h-7 w-7";

  switch (category) {
    case "frontend":
      return (
        <svg className={shared} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      );
    case "backend":
      return (
        <svg className={shared} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="8" rx="2" />
          <rect x="2" y="14" width="20" height="8" rx="2" />
          <circle cx="6" cy="6" r="1" fill="currentColor" />
          <circle cx="6" cy="18" r="1" fill="currentColor" />
        </svg>
      );
    case "tools":
      return (
        <svg className={shared} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      );
    case "design":
      return (
        <svg className={shared} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="13.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
          <circle cx="17.5" cy="10.5" r="1.5" fill="currentColor" stroke="none" />
          <circle cx="8.5" cy="7.5" r="1.5" fill="currentColor" stroke="none" />
          <circle cx="6.5" cy="12.5" r="1.5" fill="currentColor" stroke="none" />
          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.648 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.555C21.965 6.012 17.461 2 12 2z" />
        </svg>
      );
    default:
      return null;
  }
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.12,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  }),
};

const chipVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      delay: i * 0.05,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  }),
};

export default function SkillsSection() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const categories = Object.keys(SKILLS_DATA);

  return (
    <section
      id="skills"
      ref={ref}
      className="relative mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 py-24"
    >
      {/* Heading */}
      <motion.div
        className="relative z-10 mb-16 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
          {t("skills.heading")}
          <span className="text-accent">.</span>
        </h2>
        <p className="mt-4 text-base text-muted sm:text-lg">
          {t("skills.subtitle")}
        </p>
      </motion.div>

      {/* Skills grid */}
      <div className="relative z-10 grid w-full gap-6 sm:grid-cols-2">
        {categories.map((categoryKey, categoryIndex) => {
          const skills = SKILLS_DATA[categoryKey];

          return (
            <motion.div
              key={categoryKey}
              className="group relative overflow-hidden rounded-2xl border border-border bg-surface/50 p-6 backdrop-blur-sm transition-all duration-500 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5"
              custom={categoryIndex}
              variants={cardVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              {/* Hover glow */}
              <div className="pointer-events-none absolute -inset-1 rounded-2xl bg-gradient-to-br from-accent/0 to-accent-secondary/0 opacity-0 blur-xl transition-all duration-500 group-hover:from-accent/10 group-hover:to-accent-secondary/10 group-hover:opacity-100" />

              <div className="relative z-10">
                {/* Category header */}
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors duration-300 group-hover:bg-accent/20">
                    <CategoryIcon category={categoryKey} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {t(`skills.categories.${categoryKey}`)}
                    </h3>
                    <p className="text-xs text-muted">
                      {skills.length} {t("skills.technologies")}
                    </p>
                  </div>
                </div>

                {/* Skill chips with icons */}
                <div className="flex flex-wrap gap-2.5">
                  {skills.map((skill, i) => (
                    <motion.span
                      key={skill}
                      className="inline-flex items-center gap-2 rounded-lg border border-border bg-background/60 px-4 py-2 text-sm text-muted transition-all duration-300 hover:border-accent/40 hover:bg-accent/10 hover:text-accent hover:shadow-[0_0_12px_rgba(168,85,247,0.15)]"
                      custom={categoryIndex * 5 + i}
                      variants={chipVariants}
                      initial="hidden"
                      animate={inView ? "visible" : "hidden"}
                      whileHover={{ y: -2 }}
                    >
                      <SkillIcon name={skill} />
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
