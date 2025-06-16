'use client';

import { motion } from 'framer-motion';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Heart } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="relative bg-blue-600 opacity-80 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 mb-12">
          {/* About Column */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-4">Batoli Home Stay</h3>
            <p className="text-sky-100">
              Experience the perfect blend of comfort and nature at our family-run home stay in the heart of the mountains.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-sky-200 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-sky-200 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-sky-200 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="w-40 min-w-fit">
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="#home" className="text-sky-100 hover:text-white transition-colors">Home</Link></li>
              <li><Link href="#about" className="text-sky-100 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="#gallery" className="text-sky-100 hover:text-white transition-colors">Gallery</Link></li>
              <li><Link href="#location" className="text-sky-100 hover:text-white transition-colors">Location</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-sky-300 mt-0.5 flex-shrink-0" />
                <a href="https://maps.app.goo.gl/HQu8gsiv2xJUsYeA8?g_st=awb"><span className="text-sky-100 hover:text-white transition-colors">Batoli Village, Dehradun, Uttarakhand, India</span></a>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-sky-300" />
                <a href="tel:+917818097741" className="text-sky-100 hover:text-white transition-colors">+91 78180 97741</a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-sky-300" />
                <a href="mailto:batolisoulstay@gmail.com" className="text-sky-100 hover:text-white transition-colors">batolisoulstay@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>        

        {/* Copyright */}
        <div className="border-t border-sky-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sky-200 text-sm mb-4 md:mb-0">
            &copy; {currentYear} Batoli Home Stay. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
