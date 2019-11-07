const createGsi = (name, hash, range) => ({
  'IndexName'            : name,
  'KeySchema'            : [
    {
      'AttributeName': hash,
      'KeyType'      : 'HASH'
    },
    {
      'AttributeName': range,
      'KeyType'      : 'RANGE'
    }
  ],
  'Projection'           : {
    'ProjectionType': 'ALL'
  },
  'ProvisionedThroughput': {
    'ReadCapacityUnits' : 1,
    'WriteCapacityUnits': 1
  },
})


module.exports = {
  tables: [
    {
      'AttributeDefinitions'  : [
        {
          'AttributeName': 'commentId',
          'AttributeType': 'S'
        },
        {
          'AttributeName': 'category',
          'AttributeType': 'S'
        },
        {
          'AttributeName': 'createdAt',
          'AttributeType': 'S'
        },
        {
          'AttributeName': 'hk',
          'AttributeType': 'S'
        },
        {
          'AttributeName': 'order',
          'AttributeType': 'S'
        },
        {
          'AttributeName': 'postId',
          'AttributeType': 'S'
        },
        {
          'AttributeName': 'rk',
          'AttributeType': 'S'
        },
        {
          'AttributeName': 'userId',
          'AttributeType': 'S'
        },
        {
          'AttributeName': 'like',
          'AttributeType': 'S'
        }
      ],
      'TableName'             : 'yiguana',
      'KeySchema'             : [
        {
          'AttributeName': 'hk',
          'KeyType'      : 'HASH'
        },
        {
          'AttributeName': 'rk',
          'KeyType'      : 'RANGE'
        }
      ],
      'ProvisionedThroughput' : {
        'ReadCapacityUnits' : 1,
        'WriteCapacityUnits': 1
      },
      'GlobalSecondaryIndexes': [
        createGsi('byUser', 'userId', 'order'),
        createGsi('postsByCategoryCreatedAt', 'rk', 'category'),
        createGsi('commentsByCreated', 'postId', 'order'),
        createGsi('replies', 'commentId', 'order'),
        createGsi('rk-like-index', 'rk', 'like'),
      ],
      'StreamSpecification'   : {
        'StreamEnabled' : true,
        'StreamViewType': 'NEW_IMAGE'
      },
    }
    // etc
  ],
  port  : 8000
}
