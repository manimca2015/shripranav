'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Compass, Users, Package, RefreshCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

const fourPs = [
  {
    title: 'Paradigm',
    desc: 'Core values, Business model and strategies aligned to ensure reliability and sustainability in operations.',
    icon: Compass,
    color: 'bg-blue-500'
  },
  {
    title: 'People',
    desc: 'Internal and External stakeholders’ commitment towards a team based approach for delivering excellence in the value chain.',
    icon: Users,
    color: 'bg-emerald-500'
  },
  {
    title: 'Product',
    desc: 'Customer centric design at every stage of manufacturing for enhanced customer experience.',
    icon: Package,
    color: 'bg-amber-500'
  },
  {
    title: 'Process',
    desc: 'Efficient workflows from sourcing to distribution, ensuring quality and sustainability.',
    icon: RefreshCcw,
    color: 'bg-rose-500'
  }
];

export function FourPs() {
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
    <section ref={sectionRef} className="py-24 bg-slate-900 text-white overflow-hidden relative">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -mr-64 -mt-64" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px] -ml-64 -mb-64" />
      <div className="textile-pattern absolute inset-0 opacity-[0.05] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className={cn(
          "max-w-4xl mx-auto text-center mb-20 transition-all duration-1000",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}>
          <span className="text-secondary font-bold uppercase tracking-widest text-sm mb-6 block">
            The Foundation of Our Excellence
          </span>
          <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
            India’s Essence, <br />
            <span className="text-secondary">Reimagined in Every Stitch.</span>
          </h2>
          <div className="w-24 h-1.5 bg-secondary mx-auto mb-10 rounded-full" />
          <h3 className="text-2xl md:text-3xl font-bold mb-6 text-white/90">
            Driving Growth through the 4Ps of Excellence
          </h3>
          <p className="text-xl text-white/60 leading-relaxed font-medium">
            We believe that sustainability and quality go hand in hand. Our business thrives on the foundation of 4 key principles — the 4Ps — ensuring we deliver exceptional value with every product we create.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {fourPs.map((p, i) => (
            <div 
              key={i} 
              className={cn(
                "group p-10 rounded-[40px] bg-white/5 border border-white/10 hover:bg-white/10 hover:border-secondary/40 transition-all duration-500 relative flex flex-col items-center text-center",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
              )}
              style={{ transitionDelay: `${i * 200}ms` }}
            >
              <div className={cn(
                "w-20 h-20 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 shadow-lg",
                p.color
              )}>
                <p.icon className="w-10 h-10 text-white" />
              </div>
              
              <h4 className="text-2xl font-black mb-4 text-white group-hover:text-secondary smooth-transition">
                {p.title}
              </h4>
              
              <p className="text-white/60 leading-relaxed font-medium text-sm">
                {p.desc}
              </p>

              {/* Decorative Number */}
              <span className="absolute top-6 right-8 text-white/5 text-6xl font-black pointer-events-none group-hover:text-secondary/10 transition-colors duration-500">
                0{i + 1}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
