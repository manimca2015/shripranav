import { tours } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Clock, MapPin, DollarSign, Calendar, TrendingUp, Route } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export async function generateStaticParams() {
  return tours.map((tour) => ({
    id: tour.id,
  }));
}

export default function TourDetailPage({ params }: { params: { id: string } }) {
  const tour = tours.find((t) => t.id === params.id);

  if (!tour) {
    notFound();
  }

  const tourImage = PlaceHolderImages.find((p) => p.id === tour.image);
  const formattedPrice = tour.price ? new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(tour.price) : 'Contact us';

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 py-12 md:py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
            <div className="lg:col-span-3">
              <div className="relative h-[400px] w-full mb-8 rounded-lg overflow-hidden shadow-lg">
                {tourImage && (
                  <Image
                    src={tourImage.imageUrl}
                    alt={tourImage.description}
                    fill
                    className="object-cover"
                    data-ai-hint={tourImage.imageHint}
                  />
                )}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4 text-primary">{tour.title}</h1>
              <p className="text-lg text-muted-foreground mb-6">{tour.description}</p>
              
               <div className="mb-6">
                  <h3 className="font-bold font-headline text-xl mb-3">Trip Highlights</h3>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2">
                    {tour.pointsOfInterest?.map(poi => <li key={poi}>{poi}</li>)}
                  </ul>
              </div>

              {tour.itinerary && tour.itinerary.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-bold font-headline text-xl mb-3">Daily Itinerary</h3>
                  <Accordion type="single" collapsible className="w-full">
                    {tour.itinerary.map((item) => (
                      <AccordionItem value={`item-${item.day}`} key={item.day}>
                        <AccordionTrigger>Day {item.day}: {item.title}</AccordionTrigger>
                        <AccordionContent>
                          {item.description}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              )}

               <div className="mb-6">
                  <h3 className="font-bold font-headline text-xl mb-3">Accommodation</h3>
                  <p className="text-muted-foreground">{tour.accommodation}</p>
              </div>
            </div>
            
            <div className="lg:col-span-2">
                <div className="sticky top-24">
                  <Card className="mb-6 shadow-lg">
                    <CardContent className="p-6 grid grid-cols-1 gap-4 text-sm">
                      <div className="flex items-center gap-3 text-muted-foreground"><Calendar className="h-5 w-5 text-accent"/><div><strong>Date:</strong> <Badge variant="outline">{tour.date}</Badge></div></div>
                      <div className="flex items-center gap-3 text-muted-foreground"><Clock className="h-5 w-5 text-accent"/><div><strong>Duration:</strong> <Badge variant="outline">{tour.duration}</Badge></div></div>
                      <div className="flex items-center gap-3 text-muted-foreground"><MapPin className="h-5 w-5 text-accent"/><div><strong>Destination:</strong> {tour.destination}</div></div>
                      {tour.distance && <div className="flex items-center gap-3 text-muted-foreground"><Route className="h-5 w-5 text-accent"/><div><strong>Distance:</strong> <Badge variant="outline">{tour.distance} KM</Badge></div></div>}
                      {tour.level && <div className="flex items-center gap-3 text-muted-foreground"><TrendingUp className="h-5 w-5 text-accent"/><div><strong>Level:</strong> <Badge>{tour.level}</Badge></div></div>}
                      <div className="flex items-center gap-3 text-muted-foreground"><DollarSign className="h-5 w-5 text-accent"/><div><strong>Price:</strong> {formattedPrice}</div></div>
                    </CardContent>
                  </Card>

                  <Button size="lg" className="w-full text-lg bg-accent text-accent-foreground hover:bg-accent/90">Book This Tour</Button>
                </div>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
