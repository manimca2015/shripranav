'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);
  
  const headerClasses = cn(
    'fixed w-full z-50 px-4 sm:px-12 py-6 flex justify-between items-center transition-all duration-300',
    {
      'bg-background shadow-md': scrolled,
      'bg-transparent': !scrolled && isHome,
      'bg-background': !isHome && !scrolled
    }
  );

  const navLinkColorClasses = cn(
    'transition-colors',
    {
      'text-primary-foreground': !scrolled && isHome,
      'text-primary/80': scrolled || !isHome
    }
  );

  return (
    <header className={headerClasses}>
      <Link href="/" className="relative flex items-center">
        <Image
            src="/fair-future-logo.webp"
            alt="Fair Future Travels Logo"
            width={180}
            height={40}
            className={cn("object-contain", { 'brightness-0 invert': !scrolled && isHome })}
            priority
        />
      </Link>
      <nav
        className={cn("hidden md:flex items-center gap-6 font-bold relative", navLinkColorClasses)}
      >
        <Link href="/tours" className="hover:text-accent transition-colors">World Driving Tours</Link>
        <Link href="/holiday-packages" className="hover:text-accent transition-colors">Holiday Packages</Link>
        <Link href="/visa-services" className="hover:text-accent transition-colors">Visa Services</Link>
        <Link href="/air-tickets" className="hover:text-accent transition-colors">Air Tickets</Link>
        <Link href="/about-us" className="hover:text-accent transition-colors">About Us</Link>
        <Link href="/blog" className="hover:text-accent transition-colors">Blog</Link>
        <Link href="/gallery" className="hover:text-accent transition-colors">Gallery</Link>
      </nav>
      <div className="relative flex items-center gap-2 sm:gap-6">
        <Button
          asChild
          className="px-4 sm:px-8 py-3 rounded-full font-semibold transition-all shadow-lg bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground"
        >
          <Link href="/contact-us">Contact Us</Link>
        </Button>
      </div>
    </header>
  );
}
