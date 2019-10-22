import {handler} from '../lib/handler'
import {yiguana} from '../lib/yiguana'

export default handler({
  async put(req, res) {
    // TODO
    res.send('todo')
  },
  async get(req, res) {
    yiguana.post
      .read({
        data: {
          hk: req.query.id as string,
        },
      })
      .then(JSON.stringify)
      .then(res.send)
  },
})

