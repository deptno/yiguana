import {YiguanaDocument} from '../../dynamodb'

export interface ReportAgg extends YiguanaDocument {
  reported: number
}
