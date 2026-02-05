
import { Instagram, Facebook, Youtube, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const quickLinks = [
    { href: '/tours', label: 'World Driving Tours' },
    { href: '/holiday-packages', label: 'Holiday Packages' },
    { href: '/visa-services', label: 'Visa Services' },
    { href: '/air-tickets', label: 'Air Tickets' },
    { href: '/about-us', label: 'About Us' },
    { href: '/blog', label: 'Blog' },
    { href: '/gallery', label: 'Gallery' },
];

const drivingTours = [
    { href: '#', label: 'South Africa' },
    { href: '#', label: 'Iceland' },
    { href: '#', label: 'Namibia' },
    { href: '#', label: 'Jordan' },
    { href: '#', label: 'Thailand' },
    { href: '#', label: 'Spiti Valley' },
];

export function Footer() {
  return (
    <footer id="footer" className="bg-primary text-primary-foreground pt-20 pb-12 px-12">
        <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20 items-start">
                <div className="bg-card text-card-foreground p-8 rounded-2xl">
                    <div className="flex items-center gap-3 mb-8">
                        <Link href="/" className="flex items-center gap-3">
                            <Image
                                src="/fair-future-logo.webp"
                                alt="Fair Future Travels Logo"
                                width={180}
                                height={40}
                                className="object-contain"
                            />
                        </Link>
                    </div>
                    <p className="text-muted-foreground mb-8 leading-relaxed">India's premier driving holiday specialist. Creating extraordinary self-drive expeditions across the world's most breathtaking landscapes since 2015.</p>
                    <div className="flex gap-4">
                        <a href="#" aria-label="Instagram" className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-all"><Instagram /></a>
                        <a href="#" aria-label="Facebook" className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-all"><Facebook /></a>
                        <a href="#" aria-label="YouTube" className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-all"><Youtube /></a>
                        <a href="#" aria-label="LinkedIn" className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-all"><Linkedin /></a>
                    </div>
                </div>
                
                <div>
                    <h4 className="font-bold text-primary-foreground mb-6 text-lg">Quick Links</h4>
                    <ul className="space-y-4 text-slate-400">
                        {quickLinks.map(link => (
                            <li key={link.href}><Link href={link.href} className="hover:text-accent transition-all">{link.label}</Link></li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold text-primary-foreground mb-6 text-lg">Contact Us</h4>
                    <ul className="space-y-4 text-slate-400 text-sm">
                        <li className="flex items-start gap-4">
                            <MapPin className="w-5 h-5 text-accent mt-1 shrink-0" />
                            <span>Fair Future Edifice, East of Ravipuram Junction off M.G.Road, Near Ravipuram Sree Krishna Swami Temple, Cochin 682016, Kerala, India</span>
                        </li>
                         <li className="flex items-start gap-4">
                            <Mail className="w-5 h-5 text-accent mt-1 shrink-0" />
                            <a href="mailto:info@fairfuturetravels.com" className="hover:text-accent transition-colors">info@fairfuturetravels.com</a>
                        </li>
                        <li className="flex items-start gap-4">
                            <Phone className="w-5 h-5 text-accent mt-1 shrink-0" />
                            <div>
                                <a href="tel:+914842356699" className="hover:text-accent transition-colors block">+91 484 2356699</a>
                                <a href="tel:+919188922602" className="hover:text-accent transition-colors block">+91 9188922602</a>
                            </div>
                        </li>
                    </ul>
                </div>
                
                <div>
                    <h4 className="font-bold text-primary-foreground mb-6 text-lg">Driving Tours</h4>
                    <ul className="space-y-4 text-slate-400">
                       {drivingTours.map(tour => (
                             <li key={tour.href}><Link href={tour.href} className="hover:text-accent transition-all">{tour.label}</Link></li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-primary-foreground/20 text-sm text-slate-500">
                <p className="mb-4 md:mb-0">© {new Date().getFullYear()} Fair Future Travels & Vacations. All rights reserved.</p>
                <div className="flex gap-8">
                    <Link href="#" className="hover:text-accent transition-all">Privacy Policy</Link>
                    <Link href="#" className="hover:text-accent transition-all">Terms & Conditions</Link>
                    <Link href="#" className="hover:text-accent transition-all">Cancellation Policy</Link>
                </div>
            </div>
        </div>
    </footer>
  );
}
