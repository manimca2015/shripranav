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
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinkClasses = (scrolled: boolean) => cn(
    "font-medium hover:text-secondary transition-colors duration-300 flex items-center gap-1 py-2 px-1",
    scrolled ? "text-slate-700" : "text-white/90"
  );

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-[background-color,padding,box-shadow,backdrop-filter] duration-500',
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 shrink-0">
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
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          <Link href="/" className={navLinkClasses(isScrolled)}>Home</Link>
          
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <button className={cn(navLinkClasses(isScrolled), "outline-none group bg-transparent border-none cursor-pointer")}>
                Products <ChevronDown className="w-4 h-4 group-data-[state=open]:rotate-180 transition-transform duration-300" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56 rounded-2xl p-2 shadow-2xl border-slate-100 bg-white">
              <DropdownMenuItem asChild>
                <Link href="/products" className="font-bold text-primary cursor-pointer rounded-xl mb-1 focus:bg-slate-50">
                  All Products
                </Link>
              </DropdownMenuItem>
              <div className="h-px bg-slate-100 my-1" />
              {productDetails.map((product) => (
                <DropdownMenuItem key={product.id} asChild>
                  <Link href={`/products/${product.slug}`} className="cursor-pointer rounded-xl hover:bg-slate-50 focus:bg-slate-50">
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

        <div className="hidden lg:block shrink-0">
          <Button asChild className="rounded-full bg-secondary hover:bg-secondary/90 text-white px-8 h-11">
            <Link href="/contact">Request a Quote</Link>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden p-2 rounded-lg hover:bg-slate-100/10 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="text-primary w-6 h-6" />
          ) : (
            <Menu className={cn("w-6 h-6", isScrolled ? "text-primary" : "text-white")} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-t p-4 flex flex-col gap-2 animate-in slide-in-from-top duration-300 shadow-xl max-h-[80vh] overflow-y-auto">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="font-semibold p-3 hover:bg-slate-50 rounded-xl transition-colors">Home</Link>
          
          <div className="rounded-xl overflow-hidden">
            <button 
              onClick={() => setIsMobileProductsOpen(!isMobileProductsOpen)}
              className="w-full flex justify-between items-center font-semibold p-3 hover:bg-slate-50 transition-colors"
            >
              Products <ChevronDown className={cn("w-4 h-4 transition-transform duration-300", isMobileProductsOpen && "rotate-180")} />
            </button>
            {isMobileProductsOpen && (
              <div className="bg-slate-50 flex flex-col">
                <Link href="/products" onClick={() => setIsMobileMenuOpen(false)} className="p-3 pl-8 text-sm font-bold text-primary hover:bg-slate-100">All Products</Link>
                {productDetails.map((product) => (
                  <Link 
                    key={product.id} 
                    href={`/products/${product.slug}`} 
                    onClick={() => setIsMobileMenuOpen(false)} 
                    className="p-3 pl-8 text-sm text-slate-600 hover:bg-slate-100"
                  >
                    {product.title}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/factory" onClick={() => setIsMobileMenuOpen(false)} className="font-semibold p-3 hover:bg-slate-50 rounded-xl transition-colors">Factory</Link>
          <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="font-semibold p-3 hover:bg-slate-50 rounded-xl transition-colors">About Us</Link>
          <Link href="/blogs" onClick={() => setIsMobileMenuOpen(false)} className="font-semibold p-3 hover:bg-slate-50 rounded-xl transition-colors">Blogs</Link>
          <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="font-semibold p-3 hover:bg-slate-50 rounded-xl transition-colors">Contact Us</Link>
          <div className="p-3 pt-4">
            <Button asChild className="w-full bg-secondary h-12 rounded-xl">
              <Link href="/contact">Request a Quote</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
