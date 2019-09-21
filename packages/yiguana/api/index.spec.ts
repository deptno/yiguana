import {YiguanaApi} from './index'
import {ddbClient, tableName} from '../../../__tests__/env'

jest.unmock('aws-sdk')

describe('yiguana api', function () {
  it('should create instance', function () {
    new YiguanaApi({
      tableName,
      dynamodb: ddbClient
    })
  })
})
