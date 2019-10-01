import {DocumentClient} from 'aws-sdk/lib/dynamodb/document_client'
import {DynamoDBInput} from '../../entity/input/dynamodb'
import {Post} from '../../entity/post'

export async function commentPost(operator: DynamoDBInput, params: CommentPostInput) {
  const {dynamodb} = operator
  const response = await dynamodb.update({
    ReturnConsumedCapacity: 'TOTAL',
    ReturnValues          : 'ALL_NEW',
    ...commentPostParams(operator, params)
  })
  if (response) {
    if (response.ConsumedCapacity) {
      const wcu = response.ConsumedCapacity.CapacityUnits
      console.log({wcu})
    }
    return response.Attributes as Post
  }
}
export function commentPostParams(operator: DynamoDBInput, params: CommentPostInput): DocumentClient.Update {
  const {tableName} = operator
  const {post} = params
  const {hk, rk} = post
  return {
    TableName                : tableName,
    Key                      : {
      hk,
      rk,
    },
    UpdateExpression         : 'SET #v = #v + :v',
    ExpressionAttributeNames : {
      '#v': 'comments'
    },
    ExpressionAttributeValues: {
      ':v': 1
    }
  }

}
export type CommentPostInput = {
  post: Post
}
