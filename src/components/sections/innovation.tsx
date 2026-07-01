'use client';

import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { productDetails } from '@/lib/product-data';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Innovation() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center',
    skipSnaps: false,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    
    // Auto-play
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [emblaApi, onSelect]);

  // Extract representative images from productDetails
  const sliderImages = productDetails.map(p => ({
    src: p.images?.[0] || '/placeholder.jpg',
    title: p.title
  }));

  return (
    <section className="py-24 bg-white overflow-hidden border-t border-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <span className="text-secondary font-bold uppercase tracking-widest text-sm mb-4 block">Innovation & Excellence</span>
          <h2 className="text-4xl md:text-6xl font-black text-primary mb-8 leading-tight">
            Innovating for a <span className="text-secondary">Sustainable Future</span>
          </h2>
          <div className="w-24 h-1.5 bg-secondary mx-auto mb-10 rounded-full" />
          <p className="text-xl text-slate-600 leading-relaxed font-medium">
            Our R&D team is dedicated to developing innovative textile solutions, integrating new materials and technologies to enhance product performance and sustainability.
          </p>
        </div>

        <div className="relative group max-w-[1400px] mx-auto pt-10" style={{ perspective: '1200px' }}>
          <div className="overflow-visible" ref={emblaRef}>
            <div className="flex -ml-10">
              {sliderImages.map((item, index) => {
                const isActive = selectedIndex === index;
                // Calculate rotation based on distance from center
                const diff = index - selectedIndex;
                const absDiff = Math.abs(diff);
                
                return (
                  <div 
                    key={index} 
                    className="flex-[0_0_75%] sm:flex-[0_0_55%] lg:flex-[0_0_35%] pl-10 transition-all duration-700 ease-out"
                    style={{
                      transform: isActive 
                        ? 'scale(1.15) translateZ(100px)' 
                        : `scale(0.8) rotateY(${diff < 0 ? '30deg' : '-30deg'})`,
                      opacity: isActive ? 1 : 0.4,
                      zIndex: isActive ? 20 : 10,
                      filter: isActive ? 'none' : 'blur(1px)'
                    }}
                  >
                    <div className="relative aspect-[4/5] rounded-[48px] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] group/slide">
                      <Image
                        src={item.src}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover/slide:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-transparent to-transparent opacity-0 group-hover/slide:opacity-100 transition-opacity duration-500 flex items-end p-10">
                        <div className="text-white transform translate-y-4 group-hover/slide:translate-y-0 transition-transform duration-500">
                          <h4 className="text-2xl font-black mb-2">{item.title}</h4>
                          <p className="text-sm font-bold text-secondary uppercase tracking-widest">Innovation Focus</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex justify-center gap-6 mt-16">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={scrollPrev}
              className="h-14 w-14 rounded-full border-primary/20 text-primary hover:bg-primary hover:text-white transition-all shadow-lg shadow-primary/5"
            >
              <ChevronLeft className="h-8 w-8" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={scrollNext}
              className="h-14 w-14 rounded-full border-primary/20 text-primary hover:bg-primary hover:text-white transition-all shadow-lg shadow-primary/5"
            >
              <ChevronRight className="h-8 w-8" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}