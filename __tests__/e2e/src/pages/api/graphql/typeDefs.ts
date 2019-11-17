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
    reports(entity: String, cursor: String): ReportList!

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
    userId: String

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
    content: String!
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
  type ReportList {
    items: [Report]!
    cursor: String
    firstResult: Boolean
  }
  type Report {
    hk: String!
    rk: String!
    agg: String!
    reports: String!
    reported: Int!
    data: Reportable
  }
  union Reportable = Post|Comment
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

  ### mutation
  type Mutation {
    post(data: PostMutationInput!, user: NotMemberInput): Post
    comment(data: CommentMutationInput!, user: NotMemberInput): Comment
    reply(data: ReplyMutationInput!, user: NotMemberInput): Comment
    report(data: DocumentInput!, content: String!): Comment

    likePost(hk: String!): Post
    likeComment(hk: String!): Comment
    
    deletePost(postId: String!): Comment
    deleteComment(commentId: String!): Comment
  }
  
  ### input
  input PostMutationInput {
    category: String!, title: String!, content: String!
  }
  input CommentMutationInput {
    postId: String!
    content: String!
    commentCreatedAt: String
  }
  input ReplyMutationInput {
    postId: String!
    content: String!
    commentId: String!
  }
  input NotMemberInput {
    name: String!
    pw: String!
  }
  input DocumentInput {
    hk: String
    rk: String
  }
`
