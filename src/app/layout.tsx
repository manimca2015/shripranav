import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import Link from 'next/link';
import { WhatsAppIcon } from '@/components/icons/whatsapp-icon';

export const metadata: Metadata = {
  title: 'Fair Future Travels',
  description: 'Unforgettable driving tours for the modern explorer.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        {children}
        <Toaster />
        <Link href="https://wa.me/917907526773" target="_blank" rel="noopener noreferrer" className="fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center transition-all duration-300 ease-in-out hover:scale-110">
          <WhatsAppIcon className="h-[80%] w-[80%]" />
          <span className="sr-only">WhatsApp</span>
        </Link>
      </body>
    </html>
  );
}
