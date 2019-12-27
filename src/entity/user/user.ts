export type User = Member | NonMember
export type UserMeta = {
  ip: string
}
export type Member = UserMeta & {
  id: string
  name: string
  photo?: string
  role?: ERole
}
export type NonMember = UserMeta & {
  pw: string
  name: string
}
export type MemberAdmin = Member & { role: ERole.admin }

export enum ERole {
  admin = 'admin',
  npc = 'npc',
  member = 'member',
  nonmember = 'nonmember'
}
