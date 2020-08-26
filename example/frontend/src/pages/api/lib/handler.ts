import {NextApiRequest, NextApiResponse} from 'next'
import {EMethod} from './method'
import {User} from '../../../../../../lib/entity'
import {authorize} from './authorize'

export const handler = ({get, put, post, del}: Methods) =>
  (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === EMethod.GET) {
      return get(req, res)
    }

    const user = authorize(req, res)
    if (!user) {
      throw new Error('unauthorized user')
    }

    switch (req.method) {
      case EMethod.POST:
        return post(req, res, user)
      case EMethod.PUT:
        return put(req, res, user)
      case EMethod.DELETE:
        return del(req, res, user)
      default:
        throw new Error('handler not defined')
    }
  }

type Methods = {
  get?(req: NextApiRequest, res: NextApiResponse)
  put?(req: NextApiRequest, res: NextApiResponse, user: User)
  post?(req: NextApiRequest, res: NextApiResponse, user: User)
  del?(req: NextApiRequest, res: NextApiResponse, user: User)
}
