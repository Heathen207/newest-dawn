/**
 * Dawnland Development V2 - Initial Seed Data
 *
 * Matches the authoritative src/types.ts contract.
 * No legacy planningSystem / DEFAULT_PLANNING_DATA structures.
 */
import {
  CMSState,
  DefinedAllowances,
  ImageRecord,
  PackageDefinition,
  ProjectRecord,
  WorldData,
  WorldId,
} from '../types';

/* -------------------------------------------------------------------------
   CONCEPTUAL MEDIA
   These are original inline SVG compositions, not project photographs.
   Replace them through the CMS image registry when real media is supplied.
   ------------------------------------------------------------------------- */
const svg = (body: string) =>
  `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900">
      <rect width="1600" height="900" fill="#171716"/>
      ${body}
    </svg>` )}`;

const CONCEPT_IMAGES: ImageRecord[] = [
  {
    id: 'img-hero-primary', blobUrl: svg(`<path d="M0 650 C280 560 420 700 690 590 S1130 480 1600 570 V900 H0Z" fill="#343638"/><path d="M0 735 C330 620 570 780 900 650 S1270 600 1600 690" fill="none" stroke="#a9683d" stroke-width="5"/><path d="M0 790 C350 680 580 840 930 720 S1290 680 1600 760" fill="none" stroke="#59605a" stroke-width="2"/><circle cx="1240" cy="255" r="105" fill="#b87345" opacity=".9"/>`), filename: 'dawnland-horizon.svg', mimeType: 'image/svg+xml', width: 1600, height: 900, fileSize: 0, alt: 'Abstract Maine horizon with topographic contours', title: 'Dawnland Horizon', focalPoint: 'center', role: 'HERO', visibility: true, createdAt: '2026-09-22T00:00:00Z', updatedAt: '2026-09-22T00:00:00Z'
  },
  {
    id: 'img-world-build', blobUrl: svg(`<path d="M260 650 L260 380 L800 170 L1340 380 L1340 650" fill="#252625" stroke="#b87345" stroke-width="8"/><path d="M180 380 L800 105 L1420 380" fill="none" stroke="#d6c9b4" stroke-width="10"/><path d="M450 650 V440 H650 V650 M950 650 V440 H1150 V650" fill="none" stroke="#858887" stroke-width="8"/>`), filename: 'world-build.svg', mimeType: 'image/svg+xml', width: 1600, height: 900, fileSize: 0, alt: 'Abstract timber building geometry', title: 'Build World', focalPoint: 'center', role: 'WORLD', visibility: true, createdAt: '2026-09-22T00:00:00Z', updatedAt: '2026-09-22T00:00:00Z'
  },
  {
    id: 'img-world-land', blobUrl: svg(`<path d="M0 700 C220 580 390 640 570 530 S900 450 1100 540 S1380 600 1600 470 V900 H0Z" fill="#303531"/><path d="M100 760 C330 620 500 710 700 600 S1050 530 1250 630 S1450 650 1580 560" fill="none" stroke="#65705f" stroke-width="5"/><path d="M350 710 L690 460 L1040 700" fill="none" stroke="#b87345" stroke-width="5"/>`), filename: 'world-land.svg', mimeType: 'image/svg+xml', width: 1600, height: 900, fileSize: 0, alt: 'Abstract terrain and site-planning contours', title: 'Land World', focalPoint: 'center', role: 'WORLD', visibility: true, createdAt: '2026-09-22T00:00:00Z', updatedAt: '2026-09-22T00:00:00Z'
  },
  {
    id: 'img-world-create', blobUrl: svg(`<path d="M230 650 L430 300 L800 180 L1170 300 L1370 650" fill="none" stroke="#b87345" stroke-width="8"/><circle cx="800" cy="420" r="170" fill="none" stroke="#d6c9b4" stroke-width="6"/><path d="M610 650 C690 560 910 560 990 650" fill="none" stroke="#59605a" stroke-width="12"/>`), filename: 'world-create.svg', mimeType: 'image/svg+xml', width: 1600, height: 900, fileSize: 0, alt: 'Abstract custom fabrication and design geometry', title: 'Create World', focalPoint: 'center', role: 'WORLD', visibility: true, createdAt: '2026-09-22T00:00:00Z', updatedAt: '2026-09-22T00:00:00Z'
  },
  {
    id: 'img-world-custom', blobUrl: svg(`<path d="M240 650 L500 360 L760 520 L1040 250 L1360 650" fill="none" stroke="#b87345" stroke-width="12"/><path d="M380 690 H1220 M500 610 H1100" stroke="#59605a" stroke-width="4"/>`), filename: 'world-custom.svg', mimeType: 'image/svg+xml', width: 1600, height: 900, fileSize: 0, alt: 'Abstract custom structural and artistic forms', title: 'Custom World', focalPoint: 'center', role: 'WORLD', visibility: true, createdAt: '2026-09-22T00:00:00Z', updatedAt: '2026-09-22T00:00:00Z'
  },
  {
    id: 'img-world-dawnland', blobUrl: svg(`<circle cx="800" cy="360" r="180" fill="none" stroke="#b87345" stroke-width="7"/><path d="M120 700 C380 570 500 760 760 610 S1200 530 1480 690" fill="none" stroke="#d6c9b4" stroke-width="6"/><path d="M0 770 C300 640 500 820 820 680 S1250 610 1600 760" fill="none" stroke="#59605a" stroke-width="3"/>`), filename: 'world-dawnland.svg', mimeType: 'image/svg+xml', width: 1600, height: 900, fileSize: 0, alt: 'Abstract Dawnland landscape and sunrise', title: 'Dawnland World', focalPoint: 'center', role: 'WORLD', visibility: true, createdAt: '2026-09-22T00:00:00Z', updatedAt: '2026-09-22T00:00:00Z'
  }
];

const allowances: DefinedAllowances = {
  siding: { amount: 0, unit: 'project allowance', description: 'Locked project allowance established before construction.' },
  cabinetsCounters: { amount: 0, unit: 'project allowance', description: 'Locked cabinet and countertop allowance.' },
  appliances: { amount: 0, unit: 'project allowance', description: 'Locked appliance allowance.' },
  flooring: { amount: 0, unit: 'project allowance', description: 'Locked flooring allowance.' },
  stairs: { amount: 0, unit: 'project allowance', description: 'Locked stair allowance where applicable.' },
  bathroom: { amount: 0, unit: 'project allowance', description: 'Locked bathroom fixture/finish allowance where specified.' }
};

const vanillaBoxSpecs = {
  drywallSurfaces: 'Drywall installed and primed, ready for final finish selections.',
  switchesAndLights: 'Specified switches and basic light fixtures installed as part of the defined completion scope.',
  flooringExcluded: 'Finished flooring is excluded from the completed tier unless specifically included by the project agreement.',
  kitchenPreparedness: 'Kitchen is prepared for cabinets, countertops, and appliances. Final selections remain within the locked allowance structure.',
  sidingReadyExterior: 'Exterior is brought to siding-ready condition, with the weather barrier complete and exterior trim prepared.',
  weatherBarrierAndWrap: 'Tyvek/weather barrier installed, taped and weather-tight at the defined exterior scope.',
  wrappedTrim: 'Exterior trim is wrapped/painted where specified so the property is ready for the selected siding system.',
  structuralConstraint: 'Vanilla Box is a completion tier, not permission for layout or structural redesign. Layout and structural changes are outside the locked scope.',
  upgradesArrangement: 'All upgrades beyond the defined tier must be selected, priced, and paid or otherwise secured through the purchase/loan arrangement.',
  escrowDisbursement: 'Where lender financing is used, agreed allowances and upgrade funds may be held and disbursed according to the lender-approved draw structure.',
  allowances
};

const packages: PackageDefinition[] = [
  {
    id: 'pkg-remodel', name: 'Remodel', tier: 'Remodel',
    shortDescription: 'Existing-property renovation, repair, reconfiguration, and finish work.',
    fullDescription: 'A flexible renovation pathway for existing structures, including targeted repairs, exterior work, interior renovations, structural correction, and coordinated specialty trades.',
    inclusions: ['Existing-condition review', 'Defined renovation scope', 'Repair and replacement work', 'Trade coordination', 'Progress documentation'],
    exclusions: ['Unapproved scope changes', 'Engineering or licensed specialty design services unless separately engaged'],
    availableWorlds: ['BUILD', 'CUSTOM', 'DAWNLAND'], financingNotes: 'Scope can be organized for owner financing, renovation lending, or lender draw review where applicable.', realtorNotes: 'Useful for preparing an existing property for sale or evaluating renovation feasibility.', pathwayInformation: ['Assess', 'Scope', 'Price', 'Execute', 'Document'], visible: true, order: 1
  },
  {
    id: 'pkg-vanilla-box', name: 'Vanilla Box', tier: 'Vanilla Box',
    shortDescription: 'A defined completion tier for flips, investors, new construction, and buyer-finish pathways.',
    fullDescription: 'Vanilla Box is not simply an unfinished white shell. It is a defined completion tier that carries the building through drywall/primer, specified switches and lights, a kitchen ready for cabinets/counters/appliances, and an exterior ready for siding, while leaving selected finish choices inside locked allowances.',
    inclusions: ['Drywall and primer', 'Specified switches and lights', 'Flooring excluded unless specifically included', 'Kitchen prepared for cabinets/counters/appliances', 'Weather barrier and siding-ready exterior', 'Defined allowance schedule'],
    exclusions: ['Layout changes', 'Structural redesign', 'Unapproved upgrades', 'Finish selections outside the locked allowance'],
    availableWorlds: ['BUILD', 'CREATE', 'CUSTOM', 'DAWNLAND'], financingNotes: 'Designed to work with investor, construction, renovation, or purchase-plus-improvement financing. Allowances and upgrades should be secured in the purchase/loan arrangement.', realtorNotes: 'Can give a buyer a clear, finite completion point while preserving controlled finish selections.', pathwayInformation: ['Define the completion tier', 'Lock allowances', 'Complete core work', 'Buyer selects finishes', 'Finish within approved allowance'], packageSpecificSpecs: { completionTier: 'Defined Vanilla Box completion tier', structuralChanges: 'Not included', upgradeFunding: 'Paid/held through purchase or loan arrangement' }, vanillaBoxSpecs, visible: true, order: 2
  },
  {
    id: 'pkg-build-to-suit', name: 'Build-to-Suit', tier: 'Build-to-Suit',
    shortDescription: 'A property-specific home or project planned around the buyer, site, budget, and intended use.',
    fullDescription: 'Build-to-Suit begins with what the client actually needs. The project is developed around the property, program, geometry, scope, allowances, financing structure, and construction pathway before execution.',
    inclusions: ['Property/site review', 'Program and design definition', 'Geometry and elevation inputs', 'Scope development', 'Allowance structure', 'Trade coordination'],
    exclusions: ['Uncontracted engineering, architectural, or licensed specialty services'],
    availableWorlds: ['BUILD', 'LAND', 'CREATE', 'CUSTOM'], financingNotes: 'Project scope can be organized into lender-ready phases, allowances, and milestone draws.', realtorNotes: 'Can be developed with a buyer and Realtor around an existing lot or identified property.', pathwayInformation: ['Define need', 'Evaluate property', 'Develop design', 'Price scope', 'Coordinate financing', 'Build'], visible: true, order: 3
  },
  {
    id: 'pkg-pre-designed', name: 'Pre-Designed', tier: 'Pre-Designed',
    shortDescription: 'Homes designed, priced, and prepared before the client chooses one.',
    fullDescription: 'Pre-Designed projects begin from an established home concept with defined geometry, pricing structure, and options before the client selects the project. The chosen design can remain as designed or be adapted to the property.',
    inclusions: ['Prepared design concept', 'Defined base scope', 'Defined options', 'Property adaptation pathway', 'Optional Build-to-Suit modifications'],
    exclusions: ['Unapproved structural changes', 'Site-specific work not included in the selected scope'],
    availableWorlds: ['BUILD', 'LAND', 'CREATE'], financingNotes: 'Base pricing and selected options can be organized for purchase or construction financing.', realtorNotes: 'Useful for creating understandable inventory from a prepared home concept.', preDesignedPathways: ['Build as Designed', 'Choose Options & Upgrades', 'Customize for Your Property', 'Optional Build-to-Suit Modifications'], pathwayInformation: ['Select a prepared design', 'Choose pathway', 'Adapt to property if needed', 'Finalize scope', 'Build'], visible: true, order: 4
  },
  {
    id: 'pkg-custom', name: 'Custom', tier: 'Custom',
    shortDescription: 'One-off structures, unusual materials, specialty fabrication, artistic work, and uncommon building concepts.',
    fullDescription: 'Custom work exists for projects that do not fit a standard package. It may combine construction, reclaimed materials, specialty carpentry, fabrication partners, unusual geometry, or destination-oriented spaces.',
    inclusions: ['Concept development', 'Custom scope', 'Specialty coordination', 'Fabrication integration', 'Site-specific execution'],
    exclusions: ['Specialist engineering or licensed services unless separately engaged'],
    availableWorlds: ['CREATE', 'CUSTOM', 'DAWNLAND'], financingNotes: 'Financing structure is developed project by project around the defined scope and lender requirements.', realtorNotes: 'Can be useful for unusual properties, destination rentals, artistic structures, or differentiated listings.', visible: true, order: 5
  },
  {
    id: 'pkg-investor-pathway', name: 'Investor / Project Pathway', tier: 'Investor / Project Pathway',
    shortDescription: 'A planning pathway for acquisition, repositioning, renovation, Vanilla Box completion, resale, or new-build opportunities.',
    fullDescription: 'This pathway organizes the property, scope, completion tier, allowances, financing, and exit strategy around an investment project without forcing the project into a conventional homeowner package.',
    inclusions: ['Property feasibility', 'Existing-condition review', 'Scope and cost planning', 'Completion pathway', 'Allowance schedule', 'Realtor coordination', 'Financing/draw coordination'],
    exclusions: ['Investment return guarantees', 'Unapproved scope', 'Professional services outside Dawnland’s stated role'],
    availableWorlds: ['LAND', 'BUILD', 'CUSTOM', 'DAWNLAND'], financingNotes: 'Supports organization of acquisition, renovation, construction, draw, and holdback information for lender review.', realtorNotes: 'Designed to coordinate property opportunities with Realtors while keeping roles and compensation transparent.', pathwayInformation: ['Find/evaluate property', 'Define intervention', 'Select completion tier', 'Price', 'Finance', 'Execute', 'Position for sale/hold'], visible: true, order: 6
  }
];

const world = (data: Omit<WorldData, 'id' | 'name'> & { id: WorldId }): WorldData => ({ ...data, name: data.id });

const worlds: Record<WorldId, WorldData> = {
  BUILD: world({ id: 'BUILD', tagline: 'FROM GROUND TO FINISH', headline: 'BUILD', description: 'Residential construction, renovation, structural repair, project management, and coordinated execution from the site through completion.', heroImageId: 'img-world-build', featureImageId: 'img-world-build', accentColor: '#b87345', pathways: [
    { id: 'build-new', title: 'New Construction', summary: 'From site preparation through framing, envelope, interiors, and finish coordination.' },
    { id: 'build-remodel', title: 'Remodel & Renovation', summary: 'Repair, reconfigure, restore, and finish existing properties around actual conditions.' },
    { id: 'build-vanilla', title: 'Vanilla Box', summary: 'A defined completion tier for investor, flip, new-build, and buyer-finish projects.' },
    { id: 'build-presale', title: 'Pre-Designed', summary: 'Prepared home concepts that can be built as designed or adapted to a property.' }
  ], sections: [
    { id: 'build-site', title: 'The Building Begins Before the Building', content: 'Site access, grade, drainage, foundation conditions, utilities, and material logistics are part of the build plan.', order: 1, visible: true },
    { id: 'build-field', title: 'Field Execution', content: 'Framing-to-finish carpentry, exterior work, structural repair, estimating, takeoffs, and coordinated specialty trades.', order: 2, visible: true }
  ], relatedWorlds: ['LAND', 'CUSTOM'], realtorNote: { heading: 'Realtor Coordination', text: 'Constructability and completion-path information can help buyers understand what a property can realistically become.', visible: true }, financingNote: { heading: 'Financing', text: 'Scopes, allowances, and milestone work can be organized for lender review and draw coordination.', visible: true }, order: 1, visible: true }),
  LAND: world({ id: 'LAND', tagline: 'SEE THE PROPERTY BEFORE YOU BUILD ON IT', headline: 'LAND', description: 'Property feasibility, access, clearing, drainage, subdivision concepts, utilities, and site strategy.', heroImageId: 'img-world-land', featureImageId: 'img-world-land', accentColor: '#66715f', pathways: [
    { id: 'land-parcel', title: 'Parcel Feasibility', summary: 'Understand terrain, access, utilities, orientation, and likely building envelopes.' },
    { id: 'land-subdivision', title: 'Subdivision Planning', summary: 'Conceptual evaluation of acreage division, access, frontage, and site yield.' },
    { id: 'land-groundwork', title: 'Groundwork & Access', summary: 'Clearing, driveway preparation, drainage, excavation, and utility corridors.' },
    { id: 'land-opportunity', title: 'Property Opportunities', summary: 'Evaluate raw, stalled, damaged, unfinished, or unusual properties.' }
  ], sections: [
    { id: 'land-evaluate', title: 'See What Is There', content: 'Existing conditions, slope, ledge, solar orientation, access, utilities, and water movement belong in the first conversation.', order: 1, visible: true },
    { id: 'land-plan', title: 'Then Decide What It Can Become', content: 'A practical site strategy can precede design, construction, subdivision, or a property transaction.', order: 2, visible: true }
  ], relatedWorlds: ['BUILD', 'DAWNLAND'], realtorNote: { heading: 'Property & Listing Support', text: 'Dawnland can provide constructability input and preliminary site evaluation without promising commissions or referral payments.', visible: true }, financingNote: { heading: 'Land + Construction', text: 'Site work and construction phases can be documented separately for planning and lender conversations.', visible: true }, order: 2, visible: true }),
  CREATE: world({ id: 'CREATE', tagline: 'WHEN STANDARD PRODUCTS STOP SHORT', headline: 'CREATE', description: 'Custom homes, themed spaces, modular concepts, reclaimed materials, fabrication, and specialty construction.', heroImageId: 'img-world-create', featureImageId: 'img-world-create', accentColor: '#a9683d', pathways: [
    { id: 'create-home', title: 'Themed Homes & Spaces', summary: 'Distinctive interiors, destination rentals, children’s spaces, and unusual environments.' },
    { id: 'create-fabrication', title: 'Fabrication & Specialty Carpentry', summary: 'Custom timber, metal, stairs, brackets, structures, and one-off components.' },
    { id: 'create-mobile', title: 'Mobile & Modular Concepts', summary: 'Tiny homes, campers, trailers, modular components, and event installations.' },
    { id: 'create-art', title: 'Art Integrated Into Structure', summary: 'Architectural artwork and installations that are built into the environment.' }
  ], sections: [
    { id: 'create-material', title: 'Material Is Part of the Idea', content: 'Reclaimed timber, steel, glass, unusual assemblies, and site-specific fabrication can become part of the design rather than decoration added afterward.', order: 1, visible: true },
    { id: 'create-solve', title: 'Build the Unusual', content: 'When the project does not fit a standard product category, the scope becomes the product.', order: 2, visible: true }
  ], relatedWorlds: ['CUSTOM', 'BUILD'], realtorNote: { heading: 'Differentiated Property', text: 'Distinctive spaces can be developed as a property feature, destination rental concept, or buyer-specific project.', visible: true }, financingNote: { heading: 'Project-Specific Financing', text: 'Unusual builds require a clearly documented scope and allowance structure before financing discussions.', visible: true }, order: 3, visible: true }),
  CUSTOM: world({ id: 'CUSTOM', tagline: 'NO TEMPLATE REQUIRED', headline: 'CUSTOM', description: 'All-inclusive packages, rare opportunities, complex renovations, specialty fabrication, and projects that need their own rules.', heroImageId: 'img-world-custom', featureImageId: 'img-world-custom', accentColor: '#8b735d', pathways: [
    { id: 'custom-all-inclusive', title: 'All-Inclusive Project Packages', summary: 'Combine property, design, construction, coordination, and completion into one defined pathway.' },
    { id: 'custom-builds', title: 'Custom Builds', summary: 'One-off homes, structures, renovations, and specialty environments.' },
    { id: 'custom-rare', title: 'Rare Opportunities', summary: 'Properties and ideas that require a different approach to become viable.' },
    { id: 'custom-salvage', title: 'Reclaimed & Salvage', summary: 'Preserve useful structural and architectural material where it makes sense.' }
  ], sections: [
    { id: 'custom-scope', title: 'Define the Actual Problem', content: 'Custom does not mean undefined. It means the scope is built around the actual property, objective, constraints, and desired result.', order: 1, visible: true },
    { id: 'custom-coordinate', title: 'Coordinate the Pieces', content: 'Dawnland can combine hands-on construction with independent licensed and specialty professionals where required.', order: 2, visible: true }
  ], relatedWorlds: ['CREATE', 'BUILD', 'DAWNLAND'], realtorNote: { heading: 'Unusual Properties', text: 'Custom pathways can give unusual listings a realistic physical and construction story.', visible: true }, financingNote: { heading: 'Defined Scope First', text: 'Custom projects benefit from documented scope, allowances, milestones, and contingency before financing is finalized.', visible: true }, order: 4, visible: true }),
  DAWNLAND: world({ id: 'DAWNLAND', tagline: 'THE WHOLE PROPERTY PERSPECTIVE', headline: 'DAWNLAND', description: 'The connective layer: planning, estimating, property strategy, coordination, communication, and the people behind the work.', heroImageId: 'img-world-dawnland', featureImageId: 'img-world-dawnland', accentColor: '#b87345', pathways: [
    { id: 'dawnland-project', title: 'Project Leadership', summary: 'Turn the moving parts into one understandable project path.' },
    { id: 'dawnland-estimate', title: 'Estimating & Scope', summary: 'Blueprint review, takeoffs, scopes, allowances, change orders, and planning.' },
    { id: 'dawnland-realtor', title: 'Realtor Collaboration', summary: 'Property evaluation, constructability input, and buyer/project coordination.' },
    { id: 'dawnland-insurance', title: 'Insurance & Restoration', summary: 'Damage documentation, repair scopes, stabilization, and reconstruction planning.' }
  ], sections: [
    { id: 'dawnland-whole', title: 'We See the Whole Property', content: 'The building, land, access, drainage, utilities, money, schedule, and people are parts of the same problem.', order: 1, visible: true },
    { id: 'dawnland-heath', title: 'Heath Titcomb', content: 'Approximately 30 years of hands-on construction experience spanning framing-to-finish carpentry, site work, excavation, demolition/salvage, estimating, blueprint review, and project leadership.', order: 2, visible: true }
  ], relatedWorlds: ['BUILD', 'LAND', 'CREATE', 'CUSTOM'], realtorNote: { heading: 'Realtor Family & Partners', text: 'Professional collaboration is centered on constructability, property strategy, and project coordination. No commissions or referral payments are promised.', visible: true }, financingNote: { heading: 'Financing Coordination', text: 'Project information can be organized so owners, buyers, Realtors, and lenders can see the same scope and completion path.', visible: true }, order: 5, visible: true })
};

const projects: ProjectRecord[] = [];

export const INITIAL_IMAGES = CONCEPT_IMAGES;
export const INITIAL_PACKAGES = packages;
export const INITIAL_WORLDS = worlds;
export const INITIAL_PROJECTS = projects;

export const INITIAL_DATA: CMSState = {
  company: {
    name: 'DAWNLAND DEVELOPMENT',
    tagline: 'From Concept to Completion',
    phone: '(207) 555-0149',
    email: 'contact@dawnland.site',
    location: 'Naples, Maine',
    address: 'Naples, Maine',
    hours: 'Monday – Friday: 7:00 AM – 5:00 PM',
    people: [{ id: 'person-heath-titcomb', name: 'Heath Titcomb', role: 'Principal & Project Lead', bio: 'Construction professional with approximately 30 years of hands-on experience in framing-to-finish carpentry, excavation and site work, demolition and salvage, estimating, blueprint review, and project leadership.', imageId: undefined }],
    socialLinks: [],
    externalLinks: [{ label: 'Dawnland Development', url: 'https://dawnland.site' }]
  },
  navigation: [
    { id: 'nav-home', label: 'Home', link: '/', visible: true, order: 0 },
    { id: 'nav-build', label: 'BUILD', link: '/world/BUILD', worldId: 'BUILD', visible: true, order: 1 },
    { id: 'nav-land', label: 'LAND', link: '/world/LAND', worldId: 'LAND', visible: true, order: 2 },
    { id: 'nav-create', label: 'CREATE', link: '/world/CREATE', worldId: 'CREATE', visible: true, order: 3 },
    { id: 'nav-custom', label: 'CUSTOM', link: '/world/CUSTOM', worldId: 'CUSTOM', visible: true, order: 4 },
    { id: 'nav-dawnland', label: 'DAWNLAND', link: '/world/DAWNLAND', worldId: 'DAWNLAND', visible: true, order: 5 }
  ],
  homepage: {
    hero: { heading: 'DAWNLAND DEVELOPMENT', subheading: 'From Concept to Completion', imageId: 'img-hero-primary', ctaLabel: 'Explore the Worlds', ctaWorld: 'BUILD', visible: true },
    intro: { eyebrow: 'THE WHOLE PROPERTY PERSPECTIVE', heading: 'We see the whole property.', paragraphs: [
      'From initial land feasibility and planning to precision framing, custom fabrication, and end-to-end trade coordination across Maine.',
      'Dawnland connects property, construction, scope, financing, and execution so difficult projects can be understood before they are built.'
    ], imageId: 'img-world-dawnland', ctaText: 'Enter Dawnland', visible: true },
    cliffNotes: { title: 'THE CLIFF NOTES', subtitle: 'Start with the question that sounds most like your project.', items: [
      { id: 'cliff-build', stepNumber: '01', prompt: 'I need something built or renovated.', title: 'BUILD', summary: 'Construction, remodel, repair, and defined completion pathways.', targetWorld: 'BUILD', actionText: 'Enter Build' },
      { id: 'cliff-land', stepNumber: '02', prompt: 'I have land or a property opportunity.', title: 'LAND', summary: 'Feasibility, access, site planning, subdivision concepts, and groundwork.', targetWorld: 'LAND', actionText: 'Explore Land' },
      { id: 'cliff-create', stepNumber: '03', prompt: 'I want something unusual.', title: 'CREATE', summary: 'Specialty structures, fabrication, artistic work, mobile concepts, and uncommon spaces.', targetWorld: 'CREATE', actionText: 'Enter Create' },
      { id: 'cliff-custom', stepNumber: '04', prompt: 'The project does not fit a standard package.', title: 'CUSTOM', summary: 'Build the pathway around the actual property, problem, and objective.', targetWorld: 'CUSTOM', actionText: 'Go Custom' },
      { id: 'cliff-dawnland', stepNumber: '05', prompt: 'I need the whole thing figured out.', title: 'DAWNLAND', summary: 'Planning, estimating, coordination, property strategy, and project leadership.', targetWorld: 'DAWNLAND', actionText: 'See Dawnland' }
    ], visible: true }
  },
  worlds,
  packages,
  projects,
  images: CONCEPT_IMAGES
};

export default INITIAL_DATA;



