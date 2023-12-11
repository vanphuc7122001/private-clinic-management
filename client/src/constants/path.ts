export const pathApi = {
  user: 'users/',
  doctor: 'doctors/',
  new: 'news/',
  appointment: 'appointments/',
  caterogy: 'caterogies/'
} as const

export const pathRoute = {
  login: '/login',
  signup: '/signup',
  home: '/',
  news: '/news',
  doctor: '/doctors',
  newsDetail: '/news/:id',
  doctorDetail: '/doctors/:id',
  user: '/users'
} as const
