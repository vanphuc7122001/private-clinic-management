import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import authApi from '~/apis/auth.api'
import { getRolesFromAccessToken } from '~/utils/auth'

type FormState = {
  email: string
  password: string
}

const initalFormState: FormState = {
  email: '',
  password: ''
}

export default function Login() {
  const [formData, setFormData] = useState<FormState>(initalFormState)
  const navigate = useNavigate()

  const loginMutation = useMutation({
    mutationKey: ['login'],
    mutationFn: (body: FormState) => authApi.login(body),
    onSettled(data, error) {
      if (data) {
        const role = getRolesFromAccessToken(data.data.result.access_token)
        if (role !== 'patient') {
          navigate('/dashboard')
        } else {
          navigate('/')
        }
        location.reload()
      }
    }
  })

  const setOnChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [name]: event.target.value }))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    loginMutation.mutate(formData)
  }

  return (
    <>
      <section className='bg-gray-50 dark:bg-gray-900'>
        <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
          <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
            <div className='p-6 sm:p-8'>
              <h1 className='text-[20px] text-center font-bold leading-tight tracking-tight text-gray-900'>
                Đăng nhập
              </h1>
              <form className='space-y-4 md:space-y-6' onSubmit={handleSubmit}>
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
                    onChange={setOnChange('email')}
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
                    onChange={setOnChange('password')}
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
                  className='w-full bg-black text-white  hover:opacity-75 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
                >
                  Đăng nhập
                  {/* <svg
                        aria-hidden='true'
                        className='w-4 h-4 me-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600'
                        viewBox='0 0 100 101'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                          fill='currentColor'
                        />
                        <path
                          d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                          fill='currentFill'
                        />
                      </svg> */}
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
