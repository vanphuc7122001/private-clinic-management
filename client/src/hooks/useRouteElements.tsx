import { useRoutes } from 'react-router-dom'
import DashboardLayout from '~/layouts/DashboardLayout/DashboardLayout'
import Login from '~/pages/Login'
import Signup from '~/pages/Signup'
import CustomerLayOut from '~/layouts/CustomerLayout'
import Home from '~/pages/Customer/Home'
import News from '~/pages/Customer/News'
import Doctor from '~/pages/Customer/Doctor'
import User from '~/pages/Customer/User'
import NotFound from '~/pages/NotFound'

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
    // dashboard layout
    {
      path: '/dashboard',
      element: <DashboardLayout />
    },
    // Customer layout
    {
      path: '/',
      element: <CustomerLayOut />,
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: 'news',
          element: <News />
        },
        {
          path: 'doctors',
          element: <Doctor />
        },
        {
          path: 'users',
          element: <User />
        }
      ]
    },
    {
      path: '*',
      element: <NotFound />
    }
  ])

  return element
}
