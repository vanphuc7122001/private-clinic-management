import { Link } from 'react-router-dom'

export default function Login() {
  return (
    <>
      <section className='bg-gray-50 dark:bg-gray-900'>
        <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
          <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
            <div className='p-6 space-y-4 space-y-6 sm:p-8'>
              <h1 className='text-[20px] text-center font-bold leading-tight tracking-tight text-gray-900'>
                Đăng nhập
              </h1>
              <form className='space-y-4 md:space-y-6'>
                <div>
                  <label htmlFor='email' className='block mb-2 text-[14px] font-medium text-gray-900'>
                    Tài khoản
                  </label>
                  <input
                    type='email'
                    name='email'
                    id='email'
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-[12px] rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 '
                    placeholder='name@company.com'
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor='password'
                    className='block mb-2 text-[14px] font-medium text-gray-900 dark:text-white'
                  >
                    Mật khẩu
                  </label>
                  <input
                    type='password'
                    name='password'
                    id='password'
                    placeholder='••••••••'
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-[12px] rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 '
                    required
                  />
                </div>
                <div className='flex items-center justify-between'>
                  <div className='flex items-start'>
                    <div className='flex items-center h-5'>
                      <input
                        id='remember'
                        aria-describedby='remember'
                        type='checkbox'
                        className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 '
                        required
                      />
                    </div>
                    <div className='ml-3 text-sm'>
                      <label htmlFor='remember' className='text-gray-500 dark:text-gray-300'>
                        Ghi nhớ
                      </label>
                    </div>
                  </div>
                  <a href='#' className='text-sm font-medium text-primary-600 hover:underline dark:text-primary-500'>
                    Quên mật khẩu?
                  </a>
                </div>
                <button
                  type='submit'
                  className='w-full bg-black text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
                >
                  Đăng nhập
                </button>
              </form>
              <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
                Bạn không có tài khoản?{' '}
                <Link to='/signup' className='font-medium text-primary-600 hover:underline dark:text-primary-500'>
                  Đăng ký
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
