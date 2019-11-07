import {DynamoDBInput} from '../../entity/input/dynamodb'
import {User} from '../../entity/user'

export async function addUser(operator: DynamoDBInput, params: AddUserInput): Promise<User> {
  const {dynamodb, tableName} = operator
  const {data} = params
  console.log({data})

  // FIXME: 유저가 회원인지 비회원인지에 따라서 User 객체의 값이 달라서... 분기가 필요하긴 한데... 지금 너무 구린
  //  그리고 심지어 PUT 에러나......
  let item = {}
  if ('id' in data) {
    item = {
      'userId': data.id,
      'user': {
       'name': data.name,
       'ip': data.ip,
      }
    }
  } else {
    item = {
      'user': {
        'name': data.name,
        'ip': data.ip,
        'pw': data.pw,
      }
    }
  }

  return dynamodb.put({
    TableName: tableName,
    Item: dynamodb.util.js2DdbDoc(item),
    ReturnValues: 'ALL_OLD'
  })
}

export type AddUserInput = {
  data: User
}
