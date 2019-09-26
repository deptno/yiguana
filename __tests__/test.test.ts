const {DocumentClient} = require('aws-sdk/clients/dynamodb')
const isTest = process.env.JEST_WORKER_ID
const config = {
  convertEmptyValues: true,
  ...(isTest && {endpoint: 'localhost:8000', sslEnabled: false, region: 'local-env'}),
}
const ddb = new DocumentClient(config)

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