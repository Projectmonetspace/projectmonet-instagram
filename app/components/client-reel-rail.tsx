import { clientReels } from "@/app/lib/client-results";
import { ReelCard } from "./reel-rail";

export default function ClientReelRail() {
  return <div className="client-reel-rail">
    <div className="client-reel-controls page-shell"><span>Four selected Reels · @runegibril</span><details className="client-motion-control"><summary aria-controls="client-reel-track"><span className="client-motion-pause">Pause Reel motion</span><span className="client-motion-resume">Resume Reel motion</span></summary></details></div>
    <div className="reel-viewport client-reel-viewport" aria-label="Selected Project Monet client Instagram Reel results">
      <div id="client-reel-track" className="client-reel-track">
        <div className="client-reel-group">{clientReels.map(reel => <ReelCard key={reel.shortcode} reel={reel} />)}{clientReels.map(reel => <ReelCard key={`${reel.shortcode}-fill`} reel={reel} duplicate />)}</div>
        <div className="client-reel-group" aria-hidden="true">{[0, 1].flatMap(copy => clientReels.map(reel => <ReelCard key={`${reel.shortcode}-${copy}`} reel={reel} duplicate />))}</div>
      </div>
    </div>
  </div>;
}
