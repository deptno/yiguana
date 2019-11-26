import {GraphQLFieldResolver} from 'graphql'
import {Context} from '../../types'

export const uploadUrl: GraphQLFieldResolver<any, Context, Args> = (source, args, context) => {
  const user = context.getUser()
  console.log('uploadUrl', args, user)

  return context.dataSources.public.getUploadUrl(args)
}

type Args = {
  key: string
}
