import {NextApiRequest, NextApiResponse} from 'next'
import {EMethod} from './method'

export const handler = ({get, put, post}: Methods) =>
  (req: NextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
      case EMethod.POST:
        return post(req, res)
      case EMethod.GET:
        return get(req, res)
      case EMethod.PUT:
        return put(req, res)
      default:
        throw new Error('handler not defined')
    }
  }

type Methods = {
  get?(req: NextApiRequest, res: NextApiResponse)
  put?(req: NextApiRequest, res: NextApiResponse)
  post?(req: NextApiRequest, res: NextApiResponse)
}
