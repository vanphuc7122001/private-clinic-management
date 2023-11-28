import { Outlet, useNavigate } from 'react-router-dom'
import NavBar from '../../components/NavBar'
import SideBar from '../../components/SideBar'
import { useContext, useEffect, useState } from 'react'
import { AppContext } from '~/contexts/app.context'
import userApi from '~/apis/user.api'
import { useQuery } from '@tanstack/react-query'

export default function UserLayout() {
  const { isAuthenticated } = useContext(AppContext)
  const navigate = useNavigate()
  const [profile, setProfile] = useState<{ avatar: string; email: string; name: string }>({
    avatar: '',
    email: '',
    name: ' '
  })

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated, navigate])

  const userQuery = useQuery({
    queryKey: ['profile'],
    queryFn: () => userApi.getMe()
  })

  useEffect(() => {
    if (userQuery.data) {
      const avatar = userQuery.data.data.result.avatar
      const email = userQuery.data.data.result.email
      const name = userQuery.data.data.result.name
      const object = {
        avatar,
        email,
        name
      }
      setProfile(object)
    }
  }, [userQuery.data])
  return (
    <div className='my-20 mx-auto flex justify-center gap-32'>
      <SideBar {...profile} />
      <div className='mt-2'>
        <NavBar />
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
