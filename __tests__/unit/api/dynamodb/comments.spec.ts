import {Post} from '../../../../src/entity/post'
import {getInitialData} from '../../../setup'
import {posts} from '../../../../src/api/dynamodb/posts'
import {opDdb} from '../../../env'
import {createComment, EPriority} from '../../../../src/entity/comment'
import {addComment} from '../../../../src/api/dynamodb/add-comment'

describe('api', function () {
  let postList: Post[]

  beforeEach(() => getInitialData().then(d => postList = d))

  it('comments', async function () {
    const {items} = await posts(opDdb, {category: 'news'})
    console.debug('addComment')
    const comment = createComment({
      data: {
        content: 'comment',
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
