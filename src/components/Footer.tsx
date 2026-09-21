/**
 * Dawnland Development V2 - Global Architectural Footer
 */
import React from 'react';
import { WorldId, CMSState } from '../types';
import { DawnlandLogo } from './DawnlandLogo';
import { MapPin, Mail, Phone, ArrowUpRight, Settings2 } from 'lucide-react';

interface FooterProps {
  cmsState: CMSState;
  onSelectWorld: (worldId: WorldId) => void;
  onGoHome: () => void;
  onOpenCMS: () => void;
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  cmsState,
  onSelectWorld,
  onGoHome,
  onOpenCMS,
  onOpenContact,
}) => {
  const { company } = cmsState;
  const worlds: WorldId[] = ['BUILD', 'LAND', 'CREATE', 'CUSTOM', 'DAWNLAND'];

  return (
    <footer
      id="dawnland-global-footer"
      className="bg-[#090b0e] text-[#edebe6] border-t border-[#1a1f2b] pt-16 pb-12 px-4 sm:px-6 lg:px-8 select-none"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[#1b212d]">
          {/* Col 1: Brand & Identity */}
          <div className="md:col-span-5 space-y-4">
            <DawnlandLogo onClick={onGoHome} size="lg" />
            <p className="text-sm text-[#9da6b4] font-normal max-w-sm leading-relaxed mt-4">
              {company.tagline}
            </p>
            <div className="text-xs font-sans text-[#7a828e] pt-2 font-medium">
              FIVE INTERSECTING WORLDS: BUILD • LAND • CREATE • CUSTOM • DAWNLAND
            </div>
          </div>

          {/* Col 2: The Five Worlds */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-xs font-sans font-semibold tracking-[0.2em] text-[#c48255] uppercase block">
              THE FIVE WORLDS
            </span>
            <ul className="space-y-2">
              {worlds.map((wId) => (
                <li key={wId}>
                  <button
                    onClick={() => onSelectWorld(wId)}
                    className="text-xs font-sans font-medium tracking-wider uppercase text-[#b0b8c4] hover:text-[#c48255] transition-colors flex items-center gap-1.5"
                  >
                    <span>{wId}</span>
                    <ArrowUpRight className="w-3 h-3 text-[#7a828e]" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Direct Inquiries & Studio */}
          <div className="md:col-span-4 space-y-3">
            <span className="text-xs font-sans font-semibold tracking-[0.2em] text-[#c48255] uppercase block">
              STUDIO CONTACT &amp; REGION
            </span>
            <div className="space-y-2.5 text-xs text-[#9da6b4] font-normal">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#c48255] shrink-0 mt-0.5" />
                <span>{company.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#c48255] shrink-0" />
                <span className="font-sans text-xs">{company.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#c48255] shrink-0" />
                <span className="font-sans text-xs">{company.phone}</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-2">
              <button
                onClick={onOpenContact}
                className="px-4 py-2 bg-[#161a24] hover:bg-[#202735] border border-[#2b3547] text-xs font-sans font-semibold uppercase tracking-wider text-white transition-colors rounded-sm"
              >
                Inquire With Studio
              </button>

              <button
                onClick={onOpenCMS}
                className="px-3 py-2 bg-[#161a24] hover:bg-[#c48255]/20 border border-[#2b3547] text-xs font-sans font-semibold uppercase tracking-wider text-[#c48255] flex items-center gap-1.5 transition-colors rounded-sm"
              >
                <Settings2 className="w-3 h-3" />
                <span>CMS Studio</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-[#7a828e]">
          <div>
            © {new Date().getFullYear()} DAWNLAND DEVELOPMENT. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span>MAINE &amp; NORTHERN NEW ENGLAND</span>
            <span>•</span>
            <button onClick={onOpenCMS} className="hover:text-[#c48255] transition-colors">
              CMS ENGINE V3
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
