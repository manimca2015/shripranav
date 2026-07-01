'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { QuoteRequestModal } from '@/components/quote-request-modal';
import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

function CountUp({ end, duration = 2000, suffix = "" }: { end: number, duration?: number, suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      const easeOutQuart = (x: number): number => 1 - Math.pow(1 - x, 4);
      
      setCount(Math.floor(easeOutQuart(percentage) * end));

      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return <>{count}{suffix}</>;
}

const stats = [
  { label: 'Established', value: 1995, suffix: '' },
  { label: 'Experience', value: 28, suffix: '+ Years' },
  { label: 'Product Categories', value: 15, suffix: '+' },
  { label: 'Happy Clients', value: 500, suffix: '+' },
];

const slides = [
  {
    tag: 'Premium Textile Manufacturing',
    heading: 'EFFORTLESS UTILITY. ENDURING STYLE',
    description: 'Every stitch tells a story. Every product shares a purpose.',
    btn1: 'Explore Now',
    btn2: 'Request a Quote',
    imageId: 'hero-bg'
  },
  {
    tag: 'Premium Textile Manufacturing',
    heading: 'FROM LOOM TO LOVE',
    description: 'Delicate babywear for moments beyond measure',
    btn1: 'Explore Now',
    btn2: 'Request a Quote',
    imageId: 'prod-baby'
  }
];

export function Hero() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  return (
    <section className="relative min-h-screen flex flex-col bg-slate-900">
      <Carousel 
        plugins={[
          Autoplay({
            delay: 6000,
            stopOnInteraction: false,
          }),
        ]}
        opts={{
          loop: true,
        }}
        className="flex-1 w-full"
      >
        <CarouselContent className="h-screen m-0">
          {slides.map((slide, index) => {
            const slideImg = PlaceHolderImages.find(img => img.id === slide.imageId);
            return (
              <CarouselItem key={index} className="relative p-0 h-full">
                <div className="absolute inset-0 z-0">
                  {slideImg && (
                    <Image
                      src={slideImg.imageUrl}
                      alt={slideImg.description}
                      fill
                      className="object-cover opacity-60 scale-105"
                      priority={index === 0}
                      data-ai-hint={slideImg.imageHint}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/40 to-transparent" />
                </div>

                <div className="container mx-auto px-4 relative z-10 h-full flex items-center pt-24">
                  <div className="max-w-2xl md:max-w-3xl">
                    <span className="inline-block bg-secondary text-white px-4 py-1 rounded-full text-[10px] sm:text-sm font-bold uppercase tracking-widest mb-6 whitespace-nowrap">
                      {slide.tag}
                    </span>
                    <h1 className="text-4xl md:text-5xl font-black text-white leading-[1.2] mb-6 tracking-tight">
                      {slide.heading}
                    </h1>
                    <p className="text-lg md:text-xl text-white/80 mb-10 max-w-xl font-medium">
                      {slide.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-4">
                      <Button asChild size="lg" className="rounded-full bg-white text-primary hover:bg-white/90 px-10 h-14 font-bold text-lg transition-all">
                        <Link href="/products">{slide.btn1}</Link>
                      </Button>
                      <Button onClick={() => setIsQuoteModalOpen(true)} size="lg" className="rounded-full bg-secondary text-white hover:bg-secondary/90 px-10 h-14 font-bold text-lg shadow-lg shadow-secondary/20 transition-all">
                        {slide.btn2}
                      </Button>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <div className="hidden md:block">
          <CarouselPrevious className="left-4 lg:left-8 w-12 h-12 bg-white/10 hover:bg-white/20 border-white/20 text-white transition-all" />
          <CarouselNext className="right-4 lg:right-8 w-12 h-12 bg-white/10 hover:bg-white/20 border-white/20 text-white transition-all" />
        </div>
      </Carousel>

      {/* Static bottom bar with stats */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/20 py-12">
            {stats.map((stat, i) => (
              <div key={i} className="text-center md:text-left">
                <p className="text-2xl md:text-3xl font-black text-secondary mb-1">
                  <CountUp end={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-sm text-white/60 font-medium uppercase tracking-tight">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <QuoteRequestModal isOpen={isQuoteModalOpen} onOpenChange={setIsQuoteModalOpen} />
    </section>
  );
}
