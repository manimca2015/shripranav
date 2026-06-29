'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const stats = [
  { label: 'Established', value: '1995' },
  { label: 'Experience', value: '28+ Years' },
  { label: 'Product Categories', value: '15+' },
  { label: 'Happy Clients', value: '500+' },
];

export function Hero() {
  const heroImg = PlaceHolderImages.find(img => img.id === 'hero-bg');

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

      <div className="container mx-auto px-4 relative z-10 pt-20">
        <div className="max-w-3xl">
          <span className="inline-block bg-secondary text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-widest mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
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
            <Button size="lg" className="rounded-full bg-white text-primary hover:bg-white/90 px-10 h-14 font-bold text-lg smooth-transition">
              Explore Products
            </Button>
            <Button size="lg" className="rounded-full bg-secondary text-white hover:bg-secondary/90 px-10 h-14 font-bold text-lg smooth-transition shadow-lg shadow-secondary/20">
              Request a Quote
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24 border-t border-white/20 pt-12 animate-in fade-in duration-1000 delay-500">
          {stats.map((stat, i) => (
            <div key={i} className="text-center md:text-left">
              <p className="text-2xl md:text-3xl font-black text-secondary mb-1">{stat.value}</p>
              <p className="text-sm text-white/60 font-medium uppercase tracking-tight">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

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
