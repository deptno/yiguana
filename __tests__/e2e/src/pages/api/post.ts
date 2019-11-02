import {yiguana} from './lib/yiguana'
import {handler} from './lib/handler'
import * as R from 'ramda'

export default handler({
  async post(req, res) {
    const {data, user} = JSON.parse(req.body)
    const ip = req.connection.remoteAddress

    // TODO: 데이터 밸리데이션

    yiguana.post
      .create({
        data,
        user: {
          ...user,
          ip,
        },
      })
      .then(R.tap(console.log))
      .then(JSON.stringify)
      .then(res.send)
      .catch(e => {
        console.error(e)
        res.status(500).json({error: e})
      })
  },
})

