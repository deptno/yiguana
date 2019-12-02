export type User = Member|NonMember
export type UserMeta = {
  ip: string
}
export type Member = UserMeta & {
  id: string
  name: string
  photo?: string
  role?: 'admin'
}
export type NonMember = UserMeta & {
  pw: string
  name: string
}

