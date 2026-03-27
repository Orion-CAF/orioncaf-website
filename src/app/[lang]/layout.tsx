import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import AnimeV3Client from "@/components/AnimeV3Client";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OrionCAF — AI Engineering from Turkey",
  description: "Speech to speech pipelines, LLM fine tuning, RAG systems, and intelligent automation — designed for production, optimized for your industry.",
  keywords: ["AI engineering", "speech to speech", "LLM fine tuning", "RAG", "Turkish AI", "voice AI", "automation", "OrionCAF"],
  authors: [{ name: "OrionCAF" }],
};

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'tr' }];
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: "en" | "tr" }>;
}>) {
  const { lang } = await params;
  return (
    <html lang={lang} className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {children}
        <AnimeV3Client />
      </body>
    </html>
  );
}
