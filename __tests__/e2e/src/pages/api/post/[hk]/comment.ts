import {handler} from '../../lib/handler'
import {yiguana} from '../../lib/yiguana'
import * as R from 'ramda'
import {non_member_a} from '../../../../../../__data__/user'

export default handler({
  post(req, res) {
    const postId = req.query.hk as string
    const ip = req.connection.remoteAddress
    const {content} = JSON.parse(req.body)

    yiguana.comment
      .create({
        data: {
          postId,
          content,
        },
        user: {
          ...non_member_a,
          ip,
        },
      })
      .then(R.tap(console.log))
      .then(JSON.stringify)
      .then(res.send)
  },
})