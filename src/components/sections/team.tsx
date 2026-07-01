'use client';

import React from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Linkedin, Mail } from 'lucide-react';

const team = [
  {
    name: 'Mr. Arjuna',
    role: 'Founder & CEO',
    image: '/Arjuna.jpg',
    bio: 'Visionary leader with 30+ years of experience in the textile industry.'
  },
  {
    name: 'Ms. Deepa',
    role: 'Head of Sustainability',
    image: '/team.jpg',
    bio: 'Pioneer in implementing Zero Liquid Discharge and eco-friendly dyeing processes.'
  },
  {
    name: 'Mr. Shelvarajan',
    role: 'Production Director',
    image: '/Shelvarajan.jpg',
    bio: 'Expert in streamlining large-scale manufacturing with precision and efficiency.'
  },
  {
    name: 'Mr. Balasubramani',
    role: 'Technical Manager',
    image: '/Balasubramani.jpg',
    bio: 'Specialist in advanced weaving technologies and textile engineering solutions.'
  }
];

export function Team() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="text-secondary font-bold uppercase tracking-widest text-sm mb-4 block">Leadership</span>
          <h2 className="text-4xl md:text-5xl font-black text-primary mb-6">Our Experts</h2>
          <p className="text-slate-600">The dedicated professionals behind Shri Pranav's success and global reputation.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, i) => (
            <Card key={i} className="group border-none shadow-lg hover:shadow-2xl smooth-transition rounded-[40px] overflow-hidden bg-white">
              <div className="relative h-80 overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover group-hover:scale-110 smooth-transition"
                  data-ai-hint="professional portrait"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 smooth-transition flex items-end justify-center pb-8 gap-4">
                  <button className="w-10 h-10 rounded-full bg-white text-primary flex items-center justify-center hover:bg-secondary hover:text-white transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-white text-primary flex items-center justify-center hover:bg-secondary hover:text-white transition-colors">
                    <Mail className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold text-primary mb-1">{member.name}</h3>
                <p className="text-secondary font-bold text-sm uppercase tracking-widest mb-4">{member.role}</p>
                <p className="text-slate-500 text-sm leading-relaxed">{member.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
