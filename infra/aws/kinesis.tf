resource "aws_kinesis_firehose_delivery_stream" "yiguana_hose" {
  name = "${var.stage[terraform.workspace]}-${var.service}"
  destination = "s3"

  s3_configuration {
    bucket_arn = aws_s3_bucket.yiguana.arn
    role_arn = aws_iam_role.firehose.arn
    compression_format = "GZIP"
  }
}
