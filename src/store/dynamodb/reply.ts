import {DynamoDBInput} from '../../entity/input/dynamodb'
import {YiguanaDocumentHash} from '../../dynamodb/yiguana-document'

export async function reply(operator: DynamoDBInput, params: ReplyInput) {
  // TODO:
}

export type ReplyInput = {
  data: YiguanaDocumentHash
}
