import {DynamoDBInput} from '../../entity/input/dynamodb'
import {EEntity} from '../../entity/enum'
import {Member} from '../../entity/user'
import {LikeInput} from '../../entity/like/user-input'
import {Like} from '../../entity/like'
import {EIndexName} from '../../entity/dynamodb/enum'

export async function getLike<T = Like>(operator: DynamoDBInput, params: GetLikeInput) {
  const {dynamodb, tableName} = operator
  const {user, data} = params
  const {entity, targetId, createdAt} = data

  /* FIXME:
   *  사실 여기에서 query가 아니라 get을 사용하고 싶은데 get을 사용하자니 like.hk를 몰라서 query 처리
   *  그러다 보니 분명 "user.id#post#post.hk"로 들어있는 like는 하나일 텐데도 items를 리턴하게 되는 상황...
   *  뭔가 더 깔끔한 방법은 없을지...
   */
  const queryParams = {
    TableName: tableName,
    IndexName: EIndexName.RkLike,
    KeyConditionExpression: '#h = :h AND #r = :r',
    ExpressionAttributeNames: {
      '#h': 'rk',
      '#r': 'like',
    },
    ExpressionAttributeValues: {
      ':h': EEntity.Like,
      ':r': [user.id, entity, targetId].join('#')
    },
    ScanIndexForward: false,
    ReturnConsumedCapacity: 'TOTAL',
    limit: 1,
  }
  return dynamodb.query<T>(queryParams)
}

export type GetLikeInput = {
  data: LikeInput
  user: Member
}
