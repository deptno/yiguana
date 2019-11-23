import {GraphQLFieldResolver} from 'graphql'
import {Context} from '../../types'

export const uploadUrl: GraphQLFieldResolver<any, Context, Args> = (source, args, context) => {
  console.log('uploadUrl', args, context.user)

  return context.dataSources.public.getUploadUrl(args)
}

type Args = {
  key: string
}
