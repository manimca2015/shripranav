import Image from 'next/image';
import type { Tour } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from './ui/button';

type FeaturedTourCardProps = {
  tour: Tour;
};

export function FeaturedTourCard({ tour }: FeaturedTourCardProps) {
  const tourImage = PlaceHolderImages.find((p) => p.id === tour.image);

  return (
    <Card className="rounded-3xl overflow-hidden shadow-xl shadow-slate-200/50 card-hover border border-slate-100 flex flex-col">
        <div className="h-80 relative overflow-hidden shrink-0">
            {tourImage && (
              <Image 
                className="w-full h-full object-cover" 
                src={tourImage.imageUrl} 
                alt={tourImage.description} 
                width={400}
                height={320}
                data-ai-hint={tourImage.imageHint}
                />
            )}
            <div className="absolute top-6 left-6 bg-accent text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider">{tour.date}</div>
        </div>
        <CardContent className="p-8 flex flex-col flex-grow">
            <h3 className="text-3xl font-bold font-headline text-primary mb-3">{tour.title}</h3>
            <p className="text-slate-600 mb-6 leading-relaxed flex-grow">{tour.description}</p>
            <div className="grid grid-cols-3 gap-4 mb-8 py-6 border-y border-slate-100">
                <div className="text-center">
                    <span className="block text-slate-400 text-xs uppercase font-bold mb-1">Duration</span>
                    <span className="text-primary font-bold">{tour.duration}</span>
                </div>
                <div className="text-center border-x border-slate-100">
                    <span className="block text-slate-400 text-xs uppercase font-bold mb-1">Distance</span>
                    <span className="text-primary font-bold">{tour.distance} KM</span>
                </div>
                <div className="text-center">
                    <span className="block text-slate-400 text-xs uppercase font-bold mb-1">Level</span>
                    <span className="text-primary font-bold">{tour.level}</span>
                </div>
            </div>
            <Button asChild className="w-full py-4 h-auto rounded-xl bg-primary text-white font-bold hover:bg-accent hover:text-accent-foreground transition-all">
              <a href={tour.brochureUrl} target="_blank" rel="noopener noreferrer">View Full Itinerary</a>
            </Button>
        </CardContent>
    </Card>
  );
}
