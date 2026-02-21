import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Heart, Instagram, MessageCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const INSTAGRAM_PROFILE_URL = 'https://www.instagram.com/sonnydoodlesonfifth/';

const instagramPosts = [
  {
    image: '/images/doodle-grass.jpg',
    alt: 'Goldendoodle playing outside on grass',
    caption: 'Fresh-air zoomies and sunshine.',
    likes: '1.3K',
    comments: '42'
  },
  {
    image: '/images/doodle-couch.jpg',
    alt: 'Goldendoodle sitting comfortably on a couch',
    caption: 'Couch cuddles after a long walk.',
    likes: '987',
    comments: '31'
  },
  {
    image: '/images/doodle-blanket.jpg',
    alt: 'Goldendoodle resting on a cozy blanket',
    caption: 'Soft coat, cozy blanket, zero stress.',
    likes: '1.1K',
    comments: '27'
  },
  {
    image: '/images/doodle-sofa-close.jpg',
    alt: 'Close-up of a goldendoodle on a sofa',
    caption: 'The face that gets extra treats.',
    likes: '1.5K',
    comments: '56'
  },
  {
    image: '/images/dog-eating.jpg',
    alt: 'Goldendoodle eating from a bowl',
    caption: 'Mealtime energy, tail in overdrive.',
    likes: '864',
    comments: '19'
  },
  {
    image: '/images/doodle-blanket-up.jpg',
    alt: 'Goldendoodle peeking up from a blanket',
    caption: 'Weekend mode: blanket burrito.',
    likes: '1.2K',
    comments: '38'
  },
];

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
              key={idx}
              href={INSTAGRAM_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`group rounded-[24px] overflow-hidden border border-[#2B2B2B]/10 bg-white/85 backdrop-blur-sm shadow-[0_14px_30px_rgba(43,43,43,0.08)] hover:shadow-[0_22px_48px_rgba(43,43,43,0.14)] transition-all duration-300 hover:-translate-y-1 ${
                idx % 3 === 0 ? 'sm:translate-y-6' : ''
              }`}
            >
              <div className="flex items-center gap-3 px-3.5 py-3 border-b border-[#2B2B2B]/8">
                <div className="h-8 w-8 rounded-full p-[1px] bg-gradient-to-br from-[#D8A94B] via-[#D8A94B]/80 to-[#4A7C59]">
                  <div className="h-full w-full rounded-full bg-white flex items-center justify-center text-[10px] font-bold text-[#2B2B2B]">
                    SD
                  </div>
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
              />

              <div className="p-3.5">
                <p className="text-[13px] text-[#2B2B2B] leading-relaxed">{post.caption}</p>
                <div className="mt-3 flex items-center gap-4 text-xs text-[#6E6A63]">
                  <span className="inline-flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 text-[#D8A94B]" />
                    {post.likes}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <MessageCircle className="w-3.5 h-3.5 text-[#4A7C59]" />
                    {post.comments}
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
