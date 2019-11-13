import {PaginationResult} from '@deptno/dynamodb/dist/api'
import {util} from '@deptno/dynamodb'
import {handler} from '../../lib/handler'
import {yiguana} from '../../lib/yiguana'
import {SALT} from '../../lib/token'
import {Comment} from '../../../../../../../lib/entity/comment'
import * as R from 'ramda'

export default handler({
  async get(req, res) {
    yiguana.comment
      .list({
        postId: req.query.hk as string,
      })
      .then((response: PaginationResult<Comment>) => {
        const {items, lastEvaluatedKey} = response

        return {
          items,
          cursor: util.createToken(lastEvaluatedKey, SALT),
        }
      })
      .then(R.tap(R.compose(console.table, R.prop('items'))))
      .then(JSON.stringify)
      .then(res.send)
  },
})
