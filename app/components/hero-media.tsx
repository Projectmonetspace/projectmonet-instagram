"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export const HERO_VIDEO = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260813_092641_de52eb87-daf2-41db-92cb-7a56eae012a5.mp4";

const VIDEO_START_DELAY_MS = 12000;
const INTERACTION_EVENTS = ["pointerdown", "touchstart", "keydown", "scroll"] as const;

export default function HeroMedia() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let timer: number | undefined;
    let hasStarted = false;

    const revealVideo = () => {
      video.dataset.ready = "true";
    };

    const removeInteractionListeners = () => {
      for (const event of INTERACTION_EVENTS) window.removeEventListener(event, loadVideo);
    };

    const loadVideo = () => {
      if (hasStarted) return;
      hasStarted = true;
      if (timer) window.clearTimeout(timer);
      removeInteractionListeners();
      video.src = HERO_VIDEO;
      video.load();
      void video.play().catch(() => {
        // Muted autoplay can still be blocked by a browser or user setting.
        // The poster remains visible when that happens.
      });
    };

    const scheduleVideo = () => {
      timer = window.setTimeout(loadVideo, VIDEO_START_DELAY_MS);
    };

    video.addEventListener("playing", revealVideo, { once: true });
    for (const event of INTERACTION_EVENTS) {
      window.addEventListener(event, loadVideo, { once: true, passive: true });
    }

    if (document.readyState === "complete") scheduleVideo();
    else window.addEventListener("load", scheduleVideo, { once: true });

    return () => {
      window.removeEventListener("load", scheduleVideo);
      removeInteractionListeners();
      video.removeEventListener("playing", revealVideo);
      if (timer) window.clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <Image
        className="hero-poster"
        src="/media/hero-poster.webp"
        alt=""
        fill
        sizes="100vw"
        preload
        aria-hidden="true"
      />
      <video
        ref={videoRef}
        className="hero-video"
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
      />
    </>
  );
}
