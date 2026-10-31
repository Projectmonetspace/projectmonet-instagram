import Image from "next/image";
import { evidence, resultMedia } from "@/app/lib/client-results";

export default function ResultEvidence({ ids }: { ids: string[] }) {
  return <div className={`result-evidence-grid${ids.length === 1 ? " result-evidence-single" : ""}`}>
    {ids.map(id => { const item = evidence[id]; return <figure key={id}>
      <a href={`${resultMedia}/${item.file}.webp`} target="_blank" rel="noopener noreferrer" aria-label={`Open full screenshot: ${item.alt}`}><Image src={`${resultMedia}/${item.file}.webp`} alt={item.alt} width={item.width} height={item.height} sizes="(max-width: 767px) 90vw, 420px" loading="lazy" unoptimized /></a>
      <figcaption>{item.caption} <span>Open image to inspect.</span></figcaption>
    </figure>; })}
  </div>;
}
