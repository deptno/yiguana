import {DocumentClient} from 'aws-sdk/lib/dynamodb/document_client'
import {DynamoDBInput} from '../../entity/input/dynamodb'
import {Comment} from '../../entity/comment'
import {EEntity} from '../../entity/enum'
import {YiguanaDocumentHash} from '../../dynamodb/yiguana-document'

export async function replyComment(operator: DynamoDBInput, params: ReplyCommentInput) {
  const {dynamodb} = operator
  const response = await dynamodb.update({
    ReturnConsumedCapacity: 'TOTAL',
    ReturnValues          : 'ALL_NEW',
    ...commentPostParams(operator, params)
  })

  if (response) {
    return response.Attributes as Comment
  }
}
export function commentPostParams(operator: DynamoDBInput, params: ReplyCommentInput): DocumentClient.Update {
  const {tableName} = operator
  const {data} = params
  const {hk} = data

  return {
    TableName                : tableName,
    Key                      : {
      hk,
      rk: EEntity.Post,
    },
    UpdateExpression         : 'SET #v = #v + :v',
    ExpressionAttributeNames : {
      '#v': 'children'
    },
    ExpressionAttributeValues: {
      ':v': 1
    }
  }
}

export type ReplyCommentInput = {
  data: YiguanaDocumentHash
}
