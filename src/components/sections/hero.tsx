'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { QuoteRequestModal } from '@/components/quote-request-modal';
import Link from 'next/link';

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

export function Hero() {
  const heroImg = PlaceHolderImages.find(img => img.id === 'hero-bg');
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-slate-900">
      <div className="absolute inset-0 z-0">
        {heroImg && (
          <Image
            src={heroImg.imageUrl}
            alt={heroImg.description}
            fill
            className="object-cover opacity-60 scale-105 animate-pulse-slow"
            priority
            data-ai-hint={heroImg.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/40 to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10 pt-48 md:pt-64">
        <div className="max-w-3xl">
          <span className="inline-block bg-secondary text-white px-4 py-1 rounded-full text-[10px] sm:text-sm font-bold uppercase tracking-widest mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700 whitespace-nowrap">
            Premium Textile Manufacturing
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-[1.1] mb-6 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-100">
            From Raw Material <br />
            <span className="text-secondary">to Masterpieces</span>
          </h1>
          <p className="text-xl text-white/80 mb-10 max-w-xl animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            Delivering quality textile solutions through innovation, craftsmanship, and sustainable manufacturing since 1995.
          </p>
          
          <div className="flex flex-wrap gap-4 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
            <Button asChild size="lg" className="rounded-full bg-white text-primary hover:bg-white/90 px-10 h-14 font-bold text-lg transition-all">
              <Link href="/products">Explore Products</Link>
            </Button>
            <Button onClick={() => setIsQuoteModalOpen(true)} size="lg" className="rounded-full bg-secondary text-white hover:bg-secondary/90 px-10 h-14 font-bold text-lg shadow-lg shadow-secondary/20 transition-all">
              Request a Quote
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 border-t border-white/20 py-16 animate-in fade-in duration-1000 delay-500">
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
      <QuoteRequestModal isOpen={isQuoteModalOpen} onOpenChange={setIsQuoteModalOpen} />

      <style jsx global>{`
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1.05); }
          50% { transform: scale(1.1); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 15s infinite ease-in-out;
        }
      `}</style>
    </section>
  );
}
