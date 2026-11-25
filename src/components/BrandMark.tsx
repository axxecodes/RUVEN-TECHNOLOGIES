import React from 'react';

interface BrandMarkProps {
  tone?: 'dark' | 'light';
  showTagline?: boolean;
}

export const BrandMark: React.FC<BrandMarkProps> = ({
  tone = 'dark',
  showTagline = false,
}) => {
  const textColor = tone === 'dark' ? 'text-[#F4F2EC]' : 'text-[#0B0C0E]';
  const subColor = tone === 'dark' ? 'text-[#A5AAB4]' : 'text-[#474B54]';
  const strokeColor = tone === 'dark' ? '#F4F2EC' : '#0B0C0E';

  return (
    <span className="inline-flex items-center gap-3 select-none whitespace-nowrap shrink-0">
      <svg
        width="26"
        height="26"
        viewBox="0 0 26 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        <rect
          x="1"
          y="1"
          width="24"
          height="24"
          rx="2"
          stroke={strokeColor}
          strokeOpacity="0.24"
          strokeWidth="1.25"
        />
        <path
          d="M6.5 19.5V6.5H13.5C15.9853 6.5 18 8.51472 18 11C18 13.4853 15.9853 15.5 13.5 15.5H6.5"
          stroke={strokeColor}
          strokeWidth="1.8"
          strokeLinecap="square"
        />
        <path
          d="M13 15.5L18.5 19.5"
          stroke="#C8FF2E"
          strokeWidth="2.1"
          strokeLinecap="square"
        />
        <rect x="17.5" y="5.5" width="3" height="3" fill="#C8FF2E" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className={`font-display font-semibold tracking-[0.14em] text-sm uppercase ${textColor}`}>
          RUVEN
        </span>
        {showTagline && (
          <span className={`font-mono text-[10px] tracking-[0.12em] uppercase mt-1.5 ${subColor}`}>
            Attract. Convert. Grow.
          </span>
        )}
      </span>
    </span>
  );
};
