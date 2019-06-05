import {DdbCategoryDocument} from '../../packages/yiguana/engine/db/table-index'
import {Post} from '../../packages/yiguana/entity/post'

export function toUiPost(post: DdbCategoryDocument<Post>): UiPost {
  const [board, category, createdAt] = post.order.split('#')
  return {
    Category: post.category,
    Title   : post.title,
    Author  : post.author.name,
    Picture : post.author.thumbnail,
    Likes   : post.likes,
    Views   : post.views,
    CreatedAt: createdAt,
  }
}

type UiPost = {
  Category: string
  Title: string
  Author: string
  Picture: string
  Likes: number
  Views: number
  CreatedAt: string
}
