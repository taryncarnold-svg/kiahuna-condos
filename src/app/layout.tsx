import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Nav from "@/components/Nav";
import "./globals.css";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kiahuna Condos · Poipu, Kauai",
  description:
    "Five privately owned condos at Kiahuna Plantation on Kauai's sunny south shore. Steps from Poipu Beach. Book straight from the owner.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geist.variable} font-sans antialiased bg-white text-stone-900`}>
        <Nav />
        {children}
        <footer className="mt-8 border-t border-stone-100 py-8 px-6">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-400">
            <span>Kiahuna Condos · Poipu, Kauai, Hawaii</span>
            <a
              href="mailto:deenaarnoldca@gmail.com"
              className="hover:text-stone-600 transition-colors"
            >
              deenaarnoldca@gmail.com
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
