import {DynamoDBInput, EType, PostDocument} from './common'
import {createPostOrderKey} from './key/order'
import {createHashKey} from './key/id'
import {createRangeKey} from './key/range'
import {Post} from '../../entity/dynamodb'

export async function addPost(operator: DynamoDBInput, params: AddPostInput) {
  const {dynamodb, tableName} = operator
  const {createdAt, category, ...ddbPost} = params.post

  // todo post validation

  const hk = createHashKey()
  const rk = createRangeKey(EType.Post)
  // todo: 밖으로 옮기고 선 s3 후 dynamodb 작업

  const item: PostDocument = dynamodb.util.js2DdbDoc({
    hk,
    rk,
    category,
    createdAt,
    ...ddbPost,
  })

  return dynamodb.put({
    TableName: tableName,
    Item: item,
  })
}

export type AddPostInput = {
  post: Post
}
