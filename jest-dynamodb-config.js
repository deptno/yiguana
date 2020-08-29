module.exports = {
  tables : [
    {
      'TableName'             : 'test-yiguana',
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
      'GlobalSecondaryIndexes': [
        createGsi('byUser', 'userId', 'byUser'),
        createGsi('posts', 'rk', 'posts'),
        createGsi('postsByCategory', 'rk', 'category'),
        createGsi('comments', 'postId', 'comments'),
        createGsi('reports', 'agg', 'reports'),
        createGsi('reportsEnd', 'agg', 'reportsEnd'),
      ],
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
          'AttributeName': 'agg',
          'AttributeType': 'S'
        },
        {
          'AttributeName': 'reports',
          'AttributeType': 'S'
        },
        {
          'AttributeName': 'reportsEnd',
          'AttributeType': 'S'
        }
      ],
      'ProvisionedThroughput' : {
        'ReadCapacityUnits' : 1,
        'WriteCapacityUnits': 1
      },
      'StreamSpecification'   : {
        'StreamEnabled' : true,
        'StreamViewType': 'NEW_IMAGE'
      },
    }
    // etc
  ],
  port   : 8000
}

function createGsi(name, hash, range) {
  return {
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
  }
}