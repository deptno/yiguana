import {DynamoDBInput} from '../../entity/input/dynamodb'
import {Post} from '../../entity/post'
import {EEntity, YiguanaDocumentHash} from '../../type'

export function post(operator: DynamoDBInput, params: PostInput) {
  const {dynamodb, tableName} = operator
  const {hk} = params

  return dynamodb.get<Post>({
    TableName: tableName,
    Key: {
      hk,
      rk: EEntity.Post
    }
  })
}

export type PostInput = YiguanaDocumentHash
