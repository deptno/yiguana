resource "aws_iam_role" "lambda" {
  name = "${var.stage[terraform.workspace]}-${var.service}-lambda-role"
  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "",
      "Effect": "Allow",
      "Principal": {
        "Service": [
          "lambda.amazonaws.com"
        ]
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
EOF
}

resource "aws_iam_role" "firehose" {
  name = "${var.stage[terraform.workspace]}-${var.service}-firehose-role"
  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "",
      "Effect": "Allow",
      "Principal": {
        "Service": [
          "firehose.amazonaws.com"
        ]
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
EOF
}
resource "aws_iam_role_policy" "firehose" {
  name = "${var.stage[terraform.workspace]}-${var.service}-firehose-policy"
  role = aws_iam_role.firehose.id
  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "",
      "Effect": "Allow",
      "Action": [
        "glue:GetTableVersions"
      ],
      "Resource": "*"
    },
    {
      "Sid": "",
      "Effect": "Allow",
      "Action": [
        "s3:AbortMultipartUpload",
        "s3:GetBucketLocation",
        "s3:GetObject",
        "s3:ListBucket",
        "s3:ListBucketMultipartUploads",
        "s3:PutObject"
      ],
      "Resource": [
        "arn:aws:s3:::${aws_s3_bucket.yiguana.id}",
        "arn:aws:s3:::${aws_s3_bucket.yiguana.id}/*"
      ]
    },
    {
      "Sid": "",
      "Effect": "Allow",
      "Action": [
        "lambda:InvokeFunction",
        "lambda:GetFunctionConfiguration"
      ],
      "Resource": "arn:aws:lambda:ap-northeast-2:104396725042:function:*:*"
    },
    {
      "Sid": "",
      "Effect": "Allow",
      "Action": [
        "logs:PutLogEvents"
      ],
      "Resource": [
        "arn:aws:logs:ap-northeast-2:*:*"
      ]
    },
    {
      "Sid": "",
      "Effect": "Allow",
      "Action": [
        "kinesis:DescribeStream",
        "kinesis:GetShardIterator",
        "kinesis:GetRecords"
      ],
      "Resource": "arn:aws:kinesis:ap-northeast-2:104396725042:stream/${aws_kinesis_firehose_delivery_stream.yiguana_hose.name}"
    }
  ]
}
EOF
}
