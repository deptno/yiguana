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
    name = "like"
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
    name = "userId"
    type = "S"
  }

  global_secondary_index {
    hash_key = "commentId"
    name = "replies"
    projection_type = "ALL"
    range_key = "order"
  }
  global_secondary_index {
    hash_key = "postId"
    name = "postId-createdAt-index"
    projection_type = "ALL"
    range_key = "createdAt"
  }
  global_secondary_index {
    hash_key = "postId"
    name = "postId-order-index"
    projection_type = "ALL"
    range_key = "order"
  }
  global_secondary_index {
    hash_key = "rk"
    name = "rk-category-index"
    projection_type = "ALL"
    range_key = "category"
  }
  global_secondary_index {
    hash_key = "rk"
    name = "rk-like-index"
    projection_type = "ALL"
    range_key = "like"
  }
  global_secondary_index {
    hash_key = "userId"
    name = "by-user"
    projection_type = "ALL"
    range_key = "order"
  }
  global_secondary_index {
    hash_key = "userId"
    name = "userId-order-index"
    projection_type = "ALL"
    range_key = "category"
  }
  global_secondary_index {
    hash_key = "userId"
    range_key = "like"
    name = "userLike"
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

