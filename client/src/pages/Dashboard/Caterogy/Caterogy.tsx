import { useMutation, useQuery } from '@tanstack/react-query'
import { useState, useMemo } from 'react'
import caterogyApi from '~/apis/caterogy.api'
import Modal from '~/components/Modal/Modal'
import Search from '~/components/Search'
import HttpStatusCode from '~/constants/httpStatusCodeEnum'
import { isAxiosError } from '~/utils/utils'
import { toast } from 'react-toastify'

export default function Caterogy() {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [name, setName] = useState<string>('')
  const handleCloseModal = () => {
    setIsOpen(false)
  }

  const handleOpenModal = () => {
    setIsOpen(true)
  }

  const createCaterogyMutation = useMutation({
    mutationKey: ['createCaterogy'],
    mutationFn: (name: string) => caterogyApi.createCategory(name),
    onSuccess: (data) => {
      toast.success(data.data.message)
    }
  })

  const errorForm: { name: string } = useMemo(() => {
    const error = createCaterogyMutation.error
    if (
      isAxiosError<{ error: { name: string } }>(error) &&
      error.response?.status === HttpStatusCode.UnprocessableEntity
    ) {
      return (error.response?.data as any).errors
    }

    return null
  }, [createCaterogyMutation])

  const caterogyQuery = useQuery({
    queryKey: ['categories'],
    queryFn: () => caterogyApi.getCaterogies()
  })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    createCaterogyMutation.mutate(name)
  }

  return (
    <>
      <div>
        <Modal isOpen={isOpen} handleCloseModal={handleCloseModal} title='Thêm danh mục bài viết'>
          <form className='max-w-md mx-auto' onSubmit={handleSubmit}>
            <div className='relative z-0 w-full mb-5 group'>
              <input
                type='text'
                name='name'
                id='name'
                className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                placeholder=' '
                required
                onChange={(event) => setName(event.target.value)}
              />
              <label
                htmlFor='name'
                className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
              >
                Tên danh mục
              </label>
              {errorForm?.name && (
                <>
                  <span className='text-[12px] text-red-500'>{errorForm.name}</span>
                </>
              )}
            </div>
            <button
              type='button'
              className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
            >
              Add
            </button>
          </form>
        </Modal>
        <div className='flex justify-between'>
          <Search value='1' />
          <button
            type='button'
            onClick={handleOpenModal}
            className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
          >
            Add
          </button>
        </div>
        <div className='mt-2 relative overflow-x-auto'>
          <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
            <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
              <tr>
                <th scope='col' className='px-6 py-3'>
                  Id
                </th>
                <th scope='col' className='px-6 py-3'>
                  Tên
                </th>
              </tr>
            </thead>
            <tbody>
              {caterogyQuery.data &&
                caterogyQuery.data.data.result.map((element) => (
                  <tr key={element.id} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                    <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                      {element.id}
                    </th>
                    <td className='px-6 py-4'>{element.name}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
