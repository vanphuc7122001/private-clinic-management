import { useNavigate } from 'react-router-dom'
import NavBar from './components/NavBar'
import SideBar from './components/SideBar'
import { useContext, useEffect, useState } from 'react'
import { AppContext } from '~/contexts/app.context'
import userApi from '~/apis/user.api'
import { useQuery } from '@tanstack/react-query'
import History from './pages/History'
import Profile from './pages/Profile'
import ChangePassword from './pages/ChangePassword'

export default function User() {
  const { isAuthenticated } = useContext(AppContext)
  const navigate = useNavigate()
  const [profile, setProfile] = useState<{ avatar: string; email: string; name: string }>({
    avatar: '',
    email: '',
    name: ' '
  })
  const [active, setActive] = useState<number>(1)

  const linkArray = [
    {
      id: 1,
      name: 'Lịch sử khám'
    },
    {
      id: 2,
      name: 'Hồ sơ'
    },
    {
      id: 3,
      name: 'Đổi mật khẩu'
    }
  ]

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
        <NavBar linkArray={linkArray} setActive={setActive} active={active} />
        <div>
          {active === 1 && <History />}
          {active === 2 && <Profile />}
          {active === 3 && <ChangePassword />}
        </div>
      </div>
    </div>
  )
}
