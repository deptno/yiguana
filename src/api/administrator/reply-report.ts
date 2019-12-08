import {MetadataStore} from '../../store/dynamodb'
import {EntityFactory} from '../../entity'
import {ApiInputWithUser} from '../../type'
import {logApiAdmin as log} from '../../lib/log'
import {assertNotEmptyString, assertsAdmin} from '../../lib/assert'
import {ReplyAggReportInput} from '../../store/dynamodb/reply-agg-report'

export async function replyReport(store: MetadataStore, ef: EntityFactory, input: ReplyReportApiInput) {
  log('reportReply %j', input)

  assertsAdmin(input.user)
  assertNotEmptyString(input.data.answer)

  const {data} = input
  const {data: {hk}, entity: rk, answer, status} = data
  const updatedAt = new Date().toISOString()

  // todo: store 쪽으로 내려야할 것으로 보인다.
  return Promise
    .all([
      store.update({hk, rk, status, updatedAt}),
      store.replyAggReport(data),
      store.getReportsAll({hk, rk}).then(reports => {
        return Promise.all(
          reports.map(r => store
            .replyReports({
              data: {
                hk: r.hk,
                rk: r.rk,
              },
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

export type ReplyReportApiInput = ApiInputWithUser<ReplyAggReportInput>
