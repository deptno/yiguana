import {handler} from '../../lib/handler'
import {yiguana} from '../../lib/yiguana'
import * as R from 'ramda'

export default handler({
  post(req, res) {
    const commentId = req.query.hk as string
    const ip = req.connection.remoteAddress
    const {content} = JSON.parse(req.body)

    console.log({
      commentId,
      ip,
      content
    })

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
      .then(R.tap(console.log))
      .then(JSON.stringify)
      .then(res.send)
  },
})