import {handler} from '../../lib/handler'
import {yiguana} from '../../lib/yiguana'
import {EAuthorizeErrorCode, isMember} from '../../lib/authorize'
import {Member} from '../../../../../../../src/entity/user'

export default handler({
  post(req, res, user: Member) {
    if (!isMember(user)) {
      return res
        .status(403)
        .send({error: EAuthorizeErrorCode.forbidden})
    }
    const hk = req.query.hk as string
    const createdAt = new Date().toISOString()

    yiguana.post
      .read({data: {hk}})
      .then(data => yiguana.user.post
        .like({
          data: {
            data,
            createdAt,
          },
          user,
        })
        .then(res.json),
      )
      .catch(e => res.status(400).json({e: e.message}))
  },
})