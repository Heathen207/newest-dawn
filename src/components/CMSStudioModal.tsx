/**
 * Dawnland Development V2 - CMS Studio Modal
 * Full live editing suite satisfying Sections 20, 53, 54:
 * - Real-time editing of Company data, Navigation, Homepage, 5 Worlds, Projects, and Media Assets
 * - Live image upload simulator/pipeline creating persistent ImageRecords with width, height, mime, size
 * - Focal point selector ('center', 'top', 'bottom', 'left', 'right')
 * - Instant live preview reflection without reloading or touching code
 * - JSON Export, Import, and Reset to Factory Defaults
 */
import React, { useState, useRef } from 'react';
import {
  CMSState,
  WorldId,
  ImageRecord,
  ImageRole,
  FocalPoint,
  ProjectRecord,
  PackageTier,
  PreDesignedPathway,
  PackageDefinition,
  VanillaBoxSpecs,
} from '../types';
import { processImageUpload } from '../services/cmsStorage';
import { INITIAL_PACKAGES } from '../data/initialData';
import { DawnlandImage } from './DawnlandImage';
import {
  X,
  Save,
  RotateCcw,
  Download,
  Upload,
  Image as ImageIcon,
  Building,
  Home,
  Layers,
  FolderKanban,
  FileText,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Eye,
  Sliders,
} from 'lucide-react';

interface CMSStudioModalProps {
  cmsState: CMSState;
  onUpdateState: (newState: CMSState) => void;
  onResetDefaults: () => void;
  onClose: () => void;
}

export const CMSStudioModal: React.FC<CMSStudioModalProps> = ({
  cmsState,
  onUpdateState,
  onResetDefaults,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'homepage' | 'worlds' | 'projects' | 'planning' | 'media' | 'company'>('homepage');
  const [selectedWorldId, setSelectedWorldId] = useState<WorldId>('BUILD');
  const [selectedProjectId, setSelectedProjectId] = useState<string>(cmsState.projects[0]?.id || '');
  const [planningSubTab, setPlanningSubTab] = useState<'packages' | 'project-planning'>('packages');
  const [selectedPlanningProjectId, setSelectedPlanningProjectId] = useState<string>(cmsState.projects[0]?.id || '');
  const [saveToast, setSaveToast] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const triggerSaveNotification = () => {
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
  };

  // Generic updater
  const updateCMS = (updater: (draft: CMSState) => void) => {
    const clone: CMSState = JSON.parse(JSON.stringify(cmsState));
    updater(clone);
    onUpdateState(clone);
    triggerSaveNotification();
  };

  // Image upload handler
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploadError(null);

    try {
      const file = files[0];
      const newRecord = await processImageUpload(file, 'FEATURE', 'center');
      updateCMS((draft) => {
        draft.images.unshift(newRecord);
      });
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (err: unknown) {
      if (err instanceof Error) {
        setUploadError(err.message);
      } else {
        setUploadError('Failed to process image upload.');
      }
    }
  };

  // JSON Export / Import
  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(cmsState, null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute('href', dataStr);
    dlAnchor.setAttribute('download', 'dawnland_cms_export.json');
    dlAnchor.click();
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.worlds && parsed.homepage) {
          onUpdateState(parsed);
          triggerSaveNotification();
        }
      } catch {
        alert('Invalid JSON file format.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div
      id="cms-studio-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-6"
    >
      <div
        id="cms-studio-container"
        className="w-full max-w-6xl h-[94vh] bg-[#0d0f14] border border-[#2b3345] shadow-2xl flex flex-col overflow-hidden text-[#edebe6]"
      >
        {/* Top Header Bar */}
        <div className="bg-[#121620] px-6 py-4 border-b border-[#252d3d] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h2 className="text-base font-['Syne',sans-serif] font-bold tracking-wider uppercase text-[#f4f2ee]">
              DAWNLAND CMS STUDIO (LIVE ENGINE)
            </h2>
            <span className="text-xs font-sans text-[#788291] hidden sm:inline">
              • Instant Frontend Reflection
            </span>
          </div>

          <div className="flex items-center gap-2">
            {saveToast && (
              <span className="text-xs font-sans text-emerald-400 bg-emerald-950/80 border border-emerald-700/60 px-2.5 py-1 flex items-center gap-1.5 animate-in fade-in">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Live State Synced</span>
              </span>
            )}

            <button
              onClick={handleExportJSON}
              title="Export state to JSON"
              className="p-2 text-xs font-sans border border-[#2b3547] bg-[#161c28] hover:bg-[#202838] text-[#a3abb8] hover:text-white"
            >
              <Download className="w-4 h-4" />
            </button>

            <label
              title="Import state from JSON"
              className="p-2 text-xs font-sans border border-[#2b3547] bg-[#161c28] hover:bg-[#202838] text-[#a3abb8] hover:text-white cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
            </label>

            <button
              onClick={() => {
                if (confirm('Reset all CMS content back to factory defaults?')) {
                  onResetDefaults();
                  triggerSaveNotification();
                }
              }}
              title="Reset to factory seed"
              className="p-2 text-xs font-sans border border-red-900/50 bg-red-950/30 hover:bg-red-900/40 text-red-300"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-2 text-[#8e95a0] hover:text-white bg-[#191f2c] border border-[#2b3445]"
              aria-label="Close CMS Studio"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-[#0e1118] px-6 border-b border-[#202737] flex items-center gap-2 sm:gap-6 overflow-x-auto">
          <button
            onClick={() => setActiveTab('homepage')}
            className={`py-3.5 text-xs font-sans uppercase tracking-wider border-b-2 flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'homepage'
                ? 'border-[#c49a6c] text-[#f4f2ee]'
                : 'border-transparent text-[#788291] hover:text-[#d8d2c6]'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>Homepage & Hero</span>
          </button>

          <button
            onClick={() => setActiveTab('worlds')}
            className={`py-3.5 text-xs font-sans uppercase tracking-wider border-b-2 flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'worlds'
                ? 'border-[#c49a6c] text-[#f4f2ee]'
                : 'border-transparent text-[#788291] hover:text-[#d8d2c6]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Five Worlds</span>
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`py-3.5 text-xs font-sans uppercase tracking-wider border-b-2 flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'projects'
                ? 'border-[#c49a6c] text-[#f4f2ee]'
                : 'border-transparent text-[#788291] hover:text-[#d8d2c6]'
            }`}
          >
            <FolderKanban className="w-3.5 h-3.5" />
            <span>Projects &amp; Opportunities</span>
          </button>

          <button
            onClick={() => setActiveTab('planning')}
            className={`py-3.5 text-xs font-sans uppercase tracking-wider border-b-2 flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'planning'
                ? 'border-[#c49a6c] text-[#f4f2ee]'
                : 'border-transparent text-[#788291] hover:text-[#d8d2c6]'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Packages &amp; Planning</span>
          </button>

          <button
            onClick={() => setActiveTab('media')}
            className={`py-3.5 text-xs font-sans uppercase tracking-wider border-b-2 flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'media'
                ? 'border-[#c49a6c] text-[#f4f2ee]'
                : 'border-transparent text-[#788291] hover:text-[#d8d2c6]'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Media Library & Blob</span>
          </button>

          <button
            onClick={() => setActiveTab('company')}
            className={`py-3.5 text-xs font-sans uppercase tracking-wider border-b-2 flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'company'
                ? 'border-[#c49a6c] text-[#f4f2ee]'
                : 'border-transparent text-[#788291] hover:text-[#d8d2c6]'
            }`}
          >
            <Building className="w-3.5 h-3.5" />
            <span>Company & Inquiries</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 bg-[#0a0c10]">
          {/* TAB 1: HOMEPAGE */}
          {activeTab === 'homepage' && (
            <div className="max-w-4xl space-y-8">
              {/* Hero Settings */}
              <div className="p-6 bg-[#11141c] border border-[#252d3e] space-y-4">
                <h3 className="text-sm font-sans tracking-widest uppercase text-[#c49a6c] border-b border-[#222938] pb-2">
                  HERO SECTION SETTINGS
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-sans text-[#8e95a0] mb-1">
                      Main Heading
                    </label>
                    <input
                      type="text"
                      value={cmsState.homepage.hero.heading}
                      onChange={(e) =>
                        updateCMS((draft) => {
                          draft.homepage.hero.heading = e.target.value;
                        })
                      }
                      className="w-full bg-[#181d28] border border-[#2d374a] px-3 py-2 text-sm text-white focus:border-[#c49a6c] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-sans text-[#8e95a0] mb-1">
                      Hero Primary Image
                    </label>
                    <select
                      value={cmsState.homepage.hero.imageId}
                      onChange={(e) =>
                        updateCMS((draft) => {
                          draft.homepage.hero.imageId = e.target.value;
                        })
                      }
                      className="w-full bg-[#181d28] border border-[#2d374a] px-3 py-2 text-sm text-white focus:border-[#c49a6c] outline-none"
                    >
                      {cmsState.images.map((img) => (
                        <option key={img.id} value={img.id}>
                          {img.filename} ({img.role})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-sans text-[#8e95a0] mb-1">
                    Hero Subheading / Tagline
                  </label>
                  <textarea
                    rows={2}
                    value={cmsState.homepage.hero.subheading}
                    onChange={(e) =>
                      updateCMS((draft) => {
                        draft.homepage.hero.subheading = e.target.value;
                      })
                    }
                    className="w-full bg-[#181d28] border border-[#2d374a] px-3 py-2 text-sm text-white focus:border-[#c49a6c] outline-none"
                  />
                </div>
              </div>

              {/* Intro Section Settings */}
              <div className="p-6 bg-[#11141c] border border-[#252d3e] space-y-4">
                <h3 className="text-sm font-sans tracking-widest uppercase text-[#c49a6c] border-b border-[#222938] pb-2">
                  CONCISE INTRO SECTION
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-sans text-[#8e95a0] mb-1">Eyebrow</label>
                    <input
                      type="text"
                      value={cmsState.homepage.intro.eyebrow}
                      onChange={(e) =>
                        updateCMS((draft) => {
                          draft.homepage.intro.eyebrow = e.target.value;
                        })
                      }
                      className="w-full bg-[#181d28] border border-[#2d374a] px-3 py-2 text-sm text-white focus:border-[#c49a6c] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-sans text-[#8e95a0] mb-1">Heading</label>
                    <input
                      type="text"
                      value={cmsState.homepage.intro.heading}
                      onChange={(e) =>
                        updateCMS((draft) => {
                          draft.homepage.intro.heading = e.target.value;
                        })
                      }
                      className="w-full bg-[#181d28] border border-[#2d374a] px-3 py-2 text-sm text-white focus:border-[#c49a6c] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-sans text-[#8e95a0] mb-1">
                    First Paragraph
                  </label>
                  <textarea
                    rows={3}
                    value={cmsState.homepage.intro.paragraphs[0] || ''}
                    onChange={(e) =>
                      updateCMS((draft) => {
                        draft.homepage.intro.paragraphs[0] = e.target.value;
                      })
                    }
                    className="w-full bg-[#181d28] border border-[#2d374a] px-3 py-2 text-sm text-white focus:border-[#c49a6c] outline-none"
                  />
                </div>
              </div>

              {/* Cliff Notes Settings */}
              <div className="p-6 bg-[#11141c] border border-[#252d3e] space-y-4">
                <h3 className="text-sm font-sans tracking-widest uppercase text-[#c49a6c] border-b border-[#222938] pb-2">
                  THE CLIFF NOTES (ORIENTATION ENGINE)
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-sans text-[#8e95a0] mb-1">Title</label>
                    <input
                      type="text"
                      value={cmsState.homepage.cliffNotes.title}
                      onChange={(e) =>
                        updateCMS((draft) => {
                          draft.homepage.cliffNotes.title = e.target.value;
                        })
                      }
                      className="w-full bg-[#181d28] border border-[#2d374a] px-3 py-2 text-sm text-white focus:border-[#c49a6c] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-sans text-[#8e95a0] mb-1">Subtitle</label>
                    <input
                      type="text"
                      value={cmsState.homepage.cliffNotes.subtitle}
                      onChange={(e) =>
                        updateCMS((draft) => {
                          draft.homepage.cliffNotes.subtitle = e.target.value;
                        })
                      }
                      className="w-full bg-[#181d28] border border-[#2d374a] px-3 py-2 text-sm text-white focus:border-[#c49a6c] outline-none"
                    />
                  </div>
                </div>

                {/* 4 Cliff Notes Items */}
                <div className="space-y-4 pt-2">
                  {cmsState.homepage.cliffNotes.items.map((item, idx) => (
                    <div key={item.id} className="p-3 bg-[#161a24] border border-[#252e3e] space-y-2">
                      <div className="flex items-center justify-between text-xs font-sans text-[#c49a6c]">
                        <span>STEP {item.stepNumber}: {item.prompt}</span>
                        <span>TARGET: {item.targetWorld}</span>
                      </div>
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) =>
                          updateCMS((draft) => {
                            draft.homepage.cliffNotes.items[idx].title = e.target.value;
                          })
                        }
                        className="w-full bg-[#1d2331] border border-[#2d384c] px-2.5 py-1.5 text-xs text-white outline-none"
                      />
                      <textarea
                        rows={2}
                        value={item.summary}
                        onChange={(e) =>
                          updateCMS((draft) => {
                            draft.homepage.cliffNotes.items[idx].summary = e.target.value;
                          })
                        }
                        className="w-full bg-[#1d2331] border border-[#2d384c] px-2.5 py-1.5 text-xs text-[#a3abb8] outline-none"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: FIVE WORLDS */}
          {activeTab === 'worlds' && (
            <div className="max-w-4xl space-y-6">
              {/* World Selector Strip */}
              <div className="flex gap-2 border-b border-[#222938] pb-4">
                {(['BUILD', 'LAND', 'CREATE', 'CUSTOM', 'DAWNLAND'] as WorldId[]).map((wId) => (
                  <button
                    key={wId}
                    onClick={() => setSelectedWorldId(wId)}
                    className={`px-4 py-2 text-xs font-sans uppercase tracking-wider font-semibold border ${
                      selectedWorldId === wId
                        ? 'border-[#c49a6c] bg-[#1c222f] text-white'
                        : 'border-[#252e3d] bg-[#11141c] text-[#788291] hover:text-white'
                    }`}
                  >
                    {wId}
                  </button>
                ))}
              </div>

              {/* World Editor Card */}
              {(() => {
                const world = cmsState.worlds[selectedWorldId];
                return (
                  <div className="p-6 bg-[#11141c] border border-[#252d3e] space-y-6">
                    <div className="flex items-center justify-between border-b border-[#222938] pb-3">
                      <div>
                        <span className="text-xs font-sans text-[#c49a6c] uppercase tracking-widest block">
                          EDITING WORLD
                        </span>
                        <h3 className="text-xl font-bold font-['Syne',sans-serif] text-white">
                          {world.name}
                        </h3>
                      </div>
                      <div className="text-xs font-sans text-[#788291]">
                        Hero Asset: {world.heroImageId}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-sans text-[#8e95a0] mb-1">Tagline</label>
                        <input
                          type="text"
                          value={world.tagline}
                          onChange={(e) =>
                            updateCMS((draft) => {
                              draft.worlds[selectedWorldId].tagline = e.target.value;
                            })
                          }
                          className="w-full bg-[#181d28] border border-[#2d374a] px-3 py-2 text-sm text-white focus:border-[#c49a6c] outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-sans text-[#8e95a0] mb-1">
                          Hero Image Selector
                        </label>
                        <select
                          value={world.heroImageId}
                          onChange={(e) =>
                            updateCMS((draft) => {
                              draft.worlds[selectedWorldId].heroImageId = e.target.value;
                            })
                          }
                          className="w-full bg-[#181d28] border border-[#2d374a] px-3 py-2 text-sm text-white focus:border-[#c49a6c] outline-none"
                        >
                          {cmsState.images.map((img) => (
                            <option key={img.id} value={img.id}>
                              {img.filename} ({img.role})
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-sans text-[#8e95a0] mb-1">Headline</label>
                      <input
                        type="text"
                        value={world.headline}
                        onChange={(e) =>
                          updateCMS((draft) => {
                            draft.worlds[selectedWorldId].headline = e.target.value;
                          })
                        }
                        className="w-full bg-[#181d28] border border-[#2d374a] px-3 py-2 text-sm text-white focus:border-[#c49a6c] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-sans text-[#8e95a0] mb-1">Description</label>
                      <textarea
                        rows={3}
                        value={world.description}
                        onChange={(e) =>
                          updateCMS((draft) => {
                            draft.worlds[selectedWorldId].description = e.target.value;
                          })
                        }
                        className="w-full bg-[#181d28] border border-[#2d374a] px-3 py-2 text-sm text-white focus:border-[#c49a6c] outline-none"
                      />
                    </div>

                    {/* Contextual Realtor and Financing Notes */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div className="p-4 bg-[#161a24] border border-[#252e3e] space-y-2">
                        <div className="text-xs font-sans text-[#c49a6c] uppercase tracking-wider">
                          Contextual Realtor Note
                        </div>
                        <input
                          type="text"
                          value={world.realtorNote?.heading || ''}
                          onChange={(e) =>
                            updateCMS((draft) => {
                              if (!draft.worlds[selectedWorldId].realtorNote) {
                                draft.worlds[selectedWorldId].realtorNote = { heading: '', text: '', visible: true };
                              }
                              draft.worlds[selectedWorldId].realtorNote!.heading = e.target.value;
                            })
                          }
                          placeholder="Heading..."
                          className="w-full bg-[#1c2230] border border-[#2c3648] px-2.5 py-1.5 text-xs text-white outline-none"
                        />
                        <textarea
                          rows={3}
                          value={world.realtorNote?.text || ''}
                          onChange={(e) =>
                            updateCMS((draft) => {
                              if (!draft.worlds[selectedWorldId].realtorNote) {
                                draft.worlds[selectedWorldId].realtorNote = { heading: '', text: '', visible: true };
                              }
                              draft.worlds[selectedWorldId].realtorNote!.text = e.target.value;
                            })
                          }
                          placeholder="Text..."
                          className="w-full bg-[#1c2230] border border-[#2c3648] px-2.5 py-1.5 text-xs text-[#a3abb8] outline-none"
                        />
                      </div>

                      <div className="p-4 bg-[#161a24] border border-[#252e3e] space-y-2">
                        <div className="text-xs font-sans text-[#c49a6c] uppercase tracking-wider">
                          Contextual Financing Note
                        </div>
                        <input
                          type="text"
                          value={world.financingNote?.heading || ''}
                          onChange={(e) =>
                            updateCMS((draft) => {
                              if (!draft.worlds[selectedWorldId].financingNote) {
                                draft.worlds[selectedWorldId].financingNote = { heading: '', text: '', visible: true };
                              }
                              draft.worlds[selectedWorldId].financingNote!.heading = e.target.value;
                            })
                          }
                          placeholder="Heading..."
                          className="w-full bg-[#1c2230] border border-[#2c3648] px-2.5 py-1.5 text-xs text-white outline-none"
                        />
                        <textarea
                          rows={3}
                          value={world.financingNote?.text || ''}
                          onChange={(e) =>
                            updateCMS((draft) => {
                              if (!draft.worlds[selectedWorldId].financingNote) {
                                draft.worlds[selectedWorldId].financingNote = { heading: '', text: '', visible: true };
                              }
                              draft.worlds[selectedWorldId].financingNote!.text = e.target.value;
                            })
                          }
                          placeholder="Text..."
                          className="w-full bg-[#1c2230] border border-[#2c3648] px-2.5 py-1.5 text-xs text-[#a3abb8] outline-none"
                        />
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* TAB 3: PROJECTS */}
          {activeTab === 'projects' && (
            <div className="max-w-4xl space-y-6">
              <div className="flex items-center justify-between border-b border-[#222938] pb-4">
                <div className="flex items-center gap-2 overflow-x-auto">
                  {cmsState.projects.map((proj) => (
                    <button
                      key={proj.id}
                      onClick={() => setSelectedProjectId(proj.id)}
                      className={`px-3 py-1.5 text-xs font-sans border whitespace-nowrap ${
                        selectedProjectId === proj.id
                          ? 'border-[#c49a6c] bg-[#1a202c] text-white'
                          : 'border-[#222938] bg-[#11141c] text-[#788291] hover:text-white'
                      }`}
                    >
                      {proj.title}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => {
                    const newId = 'proj-' + Date.now();
                    const newProj: ProjectRecord = {
                      id: newId,
                      title: 'New Architectural Opportunity',
                      location: 'Maine Coast',
                      status: 'Opportunity',
                      description: 'Comprehensive project narrative and scope description.',
                      projectType: 'Architectural Exploration',
                      relatedWorlds: ['BUILD', 'LAND'],
                      primaryImageId: 'img-hero-primary',
                      galleryImageIds: ['img-hero-primary'],
                      images: {
                        primaryImageId: 'img-hero-primary',
                        galleryImageIds: ['img-hero-primary'],
                      },
                      documents: [],
                      property: {
                        parcelInfo: 'Maine Coastal Lot',
                        parcelSize: { value: 1.5, unit: 'Acres' },
                        zoning: 'Rural Residential',
                        terrainSlope: 'Gentle slope to granite outcropping',
                        ledgeConditions: 'Exposed surface granite',
                        solarOrientation: 'South-facing passive exposure',
                        accessCorridor: 'Gravel driveway corridor',
                        utilitiesLogistics: 'Private drilled well & on-site septic required',
                      },
                      existingConditions: {
                        hasExistingStructure: false,
                        structureType: 'Raw Maine Coastal Parcel',
                        yearAndCondition: 'Undisturbed terrain',
                        foundation: 'Natural Maine granite bedrock',
                        framing: 'N/A',
                        buildingEnvelope: 'N/A',
                        existingUtilities: 'Utility pole at road frontage',
                      },
                      proposedConditions: {
                        structureType: 'High-Performance Maine Timber Residence',
                        proposedFootprint: { value: 1400, unit: 'SF' },
                        livingArea: { value: 2200, unit: 'SF' },
                        stories: 2,
                        foundation: 'Pinned concrete pier on granite ledge with insulated crawlspace',
                        thermalPerformance: 'Continuous exterior insulation R-30 walls, R-60 roof',
                        mechanicalSystems: 'Cold-climate hyper-heat pumps with continuous ERV ventilation',
                        dimensions: {
                          length: { value: 44, unit: 'FT' },
                          width: { value: 32, unit: 'FT' },
                          ceilingHeightMain: { value: 9, unit: 'FT' },
                          ceilingHeightUpper: { value: 8.5, unit: 'FT' },
                          ridgeHeight: { value: 24, unit: 'FT' },
                        },
                        elevations: {
                          north: 'Minimal fenestration to block prevailing winter winds',
                          south: 'Extensive triple-glazed windows for passive solar gain',
                          east: 'Morning daylight into kitchen and breakfast nook',
                          west: 'Protected entry porch and screened pavilion',
                          finishedGradeOffset: '+18" above bedrock',
                        },
                      },
                      design: {
                        floorLayout: {
                          primaryConcept: 'Open-concept timber living core with private bedroom wings',
                          bedrooms: 3,
                          bathrooms: 2.5,
                          primaryRooms: ['Great Room', 'Primary Suite', 'Guest Quarters', 'Screened Porch'],
                          circulationNotes: 'Central corridor with direct exterior breezeway integration',
                        },
                        roofGeometry: {
                          primaryPitch: '10:12',
                          dormerPitch: '4:12 shed',
                          overhangDepth: { value: 18, unit: 'IN' },
                          fasciaDetail: 'Square-cut cedar fascia with continuous vented soffit',
                        },
                        wallGeometry: {
                          wallAngles: 'Standard 90° framing with 2x6 exterior studs at 24" O.C.',
                          shearWallEngineering: 'Engineered continuous plywood shear panels at exterior corners',
                          ceilingProfiles: 'Cathedral timber ceiling over great room',
                        },
                        interiorDesign: {
                          drywallFinish: 'Level 4 taped, primed, and painted matte off-white',
                          trimDetails: 'Flat-stock square pine casing with revealed reveals',
                          cabinetPreparedness: 'Blocking installed for 36" upper cabinets and island',
                          lightingLayout: 'Dimmable recessed warm LED lighting with perimeter accent coves',
                          flooringStatus: 'Engineered subfloor ready for wide-plank oak or tile',
                        },
                        exteriorDesign: {
                          claddingType: 'Eastern white pine clapboard with white cedar shingle accents',
                          weatherBarrier: 'Taped continuous weather-resistive barrier with rainscreen drainage mat',
                          windowDoorRatings: 'Triple-glazed high-efficiency wood-clad units',
                          trimWrap: 'Solid cedar corner boards and drip caps',
                          sidingReadiness: 'Rainscreen furring strips installed and ready for siding',
                        },
                      },
                      scope: {
                        summary: 'Turnkey architectural planning, permitting, and high-performance building envelope execution.',
                        phases: [
                          { id: 'ph-1', name: 'Permitting & Site Preparation', duration: '4-6 Weeks', deliverables: ['Survey', 'Septic Design', 'Driveway Access'] },
                          { id: 'ph-2', name: 'Foundation & Framing', duration: '8-10 Weeks', deliverables: ['Bedrock Pins', 'Timber Frame', 'Roof Sheathing'] },
                          { id: 'ph-3', name: 'Enclosure & Mechanicals', duration: '6-8 Weeks', deliverables: ['Windows', 'Tyvek Weather Barrier', 'Rough MEP'] },
                          { id: 'ph-4', name: 'Finishes & Turnkey Handover', duration: '8-12 Weeks', deliverables: ['Drywall', 'Allowances Execution', 'Final Occupancy'] },
                        ],
                        inclusions: ['Architectural drawings', 'Town permitting', 'Excavation', 'Foundation', 'Framing', 'Windows', 'Roofing'],
                        exclusions: ['Client furniture', 'Post-occupancy landscaping beyond rough grade'],
                      },
                      packageSelection: {
                        selectedPackage: 'Vanilla Box',
                        preDesignedPathway: 'Build as Designed',
                        vanillaBoxSpecs: {
                          drywallSurfaces: 'Drywall hung, taped, and Level 4 finished',
                          switchesAndLights: 'Standard switches and basic code lighting installed & energized',
                          flooringExcluded: 'Flooring excluded — clean subfloors ready for final finishes',
                          kitchenPreparedness: 'Kitchen prepared for cabinets, countertops, and appliances',
                          weatherBarrierAndWrap: 'Tyvek weather-barrier taped with pre-flashed window pans',
                          sidingReadyExterior: 'Siding-ready exterior with strapping and trim wrapped',
                          structuralConstraint: 'Strictly no layout or structural changes within the baseline',
                          escrowDisbursement: 'Upgrades held and disbursed through purchase or construction escrow',
                        },
                      },
                      allowances: {
                        siding: { amount: 22000, unit: 'Lump Sum', description: 'Exterior Siding' },
                        cabinetsCounters: { amount: 28000, unit: 'Lump Sum', description: 'Cabinets & Countertops' },
                        appliances: { amount: 14000, unit: 'Lump Sum', description: 'Kitchen Appliances' },
                        flooring: { amount: 16000, unit: 'Lump Sum', description: 'Finished Flooring' },
                        stairs: { amount: 7500, unit: 'Lump Sum', description: 'Interior Stairs' },
                        bathroom: { amount: 12500, unit: 'Lump Sum', description: 'Bathroom Components' },
                      },
                      financing: {
                        structure: 'Construction-to-Permanent Loan with Milestone Draw Schedule',
                        lenderCoordination: 'Coordinated with regional Maine lenders (Camden National, First National Bank)',
                        milestoneDraws: 'Standard 5-draw disbursement protocol following local code inspections',
                        escrowHoldback: 'Client allowances held in dedicated project escrow account',
                      },
                      realtor: {
                        involvement: 'Professional broker representation welcomed with standard commission protection',
                        dueDiligenceSupport: 'Comprehensive site assessment data and septic feasibility provided for buyer review',
                        brokerCoordination: 'Full coordination with buyer brokers throughout design and construction phases',
                        preSaleValuation: 'Detailed comparative market analysis support for construction financing appraisal',
                      },
                      visibility: true,
                      order: cmsState.projects.length + 1,
                    };
                    updateCMS((draft) => {
                      draft.projects.push(newProj);
                    });
                    setSelectedProjectId(newId);
                  }}
                  className="px-3 py-1.5 bg-[#c49a6c] text-[#0d0f12] text-xs font-sans uppercase font-bold flex items-center gap-1 shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Project</span>
                </button>
              </div>

              {(() => {
                const projIdx = cmsState.projects.findIndex((p) => p.id === selectedProjectId);
                if (projIdx === -1) return <div className="text-xs font-sans text-[#8e95a0]">Select or create a project.</div>;
                const project = cmsState.projects[projIdx];

                return (
                  <div className="p-6 bg-[#11141c] border border-[#252d3e] space-y-4">
                    <div className="flex items-center justify-between border-b border-[#222938] pb-2">
                      <span className="text-xs font-sans uppercase text-[#c49a6c]">
                        PROJECT ID: {project.id}
                      </span>
                      <button
                        onClick={() => {
                          if (confirm(`Delete project "${project.title}"?`)) {
                            updateCMS((draft) => {
                              draft.projects = draft.projects.filter((p) => p.id !== project.id);
                            });
                            setSelectedProjectId(cmsState.projects[0]?.id || '');
                          }
                        }}
                        className="text-xs font-sans text-red-400 hover:text-red-300 flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-sans text-[#8e95a0] mb-1">Project Title</label>
                        <input
                          type="text"
                          value={project.title}
                          onChange={(e) =>
                            updateCMS((draft) => {
                              draft.projects[projIdx].title = e.target.value;
                            })
                          }
                          className="w-full bg-[#181d28] border border-[#2d374a] px-3 py-2 text-sm text-white focus:border-[#c49a6c] outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-sans text-[#8e95a0] mb-1">Location</label>
                        <input
                          type="text"
                          value={project.location}
                          onChange={(e) =>
                            updateCMS((draft) => {
                              draft.projects[projIdx].location = e.target.value;
                            })
                          }
                          className="w-full bg-[#181d28] border border-[#2d374a] px-3 py-2 text-sm text-white focus:border-[#c49a6c] outline-none"
                        />
                      </div>
                    </div>

                    {/* Related Worlds Assignment */}
                    <div>
                      <label className="block text-xs font-sans text-[#8e95a0] mb-2">
                        Assigned Conceptual Worlds (Can Belong to Multiple Worlds)
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {(['BUILD', 'LAND', 'CREATE', 'CUSTOM', 'DAWNLAND'] as WorldId[]).map((wId) => {
                          const isAssigned = project.relatedWorlds.includes(wId);
                          return (
                            <button
                              key={wId}
                              type="button"
                              onClick={() => {
                                updateCMS((draft) => {
                                  if (isAssigned) {
                                    draft.projects[projIdx].relatedWorlds = draft.projects[projIdx].relatedWorlds.filter(
                                      (w) => w !== wId
                                    );
                                  } else {
                                    draft.projects[projIdx].relatedWorlds.push(wId);
                                  }
                                });
                              }}
                              className={`px-3 py-1.5 text-xs font-sans uppercase tracking-wider border ${
                                isAssigned
                                  ? 'border-[#c49a6c] bg-[#c49a6c]/20 text-[#f4f2ee]'
                                  : 'border-[#2d374a] bg-[#181d28] text-[#788291]'
                              }`}
                            >
                              {wId} {isAssigned ? '✓' : '+'}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Image Assignments */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-sans text-[#8e95a0] mb-1">
                          Primary Image
                        </label>
                        <select
                          value={project.primaryImageId}
                          onChange={(e) =>
                            updateCMS((draft) => {
                              draft.projects[projIdx].primaryImageId = e.target.value;
                            })
                          }
                          className="w-full bg-[#181d28] border border-[#2d374a] px-2.5 py-1.5 text-xs text-white focus:border-[#c49a6c] outline-none"
                        >
                          {cmsState.images.map((img) => (
                            <option key={img.id} value={img.id}>
                              {img.filename}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-sans text-[#8e95a0] mb-1">
                          Before Image (Optional)
                        </label>
                        <select
                          value={project.beforeImageId || ''}
                          onChange={(e) =>
                            updateCMS((draft) => {
                              draft.projects[projIdx].beforeImageId = e.target.value || undefined;
                            })
                          }
                          className="w-full bg-[#181d28] border border-[#2d374a] px-2.5 py-1.5 text-xs text-white focus:border-[#c49a6c] outline-none"
                        >
                          <option value="">None</option>
                          {cmsState.images.map((img) => (
                            <option key={img.id} value={img.id}>
                              {img.filename}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-sans text-[#8e95a0] mb-1">
                          After Image (Optional)
                        </label>
                        <select
                          value={project.afterImageId || ''}
                          onChange={(e) =>
                            updateCMS((draft) => {
                              draft.projects[projIdx].afterImageId = e.target.value || undefined;
                            })
                          }
                          className="w-full bg-[#181d28] border border-[#2d374a] px-2.5 py-1.5 text-xs text-white focus:border-[#c49a6c] outline-none"
                        >
                          <option value="">None</option>
                          {cmsState.images.map((img) => (
                            <option key={img.id} value={img.id}>
                              {img.filename}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-sans text-[#8e95a0] mb-1">Description</label>
                      <textarea
                        rows={2}
                        value={project.description}
                        onChange={(e) =>
                          updateCMS((draft) => {
                            draft.projects[projIdx].description = e.target.value;
                          })
                        }
                        className="w-full bg-[#181d28] border border-[#2d374a] px-3 py-2 text-sm text-white focus:border-[#c49a6c] outline-none"
                      />
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* TAB: PACKAGES & PROPERTY PLANNING */}
          {activeTab === 'planning' && (() => {
            const activePlanningProj = cmsState.projects.find((p) => p.id === selectedPlanningProjectId) || cmsState.projects[0];
            const projIndex = cmsState.projects.findIndex((p) => p.id === (activePlanningProj?.id || ''));

            const updateActiveProj = (mutator: (p: ProjectRecord) => void) => {
              if (projIndex === -1) return;
              updateCMS((draft) => {
                mutator(draft.projects[projIndex]);
              });
            };

            const updateVanillaBox = (field: keyof VanillaBoxSpecs, value: string) => {
              updateActiveProj((p) => {
                if (!p.packageSelection) {
                  p.packageSelection = { selectedPackage: 'Vanilla Box' };
                }
                if (!p.packageSelection.vanillaBoxSpecs) {
                  p.packageSelection.vanillaBoxSpecs = {
                    drywallSurfaces: '',
                    switchesAndLights: '',
                    flooringExcluded: '',
                    kitchenPreparedness: '',
                    weatherBarrierAndWrap: '',
                    sidingReadyExterior: '',
                    structuralConstraint: '',
                    escrowDisbursement: '',
                  };
                }
                (p.packageSelection.vanillaBoxSpecs as any)[field] = value;
              });
            };

            return (
              <div className="space-y-8 max-w-5xl">
                {/* Header Information & Sub-Tab Navigation */}
                <div className="p-6 bg-[#11141c] border border-[#252d3e]">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#222938] pb-4 mb-4">
                    <div>
                      <h3 className="text-sm font-sans tracking-widest uppercase text-[#c49a6c]">
                        PACKAGES &amp; PROJECT PLANNING ARCHITECTURE
                      </h3>
                      <p className="text-xs text-[#8e95a0] mt-1 leading-relaxed">
                        Manage global CMS Package definitions or project-specific planning sections across the 11 domains.
                      </p>
                    </div>

                    <div className="flex items-center gap-1 bg-[#0d1017] p-1 border border-[#273142] rounded-sm">
                      <button
                        type="button"
                        onClick={() => setPlanningSubTab('packages')}
                        className={`px-3 py-1.5 text-xs font-sans uppercase tracking-wider font-semibold rounded-sm transition-colors ${
                          planningSubTab === 'packages'
                            ? 'bg-[#c49a6c] text-black'
                            : 'text-[#8e95a0] hover:text-white'
                        }`}
                      >
                        CMS Packages ({cmsState.packages?.length || 0})
                      </button>
                      <button
                        type="button"
                        onClick={() => setPlanningSubTab('project-planning')}
                        className={`px-3 py-1.5 text-xs font-sans uppercase tracking-wider font-semibold rounded-sm transition-colors ${
                          planningSubTab === 'project-planning'
                            ? 'bg-[#c49a6c] text-black'
                            : 'text-[#8e95a0] hover:text-white'
                        }`}
                      >
                        Project Planning Data
                      </button>
                    </div>
                  </div>

                  {planningSubTab === 'project-planning' && (
                    <div className="flex items-center gap-3 pt-1">
                      <span className="text-xs font-sans uppercase text-[#c48255] font-semibold">Active Project:</span>
                      <select
                        value={activePlanningProj?.id || ''}
                        onChange={(e) => setSelectedPlanningProjectId(e.target.value)}
                        className="bg-[#181d28] border border-[#2d374a] px-3 py-1 text-xs text-white focus:border-[#c49a6c] outline-none"
                      >
                        {cmsState.projects.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.title} ({p.location})
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                {/* 1. CMS PACKAGES MANAGEMENT */}
                {planningSubTab === 'packages' && (
                  <div className="space-y-6">
                    {(cmsState.packages || []).map((pkg, idx) => (
                      <div key={pkg.id || idx} className="p-6 bg-[#11141c] border border-[#252d3e] space-y-4">
                        <div className="flex items-center justify-between border-b border-[#1f2533] pb-2">
                          <h4 className="text-xs font-sans tracking-wider uppercase text-[#c49a6c] font-bold">
                            {pkg.name} ({pkg.id})
                          </h4>
                          <span className="text-[11px] text-[#8e95a0] font-sans">
                            {pkg.tier ? `Tier: ${pkg.tier}` : 'Standard Package'}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="sm:col-span-2">
                            <label className="block text-xs font-sans text-[#8e95a0] mb-1">Package Name</label>
                            <input
                              type="text"
                              value={pkg.name}
                              onChange={(e) => {
                                const val = e.target.value;
                                updateCMS((draft) => {
                                  draft.packages[idx].name = val;
                                });
                              }}
                              className="w-full bg-[#181d28] border border-[#2d374a] px-3 py-1.5 text-xs text-white focus:border-[#c49a6c] outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-sans text-[#8e95a0] mb-1">Short Description / Subtitle</label>
                            <textarea
                              rows={2}
                              value={pkg.shortDescription}
                              onChange={(e) => {
                                const val = e.target.value;
                                updateCMS((draft) => {
                                  draft.packages[idx].shortDescription = val;
                                });
                              }}
                              className="w-full bg-[#181d28] border border-[#2d374a] px-3 py-1.5 text-xs text-white focus:border-[#c49a6c] outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-sans text-[#8e95a0] mb-1">Full Scope Narrative</label>
                            <textarea
                              rows={2}
                              value={pkg.fullDescription}
                              onChange={(e) => {
                                const val = e.target.value;
                                updateCMS((draft) => {
                                  draft.packages[idx].fullDescription = val;
                                });
                              }}
                              className="w-full bg-[#181d28] border border-[#2d374a] px-3 py-1.5 text-xs text-white focus:border-[#c49a6c] outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-sans text-[#8e95a0] mb-1">Key Inclusions (one per line)</label>
                            <textarea
                              rows={3}
                              value={(pkg.inclusions || []).join('\n')}
                              onChange={(e) => {
                                const lines = e.target.value.split('\n');
                                updateCMS((draft) => {
                                  draft.packages[idx].inclusions = lines;
                                });
                              }}
                              className="w-full bg-[#181d28] border border-[#2d374a] px-3 py-1.5 text-xs text-white focus:border-[#c49a6c] outline-none font-mono"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-sans text-[#8e95a0] mb-1">Explicit Exclusions (one per line)</label>
                            <textarea
                              rows={3}
                              value={(pkg.exclusions || []).join('\n')}
                              onChange={(e) => {
                                const lines = e.target.value.split('\n');
                                updateCMS((draft) => {
                                  draft.packages[idx].exclusions = lines;
                                });
                              }}
                              className="w-full bg-[#181d28] border border-[#2d374a] px-3 py-1.5 text-xs text-white focus:border-[#c49a6c] outline-none font-mono"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-sans text-[#8e95a0] mb-1">Financing Structure Notes</label>
                            <input
                              type="text"
                              value={pkg.financingNotes || ''}
                              onChange={(e) => {
                                const val = e.target.value;
                                updateCMS((draft) => {
                                  draft.packages[idx].financingNotes = val;
                                });
                              }}
                              className="w-full bg-[#181d28] border border-[#2d374a] px-3 py-1.5 text-xs text-white focus:border-[#c49a6c] outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-sans text-[#8e95a0] mb-1">Realtor &amp; Broker Notes</label>
                            <input
                              type="text"
                              value={pkg.realtorNotes || ''}
                              onChange={(e) => {
                                const val = e.target.value;
                                updateCMS((draft) => {
                                  draft.packages[idx].realtorNotes = val;
                                });
                              }}
                              className="w-full bg-[#181d28] border border-[#2d374a] px-3 py-1.5 text-xs text-white focus:border-[#c49a6c] outline-none"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* 2. PROJECT PLANNING SPECIFICATIONS */}
                {planningSubTab === 'project-planning' && activePlanningProj && (
                  <div className="space-y-6">
                    {/* Active Project Banner */}
                    <div className="p-4 bg-[#11141c] border border-[#252d3e] flex items-center justify-between">
                      <div>
                        <span className="text-xs uppercase text-[#c49a6c] font-sans font-semibold">Editing Project:</span>
                        <h4 className="text-sm font-sans font-bold text-white mt-0.5">
                          {activePlanningProj.title} &mdash; <span className="text-[#8e95a0]">{activePlanningProj.location}</span>
                        </h4>
                      </div>
                      <span className="text-[11px] font-mono text-[#c48255] uppercase border border-[#c48255]/30 px-2.5 py-1">
                        Tier: {activePlanningProj.packageSelection?.selectedPackage || 'Vanilla Box'}
                      </span>
                    </div>

                {/* 1. PACKAGE & PATHWAY SELECTION */}
                <div className="p-6 bg-[#11141c] border border-[#252d3e] space-y-4">
                  <h4 className="text-xs font-sans tracking-wider uppercase text-[#c49a6c] border-b border-[#1f2533] pb-2">
                    1. Package Tier &amp; Pathway
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-sans text-[#8e95a0] mb-1">Package Tier</label>
                      <select
                        value={activePlanningProj.packageSelection?.selectedPackage || 'Vanilla Box'}
                        onChange={(e) => updateActiveProj((p) => {
                          if (!p.packageSelection) p.packageSelection = { selectedPackage: 'Vanilla Box' };
                          p.packageSelection.selectedPackage = e.target.value as PackageTier;
                        })}
                        className="w-full bg-[#181d28] border border-[#2d374a] px-3 py-1.5 text-xs text-white focus:border-[#c49a6c] outline-none"
                      >
                        <option value="Remodel">Remodel</option>
                        <option value="Vanilla Box">Vanilla Box</option>
                        <option value="Build-to-Suit">Build-to-Suit</option>
                        <option value="Pre-Designed">Pre-Designed</option>
                        <option value="Custom">Custom</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-sans text-[#8e95a0] mb-1">Pre-Designed Pathway Option</label>
                      <select
                        value={activePlanningProj.packageSelection?.preDesignedPathway || 'Build as Designed'}
                        onChange={(e) => updateActiveProj((p) => {
                          if (!p.packageSelection) p.packageSelection = { selectedPackage: 'Vanilla Box' };
                          p.packageSelection.preDesignedPathway = e.target.value as PreDesignedPathway;
                        })}
                        className="w-full bg-[#181d28] border border-[#2d374a] px-3 py-1.5 text-xs text-white focus:border-[#c49a6c] outline-none"
                      >
                        <option value="Build as Designed">Build as Designed</option>
                        <option value="Choose Options &amp; Upgrades">Choose Options &amp; Upgrades</option>
                        <option value="Customize for Your Property">Customize for Your Property</option>
                        <option value="Build-to-Suit Modifications">Build-to-Suit Modifications</option>
                      </select>
                    </div>
                  </div>

                  {/* Vanilla Box Specs */}
                  <div className="pt-2 border-t border-[#1f2533]">
                    <h5 className="text-[11px] font-sans tracking-wider uppercase text-[#c48255] mb-2 font-semibold">
                      Vanilla Box Baseline Conditions
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-sans text-[#8e95a0] mb-1">Drywall Surface Status</label>
                        <input
                          type="text"
                          value={activePlanningProj.packageSelection?.vanillaBoxSpecs?.drywallSurfaces || ''}
                          onChange={(e) => updateVanillaBox('drywallSurfaces', e.target.value)}
                          className="w-full bg-[#181d28] border border-[#2d374a] px-3 py-1.5 text-xs text-white focus:border-[#c49a6c] outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-sans text-[#8e95a0] mb-1">Switches &amp; Lighting Rough-In</label>
                        <input
                          type="text"
                          value={activePlanningProj.packageSelection?.vanillaBoxSpecs?.switchesAndLights || ''}
                          onChange={(e) => updateVanillaBox('switchesAndLights', e.target.value)}
                          className="w-full bg-[#181d28] border border-[#2d374a] px-3 py-1.5 text-xs text-white focus:border-[#c49a6c] outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-sans text-[#8e95a0] mb-1">Flooring Preparation / Status</label>
                        <input
                          type="text"
                          value={activePlanningProj.packageSelection?.vanillaBoxSpecs?.flooringExcluded || ''}
                          onChange={(e) => updateVanillaBox('flooringExcluded', e.target.value)}
                          className="w-full bg-[#181d28] border border-[#2d374a] px-3 py-1.5 text-xs text-white focus:border-[#c49a6c] outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-sans text-[#8e95a0] mb-1">Weather Envelope &amp; Wrap</label>
                        <input
                          type="text"
                          value={activePlanningProj.packageSelection?.vanillaBoxSpecs?.weatherBarrierAndWrap || ''}
                          onChange={(e) => updateVanillaBox('weatherBarrierAndWrap', e.target.value)}
                          className="w-full bg-[#181d28] border border-[#2d374a] px-3 py-1.5 text-xs text-white focus:border-[#c49a6c] outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. PROPERTY & SITE SPECIFICATIONS */}
                <div className="p-6 bg-[#11141c] border border-[#252d3e] space-y-4">
                  <h4 className="text-xs font-sans tracking-wider uppercase text-[#c49a6c] border-b border-[#1f2533] pb-2">
                    2. Property &amp; Site Conditions
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-sans text-[#8e95a0] mb-1">Parcel Overview</label>
                      <input
                        type="text"
                        value={activePlanningProj.property?.parcelInfo || ''}
                        onChange={(e) => updateActiveProj((p) => {
                          if (!p.property) p.property = {} as any;
                          p.property.parcelInfo = e.target.value;
                        })}
                        className="w-full bg-[#181d28] border border-[#2d374a] px-3 py-1.5 text-xs text-white focus:border-[#c49a6c] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-sans text-[#8e95a0] mb-1">Parcel Size (Acres)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={activePlanningProj.property?.parcelSize?.value || 1}
                        onChange={(e) => updateActiveProj((p) => {
                          if (!p.property) p.property = {} as any;
                          if (!p.property.parcelSize) p.property.parcelSize = { value: 1, unit: 'Acres' };
                          p.property.parcelSize.value = parseFloat(e.target.value) || 0;
                        })}
                        className="w-full bg-[#181d28] border border-[#2d374a] px-3 py-1.5 text-xs text-white focus:border-[#c49a6c] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-sans text-[#8e95a0] mb-1">Zoning Code</label>
                      <input
                        type="text"
                        value={activePlanningProj.property?.zoning || ''}
                        onChange={(e) => updateActiveProj((p) => {
                          if (!p.property) p.property = {} as any;
                          p.property.zoning = e.target.value;
                        })}
                        className="w-full bg-[#181d28] border border-[#2d374a] px-3 py-1.5 text-xs text-white focus:border-[#c49a6c] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-sans text-[#8e95a0] mb-1">Slope &amp; Terrain</label>
                      <input
                        type="text"
                        value={activePlanningProj.property?.terrainSlope || ''}
                        onChange={(e) => updateActiveProj((p) => {
                          if (!p.property) p.property = {} as any;
                          p.property.terrainSlope = e.target.value;
                        })}
                        className="w-full bg-[#181d28] border border-[#2d374a] px-3 py-1.5 text-xs text-white focus:border-[#c49a6c] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-sans text-[#8e95a0] mb-1">Ledge / Bedrock Condition</label>
                      <input
                        type="text"
                        value={activePlanningProj.property?.ledgeConditions || ''}
                        onChange={(e) => updateActiveProj((p) => {
                          if (!p.property) p.property = {} as any;
                          p.property.ledgeConditions = e.target.value;
                        })}
                        className="w-full bg-[#181d28] border border-[#2d374a] px-3 py-1.5 text-xs text-white focus:border-[#c49a6c] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-sans text-[#8e95a0] mb-1">Access Corridor &amp; Drive</label>
                      <input
                        type="text"
                        value={activePlanningProj.property?.accessCorridor || ''}
                        onChange={(e) => updateActiveProj((p) => {
                          if (!p.property) p.property = {} as any;
                          p.property.accessCorridor = e.target.value;
                        })}
                        className="w-full bg-[#181d28] border border-[#2d374a] px-3 py-1.5 text-xs text-white focus:border-[#c49a6c] outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. PROPOSED CONDITIONS & GEOMETRY */}
                <div className="p-6 bg-[#11141c] border border-[#252d3e] space-y-4">
                  <h4 className="text-xs font-sans tracking-wider uppercase text-[#c49a6c] border-b border-[#1f2533] pb-2">
                    3. Proposed Conditions &amp; Geometry
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-sans text-[#8e95a0] mb-1">Structure Type</label>
                      <input
                        type="text"
                        value={activePlanningProj.proposedConditions?.structureType || ''}
                        onChange={(e) => updateActiveProj((p) => {
                          if (!p.proposedConditions) p.proposedConditions = {} as any;
                          p.proposedConditions.structureType = e.target.value;
                        })}
                        className="w-full bg-[#181d28] border border-[#2d374a] px-3 py-1.5 text-xs text-white focus:border-[#c49a6c] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-sans text-[#8e95a0] mb-1">Living Area (SF)</label>
                      <input
                        type="number"
                        value={activePlanningProj.proposedConditions?.livingArea?.value || 0}
                        onChange={(e) => updateActiveProj((p) => {
                          if (!p.proposedConditions) p.proposedConditions = {} as any;
                          if (!p.proposedConditions.livingArea) p.proposedConditions.livingArea = { value: 0, unit: 'SF' };
                          p.proposedConditions.livingArea.value = parseInt(e.target.value, 10) || 0;
                        })}
                        className="w-full bg-[#181d28] border border-[#2d374a] px-3 py-1.5 text-xs text-white focus:border-[#c49a6c] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-sans text-[#8e95a0] mb-1">Foundation Strategy</label>
                      <input
                        type="text"
                        value={activePlanningProj.proposedConditions?.foundation || ''}
                        onChange={(e) => updateActiveProj((p) => {
                          if (!p.proposedConditions) p.proposedConditions = {} as any;
                          p.proposedConditions.foundation = e.target.value;
                        })}
                        className="w-full bg-[#181d28] border border-[#2d374a] px-3 py-1.5 text-xs text-white focus:border-[#c49a6c] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-sans text-[#8e95a0] mb-1">Thermal Performance</label>
                      <input
                        type="text"
                        value={activePlanningProj.proposedConditions?.thermalPerformance || ''}
                        onChange={(e) => updateActiveProj((p) => {
                          if (!p.proposedConditions) p.proposedConditions = {} as any;
                          p.proposedConditions.thermalPerformance = e.target.value;
                        })}
                        className="w-full bg-[#181d28] border border-[#2d374a] px-3 py-1.5 text-xs text-white focus:border-[#c49a6c] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-sans text-[#8e95a0] mb-1">HVAC &amp; Mechanicals</label>
                      <input
                        type="text"
                        value={activePlanningProj.proposedConditions?.mechanicalSystems || ''}
                        onChange={(e) => updateActiveProj((p) => {
                          if (!p.proposedConditions) p.proposedConditions = {} as any;
                          p.proposedConditions.mechanicalSystems = e.target.value;
                        })}
                        className="w-full bg-[#181d28] border border-[#2d374a] px-3 py-1.5 text-xs text-white focus:border-[#c49a6c] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-sans text-[#8e95a0] mb-1">Roof Primary Pitch</label>
                      <input
                        type="text"
                        value={activePlanningProj.proposedConditions?.roofPitch || ''}
                        onChange={(e) => updateActiveProj((p) => {
                          if (!p.proposedConditions) p.proposedConditions = {} as any;
                          p.proposedConditions.roofPitch = e.target.value;
                        })}
                        className="w-full bg-[#181d28] border border-[#2d374a] px-3 py-1.5 text-xs text-white focus:border-[#c49a6c] outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* 4. DEFINED ALLOWANCES */}
                <div className="p-6 bg-[#11141c] border border-[#252d3e] space-y-4">
                  <h4 className="text-xs font-sans tracking-wider uppercase text-[#c49a6c] border-b border-[#1f2533] pb-2">
                    4. Defined Allowances ($)
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-sans text-[#8e95a0] mb-1">Exterior Siding ($)</label>
                      <input
                        type="number"
                        value={activePlanningProj.allowances?.siding?.amount || 0}
                        onChange={(e) => updateActiveProj((p) => {
                          if (!p.allowances) p.allowances = {} as any;
                          if (!p.allowances.siding) p.allowances.siding = { amount: 0, unit: 'Lump Sum', description: 'Exterior Siding' };
                          p.allowances.siding.amount = parseInt(e.target.value, 10) || 0;
                        })}
                        className="w-full bg-[#181d28] border border-[#2d374a] px-3 py-1.5 text-xs text-white focus:border-[#c49a6c] outline-none font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-sans text-[#8e95a0] mb-1">Cabinets &amp; Counters ($)</label>
                      <input
                        type="number"
                        value={activePlanningProj.allowances?.cabinetsCounters?.amount || 0}
                        onChange={(e) => updateActiveProj((p) => {
                          if (!p.allowances) p.allowances = {} as any;
                          if (!p.allowances.cabinetsCounters) p.allowances.cabinetsCounters = { amount: 0, unit: 'Lump Sum', description: 'Cabinets & Counters' };
                          p.allowances.cabinetsCounters.amount = parseInt(e.target.value, 10) || 0;
                        })}
                        className="w-full bg-[#181d28] border border-[#2d374a] px-3 py-1.5 text-xs text-white focus:border-[#c49a6c] outline-none font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-sans text-[#8e95a0] mb-1">Kitchen Appliances ($)</label>
                      <input
                        type="number"
                        value={activePlanningProj.allowances?.appliances?.amount || 0}
                        onChange={(e) => updateActiveProj((p) => {
                          if (!p.allowances) p.allowances = {} as any;
                          if (!p.allowances.appliances) p.allowances.appliances = { amount: 0, unit: 'Lump Sum', description: 'Kitchen Appliances' };
                          p.allowances.appliances.amount = parseInt(e.target.value, 10) || 0;
                        })}
                        className="w-full bg-[#181d28] border border-[#2d374a] px-3 py-1.5 text-xs text-white focus:border-[#c49a6c] outline-none font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-sans text-[#8e95a0] mb-1">Finished Flooring ($)</label>
                      <input
                        type="number"
                        value={activePlanningProj.allowances?.flooring?.amount || 0}
                        onChange={(e) => updateActiveProj((p) => {
                          if (!p.allowances) p.allowances = {} as any;
                          if (!p.allowances.flooring) p.allowances.flooring = { amount: 0, unit: 'Lump Sum', description: 'Finished Flooring' };
                          p.allowances.flooring.amount = parseInt(e.target.value, 10) || 0;
                        })}
                        className="w-full bg-[#181d28] border border-[#2d374a] px-3 py-1.5 text-xs text-white focus:border-[#c49a6c] outline-none font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-sans text-[#8e95a0] mb-1">Interior Stairs ($)</label>
                      <input
                        type="number"
                        value={activePlanningProj.allowances?.stairs?.amount || 0}
                        onChange={(e) => updateActiveProj((p) => {
                          if (!p.allowances) p.allowances = {} as any;
                          if (!p.allowances.stairs) p.allowances.stairs = { amount: 0, unit: 'Lump Sum', description: 'Interior Stairs' };
                          p.allowances.stairs.amount = parseInt(e.target.value, 10) || 0;
                        })}
                        className="w-full bg-[#181d28] border border-[#2d374a] px-3 py-1.5 text-xs text-white focus:border-[#c49a6c] outline-none font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-sans text-[#8e95a0] mb-1">Bathroom Fixtures ($)</label>
                      <input
                        type="number"
                        value={activePlanningProj.allowances?.bathroom?.amount || 0}
                        onChange={(e) => updateActiveProj((p) => {
                          if (!p.allowances) p.allowances = {} as any;
                          if (!p.allowances.bathroom) p.allowances.bathroom = { amount: 0, unit: 'Lump Sum', description: 'Bathroom Fixtures' };
                          p.allowances.bathroom.amount = parseInt(e.target.value, 10) || 0;
                        })}
                        className="w-full bg-[#181d28] border border-[#2d374a] px-3 py-1.5 text-xs text-white focus:border-[#c49a6c] outline-none font-mono"
                      />
                    </div>
                  </div>
                </div>

                {/* 5. FINANCING & REALTOR COORDINATION */}
                <div className="p-6 bg-[#11141c] border border-[#252d3e] space-y-4">
                  <h4 className="text-xs font-sans tracking-wider uppercase text-[#c49a6c] border-b border-[#1f2533] pb-2">
                    5. Financing &amp; Realtor Coordination
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-sans text-[#8e95a0] mb-1">Financing Structure</label>
                      <textarea
                        rows={3}
                        value={activePlanningProj.financing?.structure || ''}
                        onChange={(e) => updateActiveProj((p) => {
                          if (!p.financing) p.financing = {} as any;
                          p.financing.structure = e.target.value;
                        })}
                        className="w-full bg-[#181d28] border border-[#2d374a] px-3 py-1.5 text-xs text-white focus:border-[#c49a6c] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-sans text-[#8e95a0] mb-1">Lender Coordination Protocol</label>
                      <textarea
                        rows={3}
                        value={activePlanningProj.financing?.lenderCoordination || ''}
                        onChange={(e) => updateActiveProj((p) => {
                          if (!p.financing) p.financing = {} as any;
                          p.financing.lenderCoordination = e.target.value;
                        })}
                        className="w-full bg-[#181d28] border border-[#2d374a] px-3 py-1.5 text-xs text-white focus:border-[#c49a6c] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-sans text-[#8e95a0] mb-1">Realtor Involvement &amp; Collaboration</label>
                      <textarea
                        rows={3}
                        value={activePlanningProj.realtor?.involvement || ''}
                        onChange={(e) => updateActiveProj((p) => {
                          if (!p.realtor) p.realtor = {} as any;
                          p.realtor.involvement = e.target.value;
                        })}
                        className="w-full bg-[#181d28] border border-[#2d374a] px-3 py-1.5 text-xs text-white focus:border-[#c49a6c] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-sans text-[#8e95a0] mb-1">Due Diligence Support</label>
                      <textarea
                        rows={3}
                        value={activePlanningProj.realtor?.dueDiligenceSupport || ''}
                        onChange={(e) => updateActiveProj((p) => {
                          if (!p.realtor) p.realtor = {} as any;
                          p.realtor.dueDiligenceSupport = e.target.value;
                        })}
                        className="w-full bg-[#181d28] border border-[#2d374a] px-3 py-1.5 text-xs text-white focus:border-[#c49a6c] outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })()}

          {/* TAB 4: MEDIA LIBRARY & VERCEL BLOB */}
          {activeTab === 'media' && (
            <div className="space-y-6">
              {/* Media Upload Control */}
              <div className="p-6 bg-[#11141c] border border-[#252d3e] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-sm font-sans tracking-widest uppercase text-[#c49a6c]">
                    VERCEL BLOB / IMAGE REGISTRY
                  </h3>
                  <p className="text-xs text-[#8e95a0] mt-1 font-light">
                    Upload images to verify blob persistence, dimensions calculation, focal points, and live rendering.
                  </p>
                </div>

                <div>
                  <label className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#c49a6c] hover:bg-[#d8b082] text-black text-xs font-sans uppercase font-bold cursor-pointer transition-colors">
                    <Upload className="w-4 h-4" />
                    <span>Upload New Image</span>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/svg+xml,image/avif"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {uploadError && (
                <div className="p-3 bg-red-950/60 border border-red-800 text-red-200 text-xs font-sans flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  <span>{uploadError}</span>
                </div>
              )}

              {/* Grid of registered images */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {cmsState.images.map((img, idx) => (
                  <div
                    key={img.id}
                    className="p-3 bg-[#11141c] border border-[#222938] space-y-3 flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative h-44 bg-[#0a0c10] overflow-hidden border border-[#1b212d]">
                        <DawnlandImage image={img} fill objectFit="cover" />
                        <div className="absolute top-2 left-2 px-1.5 py-0.5 text-[9px] font-sans uppercase bg-black/80 text-[#c49a6c] border border-white/20">
                          {img.role}
                        </div>
                      </div>

                      <div className="mt-2">
                        <div className="text-xs font-sans text-white truncate font-medium">
                          {img.filename}
                        </div>
                        <div className="text-[10px] font-sans text-[#788291] mt-0.5">
                          {img.width}x{img.height} • {Math.round(img.fileSize / 1024)} KB • {img.mimeType}
                        </div>
                      </div>

                      {/* Focal Point Selector */}
                      <div className="mt-3 pt-2 border-t border-[#1e2533]">
                        <label className="block text-[10px] font-sans text-[#8e95a0] mb-1">
                          Focal Point
                        </label>
                        <select
                          value={img.focalPoint}
                          onChange={(e) =>
                            updateCMS((draft) => {
                              draft.images[idx].focalPoint = e.target.value as FocalPoint;
                            })
                          }
                          className="w-full bg-[#181d28] border border-[#2c3648] px-2 py-1 text-xs text-[#d8d2c6] outline-none"
                        >
                          <option value="center">Center</option>
                          <option value="top">Top</option>
                          <option value="bottom">Bottom</option>
                          <option value="left">Left</option>
                          <option value="right">Right</option>
                        </select>
                      </div>

                      {/* Image Role Selector */}
                      <div className="mt-2">
                        <label className="block text-[10px] font-sans text-[#8e95a0] mb-1">
                          Image Role
                        </label>
                        <select
                          value={img.role}
                          onChange={(e) =>
                            updateCMS((draft) => {
                              draft.images[idx].role = e.target.value as ImageRole;
                            })
                          }
                          className="w-full bg-[#181d28] border border-[#2c3648] px-2 py-1 text-xs text-[#d8d2c6] outline-none"
                        >
                          <option value="HERO">HERO</option>
                          <option value="WORLD">WORLD</option>
                          <option value="CAROUSEL">CAROUSEL</option>
                          <option value="FEATURE">FEATURE</option>
                          <option value="PROJECT">PROJECT</option>
                          <option value="GALLERY">GALLERY</option>
                          <option value="BEFORE">BEFORE</option>
                          <option value="AFTER">AFTER</option>
                          <option value="DETAIL">DETAIL</option>
                          <option value="SUPPORTING">SUPPORTING</option>
                        </select>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-[#1e2533] flex items-center justify-between text-[10px] font-sans text-[#6c7582]">
                      <span>ID: {img.id}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: COMPANY DATA */}
          {activeTab === 'company' && (
            <div className="max-w-3xl space-y-6">
              <div className="p-6 bg-[#11141c] border border-[#252d3e] space-y-4">
                <h3 className="text-sm font-sans tracking-widest uppercase text-[#c49a6c] border-b border-[#222938] pb-2">
                  COMPANY IDENTITY & CONTACT
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-sans text-[#8e95a0] mb-1">Company Name</label>
                    <input
                      type="text"
                      value={cmsState.company.name}
                      onChange={(e) =>
                        updateCMS((draft) => {
                          draft.company.name = e.target.value;
                        })
                      }
                      className="w-full bg-[#181d28] border border-[#2d374a] px-3 py-2 text-sm text-white focus:border-[#c49a6c] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-sans text-[#8e95a0] mb-1">Tagline</label>
                    <input
                      type="text"
                      value={cmsState.company.tagline}
                      onChange={(e) =>
                        updateCMS((draft) => {
                          draft.company.tagline = e.target.value;
                        })
                      }
                      className="w-full bg-[#181d28] border border-[#2d374a] px-3 py-2 text-sm text-white focus:border-[#c49a6c] outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-sans text-[#8e95a0] mb-1">Phone Number</label>
                    <input
                      type="text"
                      value={cmsState.company.phone}
                      onChange={(e) =>
                        updateCMS((draft) => {
                          draft.company.phone = e.target.value;
                        })
                      }
                      className="w-full bg-[#181d28] border border-[#2d374a] px-3 py-2 text-sm text-white focus:border-[#c49a6c] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-sans text-[#8e95a0] mb-1">Email Address</label>
                    <input
                      type="text"
                      value={cmsState.company.email}
                      onChange={(e) =>
                        updateCMS((draft) => {
                          draft.company.email = e.target.value;
                        })
                      }
                      className="w-full bg-[#181d28] border border-[#2d374a] px-3 py-2 text-sm text-white focus:border-[#c49a6c] outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-sans text-[#8e95a0] mb-1">Location</label>
                    <input
                      type="text"
                      value={cmsState.company.location}
                      onChange={(e) =>
                        updateCMS((draft) => {
                          draft.company.location = e.target.value;
                        })
                      }
                      className="w-full bg-[#181d28] border border-[#2d374a] px-3 py-2 text-sm text-white focus:border-[#c49a6c] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-sans text-[#8e95a0] mb-1">Address Placeholder</label>
                    <input
                      type="text"
                      value={cmsState.company.address}
                      onChange={(e) =>
                        updateCMS((draft) => {
                          draft.company.address = e.target.value;
                        })
                      }
                      className="w-full bg-[#181d28] border border-[#2d374a] px-3 py-2 text-sm text-white focus:border-[#c49a6c] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-sans text-[#8e95a0] mb-1">Hours / Availability</label>
                  <input
                    type="text"
                    value={cmsState.company.hours}
                    onChange={(e) =>
                      updateCMS((draft) => {
                        draft.company.hours = e.target.value;
                      })
                    }
                    className="w-full bg-[#181d28] border border-[#2d374a] px-3 py-2 text-sm text-white focus:border-[#c49a6c] outline-none"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Footer Action */}
        <div className="bg-[#121620] px-6 py-4 border-t border-[#252d3d] flex items-center justify-between">
          <div className="text-xs font-sans text-[#8e95a0]">
            Any change made is immediately saved and visible on the live site.
          </div>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-[#f4f2ee] hover:bg-[#c49a6c] text-[#0d0f12] text-xs font-bold font-sans tracking-widest uppercase transition-colors"
          >
            Done Editing
          </button>
        </div>
      </div>
    </div>
  );
};
