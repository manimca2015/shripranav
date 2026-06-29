'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinkClasses = (scrolled: boolean) => cn(
    "font-medium hover:text-secondary smooth-transition",
    scrolled ? "text-slate-700" : "text-white/90"
  );

  return (
    <header
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-500',
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Shri Pranav Logo"
            width={160}
            height={50}
            className="object-contain"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          <Link href="/" className={navLinkClasses(isScrolled)}>Home</Link>
          <Link href="/products" className={navLinkClasses(isScrolled)}>Products</Link>
          <Link href="/factory" className={navLinkClasses(isScrolled)}>Factory</Link>
          <Link href="/about" className={navLinkClasses(isScrolled)}>About Us</Link>
          <Link href="/blogs" className={navLinkClasses(isScrolled)}>Blogs</Link>
          <Link href="/contact" className={navLinkClasses(isScrolled)}>Contact Us</Link>
        </nav>

        <div className="hidden lg:block">
          <Button asChild className="rounded-full bg-secondary hover:bg-secondary/90 text-white px-8">
            <Link href="/contact">Request a Quote</Link>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="text-primary" />
          ) : (
            <Menu className={isScrolled ? "text-primary" : "text-white"} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-t p-4 flex flex-col gap-4 animate-in slide-in-from-top duration-300 shadow-xl">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="font-semibold p-2 border-b">Home</Link>
          <Link href="/products" onClick={() => setIsMobileMenuOpen(false)} className="font-semibold p-2 border-b">Products</Link>
          <Link href="/factory" onClick={() => setIsMobileMenuOpen(false)} className="font-semibold p-2 border-b">Factory</Link>
          <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="font-semibold p-2 border-b">About Us</Link>
          <Link href="/blogs" onClick={() => setIsMobileMenuOpen(false)} className="font-semibold p-2 border-b">Blogs</Link>
          <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="font-semibold p-2 border-b">Contact Us</Link>
          <Button asChild className="w-full bg-secondary">
            <Link href="/contact">Request a Quote</Link>
          </Button>
        </div>
      )}
    </header>
  );
}