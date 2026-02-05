import Link from 'next/link';
import Image from 'next/image';
import { Clock, CalendarDays, Star, Car, Layers, Flag, Download } from 'lucide-react';
import type { Tour } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { cn } from '@/lib/utils';

type TourCardProps = {
  tour: Tour & { isPast?: boolean };
};

export function TourCard({ tour }: TourCardProps) {
  const tourImage = PlaceHolderImages.find((p) => p.id === tour.image);

  return (
    <article className="relative flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group/card h-[540px]">
       {tour.isPast && (
        <div className="absolute inset-0 z-20 flex items-center justify-center rounded-2xl bg-black/60 backdrop-blur-sm">
          <span className="bg-white px-5 py-2 rounded-full text-sm font-bold text-primary shadow-lg uppercase tracking-wider">
            Completed
          </span>
        </div>
      )}
      {tourImage && (
        <div className={cn("absolute inset-0 z-0", tour.isPast && 'grayscale')}>
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
                        {tour.driveType === 'Self-Drive' ? <Car className="h-4 w-4 text-accent-light"/> : <Flag className="h-4 w-4 text-accent-light"/>}
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
                  <Button variant="outline" size="icon" className="h-12 w-12 shrink-0 rounded-xl bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 transition-all shadow-lg">
                      <Download className="h-5 w-5" />
                      <span className="sr-only">Download Brochure</span>
                  </Button>
                  <Button asChild variant="outline" className="h-12 flex-1 rounded-xl bg-white/10 backdrop-blur-sm border-white/30 text-sm font-bold text-white hover:bg-white/20 transition-all shadow-lg">
                      <Link href="#">View Trip</Link>
                  </Button>
                  <Button className="h-12 flex-1 rounded-xl bg-accent text-sm font-bold text-white hover:bg-accent-light shadow-lg hover:shadow-xl transition-all">
                      Enquire
                  </Button>
              </div>
          </div>
      </div>
    </article>
  );
}
