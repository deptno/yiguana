import {createYiguana} from '../../../packages/yiguana'
import {ddbClient as client, tableName} from '../../env'
import {createPost} from '../../../packages/yiguana/entity/post'
import {muckbangPost} from '../../data/post'
import {PostDocument} from '../../../packages/yiguana/api/dynamodb/common'
import {createComment, EPriority} from '../../../packages/yiguana/entity/comment'
import {deptnoUserInput} from '../../data/user'
import {createCommentReply} from '../../../packages/yiguana/entity/comment-reply'
import {omit} from 'ramda'

jest.unmock('aws-sdk')

describe('comment', function () {
  const boardName = 'ent'
  let yiguana: ReturnType<typeof createYiguana>
  let postDoc: PostDocument
  beforeAll(async done => {
    yiguana = createYiguana({tableName, client})
    const {items} = await yiguana.list({boardName})
    expect(items).toHaveLength(0)
    const post = createPost(muckbangPost)
    postDoc = (await yiguana.addPost({boardName, post}))!
    await yiguana.addPost({boardName, post})
    done()
  })
  afterAll(async done => {
    const {items} = await yiguana.list({boardName})
    console.log(`clean up ${items.length}`)
    await Promise.all(items.map(item => yiguana.removePost({id: item.id})))
    done()
  })

  it('comments add remove', async done => {
    const posts = await yiguana.list({boardName})
    console.table(posts.items)
    expect(posts.items).toHaveLength(2)
    const comments = await yiguana.comments({postId: postDoc.id})
    expect(comments.items).toHaveLength(0)
    const comment = createComment({
      postId: postDoc.id,
      userId: postDoc.userId,
      user: deptnoUserInput,
      comment: 'parent',
      priority: EPriority.Normal,
      ip: '255.255.255.255'
    })
    {
      // comment +1
      const commentDoc1 = await await yiguana.addComment({comment: comment!})
      await yiguana.commentPost({post: postDoc})
    }
    {
      const comments = await yiguana.comments({postId: postDoc.id})
      console.table(comments.items)
      expect(comments.items).toHaveLength(1)
    }
    // comment +2
    const commentDoc2 = await await yiguana.addComment({comment: comment!})
    await yiguana.commentPost({post: postDoc})
    {
      const commentReply = createCommentReply({
        ...omit(['priority'], comment!),
        comment  : 'reply',
        commentId: commentDoc2!.id,
      })
      // commentReply +1
      await yiguana.addCommentReply({commentReply: commentReply!})
      await yiguana.commentPost({post: postDoc})
      await yiguana.replyComment({comment: commentDoc2!})
    }
    {
      const posts = await yiguana.list({boardName})
      console.table(posts.items)
    }
    {
      const comments = await yiguana.comments({postId: postDoc.id})
      console.table(comments.items)
      expect(comments.items).toHaveLength(2)
      const commentReplies = await yiguana.commentReplies({commentId: commentDoc2!.id})
      console.table(commentReplies.items)
      expect(commentReplies.items).toHaveLength(1)

      await Promise.all(comments.items.map(yiguana.remove))
      await Promise.all(commentReplies.items.map(yiguana.remove))
      console.log('remove all comments and comment replies')
    }
    done()
  })
  it('pagination', async done => {
    // todo add posts
    done()
  })
})
