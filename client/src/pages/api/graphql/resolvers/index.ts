import {GraphQLResolverMap} from 'apollo-graphql'
import * as Query from './Query'
import * as Mutation from './Mutation'
import {Context} from '../types'

export const resolvers: GraphQLResolverMap<Context> = {
  Query,
  Mutation,
  Reportable: {
    __resolveType(obj, context, info) {
      console.log(obj)
      console.log(obj.rk)
      console.log(obj.rk.charAt(0).toUpperCase() + obj.rk.slice(1))
      return obj.rk.charAt(0).toUpperCase() + obj.rk.slice(1)
    },
  },
}