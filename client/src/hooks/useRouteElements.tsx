import { useRoutes } from 'react-router-dom'
import DashboardLayout from '~/layouts/DashboardLayout/DashboardLayout'
import Login from '~/pages/Login'
import Signup from '~/pages/Signup'
import CustomerLayOut from '~/layouts/CustomerLayout'
import Home from '~/pages/Customer/Home'
import News from '~/pages/Customer/News'
import Doctor from '~/pages/Customer/Doctor'
import NotFound from '~/pages/NotFound'
import UserLayout from '~/pages/Customer/User/layouts/UserLayout/UserLayout'
import Profile from '~/pages/Customer/User/pages/Profile'
import History from '~/pages/Customer/User/pages/History'
import ChangePassword from '~/pages/Customer/User/pages/ChangePassword'
import DoctorDetail from '~/pages/Customer/Doctor/pages/DoctorDetail'
import NewsDetail from '~/pages/Customer/News/pages/NewsDetail'
import Caterogy from '~/pages/Dashboard/Caterogy'
import UpdateCaterogy from '~/pages/Dashboard/Caterogy/pages/UpdateCaterogy'
import Appointment from '~/pages/Dashboard/Appointment'

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
      element: <DashboardLayout />,
      children: [
        {
          path: '',
          element: <Appointment />
        },
        {
          path: 'category',
          element: <Caterogy />
        },
        {
          path: 'category/:id',
          element: <UpdateCaterogy />
        },
        {
          path: 'news',
          element: <News />
        }
      ]
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
          path: 'news/:id',
          element: <NewsDetail />
        },
        {
          path: 'doctors',
          element: <Doctor />
        },
        {
          path: 'doctors/:id',
          element: <DoctorDetail />
        },
        {
          path: 'users',
          element: <UserLayout />,
          children: [
            {
              path: '',
              element: <Profile />
            },
            {
              path: 'history',
              element: <History />
            },
            {
              path: 'change-password',
              element: <ChangePassword />
            }
          ]
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
