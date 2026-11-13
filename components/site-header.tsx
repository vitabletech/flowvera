"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { assetPath } from "@/lib/asset-path";
import { services, serviceHref } from "@/lib/services";

const dropdownServices = services.filter(s => s.slug !== "specialty-chemicals");

const links = [
  { label: "About Us", href: "/about-us/" },
  { label: "Products & Services", href: "/products/" },
  { label: "Specialty Chemicals", href: serviceHref("specialty-chemicals") },
  { label: "Spare Parts", href: "/spare-parts/" },
  { label: "Tanks", href: "/tanks/" }
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

  const handleLinkClick = (href: string) => {
    closeMenus();
    if (typeof window !== "undefined" && (href.startsWith("/about-us") || href.startsWith("/about"))) {
      if (window.location.hash) {
        window.history.replaceState(null, "", href);
      }
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      setTimeout(() => window.scrollTo({ top: 0, left: 0, behavior: "instant" }), 50);
    }
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
    <>
      {open && <div className="mobile-backdrop" onClick={closeMenus} aria-hidden="true" />}
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
                {dropdownServices.map(s => <Link key={s.slug} href={serviceHref(s.slug)} onClick={closeMenus}>{s.title}</Link>)}
              </div>
            </div>
          ) : (
            <Link key={link.label} href={link.href} className="nav-link" scroll={true} onClick={() => handleLinkClick(link.href)}>
              {link.label}
            </Link>
          ))}
        </nav>
        <Link className="button quote-button" href="/enquiry/" onClick={closeMenus}>
          Contact Us
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
            <div key={link.label} className="mobile-nav-item">
              <Link href={link.href} scroll={true} onClick={() => handleLinkClick(link.href)}>
                {link.label}
              </Link>
              {link.href === "/products/" && (
                <div className="mobile-products" aria-label="Product categories">
                  <Link href="/products/" onClick={closeMenus}>View all products &amp; services</Link>
                  {dropdownServices.map((s) => (
                    <Link key={s.slug} href={serviceHref(s.slug)} onClick={closeMenus}>
                      {s.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Link className="mobile-quote" href="/enquiry/" onClick={closeMenus}>
            Contact Us
          </Link>
        </nav>
      </header>
    </>
  );
}
