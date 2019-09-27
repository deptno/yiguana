import {PutRecordInput} from 'aws-sdk/clients/firehose'
import {PutObjectRequest} from 'aws-sdk/clients/s3'

export class Firehose {
  putRecord(params: PutRecordInput) {
    return {
      async promise() {
        console.log('> mock, put record')
        console.log(params.Record.Data.toString())
        console.log('< mock')
      },
    }
  }
}

export class S3 {
  putObject(params: PutObjectRequest) {
    return {
      async promise() {
        console.log('> mock, put object')
        console.log(params)
        console.log('< mock')
      },
    }
  }
}


export class DynamoDB {
  static DocumentClient = class {
    constructor() {
      if (this instanceof DynamoDB.DocumentClient) {
        const {DocumentClient} = require('aws-sdk/clients/dynamodb')
        const isTest = process.env.JEST_WORKER_ID
        const config = {
          convertEmptyValues: true,
          ...(isTest && {endpoint: 'localhost:8000', sslEnabled: false, region: 'local-env'}),
        }
        return new DocumentClient(config)
      }
      throw new Error('new')
    }
  }
}
