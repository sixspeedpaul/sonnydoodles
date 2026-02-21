import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Instagram, ArrowUp, Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;

    if (!section || !content) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(content,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: content,
            start: 'top 85%',
            end: 'top 65%',
            scrub: 0.4,
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={sectionRef} className="relative z-[100] bg-[#2B2B2B] py-10 md:py-12 px-[5vw] md:px-[8vw]">
      <div ref={contentRef} className="max-w-6xl mx-auto">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-6 md:gap-8 mb-8 md:mb-10">
          {/* Logo & Tagline */}
          <div className="flex flex-col md:flex-row items-center md:items-center gap-4 md:gap-4 text-center md:text-left">
            <img 
              src="/images/logo.png" 
              alt="Sonny Doodles on Fifth"
              width={900}
              height={900}
              loading="lazy"
              decoding="async"
              className="h-14 md:h-16 w-auto brightness-0 invert"
            />
            <div>
              <p className="font-bold text-white text-base md:text-lg">Sonny Doodles on Fifth</p>
              <p className="text-xs md:text-sm text-white/60">Premium nutrition for goldendoodles</p>
            </div>
          </div>

          {/* Contact Links */}
          <div className="flex flex-wrap justify-center md:justify-end items-center gap-4 md:gap-6">
            <a 
              href="mailto:info@sonnydoodles.com"
              className="flex items-center gap-2 text-white/80 hover:text-[#D8A94B] transition-colors"
            >
              <Mail className="w-4 h-4 md:w-5 md:h-5" />
              <span className="text-xs md:text-sm">info@sonnydoodles.com</span>
            </a>
            <a 
              href="https://instagram.com/sonnydoodlesonfifth"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white/80 hover:text-[#D8A94B] transition-colors"
            >
              <Instagram className="w-4 h-4 md:w-5 md:h-5" />
              <span className="text-xs md:text-sm">@sonnydoodlesonfifth</span>
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-6 md:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Links */}
            <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 md:gap-6">
              <a 
                href="https://tlcpetfood.com/paw-partner/308725/"
                target="_blank"
                rel="sponsored nofollow noopener noreferrer"
                className="text-xs md:text-sm text-white/60 hover:text-[#D8A94B] transition-colors"
              >
                Order TLC Pet Food
              </a>
              <a
                href="#testimonials"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-xs md:text-sm text-white/60 hover:text-[#D8A94B] transition-colors"
              >
                Testimonials
              </a>
              <a
                href="#faq"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-xs md:text-sm text-white/60 hover:text-[#D8A94B] transition-colors"
              >
                Goldendoodle FAQ
              </a>
              <a 
                href="#must-haves"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('must-haves')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-xs md:text-sm text-white/60 hover:text-[#D8A94B] transition-colors"
              >
                Goldendoodle Must Haves
              </a>
            </div>

            {/* Back to Top */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-2 text-xs md:text-sm text-white/60 hover:text-[#D8A94B] transition-colors"
            >
              Back to top
              <ArrowUp className="w-3.5 h-3.5 md:w-4 md:h-4" />
            </button>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 md:mt-8 pt-5 md:pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4">
          <p className="text-[10px] md:text-xs text-white/40 text-center md:text-left">
            © {new Date().getFullYear()} Sonny Doodles on Fifth. All rights reserved.
          </p>
          <p className="text-[10px] md:text-xs text-white/40 flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-[#D8A94B]" /> for goldendoodles everywhere
          </p>
        </div>
      </div>
    </footer>
  );
}
