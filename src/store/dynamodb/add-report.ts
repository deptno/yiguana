import * as R from 'ramda'
import {DynamoDBInput} from '../../entity/input/dynamodb'
import {Report} from '../../entity/report'

export function addReport(operator: DynamoDBInput, params: AddReportInput) {
  const {dynamodb, tableName} = operator
  const {data} = params

  return dynamodb
    .update<Report>({
      TableName: tableName,
      Key: {
        hk: data.hk,
        rk: data.rk,
      },
      UpdateExpression: 'SET #uid = :uid, #b = :b, #c = :c, #u = :u, #d = :d, #co = :co',
      ExpressionAttributeNames: {
        '#h': 'hk',
        '#uid': 'userId',
        '#b': 'byUser',
        '#c': 'createdAt',
        '#u': 'user',
        '#d': 'data',
        '#co': 'content',
      },
      ExpressionAttributeValues: {
        ':uid': data.userId,
        ':b': data.byUser,
        ':c': data.createdAt,
        ':u': data.user,
        ':d': data.data,
        ':co': data.content,
      },
      ConditionExpression: 'attribute_not_exists(#h)',
      ReturnValues: 'ALL_NEW',
    })
    .then<Report>(R.prop('Attributes'))
}

export type AddReportInput = {
  data: Report
}