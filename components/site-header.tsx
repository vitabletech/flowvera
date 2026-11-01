"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { assetPath } from "@/lib/asset-path";
import { services, serviceHref } from "@/lib/services";

const links = [
  { label: "About Us", href: "/#about" },
  { label: "Products & Services", href: "/products/" },
  { label: "Specialty Chemicals", href: serviceHref("specialty-chemicals") },
  { label: "Contact Us", href: "/#contact" }
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const productsRef = useRef<HTMLButtonElement>(null);

  const closeMenus = () => {
    setOpen(false);
    setProductsOpen(false);
  };

  useEffect(() => {
    if (!open && !productsOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (productsOpen) productsRef.current?.focus();
        else toggleRef.current?.focus();
        setOpen(false);
        setProductsOpen(false);
      }
    };
    const closeOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target)) {
        setOpen(false);
        setProductsOpen(false);
      }
    };
    const closeOnResize = () => { setOpen(false); setProductsOpen(false); };
    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOutside);
    window.addEventListener("resize", closeOnResize);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeOutside);
      window.removeEventListener("resize", closeOnResize);
    };
  }, [open, productsOpen]);

  return (
    <header ref={headerRef} className="site-header" onBlur={event => {
      if (!event.currentTarget.contains(event.relatedTarget)) closeMenus();
    }}>
      <Link className="brand" href="/#home" aria-label="FlowVera home" onClick={closeMenus}>
        <Image
          src={assetPath("/assets/optimized/flowvera-logo.webp")}
          alt="FlowVera"
          fill
          priority
          sizes="190px"
        />
      </Link>
      <nav className="desktop-nav" aria-label="Main navigation">
        {links.map((link) => link.href === "/products/" ? (
          <div className="products-disclosure" key={link.href}>
            <button ref={productsRef} className="nav-link products-toggle" type="button" aria-expanded={productsOpen} aria-controls="products-menu" onClick={() => setProductsOpen(value => !value)}>
              {link.label}<ChevronDown size={14} aria-hidden="true" />
            </button>
            <div id="products-menu" className="products-menu" hidden={!productsOpen}>
              <Link href="/products/" onClick={closeMenus}>View all products &amp; services</Link>
              {services.map(s => <Link key={s.slug} href={serviceHref(s.slug)} onClick={closeMenus}>{s.title}</Link>)}
            </div>
          </div>
        ) : (
          <Link key={link.label} href={link.href} className="nav-link" onClick={closeMenus}>
            {link.label}
          </Link>
        ))}
      </nav>
      <Link className="button quote-button" href="/enquiry/" onClick={closeMenus}>
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
        <div className="mobile-products" aria-label="Product categories">
          {services.map(s => <Link key={s.slug} href={serviceHref(s.slug)} onClick={closeMenus}>{s.title}</Link>)}
        </div>
        <Link href="/book-demo/" onClick={closeMenus}>Book a demo</Link>
        <Link className="mobile-quote" href="/enquiry/" onClick={closeMenus}>
          Get a quotation
        </Link>
      </nav>
    </header>
  );
}
