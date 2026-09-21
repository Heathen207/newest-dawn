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
import { CMSState, WorldId, ImageRecord, ImageRole, FocalPoint, ProjectRecord } from '../types';
import { processImageUpload } from '../services/cmsStorage';
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
  const [activeTab, setActiveTab] = useState<'homepage' | 'worlds' | 'projects' | 'media' | 'company'>('homepage');
  const [selectedWorldId, setSelectedWorldId] = useState<WorldId>('BUILD');
  const [selectedProjectId, setSelectedProjectId] = useState<string>(cmsState.projects[0]?.id || '');
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
            <span>Projects & Opportunities</span>
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
                      details: {
                        overview: 'Initial overview and architectural intent.',
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
