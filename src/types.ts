/**
 * Dawnland Development V2 - Core Types & Schemas
 */

export type WorldId = 'BUILD' | 'LAND' | 'CREATE' | 'CUSTOM' | 'DAWNLAND';

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

export type FocalPoint = 'center' | 'top' | 'bottom' | 'left' | 'right';

export interface ImageRecord {
  id: string;
  blobUrl: string;
  pathname?: string;
  filename: string;
  mimeType: string;
  width: number;
  height: number;
  fileSize: number; // in bytes
  alt: string;
  title: string;
  caption?: string;
  focalPoint: FocalPoint;
  role: ImageRole;
  visibility: boolean;
  createdAt: string;
  updatedAt: string;
}

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

export interface NavigationItem {
  id: string;
  label: string;
  link: string;
  worldId?: WorldId;
  visible: boolean;
  order: number;
}

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
  prompt: string; // e.g. "What Dawnland is"
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

export interface ProjectDetails {
  overview?: string;
  property?: string;
  concept?: string;
  design?: string;
  construction?: string;
  materials?: string;
  financing?: string;
  partners?: string;
  realtorContext?: string;
  documents?: Array<{ label: string; url: string; type: string }>;
}

export interface ProjectRecord {
  id: string;
  title: string;
  location: string;
  status: 'Completed' | 'In Progress' | 'Concept' | 'Opportunity';
  description: string;
  projectType: string;
  relatedWorlds: WorldId[];
  primaryImageId: string;
  galleryImageIds: string[];
  beforeImageId?: string;
  afterImageId?: string;
  progressImageIds?: string[];
  supportingImageIds?: string[];
  details: ProjectDetails;
  visibility: boolean;
  order: number;
}

export interface CMSState {
  company: CompanyData;
  navigation: NavigationItem[];
  homepage: HomepageData;
  worlds: Record<WorldId, WorldData>;
  projects: ProjectRecord[];
  images: ImageRecord[];
}
