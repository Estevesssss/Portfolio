"use client";

import { useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const PROJECT_IMAGES = [
  "/projects/project-1.jpg",
  "/projects/project-2.jpg",
  "/projects/project-3.jpg",
  "/projects/project-4.jpg",
];

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
        {[0, 1, 2, 3].map((i) => (
          <TiltCard key={i} index={i}>
            {/* Image placeholder */}
            <div className="relative aspect-video w-full overflow-hidden bg-surface-hover">
              <div className="flex h-full items-center justify-center text-muted/30">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-surface/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
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
                  href="#"
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
        ))}
      </div>
    </section>
  );
}
