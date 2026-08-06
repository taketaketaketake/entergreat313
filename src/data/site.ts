// Org facts and copy sourced from entergreat313.org (org has rights to all content).
// Verify details with the org before launch.
export const site = {
  name: "Enter-Great 313",
  tagline:
    "Walking alongside returning citizens in Detroit as they rebuild their lives.",
  mission:
    "Enter-Great 313 is committed to walking alongside returning citizens as they rebuild their lives. Through hands-on support, mentorship, and tailored resources, we help individuals overcome barriers, regain confidence, and transition into productive, independent members of society.",
  address: "3127 E Canfield St, Detroit, MI 48207",
  phone: "313-444-9671",
  // The org's live GiveButter campaign — the same link their old site's "Donate Now"
  // button points to. Their org-level Giving Hub is givebutter.com/enter-great313.
  donateUrl: "https://givebutter.com/I55HtW",
  socials: {
    facebook: "https://www.facebook.com/EnterGreat313",
    instagram: "https://www.instagram.com/enter_great313",
    youtube: "", // channel URL for the video series
  },
  shopUrl: "", // print-on-demand storefront
};

export type NavItem = {
  label: string;
  href: string;
  // Optional dropdown panel, grouped into columns. A group's heading is optional —
  // a single-column menu reads fine without one.
  menu?: { heading?: string; items: { label: string; href: string }[] }[];
  // Hidden from the desktop bar; still shown in the mobile menu.
  mobileOnly?: boolean;
};

export const nav: NavItem[] = [
  {
    label: "Who We Are",
    href: "/who-we-are",
    menu: [
      {
        heading: "About Us",
        items: [
          { label: "Mission & Values", href: "/who-we-are" },
          { label: "Our Story", href: "/history" },
          { label: "Leadership & Board", href: "/leadership" },
          { label: "Our Programs", href: "/programs" },
        ],
      },
      {
        heading: "Our Community",
        items: [
          { label: "Partnerships", href: "/partnerships" },
          { label: "Media & Videos", href: "/media" },
          { label: "Event Gallery", href: "/gallery" },
        ],
      },
    ],
  },
  {
    label: "Get Involved",
    href: "/get-involved",
    menu: [
      {
        items: [
          { label: "Weekly Support Group Meetings", href: "/events" },
          { label: "J.I.L.L. Program", href: "/programs#jill" },
        ],
      },
    ],
  },
  {
    label: "Tools & Resources",
    href: "/get-involved",
    menu: [
      {
        items: [
          { label: "Write a Letter", href: "/letters" },
          { label: "Partner With Us", href: "/partnerships" },
          { label: "Come to a Meeting", href: "/events" },
        ],
      },
    ],
  },
  // Kept in the mobile menu only — the desktop bar stays short, and the footer
  // already carries the address and phone number.
  { label: "Contact", href: "/contact", mobileOnly: true },
];

// Secondary pages — footer only, keeps the navbar focused.
export const footerNav = [
  { label: "History", href: "/history" },
  { label: "Partnerships", href: "/partnerships" },
  { label: "Media", href: "/media" },
  { label: "Event Gallery", href: "/gallery" },
];

// History page timeline. Add entries oldest-first; the Milestones section only
// renders once this has entries. Don't guess dates — get them from the org.
// Example: { year: "2019", title: "First Tuesday meeting", body: "..." }
// More milestones pending from the founder — see docs/founder-questions.md.
export const history: { year: string; title: string; body: string }[] = [
  {
    year: "2024",
    title: "Enter-Great 313 is founded",
    body: "Founded in Detroit to serve long-term-serving returning citizens — people coming home after ten, twenty, or thirty years inside. The IRS granted 501(c)(3) status in May 2024.",
  },
];

// Annual reports and financial documents. Put the PDFs in `public/reports/` and
// point `file` at the public path, e.g. "/reports/2025-annual-report.pdf".
// The page shows a request-by-phone note while this is empty.
export const annualReports: {
  year: string;
  title: string;
  file: string;
  note?: string;
}[] = [];

// Leadership, board, and advisory members — names and titles exactly as the org
// listed them on entergreat313.org. No bios were published there; the `bio` field
// stays empty until the org supplies them (the page renders fine without).
// Gaps to confirm with the org: "Dr. Helen" has no surname listed.
export const leadership: {
  group: string;
  blurb?: string;
  people: { name: string; role: string; bio?: string }[];
}[] = [
  {
    group: "Executive leadership",
    people: [
      { name: "Brian McArn", role: "Executive Director & Re-entry Specialist" },
      { name: "Alicia Hatcher", role: "President & Re-entry Specialist" },
      { name: "Shawn Davis", role: "Treasurer & Re-entry Specialist" },
    ],
  },
  {
    group: "Program leadership",
    people: [
      {
        name: "Karl Todd-Kelly-Bey",
        role: "Youth Deterrent Program Lead & Re-entry Specialist",
      },
      { name: "Eric Walton", role: "Resource Coordinator & Re-entry Specialist" },
      { name: "Charles Glover", role: "Security Lead & Re-entry Specialist" },
      { name: "Craig Whilby", role: "Fundraiser & Re-entry Specialist" },
      { name: "Keith Townes", role: "Sergeant of Arms & Re-entry Specialist" },
    ],
  },
  {
    group: "Board & advisory",
    people: [
      { name: "Stanley Baker", role: "Board Member at Large & Re-entry Specialist" },
      { name: "Dakota Shananquet", role: "Advisory Board Member" },
      { name: "Dr. Helen", role: "Advisory Board Member" },
    ],
  },
];

// The mission statement broken into its clauses for bulleted display. Wording is
// kept faithful to `site.mission` above — edit both together if the org revises it.
export const missionPoints = [
  "Walk alongside returning citizens as they rebuild their lives",
  "Provide hands-on support, mentorship, and tailored resources",
  "Help individuals overcome barriers and regain confidence",
  "Support the transition into productive, independent members of society",
];

// Goals: a short imperative, then the concrete mechanism. Each one maps to something
// the org actually does today — no aspirational filler. Confirm wording with the org.
export const goals = [
  {
    title: "Serve people coming home after decades",
    detail:
      "By building for long-term-serving returning citizens, not for someone home after ninety days. The needs are not the same.",
  },
  {
    title: "Reduce recidivism",
    detail:
      "By making sure no one's first months home are spent alone — a weekly group, a mentor, and a number to call before things go wrong.",
  },
  {
    title: "Get people hired",
    detail:
      "By running interview prep, covering work clothes, and connecting members to employers who don't stop reading at the background check.",
  },
  {
    title: "Teach what the inside never did",
    detail:
      "By running the six-week J.I.L.L. series: counseling, digital skills, budgeting, and rebuilding credit from zero.",
  },
  {
    title: "Get people stable",
    detail:
      "By working with partners on housing, state IDs, birth certificates, clothing, and bus passes — the paperwork and basics that stall everything else.",
  },
  {
    title: "Lead from lived experience",
    detail:
      "By keeping this organization run by people who have come home themselves and stayed to hold the door for the next person.",
  },
];

// Value descriptions come from the org's own about page on entergreat313.org.
export const coreValues = [
  {
    name: "Respect",
    description: "Every returning citizen deserves dignity, understanding, and a fair chance.",
  },
  {
    name: "Empowerment",
    description: "Equipping people with the tools and confidence to stand on their own.",
  },
  {
    name: "Community",
    description: "Transformation happens within community, not in isolation.",
  },
  {
    name: "Accountability",
    description: "Personal responsibility and honest growth, held up by people who understand.",
  },
  {
    name: "Hope",
    description: "Hope is the core of re-entry — without it, nothing else holds.",
  },
];

// slug maps to the image slot src/assets/images/services/<slug>.*
export const services = [
  {
    slug: "life-skills",
    title: "Life Skills Development",
    blurb: "The practical, everyday knowledge that makes independence possible after years inside.",
  },
  {
    slug: "mentorship",
    title: "Positive Mentorship",
    blurb: "One-on-one guidance from people who understand the journey home.",
  },
  {
    slug: "peer-groups",
    title: "Peer Group Meetings",
    blurb: "Every Tuesday evening — a safe space to connect, be heard, and grow.",
  },
  {
    slug: "employment",
    title: "Employment Opportunities & Training",
    blurb: "Interview prep, confidence, and employers who believe in second chances.",
  },
  {
    slug: "financial",
    title: "Financial Responsibility",
    blurb: "Budgeting, banking, and building stability one paycheck at a time.",
  },
  {
    slug: "housing",
    title: "Healthy & Clean Living Conditions",
    blurb: "Support toward safe, stable housing — the foundation everything else stands on.",
  },
];

// Impact numbers, TechTown-style big figures. Leave empty until the org provides
// real numbers — the homepage band only renders when this has entries.
// Example: { value: "120+", label: "Members supported" }
export const stats: { value: string; label: string }[] = [];

export const quotes = [
  "Re-entry is not just about returning home — it's about rebuilding identity, restoring confidence, and realizing the greatness that's always been within you.",
  "Every person deserves a second chance, but more importantly, they deserve a community that believes they can rise, rebuild, and succeed.",
];

export const testimonials = [
  {
    quote:
      "After serving over a decade, I had no idea where to start when I came home. Enter-Great 313 helped me find stability with mentorship, life-skills guidance, and a community that truly understands the journey. For the first time in years, I felt supported. Their program didn't just help me transition — it gave me hope for a real future.",
    name: "Marcus J.",
    role: "Returning Citizen",
  },
  {
    quote:
      "I struggled to find work because of my background, but Enter-Great 313 connected me with people who believed in second chances. They helped me prepare for interviews, build confidence, and connect with job opportunities. Today, I'm working full-time and rebuilding my life one step at a time.",
    name: "Anthony S.",
    role: "Program Graduate",
  },
  {
    quote:
      "When my brother came home, our family didn't know how to help him adjust. Enter-Great 313 stepped in with compassion and guidance. Their mentorship and peer groups made all the difference. I'm grateful they were there to support not only him, but all of us during the transition.",
    name: "Denise M.",
    role: "Sister of a Returning Citizen",
  },
];

export const partners = [
  {
    name: "FORC — Friends of Returning Citizens",
    description:
      "A program of the Detroit Catholic Pastoral Alliance that advocates for criminal justice reform and provides navigation assistance for returning citizens: clothing, toiletries, housewares, monthly DDOT bus passes, and employment and volunteer opportunities.",
    details: "3127 East Canfield Street, Detroit · Mon, Wed, Fri 10am–2pm · Tim Kane, 313-926-6770",
  },
  {
    name: "RAKS — Random Acts of Kindness",
    description:
      "A 501(c)(3) organization providing services for the justice-impacted. RAKS administers the J.I.L.L. Program (Justice-Impacted Living & Learning).",
    details: "raks1.org",
    url: "https://raks1.org",
  },
  {
    name: "Yard Line",
    description:
      "A jail and prison family support and visiting directory — helping families of incarcerated people navigate visitation procedures and find support while their loved one is inside.",
    details: "yardlinechat.com",
    url: "https://yardlinechat.com",
  },
];
