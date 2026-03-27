import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import AnimeV3Client from "@/components/AnimeV3Client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { getDictionary } from "@/app/dictionaries";
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
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  const dict = await getDictionary(lang as 'en' | 'tr');

  return (
    <html lang={lang} className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col relative bg-[#fcfbf9]" suppressHydrationWarning>
        <ShootingStars className="z-0 opacity-50" />
        <Navbar dict={dict.nav} lang={lang} contactDict={dict.contactModal} />
        <main className="flex-1 relative z-10">
          {children}
        </main>
        <Footer dict={dict.footer} />
        <AnimeV3Client />
      </body>
    </html>
  );
}
