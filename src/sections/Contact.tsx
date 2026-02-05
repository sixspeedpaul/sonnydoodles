import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Instagram, Send, ArrowUp } from 'lucide-react';
import { toast } from 'sonner';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const left = leftRef.current;
    const form = formRef.current;

    if (!section || !left || !form) return;

    const ctx = gsap.context(() => {
      // Left column animation
      gsap.fromTo(left,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: left,
            start: 'top 75%',
            end: 'top 55%',
            scrub: 0.4,
          }
        }
      );

      // Form animation
      gsap.fromTo(form,
        { y: 40, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: form,
            start: 'top 75%',
            end: 'top 50%',
            scrub: 0.4,
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section ref={sectionRef} id="contact" className="relative z-[100] bg-[#F6F3EE] py-[10vh] px-[8vw]">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Content */}
          <div ref={leftRef}>
            {/* Logo */}
            <div className="mb-6">
              <img 
                src="images/logo.png" 
                alt="Sonny Doodles"
                className="h-20 w-auto"
              />
            </div>
            
            <h2 className="text-[clamp(32px,4vw,56px)] font-bold text-[#2B2B2B] mb-6">
              Let's talk doodles.
            </h2>
            <p className="text-[clamp(15px,1.2vw,18px)] text-[#6E6A63] leading-relaxed mb-8">
              Questions about nutrition, transitioning to TLC, or finding the right formula? 
              We're always happy to chat about our favorite topic—goldendoodles!
            </p>
            
            {/* Contact Info */}
            <div className="space-y-4">
              <a 
                href="mailto:hello@sonnydoodles.com"
                className="flex items-center gap-3 text-[#2B2B2B] hover:text-[#4A7C59] transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="font-medium">hello@sonnydoodles.com</span>
              </a>
              <a 
                href="https://instagram.com/sonnydoodles"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-[#2B2B2B] hover:text-[#4A7C59] transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                  <Instagram className="w-5 h-5" />
                </div>
                <span className="font-medium">@sonnydoodles</span>
              </a>
            </div>
          </div>

          {/* Right Column - Form */}
          <div 
            ref={formRef}
            className="bg-white rounded-[28px] p-8 shadow-[0_18px_40px_rgba(0,0,0,0.10)]"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[#2B2B2B] mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-[#2B2B2B]/10 bg-[#F6F3EE]/50 text-[#2B2B2B] placeholder:text-[#6E6A63]/50 focus:outline-none focus:ring-2 focus:ring-[#D8A94B] focus:border-transparent transition-all"
                  placeholder="Your name"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#2B2B2B] mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-[#2B2B2B]/10 bg-[#F6F3EE]/50 text-[#2B2B2B] placeholder:text-[#6E6A63]/50 focus:outline-none focus:ring-2 focus:ring-[#D8A94B] focus:border-transparent transition-all"
                  placeholder="your@email.com"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-[#2B2B2B] mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-[#2B2B2B]/10 bg-[#F6F3EE]/50 text-[#2B2B2B] placeholder:text-[#6E6A63]/50 focus:outline-none focus:ring-2 focus:ring-[#D8A94B] focus:border-transparent transition-all resize-none"
                  placeholder="How can we help?"
                  required
                />
              </div>
              
              <button
                type="submit"
                className="btn-primary w-full group"
              >
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-20 pt-8 border-t border-[#2B2B2B]/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Logo & Tagline */}
            <div className="flex items-center gap-4">
              <img 
                src="images/logo.png" 
                alt="Sonny Doodles"
                className="h-14 w-auto"
              />
              <div>
                <p className="font-bold text-[#2B2B2B]">Sonny Doodles</p>
                <p className="text-sm text-[#6E6A63]">Proud TLC Pet Food Paw Partner</p>
              </div>
            </div>
            
            {/* Links */}
            <div className="flex items-center gap-6">
              <a 
                href="https://tlcpetfood.com/paw-partner/308725/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#6E6A63] hover:text-[#4A7C59] transition-colors"
              >
                Order TLC
              </a>
              <a 
                href="https://tlcpetfood.com/the-tlc-scoop/category/paw-partner/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#6E6A63] hover:text-[#4A7C59] transition-colors"
              >
                Paw Partner Program
              </a>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="flex items-center gap-1 text-sm text-[#6E6A63] hover:text-[#4A7C59] transition-colors"
              >
                Back to top
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <p className="text-center text-xs text-[#6E6A63]/60 mt-6">
            © {new Date().getFullYear()} Sonny Doodles. All rights reserved. 
            TLC Pet Food is a registered trademark of TLC Pet Food Inc.
          </p>
        </footer>
      </div>
    </section>
  );
}
