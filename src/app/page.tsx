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
      
      <Values />
      <Factory />
      <Awards />
      <Blog />
      <RequestQuote />
      <Footer />
    </main>
  );
}
