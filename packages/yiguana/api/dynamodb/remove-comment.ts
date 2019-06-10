import {DynamoDbApiInput, PostDocument} from './common'
import {del} from '../../../dynamodb/common'

export async function removeComment(params: DynamoDbApiInput & RemoveCommentInput) {
  const {client, tableName, id} = params
  const range = 'post'
  // todo 지우지말고 내용으로 변경 해야한다. CommentReply 는 문제 없이 보여야 함
  const response = await del(client, {
    ReturnConsumedCapacity: 'TOTAL',
    TableName             : tableName,
    Key                   : {
      id,
      range
    }
  })
  if (response) {
    if (response.ConsumedCapacity) {
      const wcu = response.ConsumedCapacity.CapacityUnits
//      console.log({wcu})
    }
  }
  return Boolean(response)
}
export type RemoveCommentInput = {
  id: string
}
