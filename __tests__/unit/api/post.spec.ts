import {createApi} from '../../../src/api'
import {EValidationErrorMessage} from '../../../src/entity/error'
import {bucketName, ddbClient, s3Client, tableName} from '../../env'
import {clearData} from '../../setup'
import {member_a, non_member_a, non_member_without_pw, member_b} from '../../__data__/user'
import {EEntityStatus} from '../../../src/dynamodb'

describe('unit', () => {
  describe('api', () => {
    describe('post', () => {

      beforeAll(clearData)

      const api = createApi({ddbClient, s3Client, tableName, bucketName})
      it.todo('like, 혹은 like 를 포함한 view 모두가 다이나모디비에 저장되는 경우에는 추후 저장 용량의 부담이 생길 수 있음')
      it('list(0)', async () => {
        const {items} = await api.post.list({})
        expect(items.length).toEqual(0)
      })

      describe('post', () => {
        it('create post, 비밀 번호 없는 비회원 글쓰기', async () => {
          try {
            await api.post.create({
              data: {
                content: 'content',
                title: 'title',
                category: 'news',
              },
              user: non_member_without_pw,
            })
            expect(false).toEqual(true)
          } catch (e) {
            expect(e.message).toEqual('pw must not empty')
          }
          const {items} = await api.post.list({})
          console.table(items)
        })
        it('create post, 비회원 글쓰기', async () => {
          const post = await api.post.create({
            data: {
              content: 'content',
              title: 'title',
              category: 'news',
            },
            user: non_member_a,
          })
          const {items} = await api.post.list({})
          console.table(items)
          expect(items.length).toEqual(1)
          console.log(post)
          expect(items[0]).toEqual(post)
        })
        it.todo('update post 가 필요할 수 있음')
        it.todo(`unlike
좋아요를 취소하기 위해서는 자신이 좋아요를 눌렀던 것인지에 대한 정보가 필요')
좋아요를 취소하기 위해서는 자신이 좋아요를 눌렀던 것인지에 대한 정보가 필요
이에 대한 프론트엔드에서 자신이 로그인할 때 좋아요 했던 정보를 불러오는 것이 좋아보임
최종적으로 서버에서도 검증을 해야한다
이경우 좋아요 또한 DB에 객체로서 존재해야 한다.
최종적으로 누가 좋아요를 눌렀는지 알기를 원한다면
  ddb> postId / like#userId`)
        it.todo(`view
누가 봤는지를 추적하길 원한다면
  ddb> postId view#userId`)
        it('view post', async () => {
          const {items} = await api.post.list({})
          console.table(items)
          expect(items.length).toEqual(1)
          const [post] = items
          expect(post.views).toEqual(0)
          const nextPost = await api.post.view({data: post})
          console.log(nextPost)
          expect(nextPost.views).toEqual(1)
          expect(nextPost.content).toBeDefined()
          expect(nextPost.content).toEqual('content')
        })
        it('delete post', async () => {
          const {items} = await api.post.list({})
          expect(items.length).toEqual(1)
          const [post] = items
          expect(post.status).toBeUndefined()
          await api.post.del({data: post, user: non_member_a})
          const nextPost = await api.post.read({data: post})
          expect(nextPost.status).toEqual(EEntityStatus.deletedByUser)
        })
        it.todo(`request to block post
블락 신고의 경우에는 이를 검색할 수 있는 GSI가 필요
  ddb> postId block#userId`)
      })

    })
  })
})