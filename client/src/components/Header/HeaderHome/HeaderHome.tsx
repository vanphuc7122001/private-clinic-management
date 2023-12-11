import { Link } from 'react-router-dom'
import Logo from '~/components/Logo/Logo'
import NavHome from '~/components/Nav/NavHome'
import { AppContext } from '~/contexts/app.context'
import { useContext } from 'react'
import { FaRegCircleUser } from 'react-icons/fa6'

export default function HeaderHome() {
  const { isAuthenticated } = useContext(AppContext)
  return (
    <>
      <header className='header fixed'>
        <div className='container-app'>
          {/* Header */}
          <div className='header-top'>
            {/* Logo */}
            <Logo />
            {/* Nav */}
            <NavHome />
            {/* Action */}
            <div className='action'>
              {!isAuthenticated && (
                <>
                  <Link to='/login' className='action__login'>
                    Đăng nhập
                  </Link>
                  <Link to='/signup' className='btn action__signup'>
                    Đăng ký
                  </Link>
                </>
              )}
              {isAuthenticated && (
                <Link to={'/users'} className='text-white mr-[210px] flex items-center'>
                  <FaRegCircleUser />
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
