import { useMutation } from '@tanstack/react-query'
import { useState, useMemo } from 'react'
import userApi from '~/apis/user.api'
import Input from '~/components/Input'
import HttpStatusCode from '~/constants/httpStatusCodeEnum'
import { ChangePasswordReqBody } from '~/types/user.type'
import { isAxiosError } from '~/utils/utils'
import { toast } from 'react-toastify'

type FormType = ChangePasswordReqBody

const initalForState: FormType = {
  old_password: '',
  new_password: '',
  confirm_password: ''
}

type FormError =
  | {
      [key in keyof FormType]: string
    }
  | null

export default function ChangePassword() {
  const [formData, setFormData] = useState<FormType>(initalForState)

  const changePassMutation = useMutation({
    mutationKey: ['changePassword'],
    mutationFn: (body: FormType) => userApi.changePassword(body),
    onSettled(data, error) {
      if (data) {
        toast.success(data.data.message)
      }
    }
  })

  const setOnChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [name]: event.target.value
    }))
  }

  const errorForm: FormError = useMemo(() => {
    const error = changePassMutation.error
    if (isAxiosError<{ error: FormError }>(error) && error.response?.status === HttpStatusCode.UnprocessableEntity) {
      return (error.response?.data as any).errors
    }

    return null
  }, [changePassMutation])

  const handleChangePassword = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    changePassMutation.mutate(formData)
  }
  return (
    <>
      <div>
        <h2 className='text-[30px] font-bold mt-7 mb-3'>Đổi mật khẩu</h2>

        <form className='max-w-md mx-auto' onSubmit={handleChangePassword}>
          <div className='relative z-0 w-full mb-5 group'>
            <Input
              setOnChange={setOnChange('old_password')}
              id='old_password'
              string='Mật khẩu củ'
              type='password'
              value={formData.old_password}
            />
            {errorForm?.old_password && (
              <>
                <span className='text-[12px] text-red-500'>{errorForm.old_password}</span>
              </>
            )}
          </div>
          <div className='relative z-0 w-full mb-5 group'>
            <Input
              setOnChange={setOnChange('new_password')}
              id='new_password'
              string='Mật khẩu mới'
              type='password'
              value={formData.new_password}
            />
            {errorForm?.new_password && (
              <>
                <span className='text-[12px] text-red-500'>{errorForm.new_password}</span>
              </>
            )}
          </div>
          <div className='relative z-0 w-full mb-5 group'>
            <Input
              setOnChange={setOnChange('confirm_password')}
              id='confirm_password'
              string='Xác nhận mật khẩu mới'
              type='password'
              value={formData.confirm_password}
            />
            {errorForm?.confirm_password && (
              <>
                <span className='text-[12px] text-red-500'>{errorForm.confirm_password}</span>
              </>
            )}
          </div>

          <button
            type='submit'
            className=' flex  items-center justify-center w-full bg-black text-white  hover:opacity-80 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
          >
            {changePassMutation.isPending ? (
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
              'Đổi mật khẩu'
            )}
          </button>
        </form>
      </div>
    </>
  )
}
