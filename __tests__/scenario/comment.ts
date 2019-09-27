import {omit} from 'ramda'
import {Yiguana} from '../../packages/yiguana'
import {ddbClient, tableName} from '../env'
import {PostDocument} from '../../packages/yiguana/api/dynamodb/common'
import {muckbangPost} from '../data/post'
import {table} from '../helper/table'
import {EPriority} from '../../packages/yiguana/entity/comment'

jest.unmock('aws-sdk')
jest.setTimeout(10000)

describe('yiguana client comment', function () {
  const boardName = 'ent'
  let yiguana: Yiguana
  let postDoc: PostDocument
  beforeAll(async done => {
    yiguana = new Yiguana({tableName, client: ddbClient})
    const {items} = await yiguana.board.posts({board: boardName})
    expect(items).toHaveLength(0)
    const post = yiguana.post.create(muckbangPost)
    postDoc = (await yiguana.board.addPost({boardName, post}))!
    await yiguana.board.addPost({boardName, post})
    console.log('글 2개 작성')
    done()
  })
  afterAll(async done => {
    const {items} = await yiguana.board.posts({board: boardName})
    console.log(`글 삭제 ${items.length}`)
    await Promise.all(items.map(item => yiguana.board.removePost({id: item.id})))
    done()
  })

  it('comments add remove', async done => {
    const posts = await yiguana.board.posts({board: boardName})
    table('글 목록 보기', posts.items)
    expect(posts.items).toHaveLength(2)
    const comments = await yiguana.post.comments({postId: postDoc.hk})
    expect(comments.items).toHaveLength(0)
    const comment = yiguana.comment.create({
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
      const commentDoc1 = await await yiguana.post.addComment({comment: comment!})
      console.log('댓글 작성')
    }
    {
      const comments = await yiguana.post.comments({postId: postDoc.hk})
      table(`${postDoc.hk} 댓글 보기`, comments.items)
      expect(comments.items).toHaveLength(1)
    }
    // comment +2
    const commentDoc2 = await await yiguana.post.addComment({comment: comment!})
    console.log('댓글 작성')
    {
      const commentReply = yiguana.commentReply.create({
        ...omit(['priority'], comment!),
        comment  : 'reply',
        commentId: commentDoc2!.id,
      })
// commentReply +1
      await yiguana.comment.addCommentReply({commentReply: commentReply!})
      console.log('덧글 작성')
    }
    {
      const posts = await yiguana.board.posts({board: boardName})
      table('글 목록 보기', posts.items)
    }
    {
      const comments = await yiguana.post.comments({postId: postDoc.hk})
      table(`${postDoc.hk} 댓글 보기`, comments.items)
      expect(comments.items).toHaveLength(2)
      const commentReplies = await yiguana.comment.commentReplies({commentId: commentDoc2!.id})
      table(`${commentDoc2!.id} 댓글의 덧글 보기`,commentReplies.items)
      expect(commentReplies.items).toHaveLength(1)

      await Promise.all(comments.items.map(item => yiguana.raw.remove(item)))
      await Promise.all(commentReplies.items.map(item => yiguana.raw.remove(item)))
      console.log('remove all comments and comment replies')
    }
    done()
  })
  it('pagination', async done => {
    // todo add posts
    done()
  })
})
