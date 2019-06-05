export enum EType {
  Board = 'board',
  Post  = 'post',
  Reply = 'reply',
}

export type TableIndex = {
  id: string
  range: string
  _type: EType
}
export type CategoryIndex = {
  category: string
  order: string
} & TableIndex
export type DdbDocument<T> = T & TableIndex
export type DdbCategoryDocument<T> = T & CategoryIndex
