import {DynamoDBInput} from '../../entity/input/dynamodb'
import {EEntity, EEntityStatus} from '../../type'

export function aggReportReply(operator: DynamoDBInput, params: AggReportReplyInput) {
  console.warn('@todo aggReportReply')
}

export type AggReportReplyInput = {
  hk: string
  entity: Extract<EEntity, EEntity.Post|EEntity.Comment>
  answer: string
  status: EEntityStatus
}
