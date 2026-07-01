'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Factory as FactoryIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Factory() {
  const factoryImg = PlaceHolderImages.find(img => img.id === 'factory-main');
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-primary text-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className={cn("relative transition-all duration-1000", isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12")}>
            <div className="absolute -top-12 -left-12 w-64 h-64 bg-secondary/20 rounded-full blur-3xl hidden md:block" />
            <div className="relative z-10">
              <span className="text-secondary font-bold uppercase tracking-widest text-xs md:text-sm mb-4 block">
                A Culture Woven with Sustainability
              </span>
              <h2 className="text-4xl md:text-6xl font-black mb-6 md:mb-8 leading-tight">
                Working Culture at <br /> <span className="text-secondary">Shri Pranav</span>
              </h2>
              <div className="space-y-6 text-base md:text-lg text-white/70 leading-relaxed">
                <p>
                  At Shri Pranav Textile Creations Pvt Ltd, our working culture is built on a foundation of integrity, innovation, and sustainability. We believe in creating an environment where collaboration thrives and every individual’s contribution is valued. Our teams work together with a shared commitment to quality, responsibility, and continuous improvement.
                </p>
                <p>
                  Rooted in our heritage since 1994, we have embraced modern practices while staying true to our core values. We promote ethical production methods, fair working conditions, and eco-friendly initiatives, ensuring that sustainability is not just a goal but a way of life. At Shri Pranav, passion for textiles, respect for people, and care for the planet come together to drive everything we do.
                </p>
              </div>
            </div>
          </div>

          <div className={cn("relative h-[400px] md:h-[650px] rounded-[32px] md:rounded-[40px] overflow-hidden group shadow-2xl transition-all duration-1000 delay-500", isVisible ? "opacity-100 scale-100 lg:rotate-3 lg:hover:rotate-0" : "opacity-0 scale-90 rotate-0")}>
            {factoryImg && (
              <Image
                src={factoryImg.imageUrl}
                alt={factoryImg.description}
                fill
                className="object-cover group-hover:scale-105 smooth-transition"
                data-ai-hint={factoryImg.imageHint}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 p-6 md:p-8 glass-card border-none rounded-3xl md:max-w-sm">
              <FactoryIcon className="text-secondary w-10 h-10 md:w-12 md:h-12 mb-3 md:mb-4" />
              <h4 className="text-primary text-lg md:text-xl font-black mb-1 md:mb-2">Shri Pranav</h4>
              <p className="text-slate-600 text-xs md:text-sm">Empowering People, Honoring Traditions, Building a Sustainable Future</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}