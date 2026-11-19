export interface Service {
  number: string;
  title: string;
  description: string;
  capabilities: string[];
}

export const services: Service[] = [
  {
    number: "01",
    title: "Website Development & Digital Solutions",
    description:
      "High-performance digital web applications and modern corporate interfaces crafted for scalable business operations.",
    capabilities: [
      "Corporate websites",
      "Product-focused websites",
      "Service website optimization",
      "Custom web applications",
    ],
  },
  {
    number: "02",
    title: "SEO & Digital Marketing",
    description:
      "Data-informed organic search discovery, technical foundation hardening, and strategic digital positioning.",
    capabilities: [
      "Search engine optimization",
      "Technical SEO",
      "Local SEO",
      "Content strategy",
      "Online visibility & brand positioning",
    ],
  },
  {
    number: "03",
    title: "Business Management Systems",
    description:
      "Bespoke internal systems and enterprise toolchains engineered to streamline complex departmental workflows.",
    capabilities: [
      "Custom CRM",
      "Lead management",
      "Inventory management",
      "Employee management",
      "Business process automation",
    ],
  },
  {
    number: "04",
    title: "Marketing Automation",
    description:
      "Automated multi-channel messaging and retention pipelines that nurture customer interactions systematically.",
    capabilities: [
      "Email marketing",
      "Automated customer follow-ups",
      "Customer engagement",
      "Marketing workflow optimization",
    ],
  },
];
