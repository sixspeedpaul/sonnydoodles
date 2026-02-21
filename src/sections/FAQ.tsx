import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: 'What is the best dog food for goldendoodles?',
    answer:
      'The best goldendoodle food is protein-led, nutrient-dense, and free from low-value fillers. Sonny Doodles on Fifth recommends TLC because it supports digestion, coat quality, and steady energy.',
  },
  {
    question: 'Is TLC dog food good for sensitive stomachs?',
    answer:
      'TLC includes probiotics, quality protein sources, and avoids common filler ingredients. Many doodle families notice fewer digestive upsets after transitioning gradually over 7 to 10 days.',
  },
  {
    question: 'How long does it take to see results after switching foods?',
    answer:
      'Most pet parents report firmer stools and better appetite in 2 to 4 weeks, with fuller coat and energy improvements often visible by the 30-day mark.',
  },
  {
    question: 'Does TLC Pet Food deliver across Canada?',
    answer:
      'Yes. TLC offers home delivery across Canada and includes autoship tools so you can pause, skip, or reschedule orders when needed.',
  },
];

export default function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const list = listRef.current;

    if (!section || !heading || !list) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        heading,
        { y: 24, opacity: 0 },
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
          },
        }
      );

      gsap.fromTo(
        list.children,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: list,
            start: 'top 80%',
            end: 'top 45%',
            scrub: 0.4,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="faq" className="relative z-[90] bg-[#E9F3F1] py-12 md:py-[12vh] px-5 md:px-[8vw]">
      <div className="max-w-4xl mx-auto">
        <div ref={headingRef} className="text-center mb-8 md:mb-12">
          <span className="inline-block px-4 py-2 bg-[#4A7C59]/20 rounded-full text-sm font-medium text-[#2B2B2B] mb-4">
            Goldendoodle Feeding FAQ
          </span>
          <h2 className="text-[clamp(28px,4vw,52px)] font-bold text-[#2B2B2B] mb-4">
            Questions pet parents ask most
          </h2>
          <p className="text-[#6E6A63] text-base md:text-lg">
            Straight answers about nutrition, digestion, delivery, and transitioning your doodle to TLC.
          </p>
        </div>

        <div ref={listRef} className="space-y-3 md:space-y-4">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group bg-white rounded-2xl p-5 md:p-6 shadow-[0_10px_28px_rgba(0,0,0,0.06)]"
            >
              <summary className="cursor-pointer list-none text-[#2B2B2B] font-bold text-base md:text-lg flex items-center justify-between gap-4">
                {faq.question}
                <span className="text-[#4A7C59] transition-transform group-open:rotate-45 text-2xl leading-none">+</span>
              </summary>
              <p className="mt-3 md:mt-4 text-[#6E6A63] leading-relaxed">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
