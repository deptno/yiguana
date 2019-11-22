resource aws_dynamodb_table state {
  name = "yiguana-tfstate"
  hash_key = "LockID"
  billing_mode = "PAY_PER_REQUEST"

  attribute {
    name = "LockID"
    type = "S"
  }
}
resource aws_s3_bucket state {
  bucket = "yiguana-state"
  acl = "private"
  force_destroy = "false"
  logging {
    target_bucket = aws_s3_bucket.log.id
  }
  versioning {
    enabled = true
  }
}
resource aws_s3_bucket log {
  bucket = "yiguana-state-log"
  acl = "log-delivery-write"
  force_destroy = "false"
}

terraform {
  backend "s3" {
    bucket = "yiguana-state"
    region = "ap-northeast-2"
    key = "yiguana.tfstate"
    encrypt = true
    dynamodb_table = "yiguana-tfstate"
  }
}
