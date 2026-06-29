
'use client';

import React from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const certifications = [
  { id: 'cert-iso', name: 'ISO 9001' },
  { id: 'cert-gots', name: 'GOTS Certified' },
  { id: 'cert-oeko', name: 'OEKO-TEX' },
  { id: 'cert-sa8000', name: 'SA 8000' },
  { id: 'cert-fairtrade', name: 'Fair Trade' },
  { id: 'cert-wrap', name: 'WRAP' },
];

export function Awards() {
  // Triple the items to ensure seamless infinite scroll
  const scrollItems = [...certifications, ...certifications, ...certifications];

  return (
    <section className="py-24 bg-white overflow-hidden border-t border-slate-50">
      <div className="container mx-auto px-4 mb-16 text-center max-w-3xl">
        <span className="text-secondary font-bold uppercase tracking-widest text-sm mb-4 block">Recognition</span>
        <h2 className="text-4xl md:text-5xl font-black text-primary mb-6">Awards & Recognition</h2>
        <p className="text-slate-600">
          Our commitment to innovation and responsible manufacturing has been recognized through industry awards and certifications, reflecting our continuous pursuit of excellence.
        </p>
      </div>

      <div className="relative group">
        {/* Shadow Overlays for Fade Effect */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="flex animate-marquee hover:pause-marquee">
          {scrollItems.map((cert, index) => {
            const img = PlaceHolderImages.find(i => i.id === cert.id);
            return (
              <div 
                key={`${cert.id}-${index}`} 
                className="flex-shrink-0 mx-8 md:mx-12 lg:mx-16 flex items-center justify-center grayscale opacity-50 hover:grayscale-0 hover:opacity-100 smooth-transition"
              >
                {img && (
                  <div className="relative w-32 h-16 md:w-40 md:h-20 lg:w-48 lg:h-24">
                    <Image
                      src={img.imageUrl}
                      alt={cert.name}
                      fill
                      className="object-contain"
                      data-ai-hint={img.imageHint}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
          width: max-content;
        }
        .pause-marquee {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
