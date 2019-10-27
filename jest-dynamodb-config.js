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
        'ReadCapacityUnits'     : 1,
        'WriteCapacityUnits'    : 1
      },
      'GlobalSecondaryIndexes': [
        {
          'IndexName'            : 'by-user',
          'KeySchema'            : [
            {
              'AttributeName': 'userId',
              'KeyType'      : 'HASH'
            },
            {
              'AttributeName': 'order',
              'KeyType'      : 'RANGE'
            }
          ],
          'Projection'           : {
            'ProjectionType': 'ALL'
          },
          'ProvisionedThroughput': {
            'ReadCapacityUnits'     : 1,
            'WriteCapacityUnits'    : 1
          },
        },
        {
          'IndexName'            : 'userId-order-index',
          'KeySchema'            : [
            {
              'AttributeName': 'userId',
              'KeyType'      : 'HASH'
            },
            {
              'AttributeName': 'category',
              'KeyType'      : 'RANGE'
            }
          ],
          'Projection'           : {
            'ProjectionType': 'ALL'
          },
          'ProvisionedThroughput': {
            'ReadCapacityUnits'     : 1,
            'WriteCapacityUnits'    : 1
          },
        },
        {
          'IndexName'            : 'rk-category-index',
          'KeySchema'            : [
            {
              'AttributeName': 'rk',
              'KeyType'      : 'HASH'
            },
            {
              'AttributeName': 'category',
              'KeyType'      : 'RANGE'
            }
          ],
          'Projection'           : {
            'ProjectionType': 'ALL'
          },
          'ProvisionedThroughput': {
            'ReadCapacityUnits'     : 1,
            'WriteCapacityUnits'    : 1
          },
        },
        {
          'IndexName'            : 'board-order-index',
          'KeySchema'            : [
            {
              'AttributeName': 'rk',
              'KeyType'      : 'HASH'
            },
            {
              'AttributeName': 'order',
              'KeyType'      : 'RANGE'
            }
          ],
          'Projection'           : {
            'ProjectionType': 'ALL'
          },
          'ProvisionedThroughput': {
            'ReadCapacityUnits'     : 1,
            'WriteCapacityUnits'    : 1
          },
        },
        {
          'IndexName'            : 'postId-order-index',
          'KeySchema'            : [
            {
              'AttributeName': 'postId',
              'KeyType'      : 'HASH'
            },
            {
              'AttributeName': 'order',
              'KeyType'      : 'RANGE'
            }
          ],
          'Projection'           : {
            'ProjectionType': 'ALL'
          },
          'ProvisionedThroughput': {
            'ReadCapacityUnits'     : 1,
            'WriteCapacityUnits'    : 1
          },
        },
        {
          'IndexName'            : 'postId-createdAt-index',
          'KeySchema'            : [
            {
              'AttributeName': 'postId',
              'KeyType'      : 'HASH'
            },
            {
              'AttributeName': 'createdAt',
              'KeyType'      : 'RANGE'
            }
          ],
          'Projection'           : {
            'ProjectionType': 'ALL'
          },
          'ProvisionedThroughput': {
            'ReadCapacityUnits'     : 1,
            'WriteCapacityUnits'    : 1
          },
        },
        {
          'IndexName'            : 'replies',
          'KeySchema'            : [
            {
              'AttributeName': 'commentId',
              'KeyType'      : 'HASH'
            },
            {
              'AttributeName': 'order',
              'KeyType'      : 'RANGE'
            }
          ],
          'Projection'           : {
            'ProjectionType': 'ALL'
          },
          'ProvisionedThroughput': {
            'ReadCapacityUnits'     : 1,
            'WriteCapacityUnits'    : 1
          },
        },
        {
          'IndexName'            : 'like-index',
          'KeySchema'            : [
            {
              'AttributeName': 'hk',
              'KeyType'      : 'HASH'
            },
            {
              'AttributeName': 'like',
              'KeyType'      : 'RANGE'
            }
          ],
          'Projection'           : {
            'ProjectionType': 'ALL'
          },
          'ProvisionedThroughput': {
            'ReadCapacityUnits'     : 1,
            'WriteCapacityUnits'    : 1
          },
        }
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
