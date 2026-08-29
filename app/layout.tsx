import type { Metadata } from "next";
import { Inter } from "next/font/google";
import LeadFormProvider from "./components/lead-form-modal";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });
const origin = "https://www.projectmonet.com";
const title = "Instagram Marketing Agency in India | Project Monet";
const description = "Project Monet is a creator-led Instagram marketing agency in India for founders and businesses. Strategy, content, Reels, management, Instagram SEO, and a free Instagram audit.";

export const metadata: Metadata = {
  metadataBase: new URL(origin),
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
    locale: "en_IN",
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
  url: origin,
  logo: `${origin}/android-chrome-512x512.png`,
  email: "contact@projectmonet.com",
  description,
  sameAs: ["https://www.instagram.com/projectmonet/"],
};

const websiteSchema = { "@context": "https://schema.org", "@type": "WebSite", name: "Project Monet", url: origin };
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Instagram Marketing and Management",
  provider: { "@type": "Organization", name: "Project Monet", url: origin },
  areaServed: { "@type": "Country", name: "India" },
  serviceType: ["Instagram management", "Instagram content creation", "Instagram Reels", "Instagram SEO"],
  offers: [
    { "@type": "Offer", name: "Standard Management", price: "1000", priceCurrency: "USD", description: "Monthly starting price. Final scope and price depend on the engagement." },
    { "@type": "Offer", name: "Viral Mandate", price: "2500", priceCurrency: "USD", description: "Monthly starting price. Six-month contract and qualification required." },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      </head>
      <body className={inter.variable}><LeadFormProvider>{children}</LeadFormProvider></body>
    </html>
  );
}
