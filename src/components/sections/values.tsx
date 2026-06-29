'use client';

import React from 'react';
import { ShieldCheck, Users, Lightbulb, Leaf, Handshake, Heart } from 'lucide-react';

const values = [
  {
    title: 'Integrity',
    desc: 'We believe in doing the right thing — always. Honesty and transparency guide every decision we make.',
    icon: ShieldCheck
  },
  {
    title: 'People First',
    desc: 'From empowering our team to treating every stakeholder with respect, we prioritize human dignity and development.',
    icon: Users
  },
  {
    title: 'Innovation',
    desc: 'We embrace continuous improvement and smart technologies to stay ahead in quality, sustainability, and design.',
    icon: Lightbulb
  },
  {
    title: 'Sustainability',
    desc: 'We are committed to eco-conscious practices that reduce waste, conserve resources, and protect the environment for future generations.',
    icon: Leaf
  },
  {
    title: 'Collaboration',
    desc: 'We grow stronger together — through teamwork, mutual respect, and shared success across all levels of the organization.',
    icon: Handshake
  },
  {
    title: 'Women Empowerment',
    desc: 'We empower women by providing equal opportunities, skill development, and a supportive work environment.',
    icon: Heart
  }
];

export function Values() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-primary mb-6">Our Core Values</h2>
          <p className="text-slate-600">The pillars that define our culture and drive our commitment to excellence.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {values.map((val, i) => (
            <div key={i} className="p-8 rounded-3xl border border-slate-100 hover:border-secondary/30 hover:shadow-xl hover:-translate-y-2 smooth-transition group">
              <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center mb-6 group-hover:bg-secondary group-hover:text-white smooth-transition text-primary">
                <val.icon className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4">{val.title}</h3>
              <p className="text-slate-600 leading-relaxed">{val.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
