/**
 * Dawnland Development V2 - Authoritative Domain Architecture & Types
 *
 * Hierarchy:
 *
 * DAWNLAND
 * ├── Company / Site
 * ├── Homepage
 * ├── Worlds
 * │   ├── BUILD
 * │   ├── LAND
 * │   ├── CREATE
 * │   ├── CUSTOM
 * │   └── DAWNLAND
 * ├── Packages
 * ├── Projects
 * │   ├── Basic Information
 * │   ├── Property / Site
 * │   ├── Existing Conditions
 *   ├── Proposed Conditions
 *   ├── Design / Geometry
 *   ├── Scope
 *   ├── Package / Pathway
 *   ├── Allowances
 *   ├── Financing
 *   ├── Realtor
 *   ├── Images
 *   └── Documents
 * └── Media
 *
 * This file is the authoritative TypeScript contract for the CMS.
 */

/* =========================================================================
   WORLDS
   ========================================================================= */

export type WorldId =
  | 'BUILD'
  | 'LAND'
  | 'CREATE'
  | 'CUSTOM'
  | 'DAWNLAND';

/* =========================================================================
   MEDIA
   ========================================================================= */

export type ImageRole =
  | 'HERO'
  | 'WORLD'
  | 'CAROUSEL'
  | 'FEATURE'
  | 'PROJECT'
  | 'GALLERY'
  | 'BEFORE'
  | 'AFTER'
  | 'DETAIL'
  | 'SUPPORTING';

export type FocalPoint =
  | 'center'
  | 'top'
  | 'bottom'
  | 'left'
  | 'right';

export interface ImageRecord {
  id: string;
  blobUrl: string;
  pathname?: string;
  filename: string;
  mimeType: string;
  width: number;
  height: number;
  fileSize: number;
  alt: string;
  title: string;
  caption?: string;
  focalPoint: FocalPoint;
  role: ImageRole;
  visibility: boolean;
  createdAt: string;
  updatedAt: string;
}

/* =========================================================================
   COMPANY / SITE
   ========================================================================= */

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio?: string;
  imageId?: string;
}

export interface LinkItem {
  label: string;
  url: string;
}

export interface CompanyData {
  name: string;
  tagline: string;
  phone: string;
  email: string;
  location: string;
  address: string;
  hours: string;
  people: TeamMember[];
  socialLinks: LinkItem[];
  externalLinks: LinkItem[];
}

/* =========================================================================
   NAVIGATION
   ========================================================================= */

export interface NavigationItem {
  id: string;
  label: string;
  link: string;
  worldId?: WorldId;
  visible: boolean;
  order: number;
}

/* =========================================================================
   HOMEPAGE
   ========================================================================= */

export interface HeroData {
  heading: string;
  subheading: string;
  imageId: string;
  secondaryImageId?: string;
  ctaLabel?: string;
  ctaWorld?: WorldId;
  visible: boolean;
}

export interface IntroData {
  eyebrow: string;
  heading: string;
  paragraphs: string[];
  imageId?: string;
  ctaText?: string;
  visible: boolean;
}

export interface CliffNoteItem {
  id: string;
  stepNumber: string;
  prompt: string;
  title: string;
  summary: string;
  targetWorld: WorldId;
  actionText: string;
}

export interface CliffNotesData {
  title: string;
  subtitle: string;
  items: CliffNoteItem[];
  visible: boolean;
}

export interface HomepageData {
  hero: HeroData;
  intro: IntroData;
  cliffNotes: CliffNotesData;
}

/* =========================================================================
   WORLDS
   ========================================================================= */

export interface WorldPathway {
  id: string;
  title: string;
  summary: string;
  detail?: string;
}

export interface WorldSection {
  id: string;
  title: string;
  content: string;
  imageId?: string;
  order: number;
  visible: boolean;
}

export interface ContextualNote {
  heading: string;
  text: string;
  visible: boolean;
}

export interface WorldData {
  id: WorldId;
  name: WorldId;
  tagline: string;
  headline: string;
  description: string;
  heroImageId: string;
  featureImageId?: string;
  accentColor: string;
  pathways: WorldPathway[];
  sections: WorldSection[];
  relatedWorlds: WorldId[];
  realtorNote?: ContextualNote;
  financingNote?: ContextualNote;
  order: number;
  visible: boolean;
}

/* =========================================================================
   MEASUREMENTS
   ========================================================================= */

export interface Measurement {
  value: number;
  unit: string;
}

/* =========================================================================
   PACKAGES
   ========================================================================= */

export type PackageTier =
  | 'Remodel'
  | 'Vanilla Box'
  | 'Build-to-Suit'
  | 'Pre-Designed'
  | 'Custom'
  | 'Investor / Project Pathway';

export type PreDesignedPathway =
  | 'Build as Designed'
  | 'Choose Options & Upgrades'
  | 'Customize for Your Property'
  | 'Optional Build-to-Suit Modifications';

/**
 * Defined Vanilla Box completion specification.
 *
 * Vanilla Box is a completion tier/pathway, not simply a generic
 * unfinished shell.
 */
export interface VanillaBoxSpecs {
  drywallSurfaces: string;
  switchesAndLights: string;
  flooringExcluded: string;
  kitchenPreparedness: string;
  sidingReadyExterior: string;
  weatherBarrierAndWrap: string;
  wrappedTrim?: string;
  structuralConstraint: string;
  upgradesArrangement?: string;
  escrowDisbursement?: string;
  allowances?: DefinedAllowances;
}

/**
 * CMS definition for one project/package pathway.
 */
export interface PackageDefinition {
  id: string;
  name: string;
  tier?: PackageTier;

  shortDescription: string;
  fullDescription: string;

  inclusions: string[];
  exclusions: string[];

  availableWorlds: WorldId[];

  financingNotes: string;
  realtorNotes: string;

  pathwayInformation?: string[];

  /**
   * Used for package-specific editable specifications.
   * Vanilla Box uses the structured vanillaBoxSpecs field below.
   */
  packageSpecificSpecs?: Record<string, string>;

  preDesignedPathways?: PreDesignedPathway[];

  vanillaBoxSpecs?: VanillaBoxSpecs;

  visible?: boolean;
  visibility?: boolean;
  order?: number;
  displayOrder?: number;
}

/* =========================================================================
   ALLOWANCES
   ========================================================================= */

export interface AllowanceItem {
  amount: number;
  unit: string;
  description: string;
}

export interface DefinedAllowances {
  siding: AllowanceItem;
  cabinetsCounters: AllowanceItem;
  appliances: AllowanceItem;
  flooring: AllowanceItem;
  stairs: AllowanceItem;
  bathroom: AllowanceItem;
}

/* =========================================================================
   PROJECT PROPERTY / SITE
   ========================================================================= */

export interface ProjectProperty {
  parcelInfo: string;
  parcelSize: Measurement;
  zoning: string;
  terrainSlope: string;
  ledgeConditions: string;
  solarOrientation: string;
  accessCorridor: string;
  utilitiesLogistics: string;
}

/* =========================================================================
   PROJECT EXISTING CONDITIONS
   ========================================================================= */

export interface ProjectExistingConditions {
  hasExistingStructure: boolean;

  structureType: string;
  yearAndCondition: string;
  foundation: string;
  framing: string;
  buildingEnvelope: string;
  existingUtilities: string;

  dimensions?: {
    length: Measurement;
    width: Measurement;
    height: Measurement;
  };

  elevations?: {
    north: string;
    south: string;
    east: string;
    west: string;
    finishedGradeOffset?: string;
  };
}

/* =========================================================================
   PROJECT PROPOSED CONDITIONS
   ========================================================================= */

export interface ProjectProposedConditions {
  structureType?: string;
  roofPitch?: string;

  proposedFootprint: Measurement;
  livingArea: Measurement;

  stories: number;

  foundation: string;
  thermalPerformance: string;
  mechanicalSystems: string;

  dimensions: {
    length: Measurement;
    width: Measurement;
    ceilingHeightMain: Measurement;
    ceilingHeightUpper: Measurement;
    ridgeHeight: Measurement;
  };

  elevations: {
    north: string;
    south: string;
    east: string;
    west: string;
    finishedGradeOffset: string;
  };
}

/* =========================================================================
   PROJECT DESIGN / GEOMETRY
   ========================================================================= */

export interface ProjectFloorLayout {
  primaryConcept?: string;
  bedrooms: number;
  bathrooms: number;
  primaryRooms: string[];
  circulationNotes: string;
}

export interface ProjectRoofGeometry {
  primaryPitch: string;
  dormerPitch: string;
  overhangDepth: Measurement;
  fasciaDetail: string;
}

export interface ProjectWallGeometry {
  wallAngles: string;
  shearWallEngineering: string;
  ceilingProfiles?: string;
}

export interface ProjectInteriorDesign {
  drywallFinish: string;
  trimDetails: string;
  cabinetPreparedness: string;
  lightingLayout: string;
  flooringStatus: string;
}

export interface ProjectExteriorDesign {
  claddingType: string;
  weatherBarrier: string;
  windowDoorRatings: string;
  trimWrap: string;
  sidingReadiness: string;
}

export interface ProjectDesign {
  floorLayout: ProjectFloorLayout;
  roofGeometry: ProjectRoofGeometry;
  wallGeometry: ProjectWallGeometry;
  interiorDesign: ProjectInteriorDesign;
  exteriorDesign: ProjectExteriorDesign;
}

/* =========================================================================
   PROJECT SCOPE
   ========================================================================= */

export interface ProjectScopePhaseItem {
  id: string;
  name: string;
  duration: string;
  deliverables: string[];
}

export interface ProjectScope {
  summary: string;
  phases: (string | ProjectScopePhaseItem)[];
  inclusions: string[];
  exclusions: string[];
}

/* =========================================================================
   PROJECT PACKAGE / PATHWAY
   ========================================================================= */

export interface ProjectPackageSelection {
  selectedPackage: PackageTier;

  /**
   * Only used when selectedPackage === 'Pre-Designed'.
   */
  preDesignedPathway?: PreDesignedPathway;

  /**
   * Project-specific Vanilla Box completion details.
   */
  vanillaBoxSpecs?: VanillaBoxSpecs;
}

/* =========================================================================
   PROJECT FINANCING
   ========================================================================= */

export interface ProjectFinancing {
  structure: string;
  lenderCoordination: string;
  milestoneDraws: string;
  escrowHoldback: string;
}

/* =========================================================================
   PROJECT REALTOR COORDINATION
   ========================================================================= */

export interface ProjectRealtor {
  involvement: string;
  dueDiligenceSupport: string;
  brokerCoordination: string;
  preSaleValuation: string;
}

/* =========================================================================
   PROJECT DOCUMENTS
   ========================================================================= */

export type ProjectDocumentType =
  | 'Architectural Plans'
  | 'Site Survey'
  | 'Permit & Zoning'
  | 'Structural Engineering'
  | 'Specifications'
  | 'Financing / Draw Schedule'
  | 'Other';

export interface ProjectDocument {
  id: string;
  label: string;
  url: string;
  documentType: ProjectDocumentType;
}

/* =========================================================================
   PROJECT RECORD
   ========================================================================= */

/**
 * Project status describes the CMS record itself.
 */
export type ProjectStatus =
  | 'Completed'
  | 'In Progress'
  | 'Concept'
  | 'Opportunity';

/**
 * A project is the central planning record.
 *
 * Images live directly on the project record rather than inside a second
 * competing ProjectImages object. This keeps the CMS modal, world displays,
 * image selectors, and project records on one consistent model.
 */
export interface ProjectRecord {
  id: string;

  /* Basic information */
  title: string;
  location: string;
  status: ProjectStatus;
  description: string;
  projectType: string;

  relatedWorlds: WorldId[];

  /* Images */
  primaryImageId: string;
  galleryImageIds: string[];

  beforeImageId?: string;
  afterImageId?: string;
  progressImageIds?: string[];
  supportingImageIds?: string[];

  images?: {
    primaryImageId: string;
    galleryImageIds: string[];
    beforeImageId?: string;
    afterImageId?: string;
    progressImageIds?: string[];
    supportingImageIds?: string[];
  };

  /* Project planning domains */
  property: ProjectProperty;

  existingConditions: ProjectExistingConditions;

  proposedConditions: ProjectProposedConditions;

  design: ProjectDesign;

  scope: ProjectScope;

  packageSelection: ProjectPackageSelection;

  allowances: DefinedAllowances;

  financing: ProjectFinancing;

  realtor: ProjectRealtor;

  documents: ProjectDocument[];

  /* CMS visibility / ordering */
  visibility: boolean;
  order: number;
}

/* =========================================================================
   CMS ROOT STATE
   ========================================================================= */

export interface CMSState {
  company: CompanyData;

  navigation: NavigationItem[];

  homepage: HomepageData;

  worlds: Record<WorldId, WorldData>;

  /**
   * Global package library.
   *
   * This is separate from the package selection stored on each project.
   */
  packages: PackageDefinition[];

  /**
   * Actual project/property records.
   *
   * This array may legitimately be empty.
   */
  projects: ProjectRecord[];

  /**
   * Central image/media registry.
   */
  images: ImageRecord[];
}

