import {YiguanaStore} from '../../store/dynamodb/dynamodb'
import {Post, PostUpdateUserInput} from '../../entity/post'
import {EntityFactory} from '../../entity'
import {User} from '../../entity/user'

export async function update(store: YiguanaStore, ep: EntityFactory, input: UpdateInput): Promise<Post|undefined> {
  // TODO: update 는 s3 쪽 데이를 업데이트 한다.

  // TODO: 다이나모 디비에 updatedAt 을 업데이트 한다.
  const {hk, updatedAt} = input.data
  return store.updatePost({
    data: {
      hk,
      updatedAt
    }
  })
}

export type UpdateInput = {
  data: PostUpdateUserInput
  user: User
}
