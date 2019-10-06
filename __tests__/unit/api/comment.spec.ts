import {Post} from '../../../src/entity/post'
import {getInitialData} from '../../setup'
import {opDdb} from '../../env'
import {addComment} from '../../../src/api/dynamodb/add-comment'
import {createComment} from '../../../src/entity/comment'
import {comments} from '../../../src/api/dynamodb/comments'
import {EPriority} from '../../../src/entity/enum'

describe('api', function () {
  let postList: Post[]
  let post: Post

  beforeAll(() => getInitialData().then(d => {
    postList = d
    post = postList[1]
  }))

  describe('comments', () => {
    it('addComment', async function () {
      console.debug('addComment')
      const comment = createComment({
        data: {
          postId: post.hk,
          content: 'comment',
          priority: EPriority.Normal,
        },
        user: {
          userId: 'aSsi',
          ip: '0.0.0.0',
        },
      })
      const commented = await addComment(opDdb, {data: comment})
      console.table([comment, commented])
      expect(commented).toEqual(comment)
    })
    it('comments', async function () {
      const {items} = await comments(opDdb, {
        postId: post.hk,
      })
      console.debug('comments')
      console.table(items)
      expect(items).toHaveLength(1)
    })
  })
})

