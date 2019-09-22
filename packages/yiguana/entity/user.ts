export type User = Member | NonMember
export type Member = {
  id: string
  name: string
  thumbnail?: string
}
export type NonMember = {
  name: string
  thumbnail?: string
}
