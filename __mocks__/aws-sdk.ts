import {PutRecordInput} from 'aws-sdk/clients/firehose'
import {GetObjectRequest, PutObjectRequest} from 'aws-sdk/clients/s3'

const debug = function (...args: any[]) {
  console.log(...args)
}

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

const s3Store = {}
export class S3 {
  putObject(params: PutObjectRequest) {
    return {
      async promise() {
        debug('> mock, put object')
        debug(params)

        if (!s3Store[params.Bucket]) {
          s3Store[params.Bucket] = {}
        }
        s3Store[params.Bucket][params.Key] = params.Body

        return {
          ETag: '"6805f2cfc46c0f04559748bb039d69ae"',
          VersionId: 'pSKidl4pHBiNwukdbcPXAIs.sshFFOc0',
        }
      },
    }
  }
  getObject(params: GetObjectRequest) {
    return {
      async promise() {
        debug('> mock, get object')
        debug(params)

        console.log({s3Store})
        return {
          Body: s3Store[params.Bucket][params.Key]
        }
      },
    }
  }
}

export const DynamoDB = {
  DocumentClient: class {
    constructor() {
      if (!(this instanceof DynamoDB.DocumentClient)) {
        throw new Error('new')
      }

      const {DocumentClient} = require('aws-sdk/clients/dynamodb')
      const isTest = process.env.JEST_WORKER_ID
      const config = {
        convertEmptyValues: true,
        ...(isTest && {endpoint: 'localhost:8000', sslEnabled: false, region: 'local-env'}),
      }

      return new DocumentClient(config)
    }
  },
}
