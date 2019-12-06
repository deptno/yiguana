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
              content: 'content',
              title: 'title',
              category: 'news',
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
          const {items} = await api.post.list({
            data: {},
          })
          expect(items.length).toEqual(1)
          const [post] = items
          expect(post.likes).toEqual(1)

          await api.user.post.like({
            data: {
              data: post,
              createdAt: new Date().toISOString(),
            },
            user: member_b,
          })
          const firstPost = await api.post.read({data: post})
          expect(firstPost.likes).toEqual(2)

          const {items: before} = await api.post.list({
            data: {},
          })
          console.table(before)

          console.debug('like post 1회 수행하여 like가 이미 존재할 시 unlike 동작')
          await api.user.post.like({
            data: {
              data: post,
              createdAt: new Date().toISOString(),
            },
            user: member_b,
          })
          const secondPost = await api.post.read({data: post})
          console.debug('member_b의 좋아요는 취소가 되고 member_a가 좋아요 했던 것만 남아서 1이 기대값')
          expect(secondPost.likes).toEqual(1)

          const {items: after} = await api.post.list({
            data: {},
          })
          console.table(after)
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