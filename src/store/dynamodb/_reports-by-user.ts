import {Key} from 'readline'
import {DynamoDBInput} from '../../entity/input/dynamodb'
import {EEntity} from '../../entity/enum'
import {EIndexName} from '../../dynamodb'
import {keys} from '../../dynamodb/keys'
import {DocumentClient} from 'aws-sdk/clients/dynamodb'
import {Post} from '../../entity/post'
import {Comment} from '../../entity/comment'
import {Report} from '../../entity/report'

export function _reportsByUser<T extends Post|Comment>(operator: DynamoDBInput, params: QueryByUserReport<T['rk']>) {
  const {tableName, dynamodb} = operator
  const {entity, exclusiveStartKey, userId} = params
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
    Limit: 10,
  }

  return dynamodb.query<Report>(input)
}
export type QueryByUserReport<T extends Extract<EEntity, EEntity.Post | EEntity.Comment>> = {
  userId: string
  entity: T
  exclusiveStartKey?: Key
}
