
import Image from 'next/image';
import { Instagram, Facebook, Youtube, Linkedin } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer id="footer" className="bg-primary text-primary-foreground pt-20 pb-12 px-12">
        <div className="max-w-7xl mx-auto">
            <div className="bg-primary-foreground/5 border border-primary-foreground/10 rounded-2xl p-12 mb-20">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
                  <div className="md:col-span-2">
                      <Link href="/" className="relative flex items-center mb-8">
                        <Image
                            src="/fair-future-logo.webp"
                            alt="Fair Future Travels Logo"
                            width={180}
                            height={40}
                            className="object-contain"
                        />
                      </Link>
                      <p className="text-slate-400 mb-8 leading-relaxed">India's premier driving holiday specialist. Creating extraordinary self-drive expeditions across the world's most breathtaking landscapes since 2015.</p>
                      <div className="flex gap-4">
                          <a href="#" aria-label="Instagram" className="w-12 h-12 rounded-full bg-primary-foreground/10 flex items-center justify-center text-slate-400 hover:bg-accent hover:text-accent-foreground transition-all"><Instagram /></a>
                          <a href="#" aria-label="Facebook" className="w-12 h-12 rounded-full bg-primary-foreground/10 flex items-center justify-center text-slate-400 hover:bg-accent hover:text-accent-foreground transition-all"><Facebook /></a>
                          <a href="#" aria-label="YouTube" className="w-12 h-12 rounded-full bg-primary-foreground/10 flex items-center justify-center text-slate-400 hover:bg-accent hover:text-accent-foreground transition-all"><Youtube /></a>
                          <a href="#" aria-label="LinkedIn" className="w-12 h-12 rounded-full bg-primary-foreground/10 flex items-center justify-center text-slate-400 hover:bg-accent hover:text-accent-foreground transition-all"><Linkedin /></a>
                      </div>
                  </div>
                  <div>
                      <h4 className="font-bold text-primary-foreground mb-6 text-lg">Driving Tours</h4>
                      <ul className="space-y-4 text-slate-400">
                          <li><Link href="/tours" className="hover:text-accent transition-all">South Africa</Link></li>
                          <li><Link href="/tours" className="hover:text-accent transition-all">Iceland</Link></li>
                          <li><Link href="/tours" className="hover:text-accent transition-all">Namibia</Link></li>
                          <li><Link href="/tours" className="hover:text-accent transition-all">Jordan</Link></li>
                          <li><Link href="/tours" className="hover:text-accent transition-all">Thailand</Link></li>
                          <li><Link href="/tours" className="hover:text-accent transition-all">Spiti Valley</Link></li>
                      </ul>
                  </div>
                  <div>
                      <h4 className="font-bold text-primary-foreground mb-6 text-lg">Services</h4>
                      <ul className="space-y-4 text-slate-400">
                          <li><Link href="/holiday-packages" className="hover:text-accent transition-all">Holiday Packages</Link></li>
                          <li><Link href="/visa-services" className="hover:text-accent transition-all">Visa Services</Link></li>
                          <li><Link href="/air-tickets" className="hover:text-accent transition-all">Air Tickets</Link></li>
                          <li><Link href="/tours" className="hover:text-accent transition-all">Group Tours</Link></li>
                          <li><Link href="#" className="hover:text-accent transition-all">Custom Itineraries</Link></li>
                      </ul>
                  </div>
                  <div>
                      <h4 className="font-bold text-primary-foreground mb-6 text-lg">Company</h4>
                      <ul className="space-y-4 text-slate-400">
                          <li><Link href="/about-us" className="hover:text-accent transition-all">About Us</Link></li>
                          <li><Link href="/about-us#leadership" className="hover:text-accent transition-all">Our Leadership</Link></li>
                          <li><Link href="/gallery" className="hover:text-accent transition-all">Gallery</Link></li>
                          <li><Link href="/blog" className="hover:text-accent transition-all">Blogs</Link></li>
                          <li><Link href="/contact-us" className="hover:text-accent transition-all">Contact Us</Link></li>
                      </ul>
                  </div>
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
