import {createYiguana} from '../../../packages/yiguana'
import {ddbClient as client, tableName} from '../../env'
import {createPost} from '../../../packages/yiguana/entity/dynamodb/post'
import {muckbangPost} from '../../data/post'
import {PostDocument} from '../../../packages/yiguana/api/dynamodb/common'
import {createComment, EPriority} from '../../../packages/yiguana/entity/dynamodb/comment'
import {createCommentReply} from '../../../packages/yiguana/entity/dynamodb/comment-reply'
import {omit} from 'ramda'
import {table} from '../../helper/table'

jest.unmock('aws-sdk')

describe('comment', function () {
  const boardName = 'ent'
  let yiguana: ReturnType<typeof createYiguana>
  let postDoc: PostDocument
  beforeAll(async done => {
    yiguana = createYiguana({tableName, client})
    const {items} = await yiguana.posts({board: boardName})
    expect(items).toHaveLength(0)
    const post = createPost(muckbangPost)
    postDoc = (await yiguana.addPost({boardName, post}))!
    await yiguana.addPost({boardName, post})
    console.log('글 2개 작성')
    done()
  })
  afterAll(async done => {
    const {items} = await yiguana.posts({board: boardName})
    console.log(`글 삭제 ${items.length}`)
    await Promise.all(items.map(item => yiguana.removePost({id: item.id})))
    done()
  })

  it('comments add remove', async done => {
    const posts = await yiguana.posts({board: boardName})
    table('글 목록 보기', posts.items)
    expect(posts.items).toHaveLength(2)
    const comments = await yiguana.comments({postId: postDoc.hk})
    expect(comments.items).toHaveLength(0)
    const comment = createComment({
      postId: postDoc.hk,
      userId: postDoc.userId,
      user: {
        id: 'deptno',
        name: 'Bonggyun Lee',
      },
      comment: 'parent',
      priority: EPriority.Normal,
      ip: '255.255.255.255'
    })
    {
      // comment +1
      const commentDoc1 = await await yiguana.addComment({comment: comment!})
      await yiguana.commentPost({post: postDoc})
      console.log('댓글 작성')
    }
    {
      const comments = await yiguana.comments({postId: postDoc.hk})
      table(`${postDoc.hk} 댓글 보기`, comments.items)
      expect(comments.items).toHaveLength(1)
    }
    // comment +2
    const commentDoc2 = await await yiguana.addComment({comment: comment!})
    await yiguana.commentPost({post: postDoc})
    console.log('댓글 작성')
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
      console.log('덧글 작성')
    }
    {
      const posts = await yiguana.posts({board: boardName})
      table('글 목록 보기', posts.items)
    }
    {
      const comments = await yiguana.comments({postId: postDoc.hk})
      table(`${postDoc.hk} 댓글 보기`, comments.items)
      expect(comments.items).toHaveLength(2)
      const commentReplies = await yiguana.commentReplies({commentId: commentDoc2!.id})
      table(`${commentDoc2!.id} 댓글의 덧글 보기`,commentReplies.items)
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
