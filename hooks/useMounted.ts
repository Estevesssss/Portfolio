"use client";

import { useEffect, useState } from "react";

/** True only after client hydration — avoids Framer Motion / browser-only SSR mismatches. */
export function useMounted() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}
