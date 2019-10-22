import {DocumentClient} from 'aws-sdk/lib/dynamodb/document_client'
import {DynamoDBInput} from '../../entity/input/dynamodb'
import {Post} from '../../entity/post'
import {YiguanaDocumentHash} from '../../dynamodb/yiguana-document'
import {EEntity} from '../../entity/enum'

export async function commentPost(operator: DynamoDBInput, params: CommentPostInput) {
  const {dynamodb} = operator
  const response = await dynamodb.update({
    ReturnConsumedCapacity: 'TOTAL',
    ReturnValues          : 'ALL_NEW',
    ...commentPostParams(operator, params)
  })
  if (response) {
    return response.Attributes as Post
  }
}
export function commentPostParams(operator: DynamoDBInput, params: CommentPostInput): DocumentClient.Update {
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
export type CommentPostInput = {
  data: YiguanaDocumentHash
}
