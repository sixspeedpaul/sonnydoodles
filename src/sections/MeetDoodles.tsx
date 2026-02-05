import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function MeetDoodles() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    const card = cardRef.current;
    const headline = headlineRef.current;
    const body = bodyRef.current;
    const cta = ctaRef.current;

    if (!section || !bg || !card || !headline || !body || !cta) return;

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
          { x: '50vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(headline,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.08
        )
        .fromTo(body,
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.14
        )
        .fromTo(cta,
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.18
        )
        // SETTLE (30% - 70%) - hold position
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
    <section ref={sectionRef} id="meet-doodles" className="section-pinned z-20">
      {/* Background Image */}
      <div ref={bgRef} className="absolute inset-0 w-full h-full">
        <img 
          src="images/doodle-lying.jpg" 
          alt="Goldendoodle lying down"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Text Card */}
      <div 
        ref={cardRef}
        className="absolute right-[6vw] top-[14vh] w-[42vw] text-card-glass p-[6%_8%]"
        style={{ opacity: 0 }}
      >
        <h2 
          ref={headlineRef}
          className="text-[clamp(32px,4vw,56px)] font-bold text-[#2B2B2B] mb-6"
        >
          Meet the doodles.
        </h2>
        
        <p 
          ref={bodyRef}
          className="text-[clamp(15px,1.2vw,18px)] text-[#6E6A63] leading-relaxed mb-8"
        >
          We raise happy, healthy goldendoodles with room to run, time to play, 
          and nutrition that keeps their coats soft and their tails wagging.
        </p>
        
        <a 
          ref={ctaRef}
          href="#nutrition"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('nutrition')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="btn-secondary group inline-flex"
        >
          See our story
          <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </section>
  );
}
