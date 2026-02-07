
'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { TourCard } from '@/components/tour-card';
import { TestimonialsCarousel } from '@/components/testimonials-carousel';
import { tours } from '@/lib/data';
import type { Tour } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, ChevronDown, ShieldCheck, Headset, Route, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { parse } from 'date-fns';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function WorldDrivingToursPage() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'tours-hero');

  const [searchTerm, setSearchTerm] = useState('');
  const [tourType, setTourType] = useState('All Tours');
  const [visibleCount, setVisibleCount] = useState(12);
  const [selectedMonths, setSelectedMonths] = useState<string[]>([]);

  const allMonths = useMemo(() => [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ], []);

  const tourTypes = ['All Tours', 'Self-Drive', 'Guided'];


  const filteredAndSortedTours = useMemo(() => {
    let filtered = tours;

    if (searchTerm) {
      filtered = filtered.filter(tour =>
        tour.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tour.destination.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedMonths.length > 0) {
        filtered = filtered.filter(tour => {
            const tourMonth = tour.date.split(' ')[0];
            return selectedMonths.includes(tourMonth);
        });
    }

    if (tourType !== 'All Tours') {
      filtered = filtered.filter(tour => tour.driveType === tourType);
    }

    const now = new Date('2026-02-04T00:00:00Z');

    const parseStartDate = (tour: Tour): Date => {
      const { fullDate, date } = tour;
      const fallbackDate = parse(date, 'MMMM yyyy', new Date());

      if (!fullDate) return fallbackDate;

      try {
        // Extract the first part of a date range. '21 – 29 Mar, 2026' -> '21 Mar, 2026'
        const firstDatePart = fullDate.split(/–|-/)[0].trim();
        const year = fullDate.match(/\d{4}/)?.[0] || date.split(' ')[1];
        const monthMatch = firstDatePart.match(/[a-zA-Z]{3,}/);
        
        let dateStringToParse;

        if (monthMatch) {
          // Month is in the first part, e.g., "24 Jan" or "10 Apr, 2026"
          dateStringToParse = firstDatePart;
          if (!firstDatePart.includes(year)) {
            dateStringToParse += `, ${year}`;
          }
        } else {
          // Month is not in the first part, e.g., range like "21 - 29 March, 2026"
          const monthInFullDate = fullDate.match(/[a-zA-Z]{3,}/)?.[0];
          if(monthInFullDate) {
            dateStringToParse = `${firstDatePart} ${monthInFullDate} ${year}`;
          } else {
            return fallbackDate;
          }
        }

        // Try parsing with abbreviated month, then full month name
        for (const format of ['d MMM yyyy', 'd MMMM yyyy']) {
          const parsed = parse(dateStringToParse.replace(',', ''), format, new Date());
          if (!isNaN(parsed.getTime())) {
            return parsed;
          }
        }

        return fallbackDate;
      } catch (e) {
        console.error('Failed to parse date:', fullDate, 'for tour', tour.id);
        return fallbackDate;
      }
    };

    const augmentedTours = filtered.map(tour => ({
      ...tour,
      startDate: parseStartDate(tour),
      isPast: parseStartDate(tour) < now
    }));

    const upcoming = augmentedTours.filter(t => !t.isPast).sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
    const past = augmentedTours.filter(t => t.isPast).sort((a, b) => b.startDate.getTime() - a.startDate.getTime());

    return [...upcoming, ...past];

  }, [searchTerm, tourType, selectedMonths]);

  const toursToShow = filteredAndSortedTours.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 12);
  };


  return (
    <div className="bg-white text-slate-900 antialiased font-sans">
      <Header />

      <main>
        <section id="hero-section" className="relative h-[480px] flex items-center justify-center overflow-hidden">
          {heroImage && (
            <div className="absolute inset-0 z-0">
              <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                fill
                className="w-full h-full object-cover"
                data-ai-hint={heroImage.imageHint}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/60 to-transparent"></div>
            </div>
          )}

          <div className="container mx-auto px-6 relative z-10 max-w-[1400px]">
            <div className="max-w-3xl">
              <span className="inline-block text-accent font-bold tracking-widest text-xs uppercase mb-4 mt-16">Explore the World by Road</span>
              <h1 className="font-headline text-4xl sm:text-6xl font-bold text-white mb-6 leading-tight">World Driving Tours</h1>
              <p className="text-xl text-white/90 mb-8 font-light max-w-2xl">Embark on unforgettable journeys across continents. Curated self-drive and guided adventures through the world's most breathtaking landscapes.</p>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
            <div className="flex items-center gap-2 text-white/70 text-sm">
              <span>Scroll to explore</span>
              <ChevronDown className="animate-bounce h-4 w-4" />
            </div>
          </div>
        </section>

        <section id="filter-section" className="bg-white border-b border-slate-100 sticky top-20 z-40 shadow-sm">
          <div className="container mx-auto px-6 py-6 max-w-[1400px]">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="relative flex-1 md:w-80">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Search destinations..."
                    className="w-full pl-11 pr-4 py-3 rounded-lg border border-slate-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all text-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="justify-between w-full md:w-[200px]">
                          {selectedMonths.length === 0 ? 'Filter by month...' : `${selectedMonths.length} month${selectedMonths.length > 1 ? 's' : ''} selected`}
                          <ChevronDown className="h-4 w-4 ml-2 shrink-0 opacity-50" />
                      </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                      <DropdownMenuLabel>Filter by Month</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {allMonths.map(month => (
                          <DropdownMenuCheckboxItem
                              key={month}
                              checked={selectedMonths.includes(month)}
                              onCheckedChange={(checked) => {
                                  return checked
                                      ? setSelectedMonths([...selectedMonths, month])
                                      : setSelectedMonths(selectedMonths.filter(m => m !== month));
                              }}
                          >
                              {month}
                          </DropdownMenuCheckboxItem>
                      ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="flex items-center gap-3 overflow-x-auto hide-scroll w-full md:w-auto">
                {tourTypes.map(type => (
                    <Button
                        key={type}
                        onClick={() => setTourType(type)}
                        variant={tourType === type ? 'default' : 'ghost'}
                        className={cn(
                            'px-5 py-2.5 rounded-full text-sm whitespace-nowrap transition-all shadow-sm',
                            tourType === type
                            ? 'bg-accent text-white font-bold'
                            : 'text-slate-600 hover:text-accent hover:bg-accent/5 font-medium'
                        )}
                    >
                        {type}
                    </Button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="tours-grid-section" className="py-16 bg-slate-50">
          <div className="container mx-auto px-6 max-w-[1400px]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {toursToShow.map(tour => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </div>
            {visibleCount < filteredAndSortedTours.length && (
                <div className="mt-16 flex justify-center">
                    <Button 
                        variant="outline" 
                        size="lg" 
                        className="px-10 py-4 rounded-full border-2 border-accent text-accent font-bold hover:bg-accent hover:text-white transition-all shadow-sm hover:shadow-lg flex items-center gap-3 uppercase text-sm tracking-wider"
                        onClick={handleLoadMore}
                    >
                        <span>Load More Tours</span>
                        <ChevronDown className="h-4 w-4" />
                    </Button>
                </div>
            )}
          </div>
        </section>
        
        <section id="testimonials-section" className="py-20 bg-white">
            <div className="container mx-auto px-6 max-w-[1400px]">
                <div className="text-center mb-16">
                    <span className="text-accent font-bold tracking-widest text-xs uppercase mb-3 block">Traveler Stories</span>
                    <h2 className="text-4xl font-headline font-bold text-primary mb-4">What Our Adventurers Say</h2>
                    <p className="text-slate-500 max-w-2xl mx-auto">Real experiences from real travelers</p>
                </div>
                <TestimonialsCarousel />
            </div>
        </section>

        <section id="why-choose-section" className="py-20 bg-white">
          <div className="container mx-auto px-6 max-w-[1400px]">
            <div className="text-center mb-16">
              <span className="text-accent font-bold tracking-widest text-xs uppercase mb-3 block">Why Drive With Us</span>
              <h2 className="text-4xl font-headline font-bold text-primary mb-4">The Fair Future Difference</h2>
              <p className="text-slate-500 max-w-2xl mx-auto">Experience unparalleled service and unforgettable adventures</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:shadow-xl transition-all group">
                <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent transition-all">
                  <ShieldCheck className="text-2xl text-accent group-hover:text-white transition-all" />
                </div>
                <h3 className="text-xl font-headline font-bold mb-3 text-primary">Fully Insured</h3>
                <p className="text-slate-600 text-sm leading-relaxed">Comprehensive coverage for vehicles and travelers on all our expeditions</p>
              </div>

              <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:shadow-xl transition-all group">
                <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent transition-all">
                  <Headset className="text-2xl text-accent group-hover:text-white transition-all" />
                </div>
                <h3 className="text-xl font-headline font-bold mb-3 text-primary">24/7 Support</h3>
                <p className="text-slate-600 text-sm leading-relaxed">Round-the-clock assistance wherever your journey takes you</p>
              </div>

              <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:shadow-xl transition-all group">
                <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent transition-all">
                  <Route className="text-2xl text-accent group-hover:text-white transition-all" />
                </div>
                <h3 className="text-xl font-headline font-bold mb-3 text-primary">Expert Routes</h3>
                <p className="text-slate-600 text-sm leading-relaxed">Carefully curated itineraries by experienced travel professionals</p>
              </div>

              <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:shadow-xl transition-all group">
                <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent transition-all">
                  <Users className="text-2xl text-accent group-hover:text-white transition-all" />
                </div>
                <h3 className="text-xl font-headline font-bold mb-3 text-primary">Small Groups</h3>
                <p className="text-slate-600 text-sm leading-relaxed">Intimate experiences with maximum 12 travelers per expedition</p>
              </div>
            </div>
          </div>
        </section>

        <section id="cta-section" className="py-20 bg-gradient-to-br from-primary to-primary/90 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{backgroundImage: "url('data:image/svg+xml,%3Csvg width=\\'60\\' height=\\'60\\' viewBox=\\'0 0 60 60\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cg fill=\\'none\\' fill-rule=\\'evenodd\\'%3E%3Cg fill=\\'%23ffffff\\' fill-opacity=\\'1\\'%3E%3Cpath d=\\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"}}></div>
          
          <div className="container mx-auto px-6 max-w-[1400px] relative z-10">
              <div className="text-center max-w-3xl mx-auto">
                  <h2 className="text-4xl md:text-5xl font-headline font-bold text-white mb-6">Ready to Start Your Adventure?</h2>
                  <p className="text-xl text-white/90 mb-10 font-light">Join thousands of satisfied travelers who have experienced the journey of a lifetime</p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                      <Button asChild size="lg" className="px-10 py-4 rounded-full bg-accent text-white font-bold hover:bg-accent-light shadow-xl hover:shadow-2xl transition-all uppercase text-sm tracking-wider">
                          <Link href="/holiday-packages">Holiday Packages</Link>
                      </Button>
                      <Button asChild size="lg" variant="outline" className="px-10 py-4 rounded-full bg-transparent border-2 border-white text-white font-bold hover:bg-white/10 transition-all hover:text-[#e0af29]">
                          <Link href="/contact-us">Contact Us</Link>
                      </Button>
                  </div>
              </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
