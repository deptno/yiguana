import {Post} from '../../../../src/entity/post'
import {getInitialData} from '../../../setup'
import {opDdb} from '../../../env'
import {addComment} from '../../../../src/api/dynamodb/add-comment'
import {createComment, EPriority} from '../../../../src/entity/comment'
import {comments} from '../../../../src/api/dynamodb/comments'

describe('api', function () {
  let postList: Post[]
  let post: Post

  beforeAll(() => getInitialData().then(d => {
    postList = d
    post = postList[0]
  }))

  it('addComment', async function () {
    console.debug('addComment')
    const comment = createComment({
      data: {
        content: 'test data',
        priority: EPriority.Normal
      },
      user: {
        userId: 'userId',
        ip: '0.0.0.0'
      }
    })
    const commented = await addComment(opDdb, {data: comment, postId: post.hk})

    console.table([comment, commented])
    expect(commented).toEqual(comment)
  })
  it('comments', async function () {
    const {items} = await comments(opDdb, {
      postId: post.hk
    })
    console.debug('addComment')
    const comment = createComment({
      data: {
        content: 'test data',
        priority: EPriority.Normal
      },
      user: {
        userId: 'userId',
        ip: '0.0.0.0'
      }
    })
    const commented = await addComment(opDdb, {
      postId: post.hk,
      data: comment
    })

    console.table([comment, commented])
    expect(commented).toEqual(comment)
  })
})
