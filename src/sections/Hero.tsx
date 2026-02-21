import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Heart, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLParagraphElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    const headline = headlineRef.current;
    const subhead = subheadRef.current;
    const cta = ctaRef.current;
    const trust = trustRef.current;
    const badges = badgesRef.current;

    if (!section || !bg || !headline || !subhead || !cta || !trust || !badges) return;

    const ctx = gsap.context(() => {
      // Auto-play entrance animation on load
      const loadTl = gsap.timeline();
      
      loadTl
        .fromTo(bg, 
          { opacity: 0, scale: 1.06 },
          { opacity: 1, scale: 1, duration: 1.1, ease: 'power2.out' }
        )
        .fromTo(headline.children,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, stagger: 0.08, ease: 'power2.out' },
          '-=0.6'
        )
        .fromTo(subhead,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' },
          '-=0.5'
        )
        .fromTo(badges.children,
          { y: 20, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.08, ease: 'power2.out' },
          '-=0.4'
        )
        .fromTo(cta.children,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out' },
          '-=0.3'
        )
        .fromTo(trust,
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
          '-=0.2'
        );

      // Scroll-driven exit animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset all elements to visible when scrolling back to top
            gsap.set([headline.children, subhead, cta.children, trust, badges.children], { opacity: 1, x: 0 });
            gsap.set(bg, { scale: 1, x: 0 });
          }
        }
      });

      // EXIT phase (70% - 100%)
      scrollTl
        .fromTo(headline.children,
          { x: 0, opacity: 1 },
          { x: '-18vw', opacity: 0, ease: 'power2.in', stagger: 0.02 },
          0.7
        )
        .fromTo(subhead,
          { x: 0, opacity: 1 },
          { x: '-10vw', opacity: 0, ease: 'power2.in' },
          0.72
        )
        .fromTo(badges.children,
          { x: 0, opacity: 1 },
          { x: '-8vw', opacity: 0, ease: 'power2.in', stagger: 0.03 },
          0.74
        )
        .fromTo(cta.children,
          { x: 0, opacity: 1 },
          { x: '-10vw', opacity: 0, ease: 'power2.in', stagger: 0.03 },
          0.76
        )
        .fromTo(trust,
          { x: 0, opacity: 1 },
          { x: '-8vw', opacity: 0, ease: 'power2.in' },
          0.78
        )
        .fromTo(bg,
          { scale: 1, x: 0 },
          { scale: 1.08, x: '6vw', ease: 'power2.in' },
          0.7
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="home" className="section-pinned z-10">
      {/* Background Image */}
      <div 
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0 }}
      >
        <img 
          src="/images/hero-goldendoodle.jpg" 
          alt="Goldendoodle outdoors with healthy coat, representing premium nutrition benefits"
          width={1248}
          height={832}
          loading="eager"
          decoding="async"
          fetchPriority="high"
          className="w-full h-full object-cover object-center"
        />
        {/* Gradient overlay for readability - stronger on mobile */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(90deg, rgba(246,243,238,0.95) 0%, rgba(246,243,238,0.85) 35%, rgba(246,243,238,0.4) 100%)'
          }}
        />
      </div>

      {/* Content */}
      <div 
        ref={contentRef}
        className="relative z-10 h-full flex flex-col justify-center px-5 md:px-[8vw]"
      >
        <div className="max-w-full md:max-w-[48vw]">
          {/* Headline */}
          <div ref={headlineRef} className="mb-3 md:mb-4">
            <h1 className="text-[clamp(32px,6vw,84px)] font-extrabold text-[#2B2B2B] leading-[0.95] tracking-[-0.02em]">
              <span className="block">Happy doodles.</span>
              <span className="block mt-1 md:mt-2">
                Better <span className="text-[#D8A94B]">poops.</span>
              </span>
            </h1>
          </div>

          {/* Subheadline */}
          <p 
            ref={subheadRef}
            className="text-base md:text-[clamp(16px,1.4vw,20px)] text-[#6E6A63] leading-relaxed max-w-full md:max-w-[40vw] mb-4 md:mb-6"
          >
            TLC Pet Food delivers nutrition-dense, filler-free recipes that keep your goldendoodle thriving—from their coat to their digestive health.
          </p>

          {/* Benefit Badges */}
          <div ref={badgesRef} className="flex flex-wrap gap-2 md:gap-3 mb-6 md:mb-8">
            <div className="inline-flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-white/80 backdrop-blur-sm rounded-full border border-[#2B2B2B]/10">
              <Star className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#D8A94B] fill-[#D8A94B]" />
              <span className="text-xs md:text-sm font-medium text-[#2B2B2B]">Premium Nutrition</span>
            </div>
            <div className="inline-flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-white/80 backdrop-blur-sm rounded-full border border-[#2B2B2B]/10">
              <Heart className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#4A7C59]" />
              <span className="text-xs md:text-sm font-medium text-[#2B2B2B]">No Fillers</span>
            </div>
            <div className="inline-flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-white/80 backdrop-blur-sm rounded-full border border-[#2B2B2B]/10">
              <span className="text-xs md:text-sm font-medium text-[#2B2B2B]">🇨🇦 Made in Canada</span>
            </div>
          </div>

          {/* CTAs */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4 mb-4 md:mb-6">
            <a 
              href="https://tlcpetfood.com/paw-partner/308725/"
              target="_blank"
              rel="sponsored nofollow noopener noreferrer"
              className="btn-primary group justify-center sm:justify-start text-sm md:text-base py-3 md:py-4"
            >
              <Heart className="w-4 h-4 mr-2" />
              Shop TLC Pet Food
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </a>
            <button 
              onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-secondary justify-center sm:justify-start text-sm md:text-base py-3 md:py-4"
            >
              See Products & Pricing
            </button>
          </div>

          {/* Trust line */}
          <p 
            ref={trustRef}
            className="font-mono text-[10px] md:text-xs uppercase tracking-[0.12em] text-[#6E6A63]"
          >
            FREE DELIVERY • AUTOSHIP AVAILABLE • 100% GUARANTEE
          </p>
        </div>
      </div>
    </section>
  );
}
