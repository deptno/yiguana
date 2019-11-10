import {handler} from '../../lib/handler'
import {yiguana} from '../../lib/yiguana'
import {Member} from '../../../../../../../src/entity/user'

export default handler({
  post(req, res, user: Member) {
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
          ...user,
          ip,
        },
      })
      .then(res.json)
  },
})