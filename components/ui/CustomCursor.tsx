"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const glowX = useMotionValue(-100);
  const glowY = useMotionValue(-100);

  const glowSpringConfig = { damping: 40, stiffness: 90 };
  const glowXSmooth = useSpring(glowX, glowSpringConfig);
  const glowYSmooth = useSpring(glowY, glowSpringConfig);

  useEffect(() => {
    // Hide on touch devices
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const onMouseMove = (e: MouseEvent) => {
      glowX.set(e.clientX);
      glowY.set(e.clientY);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [glowX, glowY]);

  return (
    <>
      {/* Mouse-following ambient glow (no dot) */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-0 hidden h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-3xl md:block"
        style={{
          x: glowXSmooth,
          y: glowYSmooth,
          background:
            "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
        }}
      />
    </>
  );
}
