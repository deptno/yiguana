import {yiguana} from '../lib/yiguana'
import {PaginationResult} from '@deptno/dynamodb/dist/api'
import {Post} from '../../../../../../src/entity/post'
import {SALT} from '../lib/token'
import {util} from '@deptno/dynamodb'
import {NextApiRequest, NextApiResponse} from 'next'
import {authorize} from '../lib/authorize'
import {Member} from '../../../../../../src/entity/user'

export default (req: NextApiRequest, res: NextApiResponse) => {
  const user: Member = authorize(req, res)
  if (!user) {
    throw new Error('unauthorized user')
  }
  const {category, like, cursor} = req.query as Record<string, any>
  const {id: userId} = user

  yiguana.user.post
    .list({
      exclusiveStartKey: util.parseToken(cursor, SALT),
      userId,
      like
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
}
