'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, Leaf, Palette, Truck } from 'lucide-react';
import { cn } from '@/lib/utils';

const features = [
  {
    icon: ShieldCheck,
    title: 'Quality-Driven Manufacturing',
    desc: 'Strict quality checks at every stage'
  },
  {
    icon: Leaf,
    title: 'Sustainable & Ethical Practices',
    desc: 'Responsible materials and processes'
  },
  {
    icon: Palette,
    title: 'Customization Expertise',
    desc: 'Flexible designs to meet diverse requirements'
  },
  {
    icon: Truck,
    title: 'Reliable Delivery',
    desc: 'Scalable production with timely execution'
  }
];

export function WhyChooseUs() {
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
    <section ref={sectionRef} className="py-24 bg-white overflow-hidden relative">
      <div className="textile-pattern absolute inset-0 opacity-[0.02] pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className={cn(
          "text-center mb-20 max-w-3xl mx-auto transition-all duration-1000",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}>
          <span className="text-secondary font-bold uppercase tracking-widest text-sm mb-4 block">Why Shri Pranav?</span>
          <h2 className="text-4xl md:text-5xl font-black text-primary mb-6">Why Choose Us</h2>
          <p className="text-xl text-slate-600 leading-relaxed">
            Because quality, responsibility, and reliability are built into everything we do.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, i) => (
            <div 
              key={i} 
              className={cn(
                "p-10 rounded-[48px] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl hover:border-secondary/20 transition-all duration-500 group relative overflow-hidden",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
              )}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 group-hover:bg-secondary/10 transition-colors duration-500" />
              
              <div className="w-16 h-16 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center mb-8 group-hover:bg-secondary group-hover:scale-110 smooth-transition text-primary group-hover:text-white relative z-10">
                <item.icon className="w-8 h-8" />
              </div>
              
              <h3 className="text-xl font-black text-primary mb-4 leading-tight relative z-10">{item.title}</h3>
              <p className="text-slate-500 font-medium leading-relaxed relative z-10">{item.desc}</p>
              
              <div className="absolute bottom-0 left-0 h-1.5 w-0 bg-secondary group-hover:w-full transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
