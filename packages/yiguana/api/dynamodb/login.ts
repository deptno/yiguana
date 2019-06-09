import {DynamoDbApiInput, EType, UserDocument} from './common'
import {update} from '../../../dynamodb/common'
import {User} from '../../entity/user'
import {createRangeKey} from './key/range'
import {extractType} from './key/type'
import {createUpdateSet} from '../../../dynamodb/update-set'

export async function login(params: DynamoDbApiInput & LoginInput): Promise<UserDocument|undefined> {
  const {client, tableName, user} = params
  const {id, name, thumbnail} = user
  const range = createRangeKey(EType.User)
  const _type = extractType(range)
  const [setExpression, setKeys, setValues] = createUpdateSet({
    name,
    thumbnail,
    _type
  })
  // fixme 아래 코드 돌면 안됨
  const response = await update(client, {
    ReturnConsumedCapacity   : 'TOTAL',
    ReturnValues             : 'ALL_NEW',
    TableName                : tableName,
    Key                      : {
      id,
      range
    },
    UpdateExpression         : [
      'ADD #l :v',
      setExpression
    ].join(' '),
    ExpressionAttributeNames : {
      '#l': 'login',
      ...setKeys
    },
    ExpressionAttributeValues: {
      ':v': 1,
      ...setValues
    }
  })
  if (response) {
    return response.Attributes as UserDocument
  }
}

export type LoginInput = {
  user: Pick<User, 'id' | 'name'> & Partial<Pick<User, 'thumbnail'>>
}
