import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, ShoppingBag, Sparkles, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const amazonProducts = [
  {
    name: 'SpotOn GPS Dog Fence Collar',
    category: 'Safety',
    url: 'https://amzn.to/4atS30l',
    description: 'Wireless GPS boundary for your yard',
    price: '$999.00',
    rating: 4.3,
    reviews: 2847,
    image: 'https://m.media-amazon.com/images/I/71YFq1lGKZL._AC_SL1500_.jpg',
    prime: true
  },
  {
    name: 'Wireless Electric Dog Fence',
    category: 'Training',
    url: 'https://amzn.to/4tfw98H',
    description: 'Remote control training collar system',
    price: '$89.99',
    rating: 4.1,
    reviews: 5231,
    image: 'https://m.media-amazon.com/images/I/71qhX-3xKIL._AC_SL1500_.jpg',
    prime: true
  },
  {
    name: 'Furbo 360° Dog Camera',
    category: 'Tech',
    url: 'https://amzn.to/4kd8ul4',
    description: 'Pet cam with treat toss & barking alerts',
    price: '$199.00',
    rating: 4.4,
    reviews: 8932,
    image: 'https://m.media-amazon.com/images/I/71zjN2j2SqL._AC_SL1500_.jpg',
    prime: true
  },
  {
    name: 'FFIJJ Dog Couch Sofa Bed',
    category: 'Comfort',
    url: 'https://amzn.to/3Mg6Z94',
    description: 'Velvet pet sofa for large/medium dogs',
    price: '$149.99',
    rating: 4.5,
    reviews: 3421,
    image: 'https://m.media-amazon.com/images/I/71vF5KVp0vL._AC_SL1500_.jpg',
    prime: true
  },
  {
    name: 'Pedigree Dentastix',
    category: 'Dental',
    url: 'https://amzn.to/4qVCR1Q',
    description: 'Oral care treats, reduces plaque & tartar',
    price: '$18.99',
    rating: 4.7,
    reviews: 21560,
    image: 'https://m.media-amazon.com/images/I/81G3TrNXs5L._AC_SL1500_.jpg',
    prime: true
  },
  {
    name: 'Omega 3 Fish Oil for Dogs',
    category: 'Health',
    url: 'https://amzn.to/4qf2xFG',
    description: 'Liquid supplement for skin, coat & joints',
    price: '$24.95',
    rating: 4.6,
    reviews: 6789,
    image: 'https://m.media-amazon.com/images/I/71sOzy+i-vL._AC_SL1500_.jpg',
    prime: true
  },
  {
    name: 'Chuckit! Ultra Ball 2-Pack',
    category: 'Toys',
    url: 'https://amzn.to/4qcjDUv',
    description: 'Durable, bouncy balls that float',
    price: '$8.99',
    rating: 4.8,
    reviews: 45210,
    image: 'https://m.media-amazon.com/images/I/71KdRq8Z-LL._AC_SL1500_.jpg',
    prime: true
  },
  {
    name: 'Amazon Basics Dog Poop Bags',
    category: 'Walking',
    url: 'https://amzn.to/3NWN8fJ',
    description: '600 count leakproof bags with dispenser',
    price: '$15.49',
    rating: 4.6,
    reviews: 138920,
    image: 'https://m.media-amazon.com/images/I/71nHjZ2K7eL._AC_SL1500_.jpg',
    prime: true
  },
  {
    name: 'Benebone Dog Chew Toys 4-Pack',
    category: 'Toys',
    url: 'https://amzn.to/4ke3htb',
    description: 'Made in USA for aggressive chewers',
    price: '$34.99',
    rating: 4.5,
    reviews: 15678,
    image: 'https://m.media-amazon.com/images/I/71tMm6bBoKL._AC_SL1500_.jpg',
    prime: true
  },
  {
    name: 'Chris Christensen Big G Slicker Brush',
    category: 'Grooming',
    url: 'https://amzn.to/4r0MXia',
    description: 'THE goldendoodle brush groomers swear by',
    price: '$89.95',
    rating: 4.9,
    reviews: 8234,
    image: 'https://m.media-amazon.com/images/I/71CQ+j0YDPL._AC_SL1500_.jpg',
    prime: true
  },
  {
    name: 'WAHL Bravura Pet Clipper',
    category: 'Grooming',
    url: 'https://amzn.to/4c7sEe7',
    description: 'Pro-grade cordless clipper for home grooming',
    price: '$169.99',
    rating: 4.6,
    reviews: 9234,
    image: 'https://m.media-amazon.com/images/I/718q-QoEbyL._AC_SL1500_.jpg',
    prime: true
  },
];

function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-3 h-3 ${
            i < fullStars
              ? 'fill-[#FFA41C] text-[#FFA41C]'
              : i === fullStars && hasHalfStar
              ? 'fill-[#FFA41C]/50 text-[#FFA41C]'
              : 'fill-gray-200 text-gray-200'
          }`}
        />
      ))}
      <span className="text-xs text-[#007185] ml-1 hover:text-[#C7511F] hover:underline cursor-pointer">
        {rating.toFixed(1)}
      </span>
    </div>
  );
}

export default function MustHaves() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const grid = gridRef.current;

    if (!section || !heading || !grid) return;

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

      // Grid animation
      const items = grid.children;
      gsap.fromTo(items,
        { y: 50, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.06,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: grid,
            start: 'top 75%',
            end: 'top 40%',
            scrub: 0.4,
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="must-haves" className="relative z-[85] bg-[#F6F3EE] py-[10vh] px-[6vw] md:px-[8vw]">
      {/* Heading */}
      <div ref={headingRef} className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
        <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#D8A94B]/20 rounded-full text-sm font-medium text-[#2B2B2B] mb-4">
          <Sparkles className="w-4 h-4 text-[#D8A94B]" />
          Curated Picks
        </span>
        <h2 className="text-[clamp(28px,4vw,52px)] font-bold text-[#2B2B2B] mb-4 leading-tight">
          Goldendoodle Must Haves
        </h2>
        <p className="text-[#6E6A63] text-base md:text-lg leading-relaxed px-2">
          Our favorite products we use and recommend for happy, healthy goldendoodles. 
          <span className="block mt-1 text-sm">(As an Amazon Associate, we earn from qualifying purchases)</span>
        </p>
      </div>

      {/* Products Grid */}
      <div ref={gridRef} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 max-w-6xl mx-auto">
        {amazonProducts.map((product, idx) => (
          <a
            key={idx}
            href={product.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white rounded-2xl md:rounded-[24px] overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-1"
          >
            {/* Product Image */}
            <div className="relative aspect-square bg-[#F7F8F8] overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  // Fallback if image fails to load
                  (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 150 150"%3E%3Crect width="150" height="150" fill="%23f3f3f3"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%23999" font-size="12"%3EProduct Image%3C/text%3E%3C/svg%3E';
                }}
              />
              {/* Prime Badge */}
              {product.prime && (
                <div className="absolute top-2 left-2">
                  <span className="inline-flex items-center px-2 py-0.5 bg-[#00A8E1] text-white text-[10px] font-bold rounded">
                    prime
                  </span>
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="p-3 md:p-4">
              {/* Category Badge */}
              <span className="inline-block px-2 py-0.5 bg-[#F6F3EE] text-[#6E6A63] text-[9px] md:text-[10px] font-medium uppercase tracking-wider rounded mb-2">
                {product.category}
              </span>
              
              {/* Product Name */}
              <h3 className="text-sm md:text-base font-bold text-[#0F1111] mb-1 leading-tight group-hover:text-[#C7511F] transition-colors line-clamp-2">
                {product.name}
              </h3>
              
              {/* Rating */}
              <div className="mb-1.5">
                <StarRating rating={product.rating} />
                <span className="text-[10px] md:text-xs text-[#565959]">({product.reviews.toLocaleString()})</span>
              </div>
              
              {/* Price */}
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-xs text-[#565959]">$</span>
                <span className="text-lg md:text-xl font-bold text-[#0F1111]">{product.price.replace('$', '').split('.')[0]}</span>
                <span className="text-xs text-[#565959]">{product.price.replace('$', '').split('.')[1] || '00'}</span>
              </div>
              
              {/* Shop Button */}
              <div className="flex items-center gap-1.5 text-[#007185] font-medium text-xs md:text-sm group-hover:text-[#C7511F] transition-colors">
                <ShoppingBag className="w-3.5 h-3.5 md:w-4 md:h-4" />
                <span>Shop on Amazon</span>
                <ExternalLink className="w-3 h-3 md:w-3.5 md:h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
