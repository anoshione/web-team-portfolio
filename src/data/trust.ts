export interface TrustItem {
  name: string;
  fullName: string;
  category: "Member Organization" | "Public Sector" | "Corporate Concern";
  logo: string;
  url?: string;
}

export const memberOrganizations: TrustItem[] = [
  {
    name: "BASIS",
    fullName: "Bangladesh Association of Software & Information Services",
    category: "Member Organization",
    logo: "/logos/basis.png",
    url: "https://basis.org.bd/",
  },
  {
    name: "NSDA",
    fullName: "National Skills Development Authority",
    category: "Member Organization",
    logo: "/logos/nsda.png",
    url: "https://nsda.gov.bd/",
  },
  {
    name: "DYD",
    fullName: "Department of Youth Development",
    category: "Public Sector",
    logo: "/logos/dyd.png",
    url: "https://dyd.gov.bd/",
  },
  {
    name: "BACCO",
    fullName: "Bangladesh Association of Contact Center & Outsourcing",
    category: "Member Organization",
    logo: "/logos/bacco.png",
    url: "https://bacco.org.bd/",
  },
  {
    name: "BCS",
    fullName: "Bangladesh Computer Samity",
    category: "Member Organization",
    logo: "/logos/bcs.png",
    url: "https://bcs.org.bd/",
  },
  {
    name: "Shomvob",
    fullName: "Shomvob Career & Job Platform",
    category: "Member Organization",
    logo: "/logos/shomvob.png",
    url: "https://shomvob.com/",
  },
  {
    name: "Promise Assets Ltd",
    fullName: "Promise Assets Ltd",
    category: "Corporate Concern",
    logo: "/logos/promise-assets.png",
    url: "https://promiseassets.com/",
  },
  {
    name: "e-Learning & Earning Ltd.",
    fullName: "e-Learning & Earning Ltd.",
    category: "Corporate Concern",
    logo: "/images/logo.png",
    url: "https://e-laeltd.com/",
  },
];
