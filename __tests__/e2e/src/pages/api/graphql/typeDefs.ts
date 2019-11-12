import {gql} from 'apollo-server-micro'

export const typeDefs = gql`
  type Query {
    # 헬로우
    posts: PostList!
  }

  type PostList {
    items: [Post]!
    nextToken: String
    firstResult: Boolean
  }
  type Post {
    hk: String # PostID
  }
`
