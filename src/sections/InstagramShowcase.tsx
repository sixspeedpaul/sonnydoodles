import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Heart, Instagram, MessageCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const INSTAGRAM_PROFILE_URL = 'https://www.instagram.com/sonnydoodlesonfifth/';

const instagramPosts = [
  {
    shortcode: 'C_GD47Yur3i',
    image: '/images/instagram/C_GD47Yur3i.jpg',
    alt: 'Instagram post by Sonny Doodles On Fifth',
    caption: 'What SUP?',
    likes: 13,
    comments: 0
  },
  {
    shortcode: 'C2TEZglJ8S0',
    image: '/images/instagram/C2TEZglJ8S0.jpg',
    alt: 'Instagram post by Sonny Doodles On Fifth',
    caption: 'Umm, can you move your stuff off "my" bench?',
    likes: 10,
    comments: 0
  },
  {
    shortcode: 'C1RvJv1OOIJ',
    image: '/images/instagram/C1RvJv1OOIJ.jpg',
    alt: 'Instagram post by Sonny Doodles On Fifth',
    caption: 'Merry Christmas!',
    likes: 20,
    comments: 2
  },
  {
    shortcode: 'CzPx8vqLv5z',
    image: '/images/instagram/CzPx8vqLv5z.jpg',
    alt: 'Instagram post by Sonny Doodles On Fifth',
    caption: 'No place in the world is id rather beach.',
    likes: 10,
    comments: 0
  },
  {
    shortcode: 'CsgfTgGO_Yl',
    image: '/images/instagram/CsgfTgGO_Yl.jpg',
    alt: 'Instagram post by Sonny Doodles On Fifth',
    caption: "Sonny's a father again! Congrats Charlie!",
    likes: 20,
    comments: 2
  },
  {
    shortcode: 'CsSEtY9JOC_',
    image: '/images/instagram/CsSEtY9JOC_.jpg',
    alt: 'Instagram post by Sonny Doodles On Fifth',
    caption: "Look at me, I'm on a boat.",
    likes: 20,
    comments: 1
  },
];

function formatCount(value: number) {
  if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
  return `${value}`;
}

export default function InstagramShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const intro = introRef.current;
    const cards = cardsRef.current;
    const orb = orbRef.current;

    if (!section || !intro || !cards || !orb) return;

    const ctx = gsap.context(() => {
      const introElements = intro.querySelectorAll('[data-intro]');
      gsap.fromTo(
        introElements,
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: intro,
            start: 'top 80%',
            end: 'top 55%',
            scrub: 0.4,
          },
        }
      );

      gsap.fromTo(
        cards.children,
        { y: 36, opacity: 0, rotate: -1.5 },
        {
          y: 0,
          opacity: 1,
          rotate: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cards,
            start: 'top 80%',
            end: 'top 45%',
            scrub: 0.4,
          },
        }
      );

      gsap.fromTo(
        orb,
        { xPercent: -20, yPercent: 10 },
        {
          xPercent: 20,
          yPercent: -10,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.8,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="instagram"
      className="relative z-[82] overflow-hidden bg-[linear-gradient(160deg,#F6F3EE_0%,#EAF4F1_42%,#F6F3EE_100%)] py-[10vh] px-[6vw] md:px-[8vw]"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div
          ref={orbRef}
          className="absolute -top-24 -left-12 h-64 w-64 rounded-full bg-[#D8A94B]/25 blur-3xl"
        />
        <div className="absolute -bottom-20 -right-12 h-72 w-72 rounded-full bg-[#4A7C59]/20 blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto grid lg:grid-cols-[0.92fr_1.08fr] gap-10 lg:gap-12 items-start">
        <div ref={introRef} className="lg:sticky lg:top-24">
          <span
            data-intro
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-[#2B2B2B]/10 text-sm font-semibold text-[#2B2B2B]"
          >
            <Instagram className="w-4 h-4 text-[#D8A94B]" />
            Instagram
          </span>

          <h2
            data-intro
            className="mt-5 text-[clamp(30px,4.6vw,56px)] font-bold text-[#2B2B2B] leading-[0.98]"
          >
            Follow our doodle life in real time.
          </h2>

          <p
            data-intro
            className="mt-4 text-[#6E6A63] text-base md:text-lg leading-relaxed max-w-md"
          >
            Daily moments, mealtime routines, coat-care wins, and puppy personality from
            <span className="font-semibold text-[#2B2B2B]"> @sonnydoodlesonfifth</span>.
          </p>

          <a
            data-intro
            href={INSTAGRAM_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-7 group"
          >
            Follow on Instagram
            <ArrowUpRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
          {instagramPosts.map((post, idx) => (
            <a
              key={post.shortcode}
              href={`https://www.instagram.com/p/${post.shortcode}/`}
              target="_blank"
              rel="noopener noreferrer"
              className={`group rounded-[24px] overflow-hidden border border-[#2B2B2B]/10 bg-white/85 backdrop-blur-sm shadow-[0_14px_30px_rgba(43,43,43,0.08)] hover:shadow-[0_22px_48px_rgba(43,43,43,0.14)] transition-all duration-300 hover:-translate-y-1 ${
                idx % 3 === 0 ? 'sm:translate-y-6' : ''
              }`}
            >
              <div className="flex items-center gap-3 px-3.5 py-3 border-b border-[#2B2B2B]/8">
                <div className="h-8 w-8 rounded-full p-[1px] bg-gradient-to-br from-[#D8A94B] via-[#D8A94B]/80 to-[#4A7C59]">
                  <img
                    src="/images/logo-transparent.png"
                    alt="Sonny Doodles on Fifth logo"
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full rounded-full object-contain bg-white p-[1px]"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#2B2B2B] leading-none">sonnydoodlesonfifth</p>
                  <p className="text-[11px] text-[#6E6A63] mt-1">Ontario, Canada</p>
                </div>
              </div>

              <img
                src={post.image}
                alt={post.alt}
                loading="lazy"
                decoding="async"
                className="w-full aspect-[4/5] object-cover group-hover:scale-[1.02] transition-transform duration-300"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/doodle-grass.jpg';
                }}
              />

              <div className="p-3.5">
                <p className="text-[13px] text-[#2B2B2B] leading-relaxed">{post.caption}</p>
                <div className="mt-3 flex items-center gap-4 text-xs text-[#6E6A63]">
                  <span className="inline-flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 text-[#D8A94B]" />
                    {formatCount(post.likes)}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <MessageCircle className="w-3.5 h-3.5 text-[#4A7C59]" />
                    {formatCount(post.comments)}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
