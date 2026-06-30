export const routes = {
  home: "/",

  marketing: {
    preconstruction: "/preconstruction",
    coordination: "/coordination",
    fieldOps: "/field-ops",
    reporting: "/reporting",
    pricing: "/pricing",
    api: "/api",
    docs: "/docs",
    blog: "/blog",
    benchmarks: "/benchmarks",
    about: "/about",
    careers: "/careers",
  },

  auth: {
    login: "/login",
    signup: "/signup",
  },

  legal: {
    terms: "/terms",
    privacy: "/privacy",
  },

  app: {
    home: "/app",
    agent: "/agent",
    procurement: "/procurement",
    settings: "/settings",
    dashboard: "/dashboard",
  },

  projects: {
    list: "/projects",
    new: "/projects/new",
    detail: (slug: string) => `/projects/${slug}`,
    edit: (slug: string) => `/projects/${slug}/edit`,
  },

  api: {
    chat: "/api/chat",
    trpc: "/api/trpc",
  },
} as const;

export const authRoutePaths = [routes.auth.login, routes.auth.signup] as const;

export const protectedRoutePrefixes = [
  routes.app.home,
  routes.app.agent,
  routes.projects.list,
  routes.app.settings,
  routes.app.procurement,
  routes.app.dashboard,
  routes.api.chat,
] as const;
