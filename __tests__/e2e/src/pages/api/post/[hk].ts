import {handler} from '../lib/handler'
import {yiguana} from '../lib/yiguana'
import {non_member_a} from '../../../../../__data__/user'

export default handler({
  async put(req, res) {
    // TODO
    res.send('todo')
  },
  async get(req, res) {
    yiguana.post
      .view({
        data: {
          hk: req.query.hk as string,
        },
      })
      .then(JSON.stringify)
      .then(res.send)
  },
  async del(req, res) {
    yiguana.post
      .del({
        data: {
          hk: req.query.hk as string
        },
        user: non_member_a,
      })
      .then(JSON.stringify)
      .then(res.send)
  },
})

