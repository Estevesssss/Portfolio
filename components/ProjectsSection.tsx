"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useInView, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import TableiaLogo from "@/components/svg/TableiaLogo";

type SlideContent = { type: "custom"; node: React.ReactNode } | { type: "image"; src: string };

/** URLs and custom slides per project. Key = project id from locale (projects.items.*.id). */
const PROJECT_SLIDES: Record<string, SlideContent[]> = {
  tableia: [
    { type: "custom", node: <TableiaLogo className="h-full w-full object-contain p-4" /> },
    { type: "image", src: "https://github.com/user-attachments/assets/f342dfa9-33cd-4141-a299-1da6320f25a9" },
    { type: "image", src: "https://github.com/user-attachments/assets/6b80a4b4-7a4d-4c16-b631-1b8aff191a99" },
  ],
  scortop: [
    { type: "image", src: "https://github.com/user-attachments/assets/84904580-c709-44c6-bb89-4ed10db6c2e7" },
  ],
};

function getSlidesForProject(projectId: string): SlideContent[] {
  return PROJECT_SLIDES[projectId] ?? [];
}

/** Project URL for "Ver Projeto" button. Key = project id. */
const PROJECT_LINKS: Record<string, string> = {
  tableia: "https://tableia.co",
};

function ProjectCarousel({
  projectId,
  className,
}: {
  projectId: string;
  className?: string;
}) {
  const [current, setCurrent] = useState(0);
  const slides = getSlidesForProject(projectId);
  const hasSlides = slides.length > 0;
  const hasMultiple = slides.length > 1;

  const goTo = useCallback(
    (index: number) => {
      setCurrent((prev) => {
        const next = index;
        if (next < 0) return slides.length - 1;
        if (next >= slides.length) return 0;
        return next;
      });
    },
    [slides.length]
  );

  if (!hasSlides) {
    return (
      <div
        className={`flex aspect-video w-full items-center justify-center overflow-hidden bg-surface-hover ${className ?? ""}`}
      >
        <div className="text-muted/30">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative aspect-video w-full overflow-hidden bg-surface-hover ${className ?? ""}`}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {slides[current].type === "custom"
            ? slides[current].node
            : (
                <img
                  src={slides[current].type === "image" ? slides[current].src : ""}
                  alt=""
                  className="h-full w-full object-contain"
                />
              )}
        </motion.div>
      </AnimatePresence>

      {hasMultiple && (
        <>
          <button
            type="button"
            onClick={() => goTo(current === 0 ? slides.length - 1 : current - 1)}
            className="absolute left-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/90 text-foreground shadow-lg backdrop-blur-sm transition-colors hover:bg-surface focus:outline-none focus:ring-2 focus:ring-accent"
            aria-label="Slide anterior"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => goTo(current === slides.length - 1 ? 0 : current + 1)}
            className="absolute right-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/90 text-foreground shadow-lg backdrop-blur-sm transition-colors hover:bg-surface focus:outline-none focus:ring-2 focus:ring-accent"
            aria-label="Slide seguinte"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
          <div className="absolute bottom-2 left-1/2 z-20 flex -translate-x-1/2 gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                className={`h-1.5 w-1.5 rounded-full transition-colors ${
                  i === current ? "bg-accent" : "bg-foreground/30 hover:bg-foreground/50"
                }`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

interface TiltCardProps {
  index: number;
  children: React.ReactNode;
}

function TiltCard({ index, children }: TiltCardProps) {
  const [hovered, setHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(0, { stiffness: 200, damping: 20 });
  const rotateY = useSpring(0, { stiffness: 200, damping: 20 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) / (rect.width / 2);
    const deltaY = (e.clientY - centerY) / (rect.height / 2);
    rotateX.set(-deltaY * 8);
    rotateY.set(deltaX * 8);
    x.set(deltaX * 5);
    y.set(deltaY * 5);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
    x.set(0);
    y.set(0);
    setHovered(false);
  }

  return (
    <motion.div
      className="group relative overflow-hidden rounded-2xl border border-border bg-surface/50 backdrop-blur-sm transition-colors duration-300 hover:border-accent/30"
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Dynamic glow on hover */}
      {hovered && (
        <motion.div
          className="pointer-events-none absolute -inset-px z-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(168,85,247,0.1), transparent 60%)",
          }}
        />
      )}
      {children}
    </motion.div>
  );
}

export default function ProjectsSection() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="projects"
      ref={ref}
      className="relative mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 py-24"
    >
      <motion.h2
        className="mb-16 text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        {t("projects.heading")}
        <span className="text-accent">.</span>
      </motion.h2>

      <div className="grid w-full gap-8 sm:grid-cols-2">
        {[0, 1].map((i) => {
          const projectId = t(`projects.items.${i}.id`);
          return (
          <TiltCard key={projectId} index={i}>
            <div className="relative">
              <ProjectCarousel projectId={projectId} />
              <div className="absolute inset-0 bg-gradient-to-t from-surface/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />
            </div>

            <div className="relative z-10 p-6">
              <h3 className="mb-2 text-xl font-semibold text-foreground">
                {t(`projects.items.${i}.title`)}
              </h3>
              <p className="mb-4 text-sm leading-relaxed text-muted">
                {t(`projects.items.${i}.description`)}
              </p>

              {/* Tech stack badges */}
              <div className="mb-5 flex flex-wrap gap-2">
                {t(`projects.items.${i}.tech`)
                  .split(", ")
                  .map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-accent/20 bg-accent/5 px-3 py-1 text-xs font-medium text-accent"
                    >
                      {tech}
                    </span>
                  ))}
              </div>

              <div className="flex gap-3">
                <motion.a
                  href={PROJECT_LINKS[projectId] ?? "#"}
                  target={PROJECT_LINKS[projectId] ? "_blank" : undefined}
                  rel={PROJECT_LINKS[projectId] ? "noopener noreferrer" : undefined}
                  className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-xs font-semibold text-accent transition-all hover:bg-accent/20"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {t("projects.viewProject")}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7v10" /></svg>
                </motion.a>
                <motion.a
                  href="#"
                  className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs font-medium text-muted transition-all hover:border-foreground/20 hover:text-foreground"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {t("projects.viewCode")}
                </motion.a>
              </div>
            </div>
          </TiltCard>
          );
        })}
      </div>
    </section>
  );
}
