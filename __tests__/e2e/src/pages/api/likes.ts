import {handler} from './lib/handler'
import {yiguana} from './lib/yiguana'
import {PaginationResult} from '@deptno/dynamodb/dist/api'
import {Post} from '../../../../../src/entity/post'
import {SALT} from './lib/token'
import {util} from '@deptno/dynamodb'

export default handler({
  async get(req, res) {
    yiguana.post
      .list({
        category: '',
        exclusiveStartKey: util.parseToken(req.query.cursor as string, SALT)
      })
      .then((response: PaginationResult<Post>) => {
        const {items, lastEvaluatedKey} = response

        return {
          items,
          cursor: util.createToken(lastEvaluatedKey, SALT),
        }
      })
      .then(JSON.stringify)
      .then(res.send)
  },
})
