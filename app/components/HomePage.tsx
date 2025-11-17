'use client';

import { useState } from 'react';
import Image from 'next/image';
import LazyMap from './LazyMap';
import {
  RiPhoneFill,
  RiMenuLine,
  RiCloseLine,
  RiInstagramLine,
  RiShieldCheckLine,
  RiStarLine,
  RiMapPinLine,
  RiStarFill,
  RiPhoneLine,
  RiTimeLine,
  RiMailLine,
  RiCustomerService2Line,
  RiToolsLine,
  RiHeart3Line
} from 'react-icons/ri';
import { FaYelp, FaGoogle } from 'react-icons/fa';

export default function HomePage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formErrors, setFormErrors] = useState({
    name: '',
    phone: '',
    address: '',
    projectDetails: ''
  });

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const headerOffset = 80; // Offset for sticky header
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false); // Close mobile menu after navigation
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const validateField = (name: string, value: string) => {
    let error = '';

    switch (name) {
      case 'name':
        if (value.length > 0 && value.length < 2) {
          error = 'Name must be at least 2 characters';
        } else if (value.length > 100) {
          error = 'Name is too long (max 100 characters)';
        } else if (value.length > 0 && !/^[a-zA-Z\s\-'.]+$/.test(value)) {
          error = 'Name can only contain letters, spaces, hyphens, and apostrophes';
        }
        break;

      case 'phone':
        const cleanPhone = value.replace(/[\s\-\(\)\.]/g, '');
        if (value.length > 0 && cleanPhone.length < 10) {
          error = 'Phone number must be at least 10 digits';
        } else if (value.length > 20) {
          error = 'Phone number is too long';
        } else if (value.length > 0 && !/^[\d\s\-\(\)\.+]+$/.test(value)) {
          error = 'Phone number contains invalid characters';
        }
        break;

      case 'address':
        if (value.length > 0 && value.length < 5) {
          error = 'Address must be at least 5 characters';
        } else if (value.length > 200) {
          error = 'Address is too long (max 200 characters)';
        }
        break;

      case 'projectDetails':
        if (value.length > 0 && value.length < 10) {
          error = 'Project details must be at least 10 characters';
        } else if (value.length > 2000) {
          error = 'Project details are too long (max 2000 characters)';
        }
        break;
    }

    setFormErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    validateField(e.target.name, e.target.value);
  };

  const services = [
    {
      title: 'DECK RESTORATION',
      description: 'Professional pressure washing, sanding, staining and sealing as well as board and structural post replacement.',
      image: '/s1.webp'
    },
    {
      title: 'WOODEN PORCH RESTORATION',
      description: 'Expert repairs, sanding and refinishing with paint or stain to restore beauty and durability to your porch.',
      image: '/s2.webp'
    },
    {
      title: 'FENCE REPAIR & STAINING',
      description: 'Post replacement, board repairs, pressure washing and professional staining to extend fence life and curb appeal.',
      image: '/s3.webp'
    },
    {
      title: 'PERGOLA INSTALLATION',
      description: 'Custom pergolas and shade structures built with quality craftsmanship to enhance your outdoor living space.',
      image: '/s4.webp'
    }
  ];

  const whyChooseUs = [
    {
      title: 'EXCEPTIONAL SERVICE',
      icon: RiCustomerService2Line,
      description: 'Personalized support and attention to detail at every stage of your project.',
      details: 'We listen to your vision and communicate clearly throughout the entire process, ensuring you\'re informed and satisfied every step of the way.'
    },
    {
      title: 'QUALITY WORKMANSHIP',
      icon: RiToolsLine,
      description: 'Skilled craftsmanship that ensures lasting beauty and durability.',
      details: 'Our experienced team uses premium materials and proven techniques to deliver results that stand the test of time and weather.'
    },
    {
      title: 'HONESTY & TRANSPARENCY',
      icon: RiShieldCheckLine,
      description: 'Clear communication and upfront pricing — no hidden surprises.',
      details: 'We provide detailed estimates, explain our process clearly, and never surprise you with unexpected costs or changes.'
    },
    {
      title: 'TRUSTED BY HOMEOWNERS',
      icon: RiHeart3Line,
      description: 'Proudly chosen by local families for our care, trust, and proven results.',
      details: 'With hundreds of satisfied customers across Sacramento, our reputation speaks for itself through word-of-mouth referrals.'
    }
  ];

  const testimonials = [
    {
      name: 'Judith P.',
      location: 'Sacramento',
      rating: 5,
      text: 'Our fence looks brand new — CraftLine did an amazing job. Fast, careful, and professional.'
    },
    {
      name: 'Michael R.',
      location: 'Roseville',
      rating: 5,
      text: 'Exceptional work on our deck restoration. The team was professional and the results exceeded our expectations.'
    },
    {
      name: 'Sarah T.',
      location: 'Folsom',
      rating: 5,
      text: 'CraftLine transformed our old porch beautifully. Great communication and fair pricing throughout the project.'
    },
    {
      name: 'David L.',
      location: 'Sacramento',
      rating: 5,
      text: 'Outstanding craftsmanship on our pergola installation. Highly recommend CraftLine for any wood restoration project.'
    }
  ];

  return (
    <div className="min-h-screen bg-brand-beige">
      {/* Logo Header with Navigation */}
      <header className="bg-white shadow-sm py-3 sticky top-0 z-50">
        <div className="max-w-full mx-auto px-4 md:px-6 lg:px-12">
          {/* Mobile & Tablet Layout */}
          <div className="lg:hidden flex items-center justify-between">
            {/* Logo */}
            <button onClick={() => scrollToSection('home')} className="flex items-center flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity duration-300">
              <Image
                src="/icon.png"
                alt="CraftLine Logo"
                width={48}
                height={48}
                className="w-10 h-10 sm:w-12 sm:h-12 mr-2"
                priority
              />
              <div className="text-left">
                <div className="text-xl sm:text-2xl font-bold text-brand-brown font-heading tracking-wide uppercase">
                  CRAFTLINE
                </div>
                <div className="text-xs sm:text-sm text-brand-muted font-medium tracking-wide uppercase">
                  Deck & Fence
                </div>
              </div>
            </button>

            {/* Mobile Actions */}
            <div className="flex items-center gap-2">
              <a
                href="tel:9168414316"
                className="flex items-center justify-center w-10 h-10 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-all duration-300 transform hover:scale-105"
              >
                <RiPhoneFill className="text-lg" />
              </a>

              <button
                onClick={toggleMobileMenu}
                className="flex items-center justify-center w-10 h-10 text-brand-brown hover:text-brand-orange transition-colors cursor-pointer"
              >
                {isMobileMenuOpen ? <RiCloseLine className="text-2xl" /> : <RiMenuLine className="text-2xl" />}
              </button>
            </div>
          </div>

          {/* Desktop Layout (lg+) */}
          <div className="hidden lg:grid lg:grid-cols-3 items-center gap-4">
            {/* Desktop Logo - Left Column */}
            <button onClick={() => scrollToSection('home')} className="flex items-center flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity duration-300">
              <Image
                src="/icon.png"
                alt="CraftLine Logo"
                width={48}
                height={48}
                className="w-12 h-12 mr-3"
                priority
              />
              <div className="text-left">
                <div className="text-2xl xl:text-3xl font-bold text-brand-brown font-heading tracking-wide uppercase">
                  CRAFTLINE
                </div>
                <div className="text-sm xl:text-base text-brand-muted font-medium tracking-wide uppercase">
                  Deck & Fence
                </div>
              </div>
            </button>

            {/* Desktop Navigation - Center Column */}
            <nav className="flex items-center gap-4 xl:gap-6 justify-center">
              <button onClick={() => scrollToSection('recent-projects')} className="relative text-brand-brown hover:text-brand-orange cursor-pointer transition-all duration-300 font-semibold text-sm xl:text-base whitespace-nowrap px-4 py-2 rounded-lg hover:bg-orange-50 group">
                <span className="relative z-10">PROJECTS</span>
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-brand-orange group-hover:w-3/4 transition-all duration-300"></span>
              </button>
              <button onClick={() => scrollToSection('services')} className="relative text-brand-brown hover:text-brand-orange cursor-pointer transition-all duration-300 font-semibold text-sm xl:text-base whitespace-nowrap px-4 py-2 rounded-lg hover:bg-orange-50 group">
                <span className="relative z-10">SERVICES</span>
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-brand-orange group-hover:w-3/4 transition-all duration-300"></span>
              </button>
              <button onClick={() => scrollToSection('reviews')} className="relative text-brand-brown hover:text-brand-orange cursor-pointer transition-all duration-300 font-semibold text-sm xl:text-base whitespace-nowrap px-4 py-2 rounded-lg hover:bg-orange-50 group">
                <span className="relative z-10">REVIEWS</span>
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-brand-orange group-hover:w-3/4 transition-all duration-300"></span>
              </button>
              <button onClick={() => scrollToSection('service-area')} className="relative text-brand-brown hover:text-brand-orange cursor-pointer transition-all duration-300 font-semibold text-sm xl:text-base whitespace-nowrap px-4 py-2 rounded-lg hover:bg-orange-50 group">
                <span className="relative z-10">AREAS</span>
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-brand-orange group-hover:w-3/4 transition-all duration-300"></span>
              </button>
            </nav>

            {/* Right Side Group - Right Column */}
            <div className="flex items-center gap-3 xl:gap-4 justify-end">
              {/* Phone Number */}
              <a
                href="tel:9168414316"
                className="flex items-center gap-1.5 text-brand-brown hover:text-brand-orange cursor-pointer transition-all duration-300 font-semibold text-sm xl:text-base whitespace-nowrap transform hover:scale-105"
              >
                <RiPhoneFill className="text-lg xl:text-xl" />
                <span className="hidden xl:inline">(916) 841-4316</span>
                <span className="xl:hidden">Call</span>
              </a>

              {/* CTA Button */}
              <button
                onClick={() => scrollToSection('contact')}
                className="bg-amber-500 hover:bg-amber-600 text-white px-4 xl:px-6 py-2 xl:py-2.5 rounded-lg cursor-pointer transition-all duration-300 whitespace-nowrap font-bold text-sm xl:text-base uppercase shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                FREE ESTIMATE
              </button>

              {/* Social Icons */}
              <div className="flex items-center gap-2 xl:gap-3 pl-3 xl:pl-4 border-l-2 border-gray-300">
                <a
                  href="https://www.instagram.com/craftline.sacramento?igsh=NTc4MTIwNjQ2YQ=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-brown hover:text-brand-orange cursor-pointer transition-all duration-300 transform hover:scale-105"
                >
                  <RiInstagramLine className="text-xl xl:text-2xl" />
                </a>

                <a
                  href="https://yelp.to/1YJwTMiSXR"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-brown hover:text-brand-orange cursor-pointer transition-all duration-300 transform hover:scale-105"
                >
                  <FaYelp className="text-xl xl:text-2xl" />
                </a>

                <a
                  href="https://maps.app.goo.gl/x312YhivPyDcfheA8?g_st=iwb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-brown hover:text-brand-orange cursor-pointer transition-all duration-300 transform hover:scale-105"
                >
                  <FaGoogle className="text-lg xl:text-xl" />
                </a>
              </div>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden mt-4 py-4 border-t border-gray-200">
              <nav className="flex flex-col space-y-2">
                <button
                  onClick={() => scrollToSection('recent-projects')}
                  className="relative text-left text-brand-brown hover:text-brand-orange cursor-pointer transition-all duration-300 font-semibold py-4 px-4 hover:bg-orange-50 rounded-lg hover:shadow-md group overflow-hidden"
                >
                  <span className="relative z-10">PROJECTS</span>
                  <span className="absolute left-0 bottom-0 w-0 h-1 bg-brand-orange group-hover:w-full transition-all duration-300"></span>
                </button>
                <button
                  onClick={() => scrollToSection('services')}
                  className="relative text-left text-brand-brown hover:text-brand-orange cursor-pointer transition-all duration-300 font-semibold py-4 px-4 hover:bg-orange-50 rounded-lg hover:shadow-md group overflow-hidden"
                >
                  <span className="relative z-10">SERVICES</span>
                  <span className="absolute left-0 bottom-0 w-0 h-1 bg-brand-orange group-hover:w-full transition-all duration-300"></span>
                </button>
                <button
                  onClick={() => scrollToSection('reviews')}
                  className="relative text-left text-brand-brown hover:text-brand-orange cursor-pointer transition-all duration-300 font-semibold py-4 px-4 hover:bg-orange-50 rounded-lg hover:shadow-md group overflow-hidden"
                >
                  <span className="relative z-10">REVIEWS</span>
                  <span className="absolute left-0 bottom-0 w-0 h-1 bg-brand-orange group-hover:w-full transition-all duration-300"></span>
                </button>
                <button
                  onClick={() => scrollToSection('service-area')}
                  className="relative text-left text-brand-brown hover:text-brand-orange cursor-pointer transition-all duration-300 font-semibold py-4 px-4 hover:bg-orange-50 rounded-lg hover:shadow-md group overflow-hidden"
                >
                  <span className="relative z-10">AREAS</span>
                  <span className="absolute left-0 bottom-0 w-0 h-1 bg-brand-orange group-hover:w-full transition-all duration-300"></span>
                </button>

                <a
                  href="tel:9168414316"
                  className="flex items-center gap-2 text-brand-brown hover:text-brand-orange font-semibold py-3 px-3 border-t border-gray-200 mt-2 transition-all duration-300 transform hover:scale-105"
                >
                  <RiPhoneFill className="text-xl text-brand-orange" />
                  <span>(916) 841-4316</span>
                </a>

                <button
                  onClick={() => scrollToSection('contact')}
                  className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-4 rounded-lg cursor-pointer transition-all whitespace-nowrap font-bold uppercase text-center shadow-lg"
                >
                  FREE ESTIMATE
                </button>

                {/* Mobile Social Icons */}
                <div className="flex items-center justify-center gap-6 pt-4 border-t border-gray-200 mt-2">
                  <a
                    href="https://www.instagram.com/craftline.sacramento?igsh=NTc4MTIwNjQ2YQ=="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-brown hover:text-brand-orange transition-all duration-300 transform hover:scale-105"
                  >
                    <RiInstagramLine className="text-3xl" />
                  </a>

                  <a
                    href="https://yelp.to/1YJwTMiSXR"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-brown hover:text-brand-orange transition-all duration-300 transform hover:scale-105"
                  >
                    <FaYelp className="text-3xl" />
                  </a>

                  <a
                    href="https://maps.app.goo.gl/x312YhivPyDcfheA8?g_st=iwb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-brown hover:text-brand-orange transition-all duration-300 transform hover:scale-105"
                  >
                    <FaGoogle className="text-2xl" />
                  </a>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center"
      >
        {/* Desktop Hero Background */}
        <div className="hidden md:block absolute inset-0">
          <Image
            src="/hero.webp"
            alt="Beautiful wooden deck"
            fill
            priority
            quality={85}
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/50"></div>
        </div>

        {/* Mobile Hero Layout */}
        <div className="md:hidden w-full min-h-screen flex flex-col justify-center items-center text-center px-6 relative">
          {/* Mobile Hero Background Image with Overlay */}
          <div className="absolute inset-0">
            <Image
              src="/hero.webp"
              alt="Beautiful wooden deck"
              fill
              priority
              quality={85}
              sizes="100vw"
              className="object-cover"
            />
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-black/50"></div>
          </div>
          
          {/* Mobile Hero Content */}
          <div className="relative z-10 text-white max-w-lg mx-auto">
            {/* Tagline */}
            <p className="text-sm sm:text-base font-medium text-stone-200 mb-4 uppercase tracking-wider" style={{textShadow: '1px 1px 4px rgba(0, 0, 0, 0.9)'}}>
              Your deck & fence experts in Sacramento
            </p>
            
            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl font-bold mb-8 leading-tight text-white font-heading tracking-wide uppercase" style={{textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8), 0 0 20px rgba(0, 0, 0, 0.5)'}}>
              DECK OR PORCH RESTORATION MADE SIMPLE
            </h1>
            
            {/* Benefits with Icons */}
            <div className="mb-10 space-y-3">
              <div className="flex items-center justify-center text-stone-100 font-medium text-base sm:text-lg">
                <div className="w-9 h-9 flex items-center justify-center mr-3 bg-gradient-to-br from-orange-700 to-orange-800 rounded-full shadow-lg">
                  <RiShieldCheckLine className="text-white text-xl" />
                </div>
                <span style={{textShadow: '1px 1px 4px rgba(0, 0, 0, 0.9)'}}>Trusted by local homeowners</span>
              </div>
              <div className="flex items-center justify-center text-stone-100 font-medium text-base sm:text-lg">
                <div className="w-9 h-9 flex items-center justify-center mr-3 bg-gradient-to-br from-orange-700 to-orange-800 rounded-full shadow-lg">
                  <RiStarLine className="text-white text-xl" />
                </div>
                <span style={{textShadow: '1px 1px 4px rgba(0, 0, 0, 0.9)'}}>Professional results</span>
              </div>
              <div className="flex items-center justify-center text-stone-100 font-medium text-base sm:text-lg">
                <div className="w-9 h-9 flex items-center justify-center mr-3 bg-gradient-to-br from-orange-700 to-orange-800 rounded-full shadow-lg">
                  <RiMapPinLine className="text-white text-xl" />
                </div>
                <span style={{textShadow: '1px 1px 4px rgba(0, 0, 0, 0.9)'}}>Local Sacramento experts</span>
              </div>
            </div>
            
            {/* CTA Button */}
            <button
              onClick={() => scrollToSection('contact')}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 active:from-orange-700 active:to-orange-800 text-white px-8 py-5 rounded-lg cursor-pointer transition-all duration-300 animate-pulse-glow hover:shadow-[0_6px_20px_rgba(234,88,12,0.5),0_0_0_3px_white] transform hover:scale-105 active:scale-95 whitespace-nowrap uppercase tracking-wide font-bold text-lg border-2 border-white"
            >
              REQUEST ESTIMATE
            </button>
          </div>
        </div>

        {/* Desktop Hero Layout */}
        <div className="hidden md:block w-full max-w-6xl mx-auto px-6 text-center text-white relative z-10">
          {/* Tagline */}
          <p className="text-lg md:text-xl font-medium text-stone-200 mb-6 uppercase tracking-wider" style={{textShadow: '2px 2px 6px rgba(0, 0, 0, 0.9)'}}>
            Your deck & fence experts in Sacramento
          </p>

          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight text-white font-heading tracking-wide uppercase" style={{textShadow: '3px 3px 10px rgba(0, 0, 0, 0.8), 0 0 30px rgba(0, 0, 0, 0.6)'}}>
            DECK OR PORCH RESTORATION MADE SIMPLE
          </h1>

          {/* Desktop Benefits with Icons */}
          <div className="mb-10 flex flex-wrap justify-center gap-6 md:gap-8">
            <div className="flex items-center text-stone-100 font-medium text-lg md:text-xl">
              <div className="w-12 h-12 flex items-center justify-center mr-3 bg-gradient-to-br from-orange-700 to-orange-800 rounded-full shadow-lg">
                <RiShieldCheckLine className="text-white text-2xl" />
              </div>
              <span style={{textShadow: '2px 2px 6px rgba(0, 0, 0, 0.9)'}}>Trusted by local homeowners</span>
            </div>
            <div className="flex items-center text-stone-100 font-medium text-lg md:text-xl">
              <div className="w-12 h-12 flex items-center justify-center mr-3 bg-gradient-to-br from-orange-700 to-orange-800 rounded-full shadow-lg">
                <RiStarLine className="text-white text-2xl" />
              </div>
              <span style={{textShadow: '2px 2px 6px rgba(0, 0, 0, 0.9)'}}>Professional results</span>
            </div>
            <div className="flex items-center text-stone-100 font-medium text-lg md:text-xl">
              <div className="w-12 h-12 flex items-center justify-center mr-3 bg-gradient-to-br from-orange-700 to-orange-800 rounded-full shadow-lg">
                <RiMapPinLine className="text-white text-2xl" />
              </div>
              <span style={{textShadow: '2px 2px 6px rgba(0, 0, 0, 0.9)'}}>Local Sacramento experts</span>
            </div>
          </div>

          <button
            onClick={() => scrollToSection('contact')}
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-10 py-4 rounded-lg text-xl font-bold transition-all duration-300 animate-pulse-glow-desktop hover:shadow-[0_8px_24px_rgba(234,88,12,0.6),0_0_0_4px_white] cursor-pointer whitespace-nowrap uppercase tracking-wide border-2 border-white transform hover:scale-105"
          >
            REQUEST ESTIMATE
          </button>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-choose-us" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-brand-brown mb-6 font-heading tracking-wide uppercase">WHY CHOOSE CRAFTLINE</h2>
            <p className="text-xl text-brand-muted max-w-3xl mx-auto leading-relaxed">
              Experience the difference that comes from working with Sacramento's most trusted deck and fence restoration specialists
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="group h-full flex flex-col bg-gradient-to-br from-white to-brand-beige/30 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-brand-beige/50">
                {/* Icon Container with Enhanced Styling */}
                <div className="relative mb-8">
                  <div className="w-24 h-24 flex items-center justify-center bg-gradient-to-br from-orange-700 to-orange-800 rounded-2xl mx-auto shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-500 relative overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute -top-4 -right-4 w-8 h-8 bg-white/20 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
                    <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-white/15 rounded-full group-hover:scale-125 transition-transform duration-500"></div>

                    {/* Main Icon */}
                    <item.icon className="text-4xl text-white relative z-10 group-hover:text-orange-100 transition-colors duration-300" />
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-orange-600/20 rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-700"></div>
                  <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-orange-700/20 rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500"></div>
                </div>

                {/* Content */}
                <div className="text-center flex-1 flex flex-col">
                  <h3 className="text-xl md:text-2xl font-bold text-brand-brown font-heading tracking-wide uppercase leading-tight group-hover:text-brand-orange transition-colors duration-300 h-20 flex items-center justify-center mb-4">
                    {item.title}
                  </h3>

                  {/* Main Description */}
                  <p className="text-brand-muted leading-relaxed mb-6 font-medium h-16 flex items-center justify-center">
                    {item.description}
                  </p>

                  {/* Divider Line */}
                  <div className="w-12 h-0.5 bg-brand-brown mx-auto mb-4 group-hover:w-20 transition-all duration-500"></div>

                  {/* Additional Details */}
                  <div className="mt-auto min-h-[120px] flex items-start">
                    <p className="text-sm text-brand-text leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                      {item.details}
                    </p>
                  </div>
                </div>

                {/* Hover Accent Border */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-brand-orange/30 transition-colors duration-500 pointer-events-none"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Gallery */}
      <section id="recent-projects" className="py-20 bg-gradient-to-br from-brand-beige to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-brand-brown mb-4 font-heading tracking-wide uppercase">RECENT PROJECTS</h2>
            <p className="text-xl text-brand-muted mb-8">Bringing outdoor spaces back to life across Sacramento</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { url: '/1.webp', caption: 'Deck Staining' },
              { url: '/2.webp', caption: 'Fence Refinish' },
              { url: '/3.webp', caption: 'Porch Refresh' },
              { url: '/4.webp', caption: 'Pergola Install' }
            ].map((item, index) => (
              <div key={index} className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500">
                <div className="aspect-[3/4] overflow-hidden bg-gray-100 relative">
                  <Image
                    src={item.url}
                    alt={item.caption}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center">
            <p className="text-xl text-brand-brown font-semibold mb-6 italic">
              Want to see your project here?
            </p>
            <button
              onClick={() => scrollToSection('contact')}
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-10 py-4 rounded-lg text-xl font-bold transition-all duration-300 shadow-xl hover:shadow-2xl cursor-pointer whitespace-nowrap uppercase tracking-wide transform hover:scale-105"
            >
              START YOUR PROJECT
            </button>
          </div>
        </div>
      </section>

      {/* Exterior Wood Maintenance Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-brand-brown mb-8 font-heading tracking-wide uppercase">EXTERIOR WOOD MAINTENANCE & RESTORATION</h2>
          <p className="text-lg text-brand-text leading-relaxed">
            At CraftLine, we know how to keep your decks, fences, and porches looking their best. With years of hands-on experience, our team restores and protects wood surfaces through professional washing, sanding, staining, sealing, and repairs — ensuring lasting strength and beauty.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gradient-to-br from-brand-beige to-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-brand-brown mb-4 font-heading tracking-wide uppercase">OUR SERVICES</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 flex flex-col h-full">
                <div className="relative overflow-hidden h-48 sm:h-56 md:h-48 lg:h-56">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl md:text-2xl font-bold text-brand-brown mb-4 font-heading tracking-wide leading-tight uppercase">{service.title}</h3>
                  <div className="flex-1 flex items-end">
                    <p className="text-brand-muted leading-relaxed text-base">{service.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-16 flex flex-col items-center gap-4">
            <p className="text-lg text-brand-brown font-semibold italic">
              Ready to bring new life to your outdoor wood?
            </p>
            <button
              onClick={() => scrollToSection('contact')}
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-10 py-4 rounded-lg text-xl font-bold transition-all duration-300 shadow-xl hover:shadow-2xl cursor-pointer whitespace-nowrap uppercase tracking-wide transform hover:scale-105"
            >
              GET YOUR FREE ESTIMATE
            </button>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-brand-brown mb-4 font-heading tracking-wide uppercase">WHAT OUR CUSTOMERS SAY</h2>
            <p className="text-xl text-brand-muted">Trusted by homeowners across Sacramento</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-brand-beige/30 p-6 rounded-xl shadow-lg border border-brand-beige/50 hover:shadow-xl transition-shadow duration-300 flex flex-col">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <RiStarFill key={i} className="text-yellow-400" />
                  ))}
                </div>
                <p className="text-brand-text mb-4 italic flex-grow">"{testimonial.text}"</p>
                <div className="font-semibold text-brand-brown mt-auto">
                  — {testimonial.name}, {testimonial.location}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Area Section */}
      <section id="service-area" className="py-20 bg-gradient-to-br from-brand-beige to-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-brand-brown mb-4 font-heading tracking-wide uppercase">OUR SERVICE AREA</h2>
            <p className="text-xl text-brand-muted">Proudly serving Sacramento and surrounding communities</p>
          </div>
          
          {/* Mobile Layout */}
          <div className="block lg:hidden space-y-6">
            {/* Mobile Map */}
            <div className="relative">
              <div className="bg-stone-100 rounded-xl overflow-hidden shadow-lg" style={{ height: '300px' }}>
                <LazyMap
                  src="https://www.google.com/maps/d/u/1/embed?mid=1sKue0irsW_qsvQ_nO9BTz1z-DqdNmsg&ehbc=2E312F&noprof=1&ll=38.68,-121.35&z=9&hl=en"
                  width="640"
                  height="360"
                  className="w-full"
                  style={{ border: 0, marginTop: '-60px' }}
                />
              </div>
            </div>
            
            {/* Mobile Service Areas List */}
            <div>
              <div className="space-y-2">
                {[
                  'Sacramento',
                  'Roseville', 
                  'Folsom',
                  'Rocklin',
                  'Elk Grove',
                  'Lincoln',
                  'Granite Bay',
                  'El Dorado Hills'
                ].map((area, index) => (
                  <div key={index} className="w-full p-3 bg-white rounded-lg hover:bg-orange-50 transition-colors duration-300 shadow-md hover:shadow-lg cursor-pointer touch-manipulation">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full mr-3 flex-shrink-0 shadow-sm"></div>
                      <span className="text-base font-medium text-brand-brown">{area}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Mobile Note */}
              <div className="mt-6 p-4 bg-white rounded-lg border-l-4 border-orange-600 shadow-md">
                <p className="text-sm text-brand-text leading-relaxed">
                  <strong className="text-brand-brown">Don't see your area listed?</strong> Give us a call! We may still be able to serve your location depending on the project size and scope.
                </p>
              </div>
            </div>
          </div>
          
          {/* Desktop Layout */}
          <div className="hidden lg:grid grid-cols-2 gap-12 items-start">
            {/* Service Areas List Container */}
            <div className="order-2">
              {/* City List - aligned to match map height */}
              <div className="flex flex-col justify-between h-[520px]">
                {[
                  'Sacramento',
                  'Roseville',
                  'Folsom',
                  'Rocklin',
                  'Elk Grove',
                  'Lincoln',
                  'Granite Bay',
                  'El Dorado Hills'
                ].map((area, index) => (
                  <div key={index} className="flex items-center p-3 bg-white rounded-lg hover:bg-orange-50 transition-colors duration-300 shadow-md hover:shadow-lg cursor-pointer">
                    <div className="w-3 h-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full mr-3 flex-shrink-0 shadow-sm"></div>
                    <span className="text-base font-medium text-brand-brown">{area}</span>
                  </div>
                ))}
              </div>

              {/* Desktop Note - positioned under the aligned list */}
              <div className="mt-6 p-6 bg-white rounded-lg border-l-4 border-orange-600 shadow-md">
                <p className="text-base text-brand-text leading-relaxed">
                  <strong className="text-brand-brown">Don't see your area listed?</strong> Give us a call! We may still be able to serve your location depending on the project size and scope.
                </p>
              </div>
            </div>

            {/* Map */}
            <div className="relative order-1 h-full">
              <div className="bg-stone-100 rounded-xl overflow-hidden shadow-lg h-full">
                <LazyMap
                  src="https://www.google.com/maps/d/u/1/embed?mid=1sKue0irsW_qsvQ_nO9BTz1z-DqdNmsg&ehbc=2E312F&noprof=1&ll=38.68,-121.35&z=10&hl=en"
                  width="640"
                  height="480"
                  className="w-full"
                  style={{ border: 0, height: 'calc(100% + 60px)', marginTop: '-60px' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-16 bg-gradient-to-r from-brand-brown to-stone-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 font-heading tracking-wide uppercase">GET A FREE QUOTE TODAY</h2>
          <p className="text-base sm:text-lg mb-8 text-stone-100 leading-relaxed">
            Ready to transform your outdoor space? Get your no-obligation estimate today.
          </p>

          <button
            onClick={() => scrollToSection('contact')}
            className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 sm:px-10 py-4 rounded-lg text-lg sm:text-xl font-bold transition-all duration-300 shadow-xl hover:shadow-2xl cursor-pointer whitespace-nowrap uppercase tracking-wide transform hover:scale-105"
          >
            GET YOUR FREE ESTIMATE
          </button>

          <div className="mt-6 flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-6 text-stone-100">
            <a href="tel:9168414316" className="flex items-center justify-center hover:text-white transition-all duration-300 cursor-pointer transform hover:scale-110 hover:brightness-125">
              <RiPhoneLine className="text-xl mr-2 hover:animate-pulse" />
              <span className="text-base font-semibold">(916) 841-4316</span>
            </a>
            <div className="flex items-center justify-center">
              <RiTimeLine className="text-xl mr-2" />
              <span className="text-base">Quick Response</span>
            </div>
            <div className="flex items-center justify-center">
              <RiShieldCheckLine className="text-xl mr-2" />
              <span className="text-base">Licensed &amp; Insured</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-brand-brown mb-4 font-heading tracking-wide uppercase">REQUEST YOUR FREE ESTIMATE</h2>
            <p className="text-xl text-brand-muted">Ready to restore your deck, porch, or fence? Get started today!</p>
          </div>
          
          <div className="bg-brand-beige p-8 rounded-xl shadow-lg">
            {/* Hidden iframe to avoid page reload */}
            <iframe name="hidden_iframe" style={{display: 'none'}}></iframe>

            {/* Custom HTML Form */}
            <form
              id="craftline-form"
              action="https://script.google.com/macros/s/AKfycbwrf2bOBhIvlYF1TPZk--VH7GnWE4ljYhLRn7d5gukR4ib20gXZBZUwvwuPs5Gq_XTR/exec"
              method="POST"
              encType="multipart/form-data"
              target="hidden_iframe"
              onSubmit={() => {
                const s = document.getElementById('craftline-status');
                if (s) {
                  s.style.display = 'block';
                  s.textContent = 'Sending…';
                  s.className = 'text-center text-lg font-medium mt-4 p-3 rounded-lg bg-blue-100 text-blue-800';
                  setTimeout(() => {
                    s.textContent = '✅ Request sent. We will contact you shortly!';
                    s.className = 'text-center text-lg font-medium mt-4 p-3 rounded-lg bg-green-100 text-green-800';
                    const form = document.getElementById('craftline-form') as HTMLFormElement;
                    if (form) form.reset();
                  }, 1500);
                }
                return true;
              }}
              className="space-y-5"
            >
              <div>
                <label className="block text-brand-brown font-semibold mb-2 uppercase tracking-wide">Name*</label>
                <input
                  type="text"
                  name="name"
                  required
                  minLength={2}
                  maxLength={100}
                  pattern="^[a-zA-Z\s\-'.]+$"
                  title="Please enter a valid name (letters, spaces, hyphens, apostrophes only)"
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 text-brand-text placeholder-gray-400 bg-white ${
                    formErrors.name ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-orange-500 focus:border-orange-500'
                  }`}
                  placeholder="Enter your full name"
                />
                {formErrors.name && (
                  <p className="text-red-600 text-sm mt-1">{formErrors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-brand-brown font-semibold mb-2 uppercase tracking-wide">Phone*</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  minLength={10}
                  maxLength={20}
                  pattern="^[\d\s\-\(\)\.+]+$"
                  title="Please enter a valid phone number (10-20 digits, spaces, dashes, parentheses allowed)"
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 text-brand-text placeholder-gray-400 bg-white ${
                    formErrors.phone ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-orange-500 focus:border-orange-500'
                  }`}
                  placeholder="(916) 555-0123"
                />
                {formErrors.phone && (
                  <p className="text-red-600 text-sm mt-1">{formErrors.phone}</p>
                )}
              </div>

              {/* Honeypot field - hidden from humans, visible to bots */}
              <div style={{position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none'}} aria-hidden="true">
                <label>Website</label>
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div>
                <label className="block text-brand-brown font-semibold mb-2 uppercase tracking-wide">Address*</label>
                <input
                  type="text"
                  name="address"
                  required
                  minLength={5}
                  maxLength={200}
                  title="Please enter a valid address (minimum 5 characters)"
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 text-brand-text placeholder-gray-400 bg-white ${
                    formErrors.address ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-orange-500 focus:border-orange-500'
                  }`}
                  placeholder="Enter your full address"
                />
                {formErrors.address && (
                  <p className="text-red-600 text-sm mt-1">{formErrors.address}</p>
                )}
              </div>
              
              <div>
                <label className="block text-brand-brown font-semibold mb-2 uppercase tracking-wide">Project Details*</label>
                <textarea
                  name="projectDetails"
                  rows={5}
                  required
                  minLength={10}
                  maxLength={2000}
                  title="Please provide project details (minimum 10 characters, maximum 2000)"
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 text-brand-text placeholder-gray-400 bg-white resize-vertical ${
                    formErrors.projectDetails ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-orange-500 focus:border-orange-500'
                  }`}
                  placeholder="Please describe your deck, porch, or fence restoration project..."
                ></textarea>
                {formErrors.projectDetails && (
                  <p className="text-red-600 text-sm mt-1">{formErrors.projectDetails}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 rounded-lg text-lg font-bold transition-all duration-300 shadow-xl hover:shadow-2xl cursor-pointer whitespace-nowrap uppercase tracking-wide transform hover:scale-105 active:scale-95"
              >
                REQUEST ESTIMATE
              </button>
              
              <p id="craftline-status" style={{display: 'none'}} className="text-center text-lg font-medium mt-4 p-3 rounded-lg"></p>
            </form>
            
            <div className="mt-8 text-center">
              <p className="text-brand-muted mb-4 uppercase tracking-wide font-medium">Or contact us directly:</p>
              <div className="flex flex-wrap justify-center gap-6">
                <a href="tel:9168414316" className="flex items-center text-brand-brown hover:text-orange-600 cursor-pointer font-medium transition-all duration-300 transform hover:scale-105">
                  <RiPhoneLine className="mr-2" />
                  (916) 841-4316
                </a>
                <a href="mailto:CraftLine.Prodeck@gmail.com" className="flex items-center text-brand-brown hover:text-orange-600 cursor-pointer font-medium transition-all duration-300 transform hover:scale-105">
                  <RiMailLine className="mr-2" />
                  CraftLine.Prodeck@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-brown text-white py-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="mb-6">
            <div className="flex justify-center mb-4">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white font-heading tracking-wide uppercase">
                  CRAFTLINE
                </div>
                <div className="text-sm md:text-base text-stone-200 font-medium tracking-wide uppercase">
                  Deck & Fence
                </div>
              </div>
            </div>
            <div className="w-16 h-1 bg-brand-orange mx-auto"></div>
          </div>
          
          <p className="text-stone-200 mb-4 font-medium">
            Professional deck, porch, and fence restoration services
          </p>
          <p className="text-stone-300 text-sm mb-4">
            Serving Sacramento, Roseville, Folsom, West Sacramento, Rocklin, Elk Grove, and El Dorado Hills
          </p>

          <div className="border-t border-brand-brown/50 pt-4">
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-4">
              <div className="flex flex-wrap justify-center gap-6 items-center">
                <a href="tel:9168414316" className="flex items-center text-stone-200 hover:text-white cursor-pointer font-medium transition-all duration-300 transform hover:scale-105">
                  <RiPhoneLine className="mr-2" />
                  (916) 841-4316
                </a>
                <a href="mailto:CraftLine.Prodeck@gmail.com" className="flex items-center text-stone-200 hover:text-white cursor-pointer font-medium transition-all duration-300 transform hover:scale-105">
                  <RiMailLine className="mr-2" />
                  CraftLine.Prodeck@gmail.com
                </a>
                <a
                  href="https://www.instagram.com/craftline.sacramento?igsh=NTc4MTIwNjQ2YQ=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stone-200 hover:text-white cursor-pointer transition-all duration-300 transform hover:scale-105"
                >
                  <RiInstagramLine className="text-lg" />
                </a>
                <a
                  href="https://yelp.to/1YJwTMiSXR"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stone-200 hover:text-white cursor-pointer transition-all duration-300 transform hover:scale-105"
                >
                  <FaYelp className="text-lg" />
                </a>
                <a
                  href="https://maps.app.goo.gl/x312YhivPyDcfheA8?g_st=iwb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stone-200 hover:text-white cursor-pointer transition-all duration-300 transform hover:scale-105"
                >
                  <FaGoogle className="text-lg" />
                </a>
              </div>
            </div>
            
            <p className="text-stone-300 text-sm">
              Copyright © CraftLine. All rights reserved. Licensed &amp; Insured.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
