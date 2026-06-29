'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Menu, X, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const productCategories = [
  { name: 'All Products', href: '/products' },
  { name: 'Tote Bags', href: '/products/tote-bags' },
  { name: 'Bed Linen', href: '/products/bed-linen' },
  { name: 'Cushion Covers', href: '/products/cushion-covers' },
  { name: 'Table & Bath', href: '/products/table-bath' },
  { name: 'Baby Garments', href: '/products/baby-garments' },
  { name: "Girls' Collection", href: '/products/girls-collection' },
  { name: "Boys' Collection", href: '/products/boys-collection' },
  { name: "Gents' Shirts", href: '/products/gents-shirts' },
];

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
          <Link href="/" className={cn("font-medium hover:text-secondary smooth-transition", isScrolled ? "text-slate-700" : "text-white/90")}>Home</Link>
          
          <DropdownMenu>
            <DropdownMenuTrigger className={cn("flex items-center gap-1 font-medium hover:text-secondary smooth-transition outline-none", isScrolled ? "text-slate-700" : "text-white/90")}>
              Products <ChevronDown className="w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 p-2">
              {productCategories.map((cat) => (
                <DropdownMenuItem key={cat.href} asChild>
                  <Link href={cat.href} className="cursor-pointer w-full">{cat.name}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href="/factory" className={cn("font-medium hover:text-secondary smooth-transition", isScrolled ? "text-slate-700" : "text-white/90")}>Factory</Link>
          <Link href="/about" className={cn("font-medium hover:text-secondary smooth-transition", isScrolled ? "text-slate-700" : "text-white/90")}>About Us</Link>
          <Link href="/blogs" className={cn("font-medium hover:text-secondary smooth-transition", isScrolled ? "text-slate-700" : "text-white/90")}>Blogs</Link>
          <Link href="/contact" className={cn("font-medium hover:text-secondary smooth-transition", isScrolled ? "text-slate-700" : "text-white/90")}>Contact Us</Link>
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
            <X className={isScrolled ? "text-primary" : "text-primary"} />
          ) : (
            <Menu className={isScrolled ? "text-primary" : "text-white"} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-t p-4 flex flex-col gap-4 animate-in slide-in-from-top duration-300 shadow-xl">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="font-semibold p-2 border-b">Home</Link>
          <div className="flex flex-col gap-2">
            <span className="font-semibold p-2 text-primary">Products</span>
            {productCategories.map((cat) => (
              <Link 
                key={cat.href} 
                href={cat.href} 
                onClick={() => setIsMobileMenuOpen(false)}
                className="pl-6 py-2 text-sm border-l-2 border-slate-100 hover:border-secondary"
              >
                {cat.name}
              </Link>
            ))}
          </div>
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
