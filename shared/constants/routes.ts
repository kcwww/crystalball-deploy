export const ROUTES = {
  LANDING: '/',
  MAIN: '/main',
  MAKE: '/make',
  VISIT_USER: (id: string) => `/visit/${id}`,
  MESSAGE: (id: string, crystal: string) => `/visit/${id}/${crystal}`,
  ERROR: '/404',
} as const;

export const BACKEND_ROUTES = {
  NICKNAME: '/api/user/nickname',
  CRYSTAL: '/api/crystal',
  VISIT_CRYSTAL: '/api/visit/crystal',
  VISIT_MESSAGES: '/api/visit/messages',
  MESSAGE: '/api/crystal/message',
  MESSAGES: '/api/crystal/messages',
  ALL_MESSAGES: '/api/user/messages',
  SIGNOUT: '/api/auth/logout',
  VISIT_USER: (id: string) => `/api/user/${id}`,
} as const;

export const REVALIDATE_PATHS = {
  MAIN: '/main',
  MAKE: '/make',
  VISIT: '/visit/[userId]',
  NICKNAME: '/nickname',
} as const;
