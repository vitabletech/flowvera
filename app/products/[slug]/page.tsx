import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContentPage } from "@/components/content-page";
import { EnquiryForm } from "@/components/enquiry-form";
import { services, serviceHref } from "@/lib/services";
import { assetPath } from "@/lib/asset-path";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;
export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}

async function getService(params: Promise<{ slug: string }>) {
  const { slug } = await params;
  const service = services.find(s => s.slug === slug);
  if (!service) notFound();
  return service;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const service = await getService(params);
  return pageMetadata(service.title, service.description, serviceHref(service.slug));
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const service = await getService(params);
  return <ContentPage title={service.title} intro={service.description}>
    <div className="product-detail">
      <div className="product-detail-image"><Image src={assetPath(service.image)} alt={service.title} fill sizes="(max-width: 680px) 90vw, 550px" /></div>
      <div><h2>Discuss your application</h2><p>{service.details}</p><h3>Useful information to share</h3><ul>{service.requirements.map(r => <li key={r}>{r}</li>)}</ul><a className="button button-primary" href="#enquire">Enquire about this solution</a><p className="form-notice">Product availability, specifications, pricing and delivery are confirmed by the team, not by this website.</p></div>
    </div>
    <EnquiryForm topic={service.title} />
    <Link className="text-link" href="/products/">View all products and services</Link>
  </ContentPage>;
}
