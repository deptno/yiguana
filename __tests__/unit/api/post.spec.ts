import {createApi} from '../../../src/api'
import {EValidationErrorMessage} from '../../../src/entity/error'
import {bucketName, ddbClient, s3Client, tableName} from '../../env'
import {clearData} from '../../setup'

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
            })
          } catch (e) {
            expect(e.message).toEqual(EValidationErrorMessage.InvalidInput)
          }
        })
        it('create post, 비회원 글쓰기', async () => {
          const post = await api.post.create({
            data: {
              content: 'content',
              title: 'title',
              category: 'news',
              userName: 'name',
              userPw: 'pw',
            },
          })
          const {items} = await api.post.list({})
          expect(items.length).toEqual(1)
        })
        it.todo('update post 가 필요할 수 있음')
        it('like post', async () => {
          const {items} = await api.post.list({})
          expect(items.length).toEqual(1)
          const [post] = items
          expect(post.likes).toEqual(0)
          await api.post.like({data: post})
          const nextPost = await api.post.read({data: post})
          expect(nextPost.likes).toEqual(1)
        })
        it.todo(`unlike
좋아요를 취소하기 위해서는 자신이 좋아요를 눌렀던 것인지에 대한 정보가 필요')
좋아요를 취소하기 위해서는 자신이 좋아요를 눌렀던 것인지에 대한 정보가 필요
이에 대한 프론트엔드에서 자신이 로그인할 때 좋아요 했던 정보를 불러오는 것이 좋아보임
최종적으로 서버에서도 검증을 해야한다
이경우 좋아요 또한 DB에 객체로서 존재해야 한다.
최종적으로 누가 좋아요를 눌렀는지 알기를 원한다면
  ddb> postId / like#userId`)
        it('unlike post', async () => {
          const {items} = await api.post.list({})
          expect(items.length).toEqual(1)
          const [post] = items
          expect(post.likes).toEqual(1)
          await api.post.unlike({data: post})
          const nextPost = await api.post.read({data: post})
          expect(nextPost.likes).toEqual(0)
        })
        it.todo(`view
누가 봤는지를 추적하길 원한다면
  ddb> postId view#userId`)
        it('view post', async () => {
          const {items} = await api.post.list({})
          expect(items.length).toEqual(1)
          const [post] = items
          expect(post.views).toEqual(0)
          await api.post.view({data: post})
          const nextPost = await api.post.read({data: post})
          expect(nextPost.views).toEqual(1)
        })
        it('delete post', async () => {
          const {items} = await api.post.list({})
          expect(items.length).toEqual(1)
          const [post] = items
          expect(post.deleted).toEqual(undefined)
          await api.post.del({data: post})
          const nextPost = await api.post.read({data: post})
          expect(nextPost.deleted).toEqual(true)
        })
        it.todo(`request to block post
블락 신고의 경우에는 이를 검색할 수 있는 GSI가 필요
  ddb> postId block#userId`)
      })

    })
  })
})