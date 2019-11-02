import {handler} from '../../lib/handler'
import {yiguana} from '../../lib/yiguana'
import * as R from 'ramda'
import {authorize} from '../../lib/authorize'

export default handler({
  post(req, res) {
    const user = authorize(req, res)
    if (!user) {
      return
    }

    const hk = req.query.hk as string
    const ip = req.connection.remoteAddress

    yiguana.post
      .like({
        data: {
          hk
        },
        user: user,
      })
      .then(R.tap(console.log))
      .then(res.json)
      .catch(e => res.status(400).json({e}))
  },
})