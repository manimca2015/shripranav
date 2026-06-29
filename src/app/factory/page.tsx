'use client';

import React from 'react';
import Image from 'next/image';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { 
  Settings, 
  Droplets, 
  Ruler, 
  ShieldCheck, 
  Cpu, 
  Zap, 
  Leaf, 
  Users,
  Factory as FactoryIcon,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

const facilities = [
  {
    title: "Weaving Unit",
    desc: "Equipped with high-speed Rapier and Air-jet looms for superior fabric density and texture.",
    icon: Cpu,
    image: 'factory-main'
  },
  {
    title: "Eco-Dyeing & Finishing",
    desc: "Advanced processing unit using bio-degradable dyes and water-saving technologies.",
    icon: Droplets,
    image: 'factory-dyeing'
  },
  {
    title: "Stitching & Tailoring",
    desc: "Precision garment construction with automated cutting and quality-focused sewing lines.",
    icon: Ruler,
    image: 'factory-stitching'
  }
];

export default function FactoryPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Factory Hero */}
      <section className="relative pt-48 pb-24 bg-primary text-white overflow-hidden">
        <div className="textile-pattern absolute inset-0 opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block bg-secondary text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-widest mb-6">
              World-Class Manufacturing
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight">
              State-of-the-Art <br />
              <span className="text-secondary">Infrastructure</span>
            </h1>
            <p className="text-xl text-white/70 leading-relaxed mb-10">
              Located in the textile heartland of Karur, our integrated facility combines heritage craftsmanship with the latest European technology.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-3 bg-white/10 px-6 py-3 rounded-2xl border border-white/10">
                <ShieldCheck className="text-secondary w-6 h-6" />
                <span className="font-bold">ISO 9001:2015 Certified</span>
              </div>
              <div className="flex items-center gap-3 bg-white/10 px-6 py-3 rounded-2xl border border-white/10">
                <Leaf className="text-secondary w-6 h-6" />
                <span className="font-bold">OEKO-TEX Verified</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20 max-w-2xl mx-auto">
            <h2 className="text-4xl font-black text-primary mb-6">Integrated Production</h2>
            <p className="text-slate-600">From raw material inspection to final packaging, our entire process is handled in-house to ensure absolute quality control.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {facilities.map((facility, index) => {
              const img = PlaceHolderImages.find(i => i.id === facility.image);
              return (
                <div key={index} className="group">
                  <div className="relative h-80 rounded-[40px] overflow-hidden mb-8 shadow-xl">
                    {img && (
                      <Image
                        src={img.imageUrl}
                        alt={facility.title}
                        fill
                        className="object-cover group-hover:scale-110 smooth-transition"
                        data-ai-hint={img.imageHint}
                      />
                    )}
                    <div className="absolute top-6 left-6 w-14 h-14 rounded-2xl bg-white/90 backdrop-blur flex items-center justify-center text-primary shadow-lg">
                      <facility.icon className="w-7 h-7" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-primary mb-4">{facility.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{facility.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Machinery Section */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-secondary font-bold uppercase tracking-widest text-sm mb-4 block">The Best in Class</span>
              <h2 className="text-4xl font-black text-primary mb-8">Advanced Machinery <br /> & Technology</h2>
              <div className="space-y-6">
                {[
                  { title: "Smart Weaving", desc: "Automated loom monitoring system for real-time efficiency tracking." },
                  { title: "Precision Stitching", desc: "Computerized sewing machines for intricate detailing and strength." },
                  { title: "Digital QC", desc: "AI-assisted fabric inspection to identify micro-defects instantly." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-6 bg-white rounded-3xl shadow-sm border border-slate-100">
                    <div className="shrink-0 w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                      <Settings className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-primary">{item.title}</h4>
                      <p className="text-sm text-slate-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-[500px] rounded-[60px] overflow-hidden shadow-2xl">
              <Image
                src="https://picsum.photos/seed/tech/800/1000"
                alt="Technology in Factory"
                fill
                className="object-cover"
                data-ai-hint="high tech"
              />
              <div className="absolute inset-0 bg-primary/20" />
            </div>
          </div>
        </div>
      </section>

      {/* Sustainability & People */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-stretch">
            <div className="p-12 bg-secondary rounded-[48px] text-white flex flex-col justify-center">
              <Zap className="w-16 h-16 mb-8 text-white/50" />
              <h3 className="text-3xl font-black mb-6">Sustainable Core</h3>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="w-2 h-2 rounded-full bg-white mt-2.5" />
                  <p className="text-lg"><strong>Solar Powered:</strong> 40% of our daily energy consumption is met by on-site solar panels.</p>
                </li>
                <li className="flex gap-4">
                  <div className="w-2 h-2 rounded-full bg-white mt-2.5" />
                  <p className="text-lg"><strong>Water Recycling:</strong> Our Zero Liquid Discharge (ZLD) plant recycles 95% of processing water.</p>
                </li>
                <li className="flex gap-4">
                  <div className="w-2 h-2 rounded-full bg-white mt-2.5" />
                  <p className="text-lg"><strong>Waste Upcycling:</strong> Production scraps are repurposed for artisanal accessories, achieving near-zero waste.</p>
                </li>
              </ul>
            </div>
            
            <div className="p-12 bg-primary rounded-[48px] text-white flex flex-col justify-center">
              <Users className="w-16 h-16 mb-8 text-white/50" />
              <h3 className="text-3xl font-black mb-6">Empowering People</h3>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="w-2 h-2 rounded-full bg-secondary mt-2.5" />
                  <p className="text-lg"><strong>Fair Wages:</strong> We exceed local statutory requirements for compensation and benefits.</p>
                </li>
                <li className="flex gap-4">
                  <div className="w-2 h-2 rounded-full bg-secondary mt-2.5" />
                  <p className="text-lg"><strong>Women First:</strong> 70% of our production workforce comprises local women, supported by skill training programs.</p>
                </li>
                <li className="flex gap-4">
                  <div className="w-2 h-2 rounded-full bg-secondary mt-2.5" />
                  <p className="text-lg"><strong>Safety Standards:</strong> Monthly health check-ups and rigorous occupational safety protocols.</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-slate-900 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none textile-pattern" />
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-4xl md:text-6xl font-black mb-8">Want to see us in action?</h2>
          <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto">
            We welcome our global partners to visit our Karur facility and experience our commitment to quality and transparency firsthand.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Button size="lg" className="rounded-full bg-secondary hover:bg-white hover:text-primary h-14 px-10 font-bold text-lg shadow-xl shadow-secondary/10 smooth-transition">
              Schedule a Factory Tour
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="rounded-full border-2 border-white text-white hover:bg-white hover:text-slate-900 h-14 px-10 font-bold text-lg smooth-transition"
            >
              Download Capacity Deck
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
