import {Post} from '../../../../src/entity/post'
import {getInitialData} from '../../../setup'
import {posts} from '../../../../src/api/dynamodb/posts'
import {opDdb} from '../../../env'
import {addComment} from '../../../../src/api/dynamodb/add-comment'
import {createComment, EPriority} from '../../../../src/entity/comment'
import {comments} from '../../../../src/api/dynamodb/comments'

describe('api', function () {
  let postList: Post[]

  beforeAll(() => getInitialData().then(d => postList = d))

  it('addComment', async function () {
    const {items} = await posts(opDdb, {category: 'news'})
    const [post] = items
    console.debug('addComment')
    const comment = createComment({
      data: {
        content: 'test comment',
        priority: EPriority.Normal
      },
      user: {
        userId: 'userId',
        ip: '0.0.0.0'
      }
    })
    const commented = await addComment(opDdb, {comment, postId: post.hk})

    console.table([comment, commented])
    expect(commented).toEqual(comment)
  })
  it('comments', async function () {
    const {items} = await comments(opDdb, {
      postId
    })
    console.debug('addComment')
    const comment = createComment({
      data: {
        content: 'test comment',
        priority: EPriority.Normal
      },
      user: {
        userId: 'userId',
        ip: '0.0.0.0'
      }
    })
    const commented = await addComment(opDdb, {comment})

    console.table([comment, commented])
    expect(commented).toEqual(comment)
  })
})
