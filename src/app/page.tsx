
import React from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Hero } from '@/components/sections/hero';
import { About } from '@/components/sections/about';
import { Products } from '@/components/sections/products';
import { Values } from '@/components/sections/values';
import { Factory } from '@/components/sections/factory';
import { Awards } from '@/components/sections/awards';
import { Blog } from '@/components/sections/blog';
import { RequestQuote } from '@/components/sections/cta-quote';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Products />
      
      <section className="py-24 bg-primary text-white text-center">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-5xl font-black mb-12">Vision & Mission</h2>
          <div className="grid md:grid-cols-2 gap-12 text-left">
            <div className="p-10 glass-card border-none rounded-[40px] text-primary">
              <h3 className="text-2xl font-black mb-6 text-secondary uppercase tracking-widest">Our Vision</h3>
              <p className="text-lg leading-relaxed font-medium">
                To be a globally respected textile manufacturer known for our commitment to quality, sustainability, and people-first practices — creating positive impact through every thread we weave.
              </p>
            </div>
            <div className="p-10 bg-secondary rounded-[40px] text-white">
              <h3 className="text-2xl font-black mb-6 uppercase tracking-widest text-white/90">Our Mission</h3>
              <p className="text-lg leading-relaxed font-medium">
                At Shri Pranav, our mission is to deliver high-quality, responsibly made textile solutions while fostering an inclusive, ethical, and growth-oriented workplace.
              </p>
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
