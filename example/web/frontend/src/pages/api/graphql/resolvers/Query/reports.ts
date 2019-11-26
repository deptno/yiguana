import {GraphQLFieldResolver} from 'graphql'
import {Context} from '../../types'

export const reports: GraphQLFieldResolver<any, Context> =
  (source, args, context) => {
    console.log('reports', args, context.user)

    return context.dataSources.public.reports({
      data: {
        hk: args.hk,
        rk: args.rk,
      },
    })
      .then(response => {
        return {
          ...response,
          items: response.items.map(item => {
            if (item.deleted) {
              item.content = '삭제 처리 되었습니다.'
            }
            return item
          }),
        }
      })
      .then( x => {
        console.log('xx', x)
        return x
      })
  }
