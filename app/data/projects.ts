import type { Project } from '~/types/content'

/**
 * Professional project entries.
 * Descriptions stay high-level on purpose: these are private enterprise systems,
 * so nothing here exposes client data, internals, or unverified claims.
 * Mark a project `draft: false` only after its content has been reviewed for disclosure.
 */
export const projects: Project[] = [
  {
    slug: 'metaphore',
    name: 'Metaphore',
    category: 'Enterprise TMS Platform',
    tagline: 'Transport & logistics management',
    description:
      'Enterprise transport and logistics management software. Contributed to business workflows, operational modules, frontend maintenance and REST API integration across the platform.',
    featured: true,
    professional: true,
    draft: false,
    year: null,
    role: 'Full-Stack Developer',
    stack: ['Vue.js', 'TypeScript', 'Vuetify', 'Pinia', 'Java', 'Spring Boot', 'PostgreSQL'],
    highlights: ['Enterprise workflows', 'Operational modules', 'API integration'],
    responsibilities: [
      'Developed and maintained business workflow modules used in daily transport operations.',
      'Built complex interactive interfaces for data-heavy operational screens.',
      'Integrated frontend views with Spring Boot REST APIs and PostgreSQL-backed data.',
      'Diagnosed and resolved difficult UI/UX issues in existing production screens.',
    ],
    sections: [
      {
        label: '// CONTEXT',
        title: 'A platform at the center of daily operations',
        body: [
          'Metaphore is an enterprise platform used to run transport and logistics operations. Work on it spans many business modules, each with its own workflows, permissions and data requirements.',
          'The frontend is a Vue.js application backed by Java services. My work focused on making complex operational screens reliable, consistent and maintainable.',
        ],
      },
      {
        label: '// APPROACH',
        title: 'Maintain first, improve continuously',
        body: [
          'Most of the work happens inside a living production system: understanding existing behavior before changing it, keeping interfaces consistent, and making each change safe to ship.',
          'New features are built as reusable components wired to well-defined API contracts, so the same patterns hold across modules.',
        ],
      },
    ],
    challenges: [
      {
        title: 'Complex business workflows',
        body: 'Operational modules combine many states, roles and validation rules. The interface has to keep that complexity understandable without hiding required control.',
      },
      {
        title: 'Data-dense screens',
        body: 'Tables, filters and forms carry large amounts of operational data. Keeping them fast and readable on everyday hardware is a constant concern.',
      },
      {
        title: 'Evolving a production UI',
        body: 'Changes must respect established behavior and design conventions, so improvements land without disrupting the people who rely on the system daily.',
      },
    ],
    visual: 'dashboard',
  },
  {
    slug: 'deliverypro',
    name: 'DeliveryPro',
    category: 'Delivery Management',
    tagline: 'Delivery & logistics operations',
    description:
      'Delivery-management software for organizing and following delivery operations. Detailed feature list remains an editable placeholder pending disclosure review.',
    featured: false,
    professional: true,
    draft: true,
    year: null,
    role: 'Full-Stack Developer',
    stack: ['Vue.js', 'Java', 'Spring Boot', 'PostgreSQL'],
    highlights: ['Delivery workflows', 'Responsive UI'],
    responsibilities: [
      'Contributed to the delivery management interface and its backend integration.',
      'Further detail to be confirmed before public disclosure.',
    ],
    sections: [
      {
        label: '// OVERVIEW',
        title: 'Delivery operations, structured',
        body: [
          'DeliveryPro supports the organization and follow-up of delivery operations. This case study is a draft: responsibilities and features are documented at a high level until they are reviewed for public disclosure.',
        ],
      },
    ],
    challenges: [
      {
        title: 'Operational clarity',
        body: 'Delivery workflows involve many moving parts; the interface prioritizes clear status and quick access to the information operators need.',
      },
    ],
    visual: 'logistics',
  },
  {
    slug: 'metaphore-client',
    name: 'Metaphore Client',
    category: 'Customer Portal',
    tagline: 'Customer-facing logistics portal',
    description:
      'Customer-facing portal for the Metaphore ecosystem: shipment tracking and consultation, online shipment creation, taxation workflows, invoice management and responsive dashboards with role-based permissions.',
    featured: false,
    professional: true,
    draft: false,
    year: null,
    role: 'Frontend Developer',
    stack: ['Vue.js', 'Vuetify', 'Pinia', 'Axios', 'REST APIs'],
    highlights: ['Shipment tracking', 'Invoice management', 'Role-based permissions'],
    responsibilities: [
      'Built shipment tracking and consultation views for customers.',
      'Implemented online shipment creation and taxation workflows.',
      'Developed invoice management and responsive dashboard screens.',
      'Applied role-based permissions throughout the portal UI and integrated REST APIs.',
    ],
    sections: [
      {
        label: '// CONTEXT',
        title: 'Opening the platform to customers',
        body: [
          'Metaphore Client gives customers direct access to their logistics data: following shipments, creating new ones and managing invoices without going through internal teams.',
          'The portal reuses the platform’s REST APIs and presents them through a focused, responsive interface designed for non-technical users.',
        ],
      },
      {
        label: '// APPROACH',
        title: 'Complex operations, simple screens',
        body: [
          'Each workflow — tracking, creation, taxation, invoicing — is broken into clear steps with explicit states, so customers always know where a shipment or document stands.',
          'Role-based permissions shape what each account can see and do, enforced in the interface in step with the backend.',
        ],
      },
    ],
    challenges: [
      {
        title: 'Permissions in the UI',
        body: 'Different customer roles see different data and actions. The interface derives its behavior from permissions consistently across every screen.',
      },
      {
        title: 'Taxation & invoicing flows',
        body: 'Document workflows must be exact. Forms and statuses are designed so errors are caught early and every state transition is explicit.',
      },
      {
        title: 'Responsive by default',
        body: 'Customers use the portal on phones as much as desktops, so dashboards and tracking views are composed mobile-first.',
      },
    ],
    visual: 'portal',
  },
  {
    slug: 'metaphore-postgresql',
    name: 'Metaphore PostgreSQL',
    category: 'Maintenance & Data',
    tagline: 'Application maintenance & PostgreSQL integration',
    description:
      'Maintenance and evolution of enterprise application modules backed by PostgreSQL: data-layer work, query improvements and reporting support.',
    featured: false,
    professional: true,
    draft: true,
    year: null,
    role: 'Full-Stack Developer',
    stack: ['PostgreSQL', 'SQL', 'Java', 'Spring Boot', 'Vue.js'],
    highlights: ['PostgreSQL', 'Data layer', 'Maintenance'],
    responsibilities: [
      'Maintained and improved application modules backed by PostgreSQL.',
      'Worked on data-layer queries supporting operational and reporting screens.',
      'Verified scope of responsibilities to be detailed after disclosure review.',
    ],
    sections: [
      {
        label: '// OVERVIEW',
        title: 'Keeping the data layer healthy',
        body: [
          'This entry covers maintenance work on enterprise modules backed by PostgreSQL. The case study is a draft and will be expanded with verified detail.',
        ],
      },
    ],
    challenges: [
      {
        title: 'Safe evolution',
        body: 'Data-layer changes on a production system demand careful verification: every query improvement must preserve existing behavior.',
      },
    ],
    visual: 'operations',
  },
  {
    slug: 'metaphore-sdtm',
    name: 'Metaphore SDTM',
    category: 'Transport & Missions',
    tagline: 'Transport & mission management',
    description:
      'Transport and mission management within the Metaphore ecosystem. Description and assets will be completed with authorized material only.',
    featured: false,
    professional: true,
    draft: true,
    year: null,
    role: 'Full-Stack Developer',
    stack: ['Vue.js', 'Java', 'Spring Boot', 'PostgreSQL'],
    highlights: ['Mission management', 'Transport operations'],
    responsibilities: [
      'Contributed to transport and mission management features.',
      'Authorized description pending — this entry is intentionally minimal.',
    ],
    sections: [
      {
        label: '// OVERVIEW',
        title: 'Missions, planned and followed',
        body: [
          'Metaphore SDTM covers transport and mission management. This case study is a draft pending authorized descriptions and assets.',
        ],
      },
    ],
    challenges: [
      {
        title: 'Planning under constraints',
        body: 'Mission management combines schedules, resources and operational constraints; the interface keeps plans legible as conditions change.',
      },
    ],
    visual: 'reporting',
  },
]

export const featuredProjects = projects.filter((p) => p.featured)

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export function nextProject(slug: string): Project {
  const index = projects.findIndex((p) => p.slug === slug)
  return projects[(index + 1) % projects.length] ?? projects[0]!
}
