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
          'AttributeName': 'posts',
          'AttributeType': 'S'
        },
        {
          'AttributeName': 'comments',
          'AttributeType': 'S'
        },
        {
          'AttributeName': 'category',
          'AttributeType': 'S'
        },
        {
          'AttributeName': 'byUser',
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
        createGsi('byUser', 'userId', 'byUser'),
        createGsi('posts', 'rk', 'posts'),
        createGsi('postsByCategory', 'rk', 'category'),
        createGsi('comments', 'postId', 'comments'),
        createGsi('reports', 'rk', 'reports'),
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
