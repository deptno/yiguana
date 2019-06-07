import {DynamoDbApiInput} from './common'
import {update} from '../../../dynamodb/common'
import {User} from '../../entity/user'

export async function login(params: DynamoDbApiInput & LoginInput) {
  const {client, tableName, user} = params
  const {id, name, thumbnail} = user
  const range = 'user'
  // fixme 아래 코드 돌면 안됨
  const response = await update(client, {
    ReturnConsumedCapacity   : 'TOTAL',
    ReturnValues             : 'ALL_NEW',
    TableName                : tableName,
    Key                      : {
      id,
      range
    },
    UpdateExpression         : 'SET #v = #v + :v',
    ExpressionAttributeNames : {
      '#v': 'login'
    },
    ExpressionAttributeValues: {
      ':v': 1
    }
  })
}
export type LoginInput = {
  user: User
}
