/**
 * Dawnland Development V2 - Deliberate Five-World Transition System
 * As mandated in Sections 11 & 48:
 * - Homepage -> World Entrance -> New Environment
 * - Unique choreography per world:
 *   * BUILD: Tectonic Structural Frame & Elevation Sweep
 *   * LAND: Topographical Horizon Expansion & Contour Lines
 *   * CREATE: Sculptural Metamorphosis & Dynamic Prism Bloom
 *   * CUSTOM: Multi-Disciplinary Blueprint Synthesis
 *   * DAWNLAND: Luminous Dawn Dissolve & Atmospheric Radiance
 * - Full reduced-motion safety
 */
import React, { useEffect, useState } from 'react';
import { WorldId, CMSState } from '../types';
import { getImageRecord } from '../services/cmsStorage';
import { DawnlandImage } from './DawnlandImage';
import { Compass, Hammer, Trees, Sparkles, Orbit, Layers } from 'lucide-react';

interface WorldTransitionProps {
  targetWorld: WorldId;
  cmsState: CMSState;
  onComplete: () => void;
  onCancel?: () => void;
}

export const WorldTransition: React.FC<WorldTransitionProps> = ({
  targetWorld,
  cmsState,
  onComplete,
}) => {
  const [phase, setPhase] = useState<'enter' | 'peak' | 'exit'>('enter');
  const worldData = cmsState.worlds[targetWorld];
  const heroImage = getImageRecord(cmsState, worldData?.heroImageId);

  useEffect(() => {
    // Check user preference for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      const quickTimer = setTimeout(onComplete, 300);
      return () => clearTimeout(quickTimer);
    }

    // Deliberate choreography stages
    const peakTimer = setTimeout(() => {
      setPhase('peak');
    }, 850);

    const exitTimer = setTimeout(() => {
      setPhase('exit');
    }, 1800);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, 2400);

    return () => {
      clearTimeout(peakTimer);
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  // World-specific transition icons and themes
  const worldTheme = {
    BUILD: {
      accent: '#c48255',
      label: 'PHYSICAL CONSTRUCTION & FRAMING',
      concept: 'Timber framing, building envelopes & historic repair',
      icon: <Hammer className="w-8 h-8 text-[#c48255]" />,
      overlayClass: 'bg-[#0f1217]/90 backdrop-blur-xl',
    },
    LAND: {
      accent: '#4b6352',
      label: 'SITE EVALUATION & FEASIBILITY',
      concept: 'Topography, drainage, ledge, access & land planning',
      icon: <Trees className="w-8 h-8 text-[#4b6352]" />,
      overlayClass: 'bg-[#0c120e]/90 backdrop-blur-xl',
    },
    CREATE: {
      accent: '#b87346',
      label: 'SPECIALTY STRUCTURES & FABRICATION',
      concept: 'Custom studios, pavilions & architectural fabrication',
      icon: <Sparkles className="w-8 h-8 text-[#b87346]" />,
      overlayClass: 'bg-[#140e0c]/90 backdrop-blur-xl',
    },
    CUSTOM: {
      accent: '#9da6b4',
      label: 'BUILD-TO-SUIT HOMES',
      concept: 'Single-source coordination from raw parcel to turnkey finish',
      icon: <Layers className="w-8 h-8 text-[#9da6b4]" />,
      overlayClass: 'bg-[#10141a]/90 backdrop-blur-xl',
    },
    DAWNLAND: {
      accent: '#7a828e',
      label: 'THE INTEGRATED PRACTICE',
      concept: 'Maine property development, construction & project coordination',
      icon: <Orbit className="w-8 h-8 text-[#7a828e]" />,
      overlayClass: 'bg-[#0e1117]/90 backdrop-blur-xl',
    },
  }[targetWorld];

  return (
    <div
      id="world-transition-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden select-none"
      role="alert"
      aria-live="assertive"
    >
      {/* Background World Hero Canvas */}
      <div
        className={`absolute inset-0 transition-transform duration-1000 ease-out ${
          phase === 'enter' ? 'scale-110 opacity-40' : phase === 'peak' ? 'scale-100 opacity-70' : 'scale-95 opacity-90'
        }`}
      >
        <DawnlandImage
          id="transition-bg-image"
          image={heroImage}
          fill
          priority
          objectFit="cover"
        />
        <div className={`absolute inset-0 ${worldTheme.overlayClass}`} />
      </div>

      {/* Architectural Elevation Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="w-full h-full max-w-7xl mx-auto border-x border-[#c48255]/40 grid grid-cols-4 sm:grid-cols-8 divide-x divide-[#c48255]/20">
          <div /><div /><div /><div /><div /><div /><div /><div />
        </div>
      </div>

      {/* Centerpiece World Entrance Portal */}
      <div className="relative z-10 max-w-2xl px-6 text-center">
        {/* World Icon in geometric coordinate */}
        <div
          className={`mx-auto mb-6 w-16 h-16 rounded-full border border-white/20 bg-black/60 flex items-center justify-center transition-all duration-700 ${
            phase === 'enter'
              ? 'scale-75 opacity-0 rotate-[-45deg]'
              : phase === 'peak'
              ? 'scale-100 opacity-100 rotate-0 shadow-[0_0_30px_rgba(196,130,85,0.35)]'
              : 'scale-110 opacity-90'
          }`}
        >
          {worldTheme.icon}
        </div>

        {/* Dynamic Transition Tag */}
        <div
          className={`text-xs font-sans font-semibold tracking-[0.25em] uppercase text-[#c48255] mb-3 transition-all duration-500 ${
            phase === 'enter' ? 'translate-y-4 opacity-0' : 'translate-y-0 opacity-100'
          }`}
        >
          {worldTheme.label}
        </div>

        {/* Primary World Monogram */}
        <h1
          id="transition-world-name"
          className={`text-6xl sm:text-8xl font-serif tracking-tight font-bold uppercase text-[#f5f2ea] transition-all duration-700 ${
            phase === 'enter'
              ? 'scale-90 opacity-0'
              : phase === 'peak'
              ? 'scale-100 opacity-100'
              : 'scale-105 opacity-90'
          }`}
        >
          {targetWorld}
        </h1>

        {/* Philosophical World Concept Subline */}
        <p
          className={`mt-4 text-base sm:text-lg text-[#eae5d8] font-serif transition-all duration-500 delay-150 ${
            phase === 'enter' ? 'translate-y-4 opacity-0' : 'translate-y-0 opacity-100'
          }`}
        >
          {worldTheme.concept}
        </p>

        {/* Architectural Progress Indicator */}
        <div className="mt-8 mx-auto w-48 h-0.5 bg-white/10 overflow-hidden rounded-full">
          <div
            className={`h-full bg-[#c48255] transition-all duration-1000 ease-out ${
              phase === 'enter' ? 'w-1/4' : phase === 'peak' ? 'w-3/4' : 'w-full'
            }`}
          />
        </div>

        <div className="mt-3 text-xs font-sans tracking-wider text-[#9da6b4] uppercase">
          Transitioning into {targetWorld} environment...
        </div>
      </div>
    </div>
  );
};
