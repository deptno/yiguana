import {CreateApiInput, PostDocument} from './common'

export async function removePost(operator: CreateApiInput, params: RemovePostInput) {
  const {dynamodb, tableName} = operator
  const {id} = params
  const range = 'post'
  // fixme update 삭제
  const response = await dynamodb.del({
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
//      console.log({wcu})
    }
  }
  return Boolean(response)
}
export type RemovePostInput = {
  id: PostDocument['id']
}
