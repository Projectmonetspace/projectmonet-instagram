import type { Metadata } from "next";
import { Inter } from "next/font/google";
import LeadFormProvider from "./components/lead-form-modal";
import { SITE_ORIGIN } from "./lib/site";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });
const title = "Instagram Marketing Agency for Founders & Businesses | Project Monet";
const description = "Project Monet is a creator-led, Instagram-only marketing and management agency for founders and businesses worldwide. Strategy, content, Reels, Instagram SEO, and a free Instagram audit.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  title,
  description,
  alternates: { canonical: "/" },
  applicationName: "Project Monet",
  manifest: "/site.webmanifest",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Project Monet",
    title,
    description,
    images: [{ url: "/media/hero-poster.webp", width: 1280, height: 720, alt: "Project Monet cinematic hero" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/media/hero-poster.webp"] },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-48x48.png", type: "image/png", sizes: "48x48" },
    ],
    apple: [{ url: "/apple-touch-icon.png", type: "image/png", sizes: "180x180" }],
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Project Monet",
  url: SITE_ORIGIN,
  logo: `${SITE_ORIGIN}/android-chrome-512x512.png`,
  email: "contact@projectmonet.com",
  description,
  areaServed: "Worldwide",
  knowsAbout: ["Instagram marketing", "Instagram management", "Instagram content creation", "Instagram Reels", "Instagram SEO"],
  sameAs: ["https://www.instagram.com/projectmonet/"],
};

const websiteSchema = { "@context": "https://schema.org", "@type": "WebSite", name: "Project Monet", url: SITE_ORIGIN, publisher: { "@type": "Organization", name: "Project Monet", url: SITE_ORIGIN } };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      </head>
      <body className={inter.variable}><LeadFormProvider>{children}</LeadFormProvider></body>
    </html>
  );
}
