import {createDynamoDbEngine} from './api/dynamodb/dynamodb'
import {DynamoDbApiInput} from './api/dynamodb/common'
import {YiguanaApi} from './api'

export function createYiguana(params: CreateInput) {
  return createDynamoDbEngine(params)
}
export function yiguana(params: CreateInput) {

}

export class Yiguana extends YiguanaApi {}

type CreateInput = DynamoDbApiInput
