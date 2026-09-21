/**
 * Dawnland Development V2 - Projects Section ("PROJECTS / OPPORTUNITIES")
 * Strictly satisfies Section 15:
 * - When empty (the intentional current state): Displays "SELECTED WORK" with
 *   "Verified projects and case studies will appear here as they are documented."
 * - When populated: Dynamically renders real CMS project records, tags, location,
 *   scope, before/after slider modal link, and world relationships.
 * - Anti-fabrication compliant: No fake acreage, fake clients, or stock photo disguises.
 */
import React from 'react';
import { CMSState, ProjectRecord, WorldId } from '../types';
import { DawnlandImage } from './DawnlandImage';
import { getImageRecord } from '../services/cmsStorage';
import {
  Hammer,
  Trees,
  Sparkles,
  Compass,
  ArrowRight,
  Sliders,
  CheckCircle2,
  FolderOpen,
  Calendar,
  MapPin,
} from 'lucide-react';

interface ProjectsSectionProps {
  cmsState: CMSState;
  onSelectProject: (project: ProjectRecord) => void;
  onSelectWorld: (worldId: WorldId) => void;
  onOpenCMS?: () => void;
  onStartProject?: () => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  cmsState,
  onSelectProject,
  onSelectWorld,
  onOpenCMS,
  onStartProject,
}) => {
  const verifiedProjects = (cmsState.projects || []).filter((p) => p.visibility);

  return (
    <section
      id="projects-opportunities-section"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#0e1117] border-b border-[#1f2533] text-[#edebe6]"
      aria-label="Projects and Opportunities"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 border-b border-[#222938] pb-8">
          <div>
            <span className="text-xs font-sans font-semibold tracking-[0.25em] uppercase text-[#c48255] block mb-2">
              DOCUMENTED PORTFOLIO
            </span>
            <h2
              id="projects-heading"
              className="text-3xl sm:text-5xl font-serif font-bold tracking-tight uppercase text-[#f5f2ea]"
            >
              SELECTED WORK
            </h2>
            <p className="text-base sm:text-lg text-[#9da6b4] mt-3 max-w-2xl font-normal leading-relaxed">
              Verified physical builds, site developments, and specialty timber structures across Maine.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {onOpenCMS && (
              <button
                id="projects-cms-studio-btn"
                onClick={onOpenCMS}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#171c26] hover:bg-[#202736] border border-[#2c3647] text-xs font-sans font-semibold tracking-wider uppercase text-[#c48255] hover:text-[#f5f2ea] transition-colors rounded-sm"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>CMS Project Studio</span>
              </button>
            )}

            {onStartProject && (
              <button
                id="projects-consult-btn"
                onClick={onStartProject}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#f5f2ea] hover:bg-[#c48255] text-[#12151a] text-xs font-sans font-bold tracking-wider uppercase transition-colors rounded-sm"
              >
                <span>Request Project References</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Dynamic Project Rendering vs Intentional Verified Empty State */}
        {verifiedProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {verifiedProjects.map((project) => {
              const primaryImg = getImageRecord(cmsState, project.primaryImageId);
              return (
                <div
                  key={project.id}
                  id={`project-card-${project.id}`}
                  onClick={() => onSelectProject(project)}
                  className="group bg-[#131720] border border-[#242c3b] hover:border-[#c48255]/70 overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 rounded-sm"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#1a202c]">
                    <DawnlandImage
                      id={`project-img-${project.id}`}
                      image={primaryImg}
                      fill
                      objectFit="cover"
                      className="w-full h-full scale-100 group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-3 right-3 z-10 px-2.5 py-1 bg-[#101319]/80 backdrop-blur-sm border border-white/10 text-xs font-sans tracking-wider uppercase text-[#c48255]">
                      {project.status}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs font-sans tracking-wider text-[#9da6b4] uppercase mb-1">
                      <MapPin className="w-3 h-3 text-[#c48255]" />
                      <span>{project.location} • {project.projectType}</span>
                    </div>

                    <h3 className="text-xl font-serif font-bold text-[#f5f2ea] group-hover:text-[#c48255] transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-sm text-[#b0b8c4] mt-2 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>

                    <div className="mt-4 pt-4 border-t border-[#1f2533] flex items-center justify-between text-xs font-sans font-semibold text-[#c48255]">
                      <span>View Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Intentional, dignified empty state conforming to Section 15 */
          <div className="space-y-10">
            {/* Elegant Verified State Banner */}
            <div className="p-8 sm:p-12 bg-[#121620] border border-[#232b3a] rounded-sm relative overflow-hidden">
              <div className="max-w-3xl space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[#18202d] border border-[#2b374a] text-xs font-sans font-semibold tracking-wider uppercase text-[#c48255]">
                  <FolderOpen className="w-4 h-4 text-[#c48255]" />
                  <span>Verified Project Archive</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#f5f2ea]">
                  Verified projects and case studies will appear here as they are documented.
                </h3>

                <p className="text-base text-[#9da6b4] leading-relaxed">
                  Dawnland conducts real construction, parcel assessment, and timber carpentry throughout Maine. We refuse to pad our website with generic stock photography, unverified acreages, or hypothetical project claims.
                </p>

                <p className="text-sm text-[#7f8a9a] leading-relaxed">
                  As client projects complete and site photography is verified, full case studies detailing site conditions, engineering, before/after documentation, and material schedules will be published directly through our CMS project registry.
                </p>

                {onStartProject && (
                  <div className="pt-4 flex flex-wrap items-center gap-4">
                    <button
                      onClick={onStartProject}
                      className="px-6 py-3 bg-[#c48255] hover:bg-[#d48b59] text-[#12151a] text-xs font-sans font-bold tracking-wider uppercase transition-colors rounded-sm inline-flex items-center gap-2"
                    >
                      <span>Inquire About Project References</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-xs text-[#717b8b]">Direct consultation with Heath Titcomb</span>
                  </div>
                )}
              </div>
            </div>

            {/* Disciplines Ready For Documentation */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div
                onClick={() => onSelectWorld('BUILD')}
                className="group p-6 bg-[#131722] border border-[#212836] hover:border-[#c48255]/70 transition-all cursor-pointer rounded-sm"
              >
                <div className="w-10 h-10 rounded-sm bg-[#1c1612] border border-[#3b291d] flex items-center justify-center text-[#c48255] mb-4">
                  <Hammer className="w-5 h-5" />
                </div>
                <div className="text-xs font-sans font-bold uppercase text-[#c48255] mb-1">
                  BUILD SCOPE
                </div>
                <h4 className="text-lg font-serif font-bold text-[#f5f2ea] group-hover:text-white transition-colors">
                  Construction &amp; Framing
                </h4>
                <p className="text-sm text-[#9da6b4] mt-2 leading-relaxed">
                  Residential framing, sill replacement, heavy timber joinery, and structural remediation across Maine.
                </p>
                <div className="mt-4 pt-4 border-t border-[#1e2534] text-xs font-sans font-semibold text-[#c48255] flex items-center gap-1">
                  <span>Explore Build</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>

              <div
                onClick={() => onSelectWorld('LAND')}
                className="group p-6 bg-[#131722] border border-[#212836] hover:border-[#4b6352]/70 transition-all cursor-pointer rounded-sm"
              >
                <div className="w-10 h-10 rounded-sm bg-[#131a15] border border-[#233527] flex items-center justify-center text-[#4b6352] mb-4">
                  <Trees className="w-5 h-5" />
                </div>
                <div className="text-xs font-sans font-bold uppercase text-[#4b6352] mb-1">
                  LAND SCOPE
                </div>
                <h4 className="text-lg font-serif font-bold text-[#f5f2ea] group-hover:text-white transition-colors">
                  Site Feasibility &amp; Access
                </h4>
                <p className="text-sm text-[#9da6b4] mt-2 leading-relaxed">
                  Evaluating raw acreage, ledge, drainage corridors, access driveways, utilities, and building envelopes.
                </p>
                <div className="mt-4 pt-4 border-t border-[#1e2534] text-xs font-sans font-semibold text-[#4b6352] flex items-center gap-1">
                  <span>Explore Land</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>

              <div
                onClick={() => onSelectWorld('CREATE')}
                className="group p-6 bg-[#131722] border border-[#212836] hover:border-[#b87346]/70 transition-all cursor-pointer rounded-sm"
              >
                <div className="w-10 h-10 rounded-sm bg-[#1c1613] border border-[#3a271c] flex items-center justify-center text-[#b87346] mb-4">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div className="text-xs font-sans font-bold uppercase text-[#b87346] mb-1">
                  CREATE SCOPE
                </div>
                <h4 className="text-lg font-serif font-bold text-[#f5f2ea] group-hover:text-white transition-colors">
                  Specialty Structures
                </h4>
                <p className="text-sm text-[#9da6b4] mt-2 leading-relaxed">
                  Custom studios, pavilions, outbuildings, architectural brackets, and unconventional builds.
                </p>
                <div className="mt-4 pt-4 border-t border-[#1e2534] text-xs font-sans font-semibold text-[#b87346] flex items-center gap-1">
                  <span>Explore Create</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>

              <div
                onClick={() => onSelectWorld('CUSTOM')}
                className="group p-6 bg-[#131722] border border-[#212836] hover:border-[#8fa3b8]/70 transition-all cursor-pointer rounded-sm"
              >
                <div className="w-10 h-10 rounded-sm bg-[#141b24] border border-[#283546] flex items-center justify-center text-[#8fa3b8] mb-4">
                  <Compass className="w-5 h-5" />
                </div>
                <div className="text-xs font-sans font-bold uppercase text-[#8fa3b8] mb-1">
                  CUSTOM SCOPE
                </div>
                <h4 className="text-lg font-serif font-bold text-[#f5f2ea] group-hover:text-white transition-colors">
                  Build-to-Suit Homes
                </h4>
                <p className="text-sm text-[#9da6b4] mt-2 leading-relaxed">
                  Combining land assessment, site preparation, and custom construction under single-source leadership.
                </p>
                <div className="mt-4 pt-4 border-t border-[#1e2534] text-xs font-sans font-semibold text-[#8fa3b8] flex items-center gap-1">
                  <span>Explore Custom</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
