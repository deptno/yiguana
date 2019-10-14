export type PostUserInput = PostMemberInput | PostNonMemberInput
export type PostMemberInput = {
  category: string
  title: string
  content: string
  images?: string[]
}
export type PostNonMemberInput = PostMemberInput & {
  userName: string
  userPw: string
}