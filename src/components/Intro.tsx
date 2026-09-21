/**
 * Dawnland Development V2 - Intro Component
 * Concise Dawnland introduction with CMS-controlled heading, paragraphs, image, and CTA
 */
import React from 'react';
import { IntroData, CMSState } from '../types';
import { getImageRecord } from '../services/cmsStorage';
import { DawnlandImage } from './DawnlandImage';
import { ArrowRight } from 'lucide-react';

interface IntroProps {
  introData: IntroData;
  cmsState: CMSState;
  onCtaClick?: () => void;
}

export const Intro: React.FC<IntroProps> = ({ introData, cmsState, onCtaClick }) => {
  if (!introData.visible) return null;

  const imageRecord = getImageRecord(cmsState, introData.imageId);

  return (
    <section
      id="dawnland-intro-section"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#0d0f12] text-[#edebe6] border-b border-[#1f2430]"
      aria-label="Dawnland Introduction"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Heading and Controlled Paragraphs */}
          <div className="lg:col-span-7 space-y-6">
            <span
              id="intro-eyebrow-text"
              className="text-xs font-sans font-semibold tracking-[0.2em] uppercase text-[#c48255] block"
            >
              {introData.eyebrow || 'CONSTRUCTION • LAND • COORDINATION'}
            </span>

            <h2
              id="intro-heading-text"
              className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold leading-[1.15] text-[#f5f2ea]"
            >
              {introData.heading}
            </h2>

            <div className="space-y-4 pt-2 text-[#c2c8d2] text-base sm:text-lg font-normal leading-relaxed">
              {introData.paragraphs.map((p, idx) => (
                <p key={idx} id={`intro-paragraph-${idx}`}>
                  {p}
                </p>
              ))}
            </div>

            {introData.ctaText && onCtaClick && (
              <div className="pt-4">
                <button
                  id="intro-cta-button"
                  onClick={onCtaClick}
                  className="group inline-flex items-center gap-3 text-xs font-sans font-semibold tracking-[0.18em] uppercase text-[#f5f2ea] hover:text-[#c48255] transition-colors"
                >
                  <span className="border-b border-[#c48255] pb-1">{introData.ctaText}</span>
                  <ArrowRight className="w-4 h-4 text-[#c48255] transform transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Architectural Supporting Image if configured */}
          {imageRecord && (
            <div className="lg:col-span-5">
              <div className="relative p-2.5 bg-[#141822] border border-[#273040] shadow-2xl">
                <DawnlandImage
                  id="intro-supporting-image"
                  image={imageRecord}
                  aspectRatio="4/3"
                  className="w-full grayscale hover:grayscale-0 transition-all duration-700"
                />
                <div className="pt-3 px-2 pb-1 flex items-center justify-between text-xs font-sans text-[#9da6b4]">
                  <span>{imageRecord.title}</span>
                  <span className="text-[#c48255]">Reference Graphic</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
