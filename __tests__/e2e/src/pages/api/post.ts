import {yiguana} from './lib/yiguana'
import {handler} from './lib/handler'
import * as R from 'ramda'

export default handler({
  async post(req, res) {
    yiguana.post
      .create({
        data: {
          content: 'content',
          title: 'title',
          category: 'news',
        },
        user: {
          name: 'non member',
          pw: 'pw',
          ip: '0.0.0.0'
        },
      })
      .then(R.tap(console.log))
      .then(JSON.stringify)
      .then(res.send)
  }
})

