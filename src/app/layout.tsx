import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { BackToTop } from "@/components/back-to-top";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "Shri Pranav | Premium Textile Manufacturing Excellence",
  description: "Established in 1995, Shri Pranav is a leading manufacturer of tote bags, bed linen, and luxury garments with a focus on sustainability and innovation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable}`} suppressHydrationWarning>
      <body className="antialiased font-sans">
        {children}
        <BackToTop />
        <Toaster />
      </body>
    </html>
  );
}
