import React, { useState } from 'react';
import {
  PackageTier,
  PreDesignedPathway,
  PackageDefinition,
  ProjectRecord,
  WorldId,
} from '../types';
import { INITIAL_PACKAGES, INITIAL_PROJECTS } from '../data/initialData';
import {
  Layers,
  Home,
  CheckCircle2,
  DollarSign,
  FileText,
  Sliders,
  Maximize2,
  ArrowRight,
  Building,
  Ruler,
  Briefcase,
  Trees,
} from 'lucide-react';

export interface PropertyPlanningSystemProps {
  project?: ProjectRecord;
  packages?: PackageDefinition[];
  onSelectWorld?: (worldId: WorldId) => void;
  onStartInquiry?: (contextMessage?: string) => void;
  isEmbeddedInModal?: boolean;
}

export const PropertyPlanningSystem: React.FC<PropertyPlanningSystemProps> = ({
  project,
  packages: availablePackages,
  onSelectWorld,
  onStartInquiry,
  isEmbeddedInModal = false,
}) => {
  const currentProject = project || INITIAL_PROJECTS[0];
  const packageList = (availablePackages && availablePackages.length > 0) ? availablePackages : INITIAL_PACKAGES;

  const [modelMode, setModelMode] = useState<'existing' | 'proposed'>('proposed');
  const [activePackage, setActivePackage] = useState<PackageTier>(
    currentProject.packageSelection?.selectedPackage || 'Vanilla Box'
  );
  const [preDesignedPathway, setPreDesignedPathway] = useState<PreDesignedPathway>(
    currentProject.packageSelection?.preDesignedPathway || 'Build as Designed'
  );
  const [activeTab, setActiveTab] = useState<
    'packages' | 'site' | 'dimensions-angles' | 'interiors-exteriors' | 'allowances' | 'financing-realtor'
  >('packages');

  const pkgIcons: Record<string, any> = {
    'Pre-Designed': Home,
    'Vanilla Box': Layers,
    'Build-to-Suit': Building,
    'Remodel': Sliders,
    'Custom': Maximize2,
    'Investor / Project Pathway': Briefcase,
  };

  const pkgAccents: Record<string, string> = {
    'Pre-Designed': '#c48255',
    'Vanilla Box': '#8fa3b8',
    'Build-to-Suit': '#c49a6c',
    'Remodel': '#a38a74',
    'Custom': '#4b6352',
    'Investor / Project Pathway': '#d4a373',
  };

  const currentPkgDef = packageList.find((p) => (p.tier || p.id) === activePackage) || packageList[0];
  const currentPkgTier = (currentPkgDef?.tier || currentPkgDef?.id) as PackageTier;
  const IconComponent = pkgIcons[currentPkgTier] || Layers;

  const formatAllowance = (item?: { amount: number; unit: string; description: string }) => {
    if (!item) return 'Included in Scope';
    return `$${item.amount.toLocaleString()} (${item.description})`;
  };

  return (
    <div
      id="property-planning-system"
      className={`bg-[#0d1016] text-[#edebe6] border border-[#212735] ${
        isEmbeddedInModal ? 'p-4 sm:p-6' : 'p-6 sm:p-10 lg:p-12 my-12'
      } rounded-sm`}
    >
      {/* Top Header Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#1f2635]">
        <div>
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="px-2.5 py-0.5 text-[11px] font-sans font-semibold uppercase tracking-widest bg-[#c48255]/15 text-[#c48255] border border-[#c48255]/30 rounded-sm">
              TECHNICAL SPECIFICATIONS &amp; ARCHITECTURE
            </span>
            <span className="text-xs text-[#7d8796]">• {currentProject.title}</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#f5f2ea] tracking-tight">
            Property &amp; Design Planning System
          </h3>
          <p className="text-sm text-[#9da5b3] mt-1.5 max-w-3xl leading-relaxed">
            Distinguishing project packages, usable site geometry, completion tiers, and defined allowance schedules across real Maine coastal parcels.
          </p>
        </div>

        {/* Existing Model vs Proposed Model Toggle */}
        <div className="flex items-center gap-2 p-1.5 bg-[#141822] border border-[#262f3f] rounded-sm shrink-0 self-start lg:self-auto">
          <span className="text-xs font-sans uppercase tracking-wider text-[#7e899a] px-2 font-medium">
            Model Mode:
          </span>
          <button
            id="model-mode-existing-btn"
            onClick={() => setModelMode('existing')}
            className={`px-3 py-1.5 text-xs font-sans uppercase font-bold tracking-wider rounded-sm transition-colors ${
              modelMode === 'existing'
                ? 'bg-[#c48255] text-[#0f1217]'
                : 'text-[#8b95a5] hover:text-white hover:bg-[#1c2230]'
            }`}
          >
            Existing Model
          </button>
          <button
            id="model-mode-proposed-btn"
            onClick={() => setModelMode('proposed')}
            className={`px-3 py-1.5 text-xs font-sans uppercase font-bold tracking-wider rounded-sm transition-colors ${
              modelMode === 'proposed'
                ? 'bg-[#c48255] text-[#0f1217]'
                : 'text-[#8b95a5] hover:text-white hover:bg-[#1c2230]'
            }`}
          >
            Proposed Model
          </button>
        </div>
      </div>

      {/* Model State Banner */}
      <div
        className={`mt-6 p-4 border rounded-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
          modelMode === 'existing'
            ? 'bg-[#181410] border-[#3d2b1f] text-[#f2ccb0]'
            : 'bg-[#101915] border-[#1f3525] text-[#b0e0c0]'
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-8 h-8 rounded-sm flex items-center justify-center font-bold text-xs ${
              modelMode === 'existing' ? 'bg-[#3d2b1f] text-[#c48255]' : 'bg-[#1f3525] text-[#4b6352]'
            }`}
          >
            {modelMode === 'existing' ? 'EX' : 'PR'}
          </div>
          <div>
            <div className="text-xs font-sans uppercase tracking-wider font-semibold">
              Currently Displaying:{' '}
              <span className="underline font-bold">
                {modelMode === 'existing'
                  ? 'Existing Site & Structure Conditions'
                  : 'Proposed High-Performance Model & Baseline Package'}
              </span>
            </div>
            <div className="text-xs text-[#a0a9b6] mt-0.5">
              {modelMode === 'existing'
                ? currentProject.existingConditions.hasExistingStructure
                  ? currentProject.existingConditions.structureType
                  : 'Undeveloped coastal terrain and granite bedrock.'
                : `${currentProject.proposedConditions.livingArea.value} ${currentProject.proposedConditions.livingArea.unit} conditioned area with continuous thermal envelope.`}
            </div>
          </div>
        </div>

        <div className="text-xs font-sans font-medium text-[#c48255] shrink-0">
          Parcel: {currentProject.property.parcelSize.value} {currentProject.property.parcelSize.unit}
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto border-b border-[#212735] mt-6 pb-2">
        {[
          { id: 'packages', label: '1. Package Architecture', icon: Layers },
          { id: 'site', label: '2. Site & Conditions', icon: Trees },
          { id: 'dimensions-angles', label: '3. Dimensions & Angles', icon: Ruler },
          { id: 'interiors-exteriors', label: '4. Interior & Exterior Specs', icon: Building },
          { id: 'allowances', label: '5. Defined Allowances', icon: DollarSign },
          { id: 'financing-realtor', label: '6. Financing & Realtor Layer', icon: FileText },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs font-sans uppercase font-bold tracking-wider whitespace-nowrap border-b-2 transition-all ${
                isActive
                  ? 'border-[#c48255] text-[#f5f2ea] bg-[#171c26]'
                  : 'border-transparent text-[#7e899a] hover:text-[#c48255] hover:bg-[#121620]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Package Architecture */}
      {activeTab === 'packages' && (
        <div className="mt-8 space-y-8">
          {/* Package Selector Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {packageList.map((pkg) => {
              const tierName = (pkg.tier || pkg.id) as PackageTier;
              const isSelected = activePackage === tierName;
              const CardIcon = pkgIcons[tierName] || Layers;
              const accent = pkgAccents[tierName] || '#c48255';
              return (
                <div
                  key={pkg.id}
                  onClick={() => setActivePackage(tierName)}
                  className={`p-5 rounded-sm border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-[#151a24] border-[#c48255] shadow-lg shadow-[#c48255]/5'
                      : 'bg-[#11141c] border-[#222938] hover:border-[#2f394c] hover:bg-[#131722]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-8 h-8 rounded-sm flex items-center justify-center"
                        style={{ backgroundColor: `${accent}20`, color: accent }}
                      >
                        <CardIcon className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-serif font-bold text-[#f5f2ea]">
                        {pkg.name}
                      </span>
                    </div>
                    {isSelected && (
                      <CheckCircle2 className="w-4 h-4 text-[#c48255]" />
                    )}
                  </div>
                  <p className="text-xs text-[#c48255] font-sans font-medium mb-2">
                    {pkg.shortDescription}
                  </p>
                  <p className="text-xs text-[#8e98a8] leading-relaxed line-clamp-3">
                    {pkg.fullDescription}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Deep-Dive into Selected Package */}
          <div className="p-6 sm:p-8 bg-[#121622] border border-[#242c3b] rounded-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#212735] pb-4">
              <div>
                <span className="text-xs font-sans uppercase font-bold tracking-widest text-[#c48255]">
                  PACKAGE DEFINITION &amp; STANDARDS
                </span>
                <h4 className="text-2xl font-serif font-bold text-[#f5f2ea] mt-1 flex items-center gap-2.5">
                  <IconComponent className="w-6 h-6 text-[#c48255]" />
                  <span>{currentPkgDef.name}</span>
                </h4>
                <p className="text-sm text-[#9da5b4] mt-1">{currentPkgDef.shortDescription}</p>
              </div>

              {onStartInquiry && (
                <button
                  onClick={() =>
                    onStartInquiry(`Consultation on ${currentPkgDef.name} package architecture`)
                  }
                  className="px-4 py-2.5 bg-[#c48255] hover:bg-[#d48b59] text-[#0f1217] text-xs font-sans font-bold uppercase tracking-wider rounded-sm inline-flex items-center gap-2 shrink-0 transition-colors"
                >
                  <span>Select {currentPkgDef.name}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* If Pre-Designed, render 4 mandatory pathways */}
            {activePackage === 'Pre-Designed' && (
              <div className="p-5 bg-[#171d29] border border-[#273449] rounded-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-sans uppercase tracking-wider text-[#c48255] font-bold">
                    Pre-Designed Architectural Pathways
                  </div>
                  <span className="text-xs text-[#7e899a]">Choose your execution strategy</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    {
                      id: 'Build as Designed' as const,
                      title: 'Pathway 1: Build as Designed',
                      desc: 'Exact architectural and structural execution of pre-engineered plans without modifications.',
                    },
                    {
                      id: 'Choose Options & Upgrades' as const,
                      title: 'Pathway 2: Choose Options & Upgrades',
                      desc: 'Curated material, fixture, siding, and mechanical package selections.',
                    },
                    {
                      id: 'Customize for Your Property' as const,
                      title: 'Pathway 3: Customize for Your Property',
                      desc: 'Adapting foundation, footprint, orientation, and daylighting to specific lot topography.',
                    },
                    {
                      id: 'Optional Build-to-Suit Modifications' as const,
                      title: 'Pathway 4: Optional Build-to-Suit Modifications',
                      desc: 'Custom interior alterations, wing extensions, or garage integrations under guided architecture.',
                    },
                  ].map((pathway) => {
                    const isSelected = preDesignedPathway === pathway.id;
                    return (
                      <div
                        key={pathway.id}
                        onClick={() => setPreDesignedPathway(pathway.id)}
                        className={`p-3.5 border rounded-sm cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-[#1e2635] border-[#c48255]'
                            : 'bg-[#111620] border-[#222a3a] hover:border-[#2f394f]'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-serif font-bold text-[#f5f2ea]">
                            {pathway.title}
                          </span>
                          {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-[#c48255]" />}
                        </div>
                        <p className="text-xs text-[#8e98a8] leading-relaxed">{pathway.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Inclusions vs Exclusions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 bg-[#10151f] border border-[#1f2636] rounded-sm space-y-3">
                <span className="text-xs font-sans uppercase font-bold tracking-wider text-[#4b6352] flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#4b6352]" />
                  <span>Standard Inclusions</span>
                </span>
                <ul className="space-y-2 text-xs text-[#cad3df]">
                  {currentPkgDef.inclusions.map((inc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#4b6352] mt-0.5">•</span>
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-5 bg-[#10151f] border border-[#1f2636] rounded-sm space-y-3">
                <span className="text-xs font-sans uppercase font-bold tracking-wider text-[#a38a74] flex items-center gap-1.5">
                  <Sliders className="w-4 h-4 text-[#a38a74]" />
                  <span>Package Exclusions &amp; Allowances</span>
                </span>
                <ul className="space-y-2 text-xs text-[#cad3df]">
                  {currentPkgDef.exclusions.map((exc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#a38a74] mt-0.5">•</span>
                      <span>{exc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Site & Conditions */}
      {activeTab === 'site' && (
        <div className="mt-8 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Site Geometry Card */}
            <div className="p-6 bg-[#121622] border border-[#222938] rounded-sm space-y-4">
              <div className="flex items-center justify-between border-b border-[#212735] pb-3">
                <h4 className="text-sm font-sans uppercase font-bold tracking-wider text-[#c48255] flex items-center gap-2">
                  <Trees className="w-4 h-4" />
                  <span>Parcel &amp; Site Geometrics</span>
                </h4>
                <span className="text-xs text-[#7e899a]">Authoritative Survey Data</span>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-[#8e98a8] block mb-0.5">Parcel Info:</span>
                  <span className="text-[#f5f2ea] font-medium">{currentProject.property.parcelInfo}</span>
                </div>
                <div>
                  <span className="text-[#8e98a8] block mb-0.5">Parcel Size:</span>
                  <span className="text-[#f5f2ea] font-medium">
                    {currentProject.property.parcelSize.value} {currentProject.property.parcelSize.unit}
                  </span>
                </div>
                <div>
                  <span className="text-[#8e98a8] block mb-0.5">Zoning &amp; Shoreland Setback:</span>
                  <span className="text-[#f5f2ea] font-medium">{currentProject.property.zoning}</span>
                </div>
                <div>
                  <span className="text-[#8e98a8] block mb-0.5">Slope &amp; Terrain Drainage:</span>
                  <span className="text-[#f5f2ea] font-medium">{currentProject.property.terrainSlope}</span>
                </div>
                <div>
                  <span className="text-[#8e98a8] block mb-0.5">Granite Bedrock &amp; Ledge:</span>
                  <span className="text-[#f5f2ea] font-medium">{currentProject.property.ledgeConditions}</span>
                </div>
                <div>
                  <span className="text-[#8e98a8] block mb-0.5">Solar Axis &amp; Exposure:</span>
                  <span className="text-[#f5f2ea] font-medium">{currentProject.property.solarOrientation}</span>
                </div>
                <div>
                  <span className="text-[#8e98a8] block mb-0.5">Access Corridor Engineering:</span>
                  <span className="text-[#f5f2ea] font-medium">{currentProject.property.accessCorridor}</span>
                </div>
                <div>
                  <span className="text-[#8e98a8] block mb-0.5">Water &amp; Septic Logistics:</span>
                  <span className="text-[#f5f2ea] font-medium">{currentProject.property.utilitiesLogistics}</span>
                </div>
              </div>
            </div>

            {/* Existing vs Proposed Conditions Comparative */}
            <div className="p-6 bg-[#121622] border border-[#222938] rounded-sm space-y-4">
              <div className="flex items-center justify-between border-b border-[#212735] pb-3">
                <h4 className="text-sm font-sans uppercase font-bold tracking-wider text-[#c48255] flex items-center gap-2">
                  <Sliders className="w-4 h-4" />
                  <span>
                    {modelMode === 'existing'
                      ? 'Existing Conditions Assessment'
                      : 'Proposed High-Performance Envelope'}
                  </span>
                </h4>
                <span className="text-xs px-2 py-0.5 bg-[#18202d] text-[#c48255] border border-[#263347] uppercase font-bold">
                  {modelMode.toUpperCase()}
                </span>
              </div>

              {modelMode === 'existing' ? (
                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-[#8e98a8] block mb-0.5">Existing Structure Type:</span>
                    <span className="text-[#f5f2ea] font-medium">{currentProject.existingConditions.structureType}</span>
                  </div>
                  <div>
                    <span className="text-[#8e98a8] block mb-0.5">Year Built &amp; Material Condition:</span>
                    <span className="text-[#f5f2ea] font-medium">{currentProject.existingConditions.yearAndCondition}</span>
                  </div>
                  <div>
                    <span className="text-[#8e98a8] block mb-0.5">Foundation &amp; Sub-Base:</span>
                    <span className="text-[#f5f2ea] font-medium">{currentProject.existingConditions.foundation}</span>
                  </div>
                  <div>
                    <span className="text-[#8e98a8] block mb-0.5">Framing &amp; Sill Integrity:</span>
                    <span className="text-[#f5f2ea] font-medium">{currentProject.existingConditions.framing}</span>
                  </div>
                  <div>
                    <span className="text-[#8e98a8] block mb-0.5">Building Envelope &amp; Thermal Status:</span>
                    <span className="text-[#f5f2ea] font-medium">{currentProject.existingConditions.buildingEnvelope}</span>
                  </div>
                  <div>
                    <span className="text-[#8e98a8] block mb-0.5">Utility &amp; Mechanical Services:</span>
                    <span className="text-[#f5f2ea] font-medium">{currentProject.existingConditions.existingUtilities}</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-[#8e98a8] block mb-0.5">Proposed Footprint:</span>
                    <span className="text-[#f5f2ea] font-medium">
                      {currentProject.proposedConditions.proposedFootprint.value} {currentProject.proposedConditions.proposedFootprint.unit}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#8e98a8] block mb-0.5">Finished Conditioned Area:</span>
                    <span className="text-[#f5f2ea] font-medium">
                      {currentProject.proposedConditions.livingArea.value} {currentProject.proposedConditions.livingArea.unit}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#8e98a8] block mb-0.5">Stories &amp; Volumetric Profile:</span>
                    <span className="text-[#f5f2ea] font-medium">{currentProject.proposedConditions.stories} Stories</span>
                  </div>
                  <div>
                    <span className="text-[#8e98a8] block mb-0.5">Engineered Foundation:</span>
                    <span className="text-[#f5f2ea] font-medium">{currentProject.proposedConditions.foundation}</span>
                  </div>
                  <div>
                    <span className="text-[#8e98a8] block mb-0.5">Continuous Thermal Performance:</span>
                    <span className="text-[#f5f2ea] font-medium">{currentProject.proposedConditions.thermalPerformance}</span>
                  </div>
                  <div>
                    <span className="text-[#8e98a8] block mb-0.5">Cold-Climate HVAC &amp; HRV:</span>
                    <span className="text-[#f5f2ea] font-medium">{currentProject.proposedConditions.mechanicalSystems}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Dimensions & Angles */}
      {activeTab === 'dimensions-angles' && (
        <div className="mt-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Dimensions Card */}
            <div className="p-6 bg-[#121622] border border-[#222938] rounded-sm space-y-3">
              <h4 className="text-sm font-sans uppercase font-bold tracking-wider text-[#c48255] border-b border-[#212735] pb-2">
                Structural Dimensions
              </h4>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-[#1b2230]">
                  <span className="text-[#8e98a8]">Overall Length:</span>
                  <span className="text-[#f5f2ea] font-semibold">
                    {currentProject.proposedConditions.dimensions.length.value} {currentProject.proposedConditions.dimensions.length.unit}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#1b2230]">
                  <span className="text-[#8e98a8]">Overall Width:</span>
                  <span className="text-[#f5f2ea] font-semibold">
                    {currentProject.proposedConditions.dimensions.width.value} {currentProject.proposedConditions.dimensions.width.unit}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#1b2230]">
                  <span className="text-[#8e98a8]">Main Level Ceiling:</span>
                  <span className="text-[#f5f2ea] font-semibold">
                    {currentProject.proposedConditions.dimensions.ceilingHeightMain?.value} {currentProject.proposedConditions.dimensions.ceilingHeightMain?.unit}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#1b2230]">
                  <span className="text-[#8e98a8]">Upper Level Ceiling:</span>
                  <span className="text-[#f5f2ea] font-semibold">
                    {currentProject.proposedConditions.dimensions.ceilingHeightUpper?.value} {currentProject.proposedConditions.dimensions.ceilingHeightUpper?.unit}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-[#8e98a8]">Ridge Peak Height:</span>
                  <span className="text-[#f5f2ea] font-semibold">
                    {currentProject.proposedConditions.dimensions.ridgeHeight?.value} {currentProject.proposedConditions.dimensions.ridgeHeight?.unit}
                  </span>
                </div>
              </div>
            </div>

            {/* Roof & Wall Angles Card */}
            <div className="p-6 bg-[#121622] border border-[#222938] rounded-sm space-y-3">
              <h4 className="text-sm font-sans uppercase font-bold tracking-wider text-[#c48255] border-b border-[#212735] pb-2">
                Roof &amp; Wall Geometry
              </h4>
              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-[#8e98a8] block mb-0.5">Primary Roof Pitch:</span>
                  <span className="text-[#f5f2ea] font-semibold">{currentProject.design.roofGeometry.primaryPitch}</span>
                </div>
                <div>
                  <span className="text-[#8e98a8] block mb-0.5">Dormer Pitch:</span>
                  <span className="text-[#f5f2ea] font-semibold">{currentProject.design.roofGeometry.dormerPitch}</span>
                </div>
                <div>
                  <span className="text-[#8e98a8] block mb-0.5">Wall Framing Geometry:</span>
                  <span className="text-[#f5f2ea] font-semibold">{currentProject.design.wallGeometry.wallAngles}</span>
                </div>
                <div>
                  <span className="text-[#8e98a8] block mb-0.5">Eaves Overhang:</span>
                  <span className="text-[#f5f2ea] font-semibold">
                    {currentProject.design.roofGeometry.overhangDepth.value} {currentProject.design.roofGeometry.overhangDepth.unit}
                  </span>
                </div>
                <div>
                  <span className="text-[#8e98a8] block mb-0.5">Fascia &amp; Soffit Detail:</span>
                  <span className="text-[#f5f2ea] font-semibold">{currentProject.design.roofGeometry.fasciaDetail}</span>
                </div>
              </div>
            </div>

            {/* Elevations Card */}
            <div className="p-6 bg-[#121622] border border-[#222938] rounded-sm space-y-3">
              <h4 className="text-sm font-sans uppercase font-bold tracking-wider text-[#c48255] border-b border-[#212735] pb-2">
                Cardinal Elevations
              </h4>
              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-[#8e98a8] block mb-0.5">North Elevation:</span>
                  <span className="text-[#cbd2dc]">{currentProject.proposedConditions.elevations.north}</span>
                </div>
                <div>
                  <span className="text-[#8e98a8] block mb-0.5">South Elevation:</span>
                  <span className="text-[#cbd2dc]">{currentProject.proposedConditions.elevations.south}</span>
                </div>
                <div>
                  <span className="text-[#8e98a8] block mb-0.5">East Elevation:</span>
                  <span className="text-[#cbd2dc]">{currentProject.proposedConditions.elevations.east}</span>
                </div>
                <div>
                  <span className="text-[#8e98a8] block mb-0.5">Finished Grade Offset:</span>
                  <span className="text-[#c48255] font-semibold">{currentProject.proposedConditions.elevations.finishedGradeOffset}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Interiors & Exteriors */}
      {activeTab === 'interiors-exteriors' && (
        <div className="mt-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Interior Specifications */}
            <div className="p-6 bg-[#121622] border border-[#222938] rounded-sm space-y-4">
              <h4 className="text-sm font-sans uppercase font-bold tracking-wider text-[#c48255] border-b border-[#212735] pb-2">
                Interior Finish Specifications
              </h4>
              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-[#8e98a8] block mb-0.5">Drywall Preparation:</span>
                  <span className="text-[#f5f2ea]">{currentProject.design.interiorDesign.drywallFinish}</span>
                </div>
                <div>
                  <span className="text-[#8e98a8] block mb-0.5">Trim &amp; Casing Detail:</span>
                  <span className="text-[#f5f2ea]">{currentProject.design.interiorDesign.trimDetails}</span>
                </div>
                <div>
                  <span className="text-[#8e98a8] block mb-0.5">Kitchen Prep &amp; Blocking:</span>
                  <span className="text-[#f5f2ea]">{currentProject.design.interiorDesign.cabinetPreparedness}</span>
                </div>
                <div>
                  <span className="text-[#8e98a8] block mb-0.5">Lighting &amp; Power Layout:</span>
                  <span className="text-[#f5f2ea]">{currentProject.design.interiorDesign.lightingLayout}</span>
                </div>
                <div>
                  <span className="text-[#8e98a8] block mb-0.5">Subfloor &amp; Flooring Readiness:</span>
                  <span className="text-[#f5f2ea]">{currentProject.design.interiorDesign.flooringStatus}</span>
                </div>
              </div>
            </div>

            {/* Exterior Specifications */}
            <div className="p-6 bg-[#121622] border border-[#222938] rounded-sm space-y-4">
              <h4 className="text-sm font-sans uppercase font-bold tracking-wider text-[#c48255] border-b border-[#212735] pb-2">
                Exterior Envelope &amp; Weatherization
              </h4>
              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-[#8e98a8] block mb-0.5">Cladding Readiness:</span>
                  <span className="text-[#f5f2ea]">{currentProject.design.exteriorDesign.claddingType}</span>
                </div>
                <div>
                  <span className="text-[#8e98a8] block mb-0.5">Tyvek Weather Barrier &amp; Flashings:</span>
                  <span className="text-[#f5f2ea]">{currentProject.design.exteriorDesign.weatherBarrier}</span>
                </div>
                <div>
                  <span className="text-[#8e98a8] block mb-0.5">Window &amp; Door Engineering:</span>
                  <span className="text-[#f5f2ea]">{currentProject.design.exteriorDesign.windowDoorRatings}</span>
                </div>
                <div>
                  <span className="text-[#8e98a8] block mb-0.5">Corner &amp; Rake Trim Wrap:</span>
                  <span className="text-[#f5f2ea]">{currentProject.design.exteriorDesign.trimWrap}</span>
                </div>
                <div>
                  <span className="text-[#8e98a8] block mb-0.5">Rainscreen Strapping:</span>
                  <span className="text-[#f5f2ea]">{currentProject.design.exteriorDesign.sidingReadiness}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Defined Allowances */}
      {activeTab === 'allowances' && (
        <div className="mt-8 space-y-6">
          <div className="p-4 bg-[#171f2c] border border-[#27364b] rounded-sm">
            <div className="text-xs font-sans uppercase font-bold tracking-wider text-[#c48255] mb-1">
              DEFINED ALLOWANCE SCHEDULE
            </div>
            <p className="text-xs text-[#cad3df] leading-relaxed">
              Transparent allowance figures established for this project. The client retains full authority over material selection; savings are credited in full, while upgrades are funded through the applicable purchase or construction escrow account.
            </p>
          </div>

          <div className="overflow-x-auto border border-[#222938] rounded-sm">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#121622] text-[#8e98a8] uppercase tracking-wider font-sans border-b border-[#222938]">
                  <th className="p-3.5">Trade Component</th>
                  <th className="p-3.5">Defined Allowance</th>
                  <th className="p-3.5">Scope Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1e2533]">
                <tr>
                  <td className="p-3.5 font-bold text-[#f5f2ea]">Exterior Siding</td>
                  <td className="p-3.5 font-mono text-[#c48255] font-bold">
                    {formatAllowance(currentProject.allowances.siding)}
                  </td>
                  <td className="p-3.5 text-[#a0aab8]">Pine clapboards, white cedar shingles, or rain-screen cladding</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-[#f5f2ea]">Cabinets &amp; Countertops</td>
                  <td className="p-3.5 font-mono text-[#c48255] font-bold">
                    {formatAllowance(currentProject.allowances.cabinetsCounters)}
                  </td>
                  <td className="p-3.5 text-[#a0aab8]">Kitchen cabinetry, island boxes, and solid stone or butcher block counters</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-[#f5f2ea]">Kitchen Appliances</td>
                  <td className="p-3.5 font-mono text-[#c48255] font-bold">
                    {formatAllowance(currentProject.allowances.appliances)}
                  </td>
                  <td className="p-3.5 text-[#a0aab8]">Induction cooktop, counter-depth refrigeration, quiet dishwasher, and ventilation hood</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-[#f5f2ea]">Finished Flooring</td>
                  <td className="p-3.5 font-mono text-[#c48255] font-bold">
                    {formatAllowance(currentProject.allowances.flooring)}
                  </td>
                  <td className="p-3.5 text-[#a0aab8]">Wide-plank engineered oak, local pine, or tile in entry and bath zones</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-[#f5f2ea]">Interior Stairs</td>
                  <td className="p-3.5 font-mono text-[#c48255] font-bold">
                    {formatAllowance(currentProject.allowances.stairs)}
                  </td>
                  <td className="p-3.5 text-[#a0aab8]">Solid oak or clear pine treads with modern balustrade and handrail</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-[#f5f2ea]">Bathroom Components</td>
                  <td className="p-3.5 font-mono text-[#c48255] font-bold">
                    {formatAllowance(currentProject.allowances.bathroom)}
                  </td>
                  <td className="p-3.5 text-[#a0aab8]">Vanity casework, plumbing fixtures, and tub or tile shower surrounds</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 6: Financing & Realtor Layer */}
      {activeTab === 'financing-realtor' && (
        <div className="mt-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Financing Information */}
            <div className="p-6 bg-[#121622] border border-[#222938] rounded-sm space-y-4">
              <div className="flex items-center gap-2 border-b border-[#212735] pb-3">
                <DollarSign className="w-4 h-4 text-[#c48255]" />
                <h4 className="text-sm font-sans uppercase font-bold tracking-wider text-[#c48255]">
                  Construction Financing Architecture
                </h4>
              </div>
              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-[#8e98a8] block mb-0.5">Financing Structure:</span>
                  <span className="text-[#f5f2ea] font-medium">{currentProject.financing.structure}</span>
                </div>
                <div>
                  <span className="text-[#8e98a8] block mb-0.5">Maine Lender Coordination:</span>
                  <span className="text-[#cbd2dc]">{currentProject.financing.lenderCoordination}</span>
                </div>
                <div>
                  <span className="text-[#8e98a8] block mb-0.5">Standard Draw Disbursement Schedule:</span>
                  <span className="text-[#cbd2dc]">{currentProject.financing.milestoneDraws}</span>
                </div>
                <div>
                  <span className="text-[#8e98a8] block mb-0.5">Escrow &amp; Allowance Holding:</span>
                  <span className="text-[#cbd2dc]">{currentProject.financing.escrowHoldback}</span>
                </div>
              </div>
            </div>

            {/* Realtor & Broker Integration */}
            <div className="p-6 bg-[#121622] border border-[#222938] rounded-sm space-y-4">
              <div className="flex items-center gap-2 border-b border-[#212735] pb-3">
                <Briefcase className="w-4 h-4 text-[#c48255]" />
                <h4 className="text-sm font-sans uppercase font-bold tracking-wider text-[#c48255]">
                  Realtor &amp; Broker Collaboration
                </h4>
              </div>
              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-[#8e98a8] block mb-0.5">Professional Broker Engagement:</span>
                  <span className="text-[#f5f2ea] font-medium">{currentProject.realtor.involvement}</span>
                </div>
                <div>
                  <span className="text-[#8e98a8] block mb-0.5">Inspection Contingency Due Diligence:</span>
                  <span className="text-[#cbd2dc]">{currentProject.realtor.dueDiligenceSupport}</span>
                </div>
                <div>
                  <span className="text-[#8e98a8] block mb-0.5">Contract Addenda &amp; Broker Terms:</span>
                  <span className="text-[#cbd2dc]">{currentProject.realtor.brokerCoordination}</span>
                </div>
                <div>
                  <span className="text-[#8e98a8] block mb-0.5">Appraisal &amp; Pre-Sale Valuation:</span>
                  <span className="text-[#cbd2dc]">{currentProject.realtor.preSaleValuation}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Direct Contact & World Portal Footer */}
      <div className="mt-8 pt-6 border-t border-[#1f2635] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans">
        <div className="text-[#8e98a8]">
          Need custom parcel evaluation or package pricing? Connect directly with{' '}
          <strong className="text-[#f5f2ea]">Heath Titcomb</strong>.
        </div>

        <div className="flex items-center gap-3">
          {onSelectWorld && (
            <button
              onClick={() => onSelectWorld('CUSTOM')}
              className="px-3.5 py-2 bg-[#171c26] hover:bg-[#222a38] text-[#c48255] border border-[#293448] font-bold uppercase tracking-wider rounded-sm transition-colors"
            >
              Explore CUSTOM World
            </button>
          )}

          {onStartInquiry && (
            <button
              onClick={() => onStartInquiry('Initiate Property Feasibility & Package Consultation')}
              className="px-4 py-2 bg-[#c48255] hover:bg-[#d48b59] text-[#0f1217] font-bold uppercase tracking-wider rounded-sm transition-colors"
            >
              Request Feasibility Review
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
