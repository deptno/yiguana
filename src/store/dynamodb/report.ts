import {DynamoDBInput} from '../../entity/input/dynamodb'
import {Report} from '../../entity/report'
import * as R from 'ramda'

export function report(operator: DynamoDBInput, params: ReportInput) {
  const {dynamodb, tableName} = operator
  const {data} = params

  return dynamodb
    .update<Report>({
      TableName: tableName,
      Key: {
        hk: data.hk,
        rk: data.rk,
      },
      UpdateExpression: 'SET #u = :u, #b = :b, #c = :c, #uid = :uid, #ct = :ct, #d = :d',
      ExpressionAttributeNames: {
        '#h': 'hk',
        '#u': 'userId',
        '#b': 'byUser',
        '#c': 'createdAt',
        '#uid': 'user',
        '#ct': 'content',
        '#d': 'data',
      },
      ExpressionAttributeValues: {
        ':u': data.userId,
        ':b': data.byUser,
        ':c': data.createdAt,
        ':uid': data.user,
        ':ct': data.content,
        ':d': data.data,
      },
      ConditionExpression: 'attribute_not_exists(#h)',
      ReturnValues: 'ALL_NEW',
    })
    .then<Report>(R.prop('Attributes'))
}

export type ReportInput = {
  data: Report
}