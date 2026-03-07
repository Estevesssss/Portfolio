import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { LanguageProvider } from "@/contexts/LanguageContext";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Portfolio | André Esteves",
  description:
    "Premium futuristic developer portfolio built with Next.js, Three.js, and Framer Motion.",
  icons: { icon: "/Andre Esteves Logo-02.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/Andre%20Esteves%20Logo-02.svg" type="image/svg+xml" />
      </head>
      <body className={`${spaceGrotesk.variable} font-sans antialiased`}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}