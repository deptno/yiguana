import {PutRecordInput} from 'aws-sdk/clients/firehose'

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
