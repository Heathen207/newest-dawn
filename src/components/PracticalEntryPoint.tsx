/**
 * Dawnland Development V2 - Practical Entry Point ("WHAT DO YOU ACTUALLY NEED?")
 * Directly satisfies Section 8:
 * - NEED SOMETHING BUILT? -> Explore BUILD
 * - LOOKING AT LAND? -> Explore LAND
 * - HAVE AN UNUSUAL IDEA? -> Explore CREATE
 * - NEED THE WHOLE PROJECT COORDINATED? -> Explore CUSTOM
 * - WANT TO KNOW WHO WE ARE? -> Explore DAWNLAND
 * Makes the website immediately understandable to someone arriving for the first time.
 */
import React from 'react';
import { WorldId } from '../types';
import { Hammer, Trees, Sparkles, Compass, Shield, ArrowRight } from 'lucide-react';

interface PracticalEntryPointProps {
  onSelectWorld: (worldId: WorldId) => void;
  onStartProject: () => void;
}

interface PracticalItem {
  id: string;
  world: WorldId;
  question: string;
  actionText: string;
  summary: string;
  keyServices: string[];
  icon: React.ReactNode;
  accent: string;
  badgeBg: string;
}

const PRACTICAL_ITEMS: PracticalItem[] = [
  {
    id: 'practical-build',
    world: 'BUILD',
    question: 'NEED SOMETHING BUILT?',
    actionText: 'Explore BUILD',
    summary:
      'Physical construction, framing, structural repairs, weather-tight building envelopes, and on-site trade management.',
    keyServices: ['Ground-Up Construction', 'Framing & Timber Work', 'Structural & Sill Repair', 'Job-Site Coordination'],
    icon: <Hammer className="w-5 h-5 text-[#c48255]" />,
    accent: '#c48255',
    badgeBg: 'bg-[#211913]',
  },
  {
    id: 'practical-land',
    world: 'LAND',
    question: 'LOOKING AT LAND?',
    actionText: 'Explore LAND',
    summary:
      'Site feasibility, evaluating raw acreage, ledge, drainage corridors, access driveways, and zoning before you buy or build.',
    keyServices: ['Acreage Feasibility', 'Ledge & Grade Analysis', 'Driveway & Access Corridors', 'Realtor & Buyer Support'],
    icon: <Trees className="w-5 h-5 text-[#4b6352]" />,
    accent: '#4b6352',
    badgeBg: 'bg-[#151c17]',
  },
  {
    id: 'practical-create',
    world: 'CREATE',
    question: 'HAVE AN UNUSUAL IDEA?',
    actionText: 'Explore CREATE',
    summary:
      'Creative design, artistic fabrication, custom studios, pavilions, architectural brackets, and unconventional structures.',
    keyServices: ['Bespoke Studios & Outbuildings', 'Architectural Joinery', 'Pavilions & Gazebos', 'Unconventional Builds'],
    icon: <Sparkles className="w-5 h-5 text-[#b87346]" />,
    accent: '#b87346',
    badgeBg: 'bg-[#1e1714]',
  },
  {
    id: 'practical-custom',
    world: 'CUSTOM',
    question: 'NEED THE WHOLE PROJECT COORDINATED?',
    actionText: 'Explore CUSTOM',
    summary:
      'Build-to-suit residences, vanilla box shells, and multi-domain leadership unifying land evaluation, design, and building.',
    keyServices: ['Build-to-Suit Homes', 'Vanilla Box Shells', 'Turnkey Execution', 'Integrated Project Leadership'],
    icon: <Compass className="w-5 h-5 text-[#8fa3b8]" />,
    accent: '#8fa3b8',
    badgeBg: 'bg-[#151c24]',
  },
  {
    id: 'practical-dawnland',
    world: 'DAWNLAND',
    question: 'WANT TO KNOW WHO WE ARE?',
    actionText: 'Explore DAWNLAND',
    summary:
      'Heath Titcomb, our background, trade network, clear scopes, daily site accountability, and enduring Maine standards.',
    keyServices: ['Heath Titcomb, Principal', 'How We Work & Communicate', 'Vetted Trade Network', 'Enduring Maine Standards'],
    icon: <Shield className="w-5 h-5 text-[#9aa3af]" />,
    accent: '#9aa3af',
    badgeBg: 'bg-[#171a20]',
  },
];

export const PracticalEntryPoint: React.FC<PracticalEntryPointProps> = ({
  onSelectWorld,
  onStartProject,
}) => {
  return (
    <section
      id="practical-entry-point-section"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#0c0e12] border-b border-[#1c222e] text-[#edebe6]"
      aria-label="Practical Entry Point: What do you actually need?"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 border-b border-[#202735] pb-8">
          <div>
            <span className="text-xs font-sans font-semibold tracking-[0.25em] uppercase text-[#c48255] block mb-2">
              PRACTICAL ORIENTATION
            </span>
            <h2
              id="practical-entry-heading"
              className="text-3xl sm:text-5xl font-serif font-bold tracking-tight uppercase text-[#f5f2ea]"
            >
              WHAT DO YOU ACTUALLY NEED?
            </h2>
            <p className="text-base sm:text-lg text-[#9da6b4] mt-3 max-w-2xl font-normal leading-relaxed">
              If you have a specific goal in mind, skip the conceptual overview and jump directly into the relevant Dawnland discipline.
            </p>
          </div>

          <button
            onClick={onStartProject}
            className="inline-flex items-center gap-2 px-5 py-3 bg-[#f5f2ea] hover:bg-[#c48255] text-[#12151a] text-xs font-sans font-bold tracking-wider uppercase transition-colors rounded-sm shrink-0"
          >
            <span>Start a Project</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Five Direct Practical Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRACTICAL_ITEMS.map((item, idx) => (
            <div
              key={item.id}
              id={`practical-card-${item.world.toLowerCase()}`}
              onClick={() => onSelectWorld(item.world)}
              className={`group relative bg-[#121620] border border-[#222938] hover:border-[#c48255]/70 p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 cursor-pointer rounded-sm ${
                idx === 4 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div>
                {/* Header with Icon and Badge */}
                <div className="flex items-center justify-between pb-4 border-b border-[#1f2634] mb-4">
                  <div className="flex items-center gap-3">
                    <span className={`p-2 rounded-sm border border-white/10 ${item.badgeBg}`}>
                      {item.icon}
                    </span>
                    <span className="text-xs font-sans font-bold tracking-[0.18em] uppercase text-[#9da6b4]">
                      {item.world}
                    </span>
                  </div>
                  <span className="text-xs font-sans text-[#707988] font-semibold">0{idx + 1}</span>
                </div>

                {/* Practical Question */}
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#f5f2ea] group-hover:text-[#c48255] transition-colors leading-snug">
                  {item.question}
                </h3>

                {/* Summary */}
                <p className="text-sm text-[#b0b8c4] mt-3 font-normal leading-relaxed">
                  {item.summary}
                </p>

                {/* Key Bullet Disciplines */}
                <div className="mt-5 pt-4 border-t border-[#1b212c] space-y-2">
                  {item.keyServices.map((service, sIdx) => (
                    <div
                      key={sIdx}
                      className="text-xs font-sans text-[#9aa3b0] flex items-center gap-2"
                    >
                      <span className="w-1 h-1 rounded-full bg-[#c48255]" />
                      <span>{service}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Trigger */}
              <div className="pt-6 mt-6 border-t border-[#1f2634] flex items-center justify-between text-xs font-sans font-bold tracking-[0.18em] uppercase text-[#c48255] group-hover:text-white transition-colors">
                <span>{item.actionText}</span>
                <ArrowRight className="w-4 h-4 transform transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
