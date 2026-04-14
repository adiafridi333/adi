import type { Metadata } from "next";
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
  openGraph: {
    type: "website",
    siteName: "Adi Photography",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="antialiased bg-bg-primary text-text-primary font-dm">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
