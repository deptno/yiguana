import {GraphQLFieldResolver} from 'graphql'
import {Context} from '../../types'

export const uploadUrl: GraphQLFieldResolver<any, Context, Args> = (source, args, context) => {
  const user = context.getUser()

  return context.dataSources.public.getUploadUrl({
    user,
    data: args,
  })
}

type Args = {
  key: string
}
