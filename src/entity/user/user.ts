export type User = Member|NonMember
type Metadata = {
  ip: string
  name: string
}
export type Member = Metadata & {
  id: string
}
export type NonMember = Metadata & {
  pw: string
}

