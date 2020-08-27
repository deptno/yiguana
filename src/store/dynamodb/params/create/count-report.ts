export function likePost(operator: {dynamodb, tableName}, params: LikePostInput) {
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
        '#v': 'likes',
      },
      ExpressionAttributeValues: {
        ':v': 1,
      },
      ReturnValues: 'ALL_NEW',
    })
    .then<Post>(response => response.Attributes)
}
export type LikePostInput = {
  data: Yiguana.Document
}
