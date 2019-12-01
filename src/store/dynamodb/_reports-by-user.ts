import {Key} from 'readline'
import {DynamoDBInput} from '../../entity/input/dynamodb'
import {keys} from '../../dynamodb/keys'
import {DocumentClient} from 'aws-sdk/clients/dynamodb'
import {Post} from '../../entity/post'
import {Comment} from '../../entity/comment'
import {Report} from '../../entity/report'
import {EEntity, EIndexName} from '../../type'

export function _reportsByUser<T extends Post|Comment>(operator: DynamoDBInput, params: QueryByUserReport<T['rk']>) {
  const {tableName, dynamodb} = operator
  const {entity, exclusiveStartKey, userId, limit = 10} = params
  const byUser = keys.byUser.report.stringify({
    entity: EEntity.Report,
    target: entity,
  })
  const input: DocumentClient.QueryInput = {
    TableName: tableName,
    IndexName: EIndexName.byUser,
    KeyConditionExpression: '#p = :p and begins_with(#r, :r)',
    ExpressionAttributeNames: {
      '#p': 'userId',
      '#r': 'byUser',
    },
    ExpressionAttributeValues: {
      ':p': userId,
      ':r': byUser,
    },
    ScanIndexForward: false,
    ReturnConsumedCapacity: 'TOTAL',
    ExclusiveStartKey: exclusiveStartKey,
    Limit: limit,
  }

  return dynamodb.query<Report>(input)
}
export type QueryByUserReport<T extends Extract<EEntity, EEntity.Post | EEntity.Comment>> = {
  userId: string
  entity: T
  limit?: number
  exclusiveStartKey?: Key
}
