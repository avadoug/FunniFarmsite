import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AgeGate } from "@/components/layout/AgeGate";
import { CartProvider } from "@/components/cart/CartProvider";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.thefunnifarm.com";

export const metadata: Metadata = {
  applicationName: "The Funni Farm",
  title: {
    default: "The Funni Farm | Non-Intoxicating CBG Hemp Wellness",
    template: "%s | The Funni Farm",
  },
  description:
    "Small-batch, non-intoxicating CBG-rich hemp wellness products with COA transparency and farm-crafted care.",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "The Funni Farm",
    description:
      "Non-intoxicating CBG-rich hemp wellness goods made with care.",
    images: ["/brand/funni-farm-official-logo.png"],
    siteName: "The Funni Farm",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Funni Farm",
    description:
      "CBG-rich hemp wellness from a real Tennessee family farm with honest product status and lab transparency.",
    images: ["/brand/funni-farm-official-logo.png"],
  },
  icons: {
    apple: "/brand/funni-farm-official-logo.png",
    icon: "/brand/funni-farm-official-logo.png",
  },
  robots: {
    follow: true,
    index: true,
  },
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#26351f",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <CartProvider>
          <AgeGate />
          <Header />
          <main id="main-content" tabIndex={-1}>
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
