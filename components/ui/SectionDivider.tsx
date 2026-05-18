"use client";

import { motion } from "framer-motion";
import { useMounted } from "@/hooks/useMounted";

export default function SectionDivider() {
  const mounted = useMounted();

  return (
    <motion.div className="flex justify-center py-8">
      <motion.div
        className="h-px w-24 bg-gradient-to-r from-transparent via-accent/40 to-transparent"
        initial={mounted ? { scaleX: 0, opacity: 0 } : false}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      />
    </motion.div>
  );
}
