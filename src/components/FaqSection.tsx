import React, { useState } from 'react';
import { ArrowRight, Plus } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { FAQ_ITEMS } from '../data/content';
import { Reveal } from './Reveal';
import { RoutePath } from './Navbar';

interface FaqSectionProps {
  onNavigate: (path: RoutePath) => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onNavigate }) => {
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0]?.id ?? null);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      aria-labelledby="faq-heading"
      className="bg-[#F4F2EC] text-[#0B0C0E] border-b border-[#0B0C0E]/12"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Editorial Lead */}
          <Reveal className="lg:col-span-5 space-y-5">
            <p className="text-xs font-medium text-[#474B54]">
              06. Questions
            </p>
            <h2
              id="faq-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[-0.03em] leading-[1.08] text-balance"
            >
              Common questions about how we work.
            </h2>
            <p className="text-base text-[#474B54] leading-relaxed">
              Practical answers on how our creative, paid acquisition, and WhatsApp automation
              systems fit together.
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => onNavigate('/contact')}
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#0B0C0E] border-b-2 border-[#0B0C0E] pb-1 hover:border-[#0B0C0E]/50 transition-colors duration-150 whitespace-nowrap"
              >
                <span>Ask a specific question</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </Reveal>

          {/* Right Column: Accessible Accordion */}
          <Reveal delayMs={60} className="lg:col-span-7">
            <div className="border-t border-[#0B0C0E]/15 divide-y divide-[#0B0C0E]/15">
              {FAQ_ITEMS.map((item, idx) => {
                const isOpen = openId === item.id;
                const buttonId = `faq-trigger-${item.id}`;
                const panelId = `faq-panel-${item.id}`;

                return (
                  <div key={item.id} className="py-1">
                    <h3>
                      <button
                        id={buttonId}
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() => toggleItem(item.id)}
                        className="w-full py-5 md:py-6 flex items-start justify-between gap-6 text-left group"
                      >
                        <span className="flex items-baseline gap-4">
                          <span className="font-mono tabular-nums text-xs text-[#474B54] shrink-0">
                            0{idx + 1}
                          </span>
                          <span className="text-base sm:text-lg font-semibold tracking-tight text-[#0B0C0E] group-hover:text-[#0B0C0E]/75 transition-colors duration-150">
                            {item.question}
                          </span>
                        </span>

                        <span
                          aria-hidden="true"
                          className={`mt-0.5 w-7 h-7 rounded-sm border flex items-center justify-center shrink-0 transition-colors duration-150 ${
                            isOpen
                              ? 'bg-[#0B0C0E] border-[#0B0C0E] text-[#C8FF2E]'
                              : 'border-[#0B0C0E]/20 text-[#0B0C0E] group-hover:border-[#0B0C0E]'
                          }`}
                        >
                          <Plus
                            className={`w-4 h-4 transition-transform duration-200 ${
                              isOpen ? 'rotate-45' : 'rotate-0'
                            }`}
                          />
                        </span>
                      </button>
                    </h3>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={panelId}
                          role="region"
                          aria-labelledby={buttonId}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="pl-8 sm:pl-9 pr-10 pb-6 text-sm sm:text-base text-[#474B54] leading-relaxed">
                            {item.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
