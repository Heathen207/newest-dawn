/**
 * Dawnland Development V2 - Global Architectural Header
 */
import React, { useState } from 'react';
import { WorldId, CMSState } from '../types';
import { DawnlandLogo } from './DawnlandLogo';
import { Settings2, Phone, Mail, MapPin, X, ArrowUpRight, Menu } from 'lucide-react';

interface HeaderProps {
  cmsState: CMSState;
  activeWorld: WorldId | null;
  onSelectWorld: (worldId: WorldId) => void;
  onGoHome: () => void;
  onOpenCMS: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cmsState,
  activeWorld,
  onSelectWorld,
  onGoHome,
  onOpenCMS,
}) => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const worlds: WorldId[] = ['BUILD', 'LAND', 'CREATE', 'CUSTOM', 'DAWNLAND'];
  const { company } = cmsState;

  return (
    <>
      <header
        id="dawnland-global-header"
        className="fixed top-0 left-0 right-0 z-40 bg-[#0d0f12]/85 backdrop-blur-md border-b border-[#222834]/80 transition-all duration-300"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo / Brand Anchor */}
          <DawnlandLogo
            onClick={onGoHome}
            size="md"
          />

          {/* Center: The Five Worlds (Conceptual Center) */}
          <nav
            id="header-five-worlds-nav"
            className="hidden md:flex items-center gap-1 lg:gap-2 px-3 py-1.5 rounded-full bg-[#131720]/80 border border-[#272f3e]/60"
            aria-label="Five Worlds Navigation"
          >
            {worlds.map((wId) => {
              const isActive = activeWorld === wId;
              return (
                <button
                  key={wId}
                  id={`nav-world-${wId.toLowerCase()}`}
                  onClick={() => onSelectWorld(wId)}
                  className={`relative px-3.5 py-1.5 text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-200 rounded-full select-none ${
                    isActive
                      ? 'text-[#f4f2ee] bg-[#c49a6c]/25 border border-[#c49a6c]/50 shadow-[0_0_12px_rgba(196,154,108,0.2)]'
                      : 'text-[#9ea3a8] hover:text-[#f4f2ee] hover:bg-white/[0.04]'
                  }`}
                >
                  {wId}
                </button>
              );
            })}
          </nav>

          {/* Right Action Cluster: Contact & CMS Studio */}
          <div className="flex items-center gap-3">
            <button
              id="header-contact-toggle-btn"
              onClick={() => setIsContactOpen(true)}
              className="text-xs font-medium tracking-widest uppercase px-3.5 py-2 rounded-sm border border-[#374151] text-[#d8d2c6] hover:text-white hover:border-[#c49a6c] transition-colors duration-200"
            >
              Inquire
            </button>

            <button
              id="header-open-cms-btn"
              onClick={onOpenCMS}
              title="Open CMS Studio (Live Edit Any Value)"
              className="group flex items-center gap-1.5 text-xs tracking-wider uppercase px-3 py-2 rounded-sm bg-[#1c222c] hover:bg-[#c48255]/20 text-[#a3abb8] hover:text-[#f5f2ea] border border-[#2c3545] transition-all duration-200"
            >
              <Settings2 className="w-3.5 h-3.5 text-[#c48255] group-hover:rotate-45 transition-transform duration-300" />
              <span className="hidden sm:inline font-sans text-xs font-semibold">CMS Studio</span>
            </button>

            {/* Mobile Hamburger */}
            <button
              id="header-mobile-menu-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-[#9ea3a8] hover:text-white"
              aria-label="Toggle Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMobileMenuOpen && (
          <div
            id="mobile-navigation-drawer"
            className="md:hidden bg-[#0e1117] border-b border-[#222834] px-6 py-5 flex flex-col gap-3"
          >
            <div className="text-xs tracking-[0.2em] uppercase text-[#9da6b4] font-sans font-semibold mb-1">
              Explore The Five Worlds
            </div>
            <div className="grid grid-cols-2 gap-2">
              {worlds.map((wId) => (
                <button
                  key={wId}
                  id={`mobile-nav-${wId.toLowerCase()}`}
                  onClick={() => {
                    onSelectWorld(wId);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-left px-3.5 py-2.5 rounded-sm border text-xs tracking-[0.15em] uppercase font-semibold transition-colors ${
                    activeWorld === wId
                      ? 'border-[#c48255] text-[#f5f2ea] bg-[#c48255]/15'
                      : 'border-[#222834] text-[#a3abb8] hover:text-white bg-[#141822]'
                  }`}
                >
                  {wId}
                </button>
              ))}
            </div>
            <button
              id="mobile-inquire-btn"
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsContactOpen(true);
              }}
              className="mt-2 w-full py-2.5 text-center text-xs font-sans font-semibold tracking-widest uppercase border border-[#c48255] text-[#f5f2ea] bg-[#c48255]/10 rounded-sm"
            >
              Contact Studio
            </button>
          </div>
        )}
      </header>

      {/* Global Inquire & Contact Overlay (CMS-Driven) */}
      {isContactOpen && (
        <div
          id="contact-overlay-backdrop"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={() => setIsContactOpen(false)}
        >
          <div
            id="contact-overlay-card"
            className="relative w-full max-w-lg bg-[#12161f] border border-[#2b3445] p-6 sm:p-8 shadow-2xl text-[#edebe6] animate-in fade-in zoom-in-95 duration-200 rounded-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              id="contact-overlay-close-btn"
              onClick={() => setIsContactOpen(false)}
              className="absolute top-5 right-5 p-1.5 text-[#8892a0] hover:text-white transition-colors"
              aria-label="Close Contact"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="text-xs font-sans font-semibold tracking-[0.2em] text-[#c48255] uppercase block mb-1">
                DAWNLAND DIRECTORY
              </span>
              <h2 className="text-2xl font-serif tracking-tight font-bold text-[#f5f2ea]">
                Connect With Dawnland
              </h2>
              <p className="text-sm text-[#b0b8c4] mt-2 font-normal leading-relaxed">
                Consultations for construction, property development, land planning, and project coordination across Maine.
              </p>
            </div>

            <div className="space-y-4 border-t border-[#222938] pt-5">
              <div className="flex items-start gap-3 text-sm">
                <MapPin className="w-4 h-4 text-[#c48255] shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs uppercase tracking-wider text-[#9da6b4] font-semibold">Location &amp; Region</div>
                  <div className="text-[#f5f2ea] mt-0.5">{company.location}</div>
                  <div className="text-xs text-[#8e95a0]">{company.address}</div>
                </div>
              </div>

              <div className="flex items-start gap-3 text-sm">
                <Mail className="w-4 h-4 text-[#c48255] shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs uppercase tracking-wider text-[#9da6b4] font-semibold">Direct Email</div>
                  <div className="text-[#f5f2ea] mt-0.5 font-sans text-xs">{company.email}</div>
                </div>
              </div>

              <div className="flex items-start gap-3 text-sm">
                <Phone className="w-4 h-4 text-[#c48255] shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs uppercase tracking-wider text-[#9da6b4] font-semibold">Telephone</div>
                  <div className="text-[#f5f2ea] mt-0.5 font-sans text-xs">{company.phone}</div>
                </div>
              </div>

              <div className="border-t border-[#222938] pt-4 mt-4">
                <div className="text-xs uppercase tracking-wider text-[#9da6b4] font-semibold mb-2">Hours &amp; Availability</div>
                <div className="text-xs text-[#b8bfc9]">{company.hours}</div>
              </div>
            </div>

            <div className="mt-7 pt-4 border-t border-[#222938] flex items-center justify-between">
              <button
                id="contact-manage-in-cms-btn"
                onClick={() => {
                  setIsContactOpen(false);
                  onOpenCMS();
                }}
                className="text-xs font-sans text-[#c48255] hover:underline flex items-center gap-1 font-semibold"
              >
                <span>Edit contact info in CMS</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

              <button
                id="contact-close-action-btn"
                onClick={() => setIsContactOpen(false)}
                className="px-4 py-1.5 text-xs uppercase tracking-widest bg-[#1c222c] hover:bg-[#252e3d] text-white border border-[#323d50] rounded-sm"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
