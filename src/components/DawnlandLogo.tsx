/**
 * Dawnland Development V2 - Official Architectural Logo
 */
import React from 'react';

interface DawnlandLogoProps {
  className?: string;
  onClick?: () => void;
  showSubtitle?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const DawnlandLogo: React.FC<DawnlandLogoProps> = ({
  className = '',
  onClick,
  showSubtitle = true,
  size = 'md',
}) => {
  const iconSize = size === 'sm' ? 24 : size === 'lg' ? 38 : 30;
  const titleSize = size === 'sm' ? 'text-sm tracking-[0.25em]' : size === 'lg' ? 'text-2xl tracking-[0.3em]' : 'text-lg tracking-[0.28em]';
  const subtitleSize = size === 'sm' ? 'text-[8px] tracking-[0.35em]' : size === 'lg' ? 'text-[11px] tracking-[0.45em]' : 'text-[9px] tracking-[0.4em]';

  return (
    <div
      id="dawnland-brand-logo"
      onClick={onClick}
      className={`group inline-flex items-center gap-3.5 select-none cursor-pointer transition-opacity duration-300 hover:opacity-90 ${className}`}
    >
      {/* Architectural Geometric Emblem: First Light over Granite Horizon & Structural Frame */}
      <div className="relative flex items-center justify-center shrink-0">
        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-[#c48255] transition-transform duration-500 group-hover:scale-105"
        >
          {/* Subtle Outer Enclosing Diamond / Coordinate Frame */}
          <polygon
            points="18,2 34,18 18,34 2,18"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeOpacity="0.4"
            className="transition-colors duration-300 group-hover:stroke-opacity-80"
          />
          {/* Horizon Line / Bedrock Base */}
          <line
            x1="7"
            y1="22"
            x2="29"
            y2="22"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
          {/* Rising Light Rays (Dawnland Sunrise) */}
          <line x1="18" y1="8" x2="18" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="11" y1="12" x2="14" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="25" y1="12" x2="22" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          {/* Architectural Gable / Bedrock Peak */}
          <path
            d="M12 22L18 16L24 22"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
          {/* Core Foundation Point */}
          <circle cx="18" cy="27" r="1.5" fill="currentColor" fillOpacity="0.8" />
        </svg>
      </div>

      <div className="flex flex-col justify-center leading-none">
        <span
          className={`font-serif font-bold text-[#f5f2ea] tracking-tight uppercase ${titleSize}`}
        >
          DAWNLAND
        </span>
        {showSubtitle && (
          <span
            className={`font-sans font-semibold text-[#c48255] uppercase mt-1 tracking-[0.35em] ${subtitleSize}`}
          >
            DEVELOPMENT
          </span>
        )}
      </div>
    </div>
  );
};
