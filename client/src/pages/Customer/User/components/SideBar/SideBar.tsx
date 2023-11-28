import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import authApi from '~/apis/auth.api'
import { clearLS, getRefreshTokenFromLS } from '~/utils/auth'

export default function SideBar(props: { email: string; avatar: string; name: string }) {
  const { avatar, email, name } = props
  const logoutMutation = useMutation({
    mutationKey: ['logout'],
    mutationFn: (refresh_token: string) => authApi.logout({ refresh_token }),
    onSettled(data, error) {
      if (data) {
        toast.success('Logged out')
        clearLS()
      }
      if (error) {
        console.log(error)
      }
    }
  })

  const handleLogout = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault()
    logoutMutation.mutate(getRefreshTokenFromLS())
  }
  return (
    <div className='text-center'>
      <div className='flex items-center justify-center'>
        <img
          className='w-24 h-24 object-cover border rounded-[50%]'
          src={avatar || 'https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg'}
          alt=''
        />
      </div>
      <p className='mt-3 text-[14px]'>
        <span className='font-bold'>Họ tên:</span> {name}
      </p>
      <p className='text-[14px]'>
        <span className='font-bold'>Email:</span> {email}
      </p>
      <button
        type='button'
        onClick={handleLogout}
        className='mt-48 w-full text-white bg-black hover:opacity-75 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2  focus:outline-none '
      >
        Đăng xuất
      </button>
    </div>
  )
}
