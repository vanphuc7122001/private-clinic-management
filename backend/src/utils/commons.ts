import { v4 as uuid } from 'uuid'

export const stringEnumToArray = (numberEnum: { [key: string]: string | number }) => {
  return Object.values(numberEnum).filter((value) => typeof value === 'string') as number[]
}

export const ObjectId = () => {
  return new Date().getTime() + uuid()
}
