/**
 * Dawnland Development V2 - Five-World Visual Carousel
 * - Substantial visual presence for the active world
 * - Clean discovery of remaining worlds
 * - Major navigation mechanism initiating deliberate world transitions
 */
import React, { useState } from 'react';
import { WorldId, CMSState } from '../types';
import { getImageRecord } from '../services/cmsStorage';
import { DawnlandImage } from './DawnlandImage';
import { ArrowLeft, ArrowRight, ArrowUpRight, Compass, Layers } from 'lucide-react';

interface FiveWorldCarouselProps {
  cmsState: CMSState;
  onEnterWorld: (worldId: WorldId) => void;
}

export const FiveWorldCarousel: React.FC<FiveWorldCarouselProps> = ({
  cmsState,
  onEnterWorld,
}) => {
  const worldOrder: WorldId[] = ['BUILD', 'LAND', 'CREATE', 'CUSTOM', 'DAWNLAND'];
  const [activeIndex, setActiveIndex] = useState(0);

  const activeWorldId = worldOrder[activeIndex];
  const activeWorld = cmsState.worlds[activeWorldId];
  const heroImageRecord = getImageRecord(cmsState, activeWorld?.heroImageId);
  const featureImageRecord = getImageRecord(cmsState, activeWorld?.featureImageId);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? worldOrder.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === worldOrder.length - 1 ? 0 : prev + 1));
  };

  return (
    <section
      id="five-world-visual-carousel-section"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#0d0f12] overflow-hidden border-b border-[#202735]"
      aria-label="The Five Worlds Visual Carousel"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <span className="text-xs font-sans font-semibold tracking-[0.25em] uppercase text-[#c48255] block mb-2">
              THE FIVE ENTRANCES
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight uppercase text-[#f5f2ea]">
              THE WORLDS OF DAWNLAND
            </h2>
          </div>

          {/* Carousel Navigation Tabs & Step Count */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-sans font-semibold text-[#9da6b4] mr-3">
              0{activeIndex + 1} / 0{worldOrder.length}
            </span>
            <button
              id="carousel-prev-btn"
              onClick={handlePrev}
              className="p-3 bg-[#161a24] hover:bg-[#202736] border border-[#2b3446] text-[#eae5d8] hover:text-white transition-colors rounded-sm"
              aria-label="Previous World"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              id="carousel-next-btn"
              onClick={handleNext}
              className="p-3 bg-[#161a24] hover:bg-[#202736] border border-[#2b3446] text-[#eae5d8] hover:text-white transition-colors rounded-sm"
              aria-label="Next World"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Five World Direct Selection Strip */}
        <div
          id="five-world-tabs-strip"
          className="grid grid-cols-5 gap-2 sm:gap-3 mb-8"
        >
          {worldOrder.map((wId, idx) => {
            const isSelected = activeIndex === idx;
            return (
              <button
                key={wId}
                id={`carousel-tab-${wId.toLowerCase()}`}
                onClick={() => setActiveIndex(idx)}
                className={`py-3 px-2 sm:px-4 text-center transition-all duration-300 border rounded-sm ${
                  isSelected
                    ? 'border-[#c48255] bg-[#1a202c] text-[#f5f2ea] shadow-[0_0_15px_rgba(196,130,85,0.2)]'
                    : 'border-[#222938] bg-[#12161f] text-[#9da6b4] hover:text-[#f5f2ea] hover:border-[#354054]'
                }`}
              >
                <div className="text-xs font-sans font-semibold text-[#c48255] block mb-0.5">0{idx + 1}</div>
                <div className="text-xs sm:text-sm font-sans tracking-[0.15em] font-bold uppercase truncate">
                  {wId}
                </div>
              </button>
            );
          })}
        </div>

        {/* Dominant Active World Presentation Card */}
        <div
          id="active-world-card"
          className="relative bg-[#11141c] border border-[#252d3d] overflow-hidden shadow-2xl transition-all duration-500 rounded-sm"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
            {/* Visual Canvas (Col 1-7) */}
            <div className="lg:col-span-7 relative min-h-[360px] lg:min-h-full overflow-hidden">
              <DawnlandImage
                id="active-world-hero-image"
                image={heroImageRecord}
                fill
                priority
                objectFit="cover"
                focalPoint={heroImageRecord?.focalPoint || 'center'}
                className="w-full h-full scale-[1.01] hover:scale-105 transition-transform duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#11141c] via-transparent to-black/30 pointer-events-none" />

              {/* World Stamp Badge */}
              <div className="absolute top-6 left-6 z-10 px-3.5 py-1.5 bg-[#0e1117]/85 backdrop-blur-md border border-white/15 text-xs font-sans font-semibold tracking-[0.2em] uppercase text-[#c48255]">
                {activeWorld?.tagline}
              </div>

              {/* Related Worlds Cross-Indicator */}
              <div className="absolute bottom-6 left-6 z-10 hidden sm:flex items-center gap-2 text-xs font-sans tracking-wider uppercase text-[#9da6b4] bg-[#0e1117]/85 px-3 py-1.5 backdrop-blur-md border border-white/10">
                <Layers className="w-3.5 h-3.5 text-[#c48255]" />
                <span>Intersects: {activeWorld?.relatedWorlds.join(' • ')}</span>
              </div>
            </div>

            {/* Content & World Overview (Col 8-12) */}
            <div className="lg:col-span-5 p-8 sm:p-10 lg:p-12 flex flex-col justify-between bg-[#11141c] border-t lg:border-t-0 lg:border-l border-[#252d3d]">
              <div>
                <div className="flex items-center justify-between text-xs font-sans font-semibold text-[#9da6b4] mb-3">
                  <span>WORLD 0{activeIndex + 1} OF 05</span>
                  <span className="text-[#c48255]">{activeWorldId} DOMAIN</span>
                </div>

                <h3
                  id="active-world-title"
                  className="text-4xl sm:text-5xl font-serif font-bold tracking-tight uppercase text-[#f5f2ea]"
                >
                  {activeWorld?.name}
                </h3>

                <h4 className="text-xl font-serif font-semibold text-[#c48255] mt-2">
                  {activeWorld?.headline}
                </h4>

                <p className="text-sm sm:text-base text-[#b0b8c4] mt-4 font-normal leading-relaxed">
                  {activeWorld?.description}
                </p>

                {/* Primary Pathways Preview */}
                <div className="mt-6 pt-6 border-t border-[#202736] space-y-3">
                  <div className="text-xs font-sans font-semibold tracking-[0.18em] uppercase text-[#9da6b4]">
                    Core Exploratory Pathways
                  </div>
                  {activeWorld?.pathways.slice(0, 3).map((p, idx) => (
                    <div
                      key={p.id || idx}
                      className="p-3 bg-[#161a24] border border-[#242c3b] text-sm text-[#eae5d8] rounded-sm"
                    >
                      <div className="font-semibold text-[#f5f2ea]">{p.title}</div>
                      <div className="text-xs text-[#9da6b4] mt-1 font-normal">{p.summary}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Visual Transition Action */}
              <div className="pt-8 mt-6 border-t border-[#202736] flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  id={`enter-world-btn-${activeWorldId.toLowerCase()}`}
                  onClick={() => onEnterWorld(activeWorldId)}
                  className="group flex-1 py-4 px-6 bg-[#f5f2ea] hover:bg-[#c48255] text-[#12151a] text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 flex items-center justify-center gap-2 rounded-sm"
                >
                  <Compass className="w-4 h-4 text-[#12151a]" />
                  <span>Enter {activeWorldId} Experience</span>
                  <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
