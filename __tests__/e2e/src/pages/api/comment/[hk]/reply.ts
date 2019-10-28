import {handler} from '../../lib/handler'
import {yiguana} from '../../lib/yiguana'
import {non_member_a} from '../../../../../../__data__/user'

export default handler({
  post(req, res) {
    const commentId = req.query.hk as string
    const ip = req.connection.remoteAddress
    const {content} = JSON.parse(req.body)

    yiguana.reply
      .create({
        data: {
          commentId,
          content,
          createdAt: new Date().toISOString(),
        },
        user: {
          ...non_member_a,
          ip,

        },
      })
      .then(JSON.stringify)
      .then(res.send)
  },
})