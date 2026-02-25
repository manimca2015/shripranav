
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"
import { Menu } from "lucide-react"

const navLinks = [
    { href: "/tours", label: "World Driving Tours" },
    { href: "/holiday-packages", label: "Holiday Packages" },
    { href: "/visa-services", label: "Visa Services" },
    { href: "/air-tickets", label: "Air Tickets" },
    { href: "/about-us", label: "About Us" },
    { href: "/blog", label: "Blog" },
    { href: "/gallery", label: "Gallery" },
];


export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const headerClasses = cn(
    'fixed w-full z-50 transition-all duration-300',
    {
      'bg-background shadow-md': scrolled,
      'bg-white/60 backdrop-blur-sm': !scrolled && isHome,
      'bg-background': !isHome && !scrolled
    }
  );

  const navLinkColorClasses = cn(
    'transition-colors font-bold',
    {
      'text-primary': !scrolled && isHome,
      'text-primary/80': scrolled || !isHome
    }
  );

  return (
    <header className={headerClasses}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-6 flex justify-between items-center">
            <Link href="/" className="relative flex items-center">
                <Image
                    src="/fair-future-logo.webp"
                    alt="Fair Future Travels Logo"
                    width={180}
                    height={40}
                    className="object-contain"
                    priority
                />
            </Link>
            <nav
                className={cn("hidden lg:flex items-center gap-2 font-bold relative", navLinkColorClasses)}
            >
                {navLinks.map(link => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className="px-4 py-2 rounded-full transition-colors duration-300 hover:bg-[#dfae29]"
                    >
                        {link.label}
                    </Link>
                ))}
            </nav>
            <div className="flex items-center gap-2 sm:gap-6">
                <Button
                asChild
                className="hidden lg:inline-flex px-4 sm:px-8 py-3 rounded-full font-semibold transition-all shadow-lg bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground"
                >
                <Link href="/contact-us">Contact Us</Link>
                </Button>
                <div className="lg:hidden">
                    {isMounted && (
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Menu className="h-6 w-6" />
                                <span className="sr-only">Open menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[300px]">
                            <SheetHeader>
                                <SheetTitle className="text-left">
                                    <Link href="/" className="relative flex items-center">
                                        <Image
                                            src="/fair-future-logo.webp"
                                            alt="Fair Future Travels Logo"
                                            width={150}
                                            height={33}
                                            className="object-contain"
                                        />
                                        </Link>
                                </SheetTitle>
                            </SheetHeader>
                            <div className="mt-8 flex flex-col gap-6">
                                {navLinks.map((link) => (
                                    <SheetClose key={link.href} asChild>
                                    <Link
                                        href={link.href}
                                        className="text-lg font-medium hover:text-accent transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                    </SheetClose>
                                ))}
                            </div>
                            <SheetClose asChild>
                                <Button asChild className="w-full mt-8" >
                                    <Link href="/contact-us">Contact Us</Link>
                                </Button>
                            </SheetClose>
                        </SheetContent>
                    </Sheet>
                    )}
                </div>
            </div>
        </div>
      </div>
    </header>
  );
}
