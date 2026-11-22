"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import { services } from "@/lib/services";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { CheckCircle2, Mail, RefreshCw } from "lucide-react";

const subscribe = () => () => {};

export function EnquiryForm({ topic, demo = false }: { topic?: string; demo?: boolean }) {
  const [message, setMessage] = useState("");
  const ready = useSyncExternalStore(subscribe, () => true, () => false);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (message) {
      previewRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
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

    const sol = topic ?? value("solution");
    const nameVal = value("name");
    const phoneVal = value("phone");
    const emailVal = value("email");
    const companyVal = value("company") || "Not provided";
    const locVal = value("location");
    const reqVal = value("requirements");
    const dateVal = value("date");
    const timeVal = value("time");

    const formattedMessage = [
      `*FlowVera ${demo ? "Demo Request" : "Water Treatment Enquiry"}*`,
      `━━━━━━━━━━━━━━━━━━━━`,
      `*Solution / Product:* ${sol}`,
      `*Client Name:* ${nameVal}`,
      `*Phone / WhatsApp:* ${phoneVal}`,
      `*Email Address:* ${emailVal}`,
      `*Company:* ${companyVal}`,
      `*Project Location:* ${locVal}`,
      ...(demo ? [`*Preferred Date:* ${dateVal || "Flexible"}`, `*Preferred Time:* ${timeVal || "Please contact me to arrange"}`] : []),
      `━━━━━━━━━━━━━━━━━━━━`,
      `*Requirements & Scope:*`,
      reqVal,
      `━━━━━━━━━━━━━━━━━━━━`,
      `_Sent via FlowVera Arabia Portal_`
    ].join("\n");

    setMessage(formattedMessage);

    // Directly launch WhatsApp with pre-filled message
    const waUrl = `https://wa.me/966508607349?text=${encodeURIComponent(formattedMessage)}`;
    if (typeof window !== "undefined") {
      try {
        const opened = window.open(waUrl, "_blank");
        if (!opened || opened.closed || typeof opened.closed === "undefined") {
          // If popup blocked, direct location assignment as fallback
          window.location.href = waUrl;
        }
      } catch {
        window.location.href = waUrl;
      }
    }
  }

  const waUrl = `https://wa.me/966508607349?text=${encodeURIComponent(message)}`;
  const mailUrl = `mailto:info@flowveraarabia.com?subject=${encodeURIComponent(
    demo ? "FlowVera demo request" : `Enquiry: ${topic ?? "Water treatment solution"}`
  )}&body=${encodeURIComponent(message)}`;

  return (
    <section className="enquiry-panel" id="enquire" aria-labelledby="enquiry-title">
      <div className="enquiry-panel-header">
        <h2 id="enquiry-title">{demo ? "Request a Plant Demo" : "Enquire About This Solution"}</h2>
        <p className="enquiry-subtitle">
          Fill out the form below. When submitted, your enquiry will be sent directly to our engineering team on <strong>WhatsApp (+966 50 860 7349)</strong> for rapid assistance.
        </p>
      </div>

      <form onSubmit={prepareRequest} onChange={() => setMessage("")}>
        <fieldset disabled={!ready}>
          <legend className="sr-only">{demo ? "Demo request details" : "Enquiry details"}</legend>
          {topic ? (
            <p className="selected-solution">
              <strong>Selected Solution:</strong> <span>{topic}</span>
            </p>
          ) : (
            <label className="form-wide">
              Select Solution or Category
              <select name="solution" required defaultValue="">
                <option value="" disabled>Choose a product or service...</option>
                {services.map((s) => (
                  <option key={s.slug} value={s.title}>{s.title}</option>
                ))}
                <option value="Specialty Chemicals">Specialty Water Treatment Chemicals</option>
                <option value="Spare Parts & Instrumentation">Spare Parts &amp; Instrumentation</option>
                <option value="Industrial Tanks & Storage">Industrial Tanks &amp; Storage Solutions</option>
                <option value="Help Choosing a Solution">Help choosing a solution (General Advisory)</option>
              </select>
            </label>
          )}

          <label>
            Full Name *
            <input name="name" autoComplete="name" required maxLength={100} placeholder="e.g. Abdullah Al-Harbi" pattern={".*\\S.*"} />
          </label>

          <label>
            WhatsApp / Phone Number *
            <input name="phone" type="tel" autoComplete="tel" required maxLength={30} placeholder="+966 5X XXX XXXX" pattern={".*\\S.*"} />
          </label>

          <label>
            Email Address *
            <input name="email" type="email" autoComplete="email" required maxLength={254} placeholder="name@company.com" />
          </label>

          <label>
            Company Name (Optional)
            <input name="company" autoComplete="organization" maxLength={150} placeholder="e.g. Al-Madina Manufacturing" />
          </label>

          <label className="form-wide">
            Project Location (City / Region in Saudi Arabia) *
            <input name="location" required maxLength={150} placeholder="e.g. Riyadh, Dammam Industrial City, Jeddah" pattern={".*\\S.*"} />
          </label>

          {demo && (
            <>
              <label>
                Preferred Date (Optional)
                <input name="date" type="date" />
              </label>
              <label>
                Preferred Time (Optional)
                <input name="time" placeholder="e.g. 10:00 AM AST" maxLength={100} />
              </label>
            </>
          )}

          <label className="form-wide">
            Project Requirements &amp; Scope *
            <textarea
              name="requirements"
              required
              maxLength={2000}
              rows={4}
              onInput={(event) => event.currentTarget.setCustomValidity("")}
              placeholder={
                demo
                  ? "Tell us what you would like to discuss or see during the demo."
                  : "Share your water source, required capacity (m³/day), existing equipment, or specific spares/chemicals needed."
              }
            />
          </label>

          <p className="form-wide form-notice">
            Your details are sent directly to our verified WhatsApp line for immediate review. Read our <Link href="/privacy/">Privacy Policy</Link> for details.
          </p>

          <div className="form-wide form-submit-wrap">
            <button className="button button-primary whatsapp-submit-btn" type="submit">
              <WhatsAppIcon size={20} />
              <span>Send Enquiry via WhatsApp</span>
            </button>
          </div>
        </fieldset>
      </form>

      <noscript>
        <p>JavaScript is needed to prepare a request. Please message our WhatsApp at +966 50 860 7349 or email info@flowveraarabia.com instead.</p>
      </noscript>

      {message && (
        <div ref={previewRef} className="prepared-request whatsapp-success-box" role="status" tabIndex={-1}>
          <div className="whatsapp-sent-header">
            <CheckCircle2 size={28} className="success-icon" />
            <div>
              <h3>Enquiry Sent to WhatsApp!</h3>
              <p>Your enquiry has been prepared. If WhatsApp did not launch automatically, please click below to send it directly.</p>
            </div>
          </div>
          <pre>{message}</pre>
          <div className="request-actions">
            <a className="button button-primary whatsapp-launch-button" href={waUrl} target="_blank" rel="noreferrer">
              <WhatsAppIcon size={20} />
              Open WhatsApp Now
            </a>
            <a className="button button-secondary" href={mailUrl}>
              <Mail size={18} aria-hidden="true" />
              Send as Email Too
            </a>
            <button type="button" className="button button-secondary" onClick={() => setMessage("")}>
              <RefreshCw size={16} />
              Submit Another
            </button>
          </div>
          <p className="request-help-text">
            Direct WhatsApp line: <strong>+966 50 860 7349</strong> | Email: <strong>info@flowveraarabia.com</strong>
          </p>
        </div>
      )}
    </section>
  );
}
