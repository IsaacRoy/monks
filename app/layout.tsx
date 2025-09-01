import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { NewsProvider } from "./context/NewsContext";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "The Monks App",
  description: "News from all around the world",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} font-sans antialiased`}>
        <NewsProvider>{children}</NewsProvider>
      </body>
    </html>
  );
}
