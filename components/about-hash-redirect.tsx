"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function AboutHashRedirect() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash === "#about") {
      router.replace("/about-us/");
    }
  }, [router]);

  return null;
}

