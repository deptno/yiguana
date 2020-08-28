import {Key} from 'readline'
import {keys} from '../../../../dynamodb/keys'
import {DocumentClient} from 'aws-sdk/clients/dynamodb'
import {logStoreDdb} from '../../../../lib/log'

export function getPostsByUserId(tableName: string, input: PostsByUserIdInput) {
  logStoreDdb('getPostsByUserId input %j', input)

  const {category, exclusiveStartKey, userId} = input
  const params: DocumentClient.QueryInput = {
    TableName: tableName,
    IndexName: Yiguana.IndexType.byUser,
    KeyConditionExpression: '#p = :p AND begins_with(#r, :r)',
    ExpressionAttributeNames: {
      '#p': 'userId',
      '#r': 'byUser',
    },
    ExpressionAttributeValues: {
      ':p': userId,
      ':r': keys.byUser.post.stringify({entity: Yiguana.EntityType.Post}),
    },
    ScanIndexForward: false,
    ReturnConsumedCapacity: 'TOTAL',
    ExclusiveStartKey: exclusiveStartKey,
  }

  if (category) {
    return {
      ...params,
      FilterExpression: 'begins_with(#c, :c)',
      ExpressionAttributeNames: {
        '#c': 'category',
      },
      ExpressionAttributeValues: {
        ':c': category,
      },
    }
  }
  return params
}
export type PostsByUserIdInput = {
  userId: string
  category?: string
  exclusiveStartKey?: Key
}
