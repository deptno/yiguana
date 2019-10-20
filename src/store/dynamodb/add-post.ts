import {DynamoDBInput} from '../../entity/input/dynamodb'
import {Post} from '../../entity/post'

export async function addPost(operator: DynamoDBInput, params: AddPostInput): Promise<Post> {
  const {dynamodb, tableName} = operator

  return dynamodb.put({
    TableName: tableName,
    Item: dynamodb.util.js2DdbDoc(params.data),
    ReturnValues: 'ALL_OLD'
  })
}

export type AddPostInput = {
  data: Post
}
