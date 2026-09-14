"use client";

import type { AnchorHTMLAttributes, MouseEvent } from "react";
import { trackEvent } from "@/app/lib/analytics";

const fallbackContactPath = "/instagram-audit";

export default function SafeEmailLink({ children = "Email Project Monet", location, ...props }: Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "onClick"> & { location: string }) {
  const openEmail = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    trackEvent("click_to_email", { location });
    const address = ["contact", "projectmonet.com"].join("@");
    window.location.href = `mailto:${address}`;
  };

  return <a {...props} href={fallbackContactPath} onClick={openEmail}>{children}</a>;
}
