import type { Language } from "@/context/language";

type PersonalInfo = {
  name: string;
  title: string;
  location: string;
  tagline: string;
  email: string;
  phone: string;
  linkedin: string;
  linkedinDisplay: string;
  portfolioUrl: string;
  infojobs: string;
  cvUrl: string;
  profileImage: string;
  availability: string;
  workPermit: string;
};

type ExperienceItem = {
  title: string;
  company: string;
  period: string;
  duties: string[];
};

type EducationItem = {
  institution: string;
  degree?: string;
  period: string;
  details: string;
  description?: string;
  tags?: string[];
};

export type CvData = {
  personalInfo: PersonalInfo;
  aboutText: string;
  sections: { id: string; title: string; desc: string }[];
  navLinks: { id: string; label: string }[];
  experience: ExperienceItem[];
  extraCurricular: { title: string; period: string; points: string[] };
  education: EducationItem[];
  skills: string[];
  timelineUpdates: { title: string; date: string; description: string; tags: string[] }[];
  allTags: string[];
};

const sharedSkills = [
  "JavaScript",
  "TypeScript",
  "C#",
  "Java",
  "C++",
  "PHP",
  "React",
  "Angular",
  "HTML5",
  "CSS3",
  "Tailwind CSS",
  "Bootstrap",
  "Responsive layout",
  ".NET Framework",
  "Node.js",
  "REST API",
  "Swagger",
  "SQL Server",
  "Oracle (PL/SQL)",
  "PostgreSQL",
  "Git",
  "GitHub",
  "GitLab",
  "Azure DevOps",
  "Docker",
  "CI/CD",
  "Postman",
  "Jira",
  "Trello",
  "ClickUp",
  "Scrum",
  "Kanban",
  "Visual Studio 2022",
  "Visual Studio Code",
  "Figma",
  "Photoshop",
  "CentOS",
  "Active Directory",
  "Fortinet",
  "Mikrotik",
  "Ubiquiti",
  "GLPI",
  "Synology NAS",
  "Hyper-V",
  "Office 365",
  "Spanish (Native)",
  "English (B1)",
];

const esData: CvData = {
  personalInfo: {
    name: "Ariel Vera",
    title: "Desarrollador Web / Full Stack",
    location: "Madrid, España",
    tagline:
      "10 años de experiencia en infraestructura de TI y 3 años como desarrollador web Full Stack con TypeScript, React y Angular.",
    email: "ariel.arvera@gmail.com",
    phone: "695 298 272",
    linkedin: "https://linkedin.com/in/ariel-vera-94ab26137",
    linkedinDisplay: "linkedin.com/in/ariel-vera-94ab26137",
    portfolioUrl: "https://ariel-arvera.github.io/curriculum-vitae/",
    infojobs: "/curriculum-vitae/Perfil-Infojobs.png",
    cvUrl: "/Ariel-Vera-CV.pdf",
    profileImage: "/profile-placeholder.jpg",
    availability: "Disponible para nuevas oportunidades",
    workPermit: "Con permiso de trabajo en la Unión Europea",
  },
  aboutText:
    "10 años de experiencia en infraestructura de TI y 3 años como desarrollador web Full Stack con TypeScript, React y Angular.",
  sections: [
    { id: "about", title: "Sobre Mí", desc: "Perfil profesional y enfoque técnico" },
    { id: "education", title: "Formación", desc: "Formación académica y certificaciones" },
    { id: "skills", title: "Habilidades", desc: "Stack técnico y herramientas" },
    { id: "contact", title: "Contacto", desc: "Canales de contacto profesional" },
  ],
  navLinks: [
    { id: "hero", label: "Inicio" },
    { id: "about", label: "Sobre Mí" },
    { id: "contact", label: "Contacto" },
  ],
  experience: [
    {
      title: "Desarrollador Web (Frontend / Backend Funcional)",
      company: "AZETA MANDATOS Y SERVICIOS",
      period: "02/2022 - 10/2025",
      duties: [
        "Desarrollo de aplicaciones FrontEnd con React y TypeScript en arquitectura SPA, SEO y SSR.",
        "Mantenimiento evolutivo de e-commerce en Angular para catalogos y paneles administrativos.",
        "Maquetacion responsive con HTML5, CSS3 y Tailwind CSS.",
        "Integración de FrontEnd con APIs REST.",
        "Desarrollo backend funcional con Java (Spring Boot) y C#/.NET MVC.",
        "Uso de Git para control de versiones y Azure DevOps para gestion del proyecto.",
        "Participacion en integracion continua (CI/CD) bajo Scrum.",
      ],
    },
    {
      title: "Soporte Tecnico / Desarrollo",
      company: "MAAHSA",
      period: "05/2020 - 02/2022",
      duties: [
        "Desarrollo de herramientas internas en Java 7.",
        "Desarrollo para PLC en C++.",
        "Consultas y reportes en SQL Server y Oracle (PL/SQL).",
        "Administracion basica de infraestructura IT y redes.",
        "Virtualizacion de servidores Windows y Linux con Hyper-V.",
      ],
    },
    {
      title: "Tecnico de Soporte IT",
      company: "CEREALES S.A",
      period: "2017 - 2019",
      duties: [
        "Administracion de CentOS 5 y Active Directory on-premise.",
        "Administracion de redes Mikrotik, Fortinet y Ubiquiti.",
        "Gestion de licencias Office 365 y tickets en GLPI.",
        "Gestion de almacenamiento y backups con Synology NAS.",
        "Instalación de CCTV y soporte técnico N1/N2.",
      ],
    },
  ],
  extraCurricular: {
    title: "Perfil Profesional",
    period: "Actual",
    points: [
      "Buenas prácticas de desarrollo y calidad de código.",
      "Aprendizaje continuo en tecnologías web modernas.",
    ],
  },
  education: [
    {
      institution: "Universidad del Cono Sur de las Americas",
      degree: "Licenciatura en Desarrollo de Software",
      period: "En proceso de culminación",
      details: "Formación académica en curso",
    },
    {
      institution: "Programacion con C#",
      period: "2025",
      details: "Platzi - Certificacion",
      description: "Desarrollo backend con C# y fundamentos .NET.",
      tags: ["c#", ".net", "backend", "certificación"],
    },
    {
      institution: "Fundamentos de Diseño de Interfaces UX/UI",
      period: "2025",
      details: "Platzi - Certificacion",
      description: "Diseño de interfaces con enfoque UX/UI.",
      tags: ["ux/ui", "diseño", "certificación"],
    },
    {
      institution: "Programacion con React.js",
      period: "2024",
      details: "Platzi - Certificacion",
      description: "Desarrollo frontend con React.",
      tags: ["react", "frontend", "javascript", "certificación"],
    },
    {
      institution: "JavaScript Essentials",
      period: "2023",
      details: "Cisco Networking Academy - Certificacion",
      description: "Certificacion oficial de JavaScript.",
      tags: ["javascript", "cisco", "certificación"],
    },
    {
      institution: "SQL Database",
      period: "2022",
      details: "IBM / Coursera - Certificacion",
      description: "Bases de datos SQL.",
      tags: ["sql", "database", "ibm", "coursera", "certificación"],
    },
    {
      institution: "Desarrollo Web HTML y CSS",
      period: "2022",
      details: "Platzi - Certificacion",
      description: "Fundamentos de desarrollo web.",
      tags: ["html", "css", "web", "certificación"],
    },
    {
      institution: "CCNA 1",
      period: "2018",
      details: "Cisco Networking Academy - Certificacion",
      description: "Fundamentos de redes.",
      tags: ["cisco", "networking", "ccna", "certificación"],
    },
  ],
  skills: sharedSkills,
  timelineUpdates: [
    {
      title: "Programacion con C#",
      date: "2025",
      description: "Certificacion de Platzi en desarrollo backend con C# y .NET.",
      tags: ["c#", ".net", "backend", "platzi"],
    },
    {
      title: "Fundamentos de Diseño de Interfaces UX/UI",
      date: "2025",
      description: "Certificacion enfocada en principios de UX/UI para productos digitales.",
      tags: ["ux/ui", "diseño", "platzi"],
    },
    {
      title: "Programacion con React.js",
      date: "2024",
      description: "Actualizacion profesional en desarrollo frontend con React.",
      tags: ["react", "frontend", "javascript", "platzi"],
    },
  ],
  allTags: [
    "certificación",
    "ux/ui",
    "platzi",
    "c#",
    ".net",
    "backend",
    "react",
    "frontend",
    "javascript",
    "sql",
    "database",
    "ibm",
    "coursera",
    "html",
    "css",
    "web",
    "cisco",
    "networking",
    "ccna",
    "diseño",
  ],
};

const enData: CvData = {
  personalInfo: {
    name: "Ariel Vera",
    title: "Web Developer / Full Stack",
    location: "Madrid, Spain",
    tagline: "Full Stack Developer with 10 years of IT infrastructure experience and 3 years as a Full Stack Web Developer using TypeScript, React, and Angular.",
    email: "ariel.arvera@gmail.com",
    phone: "695 298 272",
    linkedin: "https://linkedin.com/in/ariel-vera-94ab26137",
    linkedinDisplay: "linkedin.com/in/ariel-vera-94ab26137",
    portfolioUrl: "https://ariel-arvera.github.io/curriculum-vitae/",
    infojobs: "/curriculum-vitae/Perfil-Infojobs.png",
    cvUrl: "/Ariel-Vera-CV.pdf",
    profileImage: "/profile-placeholder.jpg",
    availability: "Open to new opportunities",
    workPermit: "Authorized to work in the European Union",
  },
  aboutText:
    "Full Stack Developer with 10 years of IT infrastructure experience and 3 years of professional Full Stack web development using TypeScript, React, and Angular on the frontend, and C#/.NET or Java on the backend. Experienced in REST API design/integration, SQL database management, and collaborative workflows with Git. Strong focus on code quality, best practices, and continuous learning.",
  sections: [
    { id: "about", title: "About", desc: "Professional profile and technical focus" },
    { id: "education", title: "Education", desc: "Academic background and certifications" },
    { id: "skills", title: "Skills", desc: "Technical stack and tools" },
    { id: "contact", title: "Contact", desc: "Professional contact channels" },
  ],
  navLinks: [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" },
  ],
  experience: [
    {
      title: "Web Developer (Frontend / Functional Backend)",
      company: "AZETA MANDATOS Y SERVICIOS",
      period: "02/2022 - 10/2025",
      duties: [
        "Developed frontend web applications with React and TypeScript using SPA, SEO, and SSR architecture.",
        "Maintained Angular e-commerce platforms focused on catalogs and admin panels.",
        "Implemented responsive UI with HTML5, CSS3, and Tailwind CSS.",
        "Integrated frontend applications with REST APIs.",
        "Built functional backend features with Java (Spring Boot) and C#/.NET MVC.",
        "Used Git for version control and Azure DevOps for project management.",
        "Participated in CI/CD workflows under Scrum practices.",
      ],
    },
    {
      title: "Technical Support / Development",
      company: "MAAHSA",
      period: "05/2020 - 02/2022",
      duties: [
        "Built internal tools with Java 7.",
        "Developed PLC-related solutions in C++.",
        "Created reports and queries in SQL Server and Oracle (PL/SQL).",
        "Handled basic IT infrastructure and network administration.",
        "Virtualized Windows and Linux servers with Hyper-V.",
      ],
    },
    {
      title: "IT Support Technician",
      company: "CEREALES S.A",
      period: "2017 - 2019",
      duties: [
        "Managed CentOS 5 and on-premise Active Directory.",
        "Administered Mikrotik, Fortinet, and Ubiquiti networks.",
        "Handled Office 365 licenses and GLPI ticketing.",
        "Managed storage and internal backups with Synology NAS.",
        "Installed CCTV circuits and provided L1/L2 support.",
      ],
    },
  ],
  extraCurricular: {
    title: "Professional Profile",
    period: "Current",
    points: [
      "Strong software engineering practices and code quality mindset.",
      "Continuous learning across modern web technologies.",
    ],
  },
  education: [
    {
      institution: "Universidad del Cono Sur de las Americas",
      degree: "Bachelor in Software Development",
      period: "In progress",
      details: "Current academic training",
    },
    {
      institution: "C# Programming",
      period: "2025",
      details: "Platzi - Certification",
      description: "Backend development with C# and .NET fundamentals.",
      tags: ["c#", ".net", "backend", "certification"],
    },
    {
      institution: "UX/UI Interface Design Fundamentals",
      period: "2025",
      details: "Platzi - Certification",
      description: "Interface design with UX/UI principles.",
      tags: ["ux/ui", "design", "certification"],
    },
    {
      institution: "React.js Programming",
      period: "2024",
      details: "Platzi - Certification",
      description: "Frontend development with React.",
      tags: ["react", "frontend", "javascript", "certification"],
    },
    {
      institution: "JavaScript Essentials",
      period: "2023",
      details: "Cisco Networking Academy - Certification",
      description: "Official JavaScript certification.",
      tags: ["javascript", "cisco", "certification"],
    },
    {
      institution: "SQL Database",
      period: "2022",
      details: "IBM / Coursera - Certification",
      description: "Relational database fundamentals.",
      tags: ["sql", "database", "ibm", "coursera", "certification"],
    },
    {
      institution: "HTML and CSS Web Development",
      period: "2022",
      details: "Platzi - Certification",
      description: "Web development fundamentals.",
      tags: ["html", "css", "web", "certification"],
    },
    {
      institution: "CCNA 1",
      period: "2018",
      details: "Cisco Networking Academy - Certification",
      description: "Networking fundamentals.",
      tags: ["cisco", "networking", "ccna", "certification"],
    },
  ],
  skills: sharedSkills,
  timelineUpdates: [
    {
      title: "C# Programming",
      date: "2025",
      description: "Platzi certification focused on backend development with C# and .NET.",
      tags: ["c#", ".net", "backend", "platzi"],
    },
    {
      title: "UX/UI Interface Design Fundamentals",
      date: "2025",
      description: "Certification focused on UX/UI principles for digital products.",
      tags: ["ux/ui", "design", "platzi"],
    },
    {
      title: "React.js Programming",
      date: "2024",
      description: "Professional upskilling in modern React frontend development.",
      tags: ["react", "frontend", "javascript", "platzi"],
    },
  ],
  allTags: [
    "certification",
    "ux/ui",
    "platzi",
    "c#",
    ".net",
    "backend",
    "react",
    "frontend",
    "javascript",
    "sql",
    "database",
    "ibm",
    "coursera",
    "html",
    "css",
    "web",
    "cisco",
    "networking",
    "ccna",
    "design",
  ],
};

export const cvDataByLanguage: Record<Language, CvData> = {
  es: esData,
  en: enData,
};

export const getCvData = (language: Language): CvData => cvDataByLanguage[language];
