"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useState, useEffect } from "react";
import Particles from "./Particles";
export default function PageParticlesBackground() {
  const [webGLSupported, setWebGLSupported] = useState(true);
  const isDark = true;

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const hasWebGL = !!(
        canvas.getContext("webgl") || canvas.getContext("webgl2")
      );
      setWebGLSupported(hasWebGL);
    } catch {
      setWebGLSupported(false);
    }
  }, []);

  if (!webGLSupported) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10"
      aria-hidden
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <Suspense fallback={null}>
          <Particles
            color={isDark ? "#a855f7" : "#7c3aed"}
            opacity={isDark ? 0.5 : 0.25}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
