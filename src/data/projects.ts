export type ProjectCategory =
  | "Enterprise"
  | "Education"
  | "Sales & Support"
  | "Commerce"
  | "Real Estate & Hospitality"
  | "Mobile"
  | "AI & Public Sector"
  | "Media";

export interface Project {
  slug: string;
  name: string;
  category: ProjectCategory;
  description: string;
  url?: string;
  status: "Live" | "In production";
  featured: boolean;
  image?: string;
  stack: string[];
  results?: string[];
}

export const projects: Project[] = [
  {
    slug: "promise-erp",
    name: "Promise ERP",
    category: "Enterprise",
    description:
      "Integrated enterprise suite centralizing core operational workflows, cross-departmental data streams, and business intelligence.",
    url: "https://www.figma.com/proto/M991ZXKz7yTX0aQZc8wwjG/E-learning-2?page-id=0%3A1&node-id=542-3072&viewport=-998%2C1054%2C0.04&t=pMx3EF9GzXCCtovV-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=4969%3A31030",
    status: "In production",
    featured: true,
    image: "/screenshots/promise-erp.jpg",
    stack: [],
    results: [],
  },
  {
    slug: "promise-lms",
    name: "Promise LMS",
    category: "Education",
    description:
      "Learning management platform designed for course management, content delivery, assessment tracking, and student analytics.",
    status: "In production",
    featured: false,
    stack: [],
    results: [],
  },
  {
    slug: "promise-hrm",
    name: "Promise HRM",
    category: "Enterprise",
    description:
      "Comprehensive HR solution covering employee profiles, payroll processing, leave tracking, performance evaluation, and onboarding.",
    status: "In production",
    featured: false,
    stack: [],
    results: [],
  },
  {
    slug: "promise-crm",
    name: "Promise CRM",
    category: "Sales & Support",
    description:
      "Customer relationship tool for lead pipeline management, client interaction history, sales tracking, and communication automation.",
    status: "In production",
    featured: false,
    stack: [],
    results: [],
  },
  {
    slug: "promise-accounts",
    name: "Promise Accounts",
    category: "Enterprise",
    description:
      "Dedicated financial accounting software for general ledger, invoicing, accounts payable/receivable, and compliance reporting.",
    status: "In production",
    featured: false,
    stack: [],
    results: [],
  },
  {
    slug: "promise-inventory",
    name: "Promise Inventory",
    category: "Enterprise",
    description:
      "Centralized inventory control system managing stock levels, warehouse operations, procurement, and supply chain tracking.",
    status: "In production",
    featured: false,
    stack: [],
    results: [],
  },
  {
    slug: "promise-asset-management",
    name: "Promise Asset Management",
    category: "Enterprise",
    description:
      "System for cataloging company assets, tracking allocation, monitoring depreciation, and scheduling routine maintenance.",
    status: "In production",
    featured: false,
    stack: [],
    results: [],
  },
  {
    slug: "promise-mart",
    name: "Promise Mart Ltd",
    category: "Commerce",
    description:
      "B2C digital storefront enabling online catalog display, shopping cart management, payment integration, and order processing.",
    url: "https://promisemart.com/",
    status: "Live",
    featured: true,
    image: "/screenshots/promise-mart.webp",
    stack: [],
    results: [],
  },
  {
    slug: "paikary-hat",
    name: "Paikary Hat",
    category: "Commerce",
    description:
      "Business-to-business wholesale marketplace facilitating bulk orders, supplier listings, vendor management, and trade logistics.",
    status: "In production",
    featured: false,
    stack: [],
    results: [],
  },
  {
    slug: "promise-assets",
    name: "Promise Assets Ltd System",
    category: "Real Estate & Hospitality",
    description:
      "Property and real estate management software handling land records, building units, lease agreements, and sales documentation.",
    url: "https://promiseassets.com/",
    status: "Live",
    featured: true,
    image: "/screenshots/promise-assets.webp",
    stack: [],
    results: [],
  },
  {
    slug: "promise-hotel-resort",
    name: "Promise Hotel & Resort Management",
    category: "Real Estate & Hospitality",
    description:
      "End-to-end hospitality system managing front desk operations, room reservations, guest billing, housekeeping, and facility services.",
    url: "https://thepromisehotelandresort.com/",
    status: "Live",
    featured: true,
    image: "/screenshots/promise-hotel-resort.webp",
    stack: [],
    results: [],
  },
  {
    slug: "promise-attendance",
    name: "Promise Attendance App",
    category: "Mobile",
    description:
      "Mobile application enabling staff attendance tracking, geo-fenced check-ins, shift scheduling, and biometric synchronization.",
    status: "In production",
    featured: false,
    stack: [],
    results: [],
  },
  {
    slug: "dyd-ai",
    name: "DYD AI Project",
    category: "AI & Public Sector",
    description:
      "Specialized AI initiative developed for the Department of Youth Development, incorporating smart analytics and youth activity tracking.",
    url: "https://dydaiproject.com/",
    status: "Live",
    featured: true,
    image: "/screenshots/dyd-ai.webp",
    stack: [],
    results: [],
  },
  {
    slug: "e-learning-website",
    name: "E-learning Website",
    category: "Education",
    description:
      "Public-facing web portal for hosting interactive digital courses, live virtual sessions, and self-paced learning programs.",
    url: "https://e-laeltd.com/",
    status: "Live",
    featured: false,
    image: "/screenshots/e-learning.webp",
    stack: [],
    results: [],
  },
  {
    slug: "news-portal",
    name: "News Portal",
    category: "Media",
    description:
      "Publishing platform featuring editorial workflows, dynamic article layout management, media hosting, and reader analytics.",
    url: "https://captain-seven-xi.vercel.app/",
    status: "Live",
    featured: false,
    stack: [],
    results: [],
  },
  {
    slug: "customer-support-system",
    name: "Customer Support System",
    category: "Sales & Support",
    description:
      "Omnichannel helpdesk platform for ticketing, support workflow routing, SLA management, and customer satisfaction metrics.",
    status: "In production",
    featured: false,
    stack: [],
    results: [],
  },
];

export const featuredProjects = projects.filter((project) => project.featured);
