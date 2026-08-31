"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export const HERO_VIDEO = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260813_092641_de52eb87-daf2-41db-92cb-7a56eae012a5.mp4";

const VIDEO_START_DELAY_MS = 1200;

export default function HeroMedia() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let timer: number | undefined;

    const revealVideo = () => {
      video.dataset.ready = "true";
    };

    const startVideo = () => {
      timer = window.setTimeout(() => {
        video.src = HERO_VIDEO;
        video.load();
        void video.play().catch(() => {
          // Muted autoplay can still be blocked by a browser or user setting.
          // The poster remains visible when that happens.
        });
      }, VIDEO_START_DELAY_MS);
    };

    video.addEventListener("playing", revealVideo, { once: true });

    if (document.readyState === "complete") startVideo();
    else window.addEventListener("load", startVideo, { once: true });

    return () => {
      window.removeEventListener("load", startVideo);
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
