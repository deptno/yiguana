export type User = Metadata & (Member|NonMember)
type Metadata = {
  ip: string
}
export type Member = {
  userId: string
}
export type NonMember = {
  name: string
  pw: string
}

