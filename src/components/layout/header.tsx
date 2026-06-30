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
} from '@/components/ui/dropdown-menu';
import { productDetails } from '@/lib/product-data';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinkClasses = (scrolled: boolean) => cn(
    "font-medium hover:text-secondary smooth-transition flex items-center gap-1",
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
          
          <DropdownMenu>
            <DropdownMenuTrigger className={cn(navLinkClasses(isScrolled), "outline-none group")}>
              Products <ChevronDown className="w-4 h-4 group-data-[state=open]:rotate-180 transition-transform" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56 rounded-2xl p-2 shadow-2xl border-slate-100">
              <DropdownMenuItem asChild>
                <Link href="/products" className="font-bold text-primary cursor-pointer rounded-xl mb-1">
                  All Products
                </Link>
              </DropdownMenuItem>
              <div className="h-px bg-slate-100 my-1" />
              {productDetails.map((product) => (
                <DropdownMenuItem key={product.id} asChild>
                  <Link href={`/products/${product.slug}`} className="cursor-pointer rounded-xl hover:bg-slate-50">
                    {product.title}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

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
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-t p-4 flex flex-col gap-2 animate-in slide-in-from-top duration-300 shadow-xl max-h-[80vh] overflow-y-auto">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="font-semibold p-3 border-b">Home</Link>
          
          <div className="border-b">
            <button 
              onClick={() => setIsMobileProductsOpen(!isMobileProductsOpen)}
              className="w-full flex justify-between items-center font-semibold p-3"
            >
              Products <ChevronDown className={cn("w-4 h-4 transition-transform", isMobileProductsOpen && "rotate-180")} />
            </button>
            {isMobileProductsOpen && (
              <div className="bg-slate-50 rounded-xl mb-2 flex flex-col">
                <Link href="/products" onClick={() => setIsMobileMenuOpen(false)} className="p-3 pl-6 text-sm font-bold text-primary">All Products</Link>
                {productDetails.map((product) => (
                  <Link 
                    key={product.id} 
                    href={`/products/${product.slug}`} 
                    onClick={() => setIsMobileMenuOpen(false)} 
                    className="p-3 pl-6 text-sm text-slate-600 border-t border-white"
                  >
                    {product.title}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/factory" onClick={() => setIsMobileMenuOpen(false)} className="font-semibold p-3 border-b">Factory</Link>
          <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="font-semibold p-3 border-b">About Us</Link>
          <Link href="/blogs" onClick={() => setIsMobileMenuOpen(false)} className="font-semibold p-3 border-b">Blogs</Link>
          <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="font-semibold p-3 border-b">Contact Us</Link>
          <div className="p-3">
            <Button asChild className="w-full bg-secondary">
              <Link href="/contact">Request a Quote</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
