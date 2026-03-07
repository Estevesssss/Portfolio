"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageToggle from "./LanguageToggle";

const NAV_LINKS = ["about", "projects", "skills", "contact"] as const;

export default function Navbar() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 z-50 flex w-full items-center justify-between px-6 py-4 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 shadow-lg shadow-black/5 backdrop-blur-xl"
          : "bg-transparent"
      }`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const }}
    >
      {/* Logo */}
      <a href="#hero" className="flex items-center transition-opacity hover:opacity-80">
        <img
          src="/Andre Esteves Logo-02.svg"
          alt="AE Logo"
          className="h-9 w-9"
        />
      </a>

      {/* Desktop Nav Links */}
      <div className="hidden items-center gap-8 md:flex">
        {NAV_LINKS.map((link) => (
          <a
            key={link}
            href={`#${link}`}
            className="relative text-sm font-medium text-muted transition-colors hover:text-foreground"
          >
            {t(`nav.${link}`)}
            <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 hover:w-full" />
          </a>
        ))}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3">
        <LanguageToggle />

        {/* Mobile hamburger */}
        <button
          className="flex flex-col gap-1.5 md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <motion.span
            className="block h-0.5 w-6 bg-foreground"
            animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
          />
          <motion.span
            className="block h-0.5 w-6 bg-foreground"
            animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
          />
          <motion.span
            className="block h-0.5 w-6 bg-foreground"
            animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="absolute left-0 top-full flex w-full flex-col items-center gap-6 bg-background/95 py-8 backdrop-blur-xl md:hidden"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href={`#${link}`}
                className="text-lg font-medium text-muted transition-colors hover:text-foreground"
                onClick={() => setMobileOpen(false)}
              >
                {t(`nav.${link}`)}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
