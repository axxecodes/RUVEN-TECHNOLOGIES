import React, { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { BrandMark } from './BrandMark';

export type RoutePath = '/' | '/about' | '/services' | '/contact';

interface NavbarProps {
  currentPath: RoutePath;
  onNavigate: (path: RoutePath) => void;
}

const NAV_LINKS: { label: string; path: RoutePath }[] = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Contact', path: '/contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const handleLinkClick = (path: RoutePath) => {
    setMobileOpen(false);
    onNavigate(path);
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/15 bg-[#0B0C0E]/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 md:h-[72px] flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark */}
          <a
            href="#/"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('/');
            }}
            aria-label="RUVEN Home"
            className="whitespace-nowrap shrink-0 focus-visible:outline-offset-4"
          >
            <BrandMark tone="dark" />
          </a>

          {/* Zone 2: Clean Single-Line Navigation Links */}
          <nav aria-label="Main navigation" className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              const active = currentPath === link.path;
              return (
                <a
                  key={link.path}
                  href={`#${link.path}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.path);
                  }}
                  aria-current={active ? 'page' : undefined}
                  className={`text-sm whitespace-nowrap shrink-0 transition-colors duration-150 relative py-1 ${
                    active
                      ? 'text-[#F4F2EC] font-medium'
                      : 'text-[#A5AAB4] hover:text-[#F4F2EC]'
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute left-0 right-0 -bottom-1 h-[2px] bg-[#C8FF2E]" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Single Primary Action + Mobile Drawer Trigger */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#/contact"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('/contact');
              }}
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold bg-[#C8FF2E] text-[#0B0C0E] rounded-sm hover:bg-[#D6FF5C] transition-colors duration-150 whitespace-nowrap shrink-0"
            >
              <span>Let&apos;s Talk</span>
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </a>

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav-drawer"
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className={`md:hidden inline-flex items-center justify-center gap-2 min-h-[44px] px-3.5 rounded-sm text-xs font-semibold transition-colors duration-150 whitespace-nowrap shrink-0 border ${
                mobileOpen
                  ? 'bg-[#C8FF2E] text-[#0B0C0E] border-[#C8FF2E]'
                  : 'bg-[#181B20] text-[#F4F2EC] border-white/35 hover:border-[#C8FF2E]'
              }`}
            >
              {mobileOpen ? (
                <>
                  <X className="w-4 h-4" aria-hidden="true" />
                  <span>Close</span>
                </>
              ) : (
                <>
                  <Menu className="w-4 h-4 text-[#C8FF2E]" aria-hidden="true" />
                  <span>Menu</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer (rendered outside backdrop-blur header for true viewport fixed positioning) */}
      {mobileOpen && (
        <div
          id="mobile-nav-drawer"
          className="md:hidden fixed inset-x-0 top-16 bottom-0 bg-[#0B0C0E] border-t border-white/15 z-50 px-6 py-8 flex flex-col justify-between overflow-y-auto"
        >
          <nav aria-label="Mobile navigation" className="flex flex-col divide-y divide-white/10">
            {NAV_LINKS.map((link, idx) => {
              const active = currentPath === link.path;
              return (
                <a
                  key={link.path}
                  href={`#${link.path}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.path);
                  }}
                  aria-current={active ? 'page' : undefined}
                  className="py-5 flex items-center justify-between text-2xl font-display font-medium tracking-tight"
                >
                  <span className={active ? 'text-[#C8FF2E]' : 'text-[#F4F2EC]'}>
                    {link.label}
                  </span>
                  <span className="font-mono tabular-nums text-xs text-[#A5AAB4]">
                    0{idx + 1}
                  </span>
                </a>
              );
            })}
          </nav>

          <div className="space-y-4 pt-6 border-t border-white/10">
            <a
              href="#/contact"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('/contact');
              }}
              className="w-full inline-flex items-center justify-center gap-2 min-h-[52px] px-6 bg-[#C8FF2E] text-[#0B0C0E] font-semibold text-sm rounded-sm"
            >
              <span>Let&apos;s Talk</span>
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </a>
            <p className="text-xs text-[#A5AAB4] text-center tracking-wide">
              Attract. Convert. Grow.
            </p>
          </div>
        </div>
      )}
    </>
  );
};
