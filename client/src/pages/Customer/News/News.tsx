import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import newsApi from '~/apis/news.api'
import useQueryString from '~/hooks/useQueryString'
import { useState } from 'react'

const LIMIT = 4

export default function News() {
  const queryString: { page?: string } = useQueryString()
  const page = Number(queryString.page) || 1
  const [limit, setLimit] = useState(LIMIT)
  const newsQuery = useQuery({
    queryKey: ['doctors', page, limit],
    queryFn: () => newsApi.getNews({ page: page, limit: limit })
  })

  const totalRecord = newsQuery.data?.data.result.total_record
  // total page = total /limit => limit = page * total

  const handleMore = () => {
    const limitMore = limit + LIMIT
    setLimit(limitMore)
  }

  return (
    <div className='container-app mt-[100px]  '>
      <div className='new__list flex-wrap gap-[30px]'>
        {newsQuery.data?.data.result.news.map((item) => (
          <article className='new-item' key={item.id}>
            <figure className='new-item__img'>
              <img className='new-item__thumb' src={item.images} />
            </figure>
            <section className='new-item__body'>
              <h3 className='new-item__heading heading'>{item.title}</h3>
              <p className='desc new-item__desc line-clamp'>{item.description}</p>
              <Link to={`/news/${item.id}`} className='new-item_more'>
                Xem thêm
              </Link>
            </section>
          </article>
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
  )
}
