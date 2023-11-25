import { NavLink } from 'react-router-dom'

export default function NavHome() {
  return (
    <nav className='nav'>
      <ul className='nav__list'>
        <li className='nav__item nav__link--active'>
          <NavLink to='/' className='nav__link'>
            Trang chủ
          </NavLink>
        </li>
        <li className='nav__item'>
          <a href='#service' className='nav__link'>
            Dịch vụ
          </a>
        </li>
        <li className='nav__item'>
          <a href='#about' className='nav__link'>
            Tin tức
          </a>
        </li>
        <li className='nav__item'>
          <a href='#doctor' className='nav__link'>
            Bác sỉ
          </a>
        </li>
      </ul>
    </nav>
  )
}
