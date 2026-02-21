import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Fish, Beef, FlaskConical, Leaf, X, ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ingredients = [
  { icon: Beef, label: 'Chicken & Lamb' },
  { icon: Fish, label: 'Salmon Oil' },
  { icon: FlaskConical, label: 'Probiotics' },
  { icon: Leaf, label: 'Herbal Pack' },
];

const fullIngredientList = `Lamb Meal, Chicken Meal, Oatmeal, Fresh Chicken, Whole Grain Barley, Whole Brown Rice, Millet, Chicken Fat (Preserved With Mixed Tocopherols, a Natural Source of Vitamin E), Salmon Meal (Preserved with Vitamin E and Rosemary Extract), Green Peas, Whole Eggs, Chicken Liver, Potassium Chloride, Salmon Oil (Source of DHA), Quinoa, Flaxseed, Lecithin, DL Methionine, Chicory Root (Inulin), Vitamin A, Vitamin D3, Vitamin E, Niacin, Vitamin C, Inositol, D-Calcium Pantothenate, Vitamin B1, Riboflavin, Beta-Carotene, Vitamin B6, Folic Acid, Biotin, Vitamin B12, Zinc Proteinate, Iron Proteinate, Copper Proteinate, Manganese Proteinate, Calcium Iodate, Selenium Yeast, Tomato (Natural Source of Vitamin K), Glucosamine, Choline Chloride, Yucca Schidigera Extract, L-carnitine, Mannan-Oligosaccharides, Carrots, Apples, Sweet Potatoes, Blueberries, Cranberries, Green-Lipped Mussels (Natural Source of Chondroitin).`;

export default function IngredientsSpotlight() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const chipsRef = useRef<HTMLDivElement>(null);
  const [showIngredients, setShowIngredients] = useState(false);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    const card = cardRef.current;
    const headline = headlineRef.current;
    const body = bodyRef.current;
    const chips = chipsRef.current;

    if (!section || !bg || !card || !headline || !body || !chips) return;

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

      const chipElements = chips.children;

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
        .fromTo(chipElements,
          { x: 20, opacity: 0, scale: 0.98 },
          { x: 0, opacity: 1, scale: 1, ease: 'none', stagger: 0.04 },
          0.18
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
    <section ref={sectionRef} id="ingredients" className="section-pinned z-40">
      {/* Background Image */}
      <div ref={bgRef} className="absolute inset-0 w-full h-full">
        <img 
          src="/images/doodle-couch.jpg" 
          alt="Goldendoodle relaxing on a couch with healthy coat"
          loading="lazy"
          decoding="async"
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
          What's inside matters.
        </h2>
        
        <p 
          ref={bodyRef}
          className="text-[clamp(15px,1.2vw,18px)] text-[#6E6A63] leading-relaxed mb-8"
        >
          No fillers. No artificial colors. Just whole proteins, omega-rich salmon oil, 
          and a herbal pack for immune support.
        </p>
        
        {/* Ingredient Chips */}
        <div ref={chipsRef} className="flex flex-wrap gap-3 mb-6">
          {ingredients.map((ing, idx) => (
            <div key={idx} className="ingredient-chip">
              <ing.icon className="w-4 h-4" />
              <span className="text-[#2B2B2B]">{ing.label}</span>
            </div>
          ))}
        </div>

        {/* View Full Ingredients Button */}
        <button
          type="button"
          onClick={() => setShowIngredients(true)}
          className="inline-flex items-center gap-2 text-sm font-medium text-[#4A7C59] hover:text-[#D8A94B] transition-colors"
          aria-label="Open full TLC ingredient list"
        >
          <span>View full ingredient list</span>
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      {/* Full Ingredients Modal */}
      {showIngredients && (
        <div 
          className="fixed inset-0 z-[300] flex items-center justify-center p-4"
          onClick={() => setShowIngredients(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          
          {/* Modal Content */}
          <div 
            className="relative bg-white rounded-[28px] p-8 max-w-lg w-full max-h-[80vh] overflow-y-auto shadow-[0_24px_60px_rgba(0,0,0,0.25)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setShowIngredients(false)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#F6F3EE] flex items-center justify-center hover:bg-[#E9E5DE] transition-colors"
              aria-label="Close ingredient list"
            >
              <X className="w-5 h-5 text-[#2B2B2B]" />
            </button>

            {/* Header */}
            <div className="mb-6">
              <span className="inline-block px-3 py-1 bg-[#4A7C59]/20 text-[#4A7C59] text-xs font-bold uppercase tracking-wider rounded-full mb-3">
                Quality Ingredients
              </span>
              <h3 className="text-2xl font-bold text-[#2B2B2B]">
                Complete Ingredient List
              </h3>
            </div>

            {/* Ingredients */}
            <div className="prose prose-sm">
              <p className="text-[#2B2B2B] leading-relaxed text-sm">
                {fullIngredientList}
              </p>
            </div>

            {/* Footer */}
            <div className="mt-6 pt-6 border-t border-[#2B2B2B]/10">
              <p className="text-xs text-[#6E6A63]">
                All ingredients sourced from trusted suppliers. No artificial preservatives, colors, or flavors.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
