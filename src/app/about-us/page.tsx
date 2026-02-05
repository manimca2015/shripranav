
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import { Award, Globe, Users, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const managementTeam = [
  { name: 'Dr. S. Raj', title: 'Chairman', imageId: 'team-dr-raj' },
  { name: 'Vignesh', title: 'Founder & CEO', imageId: 'team-vignesh' },
  { name: 'Bikash', title: 'Co-Founder & COO', imageId: 'team-bikash' },
  { name: 'Olin', title: 'Head of Operations', imageId: 'team-olin' },
  { name: 'Anil', title: 'Lead Convoy Commander', imageId: 'team-anil' },
];

export default function AboutUsPage() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'about-us-hero');
  const storyImage = PlaceHolderImages.find(p => p.id === 'our-story-image');
  const legacyImage = PlaceHolderImages.find(p => p.id === 'driving-legacy-image');

  return (
    <div className="bg-background">
      <Header />
      <main>
        <section className="relative h-[400px] flex items-center justify-center text-white">
          {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover"
              data-ai-hint={heroImage.imageHint}
            />
          )}
          <div className="absolute inset-0 bg-primary/80" />
          <div className="relative z-10 text-center max-w-4xl mx-auto px-4 pt-12">
            <span className="text-accent font-bold tracking-[0.2em] uppercase mb-4 block mt-16">About Us</span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-headline font-extrabold leading-tight">Driving Passion, Creating Memories</h1>
            <p className="mt-4 text-lg md:text-xl text-white/90">
              Discover the story behind India's premier driving holiday specialists.
            </p>
          </div>
        </section>

        <section id="our-story" className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-headline font-bold text-primary mb-4">Our Story</h2>
                <p className="text-muted-foreground mb-4">
                  Founded in 2015, Fair Future Travels was born from a singular passion: to explore the world from behind the wheel. We saw a gap in the Indian market for premium, professionally managed self-drive tours that didn’t just visit destinations, but truly experienced them.
                </p>
                <p className="text-muted-foreground mb-6">
                  What started as a small group of enthusiasts organizing trips for friends has grown into India's leading driving holiday company. Our ethos remains unchanged: meticulous planning, unparalleled safety, and a commitment to creating unforgettable memories on the open road. We’ve covered millions of kilometers, crossed dozens of borders, and shared incredible journeys with hundreds of fellow travelers.
                </p>
                <div className="grid grid-cols-2 gap-6 text-center">
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <TrendingUp className="mx-auto w-8 h-8 text-accent mb-2" />
                    <p className="font-bold text-primary text-xl">100+ Expeditions</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <Globe className="mx-auto w-8 h-8 text-accent mb-2" />
                    <p className="font-bold text-primary text-xl">25+ Countries</p>
                  </div>
                </div>
              </div>
              <div className="relative h-96 rounded-2xl overflow-hidden">
                {storyImage && (
                  <Image
                    src={storyImage.imageUrl}
                    alt={storyImage.description}
                    fill
                    className="object-cover"
                    data-ai-hint={storyImage.imageHint}
                  />
                )}
              </div>
            </div>
          </div>
        </section>

        <section id="leadership" className="py-20 section-bg-subtle">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-headline font-bold text-primary mb-2">Our Leadership</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Meet the passionate team driving Fair Future Travels forward.</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
              {managementTeam.map(member => {
                const image = PlaceHolderImages.find(p => p.id === member.imageId);
                return (
                  <div key={member.name} className="text-center">
                    <div className="relative h-40 w-40 mx-auto mb-4 rounded-full overflow-hidden ring-4 ring-white shadow-lg">
                      {image && (
                        <Image
                          src={image.imageUrl}
                          alt={`Portrait of ${member.name}`}
                          fill
                          className="object-cover"
                          data-ai-hint={image.imageHint}
                        />
                      )}
                    </div>
                    <h4 className="font-bold text-lg text-primary">{member.name}</h4>
                    <p className="text-sm text-accent font-semibold">{member.title}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        
        <section id="driving-legacy" className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative h-[500px] rounded-2xl overflow-hidden order-last md:order-first">
                 {legacyImage && (
                  <Image
                    src={legacyImage.imageUrl}
                    alt={legacyImage.description}
                    fill
                    className="object-cover"
                    data-ai-hint={legacyImage.imageHint}
                  />
                )}
              </div>
              <div>
                <h2 className="text-4xl font-headline font-bold text-primary mb-4">Our Driving Legacy</h2>
                <p className="text-muted-foreground mb-6">
                  At Fair Future Travels, driving is in our DNA. We believe the journey is just as important as the destination. That's why we’ve built our reputation on a foundation of safety, expertise, and logistical excellence.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center shrink-0">
                      <Award className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-bold text-primary">Professional Convoy Management</h4>
                      <p className="text-muted-foreground text-sm">Every tour is led by experienced convoy commanders, with a lead and sweep vehicle ensuring no one is left behind. We manage all routes, briefings, and radio communications.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center shrink-0">
                      <Users className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-bold text-primary">24/7 Ground Support</h4>
                      <p className="text-muted-foreground text-sm">Our dedicated ground teams provide round-the-clock mechanical, medical, and logistical support, giving you complete peace of mind on the road.</p>
                    </div>
                  </li>
                   <li className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center shrink-0">
                      <Globe className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-bold text-primary">Meticulously Scouted Routes</h4>
                      <p className="text-muted-foreground text-sm">We don't rely on Google Maps. Every kilometer of our routes is physically scouted and vetted to ensure the best driving experience, safety, and scenic beauty.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-primary text-white">
            <div className="container mx-auto px-4 text-center max-w-4xl">
                 <h2 className="text-4xl font-headline font-bold mb-6">Join Our Next Adventure</h2>
                 <p className="text-lg text-slate-300 mb-8">Ready to write your own chapter in our story? Explore our upcoming expeditions and find your next great drive.</p>
                 <Button asChild size="lg" className="bg-accent text-accent-foreground font-bold text-lg px-10 py-4 h-auto rounded-full hover:bg-accent/90">
                    <a href="/tours">View All Tours</a>
                 </Button>
            </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
