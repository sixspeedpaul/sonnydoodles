import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Check, Truck, Star, Package } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    name: 'Whole Life Dog Food',
    subtitle: 'All Life Stages',
    price: '$74.99',
    priceNote: 'per 15kg bag',
    description: 'Complete nutrition for puppies, adults, and seniors.',
    features: [
      'Chicken & Lamb protein blend',
      'Omega-rich salmon oil',
      'Probiotics for digestion',
      'Herbal immune support',
    ],
    popular: true,
    image: 'images/puppy-feature.jpg'
  },
  {
    name: 'Whole Life Puppy Food',
    subtitle: 'First 12 Months',
    price: '$79.99',
    priceNote: 'per 15kg bag',
    description: 'Higher protein and DHA for growing puppies.',
    features: [
      'Enhanced DHA for brain development',
      'Higher protein content',
      'Calcium for strong bones',
      'Smaller kibble size',
    ],
    popular: false,
    image: 'images/dog-eating.jpg'
  },
  {
    name: 'Grain-Free Formula',
    subtitle: 'Sensitive Stomachs',
    price: '$84.99',
    priceNote: 'per 15kg bag',
    description: 'Gentle on sensitive digestive systems.',
    features: [
      'No corn, wheat, or soy',
      'Single protein options',
      'Limited ingredients',
      'Hypoallergenic recipe',
    ],
    popular: false,
    image: 'images/doodle-blanket.jpg'
  },
];

export default function Products() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const cards = cardsRef.current;
    const cta = ctaRef.current;

    if (!section || !heading || !cards || !cta) return;

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

      // Cards animation
      const cardElements = cards.children;
      gsap.fromTo(cardElements,
        { y: 60, opacity: 0, scale: 0.95 },
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
            end: 'top 40%',
            scrub: 0.4,
          }
        }
      );

      // CTA animation
      gsap.fromTo(cta,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cta,
            start: 'top 85%',
            end: 'top 65%',
            scrub: 0.4,
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="products" className="relative z-30 bg-[#E9F3F1] py-[12vh] px-[8vw]">
      {/* Heading */}
      <div ref={headingRef} className="text-center max-w-3xl mx-auto mb-12">
        <span className="inline-block px-4 py-2 bg-[#4A7C59]/20 rounded-full text-sm font-medium text-[#2B2B2B] mb-4">
          Simple, Transparent Pricing
        </span>
        <h2 className="text-[clamp(32px,4.5vw,56px)] font-bold text-[#2B2B2B] mb-6 leading-tight">
          Choose the perfect<br />
          <span className="text-[#D8A94B]">formula.</span>
        </h2>
        <p className="text-[clamp(16px,1.3vw,20px)] text-[#6E6A63] leading-relaxed">
          All formulas include free delivery across North America. 
          Save 5% with Autoship and never run out.
        </p>
      </div>

      {/* Products Grid */}
      <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
        {products.map((product, idx) => (
          <div 
            key={idx}
            className={`relative bg-white rounded-[28px] overflow-hidden shadow-[0_18px_40px_rgba(0,0,0,0.08)] hover:shadow-[0_24px_50px_rgba(0,0,0,0.14)] transition-all duration-300 hover:-translate-y-1 ${
              product.popular ? 'ring-2 ring-[#D8A94B]' : ''
            }`}
          >
            {/* Popular Badge */}
            {product.popular && (
              <div className="absolute top-4 right-4 z-10">
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#D8A94B] text-white text-xs font-bold uppercase tracking-wider rounded-full">
                  <Star className="w-3 h-3 fill-white" />
                  Most Popular
                </span>
              </div>
            )}

            {/* Product Image */}
            <div className="h-48 overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>

            {/* Content */}
            <div className="p-6">
              <p className="text-xs font-medium text-[#6E6A63] uppercase tracking-wider mb-1">
                {product.subtitle}
              </p>
              <h3 className="text-xl font-bold text-[#2B2B2B] mb-2">
                {product.name}
              </h3>
              <p className="text-sm text-[#6E6A63] mb-4">
                {product.description}
              </p>

              {/* Price */}
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-3xl font-bold text-[#2B2B2B]">{product.price}</span>
                <span className="text-sm text-[#6E6A63]">{product.priceNote}</span>
              </div>

              {/* Features */}
              <ul className="space-y-2 mb-6">
                {product.features.map((feature, fidx) => (
                  <li key={fidx} className="flex items-start gap-2 text-sm text-[#6E6A63]">
                    <Check className="w-4 h-4 text-[#4A7C59] mt-0.5 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <a
                href="https://tlcpetfood.com/paw-partner/308725/"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 ${
                  product.popular 
                    ? 'bg-[#D8A94B] text-[#2B2B2B] hover:bg-[#c99a3d]' 
                    : 'bg-[#2B2B2B] text-white hover:bg-[#3d3d3d]'
                }`}
              >
                <Package className="w-4 h-4" />
                Order Now
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div ref={ctaRef} className="text-center">
        <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-white rounded-2xl p-6 shadow-[0_18px_40px_rgba(0,0,0,0.08)]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#D8A94B]/20 flex items-center justify-center">
              <Truck className="w-6 h-6 text-[#D8A94B]" />
            </div>
            <div className="text-left">
              <p className="font-bold text-[#2B2B2B]">Free Delivery</p>
              <p className="text-sm text-[#6E6A63]">Across North America</p>
            </div>
          </div>
          <div className="hidden sm:block w-px h-12 bg-[#2B2B2B]/10" />
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#4A7C59]/20 flex items-center justify-center">
              <Star className="w-6 h-6 text-[#4A7C59]" />
            </div>
            <div className="text-left">
              <p className="font-bold text-[#2B2B2B]">Save 5% with Autoship</p>
              <p className="text-sm text-[#6E6A63]">Cancel anytime</p>
            </div>
          </div>
          <div className="hidden sm:block w-px h-12 bg-[#2B2B2B]/10" />
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#D8A94B]/20 flex items-center justify-center">
              <span className="text-lg font-bold text-[#D8A94B]">$5</span>
            </div>
            <div className="text-left">
              <p className="font-bold text-[#2B2B2B]">Referral Discount</p>
              <p className="text-sm text-[#6E6A63]">On your first order</p>
            </div>
          </div>
          <a
            href="https://tlcpetfood.com/paw-partner/308725/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary ml-0 sm:ml-4"
          >
            Start Shopping
            <ArrowRight className="w-4 h-4 ml-2" />
          </a>
        </div>
      </div>
    </section>
  );
}
