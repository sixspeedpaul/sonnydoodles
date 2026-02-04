import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Baby, Utensils, RefreshCw } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const guides = [
  {
    icon: Baby,
    title: 'Puppy portions',
    description: 'Start with the chart on the bag and adjust for activity level and growth.',
    color: '#D8A94B'
  },
  {
    icon: Utensils,
    title: 'Adult meals',
    description: 'Feed twice daily with fresh water. Maintain consistent meal times.',
    color: '#4A7C59'
  },
  {
    icon: RefreshCw,
    title: 'Transitions',
    description: 'Switch gradually over 7–10 days to avoid digestive upset.',
    color: '#D8A94B'
  },
];

export default function FeedingGuide() {
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
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: heading,
            start: 'top 75%',
            end: 'top 55%',
            scrub: 0.4,
          }
        }
      );

      // Cards animation
      const cardElements = cards.children;
      gsap.fromTo(cardElements,
        { y: 40, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cards,
            start: 'top 75%',
            end: 'top 50%',
            scrub: 0.4,
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative z-[70] bg-[#F6F3EE] py-[10vh] px-[8vw]">
      {/* Heading */}
      <div ref={headingRef} className="max-w-[900px] mb-[6vh]">
        <h2 className="text-[clamp(32px,4vw,56px)] font-bold text-[#2B2B2B] mb-4">
          A simple feeding routine.
        </h2>
        <p className="text-[clamp(15px,1.2vw,18px)] text-[#6E6A63] leading-relaxed">
          TLC makes it easy with clear guidelines and consistent quality.
        </p>
      </div>

      {/* Cards */}
      <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {guides.map((guide, idx) => (
          <div 
            key={idx}
            className="bg-white rounded-[28px] p-8 shadow-[0_18px_40px_rgba(0,0,0,0.10)] hover:shadow-[0_24px_50px_rgba(0,0,0,0.14)] transition-shadow duration-300"
          >
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center mb-6"
              style={{ background: `${guide.color}15` }}
            >
              <guide.icon className="w-6 h-6" style={{ color: guide.color }} />
            </div>
            <h3 className="text-xl font-bold text-[#2B2B2B] mb-3">
              {guide.title}
            </h3>
            <p className="text-[#6E6A63] leading-relaxed">
              {guide.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
