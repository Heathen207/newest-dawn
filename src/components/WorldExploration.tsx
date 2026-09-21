/**
 * Dawnland Development V2 - World / Service Exploration Component
 * Fulfills Section 3 & 9-13:
 * Deep architectural and service exploration across the Five Worlds:
 * BUILD, LAND, CREATE, CUSTOM, DAWNLAND with progressive disclosure.
 */
import React, { useState } from 'react';
import { WorldId, CMSState } from '../types';
import {
  Hammer,
  Trees,
  Sparkles,
  Compass,
  Shield,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  CheckCircle2,
  Building2,
  Layers,
} from 'lucide-react';

interface WorldExplorationProps {
  cmsState: CMSState;
  onSelectWorld: (worldId: WorldId) => void;
  onStartProject: () => void;
}

export const WorldExploration: React.FC<WorldExplorationProps> = ({
  cmsState,
  onSelectWorld,
  onStartProject,
}) => {
  const [selectedWorldId, setSelectedWorldId] = useState<WorldId>('BUILD');
  const [expandedPathwayId, setExpandedPathwayId] = useState<string | null>(null);

  const worldOrder: WorldId[] = ['BUILD', 'LAND', 'CREATE', 'CUSTOM', 'DAWNLAND'];
  const currentWorld = cmsState.worlds[selectedWorldId];

  const worldIcons: Record<WorldId, React.ReactNode> = {
    BUILD: <Hammer className="w-5 h-5 text-[#c48255]" />,
    LAND: <Trees className="w-5 h-5 text-[#4b6352]" />,
    CREATE: <Sparkles className="w-5 h-5 text-[#b87346]" />,
    CUSTOM: <Compass className="w-5 h-5 text-[#8fa3b8]" />,
    DAWNLAND: <Shield className="w-5 h-5 text-[#9aa3af]" />,
  };

  const worldThemes: Record<
    WorldId,
    { accent: string; badgeBorder: string; badgeBg: string; activeTab: string }
  > = {
    BUILD: {
      accent: '#c48255',
      badgeBorder: 'border-[#c48255]/40',
      badgeBg: 'bg-[#221812]',
      activeTab: 'border-[#c48255] bg-[#1a202c] text-[#f5f2ea]',
    },
    LAND: {
      accent: '#4b6352',
      badgeBorder: 'border-[#4b6352]/40',
      badgeBg: 'bg-[#151c17]',
      activeTab: 'border-[#4b6352] bg-[#141d17] text-[#f5f2ea]',
    },
    CREATE: {
      accent: '#b87346',
      badgeBorder: 'border-[#b87346]/40',
      badgeBg: 'bg-[#1e1714]',
      activeTab: 'border-[#b87346] bg-[#1d1715] text-[#f5f2ea]',
    },
    CUSTOM: {
      accent: '#8fa3b8',
      badgeBorder: 'border-[#8fa3b8]/40',
      badgeBg: 'bg-[#141b24]',
      activeTab: 'border-[#8fa3b8] bg-[#151d27] text-[#f5f2ea]',
    },
    DAWNLAND: {
      accent: '#9aa3af',
      badgeBorder: 'border-[#9aa3af]/40',
      badgeBg: 'bg-[#171a20]',
      activeTab: 'border-[#9aa3af] bg-[#181d26] text-[#f5f2ea]',
    },
  };

  const theme = worldThemes[selectedWorldId];

  return (
    <section
      id="world-service-exploration-section"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#0a0c10] border-b border-[#1c222e] text-[#edebe6]"
      aria-label="World and Service Exploration"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-[#202735] pb-8">
          <div>
            <span className="text-xs font-sans font-semibold tracking-[0.25em] uppercase text-[#c48255] block mb-2">
              DEEP PATHWAYS &amp; METHODOLOGIES
            </span>
            <h2
              id="world-exploration-heading"
              className="text-3xl sm:text-5xl font-serif font-bold tracking-tight uppercase text-[#f5f2ea]"
            >
              WORLD &amp; SERVICE EXPLORATION
            </h2>
            <p className="text-base sm:text-lg text-[#9da6b4] mt-3 max-w-2xl font-normal leading-relaxed">
              Examine the specific field execution, trade coordination, and technical due diligence across each Dawnland domain.
            </p>
          </div>

          <button
            onClick={() => onSelectWorld(selectedWorldId)}
            className="inline-flex items-center gap-2 px-5 py-3 bg-[#161b24] hover:bg-[#202736] border border-[#2b3546] hover:border-[#c48255] text-xs font-sans font-semibold tracking-wider uppercase text-[#c48255] hover:text-[#f5f2ea] transition-all rounded-sm shrink-0"
          >
            <span>Open Dedicated {selectedWorldId} Territory</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Five Domain Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3 mb-10">
          {worldOrder.map((wId) => {
            const isCurrent = selectedWorldId === wId;
            const itemTheme = worldThemes[wId];
            return (
              <button
                key={wId}
                id={`explore-tab-${wId.toLowerCase()}`}
                onClick={() => {
                  setSelectedWorldId(wId);
                  setExpandedPathwayId(null);
                }}
                className={`py-4 px-3 sm:px-4 text-left border rounded-sm transition-all duration-300 flex items-center justify-between ${
                  isCurrent
                    ? `${itemTheme.activeTab} shadow-lg`
                    : 'border-[#202736] bg-[#10131a] text-[#8e97a6] hover:text-[#f5f2ea] hover:border-[#323d4f]'
                }`}
              >
                <div>
                  <div className="text-[10px] font-sans font-semibold text-[#8a94a2] uppercase tracking-wider">
                    TERRITORY
                  </div>
                  <div className="text-sm sm:text-base font-serif font-bold tracking-wider uppercase text-white mt-0.5">
                    {wId}
                  </div>
                </div>
                <div className="p-1.5 rounded-sm bg-white/5 border border-white/10">
                  {worldIcons[wId]}
                </div>
              </button>
            );
          })}
        </div>

        {/* World Exploration Canvas */}
        <div className="bg-[#121620] border border-[#222938] rounded-sm p-8 sm:p-12 transition-all duration-500">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            {/* Left Overview Column */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm border border-white/10 bg-white/5 text-xs font-sans font-semibold tracking-[0.2em] uppercase text-[#c48255]">
                <span>{currentWorld.tagline}</span>
              </div>

              <h3 className="text-3xl sm:text-4xl font-serif font-bold text-[#f5f2ea] leading-tight">
                {currentWorld.headline}
              </h3>

              <p className="text-base text-[#b0b8c4] font-normal leading-relaxed">
                {currentWorld.description}
              </p>

              {/* Intersecting Domains */}
              <div className="pt-4 border-t border-[#1e2533]">
                <div className="text-xs font-sans font-semibold tracking-[0.18em] uppercase text-[#8e97a6] mb-3 flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5 text-[#c48255]" />
                  <span>Connects with other worlds</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {currentWorld.relatedWorlds.map((relWorld) => (
                    <button
                      key={relWorld}
                      onClick={() => {
                        setSelectedWorldId(relWorld);
                        setExpandedPathwayId(null);
                      }}
                      className="px-3 py-1.5 bg-[#171c26] hover:bg-[#222a3a] border border-[#283243] hover:border-[#c48255] text-xs font-sans text-[#c8d0dc] uppercase tracking-wider rounded-sm transition-colors"
                    >
                      {relWorld}
                    </button>
                  ))}
                </div>
              </div>

              {/* Special Realtor or Financial Note if present */}
              {currentWorld.realtorNote && currentWorld.realtorNote.visible && (
                <div className="p-5 bg-[#151a24] border border-[#273244] rounded-sm">
                  <div className="text-xs font-sans font-bold tracking-wider uppercase text-[#c48255] flex items-center gap-1.5 mb-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{currentWorld.realtorNote.heading}</span>
                  </div>
                  <p className="text-xs text-[#9aa3b0] leading-relaxed">
                    {currentWorld.realtorNote.text}
                  </p>
                </div>
              )}

              {currentWorld.financingNote && currentWorld.financingNote.visible && (
                <div className="p-5 bg-[#151a24] border border-[#273244] rounded-sm">
                  <div className="text-xs font-sans font-bold tracking-wider uppercase text-[#c48255] flex items-center gap-1.5 mb-1.5">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>{currentWorld.financingNote.heading}</span>
                  </div>
                  <p className="text-xs text-[#9aa3b0] leading-relaxed">
                    {currentWorld.financingNote.text}
                  </p>
                </div>
              )}
            </div>

            {/* Right Pathways & Disciplines Column */}
            <div className="lg:col-span-7 space-y-4">
              <div className="text-xs font-sans font-semibold tracking-[0.2em] uppercase text-[#8e97a6] mb-4">
                CAPABILITY &amp; EXECUTION PATHWAYS (CLICK TO EXPAND)
              </div>

              {currentWorld.pathways.map((pathway, idx) => {
                const isExpanded = expandedPathwayId === pathway.id || (!expandedPathwayId && idx === 0);
                return (
                  <div
                    key={pathway.id}
                    id={`pathway-card-${pathway.id}`}
                    className="border border-[#222938] bg-[#141924] rounded-sm overflow-hidden transition-all duration-300"
                  >
                    <button
                      onClick={() => setExpandedPathwayId(isExpanded ? null : pathway.id)}
                      className="w-full p-5 text-left flex items-start justify-between gap-4 hover:bg-[#181e2b] transition-colors"
                    >
                      <div className="space-y-1">
                        <div className="text-xs font-sans font-semibold text-[#c48255] uppercase tracking-wider">
                          PATHWAY 0{idx + 1}
                        </div>
                        <h4 className="text-lg font-serif font-bold text-[#f5f2ea]">
                          {pathway.title}
                        </h4>
                        <p className="text-sm text-[#9da6b4] line-clamp-2">
                          {pathway.summary}
                        </p>
                      </div>
                      <div className="p-1 rounded bg-[#1f2636] text-[#c48255] shrink-0 mt-1">
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="px-5 pb-5 pt-2 border-t border-[#1e2534] bg-[#10141d] text-sm text-[#c4cbd6] leading-relaxed animate-fadeIn">
                        <p>{pathway.detail}</p>
                        <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                          <span className="text-xs text-[#7d8796]">Maine site execution</span>
                          <button
                            onClick={() => onSelectWorld(selectedWorldId)}
                            className="text-xs font-sans font-semibold text-[#c48255] hover:text-white uppercase tracking-wider inline-flex items-center gap-1 transition-colors"
                          >
                            <span>Explore full {selectedWorldId} section</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              <div className="pt-6 flex items-center justify-between border-t border-[#1f2634]">
                <button
                  onClick={() => onSelectWorld(selectedWorldId)}
                  className="inline-flex items-center gap-2 text-xs font-sans font-semibold tracking-[0.18em] uppercase text-[#c48255] hover:text-white transition-colors"
                >
                  <span>Enter Full {selectedWorldId} Environment</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={onStartProject}
                  className="px-5 py-2.5 bg-[#f5f2ea] hover:bg-[#c48255] text-[#12151a] text-xs font-sans font-bold tracking-wider uppercase transition-colors rounded-sm"
                >
                  Start Project In {selectedWorldId}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
