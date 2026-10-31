import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ClientReelRail from "./client-reel-rail";

export default function ClientResults() {
  return <section id="client-results" className="client-results-section dark-section" aria-labelledby="client-results-title">
    <div className="page-shell proof-heading">
      <div><p className="eyebrow">Client Results / 001</p><h2 id="client-results-title">One follower.<br />Then millions of views.</h2></div>
      <div className="client-results-intro"><p>A literary audience before a book. We launched Rune Gibril from the ground up, with strategy first and zero ad spend.</p><Link className="text-link" href="/results/rune-gibril">Read the case study <ArrowRight aria-hidden="true" /></Link></div>
    </div>
    <dl className="client-results-stats page-shell">
      <div><dt>Account views</dt><dd>3.15M</dd></div>
      <div><dt>First Reel views</dt><dd>1.82M</dd></div>
      <div><dt>Followers</dt><dd>1 → 1,575</dd></div>
      <div><dt>Paid advertising</dt><dd>Zero</dd></div>
    </dl>
    <ClientReelRail />
    <div className="proof-disclosure page-shell client-results-source"><p>Rune Gibril · 31 Oct 2026 snapshots. Account views use the native 30-day dashboard; Reel counters use the supplied Apify export. Selected highlights; results vary by account.</p><Link href="/results">Explore results and evidence <ArrowRight aria-hidden="true" /></Link></div>
  </section>;
}
