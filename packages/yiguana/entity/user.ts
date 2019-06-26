export type User = {
  id: string
  name: string
  thumbnail: string
  userId: string // GSI PK 필요한지 확인
  password?: string
  login: number
}
export type UserInput = {
  id: string
  name: string
  thumbnail?: string
}
