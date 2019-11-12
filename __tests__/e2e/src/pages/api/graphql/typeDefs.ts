import {gql} from 'apollo-server-micro'

export const typeDefs = gql`
  schema {
    query: Query
    mutation: Mutation
  }
  type Query {
    # 헬로우
    posts(category: Category, nextToken: String): PostList!
    post(hk: String!): Post
    comments(postId: String!, nextToken: String): CommentList!
  }

  type PostList {
    items: [Post]!
    nextToken: String
    firstResult: Boolean
  }
  type Post {
    hk: String! # hash
    rk: String! # range
    title: String!
    likes: Int!
    views: Int!
    children: Int!
    
    content: String
  }
  type CommentList {
    items: [Comment]!
    nextToken: String
    firstResult: Boolean
  }
  type Comment {
    hk: String!
    rk: String!
    content: String
  }
  
  enum Category {
    news
  }
  
  ###
  
  type Mutation {
    post(title: String, content: String): Post
    comment(postId: String!, content: String!): Comment
  }
`
