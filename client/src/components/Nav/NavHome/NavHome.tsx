import { NavLink } from 'react-router-dom'
import { isActiveLink } from '~/utils/utils'

const isActive = isActiveLink({ active: 'nav__item nav__link--active', notActive: 'nav__item' })

export default function NavHome() {
  const linkArray = [
    {
      path: '/',
      name: 'Trang chủ'
    },
    {
      path: '/news',
      name: 'Tin tức'
    },
    {
      path: '/doctors',
      name: 'Bác sỉ'
    }
  ]
  return (
    <nav className='nav'>
      <ul className='nav__list'>
        {linkArray.map((element, index) => (
          <NavLink key={index} to={element.path} className={isActive}>
            <span className='nav__link'>{element.name}</span>
          </NavLink>
        ))}
      </ul>
    </nav>
  )
}
