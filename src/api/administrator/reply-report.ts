import {MetadataStore} from '../../store/dynamodb'
import {EntityFactory} from '../../entity'
import {UserApiInput} from '../../type'
import {logApiAdminReport} from '../../lib/log'
import {assertNotEmptyString, assertsAdmin} from '../../lib/assert'
import {AggReportReplyInput} from '../../store/dynamodb/agg-report-reply'

export async function replyReport(store: MetadataStore, ef: EntityFactory, input: ReplyReportInput) {
  log('input %j', input)

  assertsAdmin(input.user)
  assertNotEmptyString(input.data.answer)

  const {data} = input
  const {hk, entity: rk, answer, status} = data
  const updatedAt = new Date().toISOString()

  return Promise
    .all([
      store.update({hk, rk, status, updatedAt}),
      store.aggReportReply(data),
      store.reportsAll({hk, rk}).then(reports => {
        return Promise.all(
          reports.map(r => store
            .reportReply({
              hk: r.hk,
              rk: r.rk,
              answer,
              status,
            })
            .catch(() => false),
          ),
        )
      }),
    ])
    .then(results => results.every(Boolean))
}

export type ReplyReportInput = UserApiInput<AggReportReplyInput>

const log = logApiAdminReport.extend('replyReport')
