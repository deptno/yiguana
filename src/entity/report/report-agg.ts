import {YiguanaDocument} from '../../dynamodb'
import {EEntityStatus} from '../../type'

export interface ReportAgg extends YiguanaDocument {
  agg: string
  reports: string
  reported: number
  status: EEntityStatus
}
