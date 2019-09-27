import {DynamoDB} from 'aws-sdk'

const ddb = new DynamoDB.DocumentClient()

describe('mock', function () {
  it('dynamodb', async function (done) {
    await ddb
      .put({
        TableName: 'yiguana',
        Item: {
          id: '1',
          hello: 'world',
        },
      })
      .promise()

    const {Item} = await ddb
      .get({
        TableName: 'yiguana',
        Key: {
          id: '1',
        },
      })
      .promise()

    expect(Item).toEqual({
      id: '1',
      hello: 'world',
    })
    done()
  })
})