import { useRoutes } from 'react-router-dom'
import Login from '~/pages/Login/Login'

export default function useRouteElements() {
  const element = useRoutes([
    {
      path: '/login',
      element: <Login />
    }
  ])

  return element
}
