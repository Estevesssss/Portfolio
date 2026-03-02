"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Locale } from "@/contexts/LanguageContext";

export default function LanguageToggle() {
  const { locale, setLocale } = useLanguage();

  const nextLocale: Locale = locale === "en" ? "pt" : "en";

  return (
    <button
      onClick={() => setLocale(nextLocale)}
      className="flex h-9 min-w-[2.25rem] items-center justify-center rounded-full border border-border bg-surface px-2 transition-colors hover:bg-surface-hover"
      aria-label={locale === "en" ? "Switch to Portuguese" : "Mudar para inglês"}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={locale}
          initial={{ y: -8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 8, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="uppercase"
        >
          {locale}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
