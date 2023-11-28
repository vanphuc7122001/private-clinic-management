import { useMutation, useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import doctorApi from '~/apis/doctor.api'
import { useState, useEffect, useContext, useMemo } from 'react'
import Input from '~/components/Input'
import { AppContext } from '~/contexts/app.context'
import appointmentApi from '~/apis/appointment.api'
import { toast } from 'react-toastify'
import { isAxiosError } from '~/utils/utils'
import HttpStatusCode from '~/constants/httpStatusCodeEnum'

interface DoctorType {
  certification: string
  expricence: string
  education: string
  doctor: {
    id: string
    name: string
    gender: string
    avatar: string
    address: string
    phone: string
    email: string
    date_of_birth: string
  }
}

const initalDoctor: DoctorType = {
  certification: '',
  expricence: '',
  education: '',
  doctor: {
    id: '',
    name: '',
    gender: '',
    avatar: '',
    address: '',
    phone: '',
    email: '',
    date_of_birth: ''
  }
}

export default function DoctorDetail() {
  const { id } = useParams()
  const [data, setData] = useState<DoctorType>(initalDoctor)
  const [date, setDate] = useState<string>('')
  const { isAuthenticated } = useContext(AppContext)
  const doctorDetail = useQuery({
    queryKey: ['doctorDetail'],
    queryFn: () => doctorApi.getDoctorDetail(id)
  })

  useEffect(() => {
    if (doctorDetail.data) {
      setData(doctorDetail.data.data.result)
    }
  }, [doctorDetail.data])

  const createAppointmentMutation = useMutation({
    mutationKey: ['createAppointment'],
    mutationFn: (body: { doctor_id: string; date: string }) => appointmentApi.createAppointmentUser(body),
    onSuccess: (data) => {
      toast.success(data.data.message)
    }
  })

  const errorForm: { date: string } = useMemo(() => {
    const error = createAppointmentMutation.error
    if (
      isAxiosError<{ error: { date: string } }>(error) &&
      error.response?.status === HttpStatusCode.UnprocessableEntity
    ) {
      return (error.response?.data as any).errors
    }

    return null
  }, [createAppointmentMutation])

  const setOnChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    // if (registerMutation.error) {
    //   registerMutation.reset()
    // }
    setDate(event.target.value)
  }

  const handleBooking = () => {
    const object = {
      date: new Date(date).toISOString(),
      doctor_id: data.doctor.id
    }
    createAppointmentMutation.mutate(object)
  }
  return (
    <>
      <div className='my-20 mx-auto flex justify-center gap-32'>
        <div className='text-center'>
          <div className='flex items-center justify-center'>
            <img
              className='w-24 h-24 object-cover border rounded-[50%]'
              src={data.doctor.avatar || 'https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg'}
            />
          </div>
          <p className='mt-3 text-[14px]'>
            <span className='font-bold'>Họ tên:</span> {data.doctor.name}
          </p>
          <p className='text-[14px]'>
            <span className='font-bold'>Email:</span> {data.doctor.email}
          </p>
          <p className='text-[14px]'>
            <span className='font-bold'>Giới tính:</span> {data.doctor.gender}
          </p>
          <p className='text-[14px]'>
            <span className='font-bold'>Giới tính:</span> {data.doctor.phone}
          </p>
          <p className='text-[14px]'>
            <span className='font-bold'>Chứng chỉ:</span> {data.certification}
          </p>
          <p className='text-[14px]'>
            <span className='font-bold'>Kinh nghiệm:</span> {data.expricence}
          </p>
          <p className='text-[14px]'>
            <span className='font-bold'>Tốt nghiệp:</span> {data.education}
          </p>
        </div>
        <form>
          <div className='relative z-0 w-full mb-5 group'>
            <Input id='date' string={'Chọn ngày đặt lịch'} type='date' value={date} setOnChange={setOnChange('date')} />
            {errorForm?.date && (
              <>
                <span className='text-[12px] text-red-500'>{errorForm.date}</span>
              </>
            )}
          </div>
          {isAuthenticated && (
            <button
              type='button'
              onClick={handleBooking}
              className='mt-48 w-full text-white bg-black hover:opacity-75 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2  focus:outline-none '
            >
              Đặt lịch
            </button>
          )}
        </form>
      </div>
    </>
  )
}
