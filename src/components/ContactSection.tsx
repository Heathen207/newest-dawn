/**
 * Dawnland Development V2 - Homepage Contact Section
 * Final step in homepage sequence: Hero -> Orientation -> Cliff Notes -> Five Worlds -> Real Work -> Contact
 * Connects prospective clients directly with Heath Titcomb and Dawnland Development.
 */
import React, { useState } from 'react';
import { CompanyData, WorldId } from '../types';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, ArrowRight } from 'lucide-react';

interface ContactSectionProps {
  company: CompanyData;
  onSelectWorld?: (worldId: WorldId) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ company, onSelectWorld }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    domain: 'BUILD' as WorldId | 'GENERAL',
    parcelDetails: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#0c0f14] border-b border-[#1f2533] text-[#edebe6]"
      aria-label="Contact and Project Inquiries"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-sans font-semibold tracking-[0.25em] uppercase text-[#c48255] block mb-2">
            START A PROJECT
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight uppercase text-[#f5f2ea]">
            HAVE A PROPERTY, PROJECT, OR IDEA?
          </h2>
          <p className="text-base sm:text-lg text-[#9da6b4] mt-3 font-normal leading-relaxed">
            Explain what you are trying to accomplish, where your parcel or structure is located in Maine, and what stage you are currently in. We welcome direct, practical project discussions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Coordinates & Heath Titcomb Lead */}
          <div className="lg:col-span-5 space-y-8">
            {/* Heath Titcomb Leadership Card */}
            <div className="p-6 bg-[#131720] border border-[#242c3b] rounded-sm">
              <div className="text-xs font-sans font-semibold tracking-wider uppercase text-[#c48255] mb-1">
                PROJECT LEADERSHIP
              </div>
              <h3 className="text-2xl font-serif font-bold text-[#f5f2ea]">
                Heath Titcomb
              </h3>
              <p className="text-sm font-sans text-[#c48255] font-medium">
                Principal &amp; Project Lead
              </p>
              <p className="text-sm text-[#b0b8c4] mt-3 leading-relaxed">
                Directing construction execution, property development, site planning, and trade coordination across Maine.
              </p>
            </div>

            {/* Direct Coordinates */}
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-4 p-4 bg-[#131720] border border-[#202634] rounded-sm">
                <MapPin className="w-5 h-5 text-[#c48255] shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-sans font-semibold uppercase text-[#9da6b4] tracking-wider">
                    Service Region
                  </div>
                  <div className="text-base text-[#f5f2ea] font-medium mt-0.5">
                    {company.location}
                  </div>
                  <div className="text-xs text-[#7a828e] mt-0.5">{company.address}</div>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-[#131720] border border-[#202634] rounded-sm">
                <Mail className="w-5 h-5 text-[#c48255] shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-sans font-semibold uppercase text-[#9da6b4] tracking-wider">
                    Direct Email
                  </div>
                  <a
                    href={`mailto:${company.email}`}
                    className="text-base text-[#f5f2ea] hover:text-[#c48255] font-medium mt-0.5 block transition-colors"
                  >
                    {company.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-[#131720] border border-[#202634] rounded-sm">
                <Phone className="w-5 h-5 text-[#c48255] shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-sans font-semibold uppercase text-[#9da6b4] tracking-wider">
                    Telephone
                  </div>
                  <a
                    href={`tel:${company.phone}`}
                    className="text-base text-[#f5f2ea] hover:text-[#c48255] font-medium mt-0.5 block transition-colors"
                  >
                    {company.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-[#131720] border border-[#202634] rounded-sm">
                <Clock className="w-5 h-5 text-[#c48255] shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-sans font-semibold uppercase text-[#9da6b4] tracking-wider">
                    Availability
                  </div>
                  <div className="text-sm text-[#f5f2ea] font-medium mt-0.5">
                    {company.hours}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Project Consultation Inquiry Form */}
          <div className="lg:col-span-7 bg-[#131720] border border-[#242c3b] p-8 sm:p-10 rounded-sm">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#18261e] border border-[#2a4533] flex items-center justify-center text-[#4b6352] mx-auto">
                  <CheckCircle2 className="w-8 h-8 text-[#4b6352]" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-[#f5f2ea]">
                  Inquiry Received
                </h3>
                <p className="text-base text-[#9da6b4] max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out. Heath Titcomb will review your project parameters and contact you directly to discuss site review and next steps.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: '',
                      email: '',
                      phone: '',
                      domain: 'BUILD',
                      parcelDetails: '',
                      message: '',
                    });
                  }}
                  className="mt-6 px-6 py-2.5 bg-[#1a202c] hover:bg-[#252d3d] text-xs font-sans font-semibold uppercase tracking-wider text-[#c48255] transition-colors rounded-sm"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="border-b border-[#202634] pb-4 mb-2">
                  <h3 className="text-xl font-serif font-bold text-[#f5f2ea]">
                    Consultation &amp; Project Intake
                  </h3>
                  <p className="text-xs text-[#9da6b4] mt-1">
                    Please share your project timeline, location, and the primary focus of your inquiry.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-sans font-semibold tracking-wider uppercase text-[#9da6b4] mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full px-4 py-3 bg-[#181d28] border border-[#2b3546] focus:border-[#c48255] text-sm text-[#f5f2ea] placeholder-[#606978] outline-none rounded-sm transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-sans font-semibold tracking-wider uppercase text-[#9da6b4] mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@example.com"
                      className="w-full px-4 py-3 bg-[#181d28] border border-[#2b3546] focus:border-[#c48255] text-sm text-[#f5f2ea] placeholder-[#606978] outline-none rounded-sm transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-sans font-semibold tracking-wider uppercase text-[#9da6b4] mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="(207) 555-0100"
                      className="w-full px-4 py-3 bg-[#181d28] border border-[#2b3546] focus:border-[#c48255] text-sm text-[#f5f2ea] placeholder-[#606978] outline-none rounded-sm transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-sans font-semibold tracking-wider uppercase text-[#9da6b4] mb-2">
                      Primary Project Lens
                    </label>
                    <select
                      value={formData.domain}
                      onChange={(e) => setFormData({ ...formData, domain: e.target.value as any })}
                      className="w-full px-4 py-3 bg-[#181d28] border border-[#2b3546] focus:border-[#c48255] text-sm text-[#f5f2ea] outline-none rounded-sm transition-colors"
                    >
                      <option value="BUILD">BUILD — Physical Construction &amp; Repair</option>
                      <option value="LAND">LAND — Site Feasibility &amp; Parcel Planning</option>
                      <option value="CREATE">CREATE — Specialty Structure &amp; Fabrication</option>
                      <option value="CUSTOM">CUSTOM — Custom Home &amp; Build-to-Suit</option>
                      <option value="DAWNLAND">DAWNLAND — General Consultation &amp; Trade</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-sans font-semibold tracking-wider uppercase text-[#9da6b4] mb-2">
                    Property Location or Town in Maine
                  </label>
                  <input
                    type="text"
                    value={formData.parcelDetails}
                    onChange={(e) => setFormData({ ...formData, parcelDetails: e.target.value })}
                    placeholder="e.g. Camden, Belfast, Penobscot Region, Midcoast Maine"
                    className="w-full px-4 py-3 bg-[#181d28] border border-[#2b3546] focus:border-[#c48255] text-sm text-[#f5f2ea] placeholder-[#606978] outline-none rounded-sm transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-sans font-semibold tracking-wider uppercase text-[#9da6b4] mb-2">
                    Project Scope &amp; Details *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your site, construction needs, architectural vision, or trade coordination requirements..."
                    className="w-full px-4 py-3 bg-[#181d28] border border-[#2b3546] focus:border-[#c48255] text-sm text-[#f5f2ea] placeholder-[#606978] outline-none rounded-sm transition-colors resize-y"
                  />
                </div>

                <button
                  id="start-a-project-btn"
                  type="submit"
                  className="w-full py-4 px-6 bg-[#f5f2ea] hover:bg-[#c48255] text-[#12151a] text-xs font-sans font-bold tracking-[0.2em] uppercase transition-all duration-300 flex items-center justify-center gap-2 rounded-sm"
                >
                  <span>START A PROJECT</span>
                  <Send className="w-4 h-4 text-[#12151a]" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
