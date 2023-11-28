import { Link } from 'react-router-dom'
import Logo from '~/components/Logo/Logo'

export default function NavDashboard() {
  return (
    <nav className='fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700'>
      <div className='px-3 py-3 lg:px-5 lg:pl-3'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center justify-start rtl:justify-end'>
            <Link to='/' className='flex ms-2 md:me-24 text-neutral-700'>
              <Logo />
              <span className='self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white'>
                shine smile
              </span>
            </Link>
          </div>
          <div className='flex items-center'>
            <div className='flex items-center ms-3'>
              <div>
                <button
                  type='button'
                  className='flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600'
                  aria-expanded='false'
                  data-dropdown-toggle='dropdown-user'
                >
                  <span className='sr-only'>Open user menu</span>
                  <img
                    className='w-8 h-8 rounded-full'
                    src='https://flowbite.com/docs/images/people/profile-picture-5.jpg'
                    alt='user photo'
                  />
                </button>
              </div>
              <div
                className='z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600'
                id='dropdown-user'
              ></div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
