/**
 * Dawnland Development V2 - Authoritative Seed Data & Visual Asset Registry
 *
 * Grounded strictly in factual company positioning:
 * - "Dawnland Development is a Maine-based construction, property-development, land-planning, and project-coordination business."
 * - Five distinct worlds: BUILD, LAND, CREATE, CUSTOM, DAWNLAND
 * - Personnel: Heath Titcomb (Principal & Project Lead)
 * - Conceptual reference vector artwork (no fake project photos or stock disguise)
 */
import { CMSState, ImageRecord } from '../types';

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

export const INITIAL_CMS_STATE: CMSState = {
  company: {
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
  },

  navigation: [
    { id: 'nav-build', label: 'BUILD', link: '#build', worldId: 'BUILD', visible: true, order: 1 },
    { id: 'nav-land', label: 'LAND', link: '#land', worldId: 'LAND', visible: true, order: 2 },
    { id: 'nav-create', label: 'CREATE', link: '#create', worldId: 'CREATE', visible: true, order: 3 },
    { id: 'nav-custom', label: 'CUSTOM', link: '#custom', worldId: 'CUSTOM', visible: true, order: 4 },
    { id: 'nav-dawnland', label: 'DAWNLAND', link: '#dawnland', worldId: 'DAWNLAND', visible: true, order: 5 },
  ],

  homepage: {
    hero: {
      heading: 'DAWNLAND DEVELOPMENT',
      subheading: 'From Concept to Completion',
      imageId: 'img-hero-primary',
      secondaryImageId: 'img-land-hero',
      ctaLabel: 'Explore The Five Worlds',
      ctaWorld: 'BUILD',
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
  },

  worlds: {
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
  },

  // Authoritative project registry: Unverified fictional claims have been purged.
  // Verified real project case studies are populated dynamically via CMS Studio.
  projects: [],
  images: INITIAL_IMAGES,
};
