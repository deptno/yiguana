import {DynamoDBInput} from '../../entity/input/dynamodb'

export async function commentsByUserId(operator: DynamoDBInput, params: CommentsInput) {
  const {tableName, dynamodb} = operator
  const {postId, nextToken} = params

  // todo

  return []
}

export type CommentsInput = {
  postId: string
  nextToken?: string
}
