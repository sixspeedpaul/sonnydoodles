import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const comparisonRows = [
  {
    criterion: 'Formula options for puppies and adults',
    tlc: 'Yes',
    orijen: 'Varies by recipe',
    acana: 'Varies by recipe',
  },
  {
    criterion: 'Ingredient detail available before checkout',
    tlc: 'Yes',
    orijen: 'Varies by retailer',
    acana: 'Varies by retailer',
  },
  {
    criterion: 'Autoship or subscription convenience',
    tlc: 'Yes',
    orijen: 'Varies by retailer',
    acana: 'Varies by retailer',
  },
  {
    criterion: 'Direct-to-door delivery options',
    tlc: 'Yes',
    orijen: 'Retailer dependent',
    acana: 'Retailer dependent',
  },
  {
    criterion: 'Price shown on this page',
    tlc: 'Yes',
    orijen: 'No',
    acana: 'No',
  },
];

export default function ComparisonTable() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const tableWrapRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const tableWrap = tableWrapRef.current;

    if (!section || !heading || !tableWrap) return;

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
            start: 'top 82%',
            end: 'top 60%',
            scrub: 0.4,
          },
        }
      );

      gsap.fromTo(
        tableWrap,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: tableWrap,
            start: 'top 85%',
            end: 'top 60%',
            scrub: 0.4,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="comparison"
      className="relative z-[35] bg-[#F6F3EE] py-12 md:py-[11vh] px-5 md:px-[8vw]"
    >
      <div className="max-w-6xl mx-auto">
        <div ref={headingRef} className="text-center max-w-3xl mx-auto mb-8 md:mb-10">
          <span className="inline-block px-4 py-2 bg-[#D8A94B]/20 rounded-full text-sm font-medium text-[#2B2B2B] mb-4">
            Brand Comparison
          </span>
          <h2 className="text-[clamp(28px,4vw,52px)] font-bold text-[#2B2B2B] mb-4 leading-tight">
            TLC vs Orijen vs Acana for Goldendoodles
          </h2>
          <p className="text-[#6E6A63] text-base md:text-lg leading-relaxed">
            Use this quick checklist to compare shopping convenience and product-page transparency.
          </p>
        </div>

        <div
          ref={tableWrapRef}
          className="overflow-x-auto rounded-2xl md:rounded-[28px] shadow-[0_16px_38px_rgba(0,0,0,0.08)] bg-white"
        >
          <table className="w-full min-w-[720px] border-collapse">
            <caption className="sr-only">
              TLC versus Orijen versus Acana comparison table for goldendoodle owners
            </caption>
            <thead>
              <tr className="bg-[#2B2B2B] text-white">
                <th className="text-left px-4 md:px-6 py-4 text-sm md:text-base font-semibold">
                  What to compare
                </th>
                <th className="text-left px-4 md:px-6 py-4 text-sm md:text-base font-semibold">TLC</th>
                <th className="text-left px-4 md:px-6 py-4 text-sm md:text-base font-semibold">Orijen</th>
                <th className="text-left px-4 md:px-6 py-4 text-sm md:text-base font-semibold">Acana</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
                <tr key={row.criterion} className="border-b border-[#2B2B2B]/8 last:border-b-0">
                  <th
                    scope="row"
                    className="text-left align-top px-4 md:px-6 py-4 text-sm md:text-base font-semibold text-[#2B2B2B] bg-[#F9F7F3]"
                  >
                    {row.criterion}
                  </th>
                  <td className="px-4 md:px-6 py-4 text-sm md:text-base text-[#2B2B2B]">{row.tlc}</td>
                  <td className="px-4 md:px-6 py-4 text-sm md:text-base text-[#6E6A63]">{row.orijen}</td>
                  <td className="px-4 md:px-6 py-4 text-sm md:text-base text-[#6E6A63]">{row.acana}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-4 md:mt-5 text-xs md:text-sm text-[#6E6A63]">
          Note: Orijen and Acana details may change by formula and retailer. Always verify current ingredients,
          delivery options, and pricing on the seller page before ordering.
        </p>
      </div>
    </section>
  );
}
