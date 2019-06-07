variable "service" {
  default = "yiguana"
}
variable "stage" {
  type = "map"
  default = {
    test = "test"
    dev = "dev"
    prd = "prd"
  }
}
