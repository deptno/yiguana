import {YiguanaDocument} from '../../dynamodb'

export interface ReportAgg extends YiguanaDocument {
  agg: string
  reports: string
  reported: number
}
