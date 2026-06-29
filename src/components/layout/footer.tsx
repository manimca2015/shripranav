'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-8">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="Shri Pranav Logo"
                width={180}
                height={60}
                className="object-contain brightness-0 invert"
              />
            </Link>
            <p className="text-slate-400 leading-relaxed max-w-xs">
              A globally respected textile manufacturer committed to quality, sustainability, and people-first practices since 1995.
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Linkedin, Twitter].map((Icon, i) => (
                <Link key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-secondary smooth-transition">
                  <Icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-8 text-secondary">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link href="/about" className="text-slate-400 hover:text-white smooth-transition">About Shri Pranav</Link></li>
              <li><Link href="/factory" className="text-slate-400 hover:text-white smooth-transition">Manufacturing Unit</Link></li>
              <li><Link href="/blogs" className="text-slate-400 hover:text-white smooth-transition">Recent Insights</Link></li>
              <li><Link href="/contact" className="text-slate-400 hover:text-white smooth-transition">Get in Touch</Link></li>
              <li><Link href="/quote" className="text-slate-400 hover:text-white smooth-transition">Request a Quote</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-8 text-secondary">Our Products</h4>
            <ul className="space-y-4">
              <li><Link href="/products/tote-bags" className="text-slate-400 hover:text-white smooth-transition">Tote Bags</Link></li>
              <li><Link href="/products/linen" className="text-slate-400 hover:text-white smooth-transition">Bed Linen</Link></li>
              <li><Link href="/products/cushion" className="text-slate-400 hover:text-white smooth-transition">Cushion Covers</Link></li>
              <li><Link href="/products/baby" className="text-slate-400 hover:text-white smooth-transition">Baby Garments</Link></li>
              <li><Link href="/products/gents" className="text-slate-400 hover:text-white smooth-transition">Gents' Shirts</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-8 text-secondary">Contact Details</h4>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <MapPin className="text-secondary shrink-0" />
                <span className="text-slate-400 text-sm">Industrial Area Phase 2, <br />Textile City, India 110001</span>
              </li>
              <li className="flex gap-4">
                <Phone className="text-secondary shrink-0" />
                <span className="text-slate-400 text-sm">+91 98765 43210</span>
              </li>
              <li className="flex gap-4">
                <Mail className="text-secondary shrink-0" />
                <span className="text-slate-400 text-sm">info@shripranav.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Shri Pranav Textiles. All Rights Reserved.
          </p>
          <div className="flex gap-8 text-sm text-slate-500">
            <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}