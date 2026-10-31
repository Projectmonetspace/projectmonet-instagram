import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ClientReelRail from "./client-reel-rail";

export default function ClientResults() {
  return <section id="client-results" className="client-results-section dark-section" aria-labelledby="client-results-title">
    <ClientReelRail />
    <div className="page-shell client-results-cta"><Link className="button button-outline" href="/results/rune-gibril">View case study <ArrowRight aria-hidden="true" /></Link></div>
  </section>;
}
