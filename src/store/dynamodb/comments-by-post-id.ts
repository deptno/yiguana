export function commentsByPostId<T = Comment>(operator: {dynamodb, tableName}, params: CommentsByPostIdInput) {
  const {tableName, dynamodb} = operator
  const {postId, nextToken} = params

  // todo
  const queryParams = {
    TableName: tableName,
    IndexName: Yiguana.IndexType.comments,
    KeyConditionExpression: '#h = :h',
    ExpressionAttributeNames: {
      '#h': 'postId',
    },
    ExpressionAttributeValues: {
      ':h': postId,
    },
    ScanIndexForward: false,
    ReturnConsumedCapacity: 'TOTAL',
  }
  return dynamodb.query<T>(queryParams)
}

export type CommentsByPostIdInput = {
  postId: string
  nextToken?: string
}
