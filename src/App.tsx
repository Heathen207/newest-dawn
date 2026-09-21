/**
 * Dawnland Development V2 - Master Application Entry Point
 * Implements the full master specification:
 * - Header
 * - Hero
 * - Intro
 * - The Cliff Notes
 * - Five-World Visual Carousel
 * - Selected World Transition Choreography
 * - World Experience
 * - Deep Project Presentations & Foldouts with Before/After Slider
 * - Live CMS Studio Engine & Vercel Blob Media Layer
 */
import React, { useState, useEffect, useRef } from 'react';
import { WorldId, CMSState, ProjectRecord } from './types';
import { loadCMSState, saveCMSState, resetCMSToDefaults } from './services/cmsStorage';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Intro } from './components/Intro';
import { FiveWorldCarousel } from './components/FiveWorldCarousel';
import { PracticalEntryPoint } from './components/PracticalEntryPoint';
import { WorldExploration } from './components/WorldExploration';
import { ProjectsSection } from './components/ProjectsSection';
import { HeathDawnlandSection } from './components/HeathDawnlandSection';
import { ContactSection } from './components/ContactSection';
import { WorldTransition } from './components/WorldTransition';
import { WorldExperience } from './components/WorldExperience';
import { ProjectModal } from './components/ProjectModal';
import { CMSStudioModal } from './components/CMSStudioModal';
import { Footer } from './components/Footer';

export default function App() {
  const [cmsState, setCmsState] = useState<CMSState>(loadCMSState);
  const [activeWorld, setActiveWorld] = useState<WorldId | null>(null);
  const [transitioningToWorld, setTransitioningToWorld] = useState<WorldId | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectRecord | null>(null);
  const [isCMSOpen, setIsCMSOpen] = useState(false);

  const fiveWorldsRef = useRef<HTMLDivElement>(null);
  const practicalRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  // Sync state to local storage on change
  const handleUpdateCMS = (newState: CMSState) => {
    setCmsState(newState);
    saveCMSState(newState);
  };

  const handleResetDefaults = () => {
    const defaults = resetCMSToDefaults();
    setCmsState(defaults);
  };

  // URL hash sync for clean routing (#build, #land, #create, #custom, #dawnland)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toUpperCase();
      const validWorlds: WorldId[] = ['BUILD', 'LAND', 'CREATE', 'CUSTOM', 'DAWNLAND'];
      if (validWorlds.includes(hash as WorldId)) {
        setActiveWorld(hash as WorldId);
      } else if (!hash || hash === 'OVERVIEW' || hash === 'HOME') {
        setActiveWorld(null);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Deliberate World Transition Trigger
  const handleInitiateWorldTransition = (worldId: WorldId) => {
    setTransitioningToWorld(worldId);
  };

  // Transition completion callback
  const handleTransitionComplete = () => {
    if (transitioningToWorld) {
      setActiveWorld(transitioningToWorld);
      window.location.hash = transitioningToWorld.toLowerCase();
      setTransitioningToWorld(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleGoHome = () => {
    setActiveWorld(null);
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollToFiveWorlds = () => {
    if (activeWorld) {
      setActiveWorld(null);
      window.location.hash = '';
      setTimeout(() => {
        fiveWorldsRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      fiveWorldsRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToContact = () => {
    if (activeWorld) {
      setActiveWorld(null);
      window.location.hash = '';
      setTimeout(() => {
        contactRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      contactRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToPractical = () => {
    practicalRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0d0f12] text-[#edebe6] flex flex-col selection:bg-[#c49a6c]/30 selection:text-white">
      {/* 1. GLOBAL HEADER */}
      <Header
        cmsState={cmsState}
        activeWorld={activeWorld}
        onSelectWorld={handleInitiateWorldTransition}
        onGoHome={handleGoHome}
        onOpenCMS={() => setIsCMSOpen(true)}
      />

      {/* DELIBERATE WORLD TRANSITION OVERLAY */}
      {transitioningToWorld && (
        <WorldTransition
          targetWorld={transitioningToWorld}
          cmsState={cmsState}
          onComplete={handleTransitionComplete}
        />
      )}

      {/* MAIN VIEW: HOMEPAGE SEQUENCE VS DEDICATED WORLD EXPERIENCE */}
      <main className="flex-1">
        {activeWorld ? (
          /* DEDICATED WORLD ENVIRONMENT */
          <WorldExperience
            worldId={activeWorld}
            cmsState={cmsState}
            onBackToHome={handleGoHome}
            onSelectWorld={handleInitiateWorldTransition}
            onOpenProject={(project) => setSelectedProject(project)}
            onOpenContact={handleScrollToContact}
          />
        ) : (
          /* HOMEPAGE FLOW AS SPECIFIED:
             HERO
             ↓
             INTRODUCTION
             ↓
             FIVE WORLDS
             ↓
             WHAT DO YOU ACTUALLY NEED?
             ↓
             WORLD / SERVICE EXPLORATION
             ↓
             PROJECTS / OPPORTUNITIES
             ↓
             HEATH / DAWNLAND
             ↓
             CONTACT
          */
          <>
            {/* 1. HERO */}
            <Hero
              heroData={cmsState.homepage.hero}
              cmsState={cmsState}
              onExploreWorlds={handleScrollToFiveWorlds}
              onStartProject={handleScrollToContact}
              onSelectWorld={handleInitiateWorldTransition}
            />

            {/* 2. INTRODUCTION */}
            <Intro
              introData={cmsState.homepage.intro}
              cmsState={cmsState}
              onCtaClick={handleScrollToFiveWorlds}
            />

            {/* 3. FIVE WORLDS */}
            <div ref={fiveWorldsRef}>
              <FiveWorldCarousel
                cmsState={cmsState}
                onEnterWorld={handleInitiateWorldTransition}
              />
            </div>

            {/* 4. WHAT DO YOU ACTUALLY NEED? (PRACTICAL ENTRY POINT) */}
            <div ref={practicalRef}>
              <PracticalEntryPoint
                onSelectWorld={handleInitiateWorldTransition}
                onStartProject={handleScrollToContact}
              />
            </div>

            {/* 5. WORLD / SERVICE EXPLORATION */}
            <WorldExploration
              cmsState={cmsState}
              onSelectWorld={handleInitiateWorldTransition}
              onStartProject={handleScrollToContact}
            />

            {/* 6. PROJECTS / OPPORTUNITIES (SELECTED WORK) */}
            <ProjectsSection
              cmsState={cmsState}
              onSelectProject={(project) => setSelectedProject(project)}
              onSelectWorld={handleInitiateWorldTransition}
              onOpenCMS={() => setIsCMSOpen(true)}
              onStartProject={handleScrollToContact}
            />

            {/* 7. HEATH / DAWNLAND (LEADERSHIP & PHILOSOPHY) */}
            <HeathDawnlandSection
              cmsState={cmsState}
              onSelectWorld={handleInitiateWorldTransition}
              onStartProject={handleScrollToContact}
            />

            {/* 8. CONTACT (START A PROJECT) */}
            <div ref={contactRef}>
              <ContactSection
                company={cmsState.company}
                onSelectWorld={handleInitiateWorldTransition}
              />
            </div>
          </>
        )}
      </main>

      {/* GLOBAL FOOTER */}
      <Footer
        cmsState={cmsState}
        onSelectWorld={handleInitiateWorldTransition}
        onGoHome={handleGoHome}
        onOpenCMS={() => setIsCMSOpen(true)}
        onOpenContact={handleScrollToContact}
      />

      {/* DEEP PROJECT PRESENTATION MODAL / FOLDOUT */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          cmsState={cmsState}
          onClose={() => setSelectedProject(null)}
          onSelectWorld={(wId) => {
            setSelectedProject(null);
            handleInitiateWorldTransition(wId);
          }}
        />
      )}

      {/* LIVE CMS STUDIO MODAL (Testing & Content Authoring) */}
      {isCMSOpen && (
        <CMSStudioModal
          cmsState={cmsState}
          onUpdateState={handleUpdateCMS}
          onResetDefaults={handleResetDefaults}
          onClose={() => setIsCMSOpen(false)}
        />
      )}
    </div>
  );
}
