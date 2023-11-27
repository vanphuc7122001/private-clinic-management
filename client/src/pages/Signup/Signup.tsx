import { Link, useNavigate } from 'react-router-dom'
import { useState, useMemo } from 'react'
import config from '~/constants/config'
import Input from './components/Input'
import { useMutation } from '@tanstack/react-query'
import authApi from '~/apis/auth.api'
import { RegisterReqBody } from '~/types/auth.type'
import { isAxiosError } from '~/utils/utils'
import HttpStatusCode from '~/constants/httpStatusCodeEnum'
import { toast } from 'react-toastify'
import { getRolesFromAccessToken } from '~/utils/auth'

type FormType = RegisterReqBody

const gender = {
  other: 'other',
  male: 'male',
  female: 'female'
}

const initalFormState: FormType = {
  email: '',
  password: '',
  address: '',
  confirm_password: '',
  name: '',
  phone: '',
  date_of_birth: '',
  role_id: config.patientId,
  gender: gender.other
}

type FormError =
  | {
      [key in keyof FormType]: string
    }
  | null

export default function Signup() {
  const [formState, setFormState] = useState<FormType>(initalFormState)
  const navigate = useNavigate()

  const registerMutation = useMutation({
    mutationKey: ['register'],
    mutationFn: (body: FormType) => authApi.register(body),
    onSettled(data, error) {
      if (data) {
        toast.success(data.data.message)
        const role = getRolesFromAccessToken(data.data.result.access_token)
        if (role !== 'patient') {
          navigate('/dashboard')
        } else {
          navigate('/')
        }
      }
      if (error) {
        toast.error('Failed to register')
      }
    }
  })

  const errorForm: FormError = useMemo(() => {
    const error = registerMutation.error
    if (isAxiosError<{ error: FormError }>(error) && error.response?.status === HttpStatusCode.UnprocessableEntity) {
      return (error.response?.data as any).errors
    }

    return null
  }, [registerMutation])

  const setOnChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    if (registerMutation.error) {
      registerMutation.reset()
    }
    setFormState((prev) => ({
      ...prev,
      [name]: event.target.value
    }))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    registerMutation.mutate(formState)
  }

  return (
    <>
      <section className='bg-gray-50'>
        <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
          <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 min-h-[400px] sm:max-w-lg xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
            <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
              <h1 className='text-2xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
                Đăng ký
              </h1>
              <form className='max-w-lg mx-auto' onSubmit={handleSubmit}>
                <div className='relative z-0 w-full mb-7 group'>
                  <Input
                    id='email'
                    setOnChange={setOnChange('email')}
                    string='Email'
                    type='email'
                    value={formState.email}
                  />
                  {errorForm?.email && (
                    <>
                      <span className='text-[12px] text-red-500'>{errorForm.email}</span>
                    </>
                  )}
                </div>
                <div className='relative z-0 w-full mb-5 group'>
                  <Input
                    id=''
                    string={'Mật khẩu'}
                    type='password'
                    value={formState.password}
                    setOnChange={setOnChange('password')}
                  />
                  {errorForm?.password && (
                    <>
                      <span className='text-[12px] text-red-500'>{errorForm.password}</span>
                    </>
                  )}
                </div>
                <div className='relative z-0 w-full mb-5 group'>
                  <Input
                    id='password'
                    string={'Xác nhận mật khẩu'}
                    type='password'
                    value={formState.confirm_password}
                    setOnChange={setOnChange('confirm_password')}
                  />
                  {errorForm?.confirm_password && (
                    <>
                      <span className='text-[12px] text-red-500'>{errorForm.confirm_password}</span>
                    </>
                  )}
                </div>

                <div className='relative z-0 w-full mb-5 group'>
                  <Input
                    id='name'
                    string={'Họ tên'}
                    type='name'
                    value={formState.name}
                    setOnChange={setOnChange('name')}
                  />
                  {errorForm?.name && (
                    <>
                      <span className='text-[12px] text-red-500'>{errorForm.name}</span>
                    </>
                  )}
                </div>

                <div className='grid md:grid-cols-2 md:gap-6'>
                  <div className='relative z-0 w-full mb-5 group'>
                    <Input
                      id='phone'
                      string={'Số điện thoại'}
                      type='tel'
                      value={formState.phone}
                      setOnChange={setOnChange('phone')}
                    />
                    {errorForm?.phone && (
                      <>
                        <span className='text-[12px] text-red-500'>{errorForm.phone}</span>
                      </>
                    )}
                  </div>
                  <div className='relative z-0 w-full mb-5 group'>
                    <Input
                      id='address'
                      string={'Địa chỉ'}
                      type='text'
                      value={formState.address}
                      setOnChange={setOnChange('address')}
                    />
                    {errorForm?.address && (
                      <>
                        <span className='text-[12px] text-red-500'>{errorForm.address}</span>
                      </>
                    )}
                  </div>

                  <div className='relative z-0 w-full mb-5 group'>
                    <Input
                      id='date'
                      string={'Ngày sinh'}
                      type='date'
                      value={formState.date_of_birth}
                      setOnChange={setOnChange('date_of_birth')}
                    />
                    {errorForm?.date_of_birth && (
                      <>
                        <span className='text-[12px] text-red-500'>{errorForm.date_of_birth}</span>
                      </>
                    )}
                  </div>
                </div>
                <button
                  type='submit'
                  className=' flex  items-center justify-center w-full bg-black text-white  hover:opacity-80 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
                >
                  {registerMutation.isPending ? (
                    <>
                      <svg
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
                      </svg>
                    </>
                  ) : (
                    'Đăng ký'
                  )}
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
