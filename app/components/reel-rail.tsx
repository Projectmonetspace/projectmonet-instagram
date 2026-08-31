import Image from "next/image";
import { reelProof, type ReelProof } from "@/app/lib/reel-proof";

function ReelCard({ reel, duplicate = false }: { reel: ReelProof; duplicate?: boolean }) {
  const metrics = `${reel.views} views${reel.likes ? ` · ${reel.likes} likes` : ""}`;
  const accessibleLabel = `Open ${reel.handle} Instagram Reel with ${reel.views} views${reel.likes ? ` and ${reel.likes} likes` : ""} in a new tab`;

  return (
    <a
      className="reel-card"
      href={reel.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={duplicate ? undefined : accessibleLabel}
      aria-hidden={duplicate || undefined}
      tabIndex={duplicate ? -1 : undefined}
    >
      <Image
        src={reel.thumbnail}
        alt={duplicate ? "" : `Instagram Reel cover from ${reel.handle} with ${reel.views} views`}
        fill
        sizes="(max-width: 767px) 220px, (max-width: 1688px) 18vw, 304px"
        loading="lazy"
        draggable={false}
      />
      <span className="reel-proof-type">{reel.label}</span>
      <span className="reel-card-copy">
        <strong>{reel.handle}</strong>
        <span>{metrics}</span>
      </span>
    </a>
  );
}

export default function ReelRail() {
  return (
    <div className="reel-viewport" aria-label="Verified founder and team Instagram Reel results">
      <div className="reel-track">
        {reelProof.map((reel) => <ReelCard key={reel.shortcode} reel={reel} />)}
        {reelProof.map((reel) => <ReelCard key={`${reel.shortcode}-duplicate`} reel={reel} duplicate />)}
      </div>
    </div>
  );
}
