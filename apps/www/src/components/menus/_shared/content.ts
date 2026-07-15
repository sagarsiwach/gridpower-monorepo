/*
  Shared placeholder content for menu showcase variants.
  Audience order locked to GridCharge revenue priority per PRODUCT.md:
  Homes · Hospitality · Offices · Enterprises · Industrial.

  Real solution names will be replaced in SAG-2985 — these are
  representative placeholders, NOT lorem.
*/

export type SolutionItem = {
  label: string;
  href: string;
  blurb?: string;
};

export type Audience = {
  key: string;
  label: string;
  tagline: string;
  solutions: SolutionItem[];
};

export const AUDIENCES = [
  {
    key: "homes",
    label: "Homes",
    tagline: "Wallbox to apartment shared charging.",
    solutions: [
      { label: "Home wallbox", href: "/solutions/homes/wallbox", blurb: "7 kW single-phase, app-paired." },
      { label: "Apartment & RWA", href: "/solutions/homes/apartment", blurb: "Shared chargers with billing per resident." },
      { label: "Premium home", href: "/solutions/homes/premium", blurb: "11 kW three-phase with solar-aware schedules." },
    ],
  },
  {
    key: "hospitality",
    label: "Hospitality",
    tagline: "Charging as destination revenue.",
    solutions: [
      { label: "Hotels", href: "/solutions/hospitality/hotels", blurb: "Guest charging tied to room billing." },
      { label: "Malls", href: "/solutions/hospitality/malls", blurb: "High-footfall AC plus a DC anchor." },
      { label: "Resorts", href: "/solutions/hospitality/resorts", blurb: "Off-grid friendly, solar-paired." },
      { label: "Restaurants", href: "/solutions/hospitality/restaurants", blurb: "Park, eat, charge, leave." },
    ],
  },
  {
    key: "offices",
    label: "Offices",
    tagline: "Workplace charging that pays back.",
    solutions: [
      { label: "Workplace charging", href: "/solutions/offices/workplace", blurb: "Employee-only with payroll integration." },
      { label: "Office park", href: "/solutions/offices/office-park", blurb: "Multi-tenant with split billing." },
      { label: "Employee programs", href: "/solutions/offices/employee-programs", blurb: "Home-charger benefit, reimbursed via console." },
    ],
  },
  {
    key: "enterprises",
    label: "Enterprises",
    tagline: "Networks, CPOs, and corporate scale.",
    solutions: [
      { label: "Fleet SaaS", href: "/solutions/enterprises/fleet-saas", blurb: "Telematics-native charge orchestration." },
      { label: "CPO platform", href: "/solutions/enterprises/cpo", blurb: "White-label network with revenue share." },
      { label: "Highway corridor", href: "/solutions/enterprises/highway", blurb: "Ultra-fast DC with backup ESS." },
      { label: "Corporate multi-site", href: "/solutions/enterprises/multi-site", blurb: "One console, every campus." },
    ],
  },
  {
    key: "industrial",
    label: "Industrial",
    tagline: "Depots, trucking, fleet operations.",
    solutions: [
      { label: "Fleet depot", href: "/solutions/industrial/fleet-depot", blurb: "Overnight sequencing, peak-shaved." },
      { label: "Trucking corridor", href: "/solutions/industrial/trucking", blurb: "Megawatt charging with on-site ESS." },
      { label: "3W fleet", href: "/solutions/industrial/three-wheeler", blurb: "Battery-swap and plug-in hybrid models." },
    ],
  },
] as const satisfies readonly Audience[];

export const FIRST_AUDIENCE: Audience = AUDIENCES[0];

export const UTILITY_LINKS = [
  { label: "About", href: "/about" },
  { label: "Partners", href: "/partners" },
  { label: "Support", href: "/support" },
  { label: "Sign in", href: "/sign-in" },
];

export const PRIMARY_LINKS = [
  { label: "Solutions", href: "/solutions", hasMenu: true as const },
  { label: "Platform", href: "/platform" },
  { label: "App", href: "/app" },
  { label: "Economics", href: "/economics" },
  { label: "Resources", href: "/resources" },
  { label: "Contact", href: "/contact" },
];

export const FOOTER_COLUMNS = [
  {
    title: "Solutions",
    links: [
      { label: "Homes", href: "/solutions/homes" },
      { label: "Hospitality", href: "/solutions/hospitality" },
      { label: "Offices", href: "/solutions/offices" },
      { label: "Enterprises", href: "/solutions/enterprises" },
      { label: "Industrial", href: "/solutions/industrial" },
    ],
  },
  {
    title: "Platform",
    links: [
      { label: "GridOS", href: "/platform" },
      { label: "App", href: "/app" },
      { label: "Economics", href: "/economics" },
      { label: "Products", href: "/products" },
      { label: "Resources", href: "/resources" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Partners", href: "/partners" },
      { label: "Support", href: "/support" },
      { label: "Contact", href: "/contact" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Cookies", href: "/cookies" },
      { label: "Compliance", href: "/compliance" },
    ],
  },
];

export const COMMAND_GROUPS = [
  {
    label: "Solutions",
    commands: [
      { label: "Homes: wallbox", href: "/solutions/homes/wallbox", kbd: "G H W" },
      { label: "Hospitality: hotels", href: "/solutions/hospitality/hotels", kbd: "G S H" },
      { label: "Offices: workplace", href: "/solutions/offices/workplace", kbd: "G O W" },
      { label: "Enterprises: fleet SaaS", href: "/solutions/enterprises/fleet-saas", kbd: "G E F" },
    ],
  },
  {
    label: "Platform",
    commands: [
      { label: "Open GridOS console", href: "/platform", kbd: "G P" },
      { label: "Mobile app", href: "/app", kbd: "G A" },
      { label: "Economics model", href: "/economics", kbd: "G $" },
    ],
  },
  {
    label: "Actions",
    commands: [
      { label: "Request a quote", href: "/contact?type=quote", kbd: "Q" },
      { label: "Talk to sales", href: "/contact?type=sales", kbd: "S" },
      { label: "Get early access", href: "/signup", kbd: "E" },
      { label: "Download the app", href: "/app#download", kbd: "D" },
    ],
  },
  {
    label: "Resources",
    commands: [
      { label: "Documentation", href: "/resources/docs", kbd: "?" },
      { label: "Field notes", href: "/resources/field-notes" },
      { label: "Partners directory", href: "/partners" },
    ],
  },
];
