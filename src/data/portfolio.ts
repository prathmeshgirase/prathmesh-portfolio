// Single canonical source of truth for portfolio content.
// Facts and links are taken from Prathmesh_Girase_Resume.pdf.

export interface NavLink {
  label: string;
  href: string;
}

export interface HeadlinePart {
  start: string;
  accent: string;
  end: string;
}

export interface Profile {
  name: string;
  role: string;
  kicker: string;
  location: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  resume: string;
  summary: string;
  headline: HeadlinePart;
  introduction: HeadlinePart;
  navLinks: NavLink[];
}

export const profile: Profile = {
  name: "Prathmesh Girase",
  role: "Full-Stack Software Developer",
  kicker: "// software developer · full-stack",
  location: "Pune, Maharashtra, India",
  email: "prathmeshgirase5@gmail.com",
  phone: "+91 8080916760",
  github: "https://github.com/prathmeshgirase",
  linkedin: "https://linkedin.com/in/prathmesh-girase",
  resume: "/Prathmesh_Girase_Resume.pdf",
  summary:
    "Full-stack developer building React and React Native applications, with hands-on experience in Java, Spring Boot, authentication, and relational databases. I enjoy connecting thoughtful interfaces to dependable APIs — and seeing them through to production.",
  headline: {
    start: "I like to build things that are",
    accent: "useful, reliable",
    end: "and ready for the real world.",
  },
  introduction: {
    start: "I'm a full-stack developer turning a",
    accent: "passion for building",
    end: "into products people use.",
  },
  navLinks: [
    { label: "Work", href: "#work" },
    { label: "Experience", href: "#experience" },
    { label: "Recognition", href: "#recognition" },
    { label: "Contact", href: "#contact" },
  ],
};

export interface HeroArtifactScale {
  tag: string;
  value: string;
  unit: string;
  note: string;
}

export interface HeroArtifactAward {
  seal: string;
  title: string;
  by: string;
}

export interface HeroArtifactNpm {
  pkg: string;
  downloads: string;
  unit: string;
  note: string;
}

export interface HeroArtifacts {
  scale: HeroArtifactScale;
  award: HeroArtifactAward;
  npm: HeroArtifactNpm;
}

export const heroArtifacts: HeroArtifacts = {
  scale: {
    tag: "eone · built independently",
    value: "~78 APIs",
    unit: "17 controllers",
    note: "a full-stack classroom platform, built solo",
  },
  award: {
    seal: "CGPI SOFTWARE · WEB & MOBILE",
    title: "2 Production Apps",
    by: "CGPI Software · Pune",
  },
  npm: {
    pkg: "hotelic-essentials",
    downloads: "500+",
    unit: "installs · Android & iOS",
    note: "React Native · Expo · REST APIs",
  },
};

export interface ProjectSpec {
  label: string;
  value: string;
  accent?: boolean;
}

export interface ProjectPresentation {
  heroWord: string;
  previewType: "metric" | "activity";
  rgb: string;
  bg: string;
  panelColor: string;
  lineColor: string;
  descPoints?: string[];
  disclosure?: string;
  aspects: string[];
}

export interface Project {
  id: string;
  category: string;
  name: string;
  description: string;
  bullets: string[];
  stack: string[];
  note?: string;
  link?: { label: string; href: string };
  metric: string;
  metricLabel: string;
  status: string;
  color: "violet" | "orange" | "green";
  specs: ProjectSpec[];
  presentation: ProjectPresentation;
}

export const projects: Project[] = [
  {
    id: "eone",
    category: "EDTECH",
    name: "EONE",
    description:
      "A complete classroom management platform, from the first assignment to the final grade.",
    bullets: [
      "Built independently with Admin, Teacher, and Student roles",
      "Approximately 78 REST endpoints across 17 controllers",
      "JWT authentication, BCrypt hashing, and role-based access",
    ],
    stack: [
      "Java 17",
      "Spring Boot",
      "Spring Security",
      "PostgreSQL",
      "Flutter",
      "JWT",
    ],
    note: "Academic project · API documented with Postman and Swagger.",
    link: {
      label: "View code",
      href: "https://github.com/prathmeshgirase/My-Classroom-App",
    },
    metric: "~78",
    metricLabel: "REST API endpoints",
    status: "BUILT INDEPENDENTLY · FULL STACK",
    color: "violet",
    specs: [
      { label: "ARCHITECTURE", value: "17 controllers · 17 core tables" },
      { label: "WORKFLOWS", value: "Assignments, submissions & grading" },
      { label: "SECURITY", value: "JWT · BCrypt · role-based access" },
      { label: "PLATFORM", value: "Flutter · Spring Boot REST API" },
    ],
    presentation: {
      heroWord: "Education",
      previewType: "metric",
      rgb: "167,139,250",
      bg: "linear-gradient(160deg, #17142a, #12101f 62%, #100e1a)",
      panelColor: "rgba(167,139,250,0.07)",
      lineColor: "rgba(167,139,250,0.22)",
      descPoints: [
        "Built independently with Admin, Teacher, and Student roles",
        "Approximately 78 REST endpoints across 17 controllers",
      ],
      disclosure: "Academic project · API documented with Postman and Swagger.",
      aspects: [],
    },
  },
  {
    id: "kitchenarykart",
    category: "COMMERCE",
    name: "KitchenaryKart",
    description:
      "Kitchen essentials, made easier to find. A live B2B platform for hospitality customers.",
    bullets: [
      "Shipped responsive React interfaces for a live product",
      "Reusable product cards, filters, search, and cart components",
      "Integrated catalog and search APIs with the backend team",
    ],
    stack: ["React.js", "JavaScript", "REST APIs", "CSS3"],
    note: "Production contribution · developed with backend and design teams.",
    link: { label: "Visit website", href: "https://kitchenarykart.com/" },
    metric: "In production",
    metricLabel: "B2B commerce",
    status: "LIVE PLATFORM · HOSPITALITY",
    color: "orange",
    specs: [
      { label: "FRONTEND", value: "Responsive, reusable React UI" },
      { label: "DISCOVERY", value: "Catalog · filters · search" },
      { label: "INTEGRATION", value: "REST API-powered browsing" },
      { label: "CUSTOMERS", value: "Hospitality & kitchen essentials" },
    ],
    presentation: {
      heroWord: "Commerce",
      previewType: "metric",
      rgb: "212,175,110",
      bg: "linear-gradient(160deg, #241d10, #1b160c 60%, #18130b)",
      panelColor: "rgba(212,175,110,0.06)",
      lineColor: "rgba(212,175,110,0.20)",
      descPoints: [
        "Shipped responsive React interfaces for a live product",
        "Reusable product cards, filters, search, and cart components",
      ],
      disclosure:
        "Production contribution · developed with backend and design teams.",
      aspects: [],
    },
  },
  {
    id: "hotelic",
    category: "MOBILE",
    name: "Hotelic Essentials",
    description:
      "One mobile experience, across Android and iOS. Built for real customers on real devices.",
    bullets: [
      "Redesigned and delivered the complete mobile UI",
      "Integrated onboarding, JWT authentication, and push notifications",
      "Resolved navigation, layout, and performance issues before store submission",
    ],
    stack: ["React Native", "Expo", "REST APIs", "JWT"],
    note: "500+ installs across Android & iOS, as reported in my résumé.",
    metric: "500+",
    metricLabel: "installs across Android & iOS",
    status: "CROSS-PLATFORM · MOBILE",
    color: "green",
    specs: [
      { label: "PLATFORMS", value: "Android & iOS" },
      { label: "STACK", value: "React Native · Expo" },
      { label: "ONBOARDING", value: "JWT authentication · REST APIs" },
      { label: "ENGAGEMENT", value: "Push notification workflows" },
    ],
    presentation: {
      heroWord: "Mobile",
      previewType: "activity",
      rgb: "110,231,183",
      bg: "linear-gradient(160deg, #131f19, #0f1612 65%, #11150f)",
      panelColor: "rgba(110,231,183,0.07)",
      lineColor: "rgba(110,231,183,0.22)",
      aspects: [
        "Redesigned and delivered the complete mobile UI",
        "Integrated onboarding, JWT authentication, and push notifications",
        "Resolved navigation, layout, and performance issues before store submission",
      ],
    },
  },
];

export interface ExperienceItem {
  company: string;
  location: string;
  role: string;
  period: string;
  description: string;
  details: string;
  stack: string;
}

export const experience: ExperienceItem[] = [
  {
    company: "CGPI Software Private Limited",
    location: "Pune, India",
    role: "Full Stack Developer Intern",
    period: "Jan 2026 – Present",
    description:
      "Built and shipped features across two live web and mobile products, working across responsive UI development, reusable components, REST API integration, authentication, and push notifications.",
    details:
      "Collaborated with backend engineers on root-cause analysis and resolved production issues in authentication, navigation, and performance. Participated in agile sprints and code reviews.",
    stack: "React.js · React Native · REST APIs · Git · Agile/Scrum",
  },
];

export interface EducationItem {
  degree: string;
  school: string;
  period: string;
  score: string;
  label: string;
}

export const education: EducationItem[] = [
  {
    degree: "M.Sc. Computer Science",
    school: "Fergusson College, Pune",
    period: "Aug 2024 – May 2026",
    score: "8.63",
    label: "CGPA / 10",
  },
  {
    degree: "B.Sc. Computer Science",
    school: "K.K. Wagh ACS & CS College, Nashik",
    period: "Jul 2021 – May 2024",
    score: "7.4",
    label: "CGPA / 10",
  },
];

export interface SkillCategory {
  category: string;
  items: string;
}

export const skills: SkillCategory[] = [
  { category: "Languages", items: "Java, JavaScript, Python, SQL, Dart" },
  {
    category: "Frontend",
    items: "React.js, React Native, Flutter, HTML5, CSS3, Expo",
  },
  {
    category: "Backend",
    items: "Java, Spring Boot, Spring Security, REST APIs, JWT Authentication",
  },
  { category: "Databases", items: "PostgreSQL, MySQL" },
  {
    category: "Tools & practices",
    items:
      "Git, GitHub, Maven, Postman, Swagger/OpenAPI, GitHub Actions, Agile/Scrum",
  },
  {
    category: "Foundations",
    items: "Data Structures & Algorithms, OOP, DBMS, SDLC",
  },
];

export interface AchievementItem {
  title: string;
  organization: string;
  year: string;
  kind: string;
}

export const achievements: AchievementItem[] = [
  {
    title: "Shipped 2 production-grade apps",
    organization: "CGPI Software Private Limited",
    year: "2026",
    kind: "Production",
  },
  {
    title: "Built EONE independently",
    organization: "Full-stack classroom management platform",
    year: "Academic project",
    kind: "Engineering",
  },
  {
    title: "AI Model Training Workshop",
    organization: "Fergusson College × Chainworks Digital",
    year: "2025",
    kind: "Participant",
  },
  {
    title: "APGI Hackathon",
    organization: "Hackathon participation",
    year: "",
    kind: "Participant",
  },
];
