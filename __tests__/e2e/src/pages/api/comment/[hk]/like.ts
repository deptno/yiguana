import {handler} from '../../lib/handler'
import {yiguana} from '../../lib/yiguana'
import * as R from 'ramda'
import {member_a} from '../../../../../../__data__/user'
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

    yiguana.comment
      .like({
        data: {
          hk,
        },
        user,
      })
      .then(R.tap(console.log))
      .then(res.json)
      .catch(e => res.status(400).json({e}))
  },
})