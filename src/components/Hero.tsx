/**
 * Dawnland Development V2 - Hero Component
 * - Large visually dominant image from CMS image system
 * - Restrained introductory content
 * - Optimized for LCP (priority=true)
 * - Directly drives exploration toward the Five Worlds
 */
import React from 'react';
import { HeroData, CMSState, WorldId } from '../types';
import { getImageRecord } from '../services/cmsStorage';
import { DawnlandImage } from './DawnlandImage';
import { ArrowDown, Compass } from 'lucide-react';

interface HeroProps {
  heroData: HeroData;
  cmsState: CMSState;
  onExploreWorlds: () => void;
  onStartProject: () => void;
  onSelectWorld: (worldId: WorldId) => void;
}

export const Hero: React.FC<HeroProps> = ({
  heroData,
  cmsState,
  onExploreWorlds,
  onStartProject,
  onSelectWorld,
}) => {
  if (!heroData.visible) return null;

  const heroImageRecord = getImageRecord(cmsState, heroData.imageId);

  return (
    <section
      id="dawnland-hero-section"
      className="relative w-full min-h-[92vh] flex flex-col justify-between pt-24 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#0a0c0f]"
      aria-label="Dawnland Homepage Hero"
    >
      {/* Background Hero Image from CMS Image System */}
      <div className="absolute inset-0 z-0">
        <DawnlandImage
          id="hero-dominant-image"
          image={heroImageRecord}
          fill
          priority
          objectFit="cover"
          focalPoint={heroImageRecord?.focalPoint || 'center'}
          className="w-full h-full scale-[1.01] transform duration-1000 ease-out"
        />
        {/* Architectural Vignette & Atmospheric Contrast Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f12] via-[#0d0f12]/50 to-[#0d0f12]/80 pointer-events-none" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#0d0f12]/30 to-[#0d0f12]/85 pointer-events-none" />
      </div>

      {/* Top Location Tag & World Architecture */}
      <div className="relative z-10 max-w-7xl mx-auto w-full pt-8 flex items-center justify-between">
        <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-sm bg-[#12161f]/85 backdrop-blur-md border border-[#2b3342]/70 text-xs font-sans tracking-[0.15em] uppercase text-[#c48255]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#c48255]" />
          <span>MAINE &amp; NORTHERN NEW ENGLAND</span>
        </div>

        <div className="hidden sm:flex items-center gap-3 text-xs font-sans tracking-[0.15em] uppercase text-[#9da6b4]">
          <span>FIVE CONNECTED LENSES</span>
        </div>
      </div>

      {/* Main Architectural Hero Typography */}
      <div className="relative z-10 max-w-7xl mx-auto w-full py-16">
        <div className="max-w-3xl">
          <span className="text-xs sm:text-sm font-sans tracking-[0.25em] uppercase text-[#c48255] font-semibold block mb-3 opacity-95">
            MAINE CONSTRUCTION • PROPERTY • LAND • COORDINATION
          </span>

          <h1
            id="hero-main-heading"
            className="text-5xl sm:text-7xl lg:text-8xl font-serif font-bold tracking-[0.02em] text-[#f5f2ea] leading-[1.02] uppercase drop-shadow-md"
          >
            {heroData.heading || 'DAWNLAND DEVELOPMENT'}
          </h1>

          <p
            id="hero-subheading-text"
            className="mt-4 text-2xl sm:text-3xl font-serif text-[#c48255] font-semibold"
          >
            {heroData.subheading || 'From Concept to Completion'}
          </p>

          <p
            id="hero-positioning-text"
            className="mt-4 text-base sm:text-lg text-[#d4cfc4] font-normal max-w-2xl leading-relaxed font-sans"
          >
            Maine-based construction, property development, land planning, and project coordination.
          </p>

          {/* Direct CTA Action */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              id="hero-explore-worlds-btn"
              onClick={onExploreWorlds}
              className="group inline-flex items-center gap-3 px-7 py-4 bg-[#f5f2ea] text-[#12151a] text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:bg-[#c48255] hover:text-[#12151a] rounded-sm"
            >
              <Compass className="w-4 h-4 text-[#12151a] transition-transform group-hover:rotate-90 duration-300" />
              <span>EXPLORE THE FIVE WORLDS</span>
            </button>

            <button
              id="hero-start-project-btn"
              onClick={onStartProject}
              className="inline-flex items-center gap-2 px-6 py-4 text-xs font-sans font-bold tracking-[0.18em] uppercase text-[#eae5d8] hover:text-white border border-[#3b4455] hover:border-[#c48255] bg-[#141820]/80 backdrop-blur-sm transition-colors rounded-sm"
            >
              <span>START A PROJECT</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Exploration Bar */}
      <div className="relative z-10 max-w-7xl mx-auto w-full pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#9da6b4] font-sans">
        <div className="flex items-center gap-5 sm:gap-6 text-xs tracking-wider uppercase font-medium">
          <span className="hover:text-[#f5f2ea] cursor-pointer" onClick={() => onSelectWorld('BUILD')}>BUILD</span>
          <span className="text-[#c48255]">•</span>
          <span className="hover:text-[#f5f2ea] cursor-pointer" onClick={() => onSelectWorld('LAND')}>LAND</span>
          <span className="text-[#c48255]">•</span>
          <span className="hover:text-[#f5f2ea] cursor-pointer" onClick={() => onSelectWorld('CREATE')}>CREATE</span>
          <span className="text-[#c48255]">•</span>
          <span className="hover:text-[#f5f2ea] cursor-pointer" onClick={() => onSelectWorld('CUSTOM')}>CUSTOM</span>
          <span className="text-[#c48255]">•</span>
          <span className="hover:text-[#f5f2ea] cursor-pointer" onClick={() => onSelectWorld('DAWNLAND')}>DAWNLAND</span>
        </div>

        <button
          onClick={onExploreWorlds}
          className="flex items-center gap-2 text-xs tracking-wider uppercase hover:text-white transition-colors"
        >
          <span>Explore The Five Worlds</span>
          <ArrowDown className="w-3 h-3 animate-bounce" />
        </button>
      </div>
    </section>
  );
};
