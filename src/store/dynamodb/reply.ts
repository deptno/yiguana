import {DynamoDBInput} from '../../entity/input/dynamodb'
import {YiguanaDocumentHash} from '../../type'

export async function reply(operator: DynamoDBInput, params: ReplyInput) {
  // TODO:
}

export type ReplyInput = {
  data: YiguanaDocumentHash
}
