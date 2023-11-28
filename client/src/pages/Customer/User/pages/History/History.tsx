import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import appointmentApi from '~/apis/appointment.api'
import useQueryString from '~/hooks/useQueryString'

const LIMIT = 1

export default function History() {
  const queryString: { page?: string } = useQueryString()
  const page = Number(queryString.page) || 1

  const historyAppointmentQuery = useQuery({
    queryKey: ['historyAppointment', page],
    queryFn: () => appointmentApi.getAppointmentWithUser({ page, limit: LIMIT })
  })

  const totalPage = historyAppointmentQuery.data?.data.result.total_page || 0

  return (
    <div className='overflow-x-auto bg-white dark:bg-neutral-700 mt-16'>
      {/* Search input */}

      {/* Table */}
      <table className='min-w-full text-left text-sm whitespace-nowrap'>
        {/* Table head */}
        <thead className='uppercase tracking-wider border-b-2 dark:border-neutral-600 bg-neutral-50 dark:bg-neutral-800 border-t'>
          <tr>
            <th scope='col' className='px-6 py-4 border-x dark:border-neutral-600'>
              Ngày
            </th>
            <th scope='col' className='px-6 py-4 border-x dark:border-neutral-600'>
              Họ tên bác sỉ
            </th>
            <th scope='col' className='px-6 py-4 border-x dark:border-neutral-600'>
              Họ tên bệnh nhân
            </th>
            <th scope='col' className='px-6 py-4 border-x dark:border-neutral-600'>
              Trạng thái lịch hẹn
            </th>
          </tr>
        </thead>
        {/* Table body */}
        <tbody>
          {historyAppointmentQuery.data &&
            historyAppointmentQuery.data?.data.result.appointments.map((appointment) => (
              <tr className='border-b dark:border-neutral-600 bg-neutral-50 dark:bg-neutral-800'>
                <th scope='row' className='px-6 py-4 border-x dark:border-neutral-600'>
                  {appointment.date.split('T')[0]}
                </th>
                <td className='px-6 py-4 border-x dark:border-neutral-600'>{appointment.doctor.name}</td>
                <td className='px-6 py-4 border-x dark:border-neutral-600'>{appointment.patient.name}</td>
                <td className='px-6 py-4 border-x dark:border-neutral-600'>{appointment.status}</td>
              </tr>
            ))}

          {!historyAppointmentQuery.data && (
            <>
              <span>Không có lịch hẹn</span>
            </>
          )}
        </tbody>
      </table>
      <nav className='mt-5 flex items-center justify-end text-sm' aria-label='Page navigation example'>
        <ul className='list-style-none flex '>
          {page === 1 ? (
            <span className=' cursor-not-allowed relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white'>
              Previous
            </span>
          ) : (
            <>
              <li>
                <Link
                  to={`/users/history?page=${page - 1}`}
                  className='  relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white'
                >
                  Previous
                </Link>
              </li>
            </>
          )}
          {Array(totalPage)
            .fill(0)
            .map((_, index) => {
              const pageNumber = index + 1
              const isActive = pageNumber === page
              return (
                <li key={index}>
                  <Link
                    to={`/users/history?page=${pageNumber}`}
                    className={classNames({
                      'relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white':
                        !isActive,
                      'relative block rounded bg-blue-100 px-3 py-1.5 text-sm font-medium text-blue-700 transition-all duration-300':
                        isActive
                    })}
                  >
                    {pageNumber}
                  </Link>
                </li>
              )
            })}
          {page === totalPage ? (
            <span className=' cursor-not-allowed relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white'>
              Next
            </span>
          ) : (
            <>
              <li>
                <Link
                  to={`/users/history?page=${page + 1}`}
                  className='  relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white'
                >
                  Next
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  )
}
