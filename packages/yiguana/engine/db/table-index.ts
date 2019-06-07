export enum EType {
  Board = 'board',
  Post  = 'post',
  Reply = 'reply',
}

export type TableIndex = {
  id: string // hash
  range: string // range
  _type: EType
}
export type CategoryIndex = {
  category: string // hash
  order: string // range
} & TableIndex
export type UserIndex = {
  authorId: string // hash
  order: string // range
} & TableIndex
type DdbDocument<T> = T & TableIndex
export type DdbCategoryDocument<T> = T & CategoryIndex
export type DdbUserDocument<T> = T & UserIndex
