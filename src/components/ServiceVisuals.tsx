import React from 'react';
import { ServiceId } from '../data/content';

interface ServiceVisualProps {
  id: ServiceId;
  compact?: boolean;
}

/**
 * Architectural compositions for each RUVEN capability.
 * Designed with clean vector geometry and structured copy instead of generic stock photos.
 */
export const ServiceVisual: React.FC<ServiceVisualProps> = ({ id, compact = false }) => {
  const heightClass = compact ? 'h-48' : 'h-64';

  if (id === 'ugc-creative') {
    return (
      <div
        aria-hidden="true"
        className={`${heightClass} w-full bg-[#0B0C0E] border border-[#0B0C0E]/15 rounded-sm p-4 sm:p-5 flex flex-col justify-between overflow-hidden`}
      >
        <div className="flex items-center justify-between text-[11px] font-mono tabular-nums text-[#A5AAB4]">
          <span>9:16 Vertical Cut</span>
          <span className="text-[#C8FF2E]">Modular Hooks</span>
        </div>

        <div className="grid grid-cols-3 gap-2.5 my-auto">
          {[
            { tag: '00–03s', label: 'Hook', active: true },
            { tag: '03–14s', label: 'Proof', active: false },
            { tag: '14–22s', label: 'Offer', active: false },
          ].map((frame) => (
            <div
              key={frame.label}
              className={`h-24 sm:h-28 rounded-sm border p-2.5 flex flex-col justify-between ${
                frame.active
                  ? 'border-[#C8FF2E]/70 bg-[#181B20]'
                  : 'border-white/12 bg-[#121417]'
              }`}
            >
              <span
                className={`font-mono tabular-nums text-[10px] ${
                  frame.active ? 'text-[#C8FF2E]' : 'text-[#A5AAB4]'
                }`}
              >
                {frame.tag}
              </span>
              <div className="space-y-1.5">
                <div className="h-1 w-4/5 bg-white/25" />
                <div className="h-1 w-3/5 bg-white/15" />
              </div>
              <span className="text-xs font-medium text-[#F4F2EC]">
                {frame.label}
              </span>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="h-1 flex-1 bg-white/10 overflow-hidden">
            <div className="h-full w-2/5 bg-[#C8FF2E]" />
          </div>
          <span className="text-[11px] text-[#A5AAB4]">Creative Variations</span>
        </div>
      </div>
    );
  }

  if (id === 'paid-social') {
    return (
      <div
        aria-hidden="true"
        className={`${heightClass} w-full bg-[#0B0C0E] border border-[#0B0C0E]/15 rounded-sm p-4 sm:p-5 flex flex-col justify-between`}
      >
        <div className="flex items-center justify-between text-[11px] text-[#A5AAB4]">
          <span>Meta &amp; TikTok</span>
          <span className="text-[#C8FF2E]">Signal Testing</span>
        </div>

        <div className="space-y-3 my-auto">
          {[
            { name: 'Angle 01 · Product Demo', width: 'w-[84%]', winner: true },
            { name: 'Angle 02 · Founder Story', width: 'w-[60%]', winner: false },
            { name: 'Angle 03 · Problem First', width: 'w-[42%]', winner: false },
          ].map((row) => (
            <div key={row.name} className="space-y-1.5">
              <div className="flex items-center justify-between text-[11px]">
                <span className={row.winner ? 'text-[#F4F2EC] font-medium' : 'text-[#A5AAB4]'}>
                  {row.name}
                </span>
                {row.winner && (
                  <span className="font-mono text-[10px] text-[#C8FF2E]">
                    Primary Winner
                  </span>
                )}
              </div>
              <div className="h-1.5 w-full bg-white/10 overflow-hidden">
                <div
                  className={`h-full ${row.width} ${
                    row.winner ? 'bg-[#C8FF2E]' : 'bg-white/30'
                  }`}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between text-[11px] text-[#A5AAB4] border-t border-white/10 pt-2.5">
          <span>Store &amp; WhatsApp Routing</span>
          <span>Continuous Optimisation</span>
        </div>
      </div>
    );
  }

  if (id === 'whatsapp-automation') {
    return (
      <div
        aria-hidden="true"
        className={`${heightClass} w-full bg-[#0B0C0E] border border-[#0B0C0E]/15 rounded-sm p-4 sm:p-5 flex flex-col justify-between`}
      >
        <div className="flex items-center justify-between text-[11px] text-[#A5AAB4]">
          <span>WhatsApp Workflow</span>
          <span className="text-[#C8FF2E]">Automated Thread</span>
        </div>

        <div className="space-y-2.5 my-auto">
          <div className="max-w-[82%] bg-[#181B20] border border-white/10 px-3 py-2 rounded-sm">
            <span className="block text-[10px] text-[#A5AAB4] mb-0.5">
              Prospect · Clicked Video Ad
            </span>
            <span className="text-xs text-[#F4F2EC]">
              Hi, is this available for delivery this week?
            </span>
          </div>

          <div className="ml-auto max-w-[84%] bg-[#C8FF2E] text-[#0B0C0E] px-3 py-2 rounded-sm">
            <span className="block text-[10px] text-[#0B0C0E]/75 mb-0.5">
              Automated Reply
            </span>
            <span className="text-xs font-medium">
              Yes — in stock. Choose an option below to confirm your order.
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] text-[#A5AAB4] border-t border-white/10 pt-2.5">
          <span>Lead Capture &amp; FAQ</span>
          <span>Cart Recovery Follow-Up</span>
        </div>
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className={`${heightClass} w-full bg-[#0B0C0E] border border-[#0B0C0E]/15 rounded-sm p-4 sm:p-5 flex flex-col justify-between`}
    >
      <div className="flex items-center justify-between text-[11px] text-[#A5AAB4]">
        <span>Conversion System</span>
        <span className="text-[#C8FF2E]">Connected Loop</span>
      </div>

      <div className="grid grid-cols-2 gap-2.5 my-auto">
        {[
          { code: '01', label: 'Creative Hook', accent: false },
          { code: '02', label: 'Paid Distribution', accent: false },
          { code: '03', label: 'WhatsApp Flow', accent: true },
          { code: '04', label: 'Revenue Feedback', accent: false },
        ].map((node) => (
          <div
            key={node.code}
            className={`p-3 rounded-sm border flex flex-col justify-between ${
              node.accent
                ? 'border-[#C8FF2E] bg-[#181B20]'
                : 'border-white/12 bg-[#121417]'
            }`}
          >
            <span
              className={`font-mono tabular-nums text-[10px] ${
                node.accent ? 'text-[#C8FF2E]' : 'text-[#A5AAB4]'
              }`}
            >
              {node.code}
            </span>
            <span className="text-xs font-medium text-[#F4F2EC] mt-2">
              {node.label}
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between text-[11px] text-[#A5AAB4] border-t border-white/10 pt-2.5">
        <span>Marketing &amp; Sales Alignment</span>
        <span>End-to-End Attribution</span>
      </div>
    </div>
  );
};
