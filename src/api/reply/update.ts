import {YiguanaStore} from '../../store/dynamodb/dynamodb'
import {Post, PostNonMemberInput, PostUserInput} from '../../entity/post'
import {EntityFactory} from '../../entity'
import {User} from '../../entity/user'
import {EValidationErrorMessage, ValidationError} from '../../entity/error'
import * as R from 'ramda'

export async function update(store: YiguanaStore<Post>, ep: EntityFactory, input: Input) {
  console.error('todo')
}

type Input = {
  data: PostUserInput
  user?: User
}
