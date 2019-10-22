import {handler} from './lib/handler'
import {yiguana} from './lib/yiguana'

export default handler({
  async get(req, res) {
    yiguana.post
      .list({category: ''})
      .then(JSON.stringify)
      .then(res.send)
  },
})

