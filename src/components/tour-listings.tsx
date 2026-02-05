
'use client';

import { useState, useMemo } from 'react';
import type { Tour } from '@/lib/types';
import { TourCard } from './tour-card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { parse, format } from 'date-fns';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

type TourListingsProps = {
  tours: Tour[];
};

export function TourListings({ tours }: TourListingsProps) {
  const availableMonths = useMemo(() => {
    if (!tours || tours.length === 0) {
      return [];
    }
    const dates = tours.map(tour => {
      try {
        // Assuming tour.date is "Month YYYY" e.g. "February 2026"
        return parse(tour.date, 'MMMM yyyy', new Date());
      } catch (e) {
        console.error("Invalid date format for", tour.date);
        return null;
      }
    }).filter((date): date is Date => date !== null);
    
    dates.sort((a, b) => a.getTime() - b.getTime());
    const monthStrings = dates.map(date => format(date, 'MMMM yyyy'));
    return ['All', ...new Set(monthStrings)];
  }, [tours]);

  const [selectedMonth, setSelectedMonth] = useState<string>('All');

  const filteredTours = useMemo(() => {
    if (selectedMonth === 'All') {
      return tours;
    }
    if (!selectedMonth) {
      return [];
    }
    return tours.filter((tour) => tour.date === selectedMonth);
  }, [tours, selectedMonth]);

  if (tours.length === 0) {
    return <p className="text-center text-muted-foreground">No tours available.</p>;
  }

  return (
    <div className="w-full max-w-7xl">
      <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-4 mb-12">
        {availableMonths.map((month) => (
          <button
            key={month}
            onClick={() => setSelectedMonth(month)}
            className={cn(
              'px-6 py-2.5 rounded-full font-medium text-sm transition-all whitespace-nowrap',
              selectedMonth === month
                ? 'bg-accent text-accent-foreground shadow-md'
                : 'border border-input bg-background text-primary hover:bg-secondary'
            )}
          >
            {month === 'All' ? 'All' : format(parse(month, 'MMMM yyyy', new Date()), 'MMMM')}
          </button>
        ))}
      </div>

      {filteredTours.length > 0 ? (
        <Carousel 
          opts={{
            align: "start",
            loop: filteredTours.length > 4,
          }}
          className="w-full relative group"
        >
          <CarouselContent className="-ml-6">
            {filteredTours.map((tour) => (
              <CarouselItem key={tour.id} className="pl-6 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                <TourCard tour={tour} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute -left-12 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-white border text-muted-foreground shadow-lg hover:text-accent hover:border-accent transition-all opacity-0 group-hover:opacity-100 duration-300" />
          <CarouselNext className="absolute -right-12 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-white border text-muted-foreground shadow-lg hover:text-accent hover:border-accent transition-all opacity-0 group-hover:opacity-100 duration-300" />
        </Carousel>
      ) : (
        <p className="text-center text-muted-foreground">No tours available for {selectedMonth}.</p>
      )}
    </div>
  );
}
