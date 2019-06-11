import {
  BatchGetRequestMap,
  BatchGetResponseMap,
  BatchWriteItemRequestMap,
  DocumentClient,
  PutItemInputAttributeMap, TransactWriteItem,
  WriteRequest,
} from 'aws-sdk/clients/dynamodb'
import {flatten, splitEvery} from 'ramda'
import {createToken, parseToken} from './token'
import {ddbClient} from '../../__tests__/env'

const putError = [
  'ValidationException',
  'ConditionalCheckFailedException'
]

export async function put<T>(ddbClient: DocumentClient, params: DocumentClient.PutItemInput) {
  try {
    await ddbClient
      .put(params)
      .promise()
    return params.Item as Promise<T>
  } catch (e) {
    console.error('put', e.code, params.Item)
    if (!putError.includes(e.code)) {
      console.error(e)
    }
    return null
  }
}
export async function update<T>(ddbClient: DocumentClient, params: DocumentClient.UpdateItemInput) {
  try {
    const response = await ddbClient
      .update(params)
      .promise()
    return response
  } catch (e) {
    console.error('update', e.code, params)
    if (!putError.includes(e.code)) {
      console.error(e)
    }
    console.error(e)
    return null
  }
}
export async function get<T>(ddbClient: DocumentClient, params: DocumentClient.GetItemInput) {
  try {
    const response = await ddbClient
      .get(params)
      .promise()

    console.log({
      key: params.Key,
      rcu: response.ConsumedCapacity,
    })

    return response.Item as Promise<T>
  } catch (e) {
    console.error('get')
    console.error(params)
    console.error(e)
    return
  }
}
export async function scan(ddbClient: DocumentClient, params: DocumentClient.ScanInput) {
  try {
    const response = await ddbClient
      .scan(params)
      .promise()
    return response.Items
  } catch (e) {
    console.error('scan')
    console.error(e)
    return []
  }
}
export async function scanAll<T>(ddbClient: DocumentClient, params: DocumentClient.ScanInput): Promise<T[]> {
  const items: any[] = []
  let consumedCapacity = 0
  let nextKey

  try {
    do {
      const response = await ddbClient
        .scan({
          ...params,
          ReturnConsumedCapacity: 'TOTAL',
          ExclusiveStartKey     : nextKey,
        })
        .promise()
      nextKey = response.LastEvaluatedKey
      items.push(...response.Items!)
      if (response.ConsumedCapacity) {
        // DynamoDB local doesn't honor `ConsumedCapacity`
        consumedCapacity += response.ConsumedCapacity.CapacityUnits || 0
      }
    } while (nextKey)

    console.log(`scanAll, rcu ${consumedCapacity} ${items.length} items`)
    return items
  } catch (e) {
    console.error('scanAll')
    console.error(e)
    return []
  }
}
export async function scanAllSegmented<T>(ddbClient: DocumentClient, segmentCount: number, params: DocumentClient.ScanInput): Promise<T[]> {
  const nested = await Promise.all(
    Array(segmentCount)
      .fill(0)
      .map((_, index) => scanAll<T>(ddbClient, {
        ...params,
        TotalSegments: segmentCount,
        Segment      : index,
      }))
  )

  return flatten<T>(nested)
}
export async function queryAll<T>(ddbClient: DocumentClient, params: DocumentClient.QueryInput): Promise<T[]> {
  const items: any[] = []
  let consumedCapacity = 0
  let nextKey

  try {
    do {
      const response = await ddbClient
        .query({
          ...params,
          ReturnConsumedCapacity: 'TOTAL',
          ExclusiveStartKey     : nextKey,
        })
        .promise()
      nextKey = response.LastEvaluatedKey
      items.push(...response.Items!)
      if (response.ConsumedCapacity) {
        // DynamoDB local doesn't honor `ConsumedCapacity`
        consumedCapacity += response.ConsumedCapacity.CapacityUnits || 0
      }
    } while (nextKey)

    console.log(`queryAll, rcu ${consumedCapacity} ${items.length} items`)
    return items
  } catch (e) {
    console.error('queryAll')
    console.error(e)
    console.error(params)
    return []
  }
}
export async function querySafe<T>(ddbClient: DocumentClient, params: DocumentClient.QueryInput): Promise<T[]> {
  const response = await paginationQuerySafe<T>(ddbClient, params)
  return response.items
}
export async function paginationQuerySafe<T>(ddbClient: DocumentClient, params: DocumentClient.QueryInput, nextToken?): Promise<PaginationResult<T>> {
  try {
    if (nextToken) {
      params.ExclusiveStartKey = parseToken(nextToken)
    }
    const response = await ddbClient
      .query(params)
      .promise()

//    console.log(JSON.stringify({
//      rcu      : response.ConsumedCapacity.CapacityUnits,
//      condition: params.KeyConditionExpression,
//      values   : params.ExpressionAttributeValues,
//    }))

    return {
      items      : response.Items as T[],
      nextToken  : createToken(response.LastEvaluatedKey!),
      firstResult: !Boolean(params.ExclusiveStartKey)
    }
  } catch (e) {
    console.error('query')
    console.error(e)
    console.error(params)
    return {
      items: [],
    }
  }
}
export async function del(ddbClient: DocumentClient, params: DocumentClient.DeleteItemInput) {
  try {
    const response = await ddbClient
      .delete(params)
      .promise()
    return response
  } catch (e) {
    console.error('del')
    console.error(e)
    console.error(params)
    return null
  }
}
export async function batchGet(ddbClient: DocumentClient, params: DocumentClient.BatchGetItemInput) {
  try {
    const response = await ddbClient
      .batchGet(params)
      .promise()
    return response
  } catch (e) {
    console.error('error batchGet')
    console.error(e)
    console.error(JSON.stringify(params))
    return
  }
}
export async function batchGetMassive<T>(ddbClient: DocumentClient, tableName: string, keysList: object[]): Promise<[T[], number]> {
  const chunks = by100(keysList)
  const promises = chunks
    .map((keys): DocumentClient.BatchGetRequestMap => ({
      [tableName]: {
        Keys: keys,
      }
    }))
    .map(mapRequests => _batchGetMassive(ddbClient, tableName, mapRequests))
  const responses: any[] = await Promise.all(promises)
  const [items, unprocessedItems, rcu] = responses.reduce((acc, [responses, mapRequests, wcu]) => {
      const items = responses[tableName]
      if (items) {
        acc[0].push(...items)
      }
      const unprocessedItems = mapRequests[tableName]
      if (unprocessedItems) {
        acc[1].push(...unprocessedItems.Keys)
      }
      acc[2] += wcu
      return acc
    }, [[], [], 0]
  )
  if (unprocessedItems.length > 0) {
    console.log({'retry unprocessedItems': unprocessedItems.length})
    const [chunkedItems, chunkedRcu] = await batchGetMassive(ddbClient, tableName, unprocessedItems)
    return [
      [...chunkedItems, ...items],
      rcu + chunkedRcu
    ]
  }
  return [items, rcu]
}
async function _batchGetMassive<T>(ddbClient: DocumentClient, tableName: string, mapRequests: DocumentClient.BatchGetRequestMap)
  : Promise<[BatchGetResponseMap, BatchGetRequestMap, number]> {
  const response = await batchGet(ddbClient, {
    RequestItems          : mapRequests,
    ReturnConsumedCapacity: 'TOTAL'
  })
  if (response) {
    return [
      response.Responses!,
      response.UnprocessedKeys!,
      response.ConsumedCapacity
        ? response.ConsumedCapacity[0].CapacityUnits || 0
        : 0
    ]
  }
  return [{}, {}, 0]
}
export async function batchWrite(ddbClient: DocumentClient, params: DocumentClient.BatchWriteItemInput) {
  try {
    const response = await ddbClient
      .batchWrite(params)
      .promise()
    return response
  } catch (e) {
    console.error('error batchWrite')
    console.error(e)
    console.error(JSON.stringify(params))
    return
  }
}
export async function batchWriteMassive<T>(ddbClient: DocumentClient, tableName: string, items: T[], mode: BatchWriteMassiveType = 'put'): Promise<number> {
  if (items.length === 0) {
    return 0
  }
  const [pack, unpack] = mode === 'put'
    ? [_packPutRequest, _unpackPutRequest]
    : [_packDeleteRequest, _unpackDeleteRequest]
  const chunks = by25<T>(items)
  const promises = chunks
    .map((items): BatchWriteItemRequestMap => ({
      [tableName]: items.map(pack)
    }))
    .map(mapRequests => _batchWriteMassive(ddbClient, tableName, mapRequests))
  const responses = await Promise.all(promises)

  const [unprocessedItems, wcu] = responses.reduce((acc, [mapRequests, wcu]) => {
    const unprocessedItems = mapRequests[tableName]
    if (unprocessedItems) {
      acc[0].push(...unprocessedItems.map(unpack))
    }
    acc[1] += wcu
    return acc
  }, [[] as any[], 0])
  console.log({
    try    : items.length,
    success: items.length - unprocessedItems.length,
    retry   : unprocessedItems.length
  })
  if (unprocessedItems.length > 0) {
    return wcu + await batchWriteMassive(ddbClient, tableName, unprocessedItems)
  }
  return wcu
}
function _packPutRequest(item: PutItemInputAttributeMap): WriteRequest {
  return {PutRequest: {Item: item}}
}
function _unpackPutRequest<T>(item: WriteRequest) {
  return item.PutRequest!.Item as unknown as T
}
function _packDeleteRequest(key): WriteRequest {
  return {DeleteRequest: {Key: key}}
}
function _unpackDeleteRequest<T>(item: WriteRequest) {
  return item.DeleteRequest!.Key
}
type BatchWriteMassiveType = 'put' | 'delete'
async function _batchWriteMassive<T>(ddbClient: DocumentClient, tableName: string, mapRequests: BatchWriteItemRequestMap): Promise<[BatchWriteItemRequestMap, number]> {
  const response = await batchWrite(ddbClient, {
    RequestItems          : mapRequests,
    ReturnConsumedCapacity: 'TOTAL'
  })
  if (response) {
    return [
      response.UnprocessedItems!,
      response.ConsumedCapacity
        ? response.ConsumedCapacity[0].CapacityUnits || 0
        : 0
    ]
  }
  return [{}, 0]
}
const by25 = splitEvery(25)
const by100 = splitEvery(100)

export async function transactWrite(transactionParams: DocumentClient.TransactWriteItemList) {
  const response = await ddbClient
    .transactWrite({
      ReturnConsumedCapacity: 'TOTAL',
      TransactItems: transactionParams
    })
    .promise()
  if (response) {
    console.log({'transaction response': response})
    return response
  }
}

export type PaginationResult<T> = {
  items: T[]
  nextToken?: string
  firstResult?: boolean
}
