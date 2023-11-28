import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import userApi from '~/apis/user.api'
import Input from '~/components/Input'
import InputFile from '~/components/InputFile'
import { Gender } from '~/constants/enums'
import { SuccessResponse } from '~/types/utils.type'
import http from '~/utils/http'

type FormType = {
  name: string
  email: string
  phone: string
  address: string
  gender: string
  date_of_birth: string
  avatar?: string
}

const initalForState: FormType = {
  name: '',
  email: '',
  phone: '',
  address: '',
  gender: Gender.male,
  date_of_birth: ''
}

export default function Profile() {
  const [formData, setFormData] = useState<FormType>(initalForState)
  const [file, setFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const userQuery = useQuery({
    queryKey: ['profile'],
    queryFn: () => userApi.getMe()
  })

  const updateMutation = useMutation({
    mutationKey: ['update'],
    mutationFn: (body: FormType) => userApi.updateMe(body),
    onSettled(data, error) {
      if (data) {
        console.log(data)
        toast.success(data.data.message)
      }
      if (error) {
        console.log(error)
        toast.error(error.message)
      }
    }
  })

  useEffect(() => {
    if (userQuery.data) {
      const payload = userQuery.data.data.result
      const date = payload.date_of_birth.split('T')[0]
      const _payload = { ...payload, date_of_birth: date }
      setFormData(_payload)
    }
  }, [userQuery.data])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files as FileList
    if (file && file.length > 0) {
      setFile(file[0])
      const previewURL = URL.createObjectURL(file[0])
      setImagePreview(previewURL)
    }
  }

  const setOnChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [name]: event.target.value }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    event.preventDefault()
    const formImage = new FormData()
    formImage.append('images', file as File)
    if (file) {
      const res = await http.post<SuccessResponse<{ url: string }>>('/medias/uploads/image', formImage, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      const avatar = res.data.result.url
      if (avatar) {
        return updateMutation.mutate({ ...formData, avatar })
      }
    } else {
      return updateMutation.mutate(formData)
    }
  }
  return (
    <>
      <h2 className='text-[30px] font-bold mt-7 mb-3'>Hồ sơ</h2>
      <form className='max-w-md mx-auto' onSubmit={handleSubmit}>
        <div className='relative z-0 w-full mb-5 group'>
          <Input id='name' setOnChange={setOnChange('name')} string='Họ tên' type='text' value={formData.name} />
        </div>

        <div className='relative z-0 w-full mb-5 group'>
          <Input id='phone' setOnChange={setOnChange('phone')} string='Sdt' type='tel' value={formData.phone} />
        </div>
        <div className='relative z-0 w-full mb-5 group'>
          <Input
            disabled={true}
            id='email'
            setOnChange={setOnChange('email')}
            string='Email'
            type='email'
            value={formData.email}
          />
        </div>
        <div className='relative z-0 w-full mb-5 group'>
          <Input
            id='address'
            setOnChange={setOnChange('address')}
            string='Địa chỉ'
            type='text'
            value={formData.address}
          />
        </div>
        <div className='relative z-0 w-full mb-5 group'>
          <Input
            id='date'
            setOnChange={setOnChange('date_of_birth')}
            string='Ngày sinh'
            type='date'
            value={formData.date_of_birth}
          />
        </div>
        <div className='relative z-0 w-full mb-5 group'>
          <label htmlFor='gender' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
            Chọn giới tính
          </label>
          <select
            id='gender'
            value={formData.gender}
            onChange={setOnChange('gender')}
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          >
            <option value={Gender.other}>Other</option>
            <option value={Gender.male}>Male</option>
            <option value={Gender.female}>Female</option>
          </select>
        </div>

        {imagePreview && (
          <>
            <img src={imagePreview} alt='' className='w-[100px] h-[100px] object-cover rounded-[50%]' />
          </>
        )}
        <InputFile string='Upload file' handleFileChange={handleFileChange} />
        <button
          type='submit'
          className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
        >
          {updateMutation.isPending ? (
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
            'Cập nhật hồ sơ'
          )}
        </button>
      </form>
    </>
  )
}
