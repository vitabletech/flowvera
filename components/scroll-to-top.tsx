"use client";

import { useEffect, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

export function ScrollToTop() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const isAboutPage = pathname?.startsWith("/about-us") || pathname?.startsWith("/about");
    if (isAboutPage) {
      if (window.location.hash === "#contact" || window.location.hash === "#about" || window.location.hash === "#about-hero") {
        window.history.replaceState(null, "", pathname);
      }
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    } else if (!window.location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [pathname]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isAboutPage = pathname?.startsWith("/about-us") || pathname?.startsWith("/about");
    if (isAboutPage || !window.location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      const t1 = window.setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      }, 40);
      const t2 = window.setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      }, 150);
      return () => {
        window.clearTimeout(t1);
        window.clearTimeout(t2);
      };
    }
  }, [pathname]);

  return null;
}
