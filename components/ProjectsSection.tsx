"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useInView, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useMounted } from "@/hooks/useMounted";
import { projects, type Project, type ProjectSlide } from "@/data/projects";

function ProjectCarousel({
  slides,
  className,
}: {
  slides: ProjectSlide[];
  className?: string;
}) {
  const [current, setCurrent] = useState(0);
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
          <img
            src={slides[current].src}
            alt={slides[current].alt ?? ""}
            className="h-full w-full object-cover"
          />
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
  const mounted = useMounted();
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
      initial={mounted ? { opacity: 0, y: 50 } : false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
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

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { locale, t } = useLanguage();
  const hasProjectUrl = Boolean(project.url);
  const showCodeButton = project.showCode;

  return (
    <TiltCard index={index}>
      <div className="relative">
        <ProjectCarousel slides={project.slides} />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      <div className="relative z-10 p-6">
        <h3 className="mb-2 text-xl font-semibold text-foreground">
          {project.title[locale]}
        </h3>
        <p className="mb-4 text-sm leading-relaxed text-muted">
          {project.description[locale]}
        </p>

        <div className="mb-5 flex flex-wrap gap-2">
          {project.tech.map((tech) => (
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
            href={hasProjectUrl ? project.url : "#"}
            target={hasProjectUrl ? "_blank" : undefined}
            rel={hasProjectUrl ? "noopener noreferrer" : undefined}
            className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-xs font-semibold text-accent transition-all hover:bg-accent/20"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            {t("projects.viewProject")}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7v10" /></svg>
          </motion.a>
          {showCodeButton && (
            <motion.a
              href={project.codeUrl || "#"}
              target={project.codeUrl ? "_blank" : undefined}
              rel={project.codeUrl ? "noopener noreferrer" : undefined}
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs font-medium text-muted transition-all hover:border-foreground/20 hover:text-foreground"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              {t("projects.viewCode")}
            </motion.a>
          )}
        </div>
      </div>
    </TiltCard>
  );
}

export default function ProjectsSection() {
  const { t } = useLanguage();
  const mounted = useMounted();
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
        initial={mounted ? { opacity: 0, y: 30 } : false}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        {t("projects.heading")}
        <span className="text-accent">.</span>
      </motion.h2>

      <div className="grid w-full gap-8 sm:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
