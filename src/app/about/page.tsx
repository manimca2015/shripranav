'use client';

import React from 'react';
import Image from 'next/image';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Values } from '@/components/sections/values';
import { Team } from '@/components/sections/team';
import { Awards } from '@/components/sections/awards';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { CheckCircle2, Target, Eye } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const aboutImages = [
  '/about-img1.jpg',
  '/about-img2.jpg',
  '/about-img3.jpg',
  '/about-img4.jpg',
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* About Hero */}
      <section className="relative pt-48 pb-24 bg-primary text-white overflow-hidden">
        <div className="textile-pattern absolute inset-0 opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block bg-secondary text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-widest mb-6">
              Our Story
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight">
              Crafting Excellence <br />
              <span className="text-secondary">Since 1995</span>
            </h1>
            <p className="text-xl text-white/70 leading-relaxed">
              From a small weaving unit in Karur to a global textile powerhouse, Shri Pranav has remained dedicated to the art of fine manufacturing.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative h-[600px]">
              <div className="relative h-full rounded-[40px] overflow-hidden shadow-2xl">
                <Carousel 
                  plugins={[
                    Autoplay({
                      delay: 4000,
                      stopOnInteraction: false,
                    }),
                  ]}
                  opts={{
                    loop: true,
                  }}
                  className="w-full h-full"
                >
                  <CarouselContent className="h-[600px]">
                    {aboutImages.map((src, i) => (
                      <CarouselItem key={i} className="relative h-full">
                        <Image
                          src={src}
                          alt={`Shri Pranav Factory ${i + 1}`}
                          fill
                          className="object-cover"
                          priority={i === 0}
                          data-ai-hint="textile factory"
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
              </div>
            </div>
            <div>
              <h2 className="text-4xl font-black text-primary mb-8">A Legacy Built on Trust</h2>
              <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                <p>
                  Established in 1995, Shri Pranav Textiles began with a simple but powerful vision: to provide the world with premium quality textiles while maintaining absolute integrity in our manufacturing processes.
                </p>
                <p>
                  Over the past 28 years, we have evolved alongside the industry, embracing modern technology and sustainable practices without ever losing the human touch that defines our products. Today, we are proud to be a preferred partner for leading global brands in home textiles and garments.
                </p>
                <div className="grid sm:grid-cols-2 gap-4 mt-8">
                  {[
                    'Global Reach',
                    'Ethical Sourcing',
                    'Smart Manufacturing',
                    'Sustainable Core'
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      <CheckCircle2 className="text-secondary w-6 h-6" />
                      <span className="font-bold text-primary">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-24 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="p-12 bg-white/10 backdrop-blur-md rounded-[48px] border border-white/10 relative overflow-hidden group">
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-secondary/20 rounded-full blur-3xl group-hover:bg-secondary/40 transition-all duration-700" />
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mb-8">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-black mb-6">Our Vision</h3>
                <p className="text-xl text-white/70 leading-relaxed">
                  To be a globally respected textile manufacturer known for our commitment to quality, sustainability, and people-first practices — creating positive impact through every thread we weave.
                </p>
              </div>
            </div>

            <div className="p-12 bg-secondary rounded-[48px] relative overflow-hidden group">
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/40 transition-all duration-700" />
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mb-8">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-black mb-6">Our Mission</h3>
                <p className="text-xl text-white/90 leading-relaxed">
                  At Shri Pranav, our mission is to deliver high-quality, responsibly made textile solutions while fostering an inclusive, ethical, and growth-oriented workplace for our community.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <Values />

      {/* Team Section */}
      <Team />

      {/* Awards Section */}
      <Awards />

      {/* CTA */}
      <section className="py-24 bg-slate-900 text-white text-center relative overflow-hidden">
        <div className="textile-pattern absolute inset-0 opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-4xl md:text-6xl font-black mb-8">Work with us</h2>
          <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto">
            Experience the difference that 28 years of textile excellence makes. Partner with Shri Pranav for your next project.
          </p>
          <button className="rounded-full bg-secondary hover:bg-white hover:text-primary smooth-transition px-12 h-16 font-bold text-lg">
            Get in Touch
          </button>
        </div>
      </section>

      <Footer />
    </main>
  );
}
