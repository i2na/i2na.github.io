import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "i2na Blog",
  description: "A minimal blog built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
