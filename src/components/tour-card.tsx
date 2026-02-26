
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, CalendarDays, Star, Car, Layers, Flag, Download } from 'lucide-react';
import type { Tour } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { cn } from '@/lib/utils';
import { EnquiryModal } from './enquiry-modal';
import { BrochureEnquiryModal } from './brochure-enquiry-modal';

type TourCardProps = {
  tour: Tour;
};

export function TourCard({ tour }: TourCardProps) {
  const [isEnquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [isBrochureModalOpen, setBrochureModalOpen] = useState(false);
  const tourImage = PlaceHolderImages.find((p) => p.id === tour.image);

  return (
    <>
      <article className="relative flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group/card h-[540px]">
        {tourImage && (
          <div className="absolute inset-0 z-0">
              <Image 
                  className="w-full h-full object-cover transform group-hover/card:scale-110 transition-transform duration-700" 
                  src={tourImage.imageUrl} 
                  alt={tourImage.description}
                  fill
                  data-ai-hint={tourImage.imageHint}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent opacity-90"></div>
          </div>
        )}
        
        <div className="relative z-10 flex flex-col h-full p-6 text-white">
            <div className="flex items-start justify-between mb-auto">
                {tour.status && (
                  <Badge
                    className={cn(
                      'text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-lg',
                      tour.status === 'Trending' && 'bg-accent',
                      tour.status === 'Hot Deal' && 'bg-red-600',
                      tour.status === 'Epic Journey' && 'bg-purple-600',
                      tour.status === 'New' && 'bg-blue-600',
                      tour.status === 'Adventure' && 'bg-orange-600',
                      !['Trending', 'Hot Deal', 'Epic Journey', 'New', 'Adventure'].includes(tour.status) && 'bg-gray-800'
                    )}
                  >
                    {tour.status}
                  </Badge>
                )}
                {tour.rating && (
                  <div className="bg-white/20 backdrop-blur-md px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 shadow-lg border border-white/20">
                      <Star className="text-yellow-300 text-xs" fill="currentColor" />
                      <span className="text-xs font-bold text-white">{tour.rating}</span>
                  </div>
                )}
            </div>

            <div className="mt-auto space-y-4">
                <div>
                    <h3 className="font-headline text-2xl font-bold text-white mb-2 group-hover/card:text-accent-light transition-colors">{tour.title}</h3>
                    <p className="text-sm text-white/80 mb-3">{tour.destination}</p>
                    <div className="flex items-center gap-4 text-sm text-white/90 mb-4">
                        {tour.duration && (
                          <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-accent-light" />
                              <span className="font-medium">{tour.duration}</span>
                          </div>
                        )}
                        {tour.fullDate && (
                          <div className="flex items-center gap-2">
                              <CalendarDays className="h-4 w-4 text-accent-light" />
                              <span className="font-medium">{tour.fullDate}</span>
                          </div>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-3 pb-4 border-b border-white/20">
                    {tour.driveType && (
                      <div className="flex items-center gap-2 text-xs font-medium text-white/90">
                          {tour.driveType.toLowerCase().includes('self-drive') ? <Car className="h-4 w-4 text-accent-light"/> : <Flag className="h-4 w-4 text-accent-light"/>}
                          <span>{tour.driveType}</span>
                      </div>
                    )}
                    <div className="w-1 h-1 rounded-full bg-white/40"></div>
                    {tour.level && (
                      <div className="flex items-center gap-2 text-xs font-medium text-white/90">
                          <Layers className="h-4 w-4 text-accent-light"/>
                          <span>{tour.level}</span>
                      </div>
                    )}
                </div>

                <div className="flex items-center gap-3">
                    {tour.brochureUrl ? (
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-12 w-12 shrink-0 rounded-xl bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-[#e0af29] hover:text-black transition-all shadow-lg"
                        onClick={() => setBrochureModalOpen(true)}
                      >
                        <Download className="h-5 w-5" />
                        <span className="sr-only">Download Brochure</span>
                      </Button>
                    ) : (
                      <Button variant="outline" size="icon" className="h-12 w-12 shrink-0 rounded-xl bg-white/10 backdrop-blur-sm border-white/30 text-white transition-all shadow-lg opacity-50" disabled>
                        <Download className="h-5 w-5" />
                        <span className="sr-only">Download Brochure</span>
                      </Button>
                    )}
                    <Button 
                      className="h-12 flex-1 rounded-xl bg-accent text-sm font-bold text-accent-foreground hover:bg-primary hover:text-white shadow-lg hover:shadow-xl transition-all border border-transparent hover:border-[#e0af29]"
                      onClick={() => setEnquiryModalOpen(true)}
                    >
                        Enquire
                    </Button>
                </div>
            </div>
        </div>
      </article>
      <EnquiryModal 
        isOpen={isEnquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
        tourName={tour.title}
      />
      {tour.brochureUrl && (
        <BrochureEnquiryModal
          isOpen={isBrochureModalOpen}
          onClose={() => setBrochureModalOpen(false)}
          tourName={tour.title}
          brochureUrl={tour.brochureUrl}
        />
      )}
    </>
  );
}
