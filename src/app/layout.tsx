import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import SmoothScrollProvider from "@/components/common/SmoothScroll";
import NoiseOverlay from "@/components/common/NoiseOverlay";
import TorusKnotCanvas from "@/components/3d/TorusKnotCanvas";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Prashant Kr. Singh — Full-Stack Software Engineer",
  description:
    "Full-Stack Software Engineer specializing in React, Next.js, Node.js, TypeScript, Java, and scalable distributed architectures.",
  keywords: [
    "Prashant Kumar Singh",
    "Prashant Singh",
    "Full Stack Developer",
    "Software Engineer",
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "Java",
    "MERN Stack",
    "System Design",
  ],
  authors: [{ name: "Prashant Kr. Singh", url: "https://github.com/PrashDevCode" }],
  openGraph: {
    title: "Prashant Kr. Singh — Full-Stack Software Engineer",
    description:
      "Full-Stack Software Engineer skilled in engineering production-grade web applications using Java, TypeScript, React, and Node.js.",
    type: "website",
    locale: "en_US",
    siteName: "Prashant Kr. Singh Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prashant Kr. Singh — Full-Stack Software Engineer",
    description:
      "Full-Stack Software Engineer skilled in engineering production-grade web applications using Java, TypeScript, React, and Node.js.",
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect x='5' y='5' width='90' height='90' rx='25' fill='%23000000'/><path d='M30 25H55C65 25 70 30 70 38C70 46 65 50 55 50H30V25Z' stroke='%23ffffff' stroke-width='8' stroke-linecap='round'/><path d='M30 50V75' stroke='%23ffffff' stroke-width='8' stroke-linecap='round'/><path d='M48 60L56 66L48 72' stroke='%23a1a1aa' stroke-width='6' stroke-linecap='round'/></svg>",
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
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} dark`}
        suppressHydrationWarning
    >
        <body
          className="bg-black text-zinc-100 min-h-screen antialiased selection:bg-white selection:text-black"
          suppressHydrationWarning
        >
          <NoiseOverlay />
          <TorusKnotCanvas />
          <SmoothScrollProvider>
            {children}
          </SmoothScrollProvider>
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "#09090b",
                border: "1px solid #27272a",
                color: "#ffffff",
                fontFamily: "var(--font-jetbrains-mono), monospace",
                fontSize: "12px",
              },
            }}
          />
        </body>
    </html >
  );
}
