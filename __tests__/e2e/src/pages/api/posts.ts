import {handler} from './lib/handler'
import {yiguana} from './lib/yiguana'
import {PaginationResult} from '@deptno/dynamodb/dist/api'
import {Post} from '../../../../../src/entity/post'
import {SALT} from './lib/token'
import {util} from '@deptno/dynamodb'

export default handler({
  async get(req, res) {
    const {category, nextToken} = req.query as Record<string, string>

    yiguana.post
      .list({
        category,
        exclusiveStartKey: util.parseToken(nextToken, SALT),
      })
      .then((response: PaginationResult<Post>) => {
        const {items, lastEvaluatedKey} = response

        return {
          items,
          nextToken: util.createToken(lastEvaluatedKey, SALT),
        }
      })
      .then(JSON.stringify)
      .then(res.send)
  },
})
