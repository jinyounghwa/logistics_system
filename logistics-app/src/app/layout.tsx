import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LogisticsProvider } from "../context/LogisticsContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "물류 관리 시스템 | LMS",
  description: "웹 기반 물류 관리 시스템 - 입고, 출고, 재고 상태를 실시간으로 관리하세요",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <style>
          {`
            /* Next.js 토스트 메시지 숨기기 */
            #__next-build-watcher,
            #__next-prerender-indicator,
            .nextjs-toast-errors-parent,
            [data-nextjs-toast],
            [data-nextjs-toast-errors] {
              display: none !important;
              opacity: 0 !important;
              visibility: hidden !important;
              pointer-events: none !important;
              height: 0 !important;
              width: 0 !important;
              position: absolute !important;
              z-index: -9999 !important;
            }
          `}
        </style>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LogisticsProvider>
          {children}
        </LogisticsProvider>
      </body>
    </html>
  );
}
