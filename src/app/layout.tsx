import type { Metadata } from "next";
import { Suspense } from "react";          // ← ADD
import LoaderWrapper from "@/components/LoadWrapper";
// import localFont from "next/font/local";
// import { Geist,Geist_Mono } from "next/font/google";
import MainLayout from "@/components/layout/page";

import "./globals.css";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// const geistSans = localFont({
//   src: "./fonts/Geist.woff2",
//   variable: "--font-geist-sans",
// });

// const geistMono = localFont({
//   src: "./fonts/GeistMono.woff2",
//   variable: "--font-geist-mono",
// });

export const metadata: Metadata = {
  title: "Vidhyarthi Vigyan Manthan 2026-27",
  description: " VVM India's Largest Science Talent Search Examination",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body
        // className={`${geistSans.variable} ${geistMono.variable}`}
      >
        <Suspense>                          {/* ← ADD */}
          <LoaderWrapper />                 {/* ← ADD */}
        </Suspense>
        <MainLayout>
          {children}
        </MainLayout>
      </body>
    </html>
  );
}
