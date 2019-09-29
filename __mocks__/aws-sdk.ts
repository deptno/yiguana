import {PutRecordInput} from 'aws-sdk/clients/firehose'
import {PutObjectRequest} from 'aws-sdk/clients/s3'

const debug = function(...args: any[]) {}

export class Firehose {
  putRecord(params: PutRecordInput) {
    return {
      async promise() {
        debug('> mock, put record')
        debug(params.Record.Data.toString())
        debug('< mock')
      },
    }
  }
}

export class S3 {
  putObject(params: PutObjectRequest) {
    return {
      async promise() {
        debug('> mock, put object')
        debug(params)
        debug('< mock')
        return {
          ETag: '"6805f2cfc46c0f04559748bb039d69ae"',
          VersionId: 'pSKidl4pHBiNwukdbcPXAIs.sshFFOc0',
        }
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
