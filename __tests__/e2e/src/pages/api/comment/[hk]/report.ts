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
    const ip = req.connection.remoteAddress
    const createdAt = new Date().toISOString()
    const content = 'test reason' // FIXME: 신고 사유 입력 받는 창 필요

    yiguana.comment
      .read({data: {hk}})
      .then(data => yiguana.user.comment
        .report({
          data: {
            content,
            data,
            createdAt,
          },
          user: {
            ...user,
            ip
          },
        })
        .then(res.json),
      )
      .catch(e => res.status(400).json({e}))
  },
})