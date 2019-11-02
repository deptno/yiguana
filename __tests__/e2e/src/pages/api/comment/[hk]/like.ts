import {handler} from '../../lib/handler'
import {yiguana} from '../../lib/yiguana'
import * as R from 'ramda'
import {member_a} from '../../../../../../__data__/user'

export default handler({
  post(req, res) {
    // FIXME: 회원만 가능
    const hk = req.query.hk as string
    const ip = req.connection.remoteAddress

    yiguana.comment
      .like({
        data: {
          hk,
        },
        user: {
          ip,
          ...member_a,
        },
      })
      .then(R.tap(console.log))
      .then(res.json)
      .catch(e => res.status(400).json({e}))
  },
})