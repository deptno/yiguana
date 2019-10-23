import {yiguana} from './lib/yiguana'
import {handler} from './lib/handler'
import * as R from 'ramda'

export default handler({
  async post(req, res) {
    const {category, content, title} = JSON.parse(req.body)

    yiguana.post
      .create({
        data: {
          category,
          content,
          title,
        },
        user: {
          name: 'non member',
          pw: 'pw',
          ip: '0.0.0.0',
        },
      })
      .then(R.tap(console.log))
      .then(JSON.stringify)
      .then(res.send)
  },
})

