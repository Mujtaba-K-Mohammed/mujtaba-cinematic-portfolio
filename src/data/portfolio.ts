import originalProjects from './source-projects.json'
import { asset } from '../utils/assets'

export const profile = {
  name: 'Mujtaba Khalid Alnaje Mohammed',
  shortName: 'Mujtaba Khalid',
  title: 'Software Engineer & Full-Stack Developer',
  email: 'mujtabakhalid1960@gmail.com',
  github: 'https://github.com/Mujtaba-K-Mohammed',
  linkedin: 'https://www.linkedin.com/in/mujtaba-khalid-85b584388',
  whatsapp: 'https://wa.me/message/IRVIABKFONZJB1',
  source: 'https://mujtaba-k-mohammed.github.io/portfolio/',
  cv: asset('assets/documents/Mujtaba_Khalid_CV.pdf'),
  intro: 'I connect thoughtful interfaces with the systems behind them. React on the surface. Laravel at the core. Every detail in between.',
  about: "I'm Mujtaba Khalid Alnaje Mohammed, a Full-Stack Developer who builds from interface to API. I work with React, PHP, Laravel and MySQL, and enjoy taking a feature from its first interaction to the data behind it.",
  also: 'My work also spans WordPress plugins, Shopify storefronts and SEO — practical websites shaped around real users and the people who run them.',
}

export type Category = 'All projects' | 'Full-stack' | 'AI & dashboards' | 'Websites' | 'Interfaces'
export interface Project {
  id: string
  name: string
  description: string
  stack: string[]
  live: string
  github: string | null
  category: Category
  image?: string
  featured?: boolean
  previewStatus?: string
  liveAvailable: boolean
}

const categories: Record<string, Category> = {
  'royal-voltage-electro-mechanical-works': 'Websites',
  'task-app': 'Interfaces', 'finance-ai': 'AI & dashboards',
  'clinic-booking-system': 'Full-stack', 'ai-business-dashboard': 'AI & dashboards',
  'ai-chat-assistant': 'AI & dashboards', 'ai-business-solutions': 'AI & dashboards',
  'react-crud': 'Interfaces', 'prompt-generation': 'AI & dashboards',
  'product-app': 'Interfaces', 'avatar-landing-page': 'Websites',
  'product-page': 'Interfaces', 'landing-page': 'Websites', 'services-website': 'Websites',
}

export const projects: Project[] = [
  {
    id: 'royal-solar', name: 'Royal Solar', category: 'Websites',
    description: 'An interactive corporate website for Royal Solar, presenting solar energy solutions through a modern visual experience.',
    stack: ['React', 'TypeScript', 'Three.js'],
    live: 'https://royal-solar.vercel.app/',
    github: 'https://github.com/Mujtaba-K-Mohammed/Royal-Solar',
    image: asset('assets/projects/royal-solar.webp'), featured: true,
    previewStatus: 'Client preview', liveAvailable: true,
  },
  {
    id: 'fikra', name: 'Fikra', category: 'Websites',
    description: 'A bilingual business website for Fikra, bringing company formation, project consulting and business development into a clear digital experience.',
    stack: ['Web Design', 'Responsive UI', 'Business Website'],
    live: 'https://fikra369-website-two.vercel.app/', github: null,
    image: asset('assets/projects/fikra.webp'), featured: true,
    previewStatus: 'Client preview', liveAvailable: true,
  },
  ...originalProjects.map((p): Project => ({
    ...p,
    description: p.id === 'task-app' ? 'Listed as Task App in the original portfolio. The current public demo is ProductHub, a product exploration interface with search, category and sorting controls.' : p.description,
    category: categories[p.id] ?? 'Websites',
    image: asset(`assets/projects/${p.id}.webp`),
    featured: p.id === 'royal-voltage-electro-mechanical-works',
    liveAvailable: true,
  })),
]

export const filters: Category[] = ['All projects', 'Websites', 'Full-stack', 'AI & dashboards', 'Interfaces']

export const skillGroups = [
  { id: 'frontend', label: 'Frontend', subtitle: 'The part people feel.', code: 'frontend',
    detail: 'Responsive interfaces, reusable components and interactions that make the next step clear.',
    tools: ['HTML', 'CSS', 'JavaScript / ES6+', 'TypeScript', 'React', 'Next.js', 'Vite', 'Flexbox', 'CSS Grid', 'DOM Manipulation', 'Responsive Web Design', 'UI/UX Principles'] },
  { id: 'backend', label: 'Backend & data', subtitle: 'The systems behind it.', code: 'system',
    detail: 'Application logic, API integration and a structured path from an interface to its data.',
    tools: ['PHP', 'Laravel', 'MySQL', 'REST APIs', 'Postman', 'XAMPP', 'phpMyAdmin'] },
  { id: 'platforms', label: 'Platforms & growth', subtitle: 'Built for the real world.', code: 'platform',
    detail: 'Client websites, commerce, content and the performance details that keep a site useful.',
    tools: ['WordPress', 'WooCommerce', 'Shopify', 'WordPress Plugins', 'SEO', 'Website Optimization', 'Vercel'] },
  { id: 'workflow', label: 'Workflow', subtitle: 'From idea to delivery.', code: 'workflow',
    detail: 'Version control and software engineering fundamentals supporting a maintainable delivery.',
    tools: ['Git', 'GitHub', 'Software Engineering Fundamentals'] },
  { id: 'creative', label: 'Creative development', subtitle: 'Powering this experience.', code: 'experience',
    detail: 'The technologies used in this portfolio for 3D, restrained motion and pointer interaction.',
    tools: ['Three.js', 'React Three Fiber', 'Drei', 'GSAP', 'ScrollTrigger', 'Lenis', 'GLSL'] },
] as const

export const services = [
  { number: '01', title: 'Full-stack development', description: 'Connected web applications, from a responsive React interface to Laravel APIs and MySQL data.', icon: 'layers' },
  { number: '02', title: 'Frontend & interaction', description: 'Thoughtful UI implementation, responsive layouts and purposeful web interactions.', icon: 'code' },
  { number: '03', title: 'Commerce & content', description: 'WordPress, WooCommerce and Shopify websites shaped around content and customer journeys.', icon: 'store' },
  { number: '04', title: 'Optimization & integration', description: 'Website performance, SEO improvements and API integrations that connect the pieces.', icon: 'gauge' },
] as const
