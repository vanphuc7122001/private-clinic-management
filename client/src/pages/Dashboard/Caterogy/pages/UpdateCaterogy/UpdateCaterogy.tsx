import { useMutation, useQuery } from '@tanstack/react-query'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import caterogyApi from '~/apis/caterogy.api'

export default function UpdateCaterogy() {
  const { id } = useParams()
  const [name, setName] = useState<string>('')
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    updateMutation.mutate()
  }

  const getCaterogyQuery = useQuery({
    queryKey: ['getCaterogyQuery'],
    queryFn: () => caterogyApi.getCaterogy(id as string)
  })

  const updateMutation = useMutation({
    mutationFn: () => caterogyApi.updateCategory({ id: id as string, name }),
    onSuccess: (data) => {
      toast.success(data.data.message)
    }
  })

  useEffect(() => {
    if (getCaterogyQuery.data) {
      setName(getCaterogyQuery.data.data.result.name)
    }
  }, [getCaterogyQuery.data])

  return (
    <div>
      <h2 className='text-center font-bold text-[24px]'>Sửa</h2>
      <form className='max-w-md mx-auto' onSubmit={handleSubmit}>
        <div className='relative z-0 w-full mb-5 group'>
          <input
            type='text'
            name='name'
            id='name'
            className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
            placeholder=' '
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <label
            htmlFor='name'
            className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
          >
            Tên danh mục
          </label>
        </div>
        <button
          type='submit'
          className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
        >
          Sửa
        </button>
      </form>
    </div>
  )
}
