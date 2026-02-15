import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Refurbd — Premium Refurbished Tech",
    template: "%s | Refurbd",
  },
  description:
    "Shop certified refurbished laptops and PCs at up to 60% off retail. Every device tested, graded, and backed by a 12-month warranty. Free shipping over $99. Australia & New Zealand.",
  keywords: [
    "refurbished laptops",
    "refurbished PCs",
    "refurbished computers",
    "cheap laptops Australia",
    "refurbished electronics",
    "certified refurbished",
  ],
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  openGraph: {
    type: "website",
    locale: "en_AU",
    siteName: "Refurbd",
    title: "Refurbd — Premium Refurbished Tech",
    description:
      "Certified refurbished laptops & PCs at up to 60% off. 12-month warranty. Free shipping over $99.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
