import Link from "next/link";
import type { ReactNode } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WhatsAppIcon } from "@/components/whatsapp-icon";

export function ContentPage({ title, intro, children }: { title: string; intro: string; children: ReactNode }) {
  return (
    <>
      <div className="inner-page-header"><SiteHeader /></div>
      <main className="content-page section-wrap" id="main-content" tabIndex={-1}>
        <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">{title}</span></nav>
        <h1>{title}</h1>
        <p className="page-intro">{intro}</p>
        {children}
      </main>
      <SiteFooter />
      <a className="floating-whatsapp" href="https://wa.me/966508607349" target="_blank" rel="noreferrer" aria-label="Chat with FlowVera on WhatsApp"><WhatsAppIcon size={26} /></a>
    </>
  );
}
