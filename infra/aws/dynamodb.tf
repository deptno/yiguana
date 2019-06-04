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
    type = "S"
  }
}
