import { Outlet, useNavigate } from 'react-router-dom'
import NavDashboard from '~/components/Nav/NavDashboard'
import Sidebar from '~/components/Sidebar/Sidebar'
import { getAccessTokenFromLS, getRolesFromAccessToken } from '~/utils/auth'
import { useEffect } from 'react'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate()
  const role = getRolesFromAccessToken(getAccessTokenFromLS())
  useEffect(() => {
    if ((role === 'patient' && !role) || role === null) {
      navigate('/')
    }
  }, [role, navigate])

  return (
    <div>
      <NavDashboard />
      <Sidebar />
      <div className='p-4 sm:ml-64'>
        <div className='p-4 border-2 border-gray-200  rounded-lg dark:border-gray-700 mt-14'>{children}</div>
      </div>
    </div>
  )
}
