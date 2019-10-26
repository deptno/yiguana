import {handler} from '../lib/handler'
import {yiguana} from '../lib/yiguana'

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
        user: {
          name: 'non member',
          pw: 'pw1',
          ip: '0.0.0.0',
        },
      })
      .then(JSON.stringify)
      .then(res.send)
  },
})

