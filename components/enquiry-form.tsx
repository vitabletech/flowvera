"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import { services } from "@/lib/services";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { Mail } from "lucide-react";

const subscribe = () => () => {};

export function EnquiryForm({ topic, demo = false }: { topic?: string; demo?: boolean }) {
  const [message, setMessage] = useState("");
  const ready = useSyncExternalStore(subscribe, () => true, () => false);
  const previewRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (message) {
      previewRef.current?.scrollIntoView({ block: "nearest" });
      previewRef.current?.focus({ preventScroll: true });
    }
  }, [message]);

  function prepareRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const value = (name: string) => String(data.get(name) ?? "").trim();
    const requirements = event.currentTarget.elements.namedItem("requirements");
    if (requirements instanceof HTMLTextAreaElement && !value("requirements")) {
      requirements.setCustomValidity("Please describe your requirements.");
      requirements.reportValidity();
      return;
    }
    setMessage([
      demo ? "FlowVera demo request" : "FlowVera product enquiry",
      `Solution: ${topic ?? value("solution")}`,
      `Name: ${value("name")}`,
      `Email: ${value("email")}`,
      `Company: ${value("company") || "Not provided"}`,
      `Project location: ${value("location")}`,
      ...(demo ? [`Preferred date: ${value("date") || "Flexible"}`, `Preferred time and time zone: ${value("time") || "Please contact me to arrange"}`] : []),
      `Requirements: ${value("requirements")}`,
      ...(demo ? ["Please contact me to confirm availability."] : [])
    ].join("\n"));
  }

  return (
    <section className="enquiry-panel" id="enquire" aria-labelledby="enquiry-title">
      <h2 id="enquiry-title">{demo ? "Request a demo" : "Enquire about this solution"}</h2>
      <p>Prepare your request, then send it using WhatsApp or your email app. Nothing is submitted to this website. {demo && "Dates are preferences only; the team must confirm availability."}</p>
      <form onSubmit={prepareRequest} onChange={() => setMessage("")}>
        <fieldset disabled={!ready}>
        <legend className="sr-only">{demo ? "Demo request details" : "Enquiry details"}</legend>
        {topic ? <p className="selected-solution"><strong>Selected solution:</strong> {topic}</p> : (
          <label className="form-wide">Solution
            <select name="solution" required defaultValue=""><option value="" disabled>Select a solution</option>{services.map(s => <option key={s.slug}>{s.title}</option>)}<option>Help choosing a solution</option></select>
          </label>
        )}
        <label>Your name <input name="name" autoComplete="name" required maxLength={100} pattern={".*\\S.*"} /></label>
        <label>Email address <input name="email" type="email" autoComplete="email" required maxLength={254} /></label>
        <label>Company <input name="company" autoComplete="organization" maxLength={150} /></label>
        <label>Project location <input name="location" required maxLength={150} pattern={".*\\S.*"} /></label>
        {demo && <>
          <label>Preferred date (optional) <input name="date" type="date" /></label>
          <label>Preferred time and time zone (optional) <input name="time" placeholder="e.g. 10:00 AM, Saudi Arabia (UTC+3)" maxLength={100} /></label>
        </>}
        <label className="form-wide">Your requirements <textarea name="requirements" required maxLength={2000} rows={5} onInput={event => event.currentTarget.setCustomValidity("")} placeholder={demo ? "Tell us what you would like to discuss or see." : "Share your water source, capacity and operating needs."} /></label>
        <p className="form-wide form-notice">Do not include passwords, payment details or confidential documents. Read our <Link href="/privacy/">draft Privacy Policy</Link> before sending information.</p>
        <button className="button button-primary form-wide" type="submit">Prepare {demo ? "demo request" : "enquiry"}</button>
        </fieldset>
      </form>
      <noscript><p>JavaScript is needed to prepare a request. Please email info@flowveraarabia.com or call +966 50 860 7349 instead.</p></noscript>
      {message && <div ref={previewRef} className="prepared-request" role="status" tabIndex={-1}>
        <h3>Request ready to send</h3>
        <p>Your request has not been sent. Choose a channel below and complete sending in that app.</p>
        <pre>{message}</pre>
        <div className="request-actions">
          <a className="button button-primary" href={`https://wa.me/966508607349?text=${encodeURIComponent(message)}`} target="_blank" rel="noreferrer"><WhatsAppIcon size={20} />Open WhatsApp</a>
          <a className="button button-secondary" href={`mailto:info@flowveraarabia.com?subject=${encodeURIComponent(demo ? "FlowVera demo request" : `Enquiry: ${topic ?? "Water treatment solution"}`)}&body=${encodeURIComponent(message)}`}><Mail size={20} aria-hidden="true" />Open email app</a>
        </div>
        <p>If an app does not open, copy the preview and send it to info@flowveraarabia.com or +966 50 860 7349.</p>
      </div>}
    </section>
  );
}
