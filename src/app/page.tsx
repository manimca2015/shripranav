import React from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Hero } from '@/components/sections/hero';
import { About } from '@/components/sections/about';
import { Products } from '@/components/sections/products';
import { Innovation } from '@/components/sections/innovation';
import { WhyChooseUs } from '@/components/sections/why-choose-us';
import { FourPs } from '@/components/sections/four-ps';
import { Values } from '@/components/sections/values';
import { Factory } from '@/components/sections/factory';
import { Awards } from '@/components/sections/awards';
import { Blog } from '@/components/sections/blog';
import { RequestQuote } from '@/components/sections/cta-quote';
import { Eye, Target } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Products />
      <Innovation />
      <WhyChooseUs />
      <FourPs />
      
      {/* Vision & Mission Section */}
      <section className="py-24 relative overflow-hidden bg-primary">
        <div className="textile-pattern absolute inset-0 opacity-10 pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-primary/50 to-primary pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-secondary font-bold uppercase tracking-widest text-sm mb-4 block">Our Purpose</span>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6">Vision & Mission</h2>
            <div className="w-24 h-1.5 bg-secondary mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
            {/* Vision Card */}
            <div className="group p-10 lg:p-14 glass-card border-white/10 rounded-[48px] hover:bg-white/90 hover:-translate-y-2 smooth-transition relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-secondary/10 rounded-full blur-3xl group-hover:bg-secondary/20 transition-all duration-700" />
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 smooth-transition">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-black mb-6 text-primary uppercase tracking-widest">Our Vision</h3>
                <p className="text-xl leading-relaxed font-medium text-slate-700">
                  To be a globally respected textile manufacturer known for our commitment to quality, sustainability, and people-first practices — creating positive impact through every thread we weave.
                </p>
              </div>
            </div>

            {/* Mission Card */}
            <div className="group p-10 lg:p-14 bg-secondary rounded-[48px] shadow-2xl hover:shadow-secondary/20 hover:-translate-y-2 smooth-transition relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-700" />
              <div className="relative z-10 text-white">
                <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 smooth-transition">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-black mb-6 uppercase tracking-widest text-white/90">Our Mission</h3>
                <p className="text-xl leading-relaxed font-medium">
                  At Shri Pranav, our mission is to deliver high-quality, responsibly made textile solutions while fostering an inclusive, ethical, and growth-oriented workplace. We strive to innovate sustainably, empower individuals—especially women—and continuously improve for the betterment of our customers, employees, and the planet.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Values />
      <Factory />
      <Awards />
      <Blog />
      <RequestQuote />
      <Footer />
    </main>
  );
}
