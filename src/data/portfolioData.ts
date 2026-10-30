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
    title: "Full-Stack Software Engineer",
    headline: "FULL-STACK SOFTWARE ENGINEER.",
    subheadline:
      "Full Stack Software Engineer skilled in engineering production-grade web applications using Java, TypeScript, React, and Node.js. Expert at integrating AI-driven development methodologies to rapidly deliver scalable features from concept to deployment.",
    email: "prashantsingh4688@gmail.com",
    phone: "+91 94307 43691",
    github: "https://github.com/PrashDevCode",
    linkedin: "https://www.linkedin.com/in/prashant-singh05/",
    resumeUrl: "/assets/resume.pdf",
    location: "India",
    status: "Available for Full-time Roles & Technical Collaborations",
  },
  metrics: [
    { label: "B.Tech CGPA", value: "8.1" },
    { label: "ServiceNow Certified", value: "CSA" },
    { label: "+ Java Stack", value: "MERN" },
  ],
  coreConcepts: [
    "JWT Authentication & API Security",
    "OAuth 2.0 & CORS Protocols",
    "Microservices & MVC Architecture",
    "Object-Oriented Programming (OOP)",
    "Asynchronous Task Pipelines (BullMQ/Redis)",
    "Database Normalization & Query Tuning",
  ],
  tickerItems: [
    "MERN STACK ARCHITECTURE",
    "JAVA ENTERPRISE SOLUTIONS",
    "SCALABLE RESTFUL APIs",
    "DATABASE OPTIMIZATION",
    "MICROSERVICES SYSTEM",
    "FULL-STACK NEXT.JS",
    "AI-POWERED WORKFLOWS",
  ],
  experiences: [
    {
      company: "VinraTech",
      role: "Software Developer",
      period: "Mar 2026 – Present",
      location: "Remote",
      bullets: [
        "Engineered scalable web apps using React, Node.js, and TypeScript with modular backend architecture.",
        "Built secure REST APIs and optimized MongoDB/MySQL queries to enhance server response times.",
        "Implemented JWT authentication, role-based workflows, and collaborated via Agile/Git code reviews.",
      ],
    },
    {
      company: "Sheryians Pvt. Limited",
      role: "Full Stack Developer",
      period: "Dec 2025 – Mar 2026",
      location: "Bhopal, India",
      bullets: [
        "Architected a live hiring platform using MCRS architecture serving active recruiters and candidates.",
        "Built async BullMQ + Redis pipeline to automate PDF certificates, AWS S3 uploads, and Brevo emails.",
        "Designed normalized MongoDB schemas and secure REST APIs with JWT, Joi, and Multer.",
      ],
    },
  ] as ExperienceItem[],
  skillCategories: [
    {
      title: "Languages",
      description: "Core programming languages",
      icon: "Code2",
      skills: [
        { name: "Java", iconSrc: "/assets/Java.png" },
        { name: "JavaScript", iconSrc: "/assets/JavaScript.png" },
        { name: "TypeScript", iconSrc: "/assets/TypeScript.png" },
        { name: "Python" },
      ],
    },
    {
      title: "Frontend",
      description: "UI engineering & styling",
      icon: "Monitor",
      skills: [
        { name: "React.js", iconSrc: "/assets/React.png" },
        { name: "Next.js", iconSrc: "/assets/nextjs-icon-svgrepo-com.png" },
        { name: "HTML5", iconSrc: "/assets/HTML5.png" },
        { name: "CSS3", iconSrc: "/assets/CSS3.png" },
        { name: "Tailwind CSS", iconSrc: "/assets/Tailwind CSS.png" },
        { name: "Bootstrap", iconSrc: "/assets/bootstrap-brands-solid.png" },
      ],
    },
    {
      title: "Backend & Arch.",
      description: "Server logic & endpoints",
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
      title: "Databases",
      description: "SQL & NoSQL Storage",
      icon: "Database",
      skills: [
        { name: "MongoDB", iconSrc: "/assets/MongoDB.png" },
        { name: "MySQL", iconSrc: "/assets/MySQL.png" },
        { name: "PostgreSQL" },
        { name: "Redis", iconSrc: "/assets/Redis.png" },
      ],
    },
    {
      title: "Cloud & Tools",
      description: "DevOps & Cloud services",
      icon: "Cloud",
      skills: [
        { name: "AWS S3", iconSrc: "/assets/AWS.png" },
        { name: "Docker" },
        { name: "CI/CD" },
        { name: "Git/GitHub", iconSrc: "/assets/Git.png" },
        { name: "Postman", iconSrc: "/assets/Postman.png" },
        { name: "Vercel / Netlify", iconSrc: "/assets/Vercel.png" },
      ],
    },
    {
      title: "AI & Libraries",
      description: "AI Prompting & Node Packages",
      icon: "Cpu",
      skills: [
        { name: "BullMQ" },
        { name: "Multer" },
        { name: "Brevo" },
        { name: "bcrypt.js" },
        { name: "OpenAI API" },
        { name: "Gemini API" },
      ],
    },
  ] as SkillCategory[],
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

