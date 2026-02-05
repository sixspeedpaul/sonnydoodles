import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Leaf, Heart, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function NutritionPhilosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
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

      const bodyLines = body.children;

      // ENTRANCE (0% - 30%)
      scrollTl
        .fromTo(card,
          { x: '-50vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(headline,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.08
        )
        .fromTo(bodyLines,
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, ease: 'none', stagger: 0.03 },
          0.14
        )
        .fromTo(cta,
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.22
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
    <section ref={sectionRef} id="nutrition" className="section-pinned z-30">
      {/* Background Image */}
      <div ref={bgRef} className="absolute inset-0 w-full h-full">
        <img 
          src="images/doodle-blanket.jpg" 
          alt="Goldendoodle on blanket"
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
          Real food.<br />Real difference.
        </h2>
        
        <div ref={bodyRef} className="space-y-4 mb-8">
          <div className="flex items-start gap-3">
            <Leaf className="w-5 h-5 text-[#4A7C59] mt-1 flex-shrink-0" />
            <p className="text-[clamp(15px,1.2vw,18px)] text-[#6E6A63] leading-relaxed">
              TLC is made with whole proteins, farm-fresh produce, and no fillers.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <Heart className="w-5 h-5 text-[#D8A94B] mt-1 flex-shrink-0" />
              <p className="text-[clamp(15px,1.2vw,18px)] text-[#6E6A63] leading-relaxed">
              Your dog gets steady energy and easy digestion with every meal.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-[#4A7C59] mt-1 flex-shrink-0" />
            <p className="text-[clamp(15px,1.2vw,18px)] text-[#6E6A63] leading-relaxed">
              Small batches mean fresher food delivered to your door.
            </p>
          </div>
        </div>
        
        <a 
          ref={ctaRef}
          href="#ingredients"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('ingredients')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="btn-secondary group inline-flex"
        >
          Explore the formula
          <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </section>
  );
}
