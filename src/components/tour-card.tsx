'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Tour } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card } from '@/components/ui/card';
import { Button } from './ui/button';
import { Clock, Download } from 'lucide-react';
import { EnquiryModal } from './enquiry-modal';
import { BrochureEnquiryModal } from './brochure-enquiry-modal';
import { cn } from '@/lib/utils';

type TourCardProps = { tour: Tour };

export function TourCard({ tour }: TourCardProps) {
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [isBrochureModalOpen, setIsBrochureModalOpen] = useState(false);
  const tourImage = PlaceHolderImages.find((p) => p.id === tour.image);
  
  const hasDedicatedPage = ['spiti-valley', 'thailand-self-drive'].includes(tour.id);
  const CardWrapper = hasDedicatedPage ? Link : 'div';

  return (
    <>
      <Card className="rounded-3xl overflow-hidden shadow-xl shadow-slate-200/50 card-hover border border-slate-100 flex flex-col h-full group/card bg-white">
        <CardWrapper 
          {...(hasDedicatedPage ? { href: `/tours/${tour.id}` } : {})} 
          className={cn("flex flex-col flex-grow group/card-link", hasDedicatedPage ? "cursor-pointer" : "cursor-default")}
        >
          <div className="h-60 relative overflow-hidden shrink-0">
            {tourImage && (
              <Image
                className={cn(
                  "w-full h-full object-cover transition-transform duration-700",
                  hasDedicatedPage && "group-hover/card-link:scale-110"
                )}
                src={tourImage.imageUrl}
                alt={tourImage.description}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                data-ai-hint={tourImage.imageHint}
              />
            )}
            {/* Date Badge - Top Left */}
            <div className="absolute top-4 left-4 bg-accent text-white px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-lg z-10">
              {tour.date}
            </div>

            {/* Duration Badge - Top Right */}
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-primary px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-lg flex items-center gap-1.5 border border-slate-100 z-10">
              <Clock className="w-3 h-3 text-primary" />
              <span>{tour.duration}</span>
            </div>
          </div>
          <div className="p-6 flex flex-col flex-grow">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <h3 className={cn(
                "text-xl font-bold font-headline text-primary leading-tight transition-colors",
                hasDedicatedPage && "group-hover/card-link:text-accent"
              )}>
                {tour.title}
              </h3>
            </div>
            <p className="text-slate-600 mb-4 text-xs leading-relaxed flex-grow line-clamp-2">
              {tour.description}
            </p>

            <div className="grid grid-cols-3 gap-2 mb-5 py-4 border-y border-slate-100">
              <div className="text-center">
                <span className="block text-slate-400 text-[10px] uppercase font-bold mb-1 tracking-wider">
                  Dates
                </span>
                <span className="text-primary font-bold text-[11px] leading-tight block">
                  {tour.fullDate || tour.date}
                </span>
              </div>
              <div className="text-center border-x border-slate-100">
                <span className="block text-slate-400 text-[10px] uppercase font-bold mb-1 tracking-wider">
                  Distance
                </span>
                <span className="text-primary font-bold text-[11px] leading-tight block">
                  {tour.distance ? `${tour.distance} KM` : 'TBA'}
                </span>
              </div>
              <div className="text-center">
                <span className="block text-slate-400 text-[10px] uppercase font-bold mb-1 tracking-wider">
                  Level
                </span>
                <span className="text-primary font-bold text-[11px] leading-tight block">
                  {tour.level}
                </span>
              </div>
            </div>
          </div>
        </CardWrapper>
        
        <div className="px-6 pb-6 flex gap-3">
          {tour.brochureUrl && (
            <Button
              variant="outline"
              size="icon"
              onClick={(e) => {
                e.preventDefault();
                setIsBrochureModalOpen(true);
              }}
              className="h-12 w-12 shrink-0 rounded-xl border-slate-200 text-slate-400 hover:text-accent hover:border-accent transition-all"
            >
              <Download className="h-5 w-5" />
            </Button>
          )}
          <Button
            onClick={(e) => {
              e.preventDefault();
              setIsEnquiryModalOpen(true);
            }}
            className={cn(
              "h-12 rounded-xl bg-primary text-white font-bold text-sm hover:bg-accent hover:text-accent-foreground transition-all",
              tour.brochureUrl ? "flex-1" : "w-full"
            )}
          >
            Enquire Now
          </Button>
        </div>
      </Card>

      <EnquiryModal
        isOpen={isEnquiryModalOpen}
        onClose={() => setIsEnquiryModalOpen(false)}
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
