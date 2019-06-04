import {paginationQuerySafe} from '../../../../dynamodb/common'
import {Post} from '../../../entity/post'
import {CreateInput} from '../dynamodb'

export function curryList(curryParams: CreateInput) {
  const {tableName, boardName, client} = curryParams
  return (params: ListInput = {}) => {
    const {nextToken, order} = params
    const category = ''
//    const [index, hash, range] = _getIndex(order)
    return paginationQuerySafe<Post>(
      client,
      {
        TableName                : tableName,
        IndexName                : EIndexName.BoardOrderIndex,
        KeyConditionExpression   : '#p = :p and begins_with(#r, :r)',
        ExpressionAttributeNames : {
          '#p': 'board',
          '#r': 'order',
        },
        ExpressionAttributeValues: {
          ':p': boardName,
          ':r': [boardName, category].join('#')
        },
        ReturnConsumedCapacity: 'TOTAL'
      },
      nextToken
    )
  }
}

enum EIndexName {
  BoardOrderIndex     = 'board-order-index'
}
export enum EOrder {
  Default  = 'default',
  Category = 'category'
}
export type ListInput = {
  nextToken?: string
  order?: EOrder
}

