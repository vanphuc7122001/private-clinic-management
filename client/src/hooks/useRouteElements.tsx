import { useRoutes } from 'react-router-dom'
import DashboardLayout from '~/layouts/DashboardLayout/DashboardLayout'
import HomeLayout from '~/layouts/HomeLayouts'
import Login from '~/pages/Login'
import Signup from '~/pages/Signup'

export default function useRouteElements() {
  const element = useRoutes([
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/signup',
      element: <Signup />
    },
    {
      path: '/dashboard',
      element: <DashboardLayout />
    },
    {
      path: '/',
      element: <HomeLayout />
    }
  ])

  return element
}
