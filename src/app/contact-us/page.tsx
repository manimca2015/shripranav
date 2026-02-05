
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { ContactForm } from '@/components/contact-form';
import { WhatsAppIcon } from '@/components/icons/whatsapp-icon';

const branchOffices = [
    { 
      city: 'Thiruvananthapuram', 
      address: '1st Floor Basant Building, Near Indian Oil Petrol Pump, Pattom, Trivandrum-695004',
      phone: ['+1800 419 1210'],
      email: 'info@fairfuturetravels.com',
      whatsapp: '+917907526773',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3946.064573356877!2d76.9367183147829!3d8.50298099389279!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05bb0f4f72f0f7%3A0x6a2e4a4c5a04a11b!2sPattom%2C%20Thiruvananthapuram%2C%20Kerala!5e0!3m2!1sen!2sin!4v1678886000001'
    },
    { 
      city: 'Thrissur', 
      address: '1st Floor, Sheetal Apartment, Near Kalyan Jewellers, North Round, Thrissur-680001',
      phone: ['+1800 419 1210'],
      email: 'info@fairfuturetravels.com',
      whatsapp: '+917907526773',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3923.36399128522!2d76.21481531479815!3d10.53123499252994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba7ef367c3b9b4b%3A0x2406e25dc1ce2a6!2sNorth%20Round%2C%20Thrissur%2C%20Kerala!5e0!3m2!1sen!2sin!4v1678886000002'
    },
    { 
      city: 'Dubai', 
      address: '510, Metropolis Tower, Business Bay, Dubai, UAE',
      phone: ['+971 58 6868522'],
      email: 'info@fairfuturetravels.com',
      whatsapp: '+917907526773',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.178631481232!2d55.25899231500985!3d25.19720188389608!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f69d3b1d31a5f%3A0x3c3d5e2e85e2e1c9!2sThe%20Metropolis%20Tower%20-%20Business%20Bay%20-%20Dubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sin!4v1678886000003'
    },
];

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

        <section id="branch-offices" className="py-20 section-bg-subtle">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-headline font-bold text-primary mb-2">Our Branch Offices</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Find us at our locations across India and the UAE.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {branchOffices.map(office => (
                <div key={office.city} className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col">
                    <div className="h-64">
                        <iframe
                            src={office.mapUrl}
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen={false}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title={`${office.city} Location`}
                        ></iframe>
                    </div>
                    <div className="p-6 flex-grow flex flex-col">
                        <h3 className="text-2xl font-headline font-bold text-primary mb-4">{office.city}</h3>
                        <div className="space-y-4 text-sm">
                            <div className="flex items-start gap-4">
                                <MapPin className="w-5 h-5 text-accent mt-1 shrink-0" />
                                <p className="text-muted-foreground">{office.address}</p>
                            </div>
                            <div className="flex items-start gap-4">
                                <Phone className="w-5 h-5 text-accent mt-1 shrink-0" />
                                <div>
                                {office.phone.map(p => <p key={p} className="text-muted-foreground">{p}</p>)}
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <Mail className="w-5 h-5 text-accent mt-1 shrink-0" />
                                <p className="text-muted-foreground">{office.email}</p>
                            </div>
                             <div className="flex items-start gap-4">
                                <WhatsAppIcon className="w-5 h-5 text-accent mt-1 shrink-0" />
                                <p className="text-muted-foreground">{office.whatsapp}</p>
                            </div>
                        </div>
                    </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
