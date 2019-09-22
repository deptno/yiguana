export class CommentReply {
  content: string
  title: string
  password?: string
  userId?: string
  board: string
  category: string
  ip: string
  hasImage: boolean
  views: number
  likes: number
  comments: number
  createdAt: string
  author: any
}
//export class DxCommentReply extends CommentReply implements DdbTableIndex {
//  constructor(private data) {
//    super()
//  }
//}

