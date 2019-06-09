import {DynamoDbApiInput, PostDocument} from './common'
import {del} from '../../../dynamodb/common'

export async function removePost(params: DynamoDbApiInput & RemovePostInput) {
  const {client, tableName, id} = params
  const range = 'post'
  const response = await del(client, {
    ReturnConsumedCapacity: 'TOTAL',
    TableName             : tableName,
    Key                   : {
      id,
      range
    }
  })
  if (response) {
    if (response.ConsumedCapacity) {
      const wcu = response.ConsumedCapacity.CapacityUnits
      console.log({wcu})
    }
  }
  return Boolean(response)
}
export type RemovePostInput = {
  id: PostDocument['id']
}
