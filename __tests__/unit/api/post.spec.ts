import {createApi} from '../../../src/api'
import {DynamoDB, S3} from 'aws-sdk'
import {EValidationErrorMessage} from '../../../src/entity/error'

describe('api', () => {
  // like, 혹은 like 를 포함한 view 모두가 다이나모디비에 저장되는 경우에는 추후 저장 용량의 부담이 생길 수 있음
  const region = 'ap-northeast-2'
  const api = createApi({
    ddbClient: new DynamoDB.DocumentClient({region}),
    s3Client: new S3({region}),
    tableName: 'yiguana',
    bucketName: 'yiguana',
  })
  it('getPosts(0)', async () => {
    const {items} = await api.post.list({})
    expect(items.length).toEqual(0)
  })

  describe('post', () => {
    it('add post, 비밀 번호 없는 비회원 글쓰기', async () => {
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
    it('add post, 비회원 글쓰기', async () => {
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
      console.table(items)
    })
    // it('update post', async () => {})
    it('like post', async () => {
      const {items} = await api.post.list({})
      const [post] = items
      await api.post.like(post)
      const nextPost = await api.post.read(post)
      console.log(nextPost)
    })

    it('cancel like post', async () => {
      // 좋아요를 취소하기 위해서는 자신이 좋아요를 눌렀던 것인지에 대한 정보가 필요
      // 이에 대한 프론트엔드에서 자신이 로그인할 때 좋아요 했던 정보를 불러오는 것이 좋아보임
      // 최종적으로 서버에서도 검증을 해야한다
      // 이경우 좋아요 또한 DB에 객체로서 존재해야 한다.
      // 최종적으로 누가 좋아요를 눌렀는지 알기를 원한다면
      // postId / like#userId
    })
    it('view post', async () => {
      // 누가 봤는지를 추적하길 원한다면
      // postId view#userId
    })
    it('remove post', async () => {

    })
    it('request to block post', async () => {
      // 블락 신고의 경우에는 이를 검색할 수 있는 GSI가 필요
      // postId block#userId
    })
  })
})