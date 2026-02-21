import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Truck, Calendar } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function DeliverySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    const card = cardRef.current;
    const headline = headlineRef.current;
    const body = bodyRef.current;
    const cta = ctaRef.current;
    const icons = iconsRef.current;

    if (!section || !bg || !card || !headline || !body || !cta || !icons) return;

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

      // ENTRANCE (0% - 30%)
      scrollTl
        .fromTo(card,
          { x: '-50vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(headline,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.08
        )
        .fromTo(body,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.12
        )
        .fromTo(cta,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.16
        )
        .fromTo(icons,
          { y: 12, opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.2
        )
        // SETTLE (30% - 70%)
        .to({}, { duration: 0.4 })
        // EXIT (70% - 100%)
        .fromTo(card,
          { x: 0, opacity: 1 },
          { x: '-18vw', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(bg,
          { scale: 1, x: 0 },
          { scale: 1.07, x: '5vw', ease: 'power2.in' },
          0.7
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="delivery" className="section-pinned z-50">
      {/* Background Image */}
      <div ref={bgRef} className="absolute inset-0 w-full h-full">
        <img 
          src="/images/doodle-sofa-close.jpg" 
          alt="Goldendoodle on sofa waiting for home dog food delivery"
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Text Card */}
      <div 
        ref={cardRef}
        className="absolute left-[6vw] top-[14vh] w-[44vw] text-card-glass p-[6%_8%]"
        style={{ opacity: 0 }}
      >
        <h2 
          ref={headlineRef}
          className="text-[clamp(32px,4vw,56px)] font-bold text-[#2B2B2B] mb-6"
        >
          Delivered to your door.
        </h2>
        
        <p 
          ref={bodyRef}
          className="text-[clamp(15px,1.2vw,18px)] text-[#6E6A63] leading-relaxed mb-8"
        >
          Set up Autoship and never run out. Adjust, pause, or rush a delivery anytime.
        </p>
        
        <a 
          ref={ctaRef}
          href="https://tlcpetfood.com/paw-partner/308725/"
          target="_blank"
          rel="sponsored nofollow noopener noreferrer"
          className="btn-primary group inline-flex mb-6"
        >
          Start Autoship
          <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
        </a>

        {/* Icon row */}
        <div ref={iconsRef} className="flex items-center gap-6 pt-4 border-t border-[#2B2B2B]/10">
          <div className="flex items-center gap-2 text-[#6E6A63]">
            <Truck className="w-5 h-5 text-[#4A7C59]" />
            <span className="text-sm font-medium">Free shipping</span>
          </div>
          <div className="flex items-center gap-2 text-[#6E6A63]">
            <Calendar className="w-5 h-5 text-[#D8A94B]" />
            <span className="text-sm font-medium">Flexible schedule</span>
          </div>
        </div>
      </div>
    </section>
  );
}
