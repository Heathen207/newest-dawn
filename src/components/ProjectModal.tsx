/**
 * Dawnland Development V2 - Project Presentation & Deep Foldout Modal
 * Progressively unfolds comprehensive architectural, property, and construction data.
 * Includes interactive Before/After comparison for transformation projects (e.g. OCTO structure).
 */
import React, { useState } from 'react';
import { ProjectRecord, CMSState, WorldId } from '../types';
import { getImageRecord } from '../services/cmsStorage';
import { DawnlandImage } from './DawnlandImage';
import { X, ArrowRight, Layers, Sliders, MapPin, CheckCircle2, ChevronRight } from 'lucide-react';

interface ProjectModalProps {
  project: ProjectRecord | null;
  cmsState: CMSState;
  onClose: () => void;
  onSelectWorld: (worldId: WorldId) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  cmsState,
  onClose,
  onSelectWorld,
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [activeTab, setActiveTab] = useState<'overview' | 'comparison' | 'gallery' | 'technical'>('overview');

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
                {project.details?.overview && (
                  <p className="text-sm text-[#9da6b4] font-normal leading-relaxed mt-3">
                    {project.details.overview}
                  </p>
                )}
              </div>

              {/* Property & Site Details if configured */}
              {project.details?.property && (
                <div className="p-4 bg-[#141923] border border-[#242d3d] rounded-sm">
                  <h4 className="text-xs font-sans font-semibold uppercase tracking-wider text-[#eae5d8] mb-1">
                    Land &amp; Siting Context
                  </h4>
                  <p className="text-sm text-[#9da6b4] leading-relaxed">
                    {project.details.property}
                  </p>
                </div>
              )}

              {/* Contextual Realtor and Financing Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {project.details?.realtorContext && (
                  <div className="p-4 bg-[#141923] border border-[#273042] rounded-sm">
                    <div className="text-xs font-sans font-semibold tracking-wider uppercase text-[#c48255] mb-1">
                      Realtor &amp; Advisory Context
                    </div>
                    <p className="text-sm text-[#9da6b4] leading-relaxed">
                      {project.details.realtorContext}
                    </p>
                  </div>
                )}

                {project.details?.financing && (
                  <div className="p-4 bg-[#141923] border border-[#273042] rounded-sm">
                    <div className="text-xs font-sans font-semibold tracking-wider uppercase text-[#c48255] mb-1">
                      Capital &amp; Financing Framework
                    </div>
                    <p className="text-sm text-[#9da6b4] leading-relaxed">
                      {project.details.financing}
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
                  OCTO BEFORE ↔ OCTO AFTER
                </span>
              </div>

              <div className="relative w-full h-[380px] sm:h-[460px] overflow-hidden select-none border border-[#293244] bg-black rounded-sm">
                {/* AFTER IMAGE (Base Layer) */}
                <div className="absolute inset-0">
                  <DawnlandImage
                    image={afterImage}
                    fill
                    objectFit="cover"
                  />
                  <div className="absolute bottom-4 right-4 z-10 px-3 py-1 bg-black/80 text-xs font-sans font-semibold tracking-wider text-[#c48255] uppercase border border-white/20 rounded-sm">
                    AFTER: {afterImage?.title || 'TRANSFORMED'}
                  </div>
                </div>

                {/* BEFORE IMAGE (Clipped Overlay Layer) */}
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: `${sliderPosition}%` }}
                >
                  <div className="w-[1000px] sm:w-[1200px] h-[380px] sm:h-[460px] relative">
                    <DawnlandImage
                      image={beforeImage}
                      fill
                      objectFit="cover"
                    />
                  </div>
                  <div className="absolute bottom-4 left-4 z-10 px-3 py-1 bg-black/80 text-xs font-sans font-semibold tracking-wider text-amber-400 uppercase border border-white/20 rounded-sm">
                    BEFORE: {beforeImage?.title || 'ORIGINAL'}
                  </div>
                </div>

                {/* Vertical Divider Line */}
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-[#f5f2ea] shadow-[0_0_10px_rgba(255,255,255,0.8)] cursor-ew-resize z-20"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#f5f2ea] text-black flex items-center justify-center shadow-lg text-xs font-bold">
                    ↔
                  </div>
                </div>

                {/* Range Input for accessibility and mobile drag */}
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderPosition}
                  onChange={(e) => setSliderPosition(Number(e.target.value))}
                  className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full z-30"
                  aria-label="Comparison slider"
                />
              </div>

              <p className="text-sm text-[#9da6b4] font-normal leading-relaxed">
                Historic transformation demonstrated on Penobscot Bay. Structural stabilization of original hemlock and pine timber framing retrofitted with precision thermal-break glazing.
              </p>
            </div>
          )}

          {/* Technical Architectural Specifications */}
          {activeTab === 'technical' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.details?.concept && (
                <div className="p-5 bg-[#141923] border border-[#242d3d] rounded-sm">
                  <h4 className="text-xs font-sans font-semibold uppercase tracking-wider text-[#c48255] mb-2">
                    Architectural Concept
                  </h4>
                  <p className="text-sm text-[#b0b8c4] leading-relaxed">
                    {project.details.concept}
                  </p>
                </div>
              )}

              {project.details?.construction && (
                <div className="p-5 bg-[#141923] border border-[#242d3d] rounded-sm">
                  <h4 className="text-xs font-sans font-semibold uppercase tracking-wider text-[#c48255] mb-2">
                    Construction Methodology
                  </h4>
                  <p className="text-sm text-[#b0b8c4] leading-relaxed">
                    {project.details.construction}
                  </p>
                </div>
              )}

              {project.details?.materials && (
                <div className="p-5 bg-[#141923] border border-[#242d3d] md:col-span-2 rounded-sm">
                  <h4 className="text-xs font-sans font-semibold uppercase tracking-wider text-[#c48255] mb-2">
                    Materials &amp; Finishes
                  </h4>
                  <p className="text-sm text-[#b0b8c4] leading-relaxed">
                    {project.details.materials}
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

        {/* Modal Footer / World Connection */}
        <div className="p-6 border-t border-[#222938] bg-[#0d0f14] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-sans text-[#9da6b4]">
            <Layers className="w-3.5 h-3.5 text-[#c48255]" />
            <span>Connects to: {project.relatedWorlds.join(' • ')}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-sans font-semibold uppercase tracking-wider border border-[#3b4556] text-[#b0b8c4] hover:text-white rounded-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
