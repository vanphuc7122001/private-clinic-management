import { ObjectId } from '~/utils/commons'

interface NewsType {
  id?: string
  title: string
  images: string
  description: string
  content: string
  status?: boolean
  user_id: string
  category_id: string
  created_at?: Date
  updated_at?: Date
}

export default class News {
  id?: string
  title: string
  images: string
  description: string
  status: boolean
  content: string
  user_id: string
  category_id: string
  created_at?: Date
  updated_at?: Date

  constructor(news: NewsType) {
    const date = new Date()
    this.id = news.id || ObjectId()
    this.title = news.title
    this.images = news.images
    this.status = news.status || false
    this.description = news.description
    this.content = news.content
    this.user_id = news.user_id
    this.category_id = news.category_id
    this.created_at = news.created_at || date
    this.updated_at = news.updated_at || date
  }
}
