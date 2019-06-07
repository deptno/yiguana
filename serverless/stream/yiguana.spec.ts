import {handler} from './yiguana'
import {Context, DynamoDBStreamEvent} from 'aws-lambda'

describe('stream', function () {
  const event = {
    'Records': [
      {
        'eventID'       : '7d434a2936afe6d9ecdb715dffb20471',
        'eventName'     : 'INSERT',
        'eventVersion'  : '1.1',
        'eventSource'   : 'aws:dynamodb',
        'awsRegion'     : 'ap-northeast-2',
        'dynamodb'      : {
          'ApproximateCreationDateTime': 1559840261,
          'Keys'                       : {
            'range': {
              'S': 'post'
            },
            'id'   : {
              'S': 'c3611c58-c1a1-4326-972b-c165ede6977d'
            }
          },
          'NewImage'                   : {
            's3'      : {
              'S': 's3://'
            },
            'comments': {
              'N': '0'
            },
            'author'  : {
              'M': {
                'thumbnail': {
                  'S': 'https://thumb'
                },
                'name'     : {
                  'S': 'userName'
                }
              }
            },
            '_type'   : {
              'S': 'post'
            },
            'range'   : {
              'S': 'post'
            },
            'authorId': {
              'S': 'userId'
            },
            'title'   : {
              'S': 'mukbang post'
            },
            'id'      : {
              'S': 'c3611c58-c1a1-4326-972b-c165ede6977d'
            },
            'category': {
              'S': 'mukbang'
            },
            'board'   : {
              'S': 'ent'
            },
            'views'   : {
              'N': '0'
            },
            'likes'   : {
              'N': '0'
            },
            'order'   : {
              'S': 'ent#mukbang#2019-06-06T16:57:40.716Z'
            }
          },
          'SequenceNumber'             : '1629200000000003462743072',
          'SizeBytes'                  : 271,
          'StreamViewType'             : 'NEW_IMAGE'
        },
        'eventSourceARN': 'arn:aws:dynamodb:ap-northeast-2:104396725042:table/test-yiguana/stream/2019-06-06T06:41:13.015'
      }
    ]
  } as DynamoDBStreamEvent
  const context = {
    'callbackWaitsForEmptyEventLoop': true,
    'functionVersion'               : '$LATEST',
    'functionName'                  : 'yiguana-dev-stream',
    'memoryLimitInMB'               : '128',
    'logGroupName'                  : '/aws/lambda/yiguana-dev-stream',
    'logStreamName'                 : '2019/06/06/[$LATEST]9000e1c6dbed426f82f526f78250ee32',
    'invokedFunctionArn'            : 'arn:aws:lambda:ap-northeast-2:104396725042:function:yiguana-dev-stream',
    'awsRequestId'                  : 'c552763a-0f8f-49d9-809b-fbab7b571950'
  } as unknown as Context
  const noop = function() {}
  it('INSERT', function () {
    handler(event, context, noop)
  })
})


