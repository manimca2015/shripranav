'use client';

import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
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
  }, [
    Autoplay({
      delay: 5000,
      stopOnInteraction: false,
    })
  ]);

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
  }, [emblaApi, onSelect]);

  // Extract representative images from productDetails
  const sliderImages = productDetails.map(p => ({
    src: p.images?.[0] || '/placeholder.jpg',
    title: p.title
  }));

  const numSlides = sliderImages.length;

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

        <div className="relative group max-w-[1200px] mx-auto pt-6" style={{ perspective: '1200px' }}>
          <div className="overflow-visible" ref={emblaRef}>
            <div className="flex -ml-10">
              {sliderImages.map((item, index) => {
                const isActive = selectedIndex === index;
                
                // Calculate circular distance for consistent 3D rotation in a loop
                let diff = index - selectedIndex;
                if (Math.abs(diff) > numSlides / 2) {
                  diff = diff > 0 ? diff - numSlides : diff + numSlides;
                }
                
                return (
                  <div 
                    key={index} 
                    className="flex-[0_0_60%] sm:flex-[0_0_40%] lg:flex-[0_0_25%] pl-10 transition-all duration-700 ease-out"
                    style={{
                      transform: isActive 
                        ? 'scale(1.15) translateZ(120px)' 
                        : `scale(0.8) rotateY(${diff < 0 ? '30deg' : '-30deg'}) translateZ(-100px)`,
                      opacity: isActive ? 1 : 0.4,
                      zIndex: isActive ? 20 : 10,
                      filter: isActive ? 'none' : 'blur(2px)'
                    }}
                  >
                    <div className="relative aspect-square rounded-[32px] overflow-hidden shadow-2xl group/slide bg-slate-100 border border-slate-50">
                      <Image
                        src={item.src}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover/slide:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-transparent to-transparent opacity-0 group-hover/slide:opacity-100 transition-opacity duration-500 flex items-end p-6">
                        <div className="text-white transform translate-y-4 group-hover/slide:translate-y-0 transition-transform duration-500">
                          <h4 className="text-lg font-black mb-1 leading-tight">{item.title}</h4>
                          <p className="text-[10px] font-bold text-secondary uppercase tracking-widest">Innovation Focus</p>
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
              className="h-14 w-14 rounded-full border-primary/20 text-primary hover:bg-primary hover:text-white transition-all shadow-xl hover:-translate-x-1 bg-white"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={scrollNext}
              className="h-14 w-14 rounded-full border-primary/20 text-primary hover:bg-primary hover:text-white transition-all shadow-xl hover:translate-x-1 bg-white"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
