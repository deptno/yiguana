import {gql} from 'apollo-server-micro'

export const typeDefs = gql`
  schema {
    query: Query
    mutation: Mutation
  }
  type Query {
    posts(category: Category, cursor: String): PostList!
    post(hk: String!): Post
    comments(postId: String!, cursor: String): CommentList!

    myPosts(cursor: String, like: Boolean): PostList!
    myComments(cursor: String, like: Boolean): CommentList!
  }

  type PostList {
    items: [Post]!
    cursor: String
    firstResult: Boolean
  }
  type Post {
    hk: String! # hash
    rk: String! # range
    title: String!
    likes: Int!
    views: Int!
    children: Int!
    category: String
    createdAt: String
    content: String

    dCategory: String
    deleted: Boolean
  }
  type CommentList {
    items: [Comment]!
    cursor: String
    firstResult: Boolean
  }
  type Comment {
    hk: String!
    rk: String!
    content: String
    postId: String
    userId: String
    createdAt: String
    updatedAt: String
    children: Int
    likes: Int
    user: User
    commentId: String

    deleted: Boolean
  }
  type User {
    ip: String!
    name: String!
    id: String
    pw: String
  }

  enum Category {
    news
    create_channel
  }

  ###
  type Mutation {
    post(data: PostMutationInput!, user: NotMemberInput): Post
    comment(data: CommentMutationInput!, user: NotMemberInput): Comment

    likePost(hk: String!): Post
    likeComment(hk: String!): Comment
    
    deletePost(postId: String!): Comment
    deleteComment(commentId: String!): Comment
  }
  input PostMutationInput {
    category: String!, title: String!, content: String!
  }
  input CommentMutationInput {
    postId: String!
    commentCreatedAt: String!
    content: String!
  }
  input NotMemberInput {
    name: String!
    pw: String!
  }
`
