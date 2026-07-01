'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Menu, ChevronDown } from 'lucide-react';
import { productDetails } from '@/lib/product-data';
import { QuoteRequestModal } from '@/components/quote-request-modal';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
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
    "font-bold hover:text-secondary transition-colors duration-300 flex items-center gap-1 py-2 px-1 text-sm uppercase tracking-wider",
    scrolled ? "text-slate-700" : "text-white/90"
  );

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 header-transition',
          isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
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
                      className="block px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50 hover:text-secondary rounded-xl transition-colors"
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
            <Button onClick={() => setIsQuoteModalOpen(true)} className="rounded-full bg-secondary hover:bg-secondary/90 text-white px-8 h-11 font-bold">
              Request a Quote
            </Button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="lg:hidden flex items-center gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className={cn("rounded-xl", isScrolled ? "text-primary" : "text-white")}>
                  <Menu className="w-8 h-8" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] p-0 border-none bg-white">
                <SheetHeader className="p-6 border-b text-left">
                  <SheetTitle>
                    <Image
                      src="/logo.png"
                      alt="Shri Pranav Logo"
                      width={140}
                      height={44}
                      className="object-contain"
                    />
                  </SheetTitle>
                </SheetHeader>
                
                <div className="flex flex-col h-[calc(100vh-100px)] justify-between">
                  <div className="overflow-y-auto px-6 py-8">
                    <div className="flex flex-col gap-2">
                      <SheetClose asChild>
                        <Link href="/" className="text-lg font-black text-primary p-3 hover:bg-slate-50 rounded-xl transition-colors">
                          HOME
                        </Link>
                      </SheetClose>

                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="products" className="border-none">
                          <AccordionTrigger className="text-lg font-black text-primary p-3 hover:bg-slate-50 rounded-xl transition-colors hover:no-underline">
                            PRODUCTS
                          </AccordionTrigger>
                          <AccordionContent className="pb-0 pl-4 border-l-2 border-secondary ml-4">
                            <div className="flex flex-col gap-1 mt-2">
                              {productDetails.map((product) => (
                                <SheetClose key={product.id} asChild>
                                  <Link 
                                    href={`/products/${product.slug}`} 
                                    className="p-3 text-sm font-bold text-slate-600 hover:text-secondary hover:bg-slate-50 rounded-xl transition-colors"
                                  >
                                    {product.title}
                                  </Link>
                                </SheetClose>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>

                      <SheetClose asChild>
                        <Link href="/factory" className="text-lg font-black text-primary p-3 hover:bg-slate-50 rounded-xl transition-colors">
                          FACTORY
                        </Link>
                      </SheetClose>
                      <SheetClose asChild>
                        <Link href="/about" className="text-lg font-black text-primary p-3 hover:bg-slate-50 rounded-xl transition-colors">
                          ABOUT US
                        </Link>
                      </SheetClose>
                      <SheetClose asChild>
                        <Link href="/blogs" className="text-lg font-black text-primary p-3 hover:bg-slate-50 rounded-xl transition-colors">
                          BLOGS
                        </Link>
                      </SheetClose>
                      <SheetClose asChild>
                        <Link href="/contact" className="text-lg font-black text-primary p-3 hover:bg-slate-50 rounded-xl transition-colors">
                          CONTACT US
                        </Link>
                      </SheetClose>
                    </div>
                  </div>

                  <div className="p-6 bg-slate-50">
                    <Button 
                      onClick={() => setIsQuoteModalOpen(true)} 
                      className="w-full bg-secondary hover:bg-primary h-14 rounded-2xl text-white font-bold text-lg shadow-xl shadow-secondary/10"
                    >
                      Request a Quote
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      <QuoteRequestModal isOpen={isQuoteModalOpen} onOpenChange={setIsQuoteModalOpen} />
    </>
  );
}