import {Member, User} from './user'
import {YiguanaObject} from './yiguana-object'
import {EYiguanaEntity} from './enum'
import {ValidationError} from './error'

export class YiguanaPostListItem extends YiguanaObject {
  private userId: string

  constructor(private data: PostListItem) {
    super(EYiguanaEntity.Post)

  }
}

export class YiguanaPost extends YiguanaObject {
  public rId: string = this.data.ip!
  public rType: EYiguanaEntity | undefined
  public views: number
  public likes: number
  public comments: number
  public createdAt: string
  public hasImage?: boolean
  public order: string = this.setOrderKey()
  public userId: string = this.setUserId()

  constructor(private data: Post, private content: Content) {
    super(EYiguanaEntity.Post)
    this.validate()
  }

  protected validate() {
    const {author, password} = this.data

    if (!('id' in author) && !password) {
      throw new ValidationError('회원이 아닌 경우라면 반드시 `password` 가 제공되어야 한다.')
    }
  }

  private setOrderKey(): string {
    const {board, category, createdAt} = this.data
    const dtCreatedAt = new Date(createdAt!)
      .toISOString()
      .slice(0, 16)

    return [board, category, dtCreatedAt].join('#')
  }

  private setUserId(): string {
    return (this.data.author as Member).id
  }
}

export type Post = {
  title: string
  author: User
  createdAt: string
  category: string
  board: string
  ip: string
  password?: string
  contentUrl: string
}
export type PostListItem = Exclude<YiguanaPost, 'title'>
export type Content = {
  location: string
  hasImage: string
}
