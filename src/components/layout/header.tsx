'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Menu, X, ChevronDown } from 'lucide-react';
import { productDetails } from '@/lib/product-data';
import { QuoteRequestModal } from '@/components/quote-request-modal';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinkClasses = (scrolled: boolean) => cn(
    "font-medium hover:text-secondary transition-colors duration-300 flex items-center gap-1 py-2 px-1",
    scrolled ? "text-slate-700" : "text-white/90"
  );

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 header-transition',
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
            
            <div className="relative group">
              <Link 
                href="/products" 
                className={navLinkClasses(isScrolled)}
              >
                Products <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
              </Link>
              
              {/* Desktop Hover Submenu */}
              <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                <div className="w-56 rounded-2xl p-2 shadow-2xl border border-slate-100 bg-white">
                  {productDetails.map((product) => (
                    <Link 
                      key={product.id} 
                      href={`/products/${product.slug}`} 
                      className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-secondary rounded-xl transition-colors"
                    >
                      {product.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link href="/factory" className={navLinkClasses(isScrolled)}>Factory</Link>
            <Link href="/about" className={navLinkClasses(isScrolled)}>About Us</Link>
            <Link href="/blogs" className={navLinkClasses(isScrolled)}>Blogs</Link>
            <Link href="/contact" className={navLinkClasses(isScrolled)}>Contact Us</Link>
          </nav>

          <div className="hidden lg:block shrink-0">
            <Button onClick={() => setIsQuoteModalOpen(true)} className="rounded-full bg-secondary hover:bg-secondary/90 text-white px-8 h-11">
              Request a Quote
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
              <div className="flex items-center justify-between hover:bg-slate-50">
                <Link 
                  href="/products" 
                  onClick={() => setIsMobileMenuOpen(false)} 
                  className="flex-grow font-semibold p-3 transition-colors"
                >
                  Products
                </Link>
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMobileProductsOpen(!isMobileProductsOpen);
                  }}
                  className="p-3 border-l"
                >
                  <ChevronDown className={cn("w-4 h-4 transition-transform duration-300", isMobileProductsOpen && "rotate-180")} />
                </button>
              </div>
              
              {isMobileProductsOpen && (
                <div className="bg-slate-50 flex flex-col">
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
              <Button onClick={() => { setIsMobileMenuOpen(false); setIsQuoteModalOpen(true); }} className="w-full bg-secondary h-12 rounded-xl text-white">
                Request a Quote
              </Button>
            </div>
          </div>
        )}
      </header>
      <QuoteRequestModal isOpen={isQuoteModalOpen} onOpenChange={setIsQuoteModalOpen} />
    </>
  );
}
