import type { Metadata, Viewport } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://adiphotography.pk"
  ),
  title: {
    default: "Adi Photography | Professional Photography & Videography in Peshawar",
    template: "%s | Adi Photography Peshawar",
  },
  description:
    "Professional photography and videography services in Peshawar, Pakistan. Specializing in weddings, corporate events, fashion, drone photography, and more.",
  keywords: [
    "photography Peshawar",
    "videography Peshawar",
    "wedding photographer Peshawar",
    "corporate photography Peshawar",
    "video production Peshawar",
    "Adi Photography",
    "professional photographer Pakistan",
  ],
  openGraph: {
    type: "website",
    siteName: "Adi Photography",
    locale: "en_PK",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: "/manifest.json",
  icons: {
    apple: "/apple-touch-icon.png",
  },
  other: {
    "geo.region": "PK-KP",
    "geo.placename": "Peshawar",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://pub-45c507c035214836bf31cb43c8f8946b.r2.dev" />
      </head>
      <body className="antialiased bg-bg-primary text-text-primary font-dm">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
