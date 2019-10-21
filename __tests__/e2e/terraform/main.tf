provider aws {
  region = "ap-northeast-2"
  profile = "yiguana"
}

resource aws_dynamodb_table yiguana {
  name = "test-yiguana"
  hash_key = "hk"
  range_key = "rk"
  billing_mode = "PAY_PER_REQUEST"

  attribute {
    name = "hk"
    type = "S"
  }
  attribute {
    name = "rk"
    type = "S"
  }
  attribute {
    name = "commentId"
    type = "S"
  }
  attribute {
    name = "category"
    type = "S"
  }
  attribute {
    name = "createdAt"
    type = "S"
  }
  attribute {
    name = "hk"
    type = "S"
  }
  attribute {
    name = "order"
    type = "S"
  }
  attribute {
    name = "postId"
    type = "S"
  }
  attribute {
    name = "rk"
    type = "S"
  }
  attribute {
    name = "userId"
    type = "S"
  }

  global_secondary_index {
    name = "by-user"
    hash_key = "userId"
    range_key = "order"
    projection_type = "ALL"
  }
  global_secondary_index {
    name = "userId-order-index"
    hash_key = "userId"
    range_key = "category"
    projection_type = "ALL"
  }
  global_secondary_index {
    name = "rk-category-index"
    hash_key = "rk"
    range_key = "category"
    projection_type = "ALL"
  }
  global_secondary_index {
    name = "postId-order-index"
    hash_key = "postId"
    range_key = "order"
    projection_type = "ALL"
  }
  global_secondary_index {
    name = "postId-createdAt-index"
    hash_key = "postId"
    range_key = "createdAt"
    projection_type = "ALL"
  }
  global_secondary_index {
    name = "replies"
    hash_key = "commentId"
    range_key = "order"
    projection_type = "ALL"
  }
}

resource aws_s3_bucket yiguana {
  bucket = "test-yiguana"
}

output dynamodb {
  value = aws_dynamodb_table.yiguana.name
}
output s3 {
  value = aws_s3_bucket.yiguana.bucket
}

