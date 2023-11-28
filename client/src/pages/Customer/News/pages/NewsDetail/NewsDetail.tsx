import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import newsApi from '~/apis/news.api'
import { NewsType } from '~/types/news.type'
import { useState, useEffect } from 'react'

type AriticleType = NewsType

const initalNew: AriticleType = {
  id: '',
  title: '',
  images: '',
  description: '',
  content: '',
  user_id: '',
  category_id: '',
  status: false,
  created_at: '',
  updated_at: ''
}

export default function NewsDetail() {
  const { id } = useParams()
  const [article, setArticle] = useState<AriticleType>(initalNew)

  const getNewQuery = useQuery({
    queryKey: ['newDetail', id],
    queryFn: () => newsApi.getNewDetail(id)
  })

  useEffect(() => {
    if (getNewQuery.data) {
      setArticle(getNewQuery.data.data.result)
    }
  }, [getNewQuery])

  return (
    <div className=''>
      <main className='pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 antialiased'>
        <div className='flex justify-between px-4 mx-auto max-w-screen-xl'>
          <article className='mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert'>
            <header className='mb-4 lg:mb-6 not-format'>
              <h1 className='mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white'>
                {article.title}
              </h1>
              <div>
                <p className='lead'>{article.description}</p>

                <figure className='my-3'>
                  <img className='w-[600px] h-[400px] object-cover rounded' src={article.images} />
                  <figcaption>Digital art by Anonymous</figcaption>
                </figure>

                <p className='mt-2'>{article.content}</p>
              </div>
            </header>
          </article>
        </div>
      </main>
    </div>
  )
}
