import {DynamoDBInput} from './common'

export async function removeComment(operator: DynamoDBInput, params: RemoveCommentInput) {
  const {dynamodb, tableName} = operator
  const {id} = params
  const rk = 'post'
  // todo 지우지말고 내용으로 변경 해야한다. CommentReply 는 문제 없이 보여야 함
  const response = await dynamodb.del({
    ReturnConsumedCapacity: 'TOTAL',
    TableName             : tableName,
    Key                   : {
      id,
      rk
    }
  })
  if (response) {
    if (response.ConsumedCapacity) {
      const wcu = response.ConsumedCapacity.CapacityUnits
      console.log({wcu})
    }
  }

  return Boolean(response)
}
export type RemoveCommentInput = {
  id: string
}
