export async function commentPost(operator: {dynamodb, tableName}, params: CommentPostInput) {
  const {dynamodb, tableName} = operator
  const {data} = params
  const {hk} = data

  return dynamodb
    .update({
      TableName: tableName,
      Key: {
        hk,
        rk: Yiguana.EntityType.Post,
      },
      UpdateExpression: 'SET #v = #v + :v',
      ExpressionAttributeNames: {
        '#v': 'children',
      },
      ExpressionAttributeValues: {
        ':v': 1,
      },
      ReturnConsumedCapacity: 'TOTAL',
      ReturnValues: 'ALL_NEW',
    })
    .then<Comment>(response => response.Attributes)
}

export type CommentPostInput = {
  data: Yiguana.Document
}
