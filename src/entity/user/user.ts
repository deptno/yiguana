export type User = Member|NonMember
export type UserMeta = {
  ip: string
}
export type Member = UserMeta & {
  id: string
  name: string
}
export type NonMember = UserMeta & {
  pw: string
  name: string
}

