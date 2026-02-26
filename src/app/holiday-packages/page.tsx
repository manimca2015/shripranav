'use client';

import { useState } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { holidayPackages } from '@/lib/holiday-packages-data';
import type { HolidayPackage } from '@/lib/holiday-packages-data';
import { ArrowRight } from 'lucide-react';
import { CustomItineraryModal } from '@/components/custom-itinerary-modal';

export default function HolidayPackagesPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState('');

  const handleExploreClick = (destination: string) => {
    setSelectedDestination(destination);
    setModalOpen(true);
  };

  const heroImage = PlaceHolderImages.find(p => p.id === 'holiday-packages-hero');
  const customPackages = holidayPackages.filter(p => p.category === 'custom');
  const groupPackages = holidayPackages.filter(p => p.category === 'group');

  const PackageCard = ({ pkg }: { pkg: HolidayPackage }) => {
    const image = PlaceHolderImages.find(p => p.id === pkg.image);

    const cardInnerContent = (
      <>
        <div className="relative h-64 shrink-0">
          {image && (
            <Image
              src={image.imageUrl}
              alt={image.description}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              data-ai-hint={image.imageHint}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-4 left-4">
            <h3 className="text-2xl font-headline font-bold text-white">{pkg.title}</h3>
          </div>
        </div>
        <CardContent className="p-6 bg-white flex flex-col flex-grow">
          <p className="text-muted-foreground text-sm mb-4 flex-grow">{pkg.description}</p>
          <div className="flex justify-end">
            <span className="text-sm font-bold text-accent group-hover:underline flex items-center gap-2">
              Explore Package <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </CardContent>
      </>
    );

    const cardWrapperClass = "overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col";

    return (
      <button 
        onClick={() => handleExploreClick(pkg.title)} 
        className="group block text-left h-full w-full focus:outline-none"
      >
        <Card className={cardWrapperClass}>
            {cardInnerContent}
        </Card>
      </button>
    );
  };

  return (
    <>
      <div className="bg-background">
        <Header />
        <main>
          <section className="relative h-[480px] flex items-center justify-center text-white">
            {heroImage && (
              <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                fill
                className="object-cover"
                data-ai-hint={heroImage.imageHint}
              />
            )}
            <div className="absolute inset-0 bg-primary/70" />
            <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
              <span className="text-accent font-bold tracking-[0.2em] uppercase mb-4 block mt-16">Our Packages</span>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-headline font-extrabold leading-tight">Holiday Packages</h1>
              <p className="mt-4 text-lg md:text-xl text-white/90">
                Tailor-made itineraries and exciting group departures to the world's most desired destinations.
              </p>
            </div>
          </section>

          <section className="py-20 section-bg-subtle">
            <div className="container mx-auto px-4 max-w-7xl">
              <div className="mb-12 text-center">
                <h2 className="text-4xl font-headline font-bold text-primary mb-2">Customised International Packages</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">Your dream holiday, designed just for you. Explore the world at your own pace.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
                {customPackages.map(pkg => <PackageCard key={pkg.id} pkg={pkg} />)}
              </div>
            </div>
          </section>

          <section className="py-20 bg-white">
            <div className="container mx-auto px-4 max-w-7xl">
              <div className="mb-12 text-center">
                <h2 className="text-4xl font-headline font-bold text-primary mb-2">Group Departures</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">Join a group of like-minded travellers on one of our expertly-led adventures.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
                {groupPackages.map(pkg => <PackageCard key={pkg.id} pkg={pkg} />)}
              </div>
            </div>
          </section>

        </main>
        <Footer />
      </div>
      {modalOpen && (
            <CustomItineraryModal 
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                destination={selectedDestination}
            />
        )}
    </>
  );
}
