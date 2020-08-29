declare namespace DynamoDB {
  type Document = {
    hk: HashKey
    rk: RangeKey
  }
  type HashKey = string
  type RangeKey = string
  type GSIHash = string
  type GSIRange = string

  type Pagination = {
    limit?: number
    exclusiveStartKey?: Exclude<any, string | number>
  }
}
