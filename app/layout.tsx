import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const title = "Fabrical — The intelligence layer for electrical construction";
const description =
  "The next era of energy, compute, manufacturing, and infrastructure depends on electrical contractors. Fabrical builds AI systems that help them coordinate, execute, and scale like never before.";

export const metadata: Metadata = {
  metadataBase: new URL("https://fabrical.ai"),
  title,
  description,
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    title,
    description,
    siteName: "Fabrical",
    images: [{ url: "/hero-datacenter.webp", width: 1200, height: 630, alt: "Fabrical" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/hero-datacenter.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("dark", "h-full", "antialiased", "font-sans", inter.variable)}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
