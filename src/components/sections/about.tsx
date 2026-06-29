'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

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

export function About() {
  const aboutImg = PlaceHolderImages.find(img => img.id === 'about-image');
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
            <span className="text-secondary font-bold uppercase tracking-widest text-sm mb-4 block">Crafting Excellence</span>
            <h2 className="text-4xl md:text-5xl font-black text-primary mb-8 leading-tight">
              About <span className="text-secondary">Shri Pranav</span>
            </h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Welcome to Shri Pranav — a trusted name in textile manufacturing, built on a foundation of integrity, innovation, and respect for people and the planet. With decades of industry experience, we specialize in delivering high-quality textile solutions while fostering a workplace that values both performance and people.
            </p>
            
            <div className="space-y-4 mb-10">
              {[
                'Integrity & Transparency',
                'Innovative Smart Technologies',
                'Eco-conscious Sustainability',
                'Empowering Women Workforce'
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="text-secondary w-6 h-6" />
                  <span className="font-bold text-slate-700">{item}</span>
                </div>
              ))}
            </div>

            <div className="p-8 glass-card rounded-2xl border-l-8 border-l-secondary">
              <p className="italic text-primary font-medium text-lg">
                "Our commitment to quality is woven into every thread, ensuring that we not only meet expectations but define them."
              </p>
            </div>
          </div>

          <div className={cn("relative h-[600px] rounded-3xl overflow-hidden shadow-2xl transition-all duration-1000 delay-300", isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12")}>
            {aboutImg && (
              <Image
                src={aboutImg.imageUrl}
                alt={aboutImg.description}
                fill
                className="object-cover"
                data-ai-hint={aboutImg.imageHint}
              />
            )}
            <div className="absolute bottom-8 left-8 right-8 p-6 bg-white/90 backdrop-blur rounded-2xl shadow-lg border border-slate-100">
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
