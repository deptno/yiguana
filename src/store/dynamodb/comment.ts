import {DynamoDBInput} from '../../entity/input/dynamodb'
import {YiguanaDocumentHash} from '../../dynamodb'
import {EEntity} from '../../entity/enum'

export function comment(operator: DynamoDBInput, params: CommentInput) {
  const {dynamodb, tableName} = operator
  const {hk} = params

  return dynamodb.get<Comment>({
    TableName: tableName,
    Key: {
      hk,
      rk: EEntity.Comment
    }
  })
}

export type CommentInput = YiguanaDocumentHash