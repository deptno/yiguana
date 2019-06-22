resource "aws_s3_bucket" "yiguana" {
  bucket = "${var.stage[terraform.workspace]}-${var.service}-${random_uuid.generator.id}"
}
resource "aws_s3_bucket" "yiguana_content" {
  bucket = "${var.stage[terraform.workspace]}-${var.service}-content-${random_uuid.generator.id}"
}
