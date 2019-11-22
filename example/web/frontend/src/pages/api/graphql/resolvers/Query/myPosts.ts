import {GraphQLFieldResolver} from 'graphql'
import {Context} from '../../types'
import {AuthenticationError} from 'apollo-server-errors'

export const myPosts: GraphQLFieldResolver<any, Context, Args> = (source, args, context) => {
  console.log('myPosts', args, context.user)
  if (!context.user) {
    throw new AuthenticationError('You must be logged in')
  }
  return context.dataSources.private.posts({
    ...args,
    userId: context.user.id,
  }).then(response => {
    // TODO: 데이터가 들어갈대 잘 못 된것이 있어서 현재 예외처리를 해야한다.
    // 디비가 초기화 되는 시점부터는 밸리데이션 체크를 통해 category 에 널 값을 허용하지 말아야한다.
    // 추가적으로 삭제시 category -> dCategory 로 전환 저장되므로 다이나모디비에서 에러가 날 것으로 보인다.

    return {
      ...response,
      items: response.items.map(post => {
        if (!post.category) {
          post.category = ''
        }
        return post
      }),
    }
  })
}

type Args = {
  like?: boolean
  cursor?: string
}
