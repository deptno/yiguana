import {DynamoDBStreamHandler} from 'aws-lambda'
import {Firehose} from 'aws-sdk'
import {AttributeValue} from 'dynamodb-data-types'
import {compose, equals, path, prop} from 'ramda'

export const handler: DynamoDBStreamHandler = async (event, context) => {
  const inserted = event.Records.filter(insertOnly)
  if (inserted.length > 0) {
    console.log({insert: inserted.length, record: event.Records.length})
    const transformed = inserted
      .map(transform)
      .join('\n') + '\n'
    const buffer = Buffer.from(transformed)

    try {
      await firehose
        .putRecord({
          DeliveryStreamName: 'test-yiguana',
          Record            : {
            Data: buffer
          }
        })
        .promise()
    } catch (e) {
      console.error('error', {e})
    }
  }
}

const firehose = new Firehose()
const insertOnly = compose(equals('INSERT'), prop('eventName'))
const transform = compose(JSON.stringify, AttributeValue.unwrap, path(['dynamodb', 'NewImage']))
