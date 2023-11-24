import { Link } from 'react-router-dom'

export default function Signup() {
  return (
    <>
      <section className='bg-gray-50 dark:bg-gray-900'>
        <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
          <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
            <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
              <h1 className='text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
                Đăng ký
              </h1>
              <form className='max-w-md mx-auto'>
                <div className='relative z-0 w-full mb-5 group'>
                  <input
                    type='email'
                    name='floating_email'
                    id='floating_email'
                    className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                    placeholder=' '
                    required
                  />
                  <label
                    htmlFor='floating_email'
                    className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
                  >
                    Email
                  </label>
                </div>
                <div className='relative z-0 w-full mb-5 group'>
                  <input
                    type='password'
                    name='floating_password'
                    id='floating_password'
                    className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                    placeholder=' '
                    required
                  />
                  <label
                    htmlFor='floating_password'
                    className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
                  >
                    Mật khẩu
                  </label>
                </div>
                <div className='relative z-0 w-full mb-5 group'>
                  <input
                    type='password'
                    name='repeat_password'
                    id='floating_repeat_password'
                    className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                    placeholder=' '
                    required
                  />
                  <label
                    htmlFor='floating_repeat_password'
                    className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
                  >
                    Xác nhận mật khẩu
                  </label>
                </div>

                <div className='relative z-0 w-full mb-5 group'>
                  <input
                    type='text'
                    name='floating_name'
                    id='floating_name'
                    className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                    placeholder=' '
                    required
                  />
                  <label
                    htmlFor='floating_name'
                    className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
                  >
                    Họ tên
                  </label>
                </div>

                <div className='grid md:grid-cols-2 md:gap-6'>
                  <div className='relative z-0 w-full mb-5 group'>
                    <input
                      type='tel'
                      pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
                      name='floating_phone'
                      id='floating_phone'
                      className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                      placeholder=' '
                      required
                    />
                    <label
                      htmlFor='floating_phone'
                      className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
                    >
                      SDT
                    </label>
                  </div>
                  <div className='relative z-0 w-full mb-5 group'>
                    <input
                      type='text'
                      name='floating_company'
                      id='floating_company'
                      className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                      placeholder=' '
                      required
                    />
                    <label
                      htmlFor='floating_company'
                      className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
                    >
                      Địa chỉ
                    </label>
                  </div>

                  <div className='relative z-0 w-full mb-5 group'>
                    <input
                      type='date'
                      name='floating_company'
                      id='floating_company'
                      className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                      placeholder=' '
                      required
                    />
                    <label
                      htmlFor='floating_company'
                      className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
                    >
                      Ngày sinh
                    </label>
                  </div>
                </div>
                <button
                  type='submit'
                  className='w-full bg-black text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
                >
                  Đăng ký
                </button>
              </form>
              <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
                Bạn đã có tài khoản?{' '}
                <Link to='/login' className='font-medium text-primary-600 hover:underline dark:text-primary-500'>
                  Đăng nhập
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
