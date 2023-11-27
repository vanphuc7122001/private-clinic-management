import { NavLink } from 'react-router-dom'

const isActiveLink = ({ isActive }: { isActive: any }) => {
  return isActive ? 'nav__item nav__link--active' : 'nav__item'
}

export default function NavHome() {
  //
  return (
    <nav className='nav'>
      <ul className='nav__list'>
        <NavLink to='/' className={isActiveLink}>
          <span className='nav__link'>Trang chủ</span>
        </NavLink>

        <NavLink to='/news' className={isActiveLink}>
          <span className='nav__link'>Tin tức</span>
        </NavLink>
        <NavLink to='/doctors' className={isActiveLink}>
          <span className='nav__link'>Bác sỉ</span>
        </NavLink>
      </ul>
    </nav>
  )
}
