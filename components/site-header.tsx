"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { assetPath } from "@/lib/asset-path";

const links = [
  { label: "About Us", href: "#about" },
  { label: "Products & Services", href: "#services" },
  { label: "Specialty Chemicals", href: "#chemicals" },
  { label: "Contact Us", href: "#contact" }
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const closeOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target)) setOpen(false);
    };
    const closeOnResize = () => setOpen(false);
    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOutside);
    window.addEventListener("resize", closeOnResize);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeOutside);
      window.removeEventListener("resize", closeOnResize);
    };
  }, [open]);

  return (
    <header ref={headerRef} className="site-header">
      <Link className="brand" href="#home" aria-label="FlowVera home" onClick={() => setOpen(false)}>
        <Image
          src={assetPath("/assets/optimized/flowvera-logo.webp")}
          alt="FlowVera"
          fill
          priority
          sizes="190px"
        />
      </Link>
      <nav className="desktop-nav" aria-label="Main navigation">
        {links.map((link) => (
          <Link key={link.label} href={link.href} className="nav-link">
            {link.label}
          </Link>
        ))}
      </nav>
      <Link className="button quote-button" href="#contact">
        Get a quotation
      </Link>
      <button
        className="menu-toggle"
        ref={toggleRef}
        type="button"
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X size={23} /> : <Menu size={23} />}
      </button>
      <nav id="mobile-nav" hidden={!open} className={"mobile-nav" + (open ? " is-open" : "")} aria-label="Mobile navigation">
        {links.map((link) => (
          <Link key={link.label} href={link.href} onClick={() => setOpen(false)}>
            {link.label}
          </Link>
        ))}
        <Link className="mobile-quote" href="#contact" onClick={() => setOpen(false)}>
          Get a quotation
        </Link>
      </nav>
    </header>
  );
}
