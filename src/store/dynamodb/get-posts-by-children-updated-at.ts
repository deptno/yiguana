import {Post} from '../../entity/post'
import {DynamoDBInput} from '../../entity/input/dynamodb'
import {EEntity, EIndexName} from '../../type'
import {logStoreDdb as log} from '../../lib/log'

export function getPostsByChildrenUpdatedAt(operator: DynamoDBInput, input: GetPostsByChildrenUpdatedAtInput) {
  log('getPostsByChildrenUpdatedAt input %j', input)

  const {tableName, dynamodb} = operator
  const {exclusiveStartKey, limit = 10} = input
  const queryParams = {
    TableName: tableName,
    IndexName: EIndexName.postsByChildrenUpdatedAt,
    KeyConditionExpression: '#h = :h',
    ExpressionAttributeNames: {
      '#h': 'rk',
    },
    ExpressionAttributeValues: {
      ':h': EEntity.Post,
    },
    ScanIndexForward: false,
    ReturnConsumedCapacity: 'TOTAL',
    ExclusiveStartKey: exclusiveStartKey,
    Limit: limit
  }

  return dynamodb.query<Post>(queryParams)
}

export type GetPostsByChildrenUpdatedAtInput = {
  limit?: number
  exclusiveStartKey?: Exclude<any, string | number>
}