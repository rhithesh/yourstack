import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from 'next/font/local';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bitcount = localFont({
  src: "../public/font/BitcountPropSingle-VariableFont_CRSV,ELSH,ELXP,slnt,wght.ttf",
  variable: "--font-bitcount",
});

export const metadata: Metadata = {
  title: "Your Stack",
  description: "One email for the ai era",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${bitcount.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
