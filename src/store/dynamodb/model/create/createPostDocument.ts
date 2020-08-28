import {keys} from '../../../../dynamodb/keys'
import {EntityType} from '../../../../enum'

export function createPostDocument(params: Input): Yiguana.PostDocument {
  const {user, data} = params
  const createdAt = new Date().toISOString()
  const entity = EntityType.Post
  const posts = keys.posts.stringify({createdAt})
  const byUser = keys.byUser.post.stringify({
    entity,
    createdAt,
  })
  const category = keys.category.stringify({
    category: data.category,
    createdAt,
  })

  const post: Yiguana.PostDocument = {
    hk: data.id,
    rk: entity,
    views: 0,
    likes: 0,
    children: 0,
    title: data.title,
    contentUrl: data.contentUrl,
    cover: data.cover,
    user,
    createdAt,
    posts,
    category,
    byUser,
  }
  if ('id' in user) {
    post.userId = user.id
  }

  return post
}

type Input = {
  data: Yiguana.PostContent
  user: Yiguana.User
}
