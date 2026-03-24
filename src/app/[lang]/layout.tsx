import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  openGraph: {
    title: "OrionCAF — AI Engineering from Turkey",
    description: "Speech to speech pipelines, LLM fine tuning, RAG systems, and intelligent automation — designed for production.",
    url: "https://orioncaf.com",
    siteName: "OrionCAF",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "OrionCAF — AI Engineering from Turkey",
    description: "Speech to speech pipelines, LLM fine tuning, RAG systems, and intelligent automation.",
  },
  robots: {
    index: true,
    follow: true,
  },
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
  return (
    <html
      lang={lang}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
