import {handler} from '../../lib/handler'
import {yiguana} from '../../lib/yiguana'

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
          ip,
          name: 'anonymous',
          pw: 'password',
        },
      })
      .then(JSON.stringify)
      .then(res.send)
  },
})