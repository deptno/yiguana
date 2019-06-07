import {createDynamoDbEngine} from './api/dynamodb/dynamodb'
import {DynamoDbApiInput} from './api/dynamodb/common'

export function createYiguana(params: CreateInput) {
  return createDynamoDbEngine(params)
}

type CreateInput = DynamoDbApiInput
