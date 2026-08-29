export type ReelProof = {
  id: string;
  account: "Sl6Dl7" | "Poetrynyx" | "Team";
  proofType: "Founder Result" | "Co-founder Result" | "Aggregate Team Result";
  videoSrc?: string;
  posterSrc?: string;
  verifiedMetric?: string;
  description: string;
};

export const reelProof: ReelProof[] = [];
const placeholders = Array.from({ length: 7 }, (_, index) => index);

export default function ReelRail() {
  return (
    <div className="reel-viewport" aria-label="Founder and team Reel proof placeholders">
      <div className="reel-track" aria-hidden="true">
        {[...placeholders, ...placeholders].map((item, index) => (
          <div className="reel-card" key={`${item}-${index}`}>
            <span className="reel-number">{String((item % placeholders.length) + 1).padStart(2, "0")}</span>
            <div className="reel-lines"><i /><i /><i /></div>
          </div>
        ))}
      </div>
    </div>
  );
}
