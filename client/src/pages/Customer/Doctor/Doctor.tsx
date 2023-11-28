import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import doctorApi from '~/apis/doctor.api'
import useQueryString from '~/hooks/useQueryString'
import { useState } from 'react'

const LIMIT = 10

export default function Doctor() {
  const queryString: { page?: string } = useQueryString()

  const page = Number(queryString.page) || 1

  const [limit, setLimit] = useState(LIMIT)

  const doctorsQuery = useQuery({
    queryKey: ['doctors', page],
    queryFn: () => doctorApi.getDoctors({ page: page, limit: LIMIT })
  })

  const totalRecord = doctorsQuery.data?.data.result.total_record

  const handleMore = () => {
    const limitMore = limit + LIMIT
    setLimit(limitMore)
  }

  return (
    <div>
      <div className='container-app my-20'>
        <div className='member__list gap-5'>
          {doctorsQuery.data?.data.result.doctors.map((item) => (
            <Link to={`/doctors/${item.doctor_id}`}>
              <section className='member-item '>
                <figure className='member-item__img'>
                  <img
                    className='member-item__thumb'
                    src={item.doctor.avatar || 'https://cancermiraj.com/wp-content/uploads/2018/02/img-doctor.png'}
                  />
                </figure>
                <h3 className='member-item__name'>{item.doctor.name}</h3>
                <p className='desc member-item__title'>{item.education}</p>
              </section>
            </Link>
          ))}
        </div>
        <div className='member__btn'>
          {limit < page * (totalRecord || 1) && (
            <>
              <button onClick={handleMore} className='btn'>
                Xem thêm
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
