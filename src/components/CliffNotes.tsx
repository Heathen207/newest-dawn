/**
 * Dawnland Development V2 - The Cliff Notes Component
 * Compact visual orientation answering:
 * 1. What Dawnland is
 * 2. What Dawnland can do
 * 3. What kinds of opportunities exist
 * 4. Where the visitor should explore
 * Visually leads directly into the Five Worlds.
 */
import React from 'react';
import { CliffNotesData, WorldId } from '../types';
import { Compass, Hammer, Trees, Sparkles, Orbit, ArrowRight } from 'lucide-react';

interface CliffNotesProps {
  cliffNotesData: CliffNotesData;
  onSelectWorld: (worldId: WorldId) => void;
  onScrollToCarousel: () => void;
}

const worldIcons: Record<WorldId, React.ReactNode> = {
  BUILD: <Hammer className="w-4 h-4 text-[#c48255]" />,
  LAND: <Trees className="w-4 h-4 text-[#4b6352]" />,
  CREATE: <Sparkles className="w-4 h-4 text-[#b87346]" />,
  CUSTOM: <Compass className="w-4 h-4 text-[#9da6b4]" />,
  DAWNLAND: <Orbit className="w-4 h-4 text-[#7a828e]" />,
};

export const CliffNotes: React.FC<CliffNotesProps> = ({
  cliffNotesData,
  onSelectWorld,
  onScrollToCarousel,
}) => {
  if (!cliffNotesData.visible) return null;

  return (
    <section
      id="the-cliff-notes-section"
      className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#0e1117] border-b border-[#1f2430]"
      aria-label="The Cliff Notes Orientation"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-[#222938] pb-8">
          <div>
            <span className="text-xs font-sans font-semibold tracking-[0.2em] uppercase text-[#c48255] block mb-2">
              ORIENTATION &amp; PATHWAYS
            </span>
            <h2
              id="cliff-notes-title"
              className="text-3xl sm:text-5xl font-serif font-bold tracking-tight uppercase text-[#f5f2ea]"
            >
              {cliffNotesData.title || 'THE CLIFF NOTES'}
            </h2>
            <p
              id="cliff-notes-subtitle"
              className="text-base text-[#9da6b4] mt-2 max-w-xl font-normal"
            >
              {cliffNotesData.subtitle}
            </p>
          </div>

          <button
            id="cliff-notes-view-carousel-btn"
            onClick={onScrollToCarousel}
            className="inline-flex items-center gap-2 text-xs font-sans font-semibold tracking-[0.15em] uppercase text-[#c48255] hover:text-[#f5f2ea] transition-colors"
          >
            <span>Proceed to 5-World Carousel</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* The 4-Step Scannable Sequential Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cliffNotesData.items.map((item, index) => {
            return (
              <div
                key={item.id || index}
                id={`cliff-note-item-${index + 1}`}
                onClick={() => onSelectWorld(item.targetWorld)}
                className="group relative bg-[#131720] border border-[#242c3b] hover:border-[#c48255]/70 p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 cursor-pointer rounded-sm"
              >
                <div>
                  {/* Step Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-[#202736] mb-4">
                    <span className="text-xs font-sans font-semibold tracking-wider text-[#9da6b4]">
                      STEP {item.stepNumber}
                    </span>
                    <span className="p-1.5 rounded-sm bg-[#181e28] border border-[#2b3545]">
                      {worldIcons[item.targetWorld] || <Compass className="w-4 h-4 text-[#c48255]" />}
                    </span>
                  </div>

                  {/* Core Prompt */}
                  <div className="text-xs font-sans font-semibold tracking-[0.15em] uppercase text-[#c48255] mb-2">
                    {item.prompt}
                  </div>

                  {/* High Level Title */}
                  <h3 className="text-lg font-serif font-bold text-[#f5f2ea] leading-snug group-hover:text-white transition-colors">
                    {item.title}
                  </h3>

                  {/* Summary */}
                  <p className="text-sm text-[#b0b8c4] mt-3 font-normal leading-relaxed">
                    {item.summary}
                  </p>
                </div>

                {/* Target World Link Indicator */}
                <div className="pt-6 mt-6 border-t border-[#1b212c] flex items-center justify-between text-xs font-sans font-semibold tracking-wider uppercase text-[#c48255] group-hover:text-white transition-colors">
                  <span>{item.actionText}</span>
                  <ArrowRight className="w-3.5 h-3.5 transform transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
