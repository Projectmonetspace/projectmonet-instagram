"use client";

import { ArrowLeft, ArrowRight, Check, X } from "lucide-react";
import { createContext, ReactNode, RefObject, useContext, useEffect, useMemo, useRef, useState } from "react";
import {
  buildWeb3FormsPayload,
  FormKind,
  LeadValues,
  limits,
  getMeetingRoute,
  validateField,
  validateSubmission,
  WEB3FORMS_ENDPOINT,
} from "@/app/lib/forms";
import { getSubmissionContext } from "@/app/lib/attribution";
import { trackEvent } from "@/app/lib/analytics";
import { phoneCountries } from "@/app/lib/phone-countries";

type Step = {
  id: string;
  question: string;
  help?: string;
  type: "text" | "email" | "tel" | "textarea" | "choice" | "consent";
  options?: string[];
  optional?: boolean;
  autoComplete?: string;
  placeholder?: string;
  maxLength?: number;
};

const auditSteps: Step[] = [
  { id: "name", question: "What should we call you?", type: "text", autoComplete: "name", maxLength: limits.name },
  { id: "email", question: "What is your email?", type: "email", autoComplete: "email", maxLength: limits.email },
  { id: "phone", question: "What is your phone or WhatsApp number?", help: "Select the country and enter the number without its calling code.", type: "tel", autoComplete: "tel-national", maxLength: limits.phone },
  { id: "businessName", question: "What is the business or creator name?", type: "text", autoComplete: "organization", maxLength: limits.businessName },
  { id: "instagram", question: "What is the Instagram account?", help: "Enter an @handle or profile URL.", type: "text", placeholder: "@yourhandle", maxLength: limits.instagram },
  { id: "niche", question: "What does the business do?", help: "A short niche or category is enough.", type: "text", maxLength: limits.niche },
  { id: "goal", question: "What do you want Instagram to do for the business?", type: "choice", options: ["Grow the right audience", "Build authority", "Get more DMs / leads", "Get sales / bookings", "Improve content", "Not sure yet", "Other"] },
  { id: "resources", question: "What content or resources do you currently have?", help: "Tell us about footage, people, past content, or production support.", type: "textarea", maxLength: limits.medium },
  { id: "decisionMaker", question: "Are you the person who can approve this engagement?", type: "choice", options: ["Yes", "No", "Part of the decision"] },
  { id: "managementBudget", question: "If the audit shows a strong fit, are you open to ongoing Instagram management from $1,000/month?", type: "choice", options: ["Yes", "Maybe", "No"] },
  { id: "message", question: "Anything else we should know?", type: "textarea", optional: true, maxLength: limits.message },
  { id: "consent", question: "Can we use these details to review and respond to your request?", help: "We use your answers only to assess the account and contact you about this request.", type: "consent" },
];

const meetingSteps: Step[] = [
  { id: "name", question: "What should we call you?", type: "text", autoComplete: "name", maxLength: limits.name },
  { id: "email", question: "What is your work email?", type: "email", autoComplete: "email", maxLength: limits.email },
  { id: "role", question: "Which best describes you?", type: "choice", options: ["Founder or owner", "Creator or author", "Marketing lead or team member", "Agency representing a client", "Other"] },
  { id: "businessName", question: "What is your business, brand, or project called?", type: "text", autoComplete: "organization", maxLength: limits.businessName },
  { id: "accountStatus", question: "Is your Instagram account live?", type: "choice", options: ["We have an Instagram account", "We haven't launched yet"] },
  { id: "instagram", question: "What is your Instagram account?", help: "Enter an @handle or profile URL.", type: "text", placeholder: "@yourhandle", maxLength: limits.instagram },
  { id: "website", question: "Do you have a website?", help: "Optional. Leave this blank if you don't have one.", type: "text", optional: true, autoComplete: "url", maxLength: limits.short },
  { id: "offer", question: "What do you offer, and who do you want to reach?", help: "A short description of your business, book, or project is enough.", type: "textarea", maxLength: limits.medium },
  { id: "service", question: "What are you looking for?", type: "choice", options: ["Ongoing Instagram management", "Viral Mandate", "Help choosing between those", "One-off work", "Help with other platforms"] },
  { id: "goal", question: "What would you most like Instagram to achieve?", type: "choice", options: ["Relevant audience growth", "Recognition or authority", "DMs or leads", "Sales or bookings", "Audience for an upcoming launch", "Other"] },
  { id: "budget", question: "What monthly service budget can you commit to?", help: "Standard Management starts at $1,000/month. Viral Mandate starts at $2,500/month.", type: "choice", options: ["Under $1,000", "$1,000–$2,499", "$2,500+", "Unsure"] },
  { id: "timeline", question: "When are you looking to choose someone and begin?", type: "choice", options: ["Now or within 30 days", "Within 1–3 months and choosing now", "Later", "Just researching"] },
  { id: "decisionMaker", question: "Can you approve the engagement?", type: "choice", options: ["Yes", "I'm part of the decision and can bring the approver", "No"] },
  { id: "resourcesReady", question: "Can you provide business information, content inputs, and timely approvals?", type: "choice", options: ["Yes", "Yes, with a little planning", "No"] },
  { id: "message", question: "Anything we should know before a call?", type: "textarea", optional: true, maxLength: limits.message },
  { id: "consent", question: "May we use these details to assess and respond to your enquiry?", type: "consent" },
];

const viralSteps: Step[] = [
  { id: "name", question: "What should we call you?", type: "text", autoComplete: "name", maxLength: limits.name },
  { id: "email", question: "What is your email?", type: "email", autoComplete: "email", maxLength: limits.email },
  { id: "businessName", question: "What is the business or creator name?", type: "text", autoComplete: "organization", maxLength: limits.businessName },
  { id: "instagram", question: "What is the Instagram account?", help: "Enter an @handle or profile URL.", type: "text", placeholder: "@yourhandle", maxLength: limits.instagram },
  { id: "niche", question: "What industry or niche is it in?", type: "text", maxLength: limits.niche },
  { id: "followers", question: "How many followers does the account currently have?", help: "An approximate number is fine.", type: "text", maxLength: limits.short },
  { id: "normalReel", question: "What does a normal Reel usually get?", help: "Approximate views or reach is fine.", type: "text", maxLength: limits.short },
  { id: "goal", question: "What is your main goal?", type: "choice", options: ["Relevant reach", "Authority", "Followers", "DMs / Leads", "Sales / Bookings", "Other"] },
  { id: "spokesperson", question: "Can a founder, expert, or spokesperson appear in content if the strategy requires it?", type: "choice", options: ["Yes", "Sometimes", "No"] },
  { id: "resourcesReady", question: "Can you consistently provide footage, information, access, and approvals when needed?", type: "choice", options: ["Yes", "Usually", "No"] },
  { id: "artificialGrowth", question: "Has the account ever used artificial growth methods?", help: "This includes bought followers or views, engagement pods, or automated engagement.", type: "choice", options: ["No", "Yes", "Unsure"] },
  { id: "creativeControl", question: "Are you willing to give Project Monet final creative control inside agreed boundaries?", help: "You approve brand, factual, legal, safety, and off-limit boundaries first. Inside them, Project Monet decides hooks, concepts, formats, pacing, editing, packaging, trends, and testing.", type: "choice", options: ["Yes", "I need to understand this better", "No"] },
  { id: "subjectiveRevisions", question: "Are you willing to avoid routine subjective revisions after those boundaries are approved?", type: "choice", options: ["Yes", "Unsure", "No"] },
  { id: "cadence", question: "Can you maintain the publishing and testing cadence we agree on for six months?", type: "choice", options: ["Yes", "Unsure", "No"] },
  { id: "budget", question: "If the account qualifies, is a budget from $2,500/month realistic for you?", help: "Viral Mandate uses a six-month contract.", type: "choice", options: ["Yes", "Need to discuss", "No"] },
  { id: "targetUnderstanding", question: "Do you understand that any viral-reach target is agreed in writing for the specific account?", type: "choice", options: ["Yes", "Need clarification"] },
  { id: "message", question: "Anything else we should know?", type: "textarea", optional: true, maxLength: limits.message },
  { id: "consent", question: "Can we use these details to assess and respond to your application?", help: "Submission does not promise acceptance. Every application goes to human review.", type: "consent" },
];

const artificialGrowthDetails: Step = {
  id: "artificialGrowthDetails",
  question: "Tell us what was used.",
  help: "This is optional. Honest context helps us assess account health.",
  type: "textarea",
  optional: true,
  maxLength: limits.medium,
};

type ModalContext = { openForm: (kind: FormKind, trigger?: HTMLElement | null, location?: string) => void };
const LeadModalContext = createContext<ModalContext | null>(null);

export function useLeadForm() {
  const value = useContext(LeadModalContext);
  if (!value) throw new Error("useLeadForm must be used within LeadFormProvider");
  return value;
}

export function LeadFormTrigger({ kind, location, className, children }: { kind: FormKind; location: string; className?: string; children: ReactNode }) {
  const { openForm } = useLeadForm();
  return <button type="button" className={className} onClick={(event) => openForm(kind, event.currentTarget, location)}>{children}</button>;
}

const focusableSelector = "button:not([disabled]), input:not([disabled]):not([type='hidden']), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex='-1'])";

export default function LeadFormProvider({ children }: { children: ReactNode }) {
  const [kind, setKind] = useState<FormKind | null>(null);
  const [session, setSession] = useState(0);
  const pageRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  function openForm(nextKind: FormKind, trigger?: HTMLElement | null, location = "unknown") {
    returnFocusRef.current = trigger ?? (document.activeElement as HTMLElement | null);
    setSession((value) => value + 1);
    setKind(nextKind);
    trackEvent(nextKind === "audit" ? "audit_request_click" : nextKind === "viral" ? "viral_mandate_qualification_click" : "meeting_qualification_click", { location });
  }

  function closeForm() { setKind(null); }

  useEffect(() => {
    const page = pageRef.current as (HTMLDivElement & { inert: boolean }) | null;
    if (page) page.inert = Boolean(kind);
    if (!kind) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const frame = requestAnimationFrame(() => closeRef.current?.focus());

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") { event.preventDefault(); closeForm(); return; }
      if (event.key !== "Tab" || !panelRef.current) return;
      const focusable = Array.from(panelRef.current.querySelectorAll<HTMLElement>(focusableSelector));
      if (!focusable.length) { event.preventDefault(); panelRef.current.focus(); return; }
      const [first] = focusable;
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => {
      cancelAnimationFrame(frame);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [kind]);

  useEffect(() => {
    if (!kind && returnFocusRef.current) {
      returnFocusRef.current.focus();
      returnFocusRef.current = null;
    }
  }, [kind]);

  return (
    <LeadModalContext.Provider value={{ openForm }}>
      <div ref={pageRef} aria-hidden={kind ? "true" : undefined}>{children}</div>
      {kind && (
        <div className="modal-layer" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) closeForm(); }}>
          <div ref={panelRef} className="modal-panel" role="dialog" aria-modal="true" aria-labelledby="lead-modal-title" tabIndex={-1}>
            <button ref={closeRef} className="modal-close" type="button" onClick={closeForm} aria-label="Close form"><X aria-hidden="true" /></button>
            <FormWizard key={`${kind}-${session}`} kind={kind} onClose={closeForm} />
          </div>
        </div>
      )}
    </LeadModalContext.Provider>
  );
}

function FormWizard({ kind, onClose }: { kind: FormKind; onClose: () => void }) {
  const { openForm } = useLeadForm();
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [values, setValues] = useState<LeadValues>({ consent: false, botcheck: "" });
  const [error, setError] = useState("");
  const [status, setStatus] = useState<"editing" | "submitting" | "success">("editing");
  const [submitError, setSubmitError] = useState("");
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(null);

  const steps = useMemo(() => {
    if (kind === "audit") return auditSteps;
    if (kind === "meeting") return meetingSteps.filter((item) => item.id !== "instagram" || values.accountStatus === "We have an Instagram account");
    const list = [...viralSteps];
    if (values.artificialGrowth === "Yes") list.splice(11, 0, artificialGrowthDetails);
    return list;
  }, [kind, values.artificialGrowth, values.accountStatus]);

  const step = steps[index];

  useEffect(() => {
    if (started && status === "editing") requestAnimationFrame(() => inputRef.current?.focus());
  }, [index, started, status]);

  function update(value: string | boolean) {
    setValues((current) => ({ ...current, [step.id]: value }));
    setError("");
  }

  function updatePhoneCountry(selection: string) {
    const country = phoneCountries.find(({ iso, dial }) => `${iso}:${dial}` === selection);
    setValues((current) => ({
      ...current,
      phoneCountry: country?.name ?? "",
      phoneCountryIso: country?.iso ?? "",
      phoneCountryCode: country?.dial ?? "",
      phone: country ? `${country.dial}${String(current.phoneLocal ?? "").replace(/\D/g, "")}` : "",
    }));
    setError("");
  }

  function updatePhoneLocal(value: string) {
    const dial = String(values.phoneCountryCode ?? "");
    const digits = value.replace(/\D/g, "");
    const local = value.trim().startsWith("+") && digits.startsWith(dial.replace(/\D/g, ""))
      ? digits.slice(dial.replace(/\D/g, "").length)
      : value;
    setValues((current) => ({ ...current, phoneLocal: local, phone: dial ? `${dial}${local.replace(/\D/g, "")}` : "" }));
    setError("");
  }

  async function next() {
    if (step.id === "phone" && (!values.phoneCountry || !values.phoneCountryCode)) {
      setError("Select your country and calling code.");
      return;
    }
    if (step.id === "phone" && String(values.phoneLocal ?? "").trim().startsWith("+")) {
      setError("Enter the number without a calling code, or choose its country above.");
      return;
    }
    const fieldError = step.optional ? "" : validateField(step.id, values[step.id] ?? "");
    if (fieldError) { setError(fieldError); return; }
    if (index < steps.length - 1) { setIndex((value) => value + 1); return; }

    const errors = validateSubmission(kind, values);
    if (Object.keys(errors).length) {
      const firstInvalid = steps.findIndex((item) => errors[item.id]);
      if (firstInvalid >= 0) setIndex(firstInvalid);
      setError(errors.form ?? errors[steps[firstInvalid]?.id] ?? "Please review your answers.");
      return;
    }

    setStatus("submitting");
    setSubmitError("");
    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(buildWeb3FormsPayload(kind, values, getSubmissionContext())),
      });
      const result = await response.json() as { success?: boolean };
      if (!response.ok || !result.success) throw new Error("Provider rejected submission");
      setStatus("success");
      trackEvent(kind === "audit" ? "audit_submit_success" : kind === "viral" ? "viral_application_submit_success" : "meeting_qualification_submit_success", { form_type: kind, ...(kind === "meeting" ? { route: getMeetingRoute(values) } : {}) });
    } catch {
      setStatus("editing");
      setSubmitError("We could not send this right now. Please try again or use the Email Project Monet link in the footer.");
    }
  }

  if (status === "success") {
    if (kind === "meeting") {
      const route = getMeetingRoute(values);
      const hasAccount = values.accountStatus === "We have an Instagram account";
      const content = route === "qualified"
        ? { eyebrow: "Meeting qualified", title: "Let's talk about your Instagram plans.", body: "Based on your answers, a meeting looks like a useful next step. We'll review your account and goals together. This screen does not confirm Viral Mandate eligibility or promise an engagement." }
        : route === "audit"
          ? { eyebrow: "Start with an audit", title: "Start with a clearer view of your account.", body: "A meeting may be premature for where you are today. Request a Free Instagram Audit and we'll review the account, identify the clearest opportunities, and recommend a sensible next step." }
          : !hasAccount
            ? { eyebrow: "Tell us what you're building", title: "Let's start by email.", body: "The free audit reviews an existing Instagram presence. Tell us about your project and launch plans and we'll suggest a next step." }
            : { eyebrow: "Have a question before booking?", title: "Let's start by email.", body: "Tell us about your project, budget or timing, and what you need help deciding. We'll respond by email and suggest the right next step." };
      return (
        <div className="wizard-success" role="status" aria-live="polite">
          <span className="success-mark" aria-hidden="true"><Check /></span>
          <p className="eyebrow">{content.eyebrow}</p>
          <h2 id="lead-modal-title">{content.title}</h2>
          <p>{content.body}</p>
          {route === "qualified" ? (
            <a className="button button-orange" href="https://cal.com/projectmonet/30min" target="_blank" rel="noopener noreferrer">Book a 30-minute meeting <ArrowRight aria-hidden="true" /></a>
          ) : route === "audit" ? (
            <button className="button button-orange" type="button" onClick={() => openForm("audit", null, "meeting_not_qualified")}>Get a Free Instagram Audit <ArrowRight aria-hidden="true" /></button>
          ) : (
            <a className="button button-orange" href="mailto:contact@projectmonet.com?subject=Instagram%20enquiry">Email Project Monet <ArrowRight aria-hidden="true" /></a>
          )}
        </div>
      );
    }
    return (
      <div className="wizard-success" role="status" aria-live="polite">
        <span className="success-mark" aria-hidden="true"><Check /></span>
        <p className="eyebrow">Received</p>
        <h2 id="lead-modal-title">{kind === "audit" ? "Your audit request is in." : "Your Viral Mandate application is in."}</h2>
        <p>{kind === "audit" ? "We will review your Instagram presence and send the clearest opportunities we see." : "We will review your account and answers. If Viral Mandate is not the right fit, Standard Management may still be."}</p>
        <button className="button button-orange" type="button" onClick={onClose}>Close</button>
      </div>
    );
  }

  if (!started) {
    return (
      <div className="wizard-intro">
        <p className="eyebrow">{kind === "audit" ? "Free Instagram Audit" : kind === "viral" ? "Qualification required" : "Book a conversation"}</p>
        <h2 id="lead-modal-title">{kind === "audit" ? "Free Instagram Audit" : kind === "viral" ? "See if Viral Mandate fits your account." : "Book a conversation with Project Monet."}</h2>
        <p>{kind === "audit" ? "Answer a few questions so we can understand the account before we review it." : kind === "viral" ? "Viral Mandate is a six-month performance-led engagement. It starts at $2,500/month and requires more creative freedom than Standard Management." : "Tell us a little about your project first. If ongoing Instagram work looks like a fit, you can choose a 30-minute meeting. Standard Management starts at $1,000/month; Viral Mandate starts at $2,500/month and has separate qualification requirements."}</p>
        <button className="button button-orange" type="button" onClick={() => setStarted(true)}>{kind === "meeting" ? "Check meeting fit" : "Start"} <ArrowRight aria-hidden="true" /></button>
      </div>
    );
  }

  const progress = ((index + 1) / steps.length) * 100;
  return (
    <div className="wizard-shell">
      <div className="wizard-progress" aria-label={`Step ${index + 1} of ${steps.length}`}><span style={{ width: `${progress}%` }} /></div>
      <div className="wizard-step">
        <p className="step-count">Step {index + 1} of {steps.length}</p>
        {step.type === "choice" ? (
          <fieldset>
            <legend id="lead-modal-title">{step.question}</legend>
            {step.help && <p className="step-help">{step.help}</p>}
            <div className="choice-grid">
              {step.options?.map((option) => (
                <button key={option} type="button" className={`choice-button ${values[step.id] === option ? "is-selected" : ""}`} onClick={() => update(option)} aria-pressed={values[step.id] === option}>
                  <span>{option}</span>{values[step.id] === option && <Check aria-hidden="true" />}
                </button>
              ))}
            </div>
          </fieldset>
        ) : step.type === "consent" ? (
          <fieldset>
            <legend id="lead-modal-title">{step.question}</legend>
            {step.help && <p className="step-help">{step.help}</p>}
            <label className="consent-choice">
              <input ref={inputRef as RefObject<HTMLInputElement>} type="checkbox" checked={values.consent === true} onChange={(event) => update(event.target.checked)} />
              <span>I consent to Project Monet processing these details for this request.</span>
            </label>
          </fieldset>
        ) : step.id === "phone" && kind === "audit" ? (
          <div className="question-label">
            <span id="lead-modal-title">{step.question}</span>
            {step.help && <small>{step.help}</small>}
            <div className="phone-fields">
              <div>
                <label htmlFor="field-phone-country">Country and calling code</label>
                <select
                  ref={inputRef as RefObject<HTMLSelectElement>}
                  id="field-phone-country"
                  value={values.phoneCountryIso && values.phoneCountryCode ? `${values.phoneCountryIso}:${values.phoneCountryCode}` : ""}
                  onChange={(event) => updatePhoneCountry(event.target.value)}
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? "step-error" : undefined}
                >
                  <option value="">Select country</option>
                  {phoneCountries.map(({ iso, name, dial }) => <option key={`${iso}:${dial}`} value={`${iso}:${dial}`}>{name} ({dial})</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="field-phone">Phone / WhatsApp number</label>
                <input
                  id="field-phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel-national"
                  value={String(values.phoneLocal ?? "")}
                  onChange={(event) => updatePhoneLocal(event.target.value)}
                  maxLength={step.maxLength}
                  placeholder="Phone number"
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? "step-error" : undefined}
                  onKeyDown={(event) => { if (event.key === "Enter") { event.preventDefault(); void next(); } }}
                />
              </div>
            </div>
          </div>
        ) : (
          <label className="question-label" htmlFor={`field-${step.id}`}>
            <span id="lead-modal-title">{step.question}</span>
            {step.help && <small>{step.help}</small>}
            {step.type === "textarea" ? (
              <textarea ref={inputRef as RefObject<HTMLTextAreaElement>} id={`field-${step.id}`} value={String(values[step.id] ?? "")} onChange={(event) => update(event.target.value)} maxLength={step.maxLength} rows={5} placeholder={step.placeholder} aria-invalid={Boolean(error)} aria-describedby={error ? "step-error" : undefined} />
            ) : (
              <input ref={inputRef as RefObject<HTMLInputElement>} id={`field-${step.id}`} type={step.type} value={String(values[step.id] ?? "")} onChange={(event) => update(event.target.value)} maxLength={step.maxLength} autoComplete={step.autoComplete} placeholder={step.placeholder} autoCapitalize={step.id === "instagram" ? "none" : undefined} spellCheck={step.id !== "instagram"} aria-invalid={Boolean(error)} aria-describedby={error ? "step-error" : undefined} onKeyDown={(event) => { if (event.key === "Enter") { event.preventDefault(); void next(); } }} />
            )}
          </label>
        )}
        <div className="honeypot" aria-hidden="true"><label>Leave empty<input tabIndex={-1} autoComplete="off" value={String(values.botcheck ?? "")} onChange={(event) => setValues((current) => ({ ...current, botcheck: event.target.value }))} /></label></div>
        <div id="step-error" className="wizard-message" aria-live="polite">{error || submitError}</div>
      </div>
      <div className="wizard-controls">
        <button className="wizard-back" type="button" onClick={() => index === 0 ? setStarted(false) : setIndex((value) => value - 1)}><ArrowLeft aria-hidden="true" /> Back</button>
        <button className="button button-orange" type="button" disabled={status === "submitting"} onClick={() => void next()}>{status === "submitting" ? "Sending…" : index === steps.length - 1 ? "Submit" : "Next"}<ArrowRight aria-hidden="true" /></button>
      </div>
    </div>
  );
}
