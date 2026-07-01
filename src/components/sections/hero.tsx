'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { QuoteRequestModal } from '@/components/quote-request-modal';
import Link from 'next/link';
import Slider from 'react-slick';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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

function NextArrow(props: any) {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="w-14 h-14 bg-white/5 hover:bg-white/20 border border-white/10 text-white transition-all backdrop-blur-md rounded-2xl flex items-center justify-center focus:outline-none"
      aria-label="Next slide"
    >
      <ChevronRight className="h-6 w-6" />
    </button>
  );
}

function PrevArrow(props: any) {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="w-14 h-14 bg-white/5 hover:bg-white/20 border border-white/10 text-white transition-all backdrop-blur-md rounded-2xl flex items-center justify-center focus:outline-none"
      aria-label="Previous slide"
    >
      <ChevronLeft className="h-6 w-6" />
    </button>
  );
}

export function Hero() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    fade: true,
    className: "hero-slider h-screen w-full"
  };

  const sliderRef = React.useRef<Slider | null>(null);

  return (
    <section className="relative min-h-screen flex flex-col bg-slate-900 overflow-hidden">
      <div className="flex-1 w-full">
        <Slider ref={sliderRef} {...settings}>
          {slides.map((slide, index) => {
            const slideImg = PlaceHolderImages.find(img => img.id === slide.imageId);
            return (
              <div key={index} className="relative h-screen outline-none">
                <div className="absolute inset-0 z-0 overflow-hidden">
                  {slideImg && (
                    <Image
                      src={slideImg.imageUrl}
                      alt={slideImg.description}
                      fill
                      className="object-cover opacity-60"
                      priority={index === 0}
                      data-ai-hint={slideImg.imageHint}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/50 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-900/80" />
                </div>

                <div className="container mx-auto px-4 relative z-10 h-full flex flex-col justify-center">
                  <div className="max-w-3xl pt-20 pb-32 md:pb-48">
                    <span className="inline-block bg-secondary text-white px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] mb-8 animate-in fade-in slide-in-from-left duration-700">
                      {slide.tag}
                    </span>
                    <h1 className="text-4xl md:text-5xl font-black text-white leading-[1.1] mb-6 tracking-tight animate-in fade-in slide-in-from-bottom duration-700 delay-200">
                      {slide.heading}
                    </h1>
                    <p className="text-lg md:text-xl text-white/80 mb-10 max-w-xl font-medium leading-relaxed animate-in fade-in slide-in-from-bottom duration-700 delay-300">
                      {slide.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-5 animate-in fade-in slide-in-from-bottom duration-700 delay-500">
                      <Button asChild size="lg" className="rounded-full bg-white text-primary hover:bg-white/90 px-10 h-14 font-bold text-lg transition-all shadow-xl hover:-translate-y-1">
                        <Link href="/products">{slide.btn1}</Link>
                      </Button>
                      <Button onClick={() => setIsQuoteModalOpen(true)} size="lg" className="rounded-full bg-secondary text-white hover:bg-secondary/90 px-10 h-14 font-bold text-lg shadow-xl shadow-secondary/20 transition-all hover:-translate-y-1">
                        {slide.btn2}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>

      {/* Navigation Controls */}
      <div className="absolute right-6 md:right-12 bottom-44 md:bottom-48 z-30 flex gap-4">
        <PrevArrow onClick={() => sliderRef.current?.slickPrev()} />
        <NextArrow onClick={() => sliderRef.current?.slickNext()} />
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20 pb-8 md:pb-12 pt-16 bg-gradient-to-t from-slate-900 to-transparent pointer-events-none">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 border-t border-white/10 pt-10">
            {stats.map((stat, i) => (
              <div key={i} className="flex flex-col items-center md:items-start group">
                <div className="text-3xl md:text-4xl font-black text-secondary mb-1 transition-transform group-hover:scale-105 duration-300">
                  <CountUp end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-[10px] md:text-xs text-white/50 font-bold uppercase tracking-[0.15em] whitespace-nowrap">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <QuoteRequestModal isOpen={isQuoteModalOpen} onOpenChange={setIsQuoteModalOpen} />
    </section>
  );
}
