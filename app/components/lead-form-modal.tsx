"use client";

import { ArrowLeft, ArrowRight, Check, X } from "lucide-react";
import { createContext, ReactNode, RefObject, useContext, useEffect, useMemo, useRef, useState } from "react";
import {
  buildWeb3FormsPayload,
  FormKind,
  getSubmissionContext,
  LeadValues,
  limits,
  validateField,
  validateSubmission,
  WEB3FORMS_ENDPOINT,
} from "@/app/lib/forms";
import { trackEvent } from "@/app/lib/analytics";

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
  { id: "phone", question: "What is your phone or WhatsApp number?", type: "tel", autoComplete: "tel", maxLength: limits.phone },
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

const focusableSelector = "button:not([disabled]), input:not([disabled]):not([type='hidden']), textarea:not([disabled]), [tabindex]:not([tabindex='-1'])";

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
    trackEvent(nextKind === "audit" ? "audit_request_click" : "viral_mandate_qualification_click", { location });
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
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [values, setValues] = useState<LeadValues>({ consent: false, botcheck: "" });
  const [error, setError] = useState("");
  const [status, setStatus] = useState<"editing" | "submitting" | "success">("editing");
  const [submitError, setSubmitError] = useState("");
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  const steps = useMemo(() => {
    if (kind === "audit") return auditSteps;
    const list = [...viralSteps];
    if (values.artificialGrowth === "Yes") list.splice(11, 0, artificialGrowthDetails);
    return list;
  }, [kind, values.artificialGrowth]);

  const step = steps[index];

  useEffect(() => {
    if (started && status === "editing") requestAnimationFrame(() => inputRef.current?.focus());
  }, [index, started, status]);

  function update(value: string | boolean) {
    setValues((current) => ({ ...current, [step.id]: value }));
    setError("");
  }

  async function next() {
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
      trackEvent(kind === "audit" ? "audit_submit_success" : "viral_application_submit_success", { form_type: kind });
    } catch {
      setStatus("editing");
      setSubmitError("We could not send this right now. Please try again or email contact@projectmonet.com.");
    }
  }

  if (status === "success") {
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
        <p className="eyebrow">{kind === "audit" ? "Free Instagram Audit" : "Qualification required"}</p>
        <h2 id="lead-modal-title">{kind === "audit" ? "Free Instagram Audit" : "See if Viral Mandate fits your account."}</h2>
        <p>{kind === "audit" ? "Answer a few questions so we can understand the account before we review it." : "Viral Mandate is a six-month performance-led engagement. It starts at $2,500/month and requires more creative freedom than Standard Management."}</p>
        <button className="button button-orange" type="button" onClick={() => setStarted(true)}>Start <ArrowRight aria-hidden="true" /></button>
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
