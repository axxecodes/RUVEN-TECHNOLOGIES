import React from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import {
  APPROACH_PILLARS,
  JOURNEY_CHAIN,
  PROCESS_STEPS,
  SERVICES,
  ServiceId,
  TARGET_BUSINESSES,
} from '../data/content';
import { HeroArchitecture } from '../components/HeroArchitecture';
import { Reveal } from '../components/Reveal';
import { ServiceVisual } from '../components/ServiceVisuals';
import { RoutePath } from '../components/Navbar';

interface HomePageProps {
  onNavigate: (path: RoutePath, serviceFocus?: ServiceId) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div>
      {/* 1. HERO SECTION */}
      <section className="bg-[#0B0C0E] text-[#F4F2EC] architectural-grid-dark border-b border-white/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-16 pb-20 md:pt-24 md:pb-28 space-y-14 md:space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
            <div className="lg:col-span-8 space-y-6">
              <p className="text-xs font-medium tracking-wide text-[#A5AAB4]">
                Marketing Technology <span aria-hidden="true">·</span> Customer Acquisition{' '}
                <span aria-hidden="true">·</span> Nigeria &amp; Global
              </p>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-semibold tracking-[-0.035em] leading-[1.03] text-[#F4F2EC] text-balance">
                Attention is easy.
                <br />
                <span className="text-[#C8FF2E]">Turning it into revenue</span> is the real work.
              </h1>
            </div>

            <div className="lg:col-span-4 space-y-7">
              <p className="text-base md:text-[1.0625rem] text-[#A5AAB4] leading-relaxed">
                We bring creative advertising, customer acquisition, and intelligent automation
                together to help businesses grow.
              </p>

              <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => onNavigate('/contact')}
                  className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 bg-[#C8FF2E] text-[#0B0C0E] font-semibold text-sm rounded-sm hover:bg-[#D6FF5C] transition-colors duration-150 whitespace-nowrap shrink-0"
                >
                  <span>Let&apos;s Talk Growth</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('/services')}
                  className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 border border-white/20 text-[#F4F2EC] font-medium text-sm rounded-sm hover:border-[#C8FF2E]/70 hover:text-[#C8FF2E] transition-colors duration-150 whitespace-nowrap shrink-0"
                >
                  <span>Explore What We Do</span>
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Customer Journey Architecture */}
          <HeroArchitecture />
        </div>
      </section>

      {/* 2. THE RUVEN APPROACH */}
      <section className="bg-[#F4F2EC] text-[#0B0C0E] border-b border-[#0B0C0E]/12">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-20 md:py-28">
          <Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-14 md:mb-16">
              <div className="lg:col-span-7 space-y-3">
                <p className="text-xs font-medium text-[#474B54]">
                  01. The RUVEN Approach
                </p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[-0.03em] leading-[1.08] text-balance">
                  Growth doesn&apos;t happen in isolation.
                </h2>
              </div>
              <div className="lg:col-span-5 flex items-end">
                <p className="text-base md:text-lg text-[#474B54] leading-relaxed">
                  Most businesses separate making ads, running media, and talking to customers.
                  When those pieces don&apos;t speak to each other, ad spend leaks out before a
                  sale ever happens.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-[#0B0C0E]/15">
            {APPROACH_PILLARS.map((pillar, idx) => (
              <Reveal key={pillar.name} delayMs={idx * 65}>
                <div className="h-full p-7 md:p-9 border-r border-b border-[#0B0C0E]/15 bg-[#FAF9F5] flex flex-col justify-between gap-8">
                  <div className="space-y-4">
                    <div className="flex items-baseline justify-between border-b border-[#0B0C0E]/10 pb-3">
                      <span className="font-mono tabular-nums text-xs text-[#474B54]">
                        {pillar.step}
                      </span>
                      <span className="text-xs font-semibold tracking-[0.08em] uppercase text-[#0B0C0E]">
                        {pillar.name}
                      </span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-balance">
                      {pillar.title}
                    </h3>
                    <p className="text-sm md:text-base text-[#474B54] leading-relaxed">
                      {pillar.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SERVICES PREVIEW (Asymmetric Bento Grid) */}
      <section className="bg-[#F4F2EC] text-[#0B0C0E] architectural-grid-light border-b border-[#0B0C0E]/12">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-20 md:py-28">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
              <div className="space-y-3 max-w-2xl">
                <p className="text-xs font-medium text-[#474B54]">
                  02. Capabilities
                </p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[-0.03em] leading-[1.08] text-balance">
                  Four connected disciplines built to acquire and convert customers.
                </h2>
              </div>

              <button
                type="button"
                onClick={() => onNavigate('/services')}
                className="inline-flex items-center gap-2 text-sm font-semibold border-b-2 border-[#0B0C0E] pb-1 hover:border-[#0B0C0E]/50 transition-colors duration-150 self-start md:self-auto whitespace-nowrap shrink-0"
              >
                <span>View Full Service Breakdown</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            {SERVICES.map((service, idx) => {
              const spanClass =
                idx === 0 || idx === 3 ? 'lg:col-span-7' : 'lg:col-span-5';
              return (
                <Reveal key={service.id} delayMs={idx * 55} className={spanClass}>
                  <article className="h-full bg-[#FAF9F5] border border-[#0B0C0E]/15 rounded-sm p-6 md:p-8 flex flex-col justify-between gap-6 hover:border-[#0B0C0E]/40 transition-colors duration-150">
                    <div className="space-y-5">
                      <div className="flex items-center justify-between text-xs text-[#474B54]">
                        <span className="font-mono tabular-nums">{service.index}</span>
                        <span>{service.title}</span>
                      </div>

                      <ServiceVisual id={service.id} compact />

                      <div className="space-y-2.5">
                        <h3 className="text-2xl font-semibold tracking-tight text-balance">
                          {service.shortTitle}
                        </h3>
                        <p className="text-sm md:text-base text-[#474B54] leading-relaxed">
                          {service.summary}
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[#0B0C0E]/10 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => onNavigate('/services', service.id)}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-[#0B0C0E] group"
                      >
                        <span>Learn more</span>
                        <ArrowRight
                          aria-hidden="true"
                          className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-1"
                        />
                      </button>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. MORE THAN GETTING ATTENTION */}
      <section className="bg-[#0B0C0E] text-[#F4F2EC] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <Reveal className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
              <p className="text-xs font-medium text-[#C8FF2E]">
                03. Post-Click Reality
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[-0.03em] leading-[1.06] text-balance">
                More than getting attention.
              </h2>
              <p className="text-base text-[#A5AAB4] leading-relaxed">
                Getting someone to stop scrolling is only the opening move. What happens in the
                ten seconds after they click an ad or send a message usually decides whether you
                make a sale or subsidise your competitor.
              </p>
              <p className="text-base text-[#A5AAB4] leading-relaxed">
                RUVEN builds the bridge between first impression and completed order—combining
                structured ad journeys with automated WhatsApp conversations so interested buyers
                never wait in line.
              </p>
            </Reveal>

            <div className="lg:col-span-7 space-y-4">
              {JOURNEY_CHAIN.map((item, idx) => (
                <Reveal key={item.phase} delayMs={idx * 60}>
                  <div className="p-6 md:p-8 bg-[#121417] border border-white/12 rounded-sm flex flex-col sm:flex-row gap-4 sm:gap-8 items-start">
                    <span className="font-mono tabular-nums text-xs text-[#C8FF2E] shrink-0 pt-1">
                      {item.phase}
                    </span>
                    <div className="space-y-2">
                      <h3 className="text-lg md:text-xl font-semibold tracking-tight text-[#F4F2EC]">
                        {item.title}
                      </h3>
                      <p className="text-sm md:text-base text-[#A5AAB4] leading-relaxed">
                        {item.note}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. PROCESS SECTION */}
      <section className="bg-[#0B0C0E] text-[#F4F2EC] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-20 md:py-28">
          <Reveal>
            <div className="max-w-3xl space-y-3 mb-14">
              <p className="text-xs font-medium text-[#A5AAB4]">
                04. How We Work
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[-0.03em] leading-[1.08] text-balance">
                A disciplined loop from first audit to live optimisation.
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-5 border-t border-l border-white/12">
            {PROCESS_STEPS.map((step, idx) => (
              <Reveal key={step.name} delayMs={idx * 50}>
                <div className="h-full p-6 border-r border-b border-white/12 bg-[#121417]/60 flex flex-col justify-between gap-8">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-mono tabular-nums text-xs text-[#C8FF2E]">
                        {step.code}
                      </span>
                      {idx < PROCESS_STEPS.length - 1 && (
                        <ArrowRight
                          aria-hidden="true"
                          className="w-3.5 h-3.5 text-white/30 hidden md:block"
                        />
                      )}
                    </div>
                    <h3 className="font-mono text-sm tracking-[0.12em] font-semibold text-[#F4F2EC]">
                      {step.name}
                    </h3>
                    <p className="text-sm text-[#A5AAB4] leading-relaxed">{step.summary}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6. WHO WE WORK WITH */}
      <section className="bg-[#F4F2EC] text-[#0B0C0E] border-b border-[#0B0C0E]/12">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-20 md:py-28">
          <Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-14">
              <div className="lg:col-span-6 space-y-3">
                <p className="text-xs font-medium text-[#474B54]">
                  05. Built For
                </p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[-0.03em] leading-[1.08] text-balance">
                  Businesses where every customer conversation counts.
                </h2>
              </div>
              <div className="lg:col-span-6 flex items-end">
                <p className="text-base md:text-lg text-[#474B54] leading-relaxed">
                  We partner with consumer-facing businesses in Nigeria and international markets
                  that want their advertising and sales workflows operating as one coherent engine.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TARGET_BUSINESSES.map((item, idx) => (
              <Reveal key={item.label} delayMs={idx * 55}>
                <div className="h-full p-6 bg-[#FAF9F5] border border-[#0B0C0E]/15 rounded-sm space-y-3">
                  <span className="font-mono tabular-nums text-xs text-[#474B54]">
                    0{idx + 1}
                  </span>
                  <h3 className="text-lg font-semibold tracking-tight">{item.label}</h3>
                  <p className="text-sm text-[#474B54] leading-relaxed">{item.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CLOSING CTA */}
      <section className="bg-[#0B0C0E] text-[#F4F2EC] architectural-grid-dark">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-20 md:py-28">
          <Reveal>
            <div className="p-8 sm:p-12 md:p-16 border border-white/15 bg-[#121417] rounded-sm flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="space-y-4 max-w-2xl">
                <p className="text-xs font-medium text-[#C8FF2E]">
                  Next Step
                </p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[-0.03em] leading-[1.06] text-balance">
                  Ready to make growth work harder?
                </h2>
                <p className="text-base text-[#A5AAB4] leading-relaxed">
                  Tell us what you sell, where customers currently drop off, and what you want to
                  build next.
                </p>
              </div>

              <div className="shrink-0">
                <button
                  type="button"
                  onClick={() => onNavigate('/contact')}
                  className="inline-flex items-center justify-center gap-2.5 min-h-[54px] px-7 bg-[#C8FF2E] text-[#0B0C0E] font-semibold text-sm rounded-sm hover:bg-[#D6FF5C] transition-colors duration-150 whitespace-nowrap"
                >
                  <span>Start a Conversation</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
};
