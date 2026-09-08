"use client";

import { useEffect } from "react";
import { captureFirstTouchAttribution } from "@/app/lib/attribution";

export default function AttributionCapture() {
  useEffect(() => {
    captureFirstTouchAttribution();
  }, []);

  return null;
}
