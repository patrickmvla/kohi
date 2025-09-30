// src/lib/resume.ts
export type Resume = {
  name: string
  title: string
  location?: string
  email?: string
  phone?: string
  website?: string
  socials?: { label: string; href: string }[]
  summary?: string
  skills: { title: string; items: string[] }[]
  experience: {
    company: string
    role: string
    start: string
    end?: string
    location?: string
    bullets: string[]
    stack?: string[]
    link?: string
  }[]
  projects?: {
    title: string
    tagline?: string
    bullets?: string[]
    link?: string
    stack?: string[]
  }[]
  education?: {
    school: string
    degree: string
    period?: string
    details?: string[]
  }[]
}

export const resume: Resume = {
  name: 'Patrick Mvula',
  title: 'Software Engineer',
  location: 'Lusaka, Zambia',
  email: 'mvlapatrick@gmail.com',
  phone: '+260 973-500-036',
  // Add socials when ready
  socials: [
     { label: 'GitHub', href: 'https://github.com/patrickmvla' },
    // { label: 'LinkedIn', href: 'https://www.linkedin.com/in/your-handle' },
    // { label: 'X', href: 'https://x.com/your-handle' },
  ],
  summary:
    'Highly motivated frontend-leaning software engineer focused on performant, user-centric web applications and AI-driven solutions. Proven track record building dynamic, multi-tenant products, from inception to deployment, using modern frameworks, cloud services, and AI APIs.',

  skills: [
    { title: 'Languages', items: ['Go', 'JavaScript', 'TypeScript'] },
    { title: 'Frontend', items: ['Next.js', 'Nuxt.js', 'React', 'Vue', 'shadcn/ui', 'Tailwind CSS'] },
    { title: 'Backend & APIs', items: ['Node.js', 'Express.js', 'Gin', 'Hono', 'REST APIs'] },
    { title: 'Databases & ORMs', items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Prisma', 'Drizzle ORM', 'Vector DB'] },
    { title: 'AI/ML', items: ['AI SDK', 'OpenAI', 'Google Gemini', 'Hugging Face', 'TensorFlow.js'] },
    { title: 'Cloud & DevOps', items: ['Docker', 'Vercel', 'Render', 'Supabase', 'Linux', 'GitHub Actions'] },
    { title: 'Technical', items: ['API Design', 'Database Architecture', 'Full‑stack Development', 'Performance Optimization', 'SEO'] },
    { title: 'Soft skills', items: ['Problem Solving', 'Project Management', 'Team Collaboration', 'Technical Communication'] },
  ],

  experience: [
    {
      company: 'Chrillan Tech',
      role: 'Frontend Developer',
      start: 'Apr 2025',
      end: 'Aug 2025',
      location: 'Lusaka, Zambia',
      bullets: [
        'Architected and launched “Vukaaa” — a Vue.js PWA serving 10,000+ daily users across mobile and desktop.',
        'Built a comprehensive admin dashboard with real‑time analytics and CMS using Vue.js.',
        'Engineered an AI‑driven content pipeline integrating News API and OpenAI for automated article creation.',
        'Integrated DALL·E for on‑demand image generation, reducing content creation time by 60%.',
        'Optimized SEO to 95+ Lighthouse through dynamic meta tags and structured data.',
        'Developed “KDiiy” — a multi‑tenant enterprise form builder used by 50+ companies.',
        'Implemented secure multi‑tenant architecture with isolated data and dedicated admin dashboards.',
        'Built a calculation engine for real‑time pricing with dynamic discounts and complex business rules.',
        'Created an export system generating comprehensive Excel reports for 100,000+ transactions.',
      ],
      stack: ['Vue.js', 'PWA', 'OpenAI', 'DALL·E', 'News API', 'SEO'],
    },
  ],

  projects: [
    {
      title: 'AI Gmail Sorter',
      tagline: 'Intelligent email automation',
      bullets: [
        'Headless AI agent learns patterns and organizes inboxes with ~95% accuracy.',
        'Custom Bi‑LSTM (TensorFlow.js) for real‑time classification.',
        'Event‑driven architecture with Google Cloud Pub/Sub for sub‑100ms processing.',
        'Runs as a 24/7 background service handling 1,000+ emails/day with zero downtime.',
      ],
      stack: ['TensorFlow.js', 'Google Cloud Pub/Sub', 'Node.js', 'Gmail API'],
    },
    {
      title: 'Prompt Studio',
      tagline: 'LLM prompt engineering platform',
      bullets: [
        'Built an environment for designing and testing high‑fidelity prompts with verifiable metrics.',
        'Adversarial testing suite with “Strictness Score” for 99% constraint adherence.',
        'Semantic analysis using Jina AI embeddings to verify output alignment with intent.',
        'Real‑time collaboration with session persistence and cost analysis.',
      ],
      stack: ['OpenAI', 'Embeddings (Jina AI)', 'React/Next.js', 'PostgreSQL'],
    },
    {
      title: 'LinkLift',
      tagline: 'Production‑grade URL shortener',
      bullets: [
        'Sub‑millisecond redirects on Vercel Edge.',
        'Real‑time analytics dashboard tracking 1M+ clicks, with geo and source insights.',
        'Custom domains, QR codes, link expiration; 99.9% uptime with Redis caching + queue analytics.',
      ],
      stack: ['Vercel Edge', 'Redis', 'Queue workers', 'Next.js'],
    },
    {
      title: 'pdf2md',
      tagline: 'Privacy‑first PDF → Markdown converter',
      bullets: [
        'All processing client‑side; no server uploads — 100% privacy.',
        'Drag‑and‑drop batch conversion with real‑time progress.',
        'Offline‑capable PWA experience.',
      ],
      stack: ['PWA', 'Web Workers', 'WASM (optional)', 'React/Next.js'],
    },
  ],

  // Add if you want
  education: [
    // {
    //   school: 'University / Program',
    //   degree: 'B.Sc. Computer Science',
    //   period: '—',
    //   details: ['Focus: systems, databases, HCI'],
    // },
  ],
}