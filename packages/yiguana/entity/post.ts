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
  public rId: string = this.data.ip
  public rType: EYiguanaEntity | undefined
  public views: number
  public likes: number
  public comments: number
  public createdAt: string
  public hasImage?: boolean
  public order: string
  public userId: string

  constructor(private data: Post) {
    super(EYiguanaEntity.Post)
    this.validate()

    this.setOrderKey()
    this.setUserId()
  }

  protected validate() {
    const {author, password} = this.data

    if (!('id' in author) && !password) {
      throw new ValidationError('회원이 아닌 경우라면 반드시 `password` 가 제공되어야 한다.')
    }
  }

  private setOrderKey(): void {
    if (!this.order) {
      const {board, category, createdAt} = this.data
      const dtCreatedAt = new Date(this.data.createdAt)
        .toISOString()
        .slice(0, 16)

      this.order = [board, category, dtCreatedAt].join('#')
    }
  }

  private setUserId(): void {
    if (!this.userId) {
      if ('id' in this.data.author) {
        const user = this.data.author as Member
        this.userId = user.id
      }
    }
  }
}

export type Post = {
  title: string
  content: string
  board: string
  ip: string
  author: User
  createdAt: string
  category?: string
  password?: string
}
export type PostListItem = Exclude<YiguanaPost, 'title'>
