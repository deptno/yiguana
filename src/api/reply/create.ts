import {MetadataStore} from '../../store/dynamodb'
import {EntityFactory} from '../../entity'
import {User} from '../../entity/user'
import {ReplyUserInput} from '../../entity/reply'
import * as R from 'ramda'

export async function create(store: MetadataStore, ep: EntityFactory, input: CreateInput) {
  return Promise
    .all([
      store.addReply({data: ep.createReply(input)}),
      store.commentPost({
        data: {
          hk: input.data.comment.postId
        },
      }),
    ])
    .then(R.head)
}

export type CreateInput = {
  data: ReplyUserInput
  user: User
}
