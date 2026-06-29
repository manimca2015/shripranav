'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';

export function RequestQuote() {
  return (
    <section className="py-24 relative bg-slate-50">
      <div className="container mx-auto px-4">
        <Card className="max-w-5xl mx-auto overflow-hidden rounded-[40px] border-none shadow-2xl bg-white">
          <div className="grid lg:grid-cols-2">
            <div className="p-12 lg:p-16 bg-primary text-white flex flex-col justify-center">
              <h2 className="text-4xl md:text-5xl font-black mb-6">Let's Create Something Exceptional</h2>
              <p className="text-xl text-white/70 mb-8 leading-relaxed">
                Get customized textile solutions tailored to your business needs. Partner with us for global quality and ethical manufacturing.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-white">✓</div>
                  <span className="font-medium text-white/90">Custom Product Development</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-white">✓</div>
                  <span className="font-medium text-white/90">Bulk Order Capability</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-white">✓</div>
                  <span className="font-medium text-white/90">Ethical Sourcing Verified</span>
                </div>
              </div>
            </div>

            <div className="p-12 lg:p-16">
              <form className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-primary">Name</label>
                    <Input placeholder="Your Full Name" className="rounded-xl border-slate-200 h-12" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-primary">Company</label>
                    <Input placeholder="Your Business Name" className="rounded-xl border-slate-200 h-12" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-primary">Email</label>
                    <Input type="email" placeholder="email@company.com" className="rounded-xl border-slate-200 h-12" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-primary">Phone</label>
                    <Input placeholder="+1 (234) 567-890" className="rounded-xl border-slate-200 h-12" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary">Product Requirement</label>
                  <Input placeholder="e.g., 5000 Bed Linen Sets" className="rounded-xl border-slate-200 h-12" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary">Message</label>
                  <Textarea placeholder="How can we help you today?" className="rounded-xl border-slate-200 min-h-[120px]" />
                </div>
                <Button className="w-full bg-secondary hover:bg-primary text-white h-14 rounded-xl font-bold text-lg smooth-transition">
                  Request a Custom Quote
                </Button>
              </form>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}