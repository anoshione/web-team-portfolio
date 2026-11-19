export interface ConcernCompany {
  name: string;
  description: string;
  category: string;
  url?: string;
}

export const concernCompanies: ConcernCompany[] = [
  {
    name: "Promise Mart Ltd",
    category: "B2C E-commerce",
    description: "Multi-category consumer digital retail and logistics platform.",
    url: "https://promisemart.com/",
  },
  {
    name: "Paikary Hat",
    category: "Wholesale B2B",
    description: "Wholesale business-to-business marketplace connecting suppliers and trade buyers.",
  },
  {
    name: "Promise Assets Ltd",
    category: "Real Estate & Asset Management",
    description: "Property development, commercial units, and real estate asset portfolio.",
    url: "https://promiseassets.com/",
  },
  {
    name: "The Promise Hotel & Resort",
    category: "Hospitality",
    description: "Modern leisure destination, guest accommodations, and event management.",
    url: "https://thepromisehotelandresort.com/",
  },
  {
    name: "e-Learning & Earning Ltd.",
    category: "Technology & Marketing",
    description: "Software engineering, custom web solutions, and digital growth services.",
  },
];
