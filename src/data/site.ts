import { projects } from "./projects";
import { services } from "./services";
import { team } from "./team";

export interface NavLink {
  label: string;
  href: string;
}

export interface SiteConfig {
  name: string;
  shortName: string;
  legalName: string;
  tagline: string;
  description: string;
  siteUrl: string;
  parentGroup: string;
  navLinks: NavLink[];
  contact: {
    email: string;
    phone: string;
    address: string;
  };
  stats: {
    systemsBuilt: {
      count: number;
      label: string;
      suffix: string;
    };
    teamMembers: {
      count: number;
      label: string;
    };
    coreServices: {
      count: number;
      label: string;
    };
  };
}

export const siteConfig: SiteConfig = {
  name: "e-Learning & Earning Ltd.",
  shortName: "e-Learning & Earning",
  legalName: "e-Learning & Earning Ltd.",
  parentGroup: "Promise Group",
  tagline: "Software · Web · Digital Growth",
  description:
    "We build the software and digital presence your business grows on. Enterprise systems, custom web solutions, and marketing automation.",
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL || "https://e-laeltd.com",
  navLinks: [
    { label: "Who we are", href: "#who-we-are" },
    { label: "What we do", href: "#what-we-do" },
    { label: "Projects", href: "#projects" },
    { label: "Trust", href: "#trust" },
    { label: "Group", href: "#group" },
  ],
  contact: {
    email: "dev@e-laeltd.com",
    phone: "+880 1550-666900",
    address: "Khaja IT Park, 2nd to 7th Floor, Kallyanpur Bus Stop, Mirpur Road, Dhaka-1207, Bangladesh",
  },
  stats: {
    systemsBuilt: {
      count: projects.length,
      label: "Systems built",
      suffix: "+",
    },
    teamMembers: {
      count: team.length,
      label: "Team members",
    },
    coreServices: {
      count: services.length,
      label: "Core service areas",
    },
  },
};
