'use client';

import React from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { CheckCircle2 } from 'lucide-react';

export function About() {
  const aboutImg = PlaceHolderImages.find(img => img.id === 'about-image');

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="textile-pattern absolute inset-0 z-0" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="animate-in slide-in-from-left duration-1000">
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

          <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl animate-in slide-in-from-right duration-1000">
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
                  <p className="text-4xl font-black text-primary">28+</p>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Years of Craft</p>
                </div>
                <div className="w-px h-12 bg-slate-200" />
                <div>
                  <p className="text-4xl font-black text-primary">500+</p>
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