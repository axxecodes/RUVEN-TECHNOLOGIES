import React, { useEffect } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { SERVICES, ServiceId } from '../data/content';
import { Reveal } from '../components/Reveal';
import { ServiceVisual } from '../components/ServiceVisuals';
import { RoutePath } from '../components/Navbar';

interface ServicesPageProps {
  focusedService?: ServiceId | null;
  onNavigate: (path: RoutePath, serviceFocus?: ServiceId) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  focusedService,
  onNavigate,
}) => {
  useEffect(() => {
    if (!focusedService) return;
    const el = document.getElementById(`service-${focusedService}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [focusedService]);

  return (
    <div>
      {/* Header */}
      <section className="bg-[#0B0C0E] text-[#F4F2EC] architectural-grid-dark border-b border-white/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-16 pb-20 md:pt-24 md:pb-24 space-y-10">
          <div className="max-w-3xl space-y-6">
            <p className="text-xs font-medium text-[#C8FF2E]">
              Services
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-[-0.035em] leading-[1.04] text-balance">
              Systems designed to attract attention and convert it into revenue.
            </h1>
            <p className="text-lg text-[#A5AAB4] leading-relaxed">
              Engage RUVEN for a single capability or connect all four into one continuous
              acquisition engine.
            </p>
          </div>

          {/* Quick Jump Index */}
          <div className="flex flex-wrap gap-2.5 pt-2">
            {SERVICES.map((service) => (
              <button
                key={service.id}
                type="button"
                onClick={() => {
                  document
                    .getElementById(`service-${service.id}`)
                    ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="inline-flex items-center gap-2 px-3.5 py-2 border border-white/15 bg-[#121417] hover:border-[#C8FF2E] rounded-sm text-xs text-[#F4F2EC] transition-colors duration-150 whitespace-nowrap shrink-0"
              >
                <span className="font-mono tabular-nums text-[#C8FF2E]">{service.index}</span>
                <span>{service.shortTitle}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Service Blocks */}
      <section className="bg-[#F4F2EC] text-[#0B0C0E] divide-y divide-[#0B0C0E]/15">
        {SERVICES.map((service, idx) => (
          <div
            key={service.id}
            id={`service-${service.id}`}
            className="scroll-mt-20 max-w-7xl mx-auto px-5 sm:px-8 py-20 md:py-24"
          >
            <Reveal delayMs={idx * 40}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
                {/* Left Column: Index, Visual, Problem Solved */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="flex items-center gap-3 text-xs text-[#474B54]">
                    <span className="font-mono tabular-nums text-[#0B0C0E] font-semibold">
                      {service.index}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{service.title}</span>
                  </div>

                  <ServiceVisual id={service.id} />

                  <div className="p-5 bg-[#FAF9F5] border border-[#0B0C0E]/15 rounded-sm space-y-2">
                    <span className="block text-xs font-medium text-[#474B54]">
                      Business Problem Solved
                    </span>
                    <p className="text-sm text-[#0B0C0E] leading-relaxed">
                      {service.problemSolved}
                    </p>
                  </div>
                </div>

                {/* Right Column: Headline, Description, Deliverables, CTA */}
                <div className="lg:col-span-7 space-y-8">
                  <div className="space-y-4">
                    <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-0.03em] leading-[1.1] text-balance">
                      {service.headline}
                    </h2>
                    <p className="text-base md:text-lg text-[#474B54] leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <div className="space-y-4 pt-6 border-t border-[#0B0C0E]/12">
                    <h3 className="text-xs font-medium text-[#474B54]">
                      What This Includes
                    </h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {service.includes.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 p-3.5 bg-[#FAF9F5] border border-[#0B0C0E]/12 rounded-sm"
                        >
                          <span className="mt-0.5 w-5 h-5 rounded-sm bg-[#0B0C0E] text-[#C8FF2E] inline-flex items-center justify-center shrink-0">
                            <Check className="w-3.5 h-3.5" aria-hidden="true" />
                          </span>
                          <span className="text-sm text-[#0B0C0E] leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => onNavigate('/contact', service.id)}
                      className="inline-flex items-center justify-center gap-2.5 min-h-[48px] px-6 bg-[#0B0C0E] text-[#F4F2EC] hover:bg-[#181B20] font-semibold text-sm rounded-sm transition-colors duration-150 group whitespace-nowrap"
                    >
                      <span>{service.ctaLabel}</span>
                      <ArrowRight
                        aria-hidden="true"
                        className="w-4 h-4 text-[#C8FF2E] transition-transform duration-150 group-hover:translate-x-1"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        ))}
      </section>

      {/* Bottom Integration Strip */}
      <section className="bg-[#0B0C0E] text-[#F4F2EC] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 md:py-20 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-balance">
              Not sure which piece needs attention first?
            </h2>
            <p className="text-sm md:text-base text-[#A5AAB4]">
              Share your current store, ad setup, or sales flow and we will point out the highest
              leverage starting point.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('/contact')}
            className="inline-flex items-center justify-center gap-2 min-h-[50px] px-6 bg-[#C8FF2E] text-[#0B0C0E] text-sm font-semibold rounded-sm hover:bg-[#D6FF5C] transition-colors duration-150 shrink-0 whitespace-nowrap"
          >
            <span>Let&apos;s Talk Growth</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </section>
    </div>
  );
};
