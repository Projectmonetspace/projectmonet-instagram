import SiteHeader from "./site-header";
import { LeadFormTrigger } from "./lead-form-modal";
import HeroMedia from "./hero-media";

const bars = [22, 38, 54, 41, 31, 16, 8, 18, 74, 63, 87, 74, 64, 48, 34, 88, 8, 13, 20, 48, 69, 92];

export default function Hero() {
  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <HeroMedia />
      <div className="hero-shade" aria-hidden="true" />
      <div className="hero-content">
        <SiteHeader />
        <div className="hero-row page-shell">
          <div className="hero-copy">
            <p className="hero-eyebrow animate-up">Creator-Led Instagram Marketing Agency</p>
            <h1 id="hero-title" className="animate-up delay-1">Build an Instagram presence people remember — and act on.</h1>
            <p className="hero-subhead animate-up delay-2">Project Monet plans, creates, and manages Instagram for founders and businesses.</p>
            <p className="hero-detail animate-up delay-2">We build the profile, content, and system that turns attention into growth, trust, DMs, leads, and demand. Remote. Working with founders and businesses worldwide.</p>
            <div className="hero-actions animate-up delay-3">
              <LeadFormTrigger kind="audit" location="hero" className="button button-light">Get a Free Instagram Audit</LeadFormTrigger>
              <a className="button button-outline" href="#results">See Results</a>
            </div>
            <p className="trust-line animate-up delay-3">Instagram only. Creator-led. Strategy before posting.</p>
          </div>
          <aside className="hero-proof animate-scale" aria-label="Founder and creator track record">
            <p className="hero-proof-label">Founder / Creator Track Record</p>
            <div className="proof-primary"><strong>35M+</strong><span>Organic views</span></div>
            <div className="proof-people"><span>Sl6Dl7 · 102K</span><span>Poetrynyx · 200K</span></div>
            <p className="proof-note">5+ original trend formats</p>
            <div className="proof-bars" aria-hidden="true">{bars.map((height, index) => <i key={`${height}-${index}`} style={{ height: `${height}%`, animationDelay: `${900 + index * 35}ms` }} />)}</div>
            <p className="proof-disclaimer">Founder/team creator experience. Not client results.</p>
          </aside>
        </div>
      </div>
    </section>
  );
}
