import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://craftline.com'),
  title: "CraftLine — Deck & Fence Installation, Repair & Composite Decking | Deck Builder Sacramento",
  description: "Professional deck builder and fence contractor in Sacramento. Expert deck installation, fence repair, wood staining, composite decking, porch restoration. Licensed, insured. Free estimates.",
  keywords: ["deck builder Sacramento", "deck installation", "fence contractor", "composite decking", "fence repair", "deck restoration", "wood staining", "porch restoration", "pergola installation", "deck builder", "fence installation", "deck repair", "deck repair sacramento", "sacramento deck repair", "deck design", "deck railing", "sacramento balcony repair", "deck stairs repair", "deck cleaning carmichael"],
  authors: [{ name: "CraftLine Deck & Fence" }],
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    title: "CraftLine - Deck & Fence Installation, Repair and Composite Decking | Deck Builder Sacramento",
    description: "Professional deck builder and fence contractor in Sacramento. Expert deck installation, fence repair, wood staining, composite decking, porch restoration.",
    url: "https://craftline.com",
    siteName: "CraftLine Deck & Fence",
    images: [
      {
        url: "/icon.png",
        width: 1200,
        height: 630,
        alt: "CraftLine Deck & Fence Restoration",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CraftLine - Deck & Fence Installation, Repair and Composite Decking | Deck Builder Sacramento",
    description: "Professional deck builder and fence contractor in Sacramento. Expert deck installation, fence repair, composite decking.",
    images: ["/icon.png"],
  },
  alternates: {
    canonical: "https://craftline.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to Google resources for faster loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.google.com" />
        <link rel="dns-prefetch" href="https://maps.googleapis.com" />
      </head>
      <body className={`${inter.variable} ${oswald.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
