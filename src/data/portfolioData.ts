export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  techStack: string[];
  description: string;
  architecture?: string;
  highlights: string[];
  githubUrl: string;
  demoUrl: string;
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location: string;
  bullets: string[];
  techStack?: string[];
}

export interface SkillCategory {
  title: string;
  description: string;
  icon: string;
  skills: {
    name: string;
    iconSrc?: string;
  }[];
}

export const PORTFOLIO_DATA = {
  personal: {
    name: "Prashant Kr. Singh",
    shortName: "Prashant.",
    title: "Software Developer & Full-Stack Engineer",
    headline: "SOFTWARE DEVELOPER & FULL-STACK ENGINEER.",
    subheadline:
      "Software Developer skilled in Angular, React.js, Node.js, and TypeScript, with hands-on experience in full-stack development, scalable web architectures, secure REST APIs, and parametric CAD UI engineering.",
    email: "singhprashant0508@gmail.com",
    phone: "+91 94307 43691",
    github: "https://github.com/PrashDevCode",
    linkedin: "https://www.linkedin.com/in/prashant-singh05/",
    resumeUrl: "/assets/resume.pdf",
    location: "India",
    status: "Available for Software Engineering Roles & Collaborations",
  },
  metrics: [
    { label: "B.Tech CGPA", value: "8.1" },
    { label: "ServiceNow Certified", value: "CSA" },
    { label: "Engineering Stack", value: "Full Stack" },
  ],
  coreConcepts: [
    "2D AABB Intersection & Spatial Algorithms",
    "JWT Authentication & API Security",
    "Microservices, MVC & MCRS Architecture",
    "Asynchronous Task Pipelines (BullMQ/Redis)",
    "Object-Oriented Programming (OOP) & Clean Code",
    "Manual & Functional Web QA / E2E Validation",
  ],
  tickerItems: [
    "PARAMETRIC CAD ENGINES",
    "ANGULAR & REACT.JS",
    "SCALABLE RESTFUL APIs",
    "ASYNC BULLMQ & REDIS",
    "MICROSERVICES & MCRS",
    "FULL-STACK NEXT.JS",
    "TYPESCRIPT & NODE.JS",
  ],
  experiences: [
    {
      company: "Aagento.AI",
      role: "Software Developer",
      period: "Sep 2026 – Present",
      location: "Noida, India",
      bullets: [
        "Engineered a high-performance Smart Text Intelligence Layer for parametric bridge engineering CAD modules using Angular and TypeScript.",
        "Developed advanced automated collision resolution algorithms including true 2D AABB intersection, multi-pass cascading vertical pushdown, and structural obstacle avoidance.",
        "Enforced strict structural geometry immutability and continuous engineering line integrity, eliminating unwanted line-splitting and dimension injections on canvas.",
      ],
      techStack: ["TypeScript", "Angular", "HTML5 Canvas API", "AABB Algorithms", "Git"],
    },
    {
      company: "Sheryians Pvt. Limited",
      role: "Full Stack Developer",
      period: "Dec 2025 – Mar 2026",
      location: "Bhopal, India",
      bullets: [
        "Built an asynchronous certificate-delivery pipeline using BullMQ and Redis to generate PDFs, upload to AWS S3, and send emails via Brevo with exponential backoff.",
        "Designed normalized MongoDB schemas using Mongoose ODM with optimized query performance, ensuring consistent and scalable data modeling across production environments.",
        "Built modular REST APIs using Node.js and Express.js with JWT authentication, Joi for input validation, and Multer for file handling.",
      ],
      techStack: ["Node.js", "Express.js", "Next.js", "MongoDB", "BullMQ", "Redis", "AWS S3", "Brevo", "REST APIs"],
    },
  ] as ExperienceItem[],
  skillCategories: [
    {
      title: "Languages",
      description: "Core programming languages",
      icon: "Code2",
      skills: [
        { name: "TypeScript", iconSrc: "/assets/TypeScript.png" },
        { name: "JavaScript", iconSrc: "/assets/JavaScript.png" },
        { name: "Java", iconSrc: "/assets/Java.png" },
        { name: "Python" },
      ],
    },
    {
      title: "Frontend & UI",
      description: "UI engineering & CAD layers",
      icon: "Monitor",
      skills: [
        { name: "Angular" },
        { name: "React.js", iconSrc: "/assets/React.png" },
        { name: "Next.js", iconSrc: "/assets/nextjs-icon-svgrepo-com.png" },
        { name: "HTML5 Canvas", iconSrc: "/assets/HTML5.png" },
        { name: "Tailwind CSS", iconSrc: "/assets/Tailwind CSS.png" },
        { name: "Bootstrap", iconSrc: "/assets/bootstrap-brands-solid.png" },
      ],
    },
    {
      title: "Backend & Arch.",
      description: "Server logic & distributed patterns",
      icon: "Server",
      skills: [
        { name: "Node.js", iconSrc: "/assets/nodejs.png" },
        { name: "Express.js", iconSrc: "/assets/Express.png" },
        { name: "REST APIs" },
        { name: "MVC & MCRS" },
        { name: "Microservices" },
      ],
    },
    {
      title: "Databases & Storage",
      description: "SQL, NoSQL & Cache",
      icon: "Database",
      skills: [
        { name: "MongoDB", iconSrc: "/assets/MongoDB.png" },
        { name: "MySQL", iconSrc: "/assets/MySQL.png" },
        { name: "PostgreSQL" },
        { name: "Redis", iconSrc: "/assets/Redis.png" },
      ],
    },
    {
      title: "Cloud & DevOps",
      description: "Deployment & toolchain",
      icon: "Cloud",
      skills: [
        { name: "AWS S3", iconSrc: "/assets/AWS.png" },
        { name: "Docker" },
        { name: "CI/CD" },
        { name: "Git/GitHub", iconSrc: "/assets/Git.png" },
        { name: "Postman", iconSrc: "/assets/Postman.png" },
        { name: "Vercel / Render", iconSrc: "/assets/Vercel.png" },
      ],
    },
    {
      title: "Testing, QA & Libraries",
      description: "QA verification & task queues",
      icon: "Cpu",
      skills: [
        { name: "Manual & E2E Testing" },
        { name: "BullMQ" },
        { name: "Multer" },
        { name: "Brevo" },
        { name: "Joi" },
        { name: "bcrypt.js" },
      ],
    },
  ] as SkillCategory[],
  education: [
    {
      degree: "Bachelor of Technology — Computer Science & Engineering",
      institution: "Technocrats Institute of Technology, Bhopal, M.P.",
      period: "2022 – 2026",
      score: "CGPA: 8.1 / 10.0",
    },
    {
      degree: "Higher Secondary Education (+2)",
      institution: "Rajkiya +2 High School, Arrah, Bihar",
      period: "2020 – 2022",
      score: "First Division",
    },
  ],
  // [IMPORTANT] Preserving existing extensive project showcase intact as requested
  projects: [
    {
      id: "jubilo",
      title: "Jubilo Event Platform",
      subtitle: "Next.js 14, Tailwind CSS, Cashfree Payments, EmailJS",
      techStack: ["Next.js 14", "Tailwind CSS", "Cashfree Payments", "EmailJS"],
      description:
        "Production event ticketing and management platform with automated payment webhooks, instant ticket issuance, and automated confirmation emails.",
      architecture:
        "Next.js App Router ➔ Cashfree Payment Gateway ➔ Secure Webhook Verification ➔ Order State Persistence ➔ Automated EmailJS Dispatch",
      highlights: [
        "Cashfree webhook handling with cryptographic signature verification",
        "Dynamic ticket generation and instant automated delivery",
        "Responsive server-rendered UI optimized for seamless checkout",
      ],
      githubUrl: "https://github.com/PrashDevCode/JubiLo",
      demoUrl: "https://jubilo-services.vercel.app/",
    },
    {
      id: "skyblog",
      title: "SkyBlog CMS Platform",
      subtitle: "Node.js, Express.js, JWT, Multer, Brevo SMTP",
      techStack: ["Node.js", "Express.js", "JWT", "Multer", "Brevo SMTP", "MongoDB"],
      description:
        "Modern full-stack blogging CMS featuring role-based authoring, secure media asset pipelines, and automated transactional emails for user engagements.",
      architecture:
        "Express REST Server ➔ JWT Auth Middleware ➔ Multer Memory Processing ➔ MongoDB Atlas Cluster ➔ Brevo SMTP Relay",
      highlights: [
        "Secure JWT cookie-based session management and input sanitization",
        "Multer image pipeline handling multipart uploads safely",
        "Brevo SMTP integration for email verification and engagement alerts",
      ],
      githubUrl: "https://github.com/PrashDevCode/SkyBlog",
      demoUrl: "https://skyblog-app-v1.onrender.com",
    },
    {
      id: "contact-app",
      title: "Contact App REST System",
      subtitle: "Node.js, Express.js, MongoDB, Mongoose ODM",
      techStack: ["Node.js", "Express.js", "MongoDB", "Mongoose ODM"],
      description:
        "High-performance contact management backend featuring compound index search, pagination, and robust schema validation.",
      architecture:
        "Client HTTP Requests ➔ Express Router ➔ Mongoose Schema Validation ➔ MongoDB Indexed Collections",
      highlights: [
        "Normalized Mongoose schemas with compound indexes for lightning-fast queries",
        "Granular error handling middleware with centralized logging",
        "Complete RESTful CRUD interface verified and documented in Postman",
      ],
      githubUrl: "https://github.com/PrashDevCode/ContactApp-Server",
      demoUrl: "https://contactapp-server-dnmi.onrender.com",
    },
    {
      id: "skynexes",
      title: "Skynexes Platform",
      subtitle: "React.js, Node.js, Tailwind CSS, EdTech Architecture",
      techStack: ["React.js", "Node.js", "Tailwind CSS", "Express.js"],
      description:
        "Scalable educational tech platform designed for modern course exploration, curriculum tracking, and fluid student interaction.",
      architecture:
        "React Component Tree ➔ REST API Client ➔ Node/Express Services ➔ Database Persistence Layer",
      highlights: [
        "Component-driven design system built with reusable React primitives",
        "Dynamic course navigation with interactive state persistence",
        "Engineered for sub-second page transitions and mobile responsiveness",
      ],
      githubUrl: "https://github.com/PrashDevCode/Skynexes-client",
      demoUrl: "https://skynexes-ui.vercel.app/",
    },
  ] as ProjectItem[],
};
