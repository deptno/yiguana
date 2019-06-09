resource "aws_dynamodb_table" "yiguana" {
  name = "${var.stage[terraform.workspace]}-${var.service}"
  hash_key = "id"
  range_key = "range"
  billing_mode = "PAY_PER_REQUEST"
  attribute {
    name = "id"
    type = "S"
  }
  attribute {
    name = "range"
    type = "S" # post#[board]#[category]
  }
  attribute { # GSI0 hk, post category
    name = "board"
    type = "S" # [board]
  }
  attribute { # GSI0 rk, post 99#2019-06-04T11:31:000z
    name = "order"
    type = "S" # [board]#[category]#2019-06-04T11:31:000z
  }
  attribute { # GSI0 rk, post 99#2019-06-04T11:31:000z
    name = "userId"
    type = "S" # [board]#[category]#2019-06-04T11:31:000z
  }
//  attribute { # GSI1 rk, post 99, 후순위 이건 그냥 집계로 뽑는게 나을 수 도
//    name = "likes"
//    type = "N"
//  }
//  attribute { # GSI2 rk post 99, 이 것도 그냥 집계로 뽑는게 나을 수 도
//    name = "latestCommentedAt"
//    type = "S"
//  }
//  attribute {
//    name = "views"
//    type = "N"
//  }
//  attribute {
//    name = "createdAt"
//    type = "S"
//  }
//  attribute {
//    name = "_type"
//    type = "S"
//  }
//  attribute {
//    name = "hasImage"
//    type = "BOOL"
//  }
//  attribute {
//    name = "hasLink"
//    type = "BOOL"
//  }
  global_secondary_index { // 카테고리 분류
    name = "board-order-index"
    hash_key = "board"
    range_key = "order"
    projection_type = "ALL"
  }
  global_secondary_index { // 유저 검색
    name = "userId-index"
    hash_key = "userId"
    range_key = "order"
    projection_type = "ALL"
  }

  stream_enabled = true
  stream_view_type = "NEW_IMAGE"

  point_in_time_recovery {
    enabled = true
  }
}
