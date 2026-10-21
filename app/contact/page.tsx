import Link from "next/link";
import { BreadcrumbSchema, PageHero, SiteFooter } from "@/app/components/page-framework";
import { serializeJsonLd } from "@/app/lib/json-ld";
import { absoluteUrl, pageMetadata } from "@/app/lib/site";

const path = "/contact";
const email = "contact@projectmonet.com";
const phone = "+91 82900 96163";

export const metadata = pageMetadata({
  title: "Contact Project Monet | Instagram Services & Support",
  description: "Contact Project Monet about Instagram services, current projects, payments or privacy. Email contact@projectmonet.com or call +91 82900 96163.",
  path,
});

export default function Page() {
  const crumbs = [{ label: "Home", href: "/" }, { label: "Contact", href: path }];
  const schema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Project Monet",
    url: absoluteUrl(path),
    mainEntity: {
      "@type": "Organization",
      name: "Project Monet",
      url: absoluteUrl("/"),
      email,
      telephone: "+918290096163",
    },
  };

  return (
    <>
      <main>
        <PageHero
          eyebrow="Contact Project Monet"
          title="Contact"
          intro="Talk to Project Monet about an Instagram enquiry, an active project, a payment, or our website policies."
          path={path}
          currentLabel="Contact"
          showPrimary={false}
        >
          <a className="button button-orange" href={`mailto:${email}`}>Email Project Monet</a>
          <a className="button button-outline" href="tel:+918290096163">Call Project Monet</a>
        </PageHero>

        <section className="legal-page warm-section" aria-label="Contact details">
          <div className="legal-shell">
            <section>
              <div><span>01</span><h2>Business contact</h2></div>
              <div>
                <p>Email: <a href={`mailto:${email}`}>{email}</a></p>
                <p>Phone: <a href="tel:+918290096163">{phone}</a></p>
                <p>Website: <a href="https://www.projectmonet.com">www.projectmonet.com</a></p>
              </div>
            </section>
            <section>
              <div><span>02</span><h2>Service area</h2></div>
              <div><p>Project Monet is an India-based, online-first Instagram agency serving businesses and creators in India and internationally. Enquiries, meetings, approvals, and service delivery are generally handled digitally.</p></div>
            </section>
            <section>
              <div><span>03</span><h2>New enquiries</h2></div>
              <div><p>For an account review, start with the <Link href="/instagram-audit">Free Instagram Audit</Link>. Include your business name, Instagram account, contact details, and goals so we can assess your request.</p></div>
            </section>
            <section>
              <div><span>04</span><h2>Project, payment, or policy support</h2></div>
              <div><p>For an active project, payment question, cancellation request, delivery issue, or privacy question, email us from the address associated with your enquiry or project. Include your name, business name, and any relevant project or payment reference.</p></div>
            </section>
            <section>
              <div><span>05</span><h2>Response</h2></div>
              <div><p>We aim to acknowledge genuine business enquiries within two business days. Complex project, refund, privacy, or account-access requests may require additional verification and review.</p></div>
            </section>
            <nav className="legal-links" aria-label="Related policies">
              <Link href="/privacy">Privacy Policy</Link>
              <Link href="/terms">Website Terms</Link>
              <Link href="/audit-terms">Free Audit Terms</Link>
            </nav>
          </div>
        </section>
      </main>
      <SiteFooter />
      <BreadcrumbSchema items={crumbs} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }} />
    </>
  );
}
