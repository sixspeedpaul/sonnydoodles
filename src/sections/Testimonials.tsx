import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: "The poop difference is REAL. Cleanup is so much easier now, and his stools are consistently firm and well-formed.",
    name: "Alex",
    location: "Niagara Falls",
    rating: 5,
    highlight: "Solid poops"
  },
  {
    quote: "Our goldendoodle's coat has never been softer. People stop us on walks to ask what we feed her!",
    name: "Jordan",
    location: "Toronto",
    rating: 5,
    highlight: "Shinier coat"
  },
  {
    quote: "Autoship means I never run out. Game changer for our busy family, and the free delivery saves us money.",
    name: "Sam",
    location: "Ottawa",
    rating: 5,
    highlight: "Convenient"
  },
  {
    quote: "He actually gets excited at mealtime now. No more turning his nose up at kibble—he devours every bite!",
    name: "Riley",
    location: "Burlington",
    rating: 5,
    highlight: "Loves the taste"
  },
];

export default function Testimonials() {
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

      // Cards animation with slight rotation
      const cardElements = cards.children;
      gsap.fromTo(cardElements,
        { y: 36, opacity: 0, rotate: -1 },
        {
          y: 0,
          opacity: 1,
          rotate: 0,
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
    <section ref={sectionRef} id="testimonials" className="relative z-[80] bg-[#F6F3EE] py-[10vh] px-[8vw]">
      {/* Heading */}
      <div ref={headingRef} className="text-center max-w-2xl mx-auto mb-12">
        <span className="inline-block px-4 py-2 bg-[#4A7C59]/20 rounded-full text-sm font-medium text-[#2B2B2B] mb-4">
          Real Reviews from Canadian Pet Parents
        </span>
        <h2 className="text-[clamp(32px,4vw,56px)] font-bold text-[#2B2B2B] mb-4">
          What our goldendoodle pawrents say...
        </h2>
        <p className="text-[#6E6A63]">
          Join thousands of happy goldendoodle families across Canada who've made the switch to TLC.
        </p>
      </div>

      {/* Testimonial Cards */}
      <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {testimonials.map((testimonial, idx) => (
          <div 
            key={idx}
            className="bg-white rounded-[28px] p-8 shadow-[0_18px_40px_rgba(0,0,0,0.08)] hover:shadow-[0_24px_50px_rgba(0,0,0,0.12)] transition-shadow duration-300"
          >
            {/* Highlight Badge */}
            <span className="inline-block px-3 py-1 bg-[#D8A94B]/20 text-[#D8A94B] text-xs font-bold uppercase tracking-wider rounded-full mb-4">
              {testimonial.highlight}
            </span>
            
            {/* Quote icon */}
            <Quote className="w-8 h-8 text-[#D8A94B] mb-4 opacity-50" />
            
            {/* Stars */}
            <div className="flex gap-1 mb-4">
              {Array.from({ length: testimonial.rating }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#D8A94B] text-[#D8A94B]" />
              ))}
            </div>
            
            {/* Quote */}
            <blockquote className="text-[#2B2B2B] leading-relaxed mb-6 text-lg">
              "{testimonial.quote}"
            </blockquote>
            
            {/* Author */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D8A94B] to-[#4A7C59] flex items-center justify-center text-white font-bold text-sm">
                {testimonial.name[0]}
              </div>
              <div>
                <p className="font-semibold text-[#2B2B2B]">{testimonial.name}</p>
                <p className="text-sm text-[#6E6A63]">{testimonial.location}, ON</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
