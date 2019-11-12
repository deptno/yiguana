import {GraphQLFieldResolver} from 'graphql'

export const sayHello: GraphQLFieldResolver<any, any> = () => {
  return 'world'
}