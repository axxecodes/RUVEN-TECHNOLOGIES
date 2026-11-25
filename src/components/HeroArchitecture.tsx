import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { HERO_STAGES } from '../data/content';

export const HeroArchitecture: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [userPaused, setUserPaused] = useState(false);

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced || userPaused) return;

    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HERO_STAGES.length);
    }, 4400);

    return () => window.clearInterval(timer);
  }, [userPaused]);

  const activeStage = HERO_STAGES[activeIndex];

  return (
    <div
      className="border border-white/12 bg-[#121417] rounded-sm overflow-hidden"
      onMouseEnter={() => setUserPaused(true)}
      onMouseLeave={() => setUserPaused(false)}
    >
      {/* Top Architecture Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 border-b border-white/10 bg-[#15181C]">
        <span className="text-xs font-medium tracking-wide text-[#F4F2EC]">
          RUVEN Acquisition Architecture
        </span>
        <span className="text-xs text-[#A5AAB4]">
          Select a stage to inspect how each layer connects
        </span>
      </div>

      {/* 4-Stage Horizontal Rail */}
      <div
        role="tablist"
        aria-label="Customer journey stages"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/10 border-b border-white/10"
      >
        {HERO_STAGES.map((stage, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={stage.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => {
                setActiveIndex(idx);
                setUserPaused(true);
              }}
              className={`group relative text-left p-5 transition-colors duration-200 focus-visible:z-10 ${
                isActive ? 'bg-[#181B20]' : 'bg-transparent hover:bg-white/[0.02]'
              }`}
            >
              <span
                className={`absolute top-0 left-0 right-0 h-[2px] transition-colors duration-200 ${
                  isActive ? 'bg-[#C8FF2E]' : 'bg-transparent'
                }`}
              />

              <div className="flex items-center justify-between gap-2 mb-3">
                <span
                  className={`font-mono tabular-nums text-xs ${
                    isActive ? 'text-[#C8FF2E]' : 'text-[#A5AAB4]'
                  }`}
                >
                  {stage.step}
                </span>
                <span className="text-xs text-[#A5AAB4] truncate">
                  {stage.channel}
                </span>
              </div>

              <div className="flex items-center justify-between gap-2">
                <span
                  className={`text-sm font-semibold tracking-[0.08em] uppercase whitespace-nowrap ${
                    isActive ? 'text-[#F4F2EC]' : 'text-[#A5AAB4] group-hover:text-[#F4F2EC]'
                  }`}
                >
                  {stage.label}
                </span>
                {idx < HERO_STAGES.length - 1 && (
                  <ArrowRight
                    aria-hidden="true"
                    className={`w-3.5 h-3.5 hidden lg:inline-block shrink-0 transition-transform duration-200 ${
                      isActive ? 'text-[#C8FF2E] translate-x-0.5' : 'text-white/25'
                    }`}
                  />
                )}
              </div>

              {/* Animated signal sweep on active stage */}
              <div className="mt-4 h-[1px] w-full bg-white/10 overflow-hidden relative">
                {isActive && (
                  <span className="absolute inset-y-0 left-0 w-1/3 bg-[#C8FF2E] animate-signal-sweep" />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Stage Detail Inspector */}
      <div
        role="tabpanel"
        className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
      >
        <div className="lg:col-span-7 space-y-2.5">
          <div className="flex items-center gap-2 text-xs font-mono tabular-nums text-[#C8FF2E]">
            <span>Stage {activeStage.step}</span>
            <span aria-hidden="true" className="text-white/30">
              /
            </span>
            <span className="tracking-wider uppercase">{activeStage.label}</span>
          </div>
          <h2 className="text-2xl md:text-[1.75rem] font-semibold tracking-tight text-[#F4F2EC] text-balance">
            {activeStage.title}
          </h2>
          <p className="text-sm md:text-base text-[#A5AAB4] leading-relaxed max-w-2xl">
            {activeStage.detail}
          </p>
        </div>

        <div className="lg:col-span-5 lg:border-l lg:border-white/10 lg:pl-8 flex flex-col justify-between gap-4">
          <div className="space-y-1.5">
            <span className="block text-xs text-[#A5AAB4]">
              Stage Handoff
            </span>
            <div className="px-3.5 py-2.5 bg-[#0B0C0E] border border-white/12 rounded-sm font-mono text-xs text-[#F4F2EC]">
              {activeStage.handoff}
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs text-[#A5AAB4]">
            <span>Sequence</span>
            <div className="flex items-center gap-1.5">
              {HERO_STAGES.map((stage, idx) => (
                <button
                  key={stage.id}
                  type="button"
                  aria-label={`Inspect ${stage.label}`}
                  onClick={() => {
                    setActiveIndex(idx);
                    setUserPaused(true);
                  }}
                  className={`h-1.5 rounded-sm transition-all duration-200 ${
                    idx === activeIndex ? 'w-6 bg-[#C8FF2E]' : 'w-2.5 bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
