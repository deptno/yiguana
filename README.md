# Yiguana

![](https://github.com/deptno/yiguana/workflows/pr/badge.svg)

Yiguana-sdk,

@private, Do not use this.

```typescript
  posts(params: PostsInput): Promise<Pagination<P>>
  postsByUserId(params: PostsByUserIdInput): Promise<Pagination<P>>
  addPost(params: AddPostInput): ReturnType<typeof addPost>
  removePost(params: RemovePostInput): ReturnType<typeof removePost>
```
  // post
```typescript
  viewPost(params: ViewPostInput): ReturnType<typeof viewPost>
  likePost(params: LikePostInput): ReturnType<typeof likePost>
  commentPost(params: CommentPostInput): ReturnType<typeof commentPost>
```
  // comment
```typescript
  comments(params: CommentsInput): ReturnType<typeof comments>
  addComment(params: AddCommentInput): ReturnType<typeof addComment>
  replyComment(params: ReplyCommentInput): ReturnType<typeof replyComment>
```
  // comment replies
```typescript
  replies(params: CommentRepliesInput): ReturnType<typeof replies>
  addReply(params: AddReplyInput): ReturnType<typeof addReply>
  removeComment(params: RemoveCommentInput): ReturnType<typeof removeComment>
```
  // common
```typescript
  remove(params: RemoveInput): ReturnType<typeof remove>
```
