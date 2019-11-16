import {GraphQLFieldResolver} from 'graphql'
import {Context} from '../../types'

export const comments: GraphQLFieldResolver<{postId}, Context> = (source, args, context) => {
  console.log('comments', args, context.user)

  return context.dataSources.public.comments(args)
    .then(response => {
      return {
        ...response,
        items: response.items.map(item => {
          if (item.deleted) {
            item.content = '삭제 처리 되었습니다.'
          }
          return item
        })
      }
    })
}