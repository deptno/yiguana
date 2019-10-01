import {createDynamoDB} from '@deptno/dynamodb'

export type DynamoDBInput = {
  dynamodb: ReturnType<typeof createDynamoDB>
  tableName: string
}