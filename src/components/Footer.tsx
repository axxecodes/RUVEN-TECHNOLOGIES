import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { buildWhatsAppUrl, SITE_CONFIG } from '../config/site';
import { BrandMark } from './BrandMark';
import { RoutePath } from './Navbar';

interface FooterProps {
  onNavigate: (path: RoutePath) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0B0C0E] text-[#F4F2EC] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-white/10">
          {/* Brand Summary */}
          <div className="md:col-span-5 space-y-5">
            <BrandMark tone="dark" showTagline />
            <p className="text-sm text-[#A5AAB4] leading-relaxed max-w-sm">
              A marketing technology and customer acquisition company connecting creative
              advertising, paid social, and WhatsApp automation for brands in Nigeria and
              international markets.
            </p>
            <p className="text-xs text-[#A5AAB4]">
              {SITE_CONFIG.contact.locationLabel}
            </p>
          </div>

          {/* Navigation */}
          <div className="md:col-span-2 space-y-4">
            <h3 className="text-xs font-medium text-[#A5AAB4]">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              {(
                [
                  { label: 'Home', path: '/' },
                  { label: 'About', path: '/about' },
                  { label: 'Services', path: '/services' },
                  { label: 'Contact', path: '/contact' },
                ] as const
              ).map((item) => (
                <li key={item.path}>
                  <a
                    href={`#${item.path}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(item.path);
                    }}
                    className="text-[#F4F2EC]/85 hover:text-[#C8FF2E] transition-colors duration-150"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Placeholders */}
          <div className="md:col-span-3 space-y-4">
            <h3 className="text-xs font-medium text-[#A5AAB4]">
              Contact Details
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <span className="block text-xs text-[#A5AAB4]">
                  Email {SITE_CONFIG.contact.isEmailPlaceholder ? '(Placeholder)' : ''}
                </span>
                <a
                  href={`mailto:${SITE_CONFIG.contact.email}`}
                  className="text-[#F4F2EC] hover:text-[#C8FF2E] transition-colors duration-150 break-all"
                >
                  {SITE_CONFIG.contact.email}
                </a>
              </div>
              <div>
                <span className="block text-xs text-[#A5AAB4]">
                  WhatsApp {SITE_CONFIG.contact.isWhatsappPlaceholder ? '(Placeholder)' : ''}
                </span>
                <a
                  href={buildWhatsAppUrl(
                    'Hi RUVEN, I would like to discuss customer acquisition and growth for my business.'
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-[#F4F2EC] hover:text-[#C8FF2E] transition-colors duration-150 inline-flex items-center gap-1"
                >
                  <span>{SITE_CONFIG.contact.whatsappDisplay}</span>
                  <ArrowUpRight className="w-3 h-3 text-[#A5AAB4]" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>

          {/* Social Channels */}
          <div className="md:col-span-2 space-y-4">
            <h3 className="text-xs font-medium text-[#A5AAB4]">
              {SITE_CONFIG.socials.some((s) => s.isPlaceholder)
                ? 'Socials (Placeholders)'
                : 'Socials'}
            </h3>
            <ul className="space-y-2.5 text-sm">
              {SITE_CONFIG.socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target={social.isPlaceholder ? undefined : '_blank'}
                    rel={social.isPlaceholder ? undefined : 'noopener noreferrer'}
                    onClick={(e) => {
                      if (social.isPlaceholder) {
                        e.preventDefault();
                        onNavigate('/contact');
                      }
                    }}
                    title={
                      social.isPlaceholder
                        ? 'Editable placeholder — update in src/config/site.ts'
                        : `${social.label} (${social.handle})`
                    }
                    className="inline-flex items-center gap-1.5 text-[#F4F2EC]/85 hover:text-[#C8FF2E] transition-colors duration-150"
                  >
                    <span>{social.label}</span>
                    <ArrowUpRight className="w-3 h-3 text-[#A5AAB4]" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#A5AAB4]">
          <p>&copy; {currentYear} RUVEN. All rights reserved.</p>
          <p className="text-[#F4F2EC]/80">Attract. Convert. Grow.</p>
        </div>
      </div>
    </footer>
  );
};
