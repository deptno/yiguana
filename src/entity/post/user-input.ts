import {Post} from './post'

export type PostUserInput = {
  category: string
  title: string
  content: string
  cover?: string
}

export type PostUpdateUserInput = Required<Pick<Post, 'hk'|'updatedAt'>> & Partial<PostUserInput>
