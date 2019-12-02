import {DynamoDBInput} from '../../entity/input/dynamodb'
import {Report} from '../../entity/report'
import * as R from 'ramda'

export function report(operator: DynamoDBInput, params: ReportInput) {
  const {dynamodb, tableName} = operator

  return dynamodb
    .update<Report>({
      TableName: tableName,
      Key: {
        hk: params.hk,
        rk: params.rk,
      },
      UpdateExpression: 'SET #u = :u, #b = :b, #c = :c, #uid = :uid, #ct = :ct, #d = :d, #s = :s',
      ExpressionAttributeNames: {
        '#h': 'hk',
        '#u': 'user',
        '#b': 'byUser',
        '#c': 'createdAt',
        '#uid': 'userId',
        '#ct': 'content',
        '#d': 'data',
        '#s': 'status',
      },
      ExpressionAttributeValues: {
        ':u': params.user,
        ':b': params.byUser,
        ':c': params.createdAt,
        ':uid': params.userId,
        ':ct': params.content,
        ':d': params.data,
        ':s': params.status,
      },
      ConditionExpression: 'attribute_not_exists(#h)',
      ReturnValues: 'ALL_NEW',
    })
    .then<Report>(R.prop('Attributes'))
}

export type ReportInput = Report
