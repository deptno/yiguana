export function commentsByPostId<T = Comment>(tableName: string, params: Input) {
  const {postId, nextToken} = params

  return {
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
}

type Input = {
  postId: string
  // todo: 얘 써야할 듯
  nextToken?: string
}
