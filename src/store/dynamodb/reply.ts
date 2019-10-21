import {DynamoDBInput} from '../../entity/input/dynamodb'
import {Post} from '../../entity/post'
import {Reply} from '../../entity/reply/reply'
import {YiguanaDocumentHash} from '../../dynamodb/yiguana-document'
import {EEntity} from '../../entity/enum'

export async function reply(operator: DynamoDBInput, params: ReplyInput) {
  const {dynamodb, tableName} = operator
  const {hk} = params.data
  const response = await dynamodb.update({
    TableName: tableName,
    Key: {
      hk,
      rk: EEntity.Reply,
    },
    UpdateExpression: 'SET #v = #v + :v',
    ExpressionAttributeNames: {
      '#v': 'replies',
    },
    ExpressionAttributeValues: {
      ':v': 1,
    },
    ReturnConsumedCapacity: 'TOTAL',
    ReturnValues: 'ALL_NEW',
  })

  if (response) {
    return response.Attributes as Post
  }
}

export type ReplyInput = {
  data: YiguanaDocumentHash
}
