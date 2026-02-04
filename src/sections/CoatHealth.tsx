import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Sparkles, Droplets, Heart, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function CoatHealth() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    const card = cardRef.current;
    const headline = headlineRef.current;
    const body = bodyRef.current;
    const benefits = benefitsRef.current;
    const cta = ctaRef.current;

    if (!section || !bg || !card || !headline || !body || !benefits || !cta) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      });

      const benefitItems = benefits.children;

      // ENTRANCE (0% - 30%)
      scrollTl
        .fromTo(card,
          { x: '50vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(headline,
          { y: 22, opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.08
        )
        .fromTo(body,
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.14
        )
        .fromTo(benefitItems,
          { x: 20, opacity: 0 },
          { x: 0, opacity: 1, ease: 'none', stagger: 0.04 },
          0.18
        )
        .fromTo(cta,
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.24
        )
        // SETTLE (30% - 70%)
        .to({}, { duration: 0.4 })
        // EXIT (70% - 100%)
        .fromTo(card,
          { x: 0, opacity: 1 },
          { x: '18vw', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(bg,
          { scale: 1, x: 0 },
          { scale: 1.06, x: '-4vw', ease: 'power2.in' },
          0.7
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="health" className="section-pinned z-[60]">
      {/* Background Image */}
      <div ref={bgRef} className="absolute inset-0 w-full h-full">
        <img 
          src="/images/doodle-blanket-up.jpg" 
          alt="Goldendoodle looking up"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Text Card */}
      <div 
        ref={cardRef}
        className="absolute right-[6vw] top-[12vh] w-[44vw] text-card-glass p-[5%_7%]"
        style={{ opacity: 0 }}
      >
        <h2 
          ref={headlineRef}
          className="text-[clamp(28px,3.5vw,48px)] font-bold text-[#2B2B2B] mb-4"
        >
          See the difference<br />
          <span className="text-[#D8A94B]">in 30 days.</span>
        </h2>
        
        <p 
          ref={bodyRef}
          className="text-[clamp(14px,1.1vw,17px)] text-[#6E6A63] leading-relaxed mb-6"
        >
          Most pet parents notice visible improvements within the first month. 
          From firmer stools to a shinier coat, the results speak for themselves.
        </p>

        {/* Benefits List */}
        <div ref={benefitsRef} className="space-y-3 mb-6">
          <div className="flex items-center gap-3 p-3 bg-white/60 rounded-xl">
            <CheckCircle className="w-5 h-5 text-[#4A7C59] flex-shrink-0" />
            <div>
              <p className="font-semibold text-[#2B2B2B] text-sm">Firmer, easier-to-scoop stools</p>
              <p className="text-xs text-[#6E6A63]">No more messy cleanups</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-white/60 rounded-xl">
            <Droplets className="w-5 h-5 text-[#D8A94B] flex-shrink-0" />
            <div>
              <p className="font-semibold text-[#2B2B2B] text-sm">Softer, shinier coat</p>
              <p className="text-xs text-[#6E6A63]">Omega-3s nourish from within</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-white/60 rounded-xl">
            <Heart className="w-5 h-5 text-[#4A7C59] flex-shrink-0" />
            <div>
              <p className="font-semibold text-[#2B2B2B] text-sm">More energy & vitality</p>
              <p className="text-xs text-[#6E6A63]">Steady fuel from whole proteins</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-white/60 rounded-xl">
            <Sparkles className="w-5 h-5 text-[#D8A94B] flex-shrink-0" />
            <div>
              <p className="font-semibold text-[#2B2B2B] text-sm">Less shedding</p>
              <p className="text-xs text-[#6E6A63]">Balanced nutrition means healthier skin</p>
            </div>
          </div>
        </div>
        
        <a 
          ref={ctaRef}
          href="https://tlcpetfood.com/paw-partner/308725/"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary group inline-flex"
        >
          Try TLC Risk-Free
          <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </section>
  );
}
