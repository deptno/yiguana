import {handler} from '../../lib/handler'
import {yiguana} from '../../lib/yiguana'
import * as R from 'ramda'

export default handler({
  post(req, res) {
    // FIXME: 회원만 가능
    const postId = req.query.hk as string
    const ip = req.connection.remoteAddress

    yiguana.post
      .like({
        data: {
          hk: postId
        },
        user: {
          ip,
          userId: 'bglee',
        },
      })
      .then(R.tap(console.log))
      .then(res.json)
      .catch(e => res.status(400).json({e}))
  },
})