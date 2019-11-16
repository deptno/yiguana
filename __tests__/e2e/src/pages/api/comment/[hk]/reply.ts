import {handler} from '../../lib/handler'
import {yiguana} from '../../lib/yiguana'

export default handler({
  post(req, res, user) {
    const hk = req.query.hk as string
    const ip = req.connection.remoteAddress
    const {content, postId, commentCreatedAt} = JSON.parse(req.body)

    yiguana.reply
      .create({
        data: {
          comment: {
            hk,
            postId,
            createdAt: commentCreatedAt,
          },
          content,
          createdAt: new Date().toISOString(),
        },
        user: {
          ...user,
          ip
        },
      })
      .then(JSON.stringify)
      .then(res.send)
  },
})