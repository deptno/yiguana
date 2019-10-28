import {PostUserInput} from './user-input'

export type PostContent = {
  id: string
  contentUrl: string
  cover?: string
  input: PostUserInput
}
