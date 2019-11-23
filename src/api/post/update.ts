import {MetadataStore} from '../../store/dynamodb'
import {Post, PostUpdateUserInput} from '../../entity/post'
import {EntityFactory} from '../../entity'
import {ApiInput} from '../../type'
import {logApiPost} from '../../lib/log'

export async function update(store: MetadataStore, ep: EntityFactory, input: UpdateInput): Promise<Post|undefined> {
  log('update %j', input)
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

export type UpdateInput = ApiInput<PostUpdateUserInput>

const log = logApiPost.extend('update')
