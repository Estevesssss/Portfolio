"use client";

import { motion } from "framer-motion";

export default function SectionDivider() {
  return (
    <div className="flex justify-center py-8">
      <motion.div
        className="h-px w-24 bg-gradient-to-r from-transparent via-accent/40 to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      />
    </div>
  );
}
