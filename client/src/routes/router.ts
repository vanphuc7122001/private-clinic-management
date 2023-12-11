import { pathRoute } from '~/constants/path'
import DashboardLayout from '~/layouts/DashboardLayout/DashboardLayout'
import Doctor from '~/pages/Customer/Doctor'
import DoctorDetail from '~/pages/Customer/Doctor/pages/DoctorDetail'
import Home from '~/pages/Customer/Home'
import News from '~/pages/Customer/News'
import NewsDetail from '~/pages/Customer/News/pages/NewsDetail'
import User from '~/pages/Customer/User/User'
import DashBoard from '~/pages/Dashboard'
import Appointment from '~/pages/Dashboard/Appointment'
import Caterogy from '~/pages/Dashboard/Caterogy'
import Login from '~/pages/Login'
import Signup from '~/pages/Signup'

export const publicRoutes = [
  {
    path: pathRoute.login,
    component: Login,
    layout: null
  },
  {
    path: pathRoute.signup,
    component: Signup,
    layout: null
  },
  // client routes
  {
    path: pathRoute.home,
    component: Home
  },
  {
    path: pathRoute.news,
    component: News
  },
  {
    path: pathRoute.newsDetail,
    component: NewsDetail
  },
  {
    path: pathRoute.doctor,
    component: Doctor
  },
  {
    path: pathRoute.doctorDetail,
    component: DoctorDetail
  },
  {
    path: '/users',
    component: User
  },
  // dashboard routes
  {
    path: '/dashboard',
    component: DashBoard,
    layout: DashboardLayout
  },
  {
    path: '/dashboard/appointments',
    component: Appointment,
    layout: DashboardLayout
  },
  {
    path: '/dashboard/category',
    component: Caterogy,
    layout: DashboardLayout
  },
  {
    path: '/dashboard/news',
    component: Caterogy,
    layout: DashboardLayout
  },
  {
    path: '/dashboard/services',
    component: Caterogy,
    layout: DashboardLayout
  }
]
