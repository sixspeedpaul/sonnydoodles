import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Sparkles, Droplets, Shield, Zap, Leaf } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  {
    icon: Sparkles,
    title: 'Solid, Easy-to-Scoop Poops',
    description: 'Nutrition-dense, filler-free formula means better digestion and consistent, firm stools.',
    color: '#D8A94B'
  },
  {
    icon: Droplets,
    title: 'Shinier, Softer Coat',
    description: 'Omega-rich salmon oil nourishes skin from within for that signature goldendoodle glow.',
    color: '#4A7C59'
  },
  {
    icon: Shield,
    title: 'Stronger Immune System',
    description: 'Probiotics + herbal pack support gut health and natural defenses.',
    color: '#D8A94B'
  },
  {
    icon: Zap,
    title: 'Sustained Energy',
    description: 'Whole proteins provide steady fuel—no sugar crashes or hyperactivity.',
    color: '#4A7C59'
  },
  {
    icon: Leaf,
    title: 'Less Shedding',
    description: 'Balanced nutrition reduces excessive shedding and keeps your home cleaner.',
    color: '#D8A94B'
  },
  {
    icon: Check,
    title: 'Small Batch Freshness',
    description: 'Made in Canada in small batches and delivered fresh to your door.',
    color: '#4A7C59'
  },
];

export default function Benefits() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const cards = cardsRef.current;

    if (!section || !heading || !cards) return;

    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(heading,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: heading,
            start: 'top 80%',
            end: 'top 60%',
            scrub: 0.4,
          }
        }
      );

      // Cards animation with stagger
      const cardElements = cards.children;
      gsap.fromTo(cardElements,
        { y: 50, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cards,
            start: 'top 75%',
            end: 'top 45%',
            scrub: 0.4,
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="benefits" className="relative z-20 bg-[#F6F3EE] py-10 md:py-[12vh] px-5 md:px-[8vw]">
      {/* Heading */}
      <div ref={headingRef} className="text-center max-w-3xl mx-auto mb-10 md:mb-16 px-2">
        <span className="inline-block px-3 md:px-4 py-1.5 md:py-2 bg-[#D8A94B]/20 rounded-full text-xs md:text-sm font-medium text-[#2B2B2B] mb-3 md:mb-4">
          Why Pet Parents Love TLC
        </span>
        <h2 className="text-[clamp(26px,4.5vw,56px)] font-bold text-[#2B2B2B] mb-4 md:mb-6 leading-tight">
          Real food.<br />
          <span className="text-[#4A7C59]">Real results.</span>
        </h2>
        <p className="text-sm md:text-[clamp(16px,1.3vw,20px)] text-[#6E6A63] leading-relaxed">
          No fillers. No artificial colors. No by-products. Just whole proteins, 
          farm-fresh produce, and omega-rich salmon oil that your goldendoodle's 
          body can actually use.
        </p>
      </div>

      {/* Benefits Grid */}
      <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
        {benefits.map((benefit, idx) => (
          <div 
            key={idx}
            className="group bg-white rounded-2xl md:rounded-[28px] p-5 md:p-8 shadow-[0_12px_32px_rgba(0,0,0,0.06)] md:shadow-[0_18px_40px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-1"
          >
            <div 
              className="w-11 h-11 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 transition-transform duration-300 group-hover:scale-110"
              style={{ background: `${benefit.color}15` }}
            >
              <benefit.icon className="w-5 h-5 md:w-7 md:h-7" style={{ color: benefit.color }} />
            </div>
            <h3 className="text-base md:text-xl font-bold text-[#2B2B2B] mb-2 md:mb-3">
              {benefit.title}
            </h3>
            <p className="text-sm md:text-base text-[#6E6A63] leading-relaxed">
              {benefit.description}
            </p>
          </div>
        ))}
      </div>

      {/* Stats Row */}
      <div className="flex flex-wrap justify-center gap-6 md:gap-16 mt-10 md:mt-16 pt-6 md:pt-8 border-t border-[#2B2B2B]/10">
        <div className="text-center min-w-[80px]">
          <p className="text-3xl md:text-5xl font-bold text-[#D8A94B] mb-1">30+</p>
          <p className="text-xs md:text-sm text-[#6E6A63] uppercase tracking-wider">Years of Trust</p>
        </div>
        <div className="text-center min-w-[80px]">
          <p className="text-3xl md:text-5xl font-bold text-[#4A7C59] mb-1">0</p>
          <p className="text-xs md:text-sm text-[#6E6A63] uppercase tracking-wider">Fillers</p>
        </div>
        <div className="text-center min-w-[80px]">
          <p className="text-3xl md:text-5xl font-bold text-[#D8A94B] mb-1">100%</p>
          <p className="text-xs md:text-sm text-[#6E6A63] uppercase tracking-wider">Guarantee</p>
        </div>
      </div>
    </section>
  );
}
