import gql from 'graphql-tag'

export const typeDefs = gql`
  schema {
    query: Query
    mutation: Mutation
  }
  type Query {
    posts(category: Category, cursor: String): PostList!
    post(hk: String!): Post
    comments(postId: String!, cursor: String): CommentList!
    aggReportsOfPost(cursor: String): AggReportPostList!
    aggReportsOfComment(cursor: String): AggReportCommentList!
    reports(hk: String!, rk: String!): ReportPostList!

    myPosts(cursor: String, like: Boolean): PostList!
    myComments(cursor: String, like: Boolean): CommentList!
    myReportedPosts(cursor: String): PostList!
    myReportedComments(cursor: String): CommentList!

    uploadUrl(key: String!): String
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
    cover: String
    user: User!

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
    likes: Int!
    user: User!
    commentId: String

    deleted: Boolean
    refUserName: String
  }
  type AggReportPostList {
    items: [AggReportPost]!
    cursor: String
    firstResult: Boolean
  }
  type AggReportPost {
    hk: String!
    rk: String!
    agg: String!
    reports: String!
    reported: Int!
    data: Post
  }
  type AggReportCommentList {
    items: [AggReportComment]!
    cursor: String
    firstResult: Boolean
  }
  type AggReportComment {
    hk: String!
    rk: String!
    agg: String!
    reports: String!
    reported: Int!
    data: Comment
  }
  type ReportPostList {
    items: [ReportPost]!
    cursor: String
    firstResult: Boolean
  }
  type ReportCommentList {
    items: [ReportComment]!
    cursor: String
    firstResult: Boolean
  }
  type ReportPost {
    hk: String!
    rk: String!
    userId: String
    byUser: String
    content: String!
    user: User!
    data: Post
  }
  type ReportComment {
    userId: String
    byUser: String
    content: String!
    user: User!
    data: Post
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

  ### mutation
  type Mutation {
    post(data: PostMutationInput!, user: NotMemberInput): Post
    comment(data: CommentMutationInput!, user: NotMemberInput): Comment
    reply(data: ReplyMutationInput!, user: NotMemberInput): Comment
    report(data: DocumentInput!, content: String!): Comment

    likePost(hk: String!): Post
    likeComment(hk: String!): Comment

    deletePost(postId: String!): Post
    deleteComment(commentId: String!): Comment
  }

  ### input
  input PostMutationInput {
    category: String!
    title: String!
    content: String!
    cover: String
  }
  input CommentMutationInput {
    postId: String!
    content: String!
  }
  input ReplyMutationInput {
    postId: String!
    content: String!
    commentId: String!
    refUserName: String
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
