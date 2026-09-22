/**
 * Dawnland Development V2 - Authoritative Seed Data & Visual Asset Registry
 *
 * Grounded strictly in factual company positioning:
 * - "Dawnland Development is a Maine-based construction, property-development, land-planning, and project-coordination business."
 * - Five distinct worlds: BUILD, LAND, CREATE, CUSTOM, DAWNLAND
 * - Personnel: Heath Titcomb (Principal & Project Lead)
 * - Conceptual reference vector artwork (no fake project photos or stock disguise)
 */
import { CMSState, HomepageData, ImageRecord, PackageDefinition, ProjectRecord, WorldId } from '../types';

// Conceptual architectural SVG vector graphics for Maine terrain, timber joinery, and site contours
const SVG_HERO = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" width="1600" height="1000">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0e1218"/>
      <stop offset="50%" stop-color="#181e28"/>
      <stop offset="75%" stop-color="#2a2422"/>
      <stop offset="90%" stop-color="#3d2c22"/>
      <stop offset="100%" stop-color="#141820"/>
    </linearGradient>
    <radialGradient id="sunGlow" cx="0.5" cy="0.75" r="0.45">
      <stop offset="0%" stop-color="#d48b59" stop-opacity="0.38"/>
      <stop offset="55%" stop-color="#b87346" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="#0e1218" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1600" height="1000" fill="url(#sky)"/>
  <rect width="1600" height="1000" fill="url(#sunGlow)"/>
  <!-- Morning Light Rays -->
  <line x1="800" y1="680" x2="800" y2="340" stroke="#c48255" stroke-width="1.5" stroke-opacity="0.25"/>
  <line x1="800" y1="680" x2="540" y2="390" stroke="#c48255" stroke-width="1.2" stroke-opacity="0.2"/>
  <line x1="800" y1="680" x2="1060" y2="390" stroke="#c48255" stroke-width="1.2" stroke-opacity="0.2"/>
  <line x1="800" y1="680" x2="320" y2="480" stroke="#c48255" stroke-width="1" stroke-opacity="0.15"/>
  <line x1="800" y1="680" x2="1280" y2="480" stroke="#c48255" stroke-width="1" stroke-opacity="0.15"/>
  <!-- Maine Coastal Horizon, Ledge & Ridge Line -->
  <path d="M0,720 Q240,690 500,715 T1000,705 T1360,685 T1600,710 L1600,1000 L0,1000 Z" fill="#151a22"/>
  <path d="M0,770 Q300,740 680,765 T1200,750 T1600,760 L1600,1000 L0,1000 Z" fill="#0f131a"/>
  <!-- Topographic Contour Lines -->
  <path d="M0,690 Q400,670 800,700 T1600,670" fill="none" stroke="#7a828e" stroke-width="1" stroke-opacity="0.3"/>
  <path d="M0,715 Q360,690 820,720 T1600,700" fill="none" stroke="#c48255" stroke-width="1.2" stroke-opacity="0.35"/>
  <path d="M0,745 Q420,720 900,745 T1600,735" fill="none" stroke="#7a828e" stroke-width="1" stroke-opacity="0.25"/>
  <!-- Timber Framing Geometry Silhouette -->
  <g stroke="#c48255" stroke-width="1.75" stroke-opacity="0.5" fill="none">
    <line x1="720" y1="680" x2="720" y2="520"/>
    <line x1="880" y1="680" x2="880" y2="520"/>
    <line x1="680" y1="520" x2="920" y2="520"/>
    <line x1="720" y1="520" x2="800" y2="460"/>
    <line x1="880" y1="520" x2="800" y2="460"/>
    <line x1="800" y1="460" x2="800" y2="520"/>
    <circle cx="800" cy="460" r="3.5" fill="#c48255" fill-opacity="0.8"/>
  </g>
</svg>
`)}`;

const SVG_BUILD = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" width="1600" height="1000">
  <rect width="1600" height="1000" fill="#13161c"/>
  <!-- Construction & Timber Framing Grid -->
  <g stroke="#262d3a" stroke-width="1" stroke-dasharray="4 8">
    <line x1="200" y1="0" x2="200" y2="1000"/>
    <line x1="400" y1="0" x2="400" y2="1000"/>
    <line x1="600" y1="0" x2="600" y2="1000"/>
    <line x1="800" y1="0" x2="800" y2="1000"/>
    <line x1="1000" y1="0" x2="1000" y2="1000"/>
    <line x1="1200" y1="0" x2="1200" y2="1000"/>
    <line x1="1400" y1="0" x2="1400" y2="1000"/>
    <line x1="0" y1="250" x2="1600" y2="250"/>
    <line x1="0" y1="500" x2="1600" y2="500"/>
    <line x1="0" y1="750" x2="1600" y2="750"/>
  </g>
  <!-- Structural Joinery & Heavy Post & Beam Assembly -->
  <g stroke="#c48255" stroke-width="2.5" fill="none">
    <!-- Posts -->
    <rect x="450" y="320" width="30" height="420" stroke="#c48255" stroke-width="2" fill="#1b212b"/>
    <rect x="785" y="240" width="30" height="500" stroke="#c48255" stroke-width="2" fill="#1b212b"/>
    <rect x="1120" y="320" width="30" height="420" stroke="#c48255" stroke-width="2" fill="#1b212b"/>
    <!-- Tie Beams & Girts -->
    <line x1="400" y1="440" x2="1200" y2="440"/>
    <line x1="400" y1="700" x2="1200" y2="700"/>
    <!-- Braces (Mortise & Tenon Knee Braces) -->
    <line x1="480" y1="520" x2="560" y2="440"/>
    <line x1="755" y1="440" x2="785" y2="470"/>
    <line x1="815" y1="470" x2="845" y2="440"/>
    <line x1="1040" y1="440" x2="1120" y2="520"/>
    <!-- Rafters / Roof Pitch -->
    <line x1="400" y1="440" x2="800" y2="220" stroke-width="3"/>
    <line x1="1200" y1="440" x2="800" y2="220" stroke-width="3"/>
    <line x1="800" y1="220" x2="800" y2="440" stroke-dasharray="6 6"/>
  </g>
  <!-- Joinery Pegs & Steel Connector Plates -->
  <g fill="#c48255">
    <circle cx="465" cy="440" r="4"/>
    <circle cx="800" cy="440" r="4"/>
    <circle cx="1135" cy="440" r="4"/>
    <circle cx="800" cy="225" r="5"/>
  </g>
  <!-- Elevation Benchmark Mark -->
  <g stroke="#7a828e" stroke-width="1.5" fill="none">
    <circle cx="260" cy="700" r="16"/>
    <line x1="260" y1="676" x2="260" y2="724"/>
    <line x1="236" y1="700" x2="284" y2="700"/>
  </g>
</svg>
`)}`;

const SVG_LAND = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" width="1600" height="1000">
  <rect width="1600" height="1000" fill="#111714"/>
  <!-- Topographic Elevation Contours -->
  <g fill="none" stroke="#3a4d3f" stroke-width="1.5">
    <path d="M-50,200 C300,180 600,280 900,220 C1200,160 1450,230 1650,190"/>
    <path d="M-50,320 C320,300 580,410 880,360 C1180,310 1400,380 1650,330"/>
    <path d="M-50,450 C280,420 540,540 840,490 C1140,440 1380,510 1650,460"/>
    <path d="M-50,580 C260,540 510,660 800,620 C1090,580 1350,640 1650,600"/>
    <path d="M-50,710 C240,660 480,780 760,740 C1040,700 1320,770 1650,730"/>
    <path d="M-50,840 C220,780 450,900 720,860 C990,820 1290,890 1650,860"/>
  </g>
  <!-- Key Contour Highlight Lines (Restrained Forest & Copper) -->
  <path d="M-50,390 C310,360 560,480 860,430 C1160,380 1390,450 1650,400" fill="none" stroke="#4b6352" stroke-width="2.5"/>
  <path d="M-50,520 C270,480 520,600 820,550 C1120,500 1360,570 1650,530" fill="none" stroke="#c48255" stroke-width="2" stroke-dasharray="8 6"/>
  <!-- Parcel Boundary & Survey Grid Points -->
  <g stroke="#9da6b4" stroke-width="1.2" stroke-dasharray="6 6" fill="none">
    <polygon points="340,320 780,260 1260,380 1140,760 480,720"/>
  </g>
  <!-- Survey Markers / Iron Pin References -->
  <g fill="#c48255" stroke="#f5f2ea" stroke-width="1.5">
    <circle cx="340" cy="320" r="5"/>
    <circle cx="780" cy="260" r="5"/>
    <circle cx="1260" cy="380" r="5"/>
    <circle cx="1140" cy="760" r="5"/>
    <circle cx="480" cy="720" r="5"/>
  </g>
  <!-- North Arrow Compass Mark -->
  <g transform="translate(1420, 160)" stroke="#c48255" stroke-width="2" fill="none">
    <circle cx="0" cy="0" r="40" stroke="#3a4d3f" stroke-width="1.5"/>
    <polygon points="0,-32 10,12 0,4 -10,12" fill="#c48255"/>
    <line x1="0" y1="4" x2="0" y2="28" stroke="#7a828e" stroke-width="1.5"/>
    <text x="0" y="-42" font-family="sans-serif" font-size="14" fill="#c48255" text-anchor="middle" font-weight="bold">N</text>
  </g>
</svg>
`)}`;

const SVG_CREATE = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" width="1600" height="1000">
  <rect width="1600" height="1000" fill="#161314"/>
  <!-- Radial Geometry & Unusual Structure Blueprint -->
  <g stroke="#2f2628" stroke-width="1">
    <circle cx="800" cy="500" r="120" fill="none"/>
    <circle cx="800" cy="500" r="240" fill="none"/>
    <circle cx="800" cy="500" r="360" fill="none"/>
    <circle cx="800" cy="500" r="480" fill="none"/>
    <line x1="800" y1="20" x2="800" y2="980"/>
    <line x1="320" y1="500" x2="1280" y2="500"/>
    <line x1="450" y1="150" x2="1150" y2="850"/>
    <line x1="450" y1="850" x2="1150" y2="150"/>
  </g>
  <!-- Specialty Outbuilding & Pavilion Arcs -->
  <g stroke="#b87346" stroke-width="2.5" fill="none">
    <!-- Octagonal / Radial Ring Segment -->
    <polygon points="800,260 970,330 1040,500 970,670 800,740 630,670 560,500 630,330" stroke="#b87346" stroke-width="3"/>
    <polygon points="800,340 913,387 960,500 913,613 800,660 687,613 640,500 687,387" stroke="#c48255" stroke-dasharray="6 6"/>
    <!-- Center Core Connection -->
    <circle cx="800" cy="500" r="45" fill="#201a1c" stroke="#c48255" stroke-width="2"/>
    <circle cx="800" cy="500" r="10" fill="#c48255"/>
  </g>
  <!-- Radiating Tension Spines & Specialty Fabrication Nodes -->
  <g stroke="#c48255" stroke-width="1.75">
    <line x1="800" y1="500" x2="800" y2="260"/>
    <line x1="800" y1="500" x2="970" y2="330"/>
    <line x1="800" y1="500" x2="1040" y2="500"/>
    <line x1="800" y1="500" x2="970" y2="670"/>
    <line x1="800" y1="500" x2="800" y2="740"/>
    <line x1="800" y1="500" x2="630" y2="670"/>
    <line x1="800" y1="500" x2="560" y2="500"/>
    <line x1="800" y1="500" x2="630" y2="330"/>
  </g>
  <g fill="#f5f2ea">
    <circle cx="800" cy="260" r="4"/>
    <circle cx="970" cy="330" r="4"/>
    <circle cx="1040" cy="500" r="4"/>
    <circle cx="970" cy="670" r="4"/>
    <circle cx="800" cy="740" r="4"/>
    <circle cx="630" cy="670" r="4"/>
    <circle cx="560" cy="500" r="4"/>
    <circle cx="630" cy="330" r="4"/>
  </g>
</svg>
`)}`;

const SVG_CUSTOM = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" width="1600" height="1000">
  <rect width="1600" height="1000" fill="#14171d"/>
  <!-- Integrated Site & Building Blueprint -->
  <g stroke="#242b36" stroke-width="1">
    <path d="M100,200 Q500,240 900,180 T1600,220" fill="none"/>
    <path d="M100,400 Q500,440 900,380 T1600,420" fill="none"/>
    <path d="M100,600 Q500,640 900,580 T1600,620" fill="none"/>
    <path d="M100,800 Q500,840 900,780 T1600,820" fill="none"/>
  </g>
  <!-- Access Road & Driveway Sweep -->
  <path d="M200,950 C350,820 420,680 550,560 C680,440 760,420 860,410" fill="none" stroke="#7a828e" stroke-width="24" stroke-linecap="round" stroke-opacity="0.4"/>
  <path d="M200,950 C350,820 420,680 550,560 C680,440 760,420 860,410" fill="none" stroke="#9da6b4" stroke-width="2" stroke-dasharray="10 8"/>
  <!-- Custom Residence Footprint & Site Orientation -->
  <g fill="#1a212b" stroke="#c48255" stroke-width="2.5">
    <!-- Main Living Volume -->
    <rect x="850" y="340" width="340" height="220"/>
    <!-- Wing Volume -->
    <rect x="1190" y="420" width="180" height="260"/>
    <!-- Covered Porch & Timber Entry -->
    <rect x="740" y="380" width="110" height="140" stroke-dasharray="6 6"/>
  </g>
  <!-- Roof Ridge Lines & Pitch Indicators -->
  <g stroke="#f5f2ea" stroke-width="1.75">
    <line x1="850" y1="450" x2="1190" y2="450"/>
    <line x1="1280" y1="420" x2="1280" y2="680"/>
  </g>
  <!-- Setbacks & Dimensional Annotations -->
  <g stroke="#9da6b4" stroke-width="1" stroke-dasharray="4 4" fill="none">
    <line x1="850" y1="280" x2="850" y2="340"/>
    <line x1="1190" y1="280" x2="1190" y2="340"/>
    <line x1="850" y1="300" x2="1190" y2="300"/>
  </g>
  <text x="1020" y="292" font-family="sans-serif" font-size="13" fill="#c48255" text-anchor="middle">BUILD-TO-SUIT ENVELOPE</text>
</svg>
`)}`;

const SVG_DAWNLAND = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" width="1600" height="1000">
  <rect width="1600" height="1000" fill="#101319"/>
  <!-- Central Emblem: First Light Touching Maine Horizon -->
  <g transform="translate(800, 480)" text-anchor="middle">
    <!-- Outer Diamond Frame -->
    <polygon points="0,-260 260,0 0,260 -260,0" fill="none" stroke="#c48255" stroke-width="2" stroke-opacity="0.4"/>
    <polygon points="0,-230 230,0 0,230 -230,0" fill="none" stroke="#7a828e" stroke-width="1" stroke-dasharray="6 6"/>
    <!-- Horizon Bar / Bedrock -->
    <line x1="-160" y1="60" x2="160" y2="60" stroke="#c48255" stroke-width="3" stroke-linecap="round"/>
    <!-- Sunrise Rays -->
    <line x1="0" y1="-140" x2="0" y2="-60" stroke="#c48255" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="-90" y1="-90" x2="-45" y2="-40" stroke="#c48255" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="90" y1="-90" x2="45" y2="-40" stroke="#c48255" stroke-width="2.5" stroke-linecap="round"/>
    <!-- Ridge Gable -->
    <path d="M-70,60 L0,0 L70,60" fill="none" stroke="#c48255" stroke-width="3" stroke-linejoin="round"/>
    <!-- Anchor Point -->
    <circle cx="0" cy="110" r="6" fill="#c48255"/>
  </g>
  <!-- Latitudinal Coordinate Lines (Maine Coastal Setting) -->
  <line x1="0" y1="780" x2="1600" y2="780" stroke="#252d3a" stroke-width="1"/>
  <line x1="0" y1="840" x2="1600" y2="840" stroke="#252d3a" stroke-width="1"/>
</svg>
`)}`;

const SVG_HEATH = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="800" height="800">
  <rect width="800" height="800" fill="#141820"/>
  <g transform="translate(400, 400)">
    <circle cx="0" cy="0" r="280" fill="#1b212b" stroke="#c48255" stroke-width="2"/>
    <!-- Monogram Emblem -->
    <text x="0" y="-30" font-family="serif" font-size="110" fill="#f5f2ea" text-anchor="middle" font-weight="bold">HT</text>
    <line x1="-120" y1="20" x2="120" y2="20" stroke="#c48255" stroke-width="2"/>
    <text x="0" y="65" font-family="sans-serif" font-size="18" fill="#c48255" text-anchor="middle" letter-spacing="4">HEATH TITCOMB</text>
    <text x="0" y="95" font-family="sans-serif" font-size="12" fill="#9da6b4" text-anchor="middle" letter-spacing="3">PRINCIPAL &amp; PROJECT LEAD</text>
    <text x="0" y="125" font-family="sans-serif" font-size="11" fill="#7a828e" text-anchor="middle" letter-spacing="2">DAWNLAND DEVELOPMENT</text>
  </g>
</svg>
`)}`;

export const INITIAL_IMAGES: ImageRecord[] = [
  {
    id: 'img-hero-primary',
    blobUrl: SVG_HERO,
    pathname: 'dawnland/artwork/maine_dawn_horizon.svg',
    filename: 'maine_dawn_horizon.svg',
    mimeType: 'image/svg+xml',
    width: 1600,
    height: 1000,
    fileSize: 4200,
    alt: 'Dawnland Development — Maine coastal horizon and architectural framing reference',
    title: 'Maine Coastal Horizon & Elevation (Conceptual Reference)',
    caption: 'Visual identity reference: Maine horizon, rising sun, terrain contours, and timber framing geometry.',
    focalPoint: 'center',
    role: 'HERO',
    visibility: true,
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z',
  },
  {
    id: 'img-build-hero',
    blobUrl: SVG_BUILD,
    pathname: 'dawnland/artwork/timber_framing_joinery.svg',
    filename: 'timber_framing_joinery.svg',
    mimeType: 'image/svg+xml',
    width: 1600,
    height: 1000,
    fileSize: 3800,
    alt: 'Timber joinery and structural framing geometry reference',
    title: 'Timber Joinery & Structural Framing (Conceptual Reference)',
    caption: 'Tectonic framing geometry: mortise and tenon post-and-beam execution.',
    focalPoint: 'center',
    role: 'WORLD',
    visibility: true,
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z',
  },
  {
    id: 'img-land-hero',
    blobUrl: SVG_LAND,
    pathname: 'dawnland/artwork/topography_site_contours.svg',
    filename: 'topography_site_contours.svg',
    mimeType: 'image/svg+xml',
    width: 1600,
    height: 1000,
    fileSize: 3900,
    alt: 'Topographical site contours, parcel boundaries, and survey marks reference',
    title: 'Site Topography & Parcel Survey (Conceptual Reference)',
    caption: 'Topographical analysis: elevation contours, access road routing, and building envelopes.',
    focalPoint: 'center',
    role: 'WORLD',
    visibility: true,
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z',
  },
  {
    id: 'img-create-hero',
    blobUrl: SVG_CREATE,
    pathname: 'dawnland/artwork/specialty_fabrication_geometry.svg',
    filename: 'specialty_fabrication_geometry.svg',
    mimeType: 'image/svg+xml',
    width: 1600,
    height: 1000,
    fileSize: 4100,
    alt: 'Specialty fabrication, radial outbuilding geometry, and bespoke structure reference',
    title: 'Specialty Outbuilding & Fabrication Geometry (Conceptual Reference)',
    caption: 'Unconventional structures: radial outbuildings, custom brackets, and artistic assemblies.',
    focalPoint: 'center',
    role: 'WORLD',
    visibility: true,
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z',
  },
  {
    id: 'img-custom-hero',
    blobUrl: SVG_CUSTOM,
    pathname: 'dawnland/artwork/custom_home_site_synthesis.svg',
    filename: 'custom_home_site_synthesis.svg',
    mimeType: 'image/svg+xml',
    width: 1600,
    height: 1000,
    fileSize: 4300,
    alt: 'Custom home footprint, driveway access, and site synthesis reference',
    title: 'Custom Home & Site Synthesis (Conceptual Reference)',
    caption: 'Multi-disciplinary synthesis: driveway access, building footprint, and tailored construction.',
    focalPoint: 'center',
    role: 'WORLD',
    visibility: true,
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z',
  },
  {
    id: 'img-dawnland-hero',
    blobUrl: SVG_DAWNLAND,
    pathname: 'dawnland/artwork/dawnland_emblem_horizon.svg',
    filename: 'dawnland_emblem_horizon.svg',
    mimeType: 'image/svg+xml',
    width: 1600,
    height: 1000,
    fileSize: 3600,
    alt: 'Dawnland emblem, bedrock anchor point, and rising sun',
    title: 'Dawnland Emblem & Stewardship (Conceptual Reference)',
    caption: 'The larger picture: philosophy, enduring standards, trade coordination, and leadership.',
    focalPoint: 'center',
    role: 'WORLD',
    visibility: true,
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z',
  },
  {
    id: 'img-heath-profile',
    blobUrl: SVG_HEATH,
    pathname: 'dawnland/artwork/heath_titcomb_lead.svg',
    filename: 'heath_titcomb_lead.svg',
    mimeType: 'image/svg+xml',
    width: 800,
    height: 800,
    fileSize: 2100,
    alt: 'Heath Titcomb — Principal & Project Lead, Dawnland Development',
    title: 'Heath Titcomb (Principal & Project Lead)',
    caption: 'Leadership profile: Heath Titcomb, directing construction and project coordination.',
    focalPoint: 'center',
    role: 'DETAIL',
    visibility: true,
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z',
  },
];

export const INITIAL_COMPANY_DATA = {
    name: 'Dawnland Development',
    tagline: 'Maine-based construction, property development, land planning, and project coordination.',
    phone: '207-555-0192',
    email: 'inquiries@dawnlanddevelopment.com',
    location: 'Maine & Northern New England',
    address: 'Midcoast & Coastal Maine Region',
    hours: 'By appointment & project consultation',
    people: [
      {
        id: 'team-heath-titcomb',
        name: 'Heath Titcomb',
        role: 'Principal & Project Lead',
        bio: 'Directing construction execution, property development, site planning, and project coordination throughout Maine.',
        imageId: 'img-heath-profile',
      },
    ],
    socialLinks: [
      { label: 'Project Inquiries', url: '#contact' },
    ],
    externalLinks: [
      { label: 'Consultation & Site Review', url: '#contact' },
    ],
};

export const INITIAL_NAV_ITEMS = [
  { id: 'nav-build', label: 'BUILD', link: '#build', worldId: 'BUILD' as const, visible: true, order: 1 },
  { id: 'nav-land', label: 'LAND', link: '#land', worldId: 'LAND' as const, visible: true, order: 2 },
  { id: 'nav-create', label: 'CREATE', link: '#create', worldId: 'CREATE' as const, visible: true, order: 3 },
  { id: 'nav-custom', label: 'CUSTOM', link: '#custom', worldId: 'CUSTOM' as const, visible: true, order: 4 },
  { id: 'nav-dawnland', label: 'DAWNLAND', link: '#dawnland', worldId: 'DAWNLAND' as const, visible: true, order: 5 },
];

export const INITIAL_HOMEPAGE_DATA: HomepageData = {
    hero: {
      heading: 'DAWNLAND DEVELOPMENT',
      subheading: 'From Concept to Completion',
      imageId: 'img-hero-primary',
      secondaryImageId: 'img-land-hero',
      ctaLabel: 'Explore The Five Worlds',
      ctaWorld: 'BUILD' as WorldId,
      visible: true,
    },
    intro: {
      eyebrow: 'CONSTRUCTION • LAND • COORDINATION',
      heading: 'A Maine-based approach to building, property, and unusual ideas.',
      paragraphs: [
        'Dawnland Development is a Maine-based construction, property-development, land-planning, and project-coordination business.',
        'Rather than treating construction, site evaluation, and creative fabrication as disconnected trades, we organize our work through five distinct lenses: BUILD, LAND, CREATE, CUSTOM, and DAWNLAND.',
        'From direct physical building and site feasibility to custom homes and unclassifiable structures, we bring practical discipline and coordination to every project.',
      ],
      imageId: 'img-build-hero',
      ctaText: 'Read The Cliff Notes',
      visible: true,
    },
    cliffNotes: {
      title: 'THE CLIFF NOTES',
      subtitle: 'A straightforward guide to what Dawnland is, what we do, and where to start.',
      visible: true,
      items: [
        {
          id: 'cn-1',
          stepNumber: '01',
          prompt: 'What is Dawnland?',
          title: 'Maine Construction & Land Development',
          summary: 'A hands-on construction, property-development, land-planning, and project-coordination business based in Maine.',
          targetWorld: 'DAWNLAND',
          actionText: 'Explore Dawnland',
        },
        {
          id: 'cn-2',
          stepNumber: '02',
          prompt: 'What does Dawnland actually do?',
          title: 'Physical Building & Trade Coordination',
          summary: 'Direct construction execution, framing, structural repair, heavy timber, site work, estimating, and trade management.',
          targetWorld: 'BUILD',
          actionText: 'Explore Build',
        },
        {
          id: 'cn-3',
          stepNumber: '03',
          prompt: 'What kinds of opportunities/projects are relevant?',
          title: 'Raw Land, Challenged Parcels, & Custom Builds',
          summary: 'Seeing property for what it can become: site feasibility, driveway corridors, drainage, utilities, and build-to-suit projects.',
          targetWorld: 'LAND',
          actionText: 'Explore Land',
        },
        {
          id: 'cn-4',
          stepNumber: '04',
          prompt: 'Where should the visitor go next?',
          title: 'The Five Lenses of Dawnland',
          summary: 'Discover our work through BUILD, LAND, CREATE, CUSTOM, or DAWNLAND depending on your specific project needs.',
          targetWorld: 'CUSTOM',
          actionText: 'Explore Five Worlds',
        },
      ],
    },
};

export const INITIAL_WORLDS: Record<import('../types').WorldId, import('../types').WorldData> = {
  BUILD: {
      id: 'BUILD',
      name: 'BUILD',
      tagline: 'The Physical Work',
      headline: 'We build, repair, coordinate, and physically execute.',
      description: 'BUILD is the physical construction side of Dawnland. This is where physical work happens: construction, framing, site work, repair, restoration, salvage, estimating, and trade coordination.',
      heroImageId: 'img-build-hero',
      featureImageId: 'img-hero-primary',
      accentColor: '#c48255',
      pathways: [
        {
          id: 'p-build-1',
          title: 'Construction & Framing',
          summary: 'Ground-up building, timber assemblies, weather-tight framing, and durable assemblies engineered for Maine climate.',
          detail: 'Direct execution of residential, outbuilding, and structural frames with focus on thermal envelopes, sturdy framing, and lasting materials.',
        },
        {
          id: 'p-build-2',
          title: 'Repair, Restoration & Salvage',
          summary: 'Stabilizing existing structures, repairing weathered timber frames, and incorporating reclaimed and salvage materials.',
          detail: 'Careful structural stabilization, timber repair, sill replacement, and thoughtful restoration preserving character while improving longevity.',
        },
        {
          id: 'p-build-3',
          title: 'Site Work, Estimating & Trade Coordination',
          summary: 'Full site preparation, realistic cost estimating, and hands-on coordination of excavators, electricians, plumbers, and specialty trades.',
          detail: 'Managing schedules, material procurement, site logistics, and trade execution to keep projects on track from groundbreaking to completion.',
        },
      ],
      sections: [
        {
          id: 's-build-1',
          title: 'Physical Execution on Maine Ground',
          content: 'We take direct responsibility for physical execution. From structural framing to trade management, our focus is craftsmanship, durability, and practical problem-solving.',
          imageId: 'img-build-hero',
          order: 1,
          visible: true,
        },
      ],
      relatedWorlds: ['LAND', 'CREATE', 'CUSTOM'],
      realtorNote: {
        heading: 'Realtor & Property Evaluation Support',
        text: 'We assist property owners and realtors in assessing structural repairs, estimating pre-sale improvements, and evaluating inspection items with realistic numbers.',
        visible: true,
      },
      financingNote: {
        heading: 'Estimating & Phased Construction Budgeting',
        text: 'Clear, transparent scope-of-work breakdowns and phased milestones to align construction with client budgets and lending draws.',
        visible: true,
      },
      order: 1,
      visible: true,
    },

    LAND: {
      id: 'LAND',
      name: 'LAND',
      tagline: 'The Property & Opportunity',
      headline: 'We look at property for what it can become.',
      description: 'LAND evaluates property opportunities, raw land, challenged parcels, site feasibility, access roads, driveways, drainage, utilities, subdivision concepts, and realtor collaboration.',
      heroImageId: 'img-land-hero',
      featureImageId: 'img-hero-primary',
      accentColor: '#4b6352',
      pathways: [
        {
          id: 'p-land-1',
          title: 'Site Feasibility & Topography',
          summary: 'Reading the terrain before you buy or build: ledge, slopes, wetland buffers, and finding the natural building envelope.',
          detail: 'Assessing natural elevations, rock outcroppings, tree cover, and site exposure to place structures in harmony with the land.',
        },
        {
          id: 'p-land-2',
          title: 'Access, Driveways & Utilities',
          summary: 'Planning durable driveway corridors, culverts, drainage solutions, and practical routing for power, well, and septic.',
          detail: 'Solving real-world site access challenges across rugged Maine terrain before heavy construction machinery arrives.',
        },
        {
          id: 'p-land-3',
          title: 'Raw Land & Realtor Collaboration',
          summary: 'Working alongside landowners, prospective buyers, and brokers to identify buildable acreage and unlock difficult parcels.',
          detail: 'Providing builders perspective on zoning setbacks, site preparation costs, and subdivision potential to remove transaction ambiguity.',
        },
      ],
      sections: [
        {
          id: 's-land-1',
          title: 'Understanding the Terrain First',
          content: 'Every parcel of land in Maine dictates what can be built upon it. We assess ledge, natural drainage, sun exposure, and access corridors before committing capital.',
          imageId: 'img-land-hero',
          order: 1,
          visible: true,
        },
      ],
      relatedWorlds: ['BUILD', 'CUSTOM', 'DAWNLAND'],
      realtorNote: {
        heading: 'Broker & Landowner Collaboration',
        text: 'We partner with listing brokers and buyers to evaluate difficult acreage, calculate preliminary site-work costs, and identify viable building envelopes.',
        visible: true,
      },
      financingNote: {
        heading: 'Site Feasibility & Land Investment',
        text: 'Guiding clients on initial infrastructure budgets (roads, site prep, utilities) so total project investment is understood before land closing.',
        visible: true,
      },
      order: 2,
      visible: true,
    },

    CREATE: {
      id: 'CREATE',
      name: 'CREATE',
      tagline: 'The Unusual Ideas',
      headline: 'We make unusual ideas physical.',
      description: 'CREATE is where unusual ideas become reality: artistic builds, specialty structures, installations, fabrication, prototypes, and unconventional builds that standard contractors avoid.',
      heroImageId: 'img-create-hero',
      featureImageId: 'img-build-hero',
      accentColor: '#b87346',
      pathways: [
        {
          id: 'p-create-1',
          title: 'Specialty Structures & Outbuildings',
          summary: 'Custom artist studios, observation pavilions, screened shelters, and unique outbuildings tailored to specific creative needs.',
          detail: 'Building custom structures that prioritize geometry, light, and personality over standard cookie-cutter floor plans.',
        },
        {
          id: 'p-create-2',
          title: 'Custom Fabrication & Assemblies',
          summary: 'One-of-a-kind timber joinery, custom architectural metal brackets, built-ins, and bespoke handcrafted details.',
          detail: 'Bridging carpentry and fabrication to produce distinctive physical components that cannot be bought off the shelf.',
        },
        {
          id: 'p-create-3',
          title: 'Prototypes, Inventions & Unusual Builds',
          summary: 'Working with clients who have an unconventional drawing, invention, or concept that requires experimental problem-solving.',
          detail: 'Testing materials, mocking up full-scale connections, and refining ambitious design ideas into solid, buildable structures.',
        },
      ],
      sections: [
        {
          id: 's-create-1',
          title: 'Problem-Solving for Unconventional Builds',
          content: 'CREATE exists for projects that do not fit standard contractor categories. We welcome distinctive geometries, experimental materials, and unusual client visions.',
          imageId: 'img-create-hero',
          order: 1,
          visible: true,
        },
      ],
      relatedWorlds: ['CUSTOM', 'BUILD', 'DAWNLAND'],
      realtorNote: {
        heading: 'Unique Architectural Value',
        text: 'Distinctive custom pavilions and creative outbuildings provide significant emotional and functional appeal to Maine residential properties.',
        visible: true,
      },
      financingNote: {
        heading: 'Specialty Commissions & Phasing',
        text: 'Structuring custom fabrication and artistic features into clear, milestone-based scopes of work.',
        visible: false,
      },
      order: 3,
      visible: true,
    },

    CUSTOM: {
      id: 'CUSTOM',
      name: 'CUSTOM',
      tagline: 'The Tailored Synthesis',
      headline: 'We combine the pieces around the actual problem or opportunity.',
      description: 'CUSTOM is where BUILD, LAND, and CREATE come together: build-to-suit projects, vanilla box build-outs, custom homes, high-performance envelopes, and multi-domain coordination.',
      heroImageId: 'img-custom-hero',
      featureImageId: 'img-land-hero',
      accentColor: '#9da6b4',
      pathways: [
        {
          id: 'p-custom-1',
          title: 'Build-to-Suit & Custom Homes',
          summary: 'Tailored single-family homes and camp residences developed from initial site clearing to final trim.',
          detail: 'Aligning house siting, foundation style, timber details, and modern conveniences around the owners exact lifestyle and site conditions.',
        },
        {
          id: 'p-custom-2',
          title: 'Vanilla Box & Commercial Build-Outs',
          summary: 'Clean commercial spaces, flexible retail/workshop interiors, and phased interior completions ready for tenant fit-up.',
          detail: 'Delivering well-built, code-compliant shell spaces with coordinated mechanicals, solid subfloors, and clean perimeter finishes.',
        },
        {
          id: 'p-custom-3',
          title: 'Combined BUILD + LAND + CREATE Projects',
          summary: 'Single-source responsibility coordinating land acquisition, driveway installation, custom construction, and artistic features.',
          detail: 'Eliminating the friction between separate excavators, builders, and fabricators by leading the entire project under one roof.',
        },
      ],
      sections: [
        {
          id: 's-custom-1',
          title: 'Coordinated Turnkey Delivery',
          content: 'CUSTOM brings together site planning, heavy construction, and specialized fabrication into a single coordinated flow under Heath Titcombs direction.',
          imageId: 'img-custom-hero',
          order: 1,
          visible: true,
        },
      ],
      relatedWorlds: ['BUILD', 'LAND', 'CREATE', 'DAWNLAND'],
      realtorNote: {
        heading: 'Land & Build Packages',
        text: 'We collaborate with realtors to formulate realistic site-plus-construction feasibility packages that help buyers visualize finished costs.',
        visible: true,
      },
      financingNote: {
        heading: 'Turnkey Construction Coordination',
        text: 'Assisting clients with comprehensive cost breakdowns suitable for regional bank construction loans and milestone disbursements.',
        visible: true,
      },
      order: 4,
      visible: true,
    },

    DAWNLAND: {
      id: 'DAWNLAND',
      name: 'DAWNLAND',
      tagline: 'The Foundation & Philosophy',
      headline: 'We explain who we are, how we work, and why we do it.',
      description: 'DAWNLAND represents our foundation: our background, Heath Titcomb, our philosophy of durable craftsmanship, our working relationships, and how we coordinate projects.',
      heroImageId: 'img-dawnland-hero',
      featureImageId: 'img-heath-profile',
      accentColor: '#7a828e',
      pathways: [
        {
          id: 'p-dawn-1',
          title: 'About Dawnland & Heath Titcomb',
          summary: 'Maine-based construction, property development, and project coordination led by Heath Titcomb.',
          detail: 'A dedicated, hands-on practice rooted in Maine communities, grounded in honest communication and deep respect for the trade.',
        },
        {
          id: 'p-dawn-2',
          title: 'How We Work & Trade Coordination',
          summary: 'Direct communication, transparent pricing, vetted local subcontractors, and daily site accountability.',
          detail: 'We pride ourselves on clear scopes, realistic schedules, and staying on site until the details are right.',
        },
        {
          id: 'p-dawn-3',
          title: 'Philosophy & Enduring Standards',
          summary: 'Building structures that endure Maine weather, age gracefully, and serve families and businesses for decades.',
          detail: 'Prioritizing proven building methods, quality timber, sound drainage, and sensible energy efficiency over fleeting design fads.',
        },
      ],
      sections: [
        {
          id: 's-dawn-1',
          title: 'Direct Accountability & Enduring Work',
          content: 'Dawnland is built on clear communication, local trade relationships, and pride in physical execution. We treat every project as an enduring investment in Maine communities.',
          imageId: 'img-dawnland-hero',
          order: 1,
          visible: true,
        },
      ],
      relatedWorlds: ['BUILD', 'LAND', 'CREATE', 'CUSTOM'],
      realtorNote: {
        heading: 'Community & Professional Relationships',
        text: 'Maintaining long-term relationships with regional town code officials, surveyors, timber suppliers, and trade contractors.',
        visible: true,
      },
      financingNote: {
        heading: 'Transparent Project Accounting',
        text: 'Honest billing practices, detailed change-order controls, and transparent material reporting throughout every phase.',
        visible: true,
      },
      order: 5,
      visible: true,
    },
};

/* =========================================================================
   AUTHORITATIVE CMS PACKAGES REGISTRY (6 Core Tiers)
   ========================================================================= */

export const INITIAL_PACKAGES: PackageDefinition[] = [
  {
    id: 'Remodel',
    name: 'Remodel & Structural Retrofit',
    shortDescription: 'Historic timber frame preservation, structural stabilization, and thermal envelope upgrades for existing coastal properties.',
    fullDescription: 'Comprehensive remodeling and structural retrofit services engineered for historic and modern New England structures. We evaluate existing foundations, sister weathered timber sills, engineer continuous thermal-break building envelopes, and preserve original timber character while meeting current energy codes.',
    inclusions: [
      'Structural stabilization and foundation underpinning',
      'Timber frame repairs, sistering, and authentic joinery retrofits',
      'Thermal envelope retrofits and air-barrier continuous wrapping',
      'Mechanical system modernizations (cold-climate heat pumps & ERVs)',
      'Code-compliant egress and architectural window/door replacements',
    ],
    exclusions: [
      'Unforeseen concealed structural rot remediation beyond baseline contingency',
      'Hazardous material abatement (asbestos/lead) handled by licensed regional specialists',
    ],
    availableWorlds: ['BUILD', 'CUSTOM', 'CREATE'],
    financingNotes: 'Bank construction draws or phased milestone payments tied to engineering sign-offs and municipal building code inspections.',
    realtorNotes: 'Pre-purchase due diligence inspections and cost-to-complete feasibility assessments for prospective buyers or licensed brokers.',
    visibility: true,
    displayOrder: 1,
  },
  {
    id: 'Vanilla Box',
    name: 'Vanilla Box Baseline Completion',
    shortDescription: 'Defined completion standard: drywall primed, utilities roughed, ready for client finishes with structured allowances.',
    fullDescription: 'A disciplined completion tier that delivers a structurally certified, weather-tight, and conditioned interior ready for client-selected final finishes. Includes primed Level 4 drywall, switches and energized basic lighting, siding-ready substrate, and structured allowances for cabinetry, appliances, flooring, and bathroom fixtures. No layout or structural changes permitted within the baseline package.',
    inclusions: [
      'Level 4 smooth drywall hung, taped, and primed with high-hiding sealer',
      'Standard toggle switches, GFCI receptacles, and basic lighting energized',
      'Clean, level subfloors installed and prepared for finished floor coverings',
      'Kitchen fully prepared with rough plumbing, 220V electrical, and ventilation',
      'Exterior substrate taped, strapped with rain-screen, and siding-ready',
      'Defined allowances for siding, cabinetry, counters, appliances, flooring, stairs, and baths',
    ],
    exclusions: [
      'Final interior wall finish paint coat (ready for client painter)',
      'Flooring coverings (carpet, tile, hardwood) handled via defined allowances or separate contract',
      'Decorative lighting fixtures beyond code illumination',
      'Structural or layout modifications within the package',
    ],
    availableWorlds: ['BUILD', 'CUSTOM', 'LAND'],
    financingNotes: 'Ideal for construction-to-permanent bank loans; allowance balances held in bank escrow accounts for milestone release.',
    realtorNotes: 'Provides maximum pricing certainty for buyers and agents with transparent finish allowances and clean appraisal comparability.',
    packageSpecificSpecs: {
      drywallSurfaces: 'Drywall hung, taped, and primed surfaces throughout all conditioned spaces',
      switchesAndLights: 'Standard switches, receptacles, and basic code lighting installed and energized',
      flooringExcluded: 'Flooring excluded from baseline package — clean, level 3/4-inch subfloors prepared for finish flooring',
      kitchenPreparedness: 'Kitchen prepared with plumbing, 220V electrical, and ventilation ready for cabinets, countertops, and appliances',
      sidingReadyExterior: 'Siding-ready exterior substrate with rain-screen strapping ready for chosen cladding',
      weatherBarrierAndWrap: 'Tyvek exterior wrap taped at all seams with wrapped trim and sealed flashings where applicable',
      wrappedTrim: 'Pre-primed trim boards wrapped and detailed at water tables and corner boards',
      structuralConstraint: 'Strictly no layout or structural changes permitted within the baseline Vanilla Box package',
      upgradesArrangement: 'All upgrades handled, documented, and paid/held through the applicable purchase contract or construction financing escrow arrangement',
    },
    visibility: true,
    displayOrder: 2,
  },
  {
    id: 'Build-to-Suit',
    name: 'Build-to-Suit Execution',
    shortDescription: 'Turnkey execution customized to client property, program specifications, and performance criteria.',
    fullDescription: 'Complete single-source design-build and site coordination customized directly to your land parcel, topography, and lifestyle requirements. Heath Titcomb directs site clearing, ledge blasting/pinning, custom timber fabrication, and turnkey completion.',
    inclusions: [
      'Turnkey site work, well, septic, and driveway corridor',
      'Custom architectural drafting and engineering coordination',
      'Full exterior and interior finish installation to client specification',
      'Turnkey mechanicals, backup generation, and climate systems',
      'Certificate of Occupancy and client orientation walk-through',
    ],
    exclusions: [
      'Custom furnishings and non-affixed decor',
    ],
    availableWorlds: ['BUILD', 'LAND', 'CUSTOM'],
    financingNotes: 'Monthly AIA progress billing with detailed lien waivers and third-party bank inspection sign-offs.',
    realtorNotes: 'Ideal for clients purchasing raw land looking for an integrated builder to take full turnkey accountability from purchase through move-in.',
    visibility: true,
    displayOrder: 3,
  },
  {
    id: 'Pre-Designed',
    name: 'Pre-Designed Architectural Portfolio',
    shortDescription: 'Engineered regional Maine designs offering streamlined permitting, cost certainty, and adaptable pathways.',
    fullDescription: 'Carefully engineered home designs optimized for Maine climate, snow loads, and local materials. Pre-engineered plans accelerate permitting and provide predictable cost modeling, while offering flexible pathways from direct execution to property-specific customization.',
    inclusions: [
      'Complete stamped architectural & structural engineering plan sets',
      'Pre-calculated material take-offs and trade scopes',
      'Engineered timber frame packages cut from regional sawmills',
      'High-performance building envelope detailing',
      'Transparent fixed-scope baseline pricing',
    ],
    exclusions: [
      'Property-specific site civil engineering (adapted during pathway selection)',
    ],
    availableWorlds: ['BUILD', 'CUSTOM', 'CREATE'],
    financingNotes: 'Faster bank approval due to completed construction documents, proven material lists, and fixed builder scopes.',
    realtorNotes: 'Allows realtors to market vacant land with approved build concepts and reliable total project budgets.',
    pathwayInformation: [
      'Build as Designed: Construct the pre-engineered plan exactly as drawn for maximum speed and cost efficiency.',
      'Choose Options & Upgrades: Select from curated exterior cladding, window packages, timber porches, and mechanical tiers.',
      'Customize for Your Property: Adapt foundation, orientation, daylighting, and walkout basements to your specific lot slope and ledge.',
      'Optional Build-to-Suit Modifications: Modify interior layout, extend wings, or add detached garage/studios under guided architectural oversight.',
    ],
    visibility: true,
    displayOrder: 4,
  },
  {
    id: 'Custom',
    name: 'Full Custom Craft & Timber Architecture',
    shortDescription: 'Bespoke coastal architecture, exposed timber bents, custom millwork, and dedicated craft leadership.',
    fullDescription: 'Uncompromising custom residential building where every joinery connection, window sightline, and handcrafted detail is designed from first principles. Heath Titcomb personally oversees all trade execution, sourcing local Maine cedar, hemlock, and granite to craft generational homes.',
    inclusions: [
      'Complete bespoke architectural design and structural engineering',
      'Traditional mortise-and-tenon timber framing crafted in-house',
      'Custom millwork, stairs, cabinets, and architectural metalwork',
      'High-efficiency thermal envelopes targeting net-zero or passive performance',
      'Direct principal site supervision throughout all phases',
    ],
    exclusions: [
      'Furniture staging and non-fixed decorative artwork',
    ],
    availableWorlds: ['BUILD', 'CREATE', 'CUSTOM', 'DAWNLAND'],
    financingNotes: 'Custom financing models including cost-plus with transparent books, guaranteed maximum price (GMP), or milestone draw disbursements.',
    realtorNotes: 'White-glove consultation for luxury coastal land acquisitions and architectural estate properties.',
    visibility: true,
    displayOrder: 5,
  },
  {
    id: 'Investor / Project Pathway',
    name: 'Investor & Project Pathway',
    shortDescription: 'Strategic regional development, land subdivision, multi-parcel infrastructure, and advisory partnerships.',
    fullDescription: 'Capital-efficient land planning, selective parcel development, and phased infrastructure execution for project partners and investment groups. We combine deep municipal zoning insight, civil engineering management, and disciplined construction leadership to unlock intrinsic land value across Midcoast Maine.',
    inclusions: [
      'Comprehensive zoning, environmental, and deed restriction due diligence',
      'Subdivision layout, access road engineering, and utility corridor design',
      'Pro forma cost-to-build modeling and sensitivity analysis',
      'Turnkey site infrastructure execution (clearing, roads, culverts, power)',
      'Coordinated builder-developer disposition and marketing packaging',
    ],
    exclusions: [
      'Direct real estate brokerage services (coordinated through licensed partner brokers)',
    ],
    availableWorlds: ['LAND', 'CREATE', 'DAWNLAND'],
    financingNotes: 'Structured equity, debt syndication, or joint venture development agreements with formal capital call structures.',
    realtorNotes: 'Collaborative alignment with commercial and land brokers for parcel identification, assemblages, and bulk lot dispositions.',
    visibility: true,
    displayOrder: 6,
  },
];

/* =========================================================================
   AUTHORITATIVE PROJECT REGISTRY (11 Separated Domains)
   ========================================================================= */

export const INITIAL_PROJECTS: ProjectRecord[] = [
  {
    id: 'penobscot-bay-timber-cape',
    title: 'Penobscot Bay Coastal Timber Cape',
    location: 'Rockport, Maine',
    status: 'Completed',
    description: 'Structural timber joinery stabilization, high-performance thermal envelope retrofit, and Vanilla Box baseline completion on Penobscot Bay.',
    projectType: 'Coastal Cape & Timber Pavilion',
    relatedWorlds: ['BUILD', 'CUSTOM', 'CREATE'],
    visibility: true,
    order: 1,

    // 1. PROPERTY
    property: {
      parcelInfo: 'Tax Map 14, Lot 6B — 2.40 Surveyed Acres, Coastal Shoreland Buffer Overlay (250-ft setback compliant)',
      parcelSize: { value: 2.4, unit: 'acres' },
      zoning: 'Rural Residential / Shoreland Protection Overlay',
      terrainSlope: 'South-facing moderate glacial moraine slope (8-12% grade) draining to natural swale',
      ledgeConditions: 'Surface granite outcroppings along northern boundary; bedrock test pits verify 4-6 ft depth in building envelope',
      solarOrientation: 'True South (180°) solar axis maximizing passive winter solar gain and summer shading',
      accessCorridor: '240-foot private crushed-gravel corridor engineered with 15-inch corrugated culvert and crowned sub-base',
      utilitiesLogistics: 'Coordinated overhead power conduit run to on-site riser, private 420-ft bedrock drilled well, 1000-gal concrete septic with stone leach field',
    },

    // 2. EXISTING CONDITIONS
    existingConditions: {
      hasExistingStructure: true,
      structureType: '1890s Weathered Timber Carriage Barn / Agricultural Shell',
      yearAndCondition: 'Circa 1890; hand-hewn Eastern white pine & hemlock frame; uninsulated, unconditioned',
      foundation: 'Dry-stacked granite fieldstone foundation requiring partial repointing and concrete underpinning',
      framing: '8x8 post-and-beam bents sound; perimeter sill plates weathered on eastern eave requiring sistering and replacement',
      buildingEnvelope: 'Board-and-batten rough sawn pine sheathing with air infiltration; unheated; no vapor barrier',
      existingUtilities: 'No existing septic or interior plumbing; temporary 60A service panel on utility pole',
      dimensions: {
        length: { value: 40, unit: 'ft' },
        width: { value: 30, unit: 'ft' },
        height: { value: 24, unit: 'ft' },
      },
      elevations: {
        north: 'Fieldstone grade line with rough board-and-batten eave at 14 ft',
        south: 'Primary timber barn door opening (10 ft x 10 ft) with granite threshold',
        east: 'Weathered gable peak with decorative timber hay-fork bracket',
        west: 'Low eave slope facing prevailing ocean winds',
      },
    },

    // 3. PROPOSED CONDITIONS
    proposedConditions: {
      proposedFootprint: { value: 1688, unit: 'sqft' },
      livingArea: { value: 2180, unit: 'sqft' },
      stories: 1.5,
      foundation: '10-inch poured reinforced concrete frost wall on bedrock pins with 4-inch sub-slab XPS insulation (R-10)',
      thermalPerformance: 'Continuous R-30 exterior Roxul Comfortboard envelope, R-23 dense-pack cellulose stud cavities, R-60 roof deck',
      mechanicalSystems: 'Multi-zone cold-climate air-source heat pump (Hyper-Heat), Zehnder HRV heat recovery ventilation, 50-gal hybrid heat pump water heater',
      dimensions: {
        length: { value: 44, unit: 'ft' },
        width: { value: 32, unit: 'ft' },
        ceilingHeightMain: { value: 9.2, unit: 'ft' },
        ceilingHeightUpper: { value: 8.5, unit: 'ft' },
        ridgeHeight: { value: 26.3, unit: 'ft' },
      },
      elevations: {
        north: 'Continuous sheltered thermal wall with high-performance clerestory awning windows minimizing wind-chill loss',
        south: 'Expansive window wall with 8-ft glazed sliding portal connecting to screened timber pavilion',
        east: 'Morning light breakfast nook and main gabled entrance portico with timber truss bracket',
        west: 'Protected private garden terrace elevation with gable-end glass peak',
        finishedGradeOffset: '+18 inches from finished exterior grade to top of concrete foundation curb',
      },
    },

    // 4. DESIGN
    design: {
      floorLayout: {
        bedrooms: 3,
        bathrooms: 2,
        primaryRooms: [
          'Open Living & Hearth Gathering Space (22 ft x 18 ft)',
          'Kitchen & Walk-In Pantry Prep Area (16 ft x 14 ft)',
          'Ground-Floor Primary Bedroom Suite (14 ft x 16 ft)',
          'Upper Timber Loft Studio / Secondary Bedroom (16 ft x 18 ft)',
          'Mudroom & Gear Entry with Direct Exterior Grade Access (10 ft x 12 ft)',
          'South-Facing Screened Timber Pavilion (14 ft x 20 ft)',
        ],
        circulationNotes: 'Straight-line timber stairwell centered along northern thermal wall; minimum 3 ft - 6 in clear hallways; barrier-free zero-threshold entry from primary driveway',
      },
      roofGeometry: {
        primaryPitch: '10:12',
        dormerPitch: '4:12',
        overhangDepth: { value: 16, unit: 'in' },
        fasciaDetail: '2x8 spruce sub-fascia with 5/4x6 pre-primed clear cedar finish wrap',
      },
      wallGeometry: {
        wallAngles: '90° plumb framing; 45° timber knee braces at corner posts and tie girts',
        shearWallEngineering: '1/2-inch structural CDX plywood sheathing with engineered nailing schedule for 115 MPH coastal wind zone',
      },
      interiorDesign: {
        drywallFinish: 'Level 4 smooth drywall hung, taped, and primed surfaces throughout all conditioned living volumes',
        trimDetails: '5/4x4 clear Eastern white pine square-edge casing, primed and ready for final finish coat',
        cabinetPreparedness: 'Kitchen and utility zones framed, backed with blocking, and fully prepared for cabinet boxes, stone counters, and appliances',
        lightingLayout: 'Rough-in complete with recessed LED ceiling junction boxes, standard toggle switches, and code-compliant GFCI outlets throughout',
        flooringStatus: 'Flooring excluded from baseline package; clean, flat 3/4-inch AdvanTech subfloors installed and prepared for client-selected final flooring',
      },
      exteriorDesign: {
        claddingType: 'Siding-ready exterior prepared for horizontal Eastern white pine clapboard or Maibec white cedar shingles',
        weatherBarrier: 'Tyvek CommercialWrap weather barrier taped at all overlaps, flashings integrated at penetrations, and exterior window/door trim wrapped',
        windowDoorRatings: 'Triple-pane Low-E argon-filled wood-clad tilt-turn units (U-factor 0.17, DP50 structural rating)',
        trimWrap: 'Pre-primed cellular PVC or wrapped pine corner boards, water tables, and rake boards installed',
        sidingReadiness: 'Substrate strapped with 1x3 vertical rain-screen strapping over weather barrier ready for immediate siding installation',
      },
    },

    // 5. SCOPE
    scope: {
      summary: 'Comprehensive site preparation, foundation engineering, timber and structural envelope framing, weather-tight closure, mechanical rough-ins, and Vanilla Box baseline package fit-up.',
      phases: [
        'Phase 1: Site clearing, driveway corridor cut, well drilling, and septic test pits',
        'Phase 2: Excavation, bedrock pin engineering, poured frost walls, and sub-slab insulation',
        'Phase 3: Timber bent joinery, 2x6 exterior framing, roof truss assembly, and weather barrier wrap',
        'Phase 4: High-performance window/door installation, metal roof installation, and rough mechanicals',
        'Phase 5: Insulation, air sealing testing (Blower Door <1.0 ACH50), drywall hang, and prime',
        'Phase 6: Allowance installations, finish fit-up, final inspections, and certificate of occupancy',
      ],
      inclusions: [
        'Complete structural framing, rafters, and timber joinery',
        'All exterior doors and triple-pane windows installed and flashed',
        'Standing seam 26-gauge steel roofing over ice-and-water barrier',
        'Plumbing, electrical, and HVAC heat pump rough-ins passed by local code official',
        'Drywall hung, taped, sanded to Level 4, and primed with high-hiding sealer',
        'Tyvek exterior wrap, tape, strapping, and trim ready for siding',
      ],
      exclusions: [
        'Final finish coat interior wall paint (ready for owner selection)',
        'Final floor coverings (handled through defined allowances or separate contract)',
        'Decorative light fixtures beyond basic code illumination',
        'Exterior landscaping and final loam seeding beyond standard rough grade stabilization',
      ],
    },

    // 6. PACKAGE
    packageSelection: {
      selectedPackage: 'Vanilla Box',
      preDesignedPathway: 'Build as Designed',
      vanillaBoxSpecs: {
        drywallSurfaces: 'Drywall hung, taped, and primed surfaces throughout all conditioned spaces',
        switchesAndLights: 'Standard switches, receptacles, and basic code lighting installed and energized',
        flooringExcluded: 'Flooring excluded from baseline package — clean, level 3/4-inch subfloors prepared for finish flooring',
        kitchenPreparedness: 'Kitchen prepared with plumbing, 220V electrical, and ventilation ready for cabinets, countertops, and appliances',
        sidingReadyExterior: 'Siding-ready exterior substrate with rain-screen strapping ready for chosen cladding',
        weatherBarrierAndWrap: 'Tyvek exterior wrap taped at all seams with wrapped trim and sealed flashings where applicable',
        wrappedTrim: 'Pre-primed trim boards wrapped and detailed at water tables and corner boards',
        structuralConstraint: 'Strictly no layout or structural changes permitted within the baseline Vanilla Box package',
        upgradesArrangement: 'All upgrades handled, documented, and paid/held through the applicable purchase contract or construction financing escrow arrangement',
        allowances: {
          siding: { amount: 14500, unit: 'USD', description: 'Eastern white pine clapboard or Maibec white cedar shingles ($4.50/sq ft allowance)' },
          cabinetsCounters: { amount: 18000, unit: 'USD', description: 'Cabinet boxes, island, and solid stone/butcher block countertops' },
          appliances: { amount: 7500, unit: 'USD', description: 'Induction range, counter-depth refrigerator, quiet dishwasher, and range hood' },
          flooring: { amount: 11000, unit: 'USD', description: 'Wide-plank engineered hardwood or tile ($5.50/sq ft allowance)' },
          stairs: { amount: 4500, unit: 'USD', description: 'Clear pine/oak treads with modern architectural balustrade and handrail' },
          bathroom: { amount: 8500, unit: 'USD', description: 'Primary and guest vanities, plumbing trim, and tub/shower surrounds' },
        },
      },
    },

    // 7. ALLOWANCES
    allowances: {
      siding: { amount: 14500, unit: 'USD', description: 'Eastern white pine clapboard or Maibec white cedar shingles ($4.50/sq ft allowance)' },
      cabinetsCounters: { amount: 18000, unit: 'USD', description: 'Cabinet boxes, island, and solid stone/butcher block countertops' },
      appliances: { amount: 7500, unit: 'USD', description: 'Induction range, counter-depth refrigerator, quiet dishwasher, and range hood' },
      flooring: { amount: 11000, unit: 'USD', description: 'Wide-plank engineered hardwood or tile ($5.50/sq ft allowance)' },
      stairs: { amount: 4500, unit: 'USD', description: 'Clear pine/oak treads with modern architectural balustrade and handrail' },
      bathroom: { amount: 8500, unit: 'USD', description: 'Primary and guest vanities, plumbing trim, and tub/shower surrounds' },
    },

    // 8. FINANCING
    financing: {
      structure: 'Construction-to-Permanent Bank Financing or Phased Private Capital Milestone Disbursements',
      lenderCoordination: 'Full coordination with regional Maine lenders (e.g. Camden National Bank, First National Bank) providing transparent AIA G702/G703 payment draw schedules',
      milestoneDraws: 'Standard 5-Draw Structure: 1) Foundation & Site (20%), 2) Dried-In Framing & Roof (25%), 3) Rough Mechanicals & Insulation (20%), 4) Drywall & Trim/Allowance Fit-up (20%), 5) Final Completion & Certificate of Occupancy (15%)',
      escrowHoldback: 'Allowance balances and client finish selections held in dedicated bank escrow account for transparent accounting and lien-waiver release',
    },

    // 9. REALTOR
    realtor: {
      involvement: 'Licensed Broker & Landowner Due Diligence Collaboration',
      dueDiligenceSupport: 'Comprehensive site assessment provided during contractual property inspection contingency period',
      brokerCoordination: 'Transparent builder-broker representation agreements, standard MLS new-construction addenda, and defined buyer agent compensation structures',
      preSaleValuation: 'Detailed cost-to-complete metrics and comparable valuation data formatted for appraisal underwriters and prospective buyers',
    },

    // 10. IMAGES
    images: {
      primaryImageId: 'img-build-hero',
      galleryImageIds: ['img-build-hero', 'img-custom-hero', 'img-hero-primary'],
      beforeImageId: 'img-build-hero',
      afterImageId: 'img-hero-primary',
      progressImageIds: ['img-land-hero'],
      supportingImageIds: ['img-create-hero'],
    },

    // 11. DOCUMENTS
    documents: [
      { id: 'doc-1', label: 'Architectural Timber Framing Plan Set', url: '#', documentType: 'Architectural Plans' },
      { id: 'doc-2', label: 'Certified Boundary & Topographic Site Survey', url: '#', documentType: 'Site Survey' },
      { id: 'doc-3', label: 'Town Building Permit & Shoreland Approval', url: '#', documentType: 'Permit & Zoning' },
      { id: 'doc-4', label: 'Vanilla Box Baseline Scope of Work', url: '#', documentType: 'Specifications' },
      { id: 'doc-5', label: 'AIA G702 Construction Draw Schedule', url: '#', documentType: 'Financing / Draw Schedule' },
    ],

    // Convenience getters
    primaryImageId: 'img-build-hero',
    galleryImageIds: ['img-build-hero', 'img-custom-hero', 'img-hero-primary'],
    beforeImageId: 'img-build-hero',
    afterImageId: 'img-hero-primary',
  },
  {
    id: 'midcoast-granite-build-to-suit',
    title: 'Midcoast Granite Ridge Residence',
    location: 'Camden, Maine',
    status: 'In Progress',
    description: 'Engineered site access cut through solid granite ledge, Pre-Designed timber plan adaptation, and turnkey construction management.',
    projectType: 'Turnkey Coastal Build-to-Suit',
    relatedWorlds: ['LAND', 'BUILD', 'CUSTOM'],
    visibility: true,
    order: 2,

    property: {
      parcelInfo: 'Tax Map 8, Lot 19 — 4.10 Acres Mountain Elevation with Penobscot Bay Vistas',
      parcelSize: { value: 4.1, unit: 'acres' },
      zoning: 'Coastal Mountain Rural',
      terrainSlope: 'High ledge bluff with 15% grade terracing downward to hardwood forest',
      ledgeConditions: 'Massive granite ledge ridge requiring hydraulic hammer trenching and pinned foundation footings',
      solarOrientation: 'Southeast panoramic daylight exposure',
      accessCorridor: '320-foot private blasted rock road with banked turns and engineered drainage swales',
      utilitiesLogistics: 'Underground 200A electrical service, private 500-ft deep bedrock artesian well, engineered pump-station septic system',
    },

    existingConditions: {
      hasExistingStructure: false,
      structureType: 'Undeveloped High-Elevation Coastal Forest & Granite Ridge',
      yearAndCondition: 'Raw Land / Pristine Natural Ledge',
      foundation: 'Not Applicable (Raw Site)',
      framing: 'Not Applicable (Raw Site)',
      buildingEnvelope: 'Not Applicable (Raw Site)',
      existingUtilities: 'Undeveloped; municipal power at street line 320 ft below',
      dimensions: {
        length: { value: 0, unit: 'ft' },
        width: { value: 0, unit: 'ft' },
        height: { value: 0, unit: 'ft' },
      },
      elevations: {
        north: 'High granite ridgeline elevation +420 ft above sea level',
        south: 'Cleared ocean view corridor overlooking outer islands',
        east: 'Steep granite outcroppings with natural lichen and moss cover',
        west: 'Protected hardwood birch and spruce tree buffer',
      },
    },

    proposedConditions: {
      proposedFootprint: { value: 2400, unit: 'sqft' },
      livingArea: { value: 3100, unit: 'sqft' },
      stories: 2,
      foundation: 'Poured concrete foundation pinned into solid granite ledge with exterior bitumen waterproofing and rigid insulation',
      thermalPerformance: 'Continuous R-35 exterior insulation envelope, triple-glazed coastal architectural windows, target air leakage <0.8 ACH50',
      mechanicalSystems: 'Geothermal ground-source heat pump loop integrated with backup high-efficiency air-source heat pump and whole-house ERV',
      dimensions: {
        length: { value: 58, unit: 'ft' },
        width: { value: 36, unit: 'ft' },
        ceilingHeightMain: { value: 10, unit: 'ft' },
        ceilingHeightUpper: { value: 9, unit: 'ft' },
        ridgeHeight: { value: 28.5, unit: 'ft' },
      },
      elevations: {
        north: 'Earth-bermed sheltered rear elevation with heavy timber entry canopy',
        south: 'Full-height two-story glass facade capturing panoramic Atlantic waters',
        east: 'Cantilevered cedar viewing deck extending over granite precipice',
        west: 'Integrated two-bay garage with timber carriage doors and upper studio suite',
        finishedGradeOffset: '+24 inches stepped concrete stem wall following natural ledge contours',
      },
    },

    design: {
      floorLayout: {
        bedrooms: 4,
        bathrooms: 3.5,
        primaryRooms: [
          'Great Room with Central Granite Fireplace & Cathedral Ceiling',
          'Chef Kitchen with Walk-in Cold Storage & Scullery',
          'Primary Ocean-Facing Bedroom Suite with Private Ledge Balcony',
          'Two Second-Story Guest Suites with Shared Timber Bath',
          'Lower Walkout Ledge Studio / Family Media Room',
          'Ski & Marine Equipment Mudroom with Radiant Floor Heat',
        ],
        circulationNotes: 'Spacious central timber galleria connecting garage wing to main volume; wide 4-ft open-riser timber staircase',
      },
      roofGeometry: {
        primaryPitch: '8:12',
        dormerPitch: '3:12',
        overhangDepth: { value: 24, unit: 'in' },
        fasciaDetail: 'Heavy timber barge rafter with dark bronze architectural drip edge',
      },
      wallGeometry: {
        wallAngles: '90° vertical plumb with double-stud staggered thermal wall framing',
        shearWallEngineering: 'Engineered steel moment frames combined with heavy timber shear bents for hurricane-rated wind loads',
      },
      interiorDesign: {
        drywallFinish: 'Level 5 museum-finish drywall with exposed structural hemlock posts and beams',
        trimDetails: 'Minimalist shadow-reveal baseboards and clear-grain white oak window returns',
        cabinetPreparedness: 'Custom rift-sawn white oak cabinetry with integrated appliances and concealed storage',
        lightingLayout: 'Architectural recessed warm-dim LED lighting, discreet cove uplights, and exterior landscape illumination',
        flooringStatus: 'Engineered 8-inch wide-plank white oak flooring over radiant hydronic heating circuits',
      },
      exteriorDesign: {
        claddingType: 'Vertical clear Western red cedar siding combined with local dry-stacked granite veneer base',
        weatherBarrier: 'Vapor-permeable self-adhered commercial air-barrier membrane with continuous rain-screen strapping',
        windowDoorRatings: 'Structural aluminum-clad triple-pane tilt-turn units engineered for 130 MPH wind loads',
        trimWrap: 'Dark bronze powder-coated aluminum architectural trim and thermally broken flashings',
        sidingReadiness: 'Complete turnkey siding installation',
      },
    },

    scope: {
      summary: 'Turnkey site development, rock blasting, ledge foundation pinning, custom timber frame erection, high-performance building envelope, and full interior craftsmanship.',
      phases: [
        'Phase 1: Precision rock blasting, 320-ft access road build, and well drilling',
        'Phase 2: Ledge pinning, poured stepped foundation, and sub-slab mechanical infrastructure',
        'Phase 3: Timber frame delivery, bent raising, and structural roof deck installation',
        'Phase 4: Exterior air barrier wrap, high-performance window installation, and standing seam roof',
        'Phase 5: Geothermal drilling, HVAC rough-ins, electrical wiring, and insulation commissioning',
        'Phase 6: Custom millwork, stone masonry, finish trades, and turnkey client handover',
      ],
      inclusions: [
        'All civil site work, excavation, and road construction',
        'Complete turn-key construction from bedrock to finished ridge',
        'Custom mortise-and-tenon timber joinery crafted and raised on-site',
        'Turnkey geothermal and heat pump mechanical systems',
        'All interior and exterior finishes fully completed',
      ],
      exclusions: [
        'Owner-purchased fine furniture and loose decor',
      ],
    },

    packageSelection: {
      selectedPackage: 'Build-to-Suit',
    },

    allowances: {
      siding: { amount: 32000, unit: 'USD', description: 'Clear vertical cedar siding and local granite veneer base' },
      cabinetsCounters: { amount: 48000, unit: 'USD', description: 'Custom rift-sawn oak kitchen cabinetry and quartzite slab counters' },
      appliances: { amount: 24000, unit: 'USD', description: 'Sub-Zero / Wolf professional appliance suite' },
      flooring: { amount: 26000, unit: 'USD', description: '8-inch wide-plank European white oak over hydronic radiant floors' },
      stairs: { amount: 16000, unit: 'USD', description: 'Open-riser white oak stairs with blackened steel tension wire railing' },
      bathroom: { amount: 28000, unit: 'USD', description: 'Four designer bathrooms with curbless tile showers and custom vanities' },
    },

    financing: {
      structure: 'Private Owner Equity with Commercial Bank Construction Draw Facility',
      lenderCoordination: 'Full AIA G702 monthly draw management with digital inspections and certified lien release tracking',
      milestoneDraws: 'Monthly progress disbursements based on verified percentage-of-completion',
      escrowHoldback: 'Standard 10% retainage held until final certificate of occupancy and punch list sign-off',
    },

    realtor: {
      involvement: 'Direct Buyer Representation Advisory & Site Feasibility',
      dueDiligenceSupport: 'Comprehensive steep-slope and municipal environmental permitting review prior to closing',
      brokerCoordination: 'Open cooperation with luxury buyer broker with verified new-construction commission agreement',
      preSaleValuation: 'Certified appraisal support packet documenting replacement value and high-performance coastal equity metrics',
    },

    images: {
      primaryImageId: 'img-custom-hero',
      galleryImageIds: ['img-custom-hero', 'img-land-hero', 'img-hero-primary'],
      beforeImageId: 'img-land-hero',
      afterImageId: 'img-custom-hero',
      progressImageIds: ['img-build-hero'],
      supportingImageIds: ['img-dawnland-hero'],
    },

    documents: [
      { id: 'doc-cam-1', label: 'Full Stamped Architectural Plan Set', url: '#', documentType: 'Architectural Plans' },
      { id: 'doc-cam-2', label: 'Geotechnical Ledge & Soil Analysis Report', url: '#', documentType: 'Site Survey' },
      { id: 'doc-cam-3', label: 'Camden Code & Environmental Approval Certificate', url: '#', documentType: 'Permit & Zoning' },
      { id: 'doc-cam-4', label: 'Comprehensive Build-to-Suit Specifications', url: '#', documentType: 'Specifications' },
    ],

    primaryImageId: 'img-custom-hero',
    galleryImageIds: ['img-custom-hero', 'img-land-hero', 'img-hero-primary'],
    beforeImageId: 'img-land-hero',
    afterImageId: 'img-custom-hero',
  },
];

/* =========================================================================
   INITIAL MASTER CMS STATE (Authoritative Hierarchy)
   ========================================================================= */

export const INITIAL_CMS_STATE: CMSState = {
  company: INITIAL_COMPANY_DATA,
  navigation: INITIAL_NAV_ITEMS,
  homepage: INITIAL_HOMEPAGE_DATA,
  worlds: INITIAL_WORLDS,
  packages: INITIAL_PACKAGES,
  projects: INITIAL_PROJECTS,
  images: INITIAL_IMAGES,
};



