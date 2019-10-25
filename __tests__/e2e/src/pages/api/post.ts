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
  async get(req, res) {
    // TODO: 비공개 글을 위해 user 를 받아할지
    console.log(req.query)
    yiguana.post
      .read({
        data: {
          hk: req.query.hk as string
        },
      })
      .then(R.tap(console.log))
      .then(JSON.stringify)
      .then(res.send)
  },
})

