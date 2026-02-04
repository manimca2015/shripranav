'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import { testimonials } from '@/lib/testimonials';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Star, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export function TestimonialsCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const autoplayInterval = useRef<number | null>(null);

  const startAutoplay = useCallback(() => {
    if (autoplayInterval.current) {
      clearInterval(autoplayInterval.current);
    }
    autoplayInterval.current = window.setInterval(() => {
      api?.scrollNext();
    }, 5000);
  }, [api]);

  const stopAutoplay = useCallback(() => {
    if (autoplayInterval.current) {
      clearInterval(autoplayInterval.current);
    }
  }, []);
  
  const scrollTo = useCallback((index: number) => {
    api?.scrollTo(index);
  }, [api]);

  useEffect(() => {
    if (!api) {
      return;
    }

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on('select', onSelect);
    api.on('pointerDown', stopAutoplay);
    api.on('reInit', startAutoplay);
    
    onSelect();
    startAutoplay();

    return () => {
      api.off('select', onSelect);
      api.off('pointerDown', stopAutoplay);
      api.off('reInit', startAutoplay);
      stopAutoplay();
    };
  }, [api, startAutoplay, stopAutoplay]);

  const getFallback = (name: string) => {
    const parts = name.split(' ');
    if (parts.length > 1) {
      return `${parts[0][0]}${parts[1][0]}`;
    }
    return name.substring(0, 2);
  }

  return (
    <div onMouseEnter={stopAutoplay} onMouseLeave={startAutoplay}>
      <Carousel
        setApi={setApi}
        opts={{
          align: 'center',
          loop: true,
        }}
        className="w-full max-w-7xl mx-auto"
      >
        <CarouselContent className="-ml-8">
          {testimonials.map((testimonial, index) => {
            const avatar = PlaceHolderImages.find(p => p.id === testimonial.avatarId);
            const isCenter = current === index;
            
            return (
              <CarouselItem key={testimonial.id} className="pl-8 md:basis-1/2 lg:basis-1/3">
                <div className="p-1 h-full">
                  <div 
                    className={cn(
                      "bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col justify-between h-full hover:shadow-2xl transition-all duration-500 ease-out",
                      isCenter ? "transform md:-translate-y-4" : "md:translate-y-0"
                    )}
                  >
                    <div>
                      <div className="flex text-yellow-400 mb-4 text-xs">
                        {Array.from({ length: 5 }).map((_, i) => (
                           <Star key={i} fill="currentColor" size={16} className={i < testimonial.rating ? 'text-yellow-400' : 'text-slate-300'}/>
                        ))}
                      </div>
                      <p className="text-slate-600 italic leading-relaxed mb-6 font-light">
                        "{testimonial.text}"
                      </p>
                    </div>
                    <div className="flex items-center gap-4 pt-6 border-t border-slate-50">
                      {avatar ? (
                        <Avatar className="w-12 h-12 ring-2 ring-accent/10">
                          <AvatarImage src={avatar.imageUrl} alt={testimonial.author} />
                          <AvatarFallback>{getFallback(testimonial.author)}</AvatarFallback>
                        </Avatar>
                      ) : null}
                      <div>
                        <h4 className="font-bold text-primary text-sm">{testimonial.author}</h4>
                        <p className="text-xs text-slate-400">{testimonial.authorTitle}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <div className="flex items-center justify-center gap-6 mt-8">
          <CarouselPrevious className="static translate-y-0 text-accent hover:text-primary border-0 bg-transparent hover:bg-transparent shadow-none" />
          <div className="flex items-center gap-2">
            {api?.scrollSnapList().map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  scrollTo(index);
                  stopAutoplay();
                }}
                className={cn(
                  'h-2 w-2 rounded-full transition-all duration-300',
                  current === index ? 'w-5 bg-accent' : 'bg-slate-300 hover:bg-slate-400'
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          <CarouselNext className="static translate-y-0 text-accent hover:text-primary border-0 bg-transparent hover:bg-transparent shadow-none" />
        </div>
      </Carousel>
      <div className="mt-12 text-center">
        <Link href="#" className="inline-flex items-center gap-2 text-accent font-semibold hover:text-primary transition-colors border-b-2 border-transparent hover:border-accent pb-0.5">
            View All Reviews <ArrowRight className="text-sm" />
        </Link>
      </div>
    </div>
  );
}
