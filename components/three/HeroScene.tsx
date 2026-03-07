"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { Suspense, useState, useEffect } from "react";
import FloatingGeometry from "./FloatingGeometry";
const MOBILE_BREAKPOINT = 768;
const MOBILE_SCALE = 0.55;

function SceneContent({ isDark }: { isDark: boolean }) {
  const { size } = useThree();
  const isMobile = size.width < MOBILE_BREAKPOINT;
  const scale = isMobile ? MOBILE_SCALE : 1;

  return (
    <>
      <ambientLight intensity={isDark ? 0.15 : 0.4} />
      <pointLight position={[5, 5, 5]} intensity={isDark ? 0.8 : 0.6} color={isDark ? "#a855f7" : "#8b5cf6"} />
      <pointLight position={[-5, -3, 3]} intensity={isDark ? 0.5 : 0.4} color={isDark ? "#00d4ff" : "#0ea5e9"} />
      <pointLight position={[0, 3, -5]} intensity={isDark ? 0.3 : 0.25} color={isDark ? "#6d28d9" : "#7c3aed"} />
      <FloatingGeometry
        color1={isDark ? "#a855f7" : "#8b5cf6"}
        color2={isDark ? "#00d4ff" : "#0ea5e9"}
        opacity={isDark ? 0.85 : 0.5}
        scale={scale}
      />
    </>
  );
}

function WebGLFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="h-64 w-64 rounded-full bg-gradient-to-br from-accent/20 to-accent-secondary/20 blur-3xl" />
    </div>
  );
}

export default function HeroScene() {
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

  if (!webGLSupported) {
    return <WebGLFallback />;
  }

  return (
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
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    >
      <Suspense fallback={null}>
        <SceneContent isDark={isDark} />
      </Suspense>
    </Canvas>
  );
}
