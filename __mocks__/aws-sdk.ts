import {PutRecordInput} from 'aws-sdk/clients/firehose'
import {PutObjectRequest} from 'aws-sdk/clients/s3'

export class Firehose {
  putRecord(params: PutRecordInput) {
    return {
      async promise() {
        console.log('> mock, put record')
        console.log(params.Record.Data.toString())
        console.log('< mock')
      }
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
      }
    }
  }
}
