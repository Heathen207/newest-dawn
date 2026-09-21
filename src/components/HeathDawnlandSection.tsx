/**
 * Dawnland Development V2 - Heath / Dawnland Section
 * Directly satisfies Section 14:
 * - HEATH TITCOMB, Principal & Project Lead
 * - Factual, grounded bio (no corporate executive inflation)
 * - HOW WE WORK: communication, scopes, scheduling, trade coordination, material planning, accountability
 * - ENDURING STANDARDS: durability, Maine climate, drainage, proven building methods, sensible energy efficiency, long-term usefulness
 */
import React from 'react';
import { CMSState, WorldId } from '../types';
import { DawnlandImage } from './DawnlandImage';
import { getImageRecord } from '../services/cmsStorage';
import {
  ShieldCheck,
  MessageSquare,
  ClipboardList,
  Calendar,
  Users,
  PackageCheck,
  CheckCircle2,
  CloudSnow,
  Droplets,
  HardHat,
  Gauge,
  Clock,
  ArrowRight,
} from 'lucide-react';

interface HeathDawnlandSectionProps {
  cmsState: CMSState;
  onSelectWorld: (worldId: WorldId) => void;
  onStartProject: () => void;
}

export const HeathDawnlandSection: React.FC<HeathDawnlandSectionProps> = ({
  cmsState,
  onSelectWorld,
  onStartProject,
}) => {
  const heathImage = getImageRecord(cmsState, 'img-heath-profile');
  const dawnlandHeroImage = getImageRecord(cmsState, 'img-dawnland-hero');

  return (
    <section
      id="heath-dawnland-section"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#0a0c10] border-b border-[#1c222e] text-[#edebe6]"
      aria-label="Heath Titcomb and Dawnland Philosophy"
    >
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Leadership Profile: Heath Titcomb */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Visual Profile Art */}
          <div className="lg:col-span-5">
            <div className="relative p-2.5 bg-[#121620] border border-[#252f40] shadow-2xl rounded-sm">
              <DawnlandImage
                id="heath-profile-image"
                image={heathImage}
                aspectRatio="1/1"
                objectFit="cover"
                className="w-full rounded-sm"
              />
              <div className="pt-3 px-2 pb-1 flex items-center justify-between text-xs font-sans text-[#8e98a8]">
                <span>Heath Titcomb</span>
                <span className="text-[#c48255] font-semibold">Principal &amp; Project Lead</span>
              </div>
            </div>
          </div>

          {/* Factual Bio */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-sans font-semibold tracking-[0.25em] uppercase text-[#c48255] block">
              LEADERSHIP &amp; RESPONSIBILITY
            </span>

            <h2
              id="heath-heading"
              className="text-3xl sm:text-5xl font-serif font-bold tracking-tight uppercase text-[#f5f2ea]"
            >
              HEATH TITCOMB
            </h2>

            <p className="text-sm font-sans font-semibold tracking-[0.15em] uppercase text-[#c48255]">
              Principal &amp; Project Lead • Dawnland Development
            </p>

            <div className="space-y-4 text-base text-[#c2c9d6] font-normal leading-relaxed">
              <p>
                Dawnland Development is led by Heath Titcomb, a Maine builder and project coordinator with extensive hands-on experience in residential framing, structural remediation, parcel feasibility, and custom architectural fabrication.
              </p>
              <p>
                Rather than operating as a distant corporate general contractor, Heath directs projects directly from the field. He manages estimating, trade coordination, municipal code compliance, site logistics, and structural execution with direct daily accountability.
              </p>
              <p className="text-sm text-[#9aa3b2] italic">
                “A successful build is not about rushing to install finishes over flawed foundations. It is about understanding the land, executing structural details that survive Maine winters, communicating openly, and staying on site until the details are right.”
              </p>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onSelectWorld('DAWNLAND')}
                className="inline-flex items-center gap-2 px-5 py-3 bg-[#161b24] hover:bg-[#202736] border border-[#2c3748] hover:border-[#c48255] text-xs font-sans font-semibold tracking-wider uppercase text-[#c48255] hover:text-[#f5f2ea] transition-all rounded-sm"
              >
                <span>Explore Full DAWNLAND World</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={onStartProject}
                className="inline-flex items-center gap-2 px-5 py-3 bg-[#f5f2ea] hover:bg-[#c48255] text-[#12151a] text-xs font-sans font-bold tracking-wider uppercase transition-colors rounded-sm"
              >
                <span>Consult with Heath</span>
              </button>
            </div>
          </div>
        </div>

        {/* HOW WE WORK: Grounded, practical principles */}
        <div className="pt-12 border-t border-[#1c222e]">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-sans font-semibold tracking-[0.25em] uppercase text-[#c48255] block mb-2">
              PROJECT EXECUTION
            </span>
            <h3 className="text-2xl sm:text-4xl font-serif font-bold tracking-tight uppercase text-[#f5f2ea]">
              HOW WE WORK
            </h3>
            <p className="text-base text-[#9da6b4] mt-2 font-normal leading-relaxed">
              Our process is rooted in honest expectations, clear documentation, and steady trade leadership.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-[#11141c] border border-[#202634] rounded-sm space-y-3">
              <div className="w-10 h-10 rounded-sm bg-[#161b24] border border-[#273244] flex items-center justify-center text-[#c48255]">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-serif font-bold text-[#f5f2ea]">Direct Communication</h4>
              <p className="text-sm text-[#9aa3b2] leading-relaxed">
                Direct conversations with Heath Titcomb. No telephone tag with layered intermediaries, sales reps, or customer-service queues.
              </p>
            </div>

            <div className="p-6 bg-[#11141c] border border-[#202634] rounded-sm space-y-3">
              <div className="w-10 h-10 rounded-sm bg-[#161b24] border border-[#273244] flex items-center justify-center text-[#c48255]">
                <ClipboardList className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-serif font-bold text-[#f5f2ea]">Clear, Transparent Scopes</h4>
              <p className="text-sm text-[#9aa3b2] leading-relaxed">
                Detailed breakdowns of what is included, what is excluded, material allowances, and honest line-item cost projections from the beginning.
              </p>
            </div>

            <div className="p-6 bg-[#11141c] border border-[#202634] rounded-sm space-y-3">
              <div className="w-10 h-10 rounded-sm bg-[#161b24] border border-[#273244] flex items-center justify-center text-[#c48255]">
                <Calendar className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-serif font-bold text-[#f5f2ea]">Active Scheduling</h4>
              <p className="text-sm text-[#9aa3b2] leading-relaxed">
                Realistic timelines planned around Maine weather seasons, subcontractor sequencing, and long-lead material procurement.
              </p>
            </div>

            <div className="p-6 bg-[#11141c] border border-[#202634] rounded-sm space-y-3">
              <div className="w-10 h-10 rounded-sm bg-[#161b24] border border-[#273244] flex items-center justify-center text-[#c48255]">
                <Users className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-serif font-bold text-[#f5f2ea]">Vetted Trade Coordination</h4>
              <p className="text-sm text-[#9aa3b2] leading-relaxed">
                Close coordination with proven regional Maine excavators, concrete contractors, electricians, plumbers, and timber specialists.
              </p>
            </div>

            <div className="p-6 bg-[#11141c] border border-[#202634] rounded-sm space-y-3">
              <div className="w-10 h-10 rounded-sm bg-[#161b24] border border-[#273244] flex items-center justify-center text-[#c48255]">
                <PackageCheck className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-serif font-bold text-[#f5f2ea]">Thoughtful Material Planning</h4>
              <p className="text-sm text-[#9aa3b2] leading-relaxed">
                Sourcing quality local lumber, durable hardware, sound insulation assemblies, and minimizing job-site waste.
              </p>
            </div>

            <div className="p-6 bg-[#11141c] border border-[#202634] rounded-sm space-y-3">
              <div className="w-10 h-10 rounded-sm bg-[#161b24] border border-[#273244] flex items-center justify-center text-[#c48255]">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-serif font-bold text-[#f5f2ea]">On-Site Accountability</h4>
              <p className="text-sm text-[#9aa3b2] leading-relaxed">
                Daily presence, careful quality inspection at every phase, clean job sites, and standing firmly behind the work.
              </p>
            </div>
          </div>
        </div>

        {/* ENDURING STANDARDS */}
        <div className="pt-12 border-t border-[#1c222e]">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-sans font-semibold tracking-[0.25em] uppercase text-[#c48255] block mb-2">
              BUILDING PHILOSOPHY
            </span>
            <h3 className="text-2xl sm:text-4xl font-serif font-bold tracking-tight uppercase text-[#f5f2ea]">
              ENDURING STANDARDS
            </h3>
            <p className="text-base text-[#9da6b4] mt-2 font-normal leading-relaxed">
              We prioritize building assemblies that endure Maine weather, age gracefully, and serve families and owners for generations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-[#11141c] border border-[#202634] rounded-sm space-y-3">
              <div className="w-10 h-10 rounded-sm bg-[#161b24] border border-[#273244] flex items-center justify-center text-[#c48255]">
                <CloudSnow className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-serif font-bold text-[#f5f2ea]">Maine Climate Resilience</h4>
              <p className="text-sm text-[#9aa3b2] leading-relaxed">
                Framing and roof geometries calculated for heavy snow loads, coastal wind drives, and aggressive freeze-thaw ground heave.
              </p>
            </div>

            <div className="p-6 bg-[#11141c] border border-[#202634] rounded-sm space-y-3">
              <div className="w-10 h-10 rounded-sm bg-[#161b24] border border-[#273244] flex items-center justify-center text-[#c48255]">
                <Droplets className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-serif font-bold text-[#f5f2ea]">Drainage &amp; Water Management</h4>
              <p className="text-sm text-[#9aa3b2] leading-relaxed">
                Water is the chief enemy of any structure. We build robust exterior water-shedding details, perimeter footing drains, and positive grade slopes.
              </p>
            </div>

            <div className="p-6 bg-[#11141c] border border-[#202634] rounded-sm space-y-3">
              <div className="w-10 h-10 rounded-sm bg-[#161b24] border border-[#273244] flex items-center justify-center text-[#c48255]">
                <HardHat className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-serif font-bold text-[#f5f2ea]">Proven Building Methods</h4>
              <p className="text-sm text-[#9aa3b2] leading-relaxed">
                Prioritizing time-tested construction details over fleeting cosmetic fads that fail within five years of Maine moisture.
              </p>
            </div>

            <div className="p-6 bg-[#11141c] border border-[#202634] rounded-sm space-y-3">
              <div className="w-10 h-10 rounded-sm bg-[#161b24] border border-[#273244] flex items-center justify-center text-[#c48255]">
                <Gauge className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-serif font-bold text-[#f5f2ea]">Sensible Energy Efficiency</h4>
              <p className="text-sm text-[#9aa3b2] leading-relaxed">
                Continuous air barriers, vapor control, dense insulation envelopes, and high-performance glazing without needlessly finicky systems.
              </p>
            </div>

            <div className="p-6 bg-[#11141c] border border-[#202634] rounded-sm space-y-3">
              <div className="w-10 h-10 rounded-sm bg-[#161b24] border border-[#273244] flex items-center justify-center text-[#c48255]">
                <Clock className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-serif font-bold text-[#f5f2ea]">Long-Term Usefulness</h4>
              <p className="text-sm text-[#9aa3b2] leading-relaxed">
                Designing adaptable floor layouts, service chases that allow future maintenance, and materials that can be repaired rather than replaced.
              </p>
            </div>

            <div className="p-6 bg-[#11141c] border border-[#202634] rounded-sm space-y-3">
              <div className="w-10 h-10 rounded-sm bg-[#161b24] border border-[#273244] flex items-center justify-center text-[#c48255]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-serif font-bold text-[#f5f2ea]">Local Trade Integrity</h4>
              <p className="text-sm text-[#9aa3b2] leading-relaxed">
                Respecting the craft, treating site workers fairly, honoring agreements, and building trust that lasts across decades of Maine projects.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
