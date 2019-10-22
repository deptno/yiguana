import {DynamoDBInput} from '../../entity/input/dynamodb'
import {Post} from '../../entity/post'
import {EEntity} from '../../entity/enum'
import {YiguanaDocument} from '../../dynamodb/yiguana-document'

export async function updatePost(operator: DynamoDBInput, params: UpdatePostInput): Promise<Post|undefined> {
  const {dynamodb, tableName} = operator
  const {data} = params
  const {hk, updatedAt} = data
  const response = await dynamodb.update({
    ReturnConsumedCapacity: 'TOTAL',
    ReturnValues: 'ALL_NEW',
    TableName: tableName,
    Key: {
      hk,
      rk: EEntity.Post,
    },
    UpdateExpression: 'SET #u = :u',
    ExpressionAttributeNames: {
      '#u': 'updatedAt',
    },
    ExpressionAttributeValues: {
      ':u': updatedAt,
    },
  })
  if (response) {
    return response.Attributes as Post
  }
}
export type UpdatePostInput = {
  data: Pick<YiguanaDocument, 'hk' | 'updatedAt'>
}
