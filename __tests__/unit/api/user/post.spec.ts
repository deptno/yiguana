import {member_a, member_b} from '../../../__data__/user'
import {clearData} from '../../../setup'
import {createApi} from '../../../../src/api'
import {bucketName, ddbClient, s3Client, tableName} from '../../../env'

describe('unit', () => {
  describe('api', () => {
    describe('user', () => {
      describe('post', () => {

        beforeAll(clearData)

        const api = createApi({ddbClient, s3Client, tableName, bucketName})
        it('list(0)', async () => {
          const {items} = await api.post.list({
            data: {},
          })
          expect(items.length).toEqual(0)
        })

        it('create post, 회원 글쓰기', async () => {
          const post = await api.post.create({
            data: {
              category: 'news',
              title: 'title',
              content: 'content',
            },
            user: member_a,
          })
          const {items} = await api.user.post.list({
            data: {},
            user: member_a,
          })
          expect(items.length).toEqual(1)
          console.log(post)
          expect(items[0]).toEqual(post)
        })
        it('like post, member a', async () => {
          const {items} = await api.post.list({
            data: {},
          })
          expect(items.length).toEqual(1)
          const [post] = items
          expect(post.likes).toEqual(0)

          await api.user.post.like({
            data: {
              data: post,
              createdAt: new Date().toISOString(),
            },
            user: member_a,
          })
          const nextPost = await api.post.read({data: post})
          expect(nextPost.likes).toEqual(1)
        })
        it('like post -> like post, member b', async () => {
          const {items: before} = await api.post.list({
            data: {},
          })
          expect(before.length).toEqual(1)
          const [post] = before
          expect(post.likes).toEqual(1)

          await api.user.post.like({
            data: {
              data: post,
              createdAt: new Date().toISOString(),
            },
            user: member_b,
          })
          // FIXME: read 함수의 경우 deprecated 라 불필요하면 정리
          const first = await api.post.read({data: post})
          expect(first.likes).toEqual(2)

          console.debug('like post 1회 수행하여 like가 이미 존재할 시 unlike 동작')
          await api.user.post.like({
            data: {
              data: post,
              createdAt: new Date().toISOString(),
            },
            user: member_b,
          })
          const second = await api.post.read({data: post})
          console.debug('member_b의 좋아요는 취소가 되고 member_a가 좋아요 했던 것만 남아서 1이 기대값')
          expect(second.likes).toEqual(1)

          const {items: after} = await api.post.list({
            data: {},
          })
          console.table(after)
          expect(after[0].likes).toEqual(1)
        })
        it('unlike post === like post -> like post, member a', async () => {
          const {items} = await api.post.list({
            data: {},
          })
          expect(items.length).toEqual(1)
          const [post] = items
          expect(post.likes).toEqual(1)
          await api.user.post.like({
            data: {
              data: post,
              createdAt: new Date().toISOString()
            },
            user: member_a,
          })
          const nextPost = await api.post.read({data: post})
          expect(nextPost.likes).toEqual(0)
        })
      })
    })
  })
})