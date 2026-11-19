export type TeamGroup =
  | "Leadership"
  | "Engineering"
  | "Design"
  | "Product and SEO"
  | "Interns";

export interface TeamMember {
  name: string;
  role: string;
  unit: string;
  group: TeamGroup;
}

export const team: TeamMember[] = [
  {
    name: "Md. Rokonuzzaman",
    role: "Senior Software Engineer (Team Lead)",
    unit: "E-Learning & Earning LTD",
    group: "Leadership",
  },
  {
    name: "Abdus Salam",
    role: "Senior Software Engineer (Part Time)",
    unit: "Promise Mart LTD",
    group: "Leadership",
  },
  {
    name: "Md. Fayzul Islam Faisal",
    role: "Software Engineer",
    unit: "Promise Mart LTD",
    group: "Engineering",
  },
  {
    name: "Nion Chandra Roy",
    role: "Software Developer",
    unit: "Promise Mart LTD",
    group: "Engineering",
  },
  {
    name: "Md. Naem",
    role: "Software Developer",
    unit: "Promise Mart LTD",
    group: "Engineering",
  },
  {
    name: "Muhammad Saiful Islam",
    role: "Web Developer",
    unit: "E-Learning & Earning LTD",
    group: "Engineering",
  },
  {
    name: "Jahid Hasan",
    role: "Jr. Web Developer",
    unit: "E-Learning & Earning LTD",
    group: "Engineering",
  },
  {
    name: "S. M. Jamil Akhter",
    role: "Junior Developer",
    unit: "E-Learning & Earning LTD",
    group: "Engineering",
  },
  {
    name: "Md. Jahid Parvez",
    role: "Graphics & UI/UX Designer",
    unit: "E-Learning & Earning LTD",
    group: "Design",
  },
  {
    name: "Rakib Hassan Shuvo",
    role: "UI/UX Designer",
    unit: "E-Learning & Earning LTD",
    group: "Design",
  },
  {
    name: "Mizanur Rahman",
    role: "SEO Expert | BA",
    unit: "E-Learning & Earning LTD",
    group: "Product and SEO",
  },
  {
    name: "Asraful Islam Shojib",
    role: "Web Developer [Intern]",
    unit: "E-Learning & Earning LTD",
    group: "Interns",
  },
  {
    name: "Shamiul Hasan",
    role: "Web Developer [Intern]",
    unit: "E-Learning & Earning LTD",
    group: "Interns",
  },
  {
    name: "Aotmick Hassan",
    role: "Web Developer [Intern]",
    unit: "E-Learning & Earning LTD",
    group: "Interns",
  },
];
