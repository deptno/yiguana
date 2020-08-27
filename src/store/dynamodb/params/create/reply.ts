import {{dynamodb, tableName}} from '..//input/dynamodb'

export async function reply(operator: {dynamodb, tableName}, params: ReplyInput) {
  // TODO:
}

export type ReplyInput = {
  data: Yiguana.Document
}
