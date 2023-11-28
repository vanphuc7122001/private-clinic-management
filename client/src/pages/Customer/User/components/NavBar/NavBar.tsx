import { NavLink } from 'react-router-dom'

export default function NavBar() {
  const linkArray = [
    {
      path: '/users/history',
      name: 'Lịch sử khám'
    },
    {
      path: '/users',
      name: 'Hồ sơ'
    },
    {
      path: '/users/change-password',
      name: 'Đổi mật khẩu'
    }
  ]
  return (
    <div>
      {linkArray.map((element, index) => (
        <NavLink
          key={index}
          to={element.path}
          className=' text-blue-500  border border-blue-700  hover:opacity-75 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2  focus:outline-none '
        >
          {element.name}
        </NavLink>
      ))}
    </div>
  )
}
