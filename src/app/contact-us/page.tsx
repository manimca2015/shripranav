
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { ContactForm } from '@/components/contact-form';
import { WhatsAppIcon } from '@/components/icons/whatsapp-icon';

export default function ContactUsPage() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'contact-us-hero');

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
          <div className="absolute inset-0 bg-primary/70" />
          <div className="relative z-10 text-center max-w-4xl mx-auto px-4 pt-12">
            <span className="text-accent font-bold tracking-[0.2em] uppercase mb-4 block mt-16">Get In Touch</span>
            <h1 className="text-5xl md:text-7xl font-headline font-extrabold leading-tight">Contact Us</h1>
            <p className="mt-4 text-lg md:text-xl text-white/90">
              We're here to help you plan your next adventure. Reach out to us with your questions.
            </p>
          </div>
        </section>

        <section id="contact-form-section" className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
                <h2 className="text-3xl font-headline font-bold text-primary mb-2">Send us a Message</h2>
                <p className="text-muted-foreground mb-8">Fill out the form below and we'll get back to you as soon as possible.</p>
                <ContactForm />
              </div>

              <div className="space-y-8 bg-slate-50 p-8 rounded-2xl">
                <h3 className="text-2xl font-headline font-bold text-primary">Our Headquarters</h3>
                <div className="space-y-4 text-muted-foreground">
                   <div className="flex items-start gap-4">
                        <MapPin className="w-6 h-6 text-accent mt-1 shrink-0" />
                        <div>
                            <h4 className="font-bold text-primary">Kochi</h4>
                            <p>Fair Future Edifice, East of Ravipuram Junction off M.G.Road, Near Ravipuram Sree Krishna Swami Temple, Cochin 682016, Kerala, India</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <Phone className="w-6 h-6 text-accent mt-1 shrink-0" />
                        <div>
                            <h4 className="font-bold text-primary">Phone</h4>
                            <p>+91 484 2356699</p>
                            <p>+91 9188922602</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <Mail className="w-6 h-6 text-accent mt-1 shrink-0" />
                        <div>
                            <h4 className="font-bold text-primary">Email</h4>
                            <p>info@fairfuturetravels.com</p>
                        </div>
                    </div>
                     <div className="flex items-start gap-4">
                        <WhatsAppIcon className="w-6 h-6 text-accent mt-1 shrink-0" />
                        <div>
                            <h4 className="font-bold text-primary">WhatsApp</h4>
                            <p>+91 7907526773</p>
                        </div>
                    </div>
                     <div className="flex items-start gap-4">
                        <Clock className="w-6 h-6 text-accent mt-1 shrink-0" />
                        <div>
                            <h4 className="font-bold text-primary">Business Hours</h4>
                            <p>Monday - Saturday: 10:00 AM - 7:00 PM</p>
                            <p>Sunday: Closed</p>
                        </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
