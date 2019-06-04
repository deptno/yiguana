provider "aws" {
  region = "ap-northeast-2"
  profile = "yiguana"
}

provider "aws" {
  region = "us-east-1"
  alias = "virginia"
  profile = "yiguana"
}
