import { PORTFOLIO_DATA } from "@/data/portfolioData";

export interface KnowledgeMatch {
  title: string;
  response: string;
  suggestedActions?: { label: string; action: string }[];
}

export function queryLocalKnowledgeBase(rawQuery: string): KnowledgeMatch {
  const query = rawQuery.toLowerCase().trim();

  // 1. Aagento.AI & CAD Engine
  if (
    query.includes("aagento") ||
    query.includes("cad") ||
    query.includes("bridge") ||
    query.includes("aabb") ||
    query.includes("collision") ||
    query.includes("spatial") ||
    query.includes("canvas")
  ) {
    return {
      title: "Parametric CAD & Smart Text Layer @ Aagento.AI",
      response: `At Aagento.AI, Prashant serves as a Software Developer building parametric bridge CAD modules.
      
Key Engineering Highlights:
• Developed an automated text collision resolution engine using true 2D AABB (Axis-Aligned Bounding Box) intersection algorithms.
• Built a multi-pass cascading vertical pushdown pipeline and structural obstacle avoidance to maintain readable drawing annotations.
• Enforced strict structural geometry immutability and continuous engineering line integrity on the HTML5 Canvas API without line-splitting.
• Core Stack: Angular, TypeScript, HTML5 Canvas API, Computational Geometry algorithms.`,
      suggestedActions: [
        { label: "View Experience", action: "experience" },
        { label: "View GitHub CAD Repo", action: "https://github.com/PrashDevCode/2D-CAD-Civil-Vector-Engine" },
      ],
    };
  }

  // 2. Sheryians & BullMQ Architecture
  if (
    query.includes("sheryians") ||
    query.includes("bullmq") ||
    query.includes("queue") ||
    query.includes("worker") ||
    query.includes("redis") ||
    query.includes("async") ||
    query.includes("certificate")
  ) {
    return {
      title: "Distributed Async Job Pipeline @ Sheryians",
      response: `At Sheryians Pvt. Limited, Prashant worked as a Full Stack Developer architecting high-throughput backend services.
      
Key Technical Wins:
• Engineered an asynchronous certificate-delivery pipeline utilizing BullMQ + Redis to generate PDF credentials in the background.
• Implemented exponential backoff retry mechanisms, automated AWS S3 asset uploads, and Brevo transactional SMTP delivery.
• Designed normalized MongoDB schemas with compound indexing via Mongoose ODM, achieving consistent low-latency queries.
• Implemented modular RESTful endpoints protected by JWT authentication, Joi validation schemas, and Multer file upload handling.`,
      suggestedActions: [
        { label: "View Experience", action: "experience" },
      ],
    };
  }

  // 3. System Design, Microservices, MCRS
  if (
    query.includes("architecture") ||
    query.includes("system design") ||
    query.includes("mcrs") ||
    query.includes("microservice") ||
    query.includes("mvc") ||
    query.includes("pattern")
  ) {
    return {
      title: "System Design & Architecture Philosophy",
      response: `Prashant approaches software engineering with strict architectural separation:
      
1. MCRS / MVC Separation: Distinct Models, Controllers, Repositories, and Services layers to isolate business logic from transport protocols.
2. Async Event Queues: Offloading compute-heavy tasks (PDF rendering, asset storage, batch emails) to Redis workers (BullMQ) to keep HTTP event-loops non-blocking.
3. Database Tiering: Normalized relational models (MySQL/PostgreSQL) for transactional integrity and indexed NoSQL (MongoDB) for flexible entity graphs.
4. Security Posture: JWT tokens with HTTP-only cookies, OAuth 2.0 flows, Zod/Joi runtime validation schemas, and CORS security.`,
      suggestedActions: [
        { label: "Explore Stack", action: "skills" },
      ],
    };
  }

  // 4. Projects (Jubilo, SkyBlog, ContactApp, Skynexes)
  if (query.includes("jubilo") || query.includes("payment") || query.includes("cashfree") || query.includes("ticket")) {
    const p = PORTFOLIO_DATA.projects.find((item) => item.id === "jubilo");
    return {
      title: "Jubilo Event Platform Deep Dive",
      response: `Jubilo is a production event ticketing and management platform engineered with Next.js 14 and Tailwind CSS.
      
Highlights:
• Cashfree Payment Gateway integration with cryptographic signature verification for webhook security.
• Dynamic event booking, ticket generation, and automated transactional delivery via EmailJS.
• Role-based access control and session encryption using iron-session and bcrypt.js.`,
      suggestedActions: [
        { label: "Live Demo", action: p?.demoUrl || "" },
        { label: "GitHub Code", action: p?.githubUrl || "" },
      ],
    };
  }

  if (query.includes("skyblog") || query.includes("blog") || query.includes("cms")) {
    const p = PORTFOLIO_DATA.projects.find((item) => item.id === "skyblog");
    return {
      title: "SkyBlog CMS Platform",
      response: `SkyBlog is a full-stack blogging CMS built with Node.js, Express.js, MongoDB Atlas, and Tailwind CSS.
      
Highlights:
• Dedicated admin panel for authoring, moderation, and user lifecycle management.
• Multer multipart image processing pipeline with secure input sanitization.
• Role-based authorization, JWT cookie sessions, and Brevo SMTP relay for engagement alerts.`,
      suggestedActions: [
        { label: "Live Demo", action: p?.demoUrl || "" },
        { label: "GitHub Code", action: p?.githubUrl || "" },
      ],
    };
  }

  // 5. Why Hire Prashant / Fit for Team
  if (
    query.includes("why hire") ||
    query.includes("strength") ||
    query.includes("about prashant") ||
    query.includes("who is") ||
    query.includes("summary")
  ) {
    return {
      title: "Engineering Profile & Value Proposition",
      response: `Why Prashant Kr. Singh brings immediate production value:
      
1. Dual-Stack Versatility: Hands-on with both modern Angular CAD canvas engineering and Next.js / Node.js distributed backends.
2. Computational Depth: Experienced in real mathematical algorithms (2D AABB collision detection, spatial layout resolution).
3. Production Discipline: B.Tech (8.1 CGPA), ServiceNow Certified System Administrator (CSA), with real industry deployments at Aagento.AI & Sheryians.
4. Clean Architecture: Strict follower of clean code, automated linting, type-safety (TypeScript), and automated testing.`,
      suggestedActions: [
        { label: "Hire Prashant", action: "hire" },
        { label: "Download Resume", action: "cv" },
      ],
    };
  }

  // 6. Contact / Hiring
  if (
    query.includes("hire") ||
    query.includes("contact") ||
    query.includes("email") ||
    query.includes("phone") ||
    query.includes("call") ||
    query.includes("reach")
  ) {
    return {
      title: "Get in Touch with Prashant",
      response: `Prashant is actively open to Software Engineering opportunities.
      
• Direct Email: ${PORTFOLIO_DATA.personal.email}
• Phone: ${PORTFOLIO_DATA.personal.phone}
• GitHub: ${PORTFOLIO_DATA.personal.github}
• LinkedIn: ${PORTFOLIO_DATA.personal.linkedin}`,
      suggestedActions: [
        { label: "Open Mail App", action: "hire" },
        { label: "View Contact Section", action: "contact" },
      ],
    };
  }

  // 7. General Tech Stack
  if (query.includes("skills") || query.includes("stack") || query.includes("tech") || query.includes("language")) {
    return {
      title: "Comprehensive Technical Stack",
      response: `Core Competencies:
• Languages: TypeScript, JavaScript, Java, Python
• Frontend: Angular, React.js, Next.js, HTML5 Canvas API, Tailwind CSS
• Backend: Node.js, Express.js, RESTful APIs, MCRS & MVC Architectures
• Databases: MongoDB, MySQL, PostgreSQL (Supabase), Redis
• Queues & Cloud: BullMQ, AWS S3, Docker, CI/CD, Git/GitHub, Vercel
• Algorithms & QA: 2D AABB Collision Resolution, Functional QA & Input Sanitization`,
      suggestedActions: [
        { label: "Jump to Stack Matrix", action: "skills" },
      ],
    };
  }

  // Fallback: Intelligent Synthesizer
  return {
    title: `Query Analysis: "${rawQuery}"`,
    response: `Prashant Kr. Singh is a Software Developer specializing in TypeScript, Angular, React.js, Next.js, Node.js, and Computational Canvas Algorithms (2D AABB).

You can ask me specific technical questions like:
• "How did Prashant implement 2D AABB collision resolution at Aagento.AI?"
• "Explain Prashant's BullMQ and Redis async architecture at Sheryians."
• "What payment and webhook security was used in Jubilo?"
• "Why should our engineering team hire Prashant?"`,
    suggestedActions: [
      { label: "Ask about Aagento.AI", action: "ask Tell me about Aagento.AI" },
      { label: "Ask about BullMQ", action: "ask Tell me about BullMQ at Sheryians" },
      { label: "Type 'help'", action: "help" },
    ],
  };
}

