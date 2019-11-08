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
    name = "category"
    type = "S"
  }
  attribute {
    name = "hk"
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
    name = "byUser"
    hash_key = "userId"
    range_key = "byUser"
    projection_type = "ALL"
  }
  global_secondary_index {
    name = "posts"
    hash_key = "rk"
    range_key = "posts"
    projection_type = "ALL"
  }
  global_secondary_index {
    name = "postsByCategory"
    hash_key = "rk"
    range_key = "category"
    projection_type = "ALL"
  }
  global_secondary_index {
    name = "comments"
    hash_key = "postId"
    range_key = "comments"
    projection_type = "ALL"
  }
  global_secondary_index {
    name = "rk-like-index"
    hash_key = "rk"
    range_key = "like"
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



