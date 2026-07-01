'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
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

const aboutImages = [
  '/about-img1.jpg',
  '/about-img2.jpg',
  '/about-img3.jpg',
  '/about-img4.jpg',
];

export function About() {
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
    <section ref={sectionRef} className="py-24 relative overflow-hidden">
      <div className="textile-pattern absolute inset-0 z-0" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className={cn("transition-all duration-1000", isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12")}>
            <span className="text-secondary font-bold uppercase tracking-widest text-sm mb-4 block">Heritage, Handled Beautifully</span>
            <h2 className="text-4xl md:text-5xl font-black text-primary mb-8 leading-tight">
              Fabrics uniting <br /> <span className="text-secondary">luxury and tradition</span>
            </h2>
            <p className="text-lg text-slate-600 mb-12 leading-relaxed">
              Originating as M/s Manju Exports in 1994, we evolved into Shri Pranav Textile Creations Pvt Ltd in 2020. Our commitment lies in producing high-quality textiles using materials like organic cotton, FairTrade cotton, polyester, viscose, and more, ensuring sustainability at every step.
            </p>
          </div>

          <div className={cn("relative h-[600px] transition-all duration-1000 delay-300", isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12")}>
            <div className="relative h-full rounded-[40px] overflow-hidden shadow-2xl">
              <Carousel 
                plugins={[
                  Autoplay({
                    delay: 4000,
                    stopOnInteraction: false,
                  }),
                ]}
                opts={{
                  loop: true,
                }}
                className="w-full h-full"
              >
                <CarouselContent className="h-[600px]">
                  {aboutImages.map((src, i) => (
                    <CarouselItem key={i} className="relative h-full">
                      <Image
                        src={src}
                        alt={`Shri Pranav Factory ${i + 1}`}
                        fill
                        className="object-cover"
                        priority={i === 0}
                        data-ai-hint="textile factory"
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>

            <div className="absolute bottom-8 left-8 right-8 p-6 bg-white/90 backdrop-blur rounded-2xl shadow-lg border border-slate-100 z-20">
              <div className="flex items-center gap-6">
                <div>
                  <p className="text-4xl font-black text-primary">
                    {isVisible && <CountUp end={28} suffix="+" />}
                  </p>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Years of Craft</p>
                </div>
                <div className="w-px h-12 bg-slate-200" />
                <div>
                  <p className="text-4xl font-black text-primary">
                    {isVisible && <CountUp end={500} suffix="+" />}
                  </p>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Global Partners</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
