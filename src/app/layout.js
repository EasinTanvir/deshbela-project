import { Source_Sans_3, Source_Serif_4 } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getSiteConfig } from "@/lib/siteData";
import "@/styles/globals.css";

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL(getSiteConfig().siteUrl),
  title: {
    default: "DESHBELA - Latest News",
    template: "%s | DESHBELA",
  },
  description:
    "DESHBELA is an online news portal with national, international, politics, economy, sports, technology and entertainment news.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${sourceSans.variable} ${sourceSerif.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
