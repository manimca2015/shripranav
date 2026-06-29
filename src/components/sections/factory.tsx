'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Settings, Droplets, Ruler, ShieldCheck, Factory as FactoryIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const processes = [
  { icon: Ruler, title: 'Design & Sampling', desc: 'Crafting initial prototypes based on buyer specs.' },
  { icon: Settings, title: 'Automated Weaving', desc: 'High-speed modern machinery for fabric production.' },
  { icon: Droplets, title: 'Eco-Dyeing', desc: 'Sustainable finishing with minimal water waste.' },
  { icon: ShieldCheck, title: 'Quality Assurance', desc: 'Rigorous testing at every stage of manufacturing.' },
];

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
    <section ref={sectionRef} className="py-24 bg-primary text-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className={cn("relative transition-all duration-1000", isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12")}>
            <div className="absolute -top-12 -left-12 w-64 h-64 bg-secondary/20 rounded-full blur-3xl" />
            <div className="relative z-10">
              <span className="text-secondary font-bold uppercase tracking-widest text-sm mb-4 block">State-of-the-Art Facility</span>
              <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
                Our Modern <br /> <span className="text-secondary">Manufacturing</span>
              </h2>
              <p className="text-lg text-white/70 mb-10 leading-relaxed">
                Shri Pranav operates a fully integrated manufacturing unit equipped with the latest European machinery, ensuring precision, efficiency, and scale for international orders.
              </p>

              <div className="grid sm:grid-cols-2 gap-8">
                {processes.map((proc, i) => (
                  <div key={i} className={cn("flex gap-4 transition-all duration-700", isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6")} style={{ transitionDelay: `${i * 150}ms` }}>
                    <div className="shrink-0 w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-secondary border border-white/10">
                      <proc.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">{proc.title}</h4>
                      <p className="text-xs text-white/50 leading-relaxed">{proc.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Button size="lg" className="mt-12 rounded-full bg-secondary hover:bg-white hover:text-primary smooth-transition px-10 h-14 font-bold">
                Tour Our Facility
              </Button>
            </div>
          </div>

          <div className={cn("relative h-[650px] rounded-[40px] overflow-hidden group shadow-2xl transition-all duration-1000 delay-500", isVisible ? "opacity-100 scale-100 rotate-3 hover:rotate-0" : "opacity-0 scale-90 rotate-0")}>
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
            <div className="absolute bottom-10 left-10 p-8 glass-card border-none rounded-3xl max-w-sm">
              <FactoryIcon className="text-secondary w-12 h-12 mb-4" />
              <h4 className="text-primary text-xl font-black mb-2">Sustainable Unit</h4>
              <p className="text-slate-600 text-sm">Our factory runs on 40% renewable energy and recycles 100% of production waste.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
