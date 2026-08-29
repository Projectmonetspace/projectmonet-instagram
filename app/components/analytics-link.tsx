"use client";

import { AnchorHTMLAttributes } from "react";
import { AnalyticsEvent, trackEvent } from "@/app/lib/analytics";

export default function AnalyticsLink({ event, location, ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & { event: AnalyticsEvent; location: string }) {
  return <a {...props} onClick={(click) => { props.onClick?.(click); trackEvent(event, { location }); }} />;
}
