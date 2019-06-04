variable "service" {
  default = "yiguana"
}
variable "stage" {
  type = "map"
  default = {
    dev = "dev"
    prd = "prd"
  }
}
