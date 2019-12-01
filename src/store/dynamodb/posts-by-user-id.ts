import {Key} from 'readline'
import {DynamoDBInput} from '../../entity/input/dynamodb'
import {Post} from '../../entity/post'
import {keys} from '../../dynamodb/keys'
import {DocumentClient} from 'aws-sdk/clients/dynamodb'
import {EEntity, EIndexName} from '../../type'

export function postsByUserId<T = Post>(operator: DynamoDBInput, params: PostsByUserIdInput) {
  const {tableName, dynamodb} = operator
  const {category, exclusiveStartKey, userId} = params

  const queryParams: DocumentClient.QueryInput = {
    TableName: tableName,
    IndexName: EIndexName.byUser,
    KeyConditionExpression: '#p = :p AND begins_with(#r, :r)',
    ExpressionAttributeNames: {
      '#p': 'userId',
      '#r': 'byUser'
    },
    ExpressionAttributeValues: {
      ':p': userId,
      ':r': keys.byUser.post.stringify({entity: EEntity.Post})
    },
    ScanIndexForward: false,
    ReturnConsumedCapacity: 'TOTAL',
    ExclusiveStartKey: exclusiveStartKey,
  }
  if (category) {
    queryParams.FilterExpression = 'begins_with(#c, :c)'
    queryParams.ExpressionAttributeNames!['#c'] = 'category'
    queryParams.ExpressionAttributeValues![':c'] = category
  }

  return dynamodb.query<T>(queryParams)
}
export type PostsByUserIdInput = {
  userId: string
  category?: string
  exclusiveStartKey?: Key
}
