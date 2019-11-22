import ApolloClient from 'apollo-client'
import {createHttpLink} from 'apollo-link-http'
import {InMemoryCache} from 'apollo-cache-inmemory'
import {setContext} from 'apollo-link-context'
import fetch from 'isomorphic-unfetch'

const cache = new InMemoryCache()
const uri = '/api/graphql'
const link = setContext((_, {headers}) => {
  const {user} = localStorage
  if (user) {
    if (JSON.parse(user).id) {
      return {
        headers: {
          ...headers,
          authorization: localStorage.user,
        },
      }
    }
  }
  return {
    headers,
  }
}).
concat(createHttpLink({uri, fetch}))

export const client = new ApolloClient({link, cache})
