/**
 * Dawnland Development V2 - World Experience Component
 *
 * Immersive, territory-specific environment for the Five Worlds:
 * 1. BUILD: Construction, structure, framing, repair, systems, field execution.
 * 2. LAND: Raw land, site conditions, grade, drainage, ledge, driveway, feasibility, property due diligence.
 * 3. CREATE: Conceptual design, unusual structures, artistic collaboration, studios, bespoke fabrication.
 * 4. CUSTOM: Build-to-suit residences, vanilla box build-outs, single-source multi-domain coordination.
 * 5. DAWNLAND: The connective philosophy, Heath Titcomb's hands-on leadership, enduring Maine standards.
 *
 * Progression: ENTER → UNDERSTAND → EXPLORE → SEE POSSIBILITIES → CONNECT → MOVE DEEPER
 */
import React, { useState } from 'react';
import { WorldId, CMSState, ProjectRecord } from '../types';
import { getImageRecord, getProjectsForWorld } from '../services/cmsStorage';
import { DawnlandImage } from './DawnlandImage';
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Hammer,
  Trees,
  Sparkles,
  Layers,
  Compass,
  MapPin,
  Building2,
  Coins,
  CheckCircle2,
  MoveRight,
  ShieldCheck,
  Eye,
} from 'lucide-react';

interface WorldExperienceProps {
  worldId: WorldId;
  cmsState: CMSState;
  onBackToHome: () => void;
  onSelectWorld: (worldId: WorldId) => void;
  onOpenProject: (project: ProjectRecord) => void;
  onOpenContact: () => void;
}

interface WorldPersonality {
  territoryNumber: string;
  themeColor: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  progressionMotto: string;
  icon: React.ReactNode;
  essence: string;
  perspectiveLabel: string;
  understandingLead: string;
  keyDisciplines: string[];
  pathwaysHeading: string;
  pathwaysSubheading: string;
  opportunitiesHeading: string;
  opportunitiesDescription: string;
  nextWorld: {
    id: WorldId;
    lead: string;
    description: string;
  };
}

const ALL_WORLDS: WorldId[] = ['BUILD', 'LAND', 'CREATE', 'CUSTOM', 'DAWNLAND'];

const WORLD_PERSONALITIES: Record<WorldId, WorldPersonality> = {
  BUILD: {
    territoryNumber: '01',
    themeColor: '#c48255',
    badgeBg: 'bg-[#241a14]',
    badgeBorder: 'border-[#c48255]/40',
    badgeText: 'text-[#c48255]',
    progressionMotto: 'Plan → Build → Coordinate → Complete',
    icon: <Hammer className="w-5 h-5 text-[#c48255]" />,
    essence: 'Physical construction, timber framing, structural repair, weather-tight building envelopes, and job-site trade execution.',
    perspectiveLabel: 'TECTONIC STRUCTURAL EXECUTION',
    understandingLead:
      'Construction is where drawings end and physical gravity, Maine weather, and materials take over. We direct ground-up construction, heavy timber assemblies, structural restoration, and on-site trade management with uncompromising durability.',
    keyDisciplines: [
      'Ground-Up Residential & Structural Framing',
      'Timber Joinery & Post-and-Beam Assemblies',
      'Structural Repair & Sill Replacement',
      'Historic Building Stabilization & Salvage',
      'Site Preparation & Excavation Logistics',
      'Daily Job-Site Trade Management & Scheduling',
    ],
    pathwaysHeading: 'CONSTRUCTION METHODOLOGIES & CAPABILITIES',
    pathwaysSubheading: 'How physical building, structural framing, and trade management are executed on site.',
    opportunitiesHeading: 'CONSTRUCTION OPPORTUNITIES & ACTIVE WORK',
    opportunitiesDescription: 'Structural builds, renovations, and pre-construction scopes managed by Dawnland.',
    nextWorld: {
      id: 'LAND',
      lead: 'Next Territory: LAND',
      description: 'Before physical framing begins, understand how we evaluate topography, ledge, and driveway access.',
    },
  },
  LAND: {
    territoryNumber: '02',
    themeColor: '#4b6352',
    badgeBg: 'bg-[#142018]',
    badgeBorder: 'border-[#4b6352]/40',
    badgeText: 'text-[#62856c]',
    progressionMotto: 'Property → Potential → Feasibility → Development',
    icon: <Trees className="w-5 h-5 text-[#4b6352]" />,
    essence: 'Topography, ledge, access corridors, drainage, utility routing, and pre-purchase property feasibility.',
    perspectiveLabel: 'SITE EVALUATION & TERRAIN DUE DILIGENCE',
    understandingLead:
      'Every parcel of Maine land dictates what can be built upon it. We walk raw land and challenged acreage before purchase or construction, identifying natural building envelopes, granite ledge, slopes, and practical access corridors.',
    keyDisciplines: [
      'Topographical Walking & Slope Analysis',
      'Granite Ledge & Subsurface Soil Assessment',
      'Driveway Corridors, Culverts & Access Routing',
      'Well, Power & Septic Siting Coordination',
      'Natural Building Envelopes & Sun Orientation',
      'Zoning Setbacks & Land Acquisition Due Diligence',
    ],
    pathwaysHeading: 'SITE FEASIBILITY & LAND EVALUATION PHASES',
    pathwaysSubheading: 'The steps we take to read raw acreage and challenged properties before committing capital.',
    opportunitiesHeading: 'PARCEL EVALUATIONS & LAND OPPORTUNITIES',
    opportunitiesDescription: 'Site feasibility studies, driveway corridor plans, and land assessments in progress.',
    nextWorld: {
      id: 'CREATE',
      lead: 'Next Territory: CREATE',
      description: 'Explore how unusual land parcels inspire bespoke outbuildings, studios, and sculptural structures.',
    },
  },
  CREATE: {
    territoryNumber: '03',
    themeColor: '#b87346',
    badgeBg: 'bg-[#221612]',
    badgeBorder: 'border-[#b87346]/40',
    badgeText: 'text-[#d48b59]',
    progressionMotto: 'Imagine → Design → Visualize → Make Real',
    icon: <Sparkles className="w-5 h-5 text-[#b87346]" />,
    essence: 'Specialty structures, custom artist studios, screened pavilions, bespoke assemblies, and unconventional builds.',
    perspectiveLabel: 'IMAGINATIVE STRUCTURES & BESPOKE FABRICATION',
    understandingLead:
      'CREATE exists for projects that refuse standard residential templates. We work with clients, artists, and landowners who have an unusual drawing, concept, or outbuilding in mind and need experienced hands to make it buildable and structurally sound.',
    keyDisciplines: [
      'Custom Artist Studios & Creative Retreats',
      'Screened Pavilions & Observation Shelters',
      'Radial Geometries & Specialty Footprints',
      'Handcrafted Timber Joinery & Custom Woodwork',
      'Architectural Metal Bracketry & Built-Ins',
      'Full-Scale Connection Mockups & Prototypes',
    ],
    pathwaysHeading: 'SPECIALTY DISCIPLINES & FABRICATION SCOPES',
    pathwaysSubheading: 'How we turn unconventional drawings and artistic concepts into sound, buildable physical structures.',
    opportunitiesHeading: 'SPECIALTY CONCEPTS & CREATIVE BUILDS',
    opportunitiesDescription: 'Unique pavilions, artist studios, and prototype structures conceptualized or underway.',
    nextWorld: {
      id: 'CUSTOM',
      lead: 'Next Territory: CUSTOM',
      description: 'See how creative outbuilding ideas integrate into complete build-to-suit residential properties.',
    },
  },
  CUSTOM: {
    territoryNumber: '04',
    themeColor: '#9da6b4',
    badgeBg: 'bg-[#1b222c]',
    badgeBorder: 'border-[#9da6b4]/40',
    badgeText: 'text-[#d8d2c6]',
    progressionMotto: '“You have the idea. Let us figure out how to make it real.”',
    icon: <Layers className="w-5 h-5 text-[#9da6b4]" />,
    essence: 'Turnkey build-to-suit residences, vanilla box build-outs, custom homes, and single-source project leadership.',
    perspectiveLabel: 'UNIFIED MULTIDISCIPLINARY SYNTHESIS',
    understandingLead:
      'CUSTOM is where normal trade silos dissolve. Instead of negotiating between separate excavators, builders, engineers, and finish carpenters, Dawnland leads the entire journey under one roof from raw parcel clearing to turnkey finish.',
    keyDisciplines: [
      'Turnkey Build-to-Suit Single Family Residences',
      'Vanilla Box Shells & Commercial Workspaces',
      'Integrated Land-to-Home Project Delivery',
      'High-Performance Thermal Building Envelopes',
      'Tailored Architectural Trim & Interior Finishes',
      'Single-Source Accountability from Groundbreak to Key',
    ],
    pathwaysHeading: 'THE BESPOKE SYNTHESIS FRAMEWORK',
    pathwaysSubheading: 'Single-source coordination unifying site planning, heavy construction, and interior craftsmanship.',
    opportunitiesHeading: 'CUSTOM RESIDENCES & BUILD-TO-SUIT PACKAGES',
    opportunitiesDescription: 'Bespoke residential packages and custom property syntheses in progress or available for consultation.',
    nextWorld: {
      id: 'DAWNLAND',
      lead: 'Next Territory: DAWNLAND',
      description: 'Discover the overarching philosophy, leadership, and enduring standards that guide every build.',
    },
  },
  DAWNLAND: {
    territoryNumber: '05',
    themeColor: '#7a828e',
    badgeBg: 'bg-[#161a22]',
    badgeBorder: 'border-[#7a828e]/40',
    badgeText: 'text-[#eae5d8]',
    progressionMotto: '“We see the big picture.”',
    icon: <Compass className="w-5 h-5 text-[#7a828e]" />,
    essence: 'The connecting philosophy, hands-on leadership under Heath Titcomb, trade relationships, and enduring standards.',
    perspectiveLabel: 'THE INTEGRATED PRACTICE & PHILOSOPHY',
    understandingLead:
      'Dawnland is not a holding company or a marketing label. It is an integrated Maine building practice founded on the conviction that land, construction, and craft must be understood together. We take direct accountability for every beam, road, and finish.',
    keyDisciplines: [
      'Hands-On Principal Leadership by Heath Titcomb',
      'Vetted Network of Proven Maine Trade Subcontractors',
      'Transparent Pricing & Clear Scope Accountability',
      'Durable Methods Engineered for Northern New England Climate',
      'Regional Municipal, Code & Supplier Relationships',
      'Integrated Cross-Discipline Problem Solving',
    ],
    pathwaysHeading: 'FOUNDATIONAL PILLARS & STEWARDSHIP',
    pathwaysSubheading: 'The core values, trade ethics, and operational standards that unite all five worlds.',
    opportunitiesHeading: 'REGIONAL UNDERTAKINGS & ADVISORY ENGAGEMENTS',
    opportunitiesDescription: 'Comprehensive regional property undertakings, collaborative partnerships, and advisory engagements.',
    nextWorld: {
      id: 'BUILD',
      lead: 'Next Territory: BUILD',
      description: 'Return to the job site and explore direct physical execution, framing, and timber craft.',
    },
  },
};

export const WorldExperience: React.FC<WorldExperienceProps> = ({
  worldId,
  cmsState,
  onBackToHome,
  onSelectWorld,
  onOpenProject,
  onOpenContact,
}) => {
  const world = cmsState.worlds[worldId];
  const personality = WORLD_PERSONALITIES[worldId];
  const [expandedPathwayId, setExpandedPathwayId] = useState<string | null>(null);

  const heroImage = getImageRecord(cmsState, world?.heroImageId);
  const featureImage = getImageRecord(cmsState, world?.featureImageId);
  const worldProjects = getProjectsForWorld(cmsState, worldId);

  const togglePathway = (id: string) => {
    setExpandedPathwayId((prev) => (prev === id ? null : id));
  };

  return (
    <article
      id={`world-experience-${worldId.toLowerCase()}`}
      className="pt-20 pb-28 bg-[#0a0c10] text-[#edebe6] min-h-screen selection:bg-[#c48255] selection:text-black"
    >
      {/* ─────────────────────────────────────────────────────────────
          1. WORLD ENTRY & ARCHITECTURAL TERRITORY STRIP
      ─────────────────────────────────────────────────────────────── */}
      <header className="relative w-full border-b border-[#202736] bg-[#0d1016]">
        {/* Top Control Bar: Breadcrumb + Subtle Five-World Strip */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Breadcrumb Navigation */}
            <div className="flex items-center gap-2 text-xs font-sans font-semibold text-[#8e95a0]">
              <button
                id="world-back-home-btn"
                onClick={onBackToHome}
                className="hover:text-[#c48255] flex items-center gap-1.5 transition-colors uppercase tracking-wider text-[#9da6b4] hover:text-[#f5f2ea]"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>DAWNLAND OVERVIEW</span>
              </button>
              <span className="text-[#3b4556]">/</span>
              <span className="uppercase tracking-wider text-[#d8d2c6]">THE FIVE WORLDS</span>
              <span className="text-[#3b4556]">/</span>
              <span style={{ color: personality.themeColor }} className="uppercase tracking-wider font-bold">
                {world.name}
              </span>
            </div>

            {/* Subtle Five-World Navigation Tabs */}
            <nav
              aria-label="Five World Territory Navigation"
              className="flex items-center overflow-x-auto pb-1 sm:pb-0 gap-1 border border-[#1e2533] bg-[#12151d] p-1 rounded-sm"
            >
              {ALL_WORLDS.map((wId) => {
                const isActive = wId === worldId;
                const p = WORLD_PERSONALITIES[wId];
                return (
                  <button
                    key={wId}
                    onClick={() => onSelectWorld(wId)}
                    style={{
                      borderColor: isActive ? p.themeColor : 'transparent',
                    }}
                    className={`px-3 py-1.5 text-xs font-sans font-semibold tracking-wider uppercase transition-all duration-200 whitespace-nowrap rounded-sm flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-[#181d28] text-[#f5f2ea] shadow-sm border'
                        : 'text-[#8e95a0] hover:text-[#f5f2ea] hover:bg-[#161a24]'
                    }`}
                  >
                    <span className="text-[10px] text-[#7a828e] font-sans font-semibold tracking-wider">{p.territoryNumber}</span>
                    <span>{wId}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Hero Title Block */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-14">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-3xl">
              {/* Territory Indicator Pill */}
              <div className="inline-flex items-center gap-2.5 px-3 py-1 mb-4 rounded-sm border bg-[#11151e] border-[#252d3d]">
                <span className="p-0.5">{personality.icon}</span>
                <span className="text-xs font-sans font-semibold uppercase tracking-[0.2em] text-[#9da6b4]">
                  TERRITORY {personality.territoryNumber} • {personality.perspectiveLabel}
                </span>
              </div>

              <h1
                id="world-experience-title"
                className="text-5xl sm:text-7xl font-serif font-bold tracking-tight uppercase text-[#f5f2ea] leading-[1.05]"
              >
                {world.name}
              </h1>

              <p
                style={{ color: personality.themeColor }}
                className="text-base sm:text-xl font-sans font-semibold tracking-wide uppercase mt-3"
              >
                {world.tagline}
              </p>

              <div className="mt-4 flex items-center gap-2 text-xs font-sans text-[#9da6b4] uppercase tracking-wider">
                <span className="text-[#c48255]">ORIENTATION:</span>
                <span>{personality.progressionMotto}</span>
              </div>
            </div>

            {/* Quick Action Block */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onOpenContact}
                style={{ backgroundColor: personality.themeColor }}
                className="px-5 py-3 text-xs font-sans font-bold uppercase tracking-[0.18em] text-[#0d1015] hover:brightness-110 transition-all rounded-sm shadow-md"
              >
                Discuss a {world.name} Project
              </button>
              <button
                onClick={onBackToHome}
                className="px-4 py-3 text-xs font-sans font-semibold uppercase tracking-[0.15em] border border-[#2c3647] hover:border-white text-[#d8d2c6] hover:text-white transition-colors rounded-sm bg-[#121620]"
              >
                Return to Overview
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ─────────────────────────────────────────────────────────────
          2. UNDERSTAND: CORE NARRATIVE & PRIMARY HERO IMAGE
      ─────────────────────────────────────────────────────────────── */}
      <section className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-[#1c222e]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: World Manifesto & Operating Principles */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span
                style={{ color: personality.themeColor }}
                className="text-xs font-sans font-semibold tracking-[0.25em] uppercase block mb-2"
              >
                THE {world.name} PERSPECTIVE
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#f5f2ea] leading-tight">
                {world.headline}
              </h2>
            </div>

            <p className="text-base sm:text-lg text-[#b8c0cc] font-normal leading-relaxed">
              {world.description}
            </p>

            <div className="p-5 bg-[#121620] border border-[#222b3a] rounded-sm">
              <h3 className="text-xs font-sans font-semibold tracking-wider uppercase text-[#eae5d8] mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#c48255]" />
                <span>Operating Philosophy</span>
              </h3>
              <p className="text-sm text-[#9da6b4] font-normal leading-relaxed">
                {personality.understandingLead}
              </p>
            </div>

            {/* Core Disciplines List */}
            <div className="pt-2">
              <span className="text-xs font-sans font-semibold tracking-wider uppercase text-[#7a828e] block mb-3">
                Core Disciplines Within {world.name}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {personality.keyDisciplines.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 text-xs font-sans text-[#c8d0dc] bg-[#11141c] border border-[#1f2635] p-2.5 rounded-sm"
                  >
                    <span
                      style={{ color: personality.themeColor }}
                      className="text-[11px] font-sans font-bold mt-0.5"
                    >
                      •
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset & Physical Archive Framing */}
          <div className="lg:col-span-5">
            <div className="relative p-2.5 bg-[#121620] border border-[#242d3d] shadow-2xl rounded-sm">
              <div className="relative overflow-hidden bg-black/60 rounded-sm">
                <DawnlandImage
                  image={heroImage}
                  aspectRatio="16/9"
                  className="w-full"
                />
              </div>

              {/* Verified Image Metadata Strip */}
              <div className="p-3.5 border-t border-[#1e2636] mt-2 flex flex-col gap-1 text-xs font-sans">
                <div className="flex items-center justify-between text-[#eae5d8]">
                  <span className="font-semibold">{heroImage?.title || `${world.name} Reference`}</span>
                  <span className="text-[11px] text-[#7a828e] uppercase font-sans font-semibold tracking-wider">{heroImage?.role || 'ARCHIVE'}</span>
                </div>
                {heroImage?.caption && (
                  <p className="text-[11px] text-[#8e95a0] leading-relaxed mt-0.5">
                    {heroImage.caption}
                  </p>
                )}
              </div>
            </div>

            {/* Sub-card: How this world connects to Dawnland's overall mission */}
            <div className="mt-4 p-4 bg-[#0e1219] border border-[#1d2432] rounded-sm flex items-center justify-between text-xs font-sans text-[#9da6b4]">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#c48255]" />
                <span>Interconnected with sibling territories:</span>
              </div>
              <span className="text-[#f5f2ea] font-semibold">
                {world.relatedWorlds.join(' • ')}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. EXPLORE: PRIMARY PATHWAYS (Doors into this World)
      ─────────────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-[#1c222e] bg-[#0c0f15]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-12">
            <span
              style={{ color: personality.themeColor }}
              className="text-xs font-sans font-semibold tracking-[0.25em] uppercase block mb-2"
            >
              DISCIPLINE &amp; STRUCTURE
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight uppercase text-[#f5f2ea]">
              {personality.pathwaysHeading}
            </h2>
            <p className="text-base text-[#9da6b4] mt-2 font-normal leading-relaxed">
              {personality.pathwaysSubheading} Select any pathway to disclose specific methodologies, trade coordination, and scope boundaries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {world.pathways.map((pathway, idx) => {
              const isExpanded = expandedPathwayId === pathway.id;
              return (
                <div
                  key={pathway.id || idx}
                  style={{
                    borderColor: isExpanded ? personality.themeColor : '#222938',
                  }}
                  className={`border transition-all duration-300 p-6 sm:p-7 flex flex-col justify-between rounded-sm ${
                    isExpanded
                      ? 'bg-[#151a24] shadow-lg ring-1 ring-white/5'
                      : 'bg-[#11141c] hover:border-[#333d50]'
                  }`}
                >
                  <div>
                    {/* Pathway Header Strip */}
                    <div className="flex items-center justify-between text-xs font-sans font-semibold text-[#8e95a0] mb-4 pb-3 border-b border-[#1e2533]">
                      <span className="text-[11px] font-sans font-semibold uppercase tracking-wider text-[#7a828e]">
                        STAGE 0{idx + 1}
                      </span>
                      <span
                        style={{ color: personality.themeColor }}
                        className="text-[11px] uppercase tracking-wider font-bold"
                      >
                        {worldId}
                      </span>
                    </div>

                    <h3 className="text-xl font-serif font-bold text-[#f5f2ea] leading-snug">
                      {pathway.title}
                    </h3>

                    <p className="text-sm text-[#b0b8c4] mt-3 font-normal leading-relaxed">
                      {pathway.summary}
                    </p>

                    {/* Progressive Disclosure Content */}
                    {isExpanded && pathway.detail && (
                      <div className="mt-5 pt-4 border-t border-[#242d3c] text-sm text-[#d8d2c6] leading-relaxed animate-in fade-in duration-200">
                        <div className="text-xs font-sans font-semibold uppercase tracking-wider text-[#c48255] mb-1">
                          Execution Scope &amp; Details
                        </div>
                        <p>{pathway.detail}</p>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => togglePathway(pathway.id)}
                    className="mt-6 pt-4 border-t border-[#1e2532] flex items-center justify-between text-xs font-sans font-semibold tracking-wider uppercase text-[#c48255] hover:text-white transition-colors"
                    aria-expanded={isExpanded}
                  >
                    <span>{isExpanded ? 'Collapse Scope' : 'Explore Detailed Scope'}</span>
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. VISUAL STORY & CONTEXTUAL FEATURE ASSET
      ─────────────────────────────────────────────────────────────── */}
      {featureImage && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 border-b border-[#1c222e] bg-[#090b0e]">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span
                style={{ color: personality.themeColor }}
                className="text-xs font-sans font-semibold tracking-[0.2em] uppercase block"
              >
                FIELD ARCHIVE &amp; MATERIAL REALITY
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#f5f2ea]">
                Grounding the Concept in Maine Ground
              </h2>
              <p className="text-sm sm:text-base text-[#a3abb8] leading-relaxed font-normal">
                Whether assessing timber joinery, ledge contours, or turnkey envelope performance, Dawnland pairs design discipline with direct field execution.
              </p>
              <div className="pt-2 text-xs font-sans text-[#7a828e] flex items-center gap-2">
                <Eye className="w-4 h-4 text-[#c48255]" />
                <span>Authentic conceptual vector archive • {featureImage.filename}</span>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="p-2 bg-[#121620] border border-[#242d3c] rounded-sm shadow-xl">
                <DawnlandImage
                  image={featureImage}
                  aspectRatio="16/9"
                  className="w-full rounded-sm"
                />
                <div className="p-3 text-xs font-sans text-[#9da6b4] flex items-center justify-between border-t border-[#1e2533] mt-1.5">
                  <span className="font-semibold text-[#eae5d8]">{featureImage.title}</span>
                  <span className="text-[11px] font-sans font-semibold tracking-wider text-[#7a828e]">{featureImage.role}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────────────────────────
          5. CONNECT: ADVISORY, REALTOR & FINANCING INTEGRATION
      ─────────────────────────────────────────────────────────────── */}
      {(world.realtorNote?.visible || world.financingNote?.visible) && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 border-b border-[#1c222e] bg-[#0c0e14]">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <span
                style={{ color: personality.themeColor }}
                className="text-xs font-sans font-semibold tracking-[0.25em] uppercase block mb-1"
              >
                DUE DILIGENCE &amp; ADVISORY INTEGRATION
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#f5f2ea]">
                Connecting Property Decisions to Financial Reality
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Contextual Realtor / Broker Collaboration Layer */}
              {world.realtorNote?.visible && (
                <div className="p-6 sm:p-7 bg-[#121620] border border-[#252e3d] rounded-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2.5 text-xs font-sans font-semibold tracking-wider uppercase text-[#c48255] mb-3">
                      <Building2 className="w-4 h-4 text-[#c48255]" />
                      <span>{world.realtorNote.heading}</span>
                    </div>
                    <p className="text-sm text-[#b0b8c4] font-normal leading-relaxed">
                      {world.realtorNote.text}
                    </p>
                  </div>
                  <div className="mt-5 pt-3 border-t border-[#1e2636] text-[11px] font-sans text-[#7a828e]">
                    Direct consultation available for property owners, prospective buyers, and licensed brokers.
                  </div>
                </div>
              )}

              {/* Contextual Financing & Budgeting Layer */}
              {world.financingNote?.visible && (
                <div className="p-6 sm:p-7 bg-[#121620] border border-[#252e3d] rounded-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2.5 text-xs font-sans font-semibold tracking-wider uppercase text-[#c48255] mb-3">
                      <Coins className="w-4 h-4 text-[#c48255]" />
                      <span>{world.financingNote.heading}</span>
                    </div>
                    <p className="text-sm text-[#b0b8c4] font-normal leading-relaxed">
                      {world.financingNote.text}
                    </p>
                  </div>
                  <div className="mt-5 pt-3 border-t border-[#1e2636] text-[11px] font-sans text-[#7a828e]">
                    Transparent scope breakdowns formatted for bank draws and client investment visibility.
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────────────────────────
          6. SEE POSSIBILITIES: VERIFIED PROJECTS & OPPORTUNITIES
      ─────────────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-[#1c222e] bg-[#0a0c10]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span
                style={{ color: personality.themeColor }}
                className="text-xs font-sans font-semibold tracking-[0.25em] uppercase block mb-2"
              >
                WORK &amp; DEMONSTRATED CAPABILITIES
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold tracking-tight uppercase text-[#f5f2ea]">
                {personality.opportunitiesHeading}
              </h2>
              <p className="text-sm text-[#9da6b4] mt-1 font-normal">
                {personality.opportunitiesDescription}
              </p>
            </div>
            {worldProjects.length > 0 && (
              <div className="text-xs font-sans text-[#7a828e]">
                Showing {worldProjects.length} registered project{worldProjects.length === 1 ? '' : 's'}
              </div>
            )}
          </div>

          {/* If projects exist for this world, render them clearly without placeholder noise */}
          {worldProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {worldProjects.map((project) => {
                const projImage = getImageRecord(cmsState, project.primaryImageId);
                return (
                  <div
                    key={project.id}
                    id={`project-card-${project.id}`}
                    onClick={() => onOpenProject(project)}
                    className="group bg-[#11141c] border border-[#242d3d] hover:border-[#c48255] transition-all duration-300 flex flex-col justify-between cursor-pointer overflow-hidden rounded-sm"
                  >
                    <div>
                      {/* Project Image Banner */}
                      <div className="relative h-48 w-full bg-[#161a22] overflow-hidden">
                        <DawnlandImage
                          image={projImage}
                          fill
                          objectFit="cover"
                          className="w-full h-full group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute top-3 right-3 px-2.5 py-1 text-xs font-sans font-semibold uppercase tracking-wider bg-black/85 text-white border border-white/20 rounded-sm">
                          {project.status}
                        </div>
                      </div>

                      <div className="p-6">
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {project.relatedWorlds.map((w) => (
                            <span
                              key={w}
                              className="text-xs font-sans uppercase tracking-wider text-[#c48255] px-2 py-0.5 bg-[#171d28] border border-[#273243] rounded-sm"
                            >
                              {w}
                            </span>
                          ))}
                        </div>

                        <h3 className="text-xl font-serif font-bold text-[#f5f2ea] group-hover:text-white transition-colors">
                          {project.title}
                        </h3>

                        <div className="flex items-center gap-1.5 text-xs font-sans text-[#9da6b4] mt-1.5">
                          <MapPin className="w-3.5 h-3.5 text-[#c48255]" />
                          <span>{project.location}</span>
                        </div>

                        <p className="text-sm text-[#b0b8c4] mt-3 font-normal line-clamp-3 leading-relaxed">
                          {project.description}
                        </p>
                      </div>
                    </div>

                    <div className="p-6 pt-0">
                      <div className="pt-4 border-t border-[#1e2636] flex items-center justify-between text-xs font-sans font-semibold tracking-wider uppercase text-[#c48255] group-hover:text-white transition-colors">
                        <span>Explore Deep Case Study</span>
                        <ArrowRight className="w-3.5 h-3.5 transform transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* When no public case study records are active in this world, show world-specific engagement perspective rather than generic error */
            <div className="p-8 sm:p-10 bg-[#11141c] border border-[#202735] rounded-sm flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2 text-xs font-sans font-semibold tracking-wider uppercase text-[#c48255] mb-2">
                  <ShieldCheck className="w-4 h-4 text-[#c48255]" />
                  <span>ENGAGEMENT IN {world.name}</span>
                </div>
                <h3 className="text-xl font-serif font-bold text-[#f5f2ea]">
                  Initiating Work Within {world.name}
                </h3>
                <p className="text-sm text-[#9da6b4] mt-2 leading-relaxed">
                  Dawnland accepts select engagements in {world.name.toLowerCase()} across Maine. We conduct pre-engagement site assessments, review structural drawings, and walk prospective properties to establish scope before formulating contracts.
                </p>
              </div>

              <button
                onClick={onOpenContact}
                style={{ borderColor: personality.themeColor }}
                className="px-5 py-3 border text-xs font-sans font-bold uppercase tracking-[0.18em] text-[#f5f2ea] hover:bg-white/5 transition-colors whitespace-nowrap rounded-sm"
              >
                Inquire About {world.name}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          7. MOVE DEEPER: NEXT TERRITORY & INITIATE INQUIRY
      ─────────────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#08090d]">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Sibling World Progression Banner */}
          <div className="p-8 sm:p-10 bg-[#121620] border border-[#242d3d] rounded-sm flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-sans font-semibold tracking-[0.2em] uppercase text-[#c48255] mb-2">
                <MoveRight className="w-4 h-4 text-[#c48255]" />
                <span>CONTINUE THE JOURNEY</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#f5f2ea]">
                {personality.nextWorld.lead}
              </h2>
              <p className="text-sm sm:text-base text-[#b0b8c4] mt-2 font-normal leading-relaxed">
                {personality.nextWorld.description}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button
                id="world-next-btn"
                onClick={() => onSelectWorld(personality.nextWorld.id)}
                className="px-6 py-3.5 bg-[#f5f2ea] hover:bg-[#c48255] text-[#12151a] text-xs font-sans font-bold tracking-[0.2em] uppercase transition-colors rounded-sm shadow-md"
              >
                Enter {personality.nextWorld.id}
              </button>
              <button
                onClick={onBackToHome}
                className="px-6 py-3.5 border border-[#374151] hover:border-white text-xs font-sans font-semibold tracking-[0.15em] uppercase text-[#eae5d8] transition-colors rounded-sm"
              >
                Return to Overview
              </button>
            </div>
          </div>

          {/* Direct Consultation Trigger */}
          <div className="p-6 bg-[#0e1117] border border-[#1b212c] rounded-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans">
            <div className="text-[#8e95a0]">
              Ready to evaluate a property, plan construction, or build a custom structure?
            </div>
            <button
              onClick={onOpenContact}
              className="text-[#c48255] hover:text-white font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
            >
              <span>Connect with Heath Titcomb directly</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>
    </article>
  );
};
