import {APIGatewayProxyHandler} from 'aws-lambda'
import {Yiguana} from '../packages/yiguana'
import {DynamoDB} from 'aws-sdk'

export const addPost: APIGatewayProxyHandler = async (event, context) => {
  return {
    statusCode: 200,
    body: ''
  }
}

const yiguana = new Yiguana({
  tableName: `${process.env.NODE_ENV}-yiguana`,
  client: new DynamoDB.DocumentClient()
})
