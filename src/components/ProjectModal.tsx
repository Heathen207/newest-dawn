/**
 * Dawnland Development V2 - Project Presentation & Deep Foldout Modal
 * Progressively unfolds comprehensive architectural, property, and construction data.
 * Includes interactive Before/After comparison for transformation projects (e.g. OCTO structure).
 */
import React, { useState } from 'react';
import { ProjectRecord, CMSState, WorldId } from '../types';
import { getImageRecord } from '../services/cmsStorage';
import { DawnlandImage } from './DawnlandImage';
import { PropertyPlanningSystem } from './PropertyPlanningSystem';
import { X, ArrowRight, Layers, Sliders, MapPin, CheckCircle2, ChevronRight, FileText, Ruler, Trees, DollarSign, Briefcase } from 'lucide-react';

interface ProjectModalProps {
  project: ProjectRecord | null;
  cmsState: CMSState;
  onClose: () => void;
  onSelectWorld: (worldId: WorldId) => void;
  onStartInquiry?: (msg?: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  cmsState,
  onClose,
  onSelectWorld,
  onStartInquiry,
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [activeTab, setActiveTab] = useState<'overview' | 'comparison' | 'planning' | 'technical' | 'gallery'>('overview');

  if (!project) return null;

  const primaryImage = getImageRecord(cmsState, project.primaryImageId);
  const beforeImage = getImageRecord(cmsState, project.beforeImageId);
  const afterImage = getImageRecord(cmsState, project.afterImageId);
  const galleryImages = (project.galleryImageIds || [])
    .map((id) => getImageRecord(cmsState, id))
    .filter(Boolean);

  const hasBeforeAfter = !!(beforeImage && afterImage);

  return (
    <div
      id="project-presentation-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md overflow-y-auto flex items-start justify-center p-3 sm:p-6 lg:p-10"
      onClick={onClose}
    >
      <div
        id="project-presentation-modal-card"
        className="relative w-full max-w-5xl bg-[#11141c] border border-[#273042] text-[#edebe6] shadow-2xl overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="sticky top-0 z-20 bg-[#11141c]/95 backdrop-blur-md px-6 py-4 border-b border-[#222938] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xs font-sans font-semibold tracking-[0.2em] text-[#c48255] uppercase">
              PROJECT PRESENTATION
            </span>
            <span className="text-[#3b4455]">•</span>
            <span className="text-xs font-sans text-[#9da6b4]">{project.projectType}</span>
          </div>

          <button
            id="project-modal-close-btn"
            onClick={onClose}
            className="p-2 text-[#9da6b4] hover:text-white bg-[#161b25] hover:bg-[#202736] border border-[#293244] transition-colors rounded-sm"
            aria-label="Close Project Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Hero Visual Banner */}
        <div className="relative w-full h-[340px] sm:h-[420px] bg-[#0c0e14] overflow-hidden">
          <DawnlandImage
            id="project-modal-hero-image"
            image={primaryImage}
            fill
            priority
            objectFit="cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#11141c] via-black/40 to-transparent pointer-events-none" />

          {/* Project Title Overlay */}
          <div className="absolute bottom-6 left-6 right-6 z-10">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              {project.relatedWorlds.map((wId) => (
                <button
                  key={wId}
                  onClick={() => {
                    onClose();
                    onSelectWorld(wId);
                  }}
                  className="px-2.5 py-1 text-xs font-sans font-semibold uppercase tracking-wider bg-black/60 hover:bg-[#c48255] hover:text-black text-[#c48255] border border-[#c48255]/40 transition-colors rounded-sm"
                >
                  {wId}
                </button>
              ))}
              <span className="text-xs font-sans font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 uppercase tracking-wider rounded-sm">
                {project.status}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#f5f2ea] tracking-tight">
              {project.title}
            </h2>

            <div className="flex items-center gap-2 text-xs font-sans text-[#b0b8c4] mt-2">
              <MapPin className="w-3.5 h-3.5 text-[#c48255]" />
              <span>{project.location}</span>
              <span className="text-[#525f75]">•</span>
              <span>{project.property?.parcelSize?.value} {project.property?.parcelSize?.unit}</span>
            </div>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="px-6 border-b border-[#222938] bg-[#0e1117] flex items-center gap-1 sm:gap-4 overflow-x-auto">
          <button
            id="tab-overview"
            onClick={() => setActiveTab('overview')}
            className={`py-3.5 px-3 text-xs font-sans font-semibold uppercase tracking-wider border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'overview'
                ? 'border-[#c48255] text-[#f5f2ea]'
                : 'border-transparent text-[#9da6b4] hover:text-white'
            }`}
          >
            Overview &amp; Context
          </button>

          {hasBeforeAfter && (
            <button
              id="tab-comparison"
              onClick={() => setActiveTab('comparison')}
              className={`py-3.5 px-3 text-xs font-sans font-semibold uppercase tracking-wider border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'comparison'
                  ? 'border-[#c48255] text-[#f5f2ea]'
                  : 'border-transparent text-[#9da6b4] hover:text-white'
              }`}
            >
              <Sliders className="w-3.5 h-3.5 text-[#c48255]" />
              <span>Before / After Transformation</span>
            </button>
          )}

          <button
            id="tab-planning"
            onClick={() => setActiveTab('planning')}
            className={`py-3.5 px-3 text-xs font-sans font-semibold uppercase tracking-wider border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'planning'
                ? 'border-[#c48255] text-[#f5f2ea]'
                : 'border-transparent text-[#9da6b4] hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-[#c48255]" />
            <span>Property &amp; Package Model</span>
          </button>

          <button
            id="tab-technical"
            onClick={() => setActiveTab('technical')}
            className={`py-3.5 px-3 text-xs font-sans font-semibold uppercase tracking-wider border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'technical'
                ? 'border-[#c48255] text-[#f5f2ea]'
                : 'border-transparent text-[#9da6b4] hover:text-white'
            }`}
          >
            Architecture &amp; Materials
          </button>

          {galleryImages.length > 0 && (
            <button
              id="tab-gallery"
              onClick={() => setActiveTab('gallery')}
              className={`py-3.5 px-3 text-xs font-sans font-semibold uppercase tracking-wider border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'gallery'
                  ? 'border-[#c48255] text-[#f5f2ea]'
                  : 'border-transparent text-[#9da6b4] hover:text-white'
              }`}
            >
              Gallery ({galleryImages.length})
            </button>
          )}
        </div>

        {/* Tab Content Panes */}
        <div className="p-6 sm:p-8 space-y-8">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xs font-sans font-semibold tracking-[0.2em] uppercase text-[#c48255] mb-2">
                  PROJECT NARRATIVE
                </h3>
                <p className="text-base text-[#b0b8c4] font-normal leading-relaxed">
                  {project.description}
                </p>
                {project.scope?.summary && (
                  <p className="text-sm text-[#9da6b4] font-normal leading-relaxed mt-3">
                    {project.scope.summary}
                  </p>
                )}
              </div>

              {/* Property & Site Details */}
              {project.property && (
                <div className="p-4 bg-[#141923] border border-[#242d3d] rounded-sm space-y-2">
                  <h4 className="text-xs font-sans font-semibold uppercase tracking-wider text-[#eae5d8] flex items-center gap-2">
                    <Trees className="w-3.5 h-3.5 text-[#c48255]" />
                    <span>Land &amp; Siting Context</span>
                  </h4>
                  <p className="text-sm text-[#9da6b4] leading-relaxed">
                    {project.property.parcelInfo} • {project.property.terrainSlope} • {project.property.ledgeConditions}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-xs text-[#8e98a8]">
                    <div><strong className="text-[#cad2de]">Access:</strong> {project.property.accessCorridor}</div>
                    <div><strong className="text-[#cad2de]">Utilities:</strong> {project.property.utilitiesLogistics}</div>
                  </div>
                </div>
              )}

              {/* Contextual Realtor and Financing Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {project.realtor && (
                  <div className="p-4 bg-[#141923] border border-[#273042] rounded-sm space-y-1.5">
                    <div className="text-xs font-sans font-semibold tracking-wider uppercase text-[#c48255] flex items-center gap-2">
                      <Briefcase className="w-3.5 h-3.5" />
                      <span>Realtor &amp; Advisory Context</span>
                    </div>
                    <p className="text-sm text-[#9da6b4] leading-relaxed">
                      {project.realtor.involvement}
                    </p>
                    <p className="text-xs text-[#7e899a]">
                      {project.realtor.dueDiligenceSupport}
                    </p>
                  </div>
                )}

                {project.financing && (
                  <div className="p-4 bg-[#141923] border border-[#273042] rounded-sm space-y-1.5">
                    <div className="text-xs font-sans font-semibold tracking-wider uppercase text-[#c48255] flex items-center gap-2">
                      <DollarSign className="w-3.5 h-3.5" />
                      <span>Capital &amp; Financing Framework</span>
                    </div>
                    <p className="text-sm text-[#9da6b4] leading-relaxed">
                      {project.financing.structure}
                    </p>
                    <p className="text-xs text-[#7e899a]">
                      {project.financing.lenderCoordination}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Interactive Before / After Comparison */}
          {activeTab === 'comparison' && hasBeforeAfter && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-sans text-[#9da6b4]">
                <span>DRAG SLIDER TO REVEAL TRANSFORMATION</span>
                <span className="text-[#c48255]">
                  BEFORE (EXISTING) ↔ AFTER (PROPOSED)
                </span>
              </div>

              <div className="relative w-full h-[360px] sm:h-[480px] bg-black overflow-hidden select-none rounded-sm border border-[#263144]">
                {/* AFTER Image (Full background) */}
                <DawnlandImage
                  image={afterImage}
                  fill
                  priority
                  objectFit="cover"
                  className="w-full h-full"
                />
                <div className="absolute top-4 right-4 z-10 bg-black/75 backdrop-blur-md px-3 py-1 text-xs font-sans uppercase tracking-wider text-[#f5f2ea] border border-white/10 rounded-sm">
                  Proposed Transformation
                </div>

                {/* BEFORE Image (Clipped overlay) */}
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: `${sliderPosition}%` }}
                >
                  <div className="relative w-full h-full min-w-[800px] lg:min-w-[1024px]">
                    <DawnlandImage
                      image={beforeImage}
                      fill
                      priority
                      objectFit="cover"
                    />
                  </div>
                  <div className="absolute top-4 left-4 z-10 bg-black/75 backdrop-blur-md px-3 py-1 text-xs font-sans uppercase tracking-wider text-[#c48255] border border-[#c48255]/40 rounded-sm">
                    Existing Conditions
                  </div>
                </div>

                {/* Slider Handle Line */}
                <div
                  className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20 shadow-2xl"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 bg-[#c48255] text-black rounded-full flex items-center justify-center shadow-lg border border-white">
                    <Sliders className="w-4 h-4" />
                  </div>
                </div>

                {/* Hidden range input for interactive dragging */}
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderPosition}
                  onChange={(e) => setSliderPosition(Number(e.target.value))}
                  className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full z-30"
                  aria-label="Before and after transformation slider"
                />
              </div>

              <p className="text-xs font-sans text-[#8e98a8] leading-relaxed">
                Historic transformation demonstrated on Penobscot Bay. Structural stabilization of original hemlock and pine timber framing retrofitted with precision thermal-break glazing.
              </p>
            </div>
          )}

          {/* Property & Package Planning System */}
          {activeTab === 'planning' && (
            <div>
              <PropertyPlanningSystem
                project={project}
                packages={cmsState.packages}
                onSelectWorld={onSelectWorld}
                onStartInquiry={onStartInquiry}
                isEmbeddedInModal={true}
              />
            </div>
          )}

          {/* Technical Architectural Specifications */}
          {activeTab === 'technical' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.design?.floorLayout && (
                <div className="p-5 bg-[#141923] border border-[#242d3d] rounded-sm space-y-2">
                  <h4 className="text-xs font-sans font-semibold uppercase tracking-wider text-[#c48255] flex items-center gap-1.5">
                    <Ruler className="w-3.5 h-3.5" />
                    <span>Architectural &amp; Spatial Concept</span>
                  </h4>
                  <p className="text-sm text-[#b0b8c4] leading-relaxed">
                    {project.design.floorLayout.primaryConcept}
                  </p>
                  <p className="text-xs text-[#8e98a8]">
                    Bedrooms: {project.design.floorLayout.bedrooms} | Bathrooms: {project.design.floorLayout.bathrooms}
                  </p>
                </div>
              )}

              {project.proposedConditions && (
                <div className="p-5 bg-[#141923] border border-[#242d3d] rounded-sm space-y-2">
                  <h4 className="text-xs font-sans font-semibold uppercase tracking-wider text-[#c48255] flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5" />
                    <span>Envelope &amp; Foundation Specs</span>
                  </h4>
                  <p className="text-sm text-[#b0b8c4] leading-relaxed">
                    {project.proposedConditions.foundation}
                  </p>
                  <p className="text-xs text-[#8e98a8]">
                    Thermal Envelope: {project.proposedConditions.thermalPerformance} | HVAC: {project.proposedConditions.mechanicalSystems}
                  </p>
                </div>
              )}

              {project.design?.exteriorDesign && (
                <div className="p-5 bg-[#141923] border border-[#242d3d] md:col-span-2 rounded-sm space-y-2">
                  <h4 className="text-xs font-sans font-semibold uppercase tracking-wider text-[#c48255]">
                    Materials, Cladding &amp; Weatherization
                  </h4>
                  <p className="text-sm text-[#b0b8c4] leading-relaxed">
                    {project.design.exteriorDesign.claddingType} • {project.design.exteriorDesign.weatherBarrier}
                  </p>
                  <p className="text-xs text-[#8e98a8]">
                    Glazing: {project.design.exteriorDesign.windowDoorRatings} | Trim: {project.design.exteriorDesign.trimWrap}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* High-Resolution Media Gallery */}
          {activeTab === 'gallery' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {galleryImages.map((img, idx) => (
                <div
                  key={img?.id || idx}
                  className="bg-[#141923] border border-[#242d3d] p-2 space-y-2 rounded-sm"
                >
                  <DawnlandImage
                    image={img}
                    aspectRatio="4/3"
                    className="w-full rounded-sm"
                  />
                  <div className="text-xs font-sans text-[#9da6b4] truncate px-1">
                    {img?.title || img?.filename}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Bottom CTA Bar */}
        <div className="bg-[#0e1117] border-t border-[#222938] px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs font-sans text-[#8e98a8]">
            Questions regarding site feasibility, structural engineering, or package selections?
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              id="project-modal-inquire-btn"
              onClick={() => {
                onClose();
                if (onStartInquiry) {
                  onStartInquiry(`Consultation inquiry regarding project: ${project.title}`);
                }
              }}
              className="flex-1 sm:flex-none px-4 py-2.5 bg-[#c48255] hover:bg-[#d48b59] text-black font-sans font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center justify-center gap-2 rounded-sm"
            >
              <span>Discuss This Project</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
