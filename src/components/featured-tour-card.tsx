'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { Tour } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from './ui/button';
import { BrochureEnquiryModal } from './brochure-enquiry-modal';
import { Badge } from './ui/badge';
import { Clock } from 'lucide-react';

type FeaturedTourCardProps = {
  tour: Tour;
};

export function FeaturedTourCard({ tour }: FeaturedTourCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const tourImage = PlaceHolderImages.find((p) => p.id === tour.image);

  return (
    <>
      <Card className="rounded-3xl overflow-hidden shadow-xl shadow-slate-200/50 card-hover border border-slate-100 flex flex-col h-full">
          <div className="h-60 relative overflow-hidden shrink-0">
              {tourImage && (
                <Image 
                  className="w-full h-full object-cover" 
                  src={tourImage.imageUrl} 
                  alt={tourImage.description} 
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  data-ai-hint={tourImage.imageHint}
                  />
              )}
              <div className="absolute top-4 left-4 bg-accent text-white px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-lg">{tour.date}</div>
          </div>
          <CardContent className="p-6 flex flex-col flex-grow">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <h3 className="text-xl font-bold font-headline text-primary leading-tight">{tour.title}</h3>
                <Badge variant="secondary" className="bg-accent/10 text-accent hover:bg-accent/20 border-none font-bold py-0.5 h-6">
                  <Clock className="w-3 h-3 mr-1" /> {tour.duration}
                </Badge>
              </div>
              <p className="text-slate-600 mb-4 text-xs leading-relaxed flex-grow line-clamp-2">{tour.description}</p>
              
              <div className="grid grid-cols-3 gap-2 mb-5 py-4 border-y border-slate-100">
                  <div className="text-center">
                      <span className="block text-slate-400 text-[10px] uppercase font-bold mb-1 tracking-wider">Dates</span>
                      <span className="text-primary font-bold text-[11px] leading-tight block">{tour.fullDate || tour.date}</span>
                  </div>
                  <div className="text-center border-x border-slate-100">
                      <span className="block text-slate-400 text-[10px] uppercase font-bold mb-1 tracking-wider">Distance</span>
                      <span className="text-primary font-bold text-[11px] leading-tight block">{tour.distance ? `${tour.distance} KM` : 'TBA'}</span>
                  </div>
                  <div className="text-center">
                      <span className="block text-slate-400 text-[10px] uppercase font-bold mb-1 tracking-wider">Level</span>
                      <span className="text-primary font-bold text-[11px] leading-tight block">{tour.level}</span>
                  </div>
              </div>
              
              {tour.brochureUrl ? (
                <Button 
                  onClick={() => setIsModalOpen(true)}
                  className="w-full py-3 h-auto rounded-xl bg-primary text-white font-bold text-sm hover:bg-accent hover:text-accent-foreground transition-all"
                >
                  View Itinerary
                </Button>
              ) : (
                <Button disabled className="w-full py-3 h-auto rounded-xl bg-primary/50 text-white font-bold text-sm cursor-not-allowed">
                  No Itinerary Available
                </Button>
              )}
          </CardContent>
      </Card>
      
      {tour.brochureUrl && (
        <BrochureEnquiryModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          tourName={tour.title}
          brochureUrl={tour.brochureUrl}
        />
      )}
    </>
  );
}