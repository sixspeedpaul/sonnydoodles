import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Benefits', href: '#benefits' },
  { label: 'Ingredients', href: '#ingredients' },
  { label: 'Products', href: '#products' },
  { label: 'Delivery', href: '#delivery' },
  { label: 'Must Haves', href: '#must-haves' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-[200] transition-all duration-500 ${
          isScrolled 
            ? 'bg-[#F6F3EE]/90 backdrop-blur-md shadow-sm' 
            : 'bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between px-3 md:px-[4vw] py-2.5 md:py-3">
          {/* Logo */}
          <a 
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 md:gap-3"
          >
            <img 
              src="/images/logo.png" 
              alt="Sonny Doodles on Fifth"
              className="h-10 md:h-12 w-auto"
            />
            <span className={`font-bold text-sm md:text-lg transition-colors hidden sm:block ${isScrolled ? 'text-[#2B2B2B]' : 'text-[#2B2B2B]'}`}>
              Sonny Doodles on Fifth
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-sm font-medium transition-colors hover:text-[#4A7C59] ${
                  isScrolled ? 'text-[#2B2B2B]' : 'text-[#2B2B2B]'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <a
              href="https://tlcpetfood.com/paw-partner/308725/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 md:px-5 py-2 md:py-2.5 rounded-full text-sm font-semibold border-2 border-[#D8A94B] text-[#2B2B2B] hover:bg-[#D8A94B] transition-all duration-300"
            >
              Order TLC
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 md:w-6 md:h-6 text-[#2B2B2B]" />
            ) : (
              <Menu className="w-5 h-5 md:w-6 md:h-6 text-[#2B2B2B]" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-[199] bg-[#F6F3EE] transition-transform duration-500 lg:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-6 md:gap-8 px-6">
          <img 
            src="/images/logo.png" 
            alt="Sonny Doodles on Fifth"
            className="h-16 md:h-24 w-auto mb-2"
          />
          <p className="font-bold text-lg md:text-xl text-[#2B2B2B]">Sonny Doodles on Fifth</p>
          <div className="w-full max-w-xs space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="block text-center text-lg md:text-2xl font-bold text-[#2B2B2B] hover:text-[#4A7C59] transition-colors py-2"
              >
                {link.label}
              </a>
            ))}
          </div>
          <a
            href="https://tlcpetfood.com/paw-partner/308725/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-4"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Order TLC
          </a>
        </div>
      </div>
    </>
  );
}
