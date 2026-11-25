import React from 'react';
import { ArrowRight } from 'lucide-react';
import { PHILOSOPHY_PILLARS } from '../data/content';
import { Reveal } from '../components/Reveal';
import { RoutePath } from '../components/Navbar';

interface AboutPageProps {
  onNavigate: (path: RoutePath) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div>
      {/* Header */}
      <section className="bg-[#0B0C0E] text-[#F4F2EC] architectural-grid-dark border-b border-white/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-16 pb-20 md:pt-24 md:pb-28">
          <div className="max-w-4xl space-y-6">
            <p className="text-xs font-medium text-[#C8FF2E]">
              About RUVEN
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-[-0.035em] leading-[1.04] text-balance">
              Built around one simple idea: growth should connect.
            </h1>
            <p className="text-lg md:text-xl text-[#A5AAB4] leading-relaxed max-w-2xl">
              RUVEN is a marketing technology and customer acquisition company focused on closing
              the distance between getting attention and earning revenue.
            </p>
          </div>
        </div>
      </section>

      {/* Narrative: The Gap */}
      <section className="bg-[#F4F2EC] text-[#0B0C0E] border-b border-[#0B0C0E]/12">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <Reveal className="lg:col-span-5 space-y-3">
              <p className="text-xs font-medium text-[#474B54]">
                The Gap We Saw
              </p>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.03em] leading-[1.1] text-balance">
                Good products lose momentum between the ad click and the sale.
              </h2>
            </Reveal>

            <Reveal className="lg:col-span-7 space-y-6 text-base md:text-lg text-[#474B54] leading-relaxed">
              <p>
                Across ecommerce and consumer brands, the same breakdown happens every day. A
                business invests in video ads and paid social campaigns, sparks real interest in
                the feed, and then sends that prospect into a slow or fragmented buying process.
              </p>
              <p>
                Messages sit unanswered in WhatsApp. Questions about delivery or pricing go cold.
                Abandoned carts are left untouched. Meanwhile, the marketing team keeps buying
                more traffic to compensate for a conversion system that isn&apos;t holding water.
              </p>
              <p className="text-[#0B0C0E] font-medium">
                RUVEN exists to unify both sides: sharp, relatable creative that earns attention
                upfront, paired with automated messaging and conversion workflows that turn
                interest into completed orders.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="bg-[#F4F2EC] text-[#0B0C0E] border-b border-[#0B0C0E]/12">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-20 md:py-28">
          <Reveal>
            <div className="space-y-3 max-w-2xl mb-14">
              <p className="text-xs font-medium text-[#474B54]">
                Our Philosophy
              </p>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.03em] leading-[1.1] text-balance">
                Four principles behind every system we build.
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-[#0B0C0E]/15">
            {PHILOSOPHY_PILLARS.map((pillar, idx) => (
              <Reveal key={pillar.index} delayMs={idx * 60}>
                <div className="h-full p-8 md:p-10 border-r border-b border-[#0B0C0E]/15 bg-[#FAF9F5] space-y-4">
                  <span className="inline-block font-mono tabular-nums text-xs text-[#474B54]">
                    {pillar.index}
                  </span>
                  <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-balance">
                    {pillar.title}
                  </h3>
                  <p className="text-sm md:text-base text-[#474B54] leading-relaxed">
                    {pillar.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Long-Term Vision */}
      <section className="bg-[#0B0C0E] text-[#F4F2EC] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <Reveal>
              <div className="h-full p-8 md:p-10 bg-[#121417] border border-white/12 rounded-sm space-y-5">
                <p className="text-xs font-medium text-[#C8FF2E]">
                  Mission
                </p>
                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-balance">
                  Make customer acquisition coherent for ambitious brands.
                </h2>
                <p className="text-base text-[#A5AAB4] leading-relaxed">
                  Starting from Nigeria and serving international markets, our mission is to give
                  modern brands creative advertising and automated sales workflows that work
                  together—turning everyday attention into reliable commercial growth.
                </p>
              </div>
            </Reveal>

            <Reveal delayMs={80}>
              <div className="h-full p-8 md:p-10 bg-[#121417] border border-white/12 rounded-sm space-y-5">
                <p className="text-xs font-medium text-[#C8FF2E]">
                  Long-Term Vision
                </p>
                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-balance">
                  From acquisition partner to global growth technology.
                </h2>
                <p className="text-base text-[#A5AAB4] leading-relaxed">
                  RUVEN is intentionally built beyond the limits of a traditional service agency.
                  Every system we deploy in the field informs our long-term roadmap toward
                  AI-powered marketing solutions, customer acquisition software, and dedicated
                  SaaS automation products for businesses worldwide.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delayMs={120}>
            <div className="mt-12 pt-10 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <p className="text-lg font-medium text-[#F4F2EC]">
                Want to see how these principles apply to your brand?
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => onNavigate('/services')}
                  className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 border border-white/20 text-sm font-medium rounded-sm hover:border-[#C8FF2E]/70 hover:text-[#C8FF2E] transition-colors duration-150 whitespace-nowrap"
                >
                  Explore Services
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('/contact')}
                  className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 bg-[#C8FF2E] text-[#0B0C0E] text-sm font-semibold rounded-sm hover:bg-[#D6FF5C] transition-colors duration-150 whitespace-nowrap"
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
