import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Nav from "@/components/Nav";
import "./globals.css";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kiahuna Condos | Poipu, Kauai Vacation Rentals",
  description:
    "Book direct and save on privately owned condos at Kiahuna Plantation, Poipu, Kauai. Ocean views, garden retreats, and poolside escapes — no VRBO fees.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geist.variable} font-sans antialiased bg-stone-50 text-stone-800`}>
        <Nav />
        {children}
        <footer className="mt-16 border-t border-stone-200 bg-white py-8 text-center text-sm text-stone-400">
          © {new Date().getFullYear()} Kiahuna Condos · Poipu, Kauai, Hawaii ·{" "}
          <a href="mailto:owner@kiahunacondos.com" className="hover:text-stone-600 underline">
            owner@kiahunacondos.com
          </a>
        </footer>
      </body>
    </html>
  );
}
