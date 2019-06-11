import {DynamoDbApiInput, PostDocument} from './common'
import {update} from '../../../dynamodb/common'
import {DocumentClient} from 'aws-sdk/lib/dynamodb/document_client'

export async function commentPost(params: DynamoDbApiInput & CommentPostInput) {
  const {client} = params
  const response = await update(client, {
    ReturnConsumedCapacity: 'TOTAL',
    ReturnValues          : 'ALL_NEW',
    ...commentPostParams(params)
  })
  if (response) {
    if (response.ConsumedCapacity) {
      const wcu = response.ConsumedCapacity.CapacityUnits
//      console.log({wcu})
    }
    return response.Attributes as PostDocument
  }
}
export function commentPostParams(params: DynamoDbApiInput & CommentPostInput): DocumentClient.Update {
  const {tableName, post} = params
  const {id, range} = post
  return {
    TableName                : tableName,
    Key                      : {
      id,
      range
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
  post: Pick<PostDocument, 'id' | 'range'>
}
