
'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
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
import { TestimonialModal } from './testimonial-modal';
import type { Testimonial } from '@/lib/types';

export function TestimonialsCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const autoplayInterval = useRef<number | null>(null);
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);

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
    if (testimonials.length > 1) {
      startAutoplay();
    }

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
    <>
      <div onMouseEnter={stopAutoplay} onMouseLeave={startAutoplay}>
        <Carousel
          setApi={setApi}
          opts={{
            align: 'center',
            loop: testimonials.length > 1,
          }}
          className="w-full max-w-7xl mx-auto"
        >
          <CarouselContent className="-ml-8">
            {testimonials.map((testimonial, index) => {
              const avatar = PlaceHolderImages.find(p => p.id === testimonial.avatarId);
              const isCenter = current === index;
              
              return (
                <CarouselItem key={testimonial.id} className="pl-8 md:basis-1/2 lg:basis-1/3 group">
                  <button
                    className="p-1 h-full w-full text-left"
                    onClick={() => setSelectedTestimonial(testimonial)}
                    aria-label={`Read full review from ${testimonial.author}`}
                  >
                    <div 
                      className={cn(
                        "bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col justify-between h-full group-hover:shadow-2xl transition-all duration-500 ease-out",
                        isCenter ? "transform md:-translate-y-4" : "md:translate-y-0"
                      )}
                    >
                      <div>
                        <div className="flex text-yellow-400 mb-4 text-xs">
                          {Array.from({ length: 5 }).map((_, i) => (
                             <Star key={i} fill="currentColor" size={16} className={i < testimonial.rating ? 'text-yellow-400' : 'text-slate-300'}/>
                          ))}
                        </div>
                        <p className="text-slate-600 italic leading-relaxed mb-6 font-light line-clamp-5">
                          "{testimonial.text}"
                        </p>
                      </div>
                      <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                        <div className="flex items-center gap-4">
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
                        <span className="text-xs font-bold text-accent flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity group-hover:underline">
                          View <ArrowRight className="h-3 w-3" />
                        </span>
                      </div>
                    </div>
                  </button>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          {testimonials.length > 1 && (
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
          )}
        </Carousel>
        <div className="mt-12 text-center">
          <a
            href="https://www.google.com/maps/place/Fairfuture+travels+and+vacations/@9.9590065,73.850438,8z/data=!4m8!3m7!1s0x3b087300254f299d:0x43297b2b50416ad1!8m2!3d9.9590065!4d76.2894028!9m1!1b1!16s%2Fg%2F11vxpvbhjl!5m1!1e1?entry=ttu&g_ep=EgoyMDI2MDIwMS4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-accent font-semibold hover:text-primary transition-colors border-b-2 border-transparent hover:border-accent pb-0.5"
          >
              View All Reviews <ArrowRight className="text-sm" />
          </a>
        </div>
      </div>
      {selectedTestimonial && (
        <TestimonialModal
          isOpen={!!selectedTestimonial}
          onClose={() => setSelectedTestimonial(null)}
          testimonial={selectedTestimonial}
        />
      )}
    </>
  );
}
