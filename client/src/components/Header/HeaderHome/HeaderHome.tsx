import { Link } from 'react-router-dom'
import Logo from '~/components/Logo/Logo'
import NavHome from '~/components/Nav/NavHome'

export default function HeaderHome() {
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
              <Link to='/login' className='action__login'>
                Đăng nhập
              </Link>
              <Link to='/signup' className='btn action__signup'>
                Đăng ký
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
