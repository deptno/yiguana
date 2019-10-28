export type User = Member|NonMember
type Metadata = {
  ip: string
}
export type Member = Metadata & {
  userId: string
}
export type NonMember = Metadata & {
  name: string
  pw: string
}

