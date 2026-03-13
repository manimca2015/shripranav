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
          <div className="h-72 relative overflow-hidden shrink-0">
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
              <div className="absolute top-6 left-6 bg-accent text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">{tour.date}</div>
          </div>
          <CardContent className="p-8 flex flex-col flex-grow">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <h3 className="text-2xl font-bold font-headline text-primary">{tour.title}</h3>
                <Badge variant="secondary" className="bg-accent/10 text-accent hover:bg-accent/20 border-none font-bold py-1">
                  <Clock className="w-3 h-3 mr-1" /> {tour.duration}
                </Badge>
              </div>
              <p className="text-slate-600 mb-6 text-sm leading-relaxed flex-grow line-clamp-2">{tour.description}</p>
              
              <div className="grid grid-cols-3 gap-2 mb-8 py-6 border-y border-slate-100">
                  <div className="text-center">
                      <span className="block text-slate-400 text-[10px] uppercase font-bold mb-1 tracking-wider">Dates</span>
                      <span className="text-primary font-bold text-xs">{tour.fullDate || tour.date}</span>
                  </div>
                  <div className="text-center border-x border-slate-100">
                      <span className="block text-slate-400 text-[10px] uppercase font-bold mb-1 tracking-wider">Distance</span>
                      <span className="text-primary font-bold text-xs">{tour.distance ? `${tour.distance} KM` : 'TBA'}</span>
                  </div>
                  <div className="text-center">
                      <span className="block text-slate-400 text-[10px] uppercase font-bold mb-1 tracking-wider">Level</span>
                      <span className="text-primary font-bold text-xs">{tour.level}</span>
                  </div>
              </div>
              
              {tour.brochureUrl ? (
                <Button 
                  onClick={() => setIsModalOpen(true)}
                  className="w-full py-4 h-auto rounded-xl bg-primary text-white font-bold hover:bg-accent hover:text-accent-foreground transition-all"
                >
                  View Itinerary
                </Button>
              ) : (
                <Button disabled className="w-full py-4 h-auto rounded-xl bg-primary/50 text-white font-bold cursor-not-allowed">
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
